const { test, expect } = require("@playwright/test");

test("flat file validator analyzes a CSV and renders report exports", async ({ page }) => {
  await page.goto("/file-validator/");
  await expect(page).toHaveTitle(/Flat File Validation Tool/);

  async function openMobileMenuIfNeeded() {
    const menuButton = page.locator("[data-menu-toggle]");
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    }
  }

  await openMobileMenuIfNeeded();
  await page.getByRole("button", { name: "PT", exact: true }).click();
  await expect(page.getByRole("heading", { name: /Revise arquivos/i })).toBeVisible();

  await openMobileMenuIfNeeded();
  await page.getByRole("button", { name: "ES", exact: true }).click();
  await expect(page.getByRole("heading", { name: /Revisa archivos/i })).toBeVisible();

  await openMobileMenuIfNeeded();
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.locator(".scroll-cue")).toHaveCount(0);
  await page.locator("#validator").scrollIntoViewIfNeeded();

  const csv = [
    "order_id,amount,order_date,active",
    "1,19.95,2025-01-10,true",
    "2,,01/11/2025,false",
    "3,abc,not-a-date,yes",
    "3,abc,not-a-date,yes",
    "bad,row"
  ].join("\n");

  await page.setInputFiles("#fileInput", {
    name: "orders.csv",
    mimeType: "text/csv",
    buffer: Buffer.from(csv)
  });

  await expect(page.getByText("VDP / FILE REPORT")).toBeVisible();
  await expect(page.getByText("Comma").first()).toBeVisible();
  await expect(page.getByText("Rows with wrong number of columns")).toBeVisible();
  await expect(page.getByText("Duplicate rows detected")).toBeVisible();
  await expect(page.getByText("Mixed data types")).toBeVisible();
  await expect(page.getByRole("button", { name: "Download JSON" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Download PDF" })).toBeVisible();
  await expect(page.getByText("Need to integrate this data into your systems?")).toBeVisible();

  await page.selectOption("#delimiterOverride", "pipe");
  await expect(page.getByText("Pipe").first()).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);
});
