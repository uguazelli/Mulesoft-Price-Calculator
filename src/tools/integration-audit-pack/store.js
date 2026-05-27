const fs = require("node:fs/promises");
const { ensureCsv, escapeCsv } = require("../../shared/csv");

const INTEGRATION_AUDIT_HEADERS = [
  "timestamp",
  "language",
  "fullName",
  "email",
  "company",
  "role",
  "website",
  "companySize",
  "timeline",
  "primaryChallenge",
  "downloadFile",
  "userAgent"
];

async function appendIntegrationAuditLead(filePath, lead, downloadFile, userAgent) {
  await ensureCsv(filePath, INTEGRATION_AUDIT_HEADERS);

  const row = [
    new Date().toISOString(),
    lead.language,
    lead.fullName,
    lead.email,
    lead.company,
    lead.role,
    lead.website,
    lead.companySize,
    lead.timeline,
    lead.primaryChallenge,
    downloadFile,
    userAgent || ""
  ]
    .map(escapeCsv)
    .join(",");

  await fs.appendFile(filePath, `${row}\n`, "utf8");
}

module.exports = {
  INTEGRATION_AUDIT_HEADERS,
  appendIntegrationAuditLead
};
