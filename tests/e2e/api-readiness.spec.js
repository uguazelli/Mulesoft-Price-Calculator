const { test, expect } = require("@playwright/test");

test("API readiness assessment captures a lead and renders the report", async ({ page }) => {
  await page.goto("/api-readiness-assessment/");
  await expect(page).toHaveTitle(/API Readiness Assessment Tool/);

  async function openMobileMenuIfNeeded() {
    const menuButton = page.locator("[data-menu-toggle]");
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    }
  }

  await openMobileMenuIfNeeded();
  await page.getByRole("button", { name: "PT", exact: true }).click();
  await expect(page.getByRole("heading", { name: /sistemas estão prontos/i })).toBeVisible();

  await openMobileMenuIfNeeded();
  await page.getByRole("button", { name: "ES", exact: true }).click();
  await expect(page.getByRole("heading", { name: /sistemas están listos/i })).toBeVisible();

  await openMobileMenuIfNeeded();
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.getByRole("heading", { name: /systems are ready to integrate/i })).toBeVisible();
  await expect(page.locator(".scroll-cue")).toHaveCount(0);
  await page.locator("#assessment").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "Integration readiness" })).toBeVisible();

  await page.check('input[name="systemsCount"][value="4-7"]');
  await page.check('input[name="systemTypes"][value="odoo"]');
  await page.check('input[name="systemTypes"][value="crm"]');
  await page.check('input[name="systemTypes"][value="ecommerce"]');
  await page.check('input[name="manualCopyFrequency"][value="daily"]');
  await page.check('input[name="spreadsheetDependency"][value="heavy"]');
  await page.check('input[name="apiAvailability"][value="unknown"]');
  await page.check('input[name="sourceOfTruth"][value="unclear"]');
  await page.check('input[name="dataQuality"][value="minor"]');
  await page.check('input[name="reportingConsistency"][value="differentTeams"]');
  await page.check('input[name="integrationReliability"][value="occasional"]');
  await page.check('input[name="systemOwnership"][value="someOwners"]');
  await page.check('input[name="upcomingMigration"][value="plannedDataConcerns"]');
  await page.fill('textarea[name="biggestProblem"]', "Order and finance updates are copied manually every morning.");

  await expect(page.locator("#preview")).toBeVisible();

  await page.fill('input[name="fullName"]', "API Browser Test");
  await page.fill('input[name="email"]', `api.${test.info().project.name}@example.com`);
  await page.fill('input[name="company"]', "VeriDataPro Test");
  await page.fill('input[name="website"]', "example.com");
  await page.selectOption('select[name="companySize"]', "51-200");
  await page.selectOption('select[name="timeline"]', "1-3");
  await page.click('button[type="submit"]');

  await expect(page.getByText("VDP / REPORT CAPTURED")).toBeVisible();
  await expect(page.locator("#resultPanel").getByRole("heading", { name: /readiness/i })).toBeVisible();
  await expect(page.getByText("Book an integration review with VeriDataPro")).toBeVisible();
  await expect(page.getByText("Category scores")).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});
