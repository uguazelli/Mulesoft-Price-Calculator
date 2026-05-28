const { test, expect } = require("@playwright/test");

test("Odoo complexity mapper generates a stack map and scoping outputs", async ({ page }) => {
  await page.goto("/odoo-integration-complexity-mapper/");
  await expect(page).toHaveTitle(/Odoo Integration Complexity Mapper/);
  await expect(page.getByRole("heading", { name: "Odoo Integration Complexity Mapper" })).toBeVisible();

  await page.getByRole("link", { name: /Start mapping/i }).click();
  await page.getByRole("button", { name: /Salesforce/i }).click();
  await page.getByRole("button", { name: /Shopify/i }).click();
  await page.getByRole("button", { name: /Power BI \/ Tableau/i }).click();
  await page.fill("#customSystemInput", "Warehouse scanner app");
  await page.getByRole("button", { name: "Add system" }).click();
  await expect(page.getByText("4 selected")).toBeVisible();

  await page.getByRole("button", { name: "Continue to Odoo modules" }).click();
  await page.getByRole("button", { name: /^Sales Odoo module$/ }).click();
  await page.getByRole("button", { name: /^Inventory Odoo module$/ }).click();
  await page.getByRole("button", { name: /^Accounting \/ Invoicing Odoo module$/ }).click();
  await page.getByLabel("Currently evaluating").check();
  await page.getByLabel("High (1000+)").check();
  await page.getByRole("button", { name: "Generate complexity map" }).click();

  await expect(page.getByRole("heading", { name: "Odoo integration complexity results" })).toBeVisible();
  await expect(page.getByText("A / Visual stack map")).toBeVisible();
  await expect(page.locator("#stackMap .odoo-node")).toBeVisible();
  await expect(page.locator('#stackMap .map-node[data-system="Salesforce"]')).toBeVisible();
  await expect(page.locator('#stackMap .map-line.high')).toHaveCount(1);
  await expect(page.locator('#stackMap .map-line.medium')).toHaveCount(1);
  await expect(page.locator('#stackMap .map-line.low')).toHaveCount(1);
  await expect(page.locator('#stackMap .map-line.unknown')).toHaveCount(1);

  await page.locator('#stackMap .map-node[data-system="Salesforce"]').click();
  await expect(page.locator("#mapTooltip")).toContainText("No reliable native sync");

  await expect(page.getByRole("cell", { name: "Salesforce" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Shopify" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Warehouse scanner app" })).toBeVisible();
  await expect(page.getByText("Custom build conversation").first()).toBeVisible();
  await expect(page.getByText("Tackle first").first()).toBeVisible();
  await expect(page.getByText("Tackle later").first()).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});
