const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { createApp } = require("../src/app");

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

test("all tool frontends and health checks are mounted", async () => {
  const app = createApp();
  const server = await listen(app);
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  try {
    const health = await fetch(`${baseUrl}/health`);
    const docs = await fetch(`${baseUrl}/docs`);
    const docsHealth = await fetch(`${baseUrl}/docs/health`);
    const mulesoft = await fetch(`${baseUrl}/mulesoft-calculator/`);
    const apiReadiness = await fetch(`${baseUrl}/api-readiness-assessment/`);
    const fileValidator = await fetch(`${baseUrl}/file-validator/`);
    const integrationAuditPack = await fetch(`${baseUrl}/integration-audit-pack/`);
    const fileValidatorHealth = await fetch(`${baseUrl}/file-validator/health`);
    const integrationAuditPackHealth = await fetch(`${baseUrl}/integration-audit-pack/health`);

    assert.equal(health.status, 200);
    assert.equal(docs.status, 200);
    assert.equal(docsHealth.status, 200);
    assert.equal(mulesoft.status, 200);
    assert.equal(apiReadiness.status, 200);
    assert.equal(fileValidator.status, 200);
    assert.equal(integrationAuditPack.status, 200);
    assert.equal(fileValidatorHealth.status, 200);
    assert.equal(integrationAuditPackHealth.status, 200);

    const docsHtml = await docs.text();
    assert.match(docsHtml, /Tool URLs/);
    assert.match(docsHtml, /MuleSoft Cost &amp; Utilization Risk Calculator/);
    assert.match(await fileValidator.text(), /Flat File Validation Tool/);
    assert.match(await integrationAuditPack.text(), /Integration Audit Template Pack/);
  } finally {
    await close(server);
  }
});

test("tool HTML is re-read in development for hot reload", async () => {
  const publicDir = await fs.mkdtemp(path.join(os.tmpdir(), "vdp-tools-public-"));
  const htmlPath = path.join(publicDir, "tools", "mulesoft-calculator");
  await fs.mkdir(htmlPath, { recursive: true });
  await fs.writeFile(path.join(htmlPath, "index.html"), "first __BASE_PATH__");

  const previousNodeEnv = process.env.NODE_ENV;
  let app;
  try {
    process.env.NODE_ENV = "development";
    app = createApp({ publicDir });
  } finally {
    if (previousNodeEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = previousNodeEnv;
    }
  }

  const server = await listen(app);
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  try {
    const first = await fetch(`${baseUrl}/mulesoft-calculator/`);
    assert.match(await first.text(), /first \/mulesoft-calculator/);

    await fs.writeFile(path.join(htmlPath, "index.html"), "second __BASE_PATH__");
    const second = await fetch(`${baseUrl}/mulesoft-calculator/`);
    assert.match(await second.text(), /second \/mulesoft-calculator/);
  } finally {
    await close(server);
    await fs.rm(publicDir, { recursive: true, force: true });
  }
});
