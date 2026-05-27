const path = require("node:path");
const { appendIntegrationAuditLead } = require("./store");
const { validateIntegrationAuditPackRequest } = require("./validation");

const INTEGRATION_AUDIT_PACK_HTML_PATH = path.join("tools", "integration-audit-pack", "index.html");
const INTEGRATION_AUDIT_PACK_FILE_NAME = "Veridata_Integration_Audit_Pack.docx";
const INTEGRATION_AUDIT_PACK_FILE_PATH = path.join("tools", "integration-audit-pack", INTEGRATION_AUDIT_PACK_FILE_NAME);

function mountIntegrationAuditPackApi(app, { basePath, csvPath }) {
  app.post(`${basePath || ""}/api/request`, async (req, res, next) => {
    try {
      const validation = validateIntegrationAuditPackRequest(req.body || {});
      if (!validation.valid) {
        return res.status(400).json({ error: "Validation failed.", fields: validation.errors });
      }

      await appendIntegrationAuditLead(csvPath, validation.data, INTEGRATION_AUDIT_PACK_FILE_NAME, req.get("user-agent"));

      return res.json({
        download: {
          fileName: INTEGRATION_AUDIT_PACK_FILE_NAME,
          url: `${basePath || ""}/${INTEGRATION_AUDIT_PACK_FILE_PATH}`
        }
      });
    } catch (error) {
      return next(error);
    }
  });
}

module.exports = {
  INTEGRATION_AUDIT_PACK_FILE_NAME,
  INTEGRATION_AUDIT_PACK_HTML_PATH,
  mountIntegrationAuditPackApi
};
