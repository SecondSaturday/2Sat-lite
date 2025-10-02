import { test, expect } from '@playwright/test';

test.describe('Dashboard Visual Tests', () => {
  const sizes = [
    { width: 1440, height: 900, name: 'desktop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' },
  ];

  for (const size of sizes) {
    test(`renders correctly on ${size.name}`, async ({ page }) => {
      // Set viewport
      await page.setViewportSize({ width: size.width, height: size.height });

      // Navigate to dashboard (requires authentication)
      await page.goto('http://localhost:3000/dashboard');

      // Wait for page to load
      await page.waitForSelector('.navbar');

      // Take screenshot for manual inspection
      await page.screenshot({
        path: `screenshots/dashboard-${size.name}.png`,
        fullPage: true,
      });

      // Visual regression test
      await expect(page).toHaveScreenshot(`dashboard-${size.name}.png`);
    });
  }

  test('design system compliance', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForSelector('.navbar');

    // Verify navbar uses DaisyUI component
    const navbar = page.locator('.navbar').first();
    await expect(navbar).toBeVisible();

    // Verify primary button exists and uses correct color
    const primaryBtn = page.locator('.btn-primary').first();
    const bgColor = await primaryBtn.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(bgColor).toBe('rgb(164, 66, 254)'); // #a442fe

    // Verify background color
    const main = page.locator('main').first();
    const mainBg = await main.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );
    // Should be transparent or inherit base-100
    expect(mainBg).toMatch(/rgba?\(248, 242, 237|transparent/);
  });
});
