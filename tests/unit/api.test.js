const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { createApp } = require("../../src/app");

const validPayload = {
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
  addons: ["apiManager", "mq"],
  renewalTimeline: "6-12"
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
  return fetch(`http://127.0.0.1:${port}/mulesoft-calculator/api/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "node-test"
    },
    body: JSON.stringify(payload)
  });
}

test("valid submission returns result JSON and appends one CSV row", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "mulesoft-calc-"));
  const csvPath = path.join(dir, "leads.csv");
  const app = createApp({ leadsCsvPath: csvPath });
  const server = await listen(app);

  try {
    const response = await postJson(server.address().port, validPayload);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.result.risk.level, "Low");

    const csv = await fs.readFile(csvPath, "utf8");
    const lines = csv.trim().split("\n");
    assert.equal(lines.length, 2);
    assert.match(lines[0], /^timestamp,language,fullName,email,company/);
    assert.match(lines[1], /Alex Rivera/);
  } finally {
    await close(server);
  }
});

test("language selection localizes the API result and CSV row", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "mulesoft-calc-"));
  const csvPath = path.join(dir, "leads.csv");
  const app = createApp({ leadsCsvPath: csvPath });
  const server = await listen(app);

  try {
    const response = await postJson(server.address().port, {
      ...validPayload,
      language: "es",
      commercialModel: "unsure"
    });
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.result.language, "es");
    assert.match(body.result.cta.headline, /auditoría/);
    assert.match(body.result.signals.at(-1).message, /renovación/);

    const csv = await fs.readFile(csvPath, "utf8");
    assert.match(csv, /Z,es,Alex Rivera/);
  } finally {
    await close(server);
  }
});

test("missing required fields returns 400", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "mulesoft-calc-"));
  const app = createApp({ leadsCsvPath: path.join(dir, "leads.csv") });
  const server = await listen(app);

  try {
    const response = await postJson(server.address().port, { ...validPayload, fullName: "" });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.error, "Validation failed.");
    assert.equal(body.fields.fullName, "Name is required.");
  } finally {
    await close(server);
  }
});

test("invalid email returns 400", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "mulesoft-calc-"));
  const app = createApp({ leadsCsvPath: path.join(dir, "leads.csv") });
  const server = await listen(app);

  try {
    const response = await postJson(server.address().port, { ...validPayload, email: "bad-email" });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.fields.email, "Enter a valid email address.");
  } finally {
    await close(server);
  }
});

test("CSV values with commas, newlines, and quotes are escaped correctly", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "mulesoft-calc-"));
  const csvPath = path.join(dir, "leads.csv");
  const app = createApp({ leadsCsvPath: csvPath });
  const server = await listen(app);

  try {
    const response = await postJson(server.address().port, {
      ...validPayload,
      fullName: 'Alex "A.R." Rivera',
      company: "Example, Co\nNorth"
    });

    assert.equal(response.status, 200);
    const csv = await fs.readFile(csvPath, "utf8");
    assert.match(csv, /"Alex ""A\.R\."" Rivera"/);
    assert.match(csv, /"Example, Co\nNorth"/);
  } finally {
    await close(server);
  }
});
