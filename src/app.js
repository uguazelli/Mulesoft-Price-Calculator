const path = require("node:path");
const fs = require("node:fs");
const express = require("express");
const { calculateAssessment } = require("./calculator");
const { appendLead } = require("./csvStore");
const { validateSubmission } = require("./validation");
const { calculateAssessmentResult } = require("./services/scoringService");
const { validateApiReadinessSubmission } = require("./services/apiReadinessValidation");
const { appendApiReadinessLead } = require("./services/apiReadinessStore");

function normalizeBasePath(value = "/mulesoft-calculator") {
  const trimmed = String(value || "").trim();
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

function createApp(options = {}) {
  const app = express();
  const publicDir = options.publicDir || path.join(__dirname, "..", "public");
  const leadsCsvPath = options.leadsCsvPath || process.env.LEADS_CSV_PATH || path.join(__dirname, "..", "data", "leads.csv");
  const basePath = normalizeBasePath(options.basePath || process.env.BASE_PATH || "/mulesoft-calculator");
  const apiReadinessBasePath = normalizeBasePath(
    options.apiReadinessBasePath || process.env.API_READINESS_BASE_PATH || "/api-readiness-assessment"
  );
  const fileValidatorBasePath = normalizeBasePath(options.fileValidatorBasePath || process.env.FILE_VALIDATOR_BASE_PATH || "/file-validator");
  const apiReadinessCsvPath =
    options.apiReadinessCsvPath || process.env.API_READINESS_CSV_PATH || path.join(__dirname, "..", "data", "api-readiness-leads.csv");
  const indexTemplate = fs.readFileSync(path.join(publicDir, "index.html"), "utf8");
  const indexHtml = indexTemplate.replaceAll("__BASE_PATH__", basePath || "");
  const apiReadinessTemplate = fs.readFileSync(path.join(publicDir, "api-readiness", "index.html"), "utf8");
  const apiReadinessHtml = apiReadinessTemplate.replaceAll("__BASE_PATH__", apiReadinessBasePath || "");
  const fileValidatorTemplate = fs.readFileSync(path.join(publicDir, "file-validator", "index.html"), "utf8");
  const fileValidatorHtml = fileValidatorTemplate.replaceAll("__BASE_PATH__", fileValidatorBasePath || "");

  app.disable("x-powered-by");
  app.use(express.json({ limit: "50kb" }));

  if (basePath) {
    app.get(basePath, (req, res, next) => {
      if (req.path === basePath) {
        return res.redirect(308, `${basePath}/`);
      }
      return next();
    });
  }

  app.get(`${basePath || ""}/`, (req, res) => {
    res.type("html").send(indexHtml);
  });

  app.use(basePath || "/", express.static(publicDir, { index: false }));

  if (apiReadinessBasePath) {
    app.get(apiReadinessBasePath, (req, res, next) => {
      if (req.path === apiReadinessBasePath) {
        return res.redirect(308, `${apiReadinessBasePath}/`);
      }
      return next();
    });
  }

  app.get(`${apiReadinessBasePath || ""}/`, (req, res) => {
    res.type("html").send(apiReadinessHtml);
  });

  app.use(apiReadinessBasePath || "/", express.static(publicDir, { index: false }));

  if (fileValidatorBasePath) {
    app.get(fileValidatorBasePath, (req, res, next) => {
      if (req.path === fileValidatorBasePath) {
        return res.redirect(308, `${fileValidatorBasePath}/`);
      }
      return next();
    });
  }

  app.get(`${fileValidatorBasePath || ""}/`, (req, res) => {
    res.type("html").send(fileValidatorHtml);
  });

  app.use(fileValidatorBasePath || "/", express.static(publicDir, { index: false }));

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get(`${basePath || ""}/health`, (req, res) => {
    res.json({ status: "ok", basePath: basePath || "/" });
  });

  app.get(`${apiReadinessBasePath || ""}/health`, (req, res) => {
    res.json({ status: "ok", basePath: apiReadinessBasePath || "/" });
  });

  app.get(`${fileValidatorBasePath || ""}/health`, (req, res) => {
    res.json({ status: "ok", basePath: fileValidatorBasePath || "/" });
  });

  app.post(`${basePath || ""}/api/calculate`, async (req, res, next) => {
    try {
      const validation = validateSubmission(req.body || {});
      if (!validation.valid) {
        return res.status(400).json({ error: "Validation failed.", fields: validation.errors });
      }

      const result = calculateAssessment(validation.data);
      await appendLead(leadsCsvPath, validation.data, result, req.get("user-agent"));

      return res.json({ result });
    } catch (error) {
      return next(error);
    }
  });

  app.post(`${apiReadinessBasePath || ""}/api/assess`, async (req, res, next) => {
    try {
      const validation = validateApiReadinessSubmission(req.body || {});
      if (!validation.valid) {
        return res.status(400).json({ error: "Validation failed.", fields: validation.errors });
      }

      const result = calculateAssessmentResult({
        language: validation.data.language,
        ...validation.data.answers
      });
      await appendApiReadinessLead(apiReadinessCsvPath, validation.data, result, req.get("user-agent"));

      return res.json({ result });
    } catch (error) {
      return next(error);
    }
  });

  app.use((req, res) => {
    res.status(404).json({ error: "Not found." });
  });

  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: "Unexpected server error." });
  });

  return app;
}

module.exports = {
  createApp,
  normalizeBasePath
};
