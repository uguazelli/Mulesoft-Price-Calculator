const { test, expect } = require("@playwright/test");

test("tools directory lists every available tool", async ({ page }) => {
  await page.goto("/tools/");
  await expect(page).toHaveTitle(/Tools \| VeriDataPro/);
  await expect(page.getByRole("heading", { name: /Practical checks before integration work starts/i })).toBeVisible();

  await expect(page.getByRole("link", { name: /Open calculator/i })).toHaveAttribute("href", /\/mulesoft-calculator\/$/);
  await expect(page.getByRole("link", { name: /Open assessment/i })).toHaveAttribute("href", /\/api-readiness-assessment\/$/);
  await expect(page.getByRole("link", { name: /Open validator/i })).toHaveAttribute("href", /\/file-validator\/$/);
  await expect(page.getByRole("link", { name: /Open audit pack/i })).toHaveAttribute("href", /\/integration-audit-pack\/$/);

  const menuButton = page.locator("[data-menu-toggle]");
  if (await menuButton.isVisible()) {
    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  }

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});
