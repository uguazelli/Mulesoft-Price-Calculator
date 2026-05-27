const { defineConfig } = require("@playwright/test");

const port = process.env.PLAYWRIGHT_PORT || "3100";
const baseURL = `http://127.0.0.1:${port}`;

module.exports = defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: false,
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  },
  webServer: {
    command: `PORT=${port} npm start`,
    url: `${baseURL}/health`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000
  },
  projects: [
    {
      name: "chromium-desktop",
      use: {
        browserName: "chromium",
        viewport: { width: 1440, height: 1100 }
      }
    },
    {
      name: "chromium-mobile",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 900 }
      }
    }
  ]
});
