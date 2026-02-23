import { Page, expect } from '@playwright/test';

/**
 * Utility functions for E2E tests
 */

/**
 * Wait for API requests to complete
 */
export async function waitForApiRequests(page: Page, timeout = 5000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Wait for a specific API request to complete
 */
export async function waitForApiResponse(
  page: Page,
  urlPattern: string | RegExp,
  timeout = 10000
): Promise<void> {
  await page.waitForResponse(
    (response) => {
      const url = response.url();
      if (typeof urlPattern === 'string') {
        return url.includes(urlPattern);
      }
      return urlPattern.test(url);
    },
    { timeout }
  );
}

/**
 * Navigate to a route under the base path
 */
export async function navigateToRoute(page: Page, route = '', basePath = '/web'): Promise<void> {
  const fullPath = `${basePath}${route ? `/${route}` : ''}`;
  await page.goto(fullPath);
  await waitForApiRequests(page);
}

/**
 * Check if an element is visible and contains text
 */
export async function expectElementWithText(
  page: Page,
  selector: string,
  text: string | RegExp
): Promise<void> {
  const element = page.locator(selector);
  await expect(element).toBeVisible();
  await expect(element).toContainText(text);
}

/**
 * Fill a form field and verify the value
 */
export async function fillAndVerifyField(
  page: Page,
  selector: string,
  value: string
): Promise<void> {
  const field = page.locator(selector);
  await field.fill(value);
  await expect(field).toHaveValue(value);
}

/**
 * Click an element and wait for navigation or API call
 */
export async function clickAndWait(
  page: Page,
  selector: string,
  waitForNavigation = true
): Promise<void> {
  if (waitForNavigation) {
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle' }), page.click(selector)]);
  } else {
    await page.click(selector);
    await waitForApiRequests(page);
  }
}

/**
 * Take a screenshot with a descriptive name
 */
export async function takeScreenshot(page: Page, name: string, fullPage = false): Promise<void> {
  await page.screenshot({
    path: `e2e/screenshots/${name}-${Date.now()}.png`,
    fullPage,
  });
}

/**
 * Mock API response
 */
export async function mockApiResponse(
  page: Page,
  urlPattern: string | RegExp,
  response: unknown,
  status = 200
): Promise<void> {
  await page.route(urlPattern, (route) => {
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });
}

/**
 * Wait for React Query to finish loading
 */
export async function waitForReactQuery(page: Page, timeout = 10000): Promise<void> {
  // Wait for loading indicators to disappear
  await page.waitForFunction(
    () => {
      const loadingElements = document.querySelectorAll(
        '[data-testid*="loading"], [aria-busy="true"]'
      );
      return loadingElements.length === 0;
    },
    { timeout }
  );
}
