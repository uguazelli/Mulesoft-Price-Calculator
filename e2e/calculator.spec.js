const { test, expect } = require("@playwright/test");

test("calculator captures a lead and renders the report", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/MuleSoft Cost & Utilization Risk Calculator/);

  await page.selectOption("select[name=deploymentModel]", "cloudhub2");
  await page.selectOption("select[name=commercialModel]", "vcore");
  await page.fill("input[name=productionCores]", "12");
  await page.fill("input[name=sandboxCores]", "10");
  await page.fill("input[name=runningApplications]", "24");
  await page.fill("input[name=managedApis]", "40");
  await page.selectOption("select[name=renewalTimeline]", "3-6");
  await page.check("input[value=apiManager]");
  await page.check("input[value=mq]");

  await expect(page.locator("#preview")).toBeVisible();

  await page.fill("input[name=fullName]", "Browser Test");
  await page.fill("input[name=email]", `browser.${test.info().project.name}@example.com`);
  await page.fill("input[name=company]", "VeriDataPro Test");
  await page.click("button[type=submit]");

  await expect(page.getByText("VDP / REPORT CAPTURED")).toBeVisible();
  await expect(page.locator("#resultPanel").getByRole("heading", { name: /utilization risk/i })).toBeVisible();
  await expect(page.getByText("Request audit follow-up")).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});
