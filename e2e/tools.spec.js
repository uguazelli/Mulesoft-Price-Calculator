const { test, expect } = require("@playwright/test");

test("docs directory lists every available tool URL", async ({ page }) => {
  await page.goto("/docs/");
  await expect(page).toHaveTitle(/Docs \| VeriDataPro/);
  await expect(page.getByRole("heading", { name: /Tool URLs/i })).toBeVisible();

  await expect(page.getByRole("link", { name: "/mulesoft-calculator/" })).toHaveAttribute("href", /\/mulesoft-calculator\/$/);
  await expect(page.getByRole("link", { name: "/api-readiness-assessment/" })).toHaveAttribute("href", /\/api-readiness-assessment\/$/);
  await expect(page.getByRole("link", { name: "/file-validator/" })).toHaveAttribute("href", /\/file-validator\/$/);
  await expect(page.getByRole("link", { name: "/integration-audit-pack/" })).toHaveAttribute("href", /\/integration-audit-pack\/$/);

  const menuButton = page.locator("[data-menu-toggle]");
  if (await menuButton.isVisible()) {
    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  }

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});
