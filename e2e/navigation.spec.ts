import { test, expect } from '@playwright/test';
import { navigateToRoute, waitForApiRequests } from './utils/test-helpers';

test.describe('Navigation', () => {
  const basePath = '/web';

  test.beforeEach(async ({ page }) => {
    await navigateToRoute(page, '', basePath);
  });

  test('should navigate to home page', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp(basePath));
    await waitForApiRequests(page);
  });

  test('should display page title', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check that page has a title
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('should handle language switching', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Look for language selector (adjust selector based on your implementation)
    const languageSelector = page
      .locator('[data-testid="language-selector"], [aria-label*="language"], select[name*="lang"]')
      .first();

    if ((await languageSelector.count()) > 0) {
      await languageSelector.click();
      await waitForApiRequests(page);

      // Verify URL contains language parameter or cookie is set
      const url = page.url();
      const cookies = await page.context().cookies();
      const hasLanguageParam =
        url.includes('lang=') || cookies.some((c) => c.name.includes('language'));

      expect(hasLanguageParam).toBeTruthy();
    }
  });

  test('should handle market switching', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Look for market selector (adjust selector based on your implementation)
    const marketSelector = page
      .locator('[data-testid="market-selector"], [aria-label*="market"], select[name*="market"]')
      .first();

    if ((await marketSelector.count()) > 0) {
      await marketSelector.click();
      await waitForApiRequests(page);

      // Verify URL contains market parameter or cookie is set
      const url = page.url();
      const cookies = await page.context().cookies();
      const hasMarketParam =
        url.includes('market_id=') || cookies.some((c) => c.name.includes('market'));

      expect(hasMarketParam).toBeTruthy();
    }
  });
});
