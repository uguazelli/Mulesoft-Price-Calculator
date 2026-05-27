const fs = require("node:fs/promises");
const { ensureCsv, escapeCsv } = require("../../shared/csv");

const HEADERS = [
  "timestamp",
  "language",
  "fullName",
  "email",
  "company",
  "deploymentModel",
  "commercialModel",
  "productionCores",
  "sandboxCores",
  "runningApplications",
  "utilizationPct",
  "managedApis",
  "addons",
  "renewalTimeline",
  "riskLevel",
  "riskScore",
  "estimatedWastePercent",
  "recommendations",
  "userAgent"
];

async function appendLead(filePath, lead, result, userAgent) {
  await ensureCsv(filePath, HEADERS);

  const row = [
    new Date().toISOString(),
    lead.language,
    lead.fullName,
    lead.email,
    lead.company,
    lead.deploymentModel,
    lead.commercialModel,
    lead.productionCores,
    lead.sandboxCores,
    lead.runningApplications,
    lead.utilizationPct,
    lead.managedApis,
    lead.addons.join("|"),
    lead.renewalTimeline,
    result.risk.level,
    result.risk.score,
    result.waste.estimatedPercent,
    result.recommendations.join(" | "),
    userAgent || ""
  ]
    .map(escapeCsv)
    .join(",");

  await fs.appendFile(filePath, `${row}\n`, "utf8");
}

module.exports = {
  HEADERS,
  appendLead
};
