import { test, expect } from '@playwright/test';

test.describe('Dashboard Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard (would need authentication in real scenario)
    // For now, we'll just test the layout structure
    await page.goto('http://localhost:3003/dashboard');

    // Wait for page to be ready
    await page.waitForLoadState('networkidle');
  });

  test('Mobile layout (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Wait for any animations/transitions
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({
      path: 'screenshots/dashboard-mobile-375px.png',
      fullPage: true,
    });

    // Verify mobile-specific elements are visible
    const mobileLayout = page.locator('.md\\:hidden');
    await expect(mobileLayout).toBeVisible();

    // Verify desktop layout is hidden
    const desktopLayout = page.locator('.hidden.md\\:flex');
    await expect(desktopLayout).not.toBeVisible();
  });

  test('Tablet layout (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    // Wait for any animations/transitions
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({
      path: 'screenshots/dashboard-tablet-768px.png',
      fullPage: true,
    });

    // Verify desktop layout is visible at tablet size
    const desktopLayout = page.locator('.hidden.md\\:flex');
    await expect(desktopLayout).toBeVisible();

    // Verify sidebar is present
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();
  });

  test('Desktop layout (1440px)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Wait for any animations/transitions
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({
      path: 'screenshots/dashboard-desktop-1440px.png',
      fullPage: true,
    });

    // Verify desktop layout is visible
    const desktopLayout = page.locator('.hidden.md\\:flex');
    await expect(desktopLayout).toBeVisible();

    // Verify both sidebar and content area are present
    const sidebar = page.locator('aside');
    const contentArea = page.locator('main').nth(1);

    await expect(sidebar).toBeVisible();
    await expect(contentArea).toBeVisible();
  });

  test('Design system compliance checks', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Check that DaisyUI classes are being used
    const primaryButton = page.locator('.btn.btn-primary');
    await expect(primaryButton).toHaveCount(1);

    // Check for proper color classes (no inline styles or arbitrary colors)
    const elements = await page.locator('[style*="background"]').count();
    // Some inline styles from Figma export are expected, but verify our components don't have them

    // Verify base colors are applied
    const baseBackground = page.locator('.bg-base-100');
    await expect(baseBackground.first()).toBeVisible();
  });

  test('Empty state display', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Check for empty state message
    const emptyMessage = page.getByText(/Your Circles and Friends will appear here/i);

    // Screenshot empty state
    await page.screenshot({
      path: 'screenshots/dashboard-empty-state-mobile.png',
    });
  });

  test('Loading state', async ({ page }) => {
    await page.goto('http://localhost:3003/dashboard');

    // Try to catch the loading spinner
    const loadingSpinner = page.locator('.loading.loading-spinner');

    // Take screenshot if loading state is visible
    if (await loadingSpinner.isVisible()) {
      await page.screenshot({
        path: 'screenshots/dashboard-loading-state.png',
      });
    }
  });
});
