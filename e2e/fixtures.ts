import { test as base, type Page } from '@playwright/test';
import { configuration } from '../src/environment/configuration';

/**
 * Custom test fixtures for E2E tests
 * Extend this to add custom fixtures like authentication, API mocking, etc.
 */

type TestFixtures = {
  basePath: string;
  authenticatedPage: Page;
};

export const test = base.extend<TestFixtures>({
  basePath: async ({}, use) => {
    await use(configuration.BASE_PATH);
  },

  /**
   * Authenticated page fixture
   * Use this when you need to test authenticated routes
   * Note: You'll need to implement actual authentication logic
   */
  authenticatedPage: async ({ page, basePath }, use) => {
    // Set up authentication cookies or session
    // This is a placeholder - implement based on your auth mechanism
    await page.context().addCookies([
      {
        name: 'websid',
        value: 'test-session-token',
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
      },
    ]);

    await use(page);
  },
});

export { expect } from '@playwright/test';
