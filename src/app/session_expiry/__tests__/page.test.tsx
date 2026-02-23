import { render } from '@testing-library/react';

// Mock next-intl before importing the page
jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(() => Promise.resolve((key: string) => key)),
}));

// Mock dependencies
jest.mock('@/lib/server-cookie', () => ({
  getServerSideLanguage: jest.fn(() => Promise.resolve('eng')),
}));

jest.mock('@/utils/logger-server', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../components/loading', () => ({
  __esModule: true,
  default: () => <div data-testid="session-expiry-skeleton">Loading...</div>,
}));

jest.mock('../components/session-expiry-tab', () => ({
  __esModule: true,
  default: ({ language }: unknown) => (
    <div data-testid="session-expiry-tab">
      SessionExpiryTab: {'app'} - {language}
    </div>
  ),
}));

import SessionExpiryPage from '../page';

describe('SessionExpiryPage', () => {
  it('should render SessionExpiryTab with language', async () => {
    const result = await SessionExpiryPage();

    const { container } = render(result);
    expect(container.querySelector('[data-testid="session-expiry-tab"]')).toBeTruthy();
  });
});
