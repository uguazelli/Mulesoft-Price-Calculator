const { createApp, normalizeBasePath } = require("./app");

const port = Number(process.env.PORT || 3000);
const docsBasePath = normalizeBasePath(process.env.DOCS_BASE_PATH || process.env.TOOLS_BASE_PATH || "/docs") || "/";
const mulesoftBasePath = normalizeBasePath(process.env.BASE_PATH || "/mulesoft-calculator") || "/";
const apiReadinessBasePath = normalizeBasePath(process.env.API_READINESS_BASE_PATH || "/api-readiness-assessment") || "/";
const fileValidatorBasePath = normalizeBasePath(process.env.FILE_VALIDATOR_BASE_PATH || "/file-validator") || "/";
const integrationAuditPackBasePath = normalizeBasePath(process.env.INTEGRATION_AUDIT_PACK_BASE_PATH || "/integration-audit-pack") || "/";
const app = createApp();

app.listen(port, () => {
  console.log(`VeriDataPro tools listening on http://localhost:${port}`);
  console.log(`Docs directory: http://localhost:${port}${docsBasePath}`);
  console.log(`MuleSoft calculator: http://localhost:${port}${mulesoftBasePath}`);
  console.log(`API readiness assessment: http://localhost:${port}${apiReadinessBasePath}`);
  console.log(`File validator: http://localhost:${port}${fileValidatorBasePath}`);
  console.log(`Integration audit pack: http://localhost:${port}${integrationAuditPackBasePath}`);
});
