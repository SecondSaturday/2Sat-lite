import { test, expect } from '@playwright/test';

test.describe('Landing Page Visual Tests', () => {
  const sizes = [
    { width: 1440, height: 900, name: 'desktop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' },
  ];

  for (const size of sizes) {
    test(`renders correctly on ${size.name}`, async ({ page }) => {
      // Set viewport
      await page.setViewportSize({ width: size.width, height: size.height });

      // Navigate to landing page
      await page.goto('http://localhost:3000');

      // Wait for page to load
      await page.waitForSelector('header');

      // Take screenshot for manual inspection
      await page.screenshot({
        path: `screenshots/landing-page-${size.name}.png`,
        fullPage: true,
      });

      // Visual regression test
      await expect(page).toHaveScreenshot(`landing-page-${size.name}.png`);
    });
  }

  test('design system compliance', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.btn-primary');

    // Verify primary button color
    const primaryBtn = page.locator('.btn-primary').first();
    const bgColor = await primaryBtn.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toBe('rgb(164, 66, 254)'); // #a442fe

    // Verify navbar uses DaisyUI classes
    const navbar = page.locator('.navbar').first();
    await expect(navbar).toBeVisible();

    // Verify card components use DaisyUI
    const cards = page.locator('.card');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(0);
  });
});
