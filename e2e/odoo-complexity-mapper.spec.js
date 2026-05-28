const { test, expect } = require("@playwright/test");

async function openMobileMenuIfNeeded(page) {
  const menuButton = page.locator("[data-menu-toggle]");
  if (await menuButton.isVisible()) {
    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  }
}

test("Odoo complexity mapper generates a stack map and scoping outputs", async ({ page }) => {
  await page.goto("/odoo-integration-complexity-mapper/");
  await expect(page).toHaveTitle(/Odoo Integration Complexity Mapper/);
  await expect(page.getByRole("heading", { name: "Odoo Integration Complexity Mapper" })).toBeVisible();

  await openMobileMenuIfNeeded(page);
  await page.getByRole("button", { name: "PT", exact: true }).click();
  await expect(page.getByRole("heading", { name: /Mapeador de Complexidade/i })).toBeVisible();

  await openMobileMenuIfNeeded(page);
  await page.getByRole("button", { name: "ES", exact: true }).click();
  await expect(page.getByRole("heading", { name: /Mapeador de Complejidad/i })).toBeVisible();

  await openMobileMenuIfNeeded(page);
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Odoo Integration Complexity Mapper" })).toBeVisible();

  await expect(page.locator(".scroll-cue")).toHaveCount(0);
  await page.locator("#mapper").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: /Salesforce/i }).click();
  await page.getByRole("button", { name: /Shopify/i }).click();
  await page.getByRole("button", { name: /Power BI \/ Tableau/i }).click();
  await page.fill("#customSystemInput", "Warehouse scanner app");
  await page.getByRole("button", { name: "Add system" }).click();
  await expect(page.getByText("4 selected")).toBeVisible();

  await page.getByRole("button", { name: "Continue to Odoo modules" }).click();
  await page.locator('[data-module="Sales"]').click();
  await page.locator('[data-module="Inventory"]').click();
  await page.locator('[data-module="Accounting / Invoicing"]').click();
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
  await expect(page.getByRole("button", { name: "Export result as PDF" })).toBeVisible();

  await page.evaluate(() => {
    window.__printCalled = false;
    window.print = () => {
      window.__printCalled = true;
    };
  });
  await page.getByRole("button", { name: "Export result as PDF" }).click();
  await expect.poll(() => page.evaluate(() => window.__printCalled)).toBe(true);

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});

test("Odoo complexity mapper localizes unknown system result copy in Portuguese and Spanish", async ({ page }) => {
  await page.goto("/odoo-integration-complexity-mapper/");

  await openMobileMenuIfNeeded(page);
  await page.getByRole("button", { name: "PT", exact: true }).click();
  await page.locator("#mapper").scrollIntoViewIfNeeded();

  await page.getByRole("button", { name: /Não sei quais sistemas usamos/i }).click();
  await page.getByRole("button", { name: "Continuar para módulos Odoo" }).click();
  await page.locator('[data-module="Sales"]').click();
  await page.locator('input[name="odooStage"][value="evaluating"]').check();
  await page.locator('input[name="dataVolume"][value="unknown"]').check();
  await page.getByRole("button", { name: "Gerar mapa de complexidade" }).click();

  await expect(page.getByRole("cell", { name: /Não sei quais sistemas usamos/i })).toBeVisible();
  await expect(page.getByText(/Antes de estimar, é preciso inventariar os sistemas/i)).toBeVisible();
  await expect(page.getByText("Revisar escopo técnico").first()).toBeVisible();
  await expect(page.getByText(/Antes de assumir prazo, confirme se existe API/i)).toBeVisible();
  await expect(page.getByText("I'm not sure what I have")).toHaveCount(0);
  await expect(page.getByText("Integration audit required before scoping")).toHaveCount(0);

  await openMobileMenuIfNeeded(page);
  await page.getByRole("button", { name: "ES", exact: true }).click();
  await expect(page.getByRole("cell", { name: /No sé qué sistemas usamos/i })).toBeVisible();
  await expect(page.getByText(/Antes de estimar, hay que inventariar los sistemas/i)).toBeVisible();
  await expect(page.getByText("Revisar alcance técnico").first()).toBeVisible();
  await expect(page.getByText(/Antes de comprometer fechas, confirma si hay API/i)).toBeVisible();
  await expect(page.getByText("I'm not sure what I have")).toHaveCount(0);
  await expect(page.getByText("Integration audit required before scoping")).toHaveCount(0);
});
