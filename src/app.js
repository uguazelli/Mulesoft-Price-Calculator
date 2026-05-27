const path = require("node:path");
const express = require("express");
const { mountErrorHandler, mountNotFoundHandler } = require("./shared/errorRoutes");
const { mountStaticTool, mountToolHealth } = require("./shared/staticToolRoutes");
const { normalizeBasePath } = require("./shared/basePath");
const { API_READINESS_HTML_PATH, mountApiReadinessApi } = require("./tools/api-readiness/routes");
const { TOOLS_INDEX_HTML_PATH } = require("./tools/directory/routes");
const { FILE_VALIDATOR_HTML_PATH } = require("./tools/file-validator/routes");
const { INTEGRATION_AUDIT_PACK_HTML_PATH, mountIntegrationAuditPackApi } = require("./tools/integration-audit-pack/routes");
const { MULESOFT_CALCULATOR_HTML_PATH, mountMulesoftCalculatorApi } = require("./tools/mulesoft-calculator/routes");

function buildConfig(options = {}) {
  const publicDir = options.publicDir || path.join(__dirname, "..", "public");
  const paths = {
    tools: normalizeBasePath(options.toolsBasePath || process.env.TOOLS_BASE_PATH || "/tools"),
    mulesoft: normalizeBasePath(options.basePath || process.env.BASE_PATH || "/mulesoft-calculator"),
    apiReadiness: normalizeBasePath(options.apiReadinessBasePath || process.env.API_READINESS_BASE_PATH || "/api-readiness-assessment"),
    fileValidator: normalizeBasePath(options.fileValidatorBasePath || process.env.FILE_VALIDATOR_BASE_PATH || "/file-validator"),
    integrationAuditPack: normalizeBasePath(
      options.integrationAuditPackBasePath || process.env.INTEGRATION_AUDIT_PACK_BASE_PATH || "/integration-audit-pack"
    )
  };
  const storage = {
    mulesoftLeads: options.leadsCsvPath || process.env.LEADS_CSV_PATH || path.join(__dirname, "..", "data", "leads.csv"),
    apiReadinessLeads:
      options.apiReadinessCsvPath || process.env.API_READINESS_CSV_PATH || path.join(__dirname, "..", "data", "api-readiness-leads.csv"),
    integrationAuditPackLeads:
      options.integrationAuditPackCsvPath ||
      process.env.INTEGRATION_AUDIT_PACK_CSV_PATH ||
      path.join(__dirname, "..", "data", "integration-audit-pack-leads.csv")
  };

  return { publicDir, paths, storage };
}

function createApp(options = {}) {
  const app = express();
  const config = buildConfig(options);

  app.disable("x-powered-by");
  app.use(express.json({ limit: "50kb" }));

  mountStaticTool(app, {
    basePath: config.paths.tools,
    publicDir: config.publicDir,
    htmlPath: TOOLS_INDEX_HTML_PATH
  });
  mountStaticTool(app, {
    basePath: config.paths.mulesoft,
    publicDir: config.publicDir,
    htmlPath: MULESOFT_CALCULATOR_HTML_PATH
  });
  mountStaticTool(app, {
    basePath: config.paths.apiReadiness,
    publicDir: config.publicDir,
    htmlPath: API_READINESS_HTML_PATH
  });
  mountStaticTool(app, {
    basePath: config.paths.fileValidator,
    publicDir: config.publicDir,
    htmlPath: FILE_VALIDATOR_HTML_PATH
  });
  mountStaticTool(app, {
    basePath: config.paths.integrationAuditPack,
    publicDir: config.publicDir,
    htmlPath: INTEGRATION_AUDIT_PACK_HTML_PATH
  });

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  Object.values(config.paths).forEach((basePath) => mountToolHealth(app, basePath));

  mountMulesoftCalculatorApi(app, {
    basePath: config.paths.mulesoft,
    leadsCsvPath: config.storage.mulesoftLeads
  });
  mountApiReadinessApi(app, {
    basePath: config.paths.apiReadiness,
    csvPath: config.storage.apiReadinessLeads
  });
  mountIntegrationAuditPackApi(app, {
    basePath: config.paths.integrationAuditPack,
    csvPath: config.storage.integrationAuditPackLeads
  });

  mountNotFoundHandler(app);
  mountErrorHandler(app);

  return app;
}

module.exports = {
  buildConfig,
  createApp,
  normalizeBasePath
};
