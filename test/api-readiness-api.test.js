const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { createApp } = require("../src/app");

const validPayload = {
  language: "en",
  lead: {
    fullName: "Jordan Lee",
    email: "jordan@example.com",
    company: "Example Systems",
    website: "example.com",
    companySize: "51-200",
    timeline: "1-3"
  },
  answers: {
    systemsCount: "4-7",
    systemTypes: ["odoo", "crm", "ecommerce", "finance"],
    manualCopyFrequency: "daily",
    spreadsheetDependency: "heavy",
    apiAvailability: "unknown",
    sourceOfTruth: "unclear",
    dataQuality: "clean",
    reportingConsistency: "consistent",
    integrationReliability: "reliable",
    systemOwnership: "clearOwners",
    upcomingMigration: "none",
    biggestProblem: "Orders and finance data are reconciled manually every morning."
  }
};

function listen(app) {
  return new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });
}

function close(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

async function postJson(port, payload) {
  return fetch(`http://127.0.0.1:${port}/api-readiness-assessment/api/assess`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "node-test"
    },
    body: JSON.stringify(payload)
  });
}

test("valid API readiness submission returns result JSON and appends one CSV row", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "api-readiness-"));
  const csvPath = path.join(dir, "leads.csv");
  const app = createApp({ apiReadinessCsvPath: csvPath });
  const server = await listen(app);

  try {
    const response = await postJson(server.address().port, validPayload);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.result.status, "At Risk");
    assert.ok(body.result.score >= 40);
    assert.ok(body.result.categoryScores.manualWork < 100);
    assert.ok(body.result.painPoints.includes("Daily manual data copying"));

    const csv = await fs.readFile(csvPath, "utf8");
    const lines = csv.trim().split("\n");
    assert.equal(lines.length, 2);
    assert.match(lines[0], /^timestamp,language,fullName,email,company/);
    assert.match(lines[1], /Jordan Lee/);
    assert.match(lines[1], /Orders and finance data/);
  } finally {
    await close(server);
  }
});

test("missing required API readiness lead field returns 400", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "api-readiness-"));
  const app = createApp({ apiReadinessCsvPath: path.join(dir, "leads.csv") });
  const server = await listen(app);

  try {
    const response = await postJson(server.address().port, {
      ...validPayload,
      lead: { ...validPayload.lead, fullName: "" }
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.error, "Validation failed.");
    assert.equal(body.fields.fullName, "Name is required.");
  } finally {
    await close(server);
  }
});

test("invalid API readiness email and website return 400", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "api-readiness-"));
  const app = createApp({ apiReadinessCsvPath: path.join(dir, "leads.csv") });
  const server = await listen(app);

  try {
    const response = await postJson(server.address().port, {
      ...validPayload,
      lead: {
        ...validPayload.lead,
        email: "bad-email",
        website: "not a website"
      }
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.fields.email, "Enter a valid email address.");
    assert.equal(body.fields.website, "Enter a valid website.");
  } finally {
    await close(server);
  }
});

test("API readiness CSV values with commas, newlines, and quotes are escaped", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "api-readiness-"));
  const csvPath = path.join(dir, "leads.csv");
  const app = createApp({ apiReadinessCsvPath: csvPath });
  const server = await listen(app);

  try {
    const response = await postJson(server.address().port, {
      ...validPayload,
      lead: {
        ...validPayload.lead,
        fullName: 'Jordan "J" Lee',
        company: "Example, Systems\nLATAM"
      },
      answers: {
        ...validPayload.answers,
        biggestProblem: 'CRM says "paid", ERP says unpaid.'
      }
    });

    assert.equal(response.status, 200);
    const csv = await fs.readFile(csvPath, "utf8");
    assert.match(csv, /"Jordan ""J"" Lee"/);
    assert.match(csv, /"Example, Systems\nLATAM"/);
    assert.match(csv, /CRM says/);
  } finally {
    await close(server);
  }
});
