const fs = require("node:fs/promises");
const path = require("node:path");
const { escapeCsv } = require("../csvStore");

const API_READINESS_HEADERS = [
  "timestamp",
  "language",
  "fullName",
  "email",
  "company",
  "website",
  "companySize",
  "timeline",
  "score",
  "status",
  "categoryScores",
  "painPoints",
  "recommendation",
  "answersJson",
  "userAgent"
];

async function ensureCsv(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, `${API_READINESS_HEADERS.join(",")}\n`, "utf8");
  }
}

async function appendApiReadinessLead(filePath, submission, result, userAgent) {
  await ensureCsv(filePath);

  const row = [
    new Date().toISOString(),
    submission.language,
    submission.lead.fullName,
    submission.lead.email,
    submission.lead.company,
    submission.lead.website,
    submission.lead.companySize,
    submission.lead.timeline,
    result.score,
    result.status,
    JSON.stringify(result.categoryScores),
    result.painPoints.join(" | "),
    result.recommendation,
    JSON.stringify(submission.answers),
    userAgent || ""
  ]
    .map(escapeCsv)
    .join(",");

  await fs.appendFile(filePath, `${row}\n`, "utf8");
}

module.exports = {
  API_READINESS_HEADERS,
  appendApiReadinessLead
};
