# Testing Guide

This project uses **Jest** with **React Testing Library** for unit and component testing, and **Playwright** for end-to-end (E2E) integration testing.

## Quick Start

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode
npm run test:ci

# Run integration tests (API and component integration)
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI mode
npm run test:e2e:ui

# Run E2E tests in debug mode
npm run test:e2e:debug

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed

# Run all tests (unit + integration + E2E)
npm run test:all
```

## Test Structure

Tests are organized by type and located in different directories:

### Unit Tests

- Component tests: `src/components/**/__tests__/**/*.test.{ts,tsx}`
- Utility tests: `src/lib/__tests__/**/*.test.ts`
- Date/utils tests: `src/utils/__tests__/**/*.test.ts`
- API service tests: `src/store/api_service/__tests__/**/*.test.ts`

### Integration Tests

- API integration tests: `src/__tests__/integration/api-integration.test.ts`
- Component integration tests: `src/__tests__/integration/component-integration.test.tsx`
- Integration test helpers: `src/__tests__/integration/helpers.ts`

### E2E Tests

- E2E tests: `e2e/**/*.spec.ts`
- E2E fixtures: `e2e/fixtures.ts`
- E2E test helpers: `e2e/utils/test-helpers.ts`

## Writing Tests

### Example: Testing Utility Functions

```typescript
import { cn, setCookie, getCookie } from '@/lib/utils';

describe('cn', () => {
  it('should merge class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });
});
```

### Example: Testing React Components

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Test Configuration

- **Jest Config**: `jest.config.js`
- **Test Setup**: `jest.setup.js` (includes mocks for Next.js, next-intl, next-themes)

## Mocks

Common mocks are set up in `jest.setup.js`:

- Next.js router (`next/navigation`)
- next-intl (`next-intl`)
- next-themes (`next-themes`)

## Best Practices

1. **Test behavior, not implementation**: Test what the component/function does, not how it does it.
2. **Use descriptive test names**: Make it clear what is being tested.
3. **Keep tests simple**: One assertion per test when possible.
4. **Mock external dependencies**: Use Jest mocks for API calls, localStorage, etc.
5. **Test edge cases**: Include tests for error conditions, empty states, etc.

## Example Test Files

- `src/lib/__tests__/utils.test.ts` - Utility function tests
- `src/utils/__tests__/date.test.ts` - Date utility tests
- `src/utils/__tests__/validation-utils.test.ts` - Validation tests
- `src/components/ui/__tests__/button.test.tsx` - Component tests

## Running Specific Tests

```bash
# Run tests for a specific file
npm test -- src/lib/__tests__/utils.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="should render button"

# Run tests in a specific directory
npm test -- src/utils/__tests__/
```

## Coverage

Generate a coverage report:

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory.

## Troubleshooting

### Tests fail with module resolution errors

- Ensure `@/` paths are correctly mapped in `jest.config.js`
- Check that `tsconfig.json` paths match Jest `moduleNameMapper`

### Component tests fail with "useRouter" errors

- Mocks are set up in `jest.setup.js`
- Ensure you're importing from `next/navigation` (not `next/router`)

### Cookie/storage tests fail

- Tests automatically clear cookies after each test
- Mock `localStorage`/`sessionStorage` if needed

## Integration Testing

### API Integration Tests

API integration tests verify that API services work correctly with the API client, including error handling and response processing.

**Location:** `src/__tests__/integration/api-integration.test.ts`

**Example:**

```typescript
import { stockApiService } from '@/store/api_service/stocks_api_service';

describe('API Integration Tests', () => {
  it('should successfully fetch stocks list', async () => {
    mockGet.mockResolvedValue({
      data: mockStockList,
      status: 200,
    });

    const result = await stockApiService.getStocks({
      page: 1,
      limit: 50,
      lang: 'eng',
    });

    expect(result).toEqual(mockStockList);
  });
});
```

### Component Integration Tests

Component integration tests verify that components work correctly with their dependencies (React Query, Zustand, React Hook Form, etc.).

**Location:** `src/__tests__/integration/component-integration.test.tsx`

**Example:**

```typescript
import { QueryWrapper } from '@/__tests__/integration/helpers';

describe('Component Integration Tests', () => {
  it('should handle loading states correctly', async () => {
    render(
      <QueryWrapper>
        <YourComponent />
      </QueryWrapper>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)

E2E tests verify complete user flows in a real browser environment.

**Location:** `e2e/**/*.spec.ts`

**Configuration:** `playwright.config.ts`

**Example:**

```typescript
import { test, expect } from '@playwright/test';

test('should navigate to home page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/);
});
```

**E2E Test Helpers:**

Use the provided test helpers in `e2e/utils/test-helpers.ts`:

```typescript
import { navigateToRoute, waitForApiRequests } from './utils/test-helpers';

test('should load app page', async ({ page }) => {
  await navigateToRoute(page);
  await waitForApiRequests(page);
});
```

**Running E2E Tests:**

1. **Start the dev server** (or use the auto-start feature):

   ```bash
   npm run dev
   ```

2. **Run E2E tests:**

   ```bash
   npm run test:e2e
   ```

3. **Run with UI mode** (interactive):

   ```bash
   npm run test:e2e:ui
   ```

4. **Debug mode** (step through tests):
   ```bash
   npm run test:e2e:debug
   ```

**E2E Test Best Practices:**

1. Use descriptive test names that explain the user flow
2. Use test helpers for common operations (navigation, waiting, etc.)
3. Use fixtures for shared setup (authentication, etc.)
4. Take screenshots on failure (automatically configured)
5. Test on multiple browsers (chromium, firefox, webkit)
6. Test mobile viewports for responsive design

**E2E Test Configuration:**

The Playwright configuration (`playwright.config.ts`) includes:

- Multiple browser projects (Chrome, Firefox, Safari)
- Mobile viewport testing
- Automatic dev server startup
- Screenshot and video capture on failure
- Trace collection for debugging

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Next.js Testing Guide](https://nextjs.org/docs/app/building-your-application/testing/jest)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
