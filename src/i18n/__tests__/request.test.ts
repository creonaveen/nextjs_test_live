import { cookies } from 'next/headers';

import getRequestConfig from '../request';

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

// Mock dynamic import
jest.mock('next-intl/server', () => ({
  getRequestConfig: jest.fn((fn) => fn),
}));

describe('i18n/request', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return locale from cookie', async () => {
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: 'eng' }),
    });

    const result = await getRequestConfig();

    expect(result.locale).toBe('eng');
    expect(result.messages).toBeDefined();
  });

  it('should default to "nor" when language cookie is not present', async () => {
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue(undefined),
    });

    const result = await getRequestConfig();

    expect(result.locale).toBe('nor');
    expect(result.messages).toBeDefined();
  });

  it('should load messages for the specified locale', async () => {
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: 'swe' }),
    });

    // Mock the dynamic import
    const mockMessages = { hello: 'Hej' };
    jest.doMock('../../messages/swe.json', () => ({
      default: mockMessages,
    }));

    const result = await getRequestConfig();

    expect(result.locale).toBe('swe');
  });

  it('should handle different language codes', async () => {
    const languages = ['eng', 'nor', 'swe', 'dan', 'fin'];

    for (const lang of languages) {
      (cookies as jest.Mock).mockResolvedValue({
        get: jest.fn().mockReturnValue({ value: lang }),
      });

      const result = await getRequestConfig();
      expect(result.locale).toBe(lang);
    }
  });
});
