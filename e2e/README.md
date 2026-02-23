# E2E Tests

This directory contains end-to-end (E2E) tests using Playwright.

## Structure

- `*.spec.ts` - Test files
- `fixtures.ts` - Custom Playwright fixtures
- `utils/test-helpers.ts` - Utility functions for tests

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in debug mode
npm run test:e2e:debug

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test e2e/navigation.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
```

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test('should do something', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Investtech/i);
});
```

### Using Test Helpers

```typescript
import { navigateToRoute, waitForApiRequests } from './utils/test-helpers';

test('should load app page', async ({ page }) => {
  await navigateToRoute(page);
  await waitForApiRequests(page);
});
```

### Using Fixtures

```typescript
import { test } from './fixtures';

test('should work with authenticated user', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/web');
  // Test authenticated routes
});
```

## Best Practices

1. Use descriptive test names
2. Use test helpers for common operations
3. Wait for network requests to complete
4. Use data-testid attributes for reliable selectors
5. Take screenshots on failure (automatically configured)
6. Test on multiple browsers and viewports

## Configuration

See `playwright.config.ts` for configuration options including:

- Browser projects (Chrome, Firefox, Safari)
- Mobile viewports
- Dev server auto-start
- Screenshot/video capture
- Trace collection
