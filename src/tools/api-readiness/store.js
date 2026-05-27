const fs = require("node:fs/promises");
const { ensureCsv, escapeCsv } = require("../../shared/csv");

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

async function appendApiReadinessLead(filePath, submission, result, userAgent) {
  await ensureCsv(filePath, API_READINESS_HEADERS);

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
