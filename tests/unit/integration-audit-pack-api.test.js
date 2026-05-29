const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { createApp } = require("../../src/app");

const validPayload = {
  language: "en",
  fullName: "Taylor Morgan",
  email: "taylor@example.com",
  company: "Example Operations",
  role: "Operations Director",
  website: "example.com",
  companySize: "51-200",
  timeline: "1-3",
  primaryChallenge: "manual-work"
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
  return fetch(`http://127.0.0.1:${port}/integration-audit-pack/api/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "node-test"
    },
    body: JSON.stringify(payload)
  });
}

test("valid audit pack request returns download URL and appends CSV row", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "integration-audit-pack-"));
  const csvPath = path.join(dir, "leads.csv");
  const app = createApp({ integrationAuditPackCsvPath: csvPath });
  const server = await listen(app);

  try {
    const response = await postJson(server.address().port, validPayload);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.download.fileName, "Veridata_Integration_Audit_Pack.docx");
    assert.equal(body.download.url, "/integration-audit-pack/tools/integration-audit-pack/Veridata_Integration_Audit_Pack.docx");

    const csv = await fs.readFile(csvPath, "utf8");
    const lines = csv.trim().split("\n");
    assert.equal(lines.length, 2);
    assert.match(lines[0], /^timestamp,language,fullName,email,company/);
    assert.match(lines[1], /Taylor Morgan/);
    assert.match(lines[1], /manual-work/);
  } finally {
    await close(server);
  }
});

test("invalid audit pack email and website return 400", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "integration-audit-pack-"));
  const app = createApp({ integrationAuditPackCsvPath: path.join(dir, "leads.csv") });
  const server = await listen(app);

  try {
    const response = await postJson(server.address().port, {
      ...validPayload,
      email: "bad-email",
      website: "not a website"
    });
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.fields.email, "Enter a valid email address.");
    assert.equal(body.fields.website, "Enter a valid website.");
  } finally {
    await close(server);
  }
});

test("audit pack CSV values with commas, newlines, and quotes are escaped", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "integration-audit-pack-"));
  const csvPath = path.join(dir, "leads.csv");
  const app = createApp({ integrationAuditPackCsvPath: csvPath });
  const server = await listen(app);

  try {
    const response = await postJson(server.address().port, {
      ...validPayload,
      fullName: 'Taylor "T" Morgan',
      company: "Example, Operations\nLATAM"
    });

    assert.equal(response.status, 200);
    const csv = await fs.readFile(csvPath, "utf8");
    assert.match(csv, /"Taylor ""T"" Morgan"/);
    assert.match(csv, /"Example, Operations\nLATAM"/);
  } finally {
    await close(server);
  }
});
