const path = require("node:path");
const express = require("express");
const { calculateAssessment } = require("./calculator");
const { appendLead } = require("./csvStore");
const { validateSubmission } = require("./validation");

function createApp(options = {}) {
  const app = express();
  const publicDir = options.publicDir || path.join(__dirname, "..", "public");
  const leadsCsvPath = options.leadsCsvPath || process.env.LEADS_CSV_PATH || path.join(__dirname, "..", "data", "leads.csv");

  app.disable("x-powered-by");
  app.use(express.json({ limit: "50kb" }));
  app.use(express.static(publicDir));

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/calculate", async (req, res, next) => {
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
  createApp
};
