const fs = require("node:fs/promises");
const path = require("node:path");

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

function escapeCsv(value) {
  const text = value === undefined || value === null ? "" : String(value);
  const escaped = text.replace(/"/g, '""');
  return /[",\n\r]/.test(escaped) ? `"${escaped}"` : escaped;
}

async function ensureCsv(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, `${HEADERS.join(",")}\n`, "utf8");
  }
}

async function appendLead(filePath, lead, result, userAgent) {
  await ensureCsv(filePath);

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
  appendLead,
  escapeCsv
};
