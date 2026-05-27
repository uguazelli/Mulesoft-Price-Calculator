const test = require("node:test");
const assert = require("node:assert/strict");
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
    const mulesoft = await fetch(`${baseUrl}/mulesoft-calculator/`);
    const apiReadiness = await fetch(`${baseUrl}/api-readiness-assessment/`);
    const fileValidator = await fetch(`${baseUrl}/file-validator/`);
    const integrationAuditPack = await fetch(`${baseUrl}/integration-audit-pack/`);
    const fileValidatorHealth = await fetch(`${baseUrl}/file-validator/health`);
    const integrationAuditPackHealth = await fetch(`${baseUrl}/integration-audit-pack/health`);

    assert.equal(health.status, 200);
    assert.equal(mulesoft.status, 200);
    assert.equal(apiReadiness.status, 200);
    assert.equal(fileValidator.status, 200);
    assert.equal(integrationAuditPack.status, 200);
    assert.equal(fileValidatorHealth.status, 200);
    assert.equal(integrationAuditPackHealth.status, 200);

    assert.match(await fileValidator.text(), /Flat File Validation Tool/);
    assert.match(await integrationAuditPack.text(), /Integration Audit Template Pack/);
  } finally {
    await close(server);
  }
});
