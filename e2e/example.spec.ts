import { test, expect } from '@playwright/test';

/**
 * Example E2E test demonstrating basic navigation and page structure
 * Replace with actual test cases for your application
 */
test.describe('Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Investtech/i);
  });

  test('should display navigation elements', async ({ page }) => {
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check for common navigation elements
    // Adjust selectors based on your actual implementation
    const header = page.locator('header, [role="banner"]').first();
    await expect(header).toBeVisible();
  });
});
