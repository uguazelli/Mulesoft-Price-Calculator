const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateAssessmentResult } = require("../src/tools/api-readiness/scoringService");

const readyAnswers = {
  language: "en",
  systemsCount: "4-7",
  systemTypes: ["odoo", "crm", "ecommerce"],
  manualCopyFrequency: "rarely",
  spreadsheetDependency: "low",
  apiAvailability: "most",
  sourceOfTruth: "clear",
  dataQuality: "clean",
  reportingConsistency: "consistent",
  integrationReliability: "reliable",
  systemOwnership: "clearOwners",
  upcomingMigration: "none",
  biggestProblem: "We want to automate order updates."
};

test("low-risk answers produce a high readiness score", () => {
  const result = calculateAssessmentResult(readyAnswers);

  assert.equal(result.score, 100);
  assert.equal(result.status, "Integration Ready");
  assert.equal(result.categoryScores.manualWork, 100);
});

test("daily manual copying and spreadsheet dependency reduce score and manual work category", () => {
  const result = calculateAssessmentResult({
    ...readyAnswers,
    manualCopyFrequency: "daily",
    spreadsheetDependency: "heavy"
  });

  assert.equal(result.score, 65);
  assert.equal(result.status, "Partially Ready");
  assert.ok(result.categoryScores.manualWork < 50);
  assert.ok(result.painPoints.includes("Daily manual data copying"));
  assert.ok(result.painPoints.includes("Heavy spreadsheet dependency"));
});

test("severe operating issues return not ready status", () => {
  const result = calculateAssessmentResult({
    ...readyAnswers,
    systemsCount: "13+",
    systemTypes: ["odoo", "crm", "ecommerce", "finance", "spreadsheets", "databases"],
    manualCopyFrequency: "multipleDaily",
    spreadsheetDependency: "heavy",
    apiAvailability: "none",
    sourceOfTruth: "none",
    dataQuality: "poor",
    reportingConsistency: "differentTeams",
    integrationReliability: "manualFixes",
    systemOwnership: "noOwner",
    upcomingMigration: "activePoorReadiness"
  });

  assert.equal(result.score, 0);
  assert.equal(result.status, "Not Ready");
  assert.equal(result.statusKey, "notReady");
  assert.ok(result.categoryScores.apiReadiness < 70);
  assert.ok(result.categoryScores.operationalRisk < 35);
});

test("unknown commercial and technical readiness terms are localized", () => {
  const result = calculateAssessmentResult({
    ...readyAnswers,
    language: "pt",
    apiAvailability: "unknown",
    sourceOfTruth: "unclear",
    spreadsheetDependency: "medium"
  });

  assert.equal(result.status, "Parcialmente pronto");
  assert.ok(result.painPoints.some((point) => point.includes("APIs")));
  assert.match(result.recommendation, /trabalho manual|responsabilidade|integrações/i);
});
