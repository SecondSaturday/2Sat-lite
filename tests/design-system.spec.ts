import { test, expect } from '@playwright/test';

/**
 * Design System Compliance Tests
 * Verifies that all pages follow the DaisyUI Cupcake theme
 */

test.describe('Design System Visual Tests', () => {
  test('Dashboard - Desktop', async ({ page }) => {
    await page.goto('/dashboard');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Take screenshot at desktop resolution
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page).toHaveScreenshot('dashboard-desktop.png');
  });

  test('Dashboard - Tablet', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page).toHaveScreenshot('dashboard-tablet.png');
  });

  test('Dashboard - Mobile', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('dashboard-mobile.png');
  });

  test('Home Page - Desktop', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page).toHaveScreenshot('home-desktop.png');
  });

  test('Home Page - Mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('home-mobile.png');
  });

  test('Logo is visible and uses primary color', async ({ page }) => {
    await page.goto('/dashboard');

    // Check logo is visible
    const logo = page.locator('svg[aria-label="2Sat Logo"]').first();
    await expect(logo).toBeVisible();

    // Verify logo has the primary color class
    await expect(logo).toHaveClass(/text-primary/);
  });

  test('Design tokens are applied correctly', async ({ page }) => {
    await page.goto('/dashboard');

    // Check that DaisyUI classes are present
    const navbar = page.locator('.navbar').first();
    await expect(navbar).toBeVisible();

    const button = page.locator('.btn-primary').first();
    await expect(button).toBeVisible();
  });
});
