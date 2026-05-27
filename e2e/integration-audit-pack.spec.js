const { test, expect } = require("@playwright/test");

test("integration audit pack captures a lead and reveals the document download", async ({ page }) => {
  await page.goto("/integration-audit-pack/");
  await expect(page).toHaveTitle(/Integration Audit Template Pack/);

  async function openMobileMenuIfNeeded() {
    const menuButton = page.locator("[data-menu-toggle]");
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    }
  }

  await openMobileMenuIfNeeded();
  await page.getByRole("button", { name: "PT", exact: true }).click();
  await expect(page.getByRole("heading", { name: /Baixe o pacote/i })).toBeVisible();

  await openMobileMenuIfNeeded();
  await page.getByRole("button", { name: "ES", exact: true }).click();
  await expect(page.getByRole("heading", { name: /Descarga el pack/i })).toBeVisible();

  await openMobileMenuIfNeeded();
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await page.getByRole("link", { name: /Get the audit pack/i }).click();
  await expect(page.getByRole("heading", { name: "Unlock the audit document" })).toBeVisible();

  await page.fill('input[name="fullName"]', "Audit Browser Test");
  await page.fill('input[name="email"]', `audit.${test.info().project.name}@example.com`);
  await page.fill('input[name="company"]', "VeriDataPro Test");
  await page.fill('input[name="role"]', "Operations");
  await page.fill('input[name="website"]', "example.com");
  await page.selectOption('select[name="companySize"]', "51-200");
  await page.selectOption('select[name="primaryChallenge"]', "manual-work");
  await page.selectOption('select[name="timeline"]', "1-3");
  await page.click('button[type="submit"]');

  await expect(page.getByText("VDP / DOWNLOAD READY")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Your audit pack is ready" })).toBeVisible();

  const downloadLink = page.getByRole("link", { name: "Download audit pack" });
  await expect(downloadLink).toBeVisible();
  await expect(downloadLink).toHaveAttribute("href", /Veridata_Integration_Audit_Pack\.docx$/);

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});
