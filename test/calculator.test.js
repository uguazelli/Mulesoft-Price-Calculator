const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateAssessment } = require("../src/calculator");

const baseInput = {
  fullName: "Alex Rivera",
  email: "alex@example.com",
  company: "Example Co",
  deploymentModel: "cloudhub2",
  commercialModel: "flowMessage",
  productionCores: 12,
  sandboxCores: 4,
  runningApplications: 36,
  utilizationPct: 72,
  managedApis: 25,
  addons: ["apiManager"],
  renewalTimeline: "6-12"
};

test("low utilization produces higher waste and risk", () => {
  const low = calculateAssessment({
    ...baseInput,
    commercialModel: "unsure",
    sandboxCores: 18,
    utilizationPct: 18,
    renewalTimeline: "0-3"
  });

  assert.equal(low.risk.level, "Critical");
  assert.ok(low.waste.estimatedPercent >= 65);
  assert.ok(low.signals.some((signal) => signal.title === "Low utilization"));
});

test("high utilization produces lower waste and risk", () => {
  const high = calculateAssessment({
    ...baseInput,
    utilizationPct: 86,
    productionCores: 10,
    sandboxCores: 2,
    runningApplications: 50
  });

  assert.equal(high.risk.level, "Low");
  assert.ok(high.waste.estimatedPercent < 20);
});

test("high sandbox allocation increases optimization signal", () => {
  const result = calculateAssessment({
    ...baseInput,
    productionCores: 6,
    sandboxCores: 12
  });

  assert.ok(
    result.signals.some(
      (signal) => signal.title === "Production vs. sandbox capacity" && signal.severity === "high"
    )
  );
});

test("unsure commercial model adds renewal-risk recommendation", () => {
  const result = calculateAssessment({
    ...baseInput,
    commercialModel: "unsure"
  });

  assert.ok(result.recommendations[0].includes("renewal readiness review"));
  assert.ok(result.signals.some((signal) => signal.title === "Pricing model clarity" && signal.severity === "high"));
});
