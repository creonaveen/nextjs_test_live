// Mock dependencies first before importing NextRequest
jest.mock('@/environment/configuration', () => ({
  configuration: {
    DEFAULT_MARKET_ID: '1',
    DEFAULT_LANGUAGE: 'eng',
  },
}));

jest.mock('@/utils/validation-utils', () => ({
  validateMarketIdAgainstList: jest.fn((id: string) => ({
    isValid: ['1', '451', '351'].includes(id),
    error: ['1', '451', '351'].includes(id) ? undefined : 'Invalid market ID',
  })),
  validateLanguageAgainstList: jest.fn((lang: string) => ({
    isValid: ['eng', 'nor', 'swe'].includes(lang),
    error: ['eng', 'nor', 'swe'].includes(lang) ? undefined : 'Invalid language',
  })),
}));

import { NextRequest, NextResponse } from 'next/server';

import { configuration } from '../environment/configuration';
import {
  shouldExcludePath,
  extractMarketId,
  extractLanguage,
  extractLimit,
  isTablePage,
  validateUrlMarketId,
  validateUrlLanguage,
  validateUrlLimit,
  setMarketIdCookie,
  setLanguageCookie,
  getMarketIdWithDefault,
  getLanguageWithDefault,
  ensureDefaultCookies,
  addDebugHeaders,
} from '../middleware.config';

// Helper to create NextRequest in test environment
function createMockRequest(url: string, options?: { headers?: HeadersInit }) {
  const urlObj = new URL(url);

  // Create a mock request with proper cookies support
  const mockHeaders = new Headers(options?.headers);

  // Parse cookies from headers if present
  const cookieHeader = mockHeaders.get('cookie') || '';
  const cookies = new Map<string, string>();

  if (cookieHeader) {
    cookieHeader.split(';').forEach((cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key && value) {
        cookies.set(key, value);
      }
    });
  }

  // Create a mock NextRequest-like object
  const mockRequest = {
    nextUrl: {
      pathname: urlObj.pathname,
      searchParams: urlObj.searchParams,
      clone: () => ({
        pathname: urlObj.pathname,
        searchParams: new URLSearchParams(urlObj.searchParams),
      }),
    },
    cookies: {
      get: (name: string) => {
        const value = cookies.get(name);
        return value ? { value } : undefined;
      },
      set: jest.fn(),
      has: (name: string) => cookies.has(name),
      delete: jest.fn(),
      getAll: () => Array.from(cookies.entries()).map(([name, value]) => ({ name, value })),
    },
    headers: mockHeaders,
    url: url,
  } as unknown as NextRequest;

  return mockRequest;
}

// Helper to create NextResponse in test environment
function createMockResponse() {
  const responseHeaders = new Headers();
  type CookieOptions = {
    maxAge?: number;
    path?: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
  };
  const responseCookies = new Map<string, { value: string; options?: CookieOptions }>();

  return {
    cookies: {
      get: (name: string) => {
        const cookie = responseCookies.get(name);
        return cookie ? { value: cookie.value } : undefined;
      },
      set: jest.fn((name: string, value: string, options?: CookieOptions) => {
        responseCookies.set(name, { value, options });
      }),
      has: (name: string) => responseCookies.has(name),
      delete: jest.fn((name: string) => {
        responseCookies.delete(name);
      }),
      getAll: () =>
        Array.from(responseCookies.entries()).map(([name, cookie]) => ({
          name,
          value: cookie.value,
        })),
    },
    headers: {
      get: (name: string) => responseHeaders.get(name),
      set: jest.fn((name: string, value: string) => {
        responseHeaders.set(name, value);
      }),
      has: (name: string) => responseHeaders.has(name),
      delete: jest.fn((name: string) => {
        responseHeaders.delete(name);
      }),
      getAll: () => Array.from(responseHeaders.entries()).map(([name, value]) => ({ name, value })),
    },
  } as unknown as NextResponse;
}

describe('middleware.config', () => {
  let mockResponse: NextResponse;

  beforeEach(() => {
    mockResponse = createMockResponse();
    jest.clearAllMocks();
  });

  describe('shouldExcludePath', () => {
    it('should exclude static paths', () => {
      expect(shouldExcludePath('/_next/static/test')).toBe(true);
      expect(shouldExcludePath('/_next/image/test')).toBe(true);
    });

    it('should exclude file extensions', () => {
      expect(shouldExcludePath('/test.svg')).toBe(true);
      expect(shouldExcludePath('/test.png')).toBe(true);
      expect(shouldExcludePath('/test.jpg')).toBe(true);
    });

    it('should not exclude regular paths', () => {
      expect(shouldExcludePath('/test')).toBe(false);
      expect(shouldExcludePath('/page')).toBe(false);
    });
  });

  describe('extractMarketId', () => {
    it('should extract market_id from query params', () => {
      const request = createMockRequest('http://localhost:3000/test?market_id=451');
      expect(extractMarketId(request)).toBe('451');
    });

    it('should extract marketId from query params', () => {
      const request = createMockRequest('http://localhost:3000/test?marketId=351');
      expect(extractMarketId(request)).toBe('351');
    });

    it('should return null when market_id is not present', () => {
      const request = createMockRequest('http://localhost:3000/test');
      expect(extractMarketId(request)).toBeNull();
    });
  });

  describe('extractLanguage', () => {
    it('should extract language from query params', () => {
      const request = createMockRequest('http://localhost:3000/test?language=nor');
      expect(extractLanguage(request)).toBe('nor');
    });

    it('should extract lang from query params', () => {
      const request = createMockRequest('http://localhost:3000/test?lang=swe');
      expect(extractLanguage(request)).toBe('swe');
    });

    it('should return null when language is not present', () => {
      const request = createMockRequest('http://localhost:3000/test');
      expect(extractLanguage(request)).toBeNull();
    });
  });

  describe('extractLimit', () => {
    it('should extract limit from query params', () => {
      const request = createMockRequest('http://localhost:3000/test?limit=50');
      expect(extractLimit(request)).toBe(50);
    });

    it('should return null when limit is not present', () => {
      const request = createMockRequest('http://localhost:3000/test');
      expect(extractLimit(request)).toBeNull();
    });

    it('should return null for invalid limit', () => {
      const request = createMockRequest('http://localhost:3000/test?limit=invalid');
      expect(extractLimit(request)).toBeNull();
    });
  });

  describe('isTablePage', () => {
    it('should return true for stocks page', () => {
      expect(isTablePage('/stocks')).toBe(true);
    });

    it('should return true for indices page', () => {
      expect(isTablePage('/indices')).toBe(true);
    });

    it('should return true for watchlist page', () => {
      expect(isTablePage('/watchlist')).toBe(true);
    });

    it('should return true for mynotes page', () => {
      expect(isTablePage('/mynotes')).toBe(true);
    });

    it('should return true for top50 page', () => {
      expect(isTablePage('/top50')).toBe(true);
    });

    it('should return false for non-table pages', () => {
      expect(isTablePage('/home')).toBe(false);
      expect(isTablePage('/company/123')).toBe(false);
    });
  });

  describe('validateUrlMarketId', () => {
    it('should not throw for valid market_id', () => {
      const request = createMockRequest('http://localhost:3000/test?market_id=1');
      expect(() => validateUrlMarketId(request)).not.toThrow();
    });

    it('should throw for invalid market_id', () => {
      const request = createMockRequest('http://localhost:3000/test?market_id=999');
      expect(() => validateUrlMarketId(request)).toThrow();
    });

    it('should not throw when market_id is not present', () => {
      const request = createMockRequest('http://localhost:3000/test');
      expect(() => validateUrlMarketId(request)).not.toThrow();
    });
  });

  describe('validateUrlLanguage', () => {
    it('should not throw for valid language', () => {
      const request = createMockRequest('http://localhost:3000/test?lang=eng');
      expect(() => validateUrlLanguage(request)).not.toThrow();
    });

    it('should throw for invalid language', () => {
      const request = createMockRequest('http://localhost:3000/test?lang=fr');
      expect(() => validateUrlLanguage(request)).toThrow();
    });

    it('should not throw when language is not present', () => {
      const request = createMockRequest('http://localhost:3000/test');
      expect(() => validateUrlLanguage(request)).not.toThrow();
    });
  });

  describe('validateUrlLimit', () => {
    it('should not throw for valid limit on table page', () => {
      const request = createMockRequest('http://localhost:3000/stocks?limit=50');
      expect(() => validateUrlLimit(request)).not.toThrow();
    });

    it('should throw for limit > 9999 on table page', () => {
      const request = createMockRequest('http://localhost:3000/stocks?limit=10000');
      expect(() => validateUrlLimit(request)).toThrow('Maximum allowed limit is 9999');
    });

    it('should not validate limit on non-table pages', () => {
      const request = createMockRequest('http://localhost:3000/home?limit=10000');
      expect(() => validateUrlLimit(request)).not.toThrow();
    });
  });

  describe('setMarketIdCookie', () => {
    it('should set market_id cookie', () => {
      setMarketIdCookie(mockResponse, '451');
      const cookie = mockResponse.cookies.get('market_id');
      expect(cookie?.value).toBe('451');
    });
  });

  describe('setLanguageCookie', () => {
    it('should set language cookie', () => {
      setLanguageCookie(mockResponse, 'nor');
      const cookie = mockResponse.cookies.get('language');
      expect(cookie?.value).toBe('nor');
    });
  });

  describe('getMarketIdWithDefault', () => {
    it('should return market_id from URL', () => {
      const request = createMockRequest('http://localhost:3000/test?market_id=451');
      expect(getMarketIdWithDefault(request)).toBe('451');
    });

    it('should return market_id from cookie when URL is empty', () => {
      const request = createMockRequest('http://localhost:3000/test', {
        headers: {
          cookie: 'market_id=351',
        },
      });
      expect(getMarketIdWithDefault(request)).toBe('351');
    });

    it('should return default when neither URL nor cookie present', () => {
      const request = createMockRequest('http://localhost:3000/test');
      expect(getMarketIdWithDefault(request)).toBe(configuration.DEFAULT_MARKET_ID);
    });
  });

  describe('getLanguageWithDefault', () => {
    it('should return language from URL', () => {
      const request = createMockRequest('http://localhost:3000/test?lang=nor');
      expect(getLanguageWithDefault(request)).toBe('nor');
    });

    it('should return language from cookie when URL is empty', () => {
      const request = createMockRequest('http://localhost:3000/test', {
        headers: {
          cookie: 'language=swe',
        },
      });
      expect(getLanguageWithDefault(request)).toBe('swe');
    });

    it('should return default when neither URL nor cookie present', () => {
      const request = createMockRequest('http://localhost:3000/test');
      expect(getLanguageWithDefault(request)).toBe(configuration.DEFAULT_LANGUAGE);
    });
  });
  describe('ensureDefaultCookies', () => {
    it('should set cookies when they are missing', () => {
      const request = createMockRequest('http://localhost:3000/test');
      ensureDefaultCookies(mockResponse, request);

      const marketIdCookie = mockResponse.cookies.get('market_id');
      const languageCookie = mockResponse.cookies.get('language');

      expect(marketIdCookie?.value).toBe(configuration.DEFAULT_MARKET_ID);
      expect(languageCookie?.value).toBe(configuration.DEFAULT_LANGUAGE);
    });

    it('should update cookies when URL params differ', () => {
      const request = createMockRequest('http://localhost:3000/test?market_id=451&lang=nor', {
        headers: {
          cookie: 'market_id=1; language=eng',
        },
      });
      ensureDefaultCookies(mockResponse, request);

      const marketIdCookie = mockResponse.cookies.get('market_id');
      const languageCookie = mockResponse.cookies.get('language');

      expect(marketIdCookie?.value).toBe('451');
      expect(languageCookie?.value).toBe('nor');
    });

    it('should not update cookies when values match', () => {
      const request = createMockRequest('http://localhost:3000/test?market_id=1&lang=eng', {
        headers: {
          cookie: 'market_id=1; language=eng',
        },
      });
      const setSpy = jest.spyOn(mockResponse.cookies, 'set');
      ensureDefaultCookies(mockResponse, request);

      // Cookies should not be set if they already match
      expect(setSpy).not.toHaveBeenCalled();
      setSpy.mockRestore();
    });

    it('should fallback to default for invalid market_id', () => {
      const request = createMockRequest('http://localhost:3000/test?market_id=999');
      ensureDefaultCookies(mockResponse, request);

      const marketIdCookie = mockResponse.cookies.get('market_id');
      expect(marketIdCookie?.value).toBe(configuration.DEFAULT_MARKET_ID);
    });

    it('should fallback to default for invalid language', () => {
      const request = createMockRequest('http://localhost:3000/test?lang=fr');
      ensureDefaultCookies(mockResponse, request);

      const languageCookie = mockResponse.cookies.get('language');
      expect(languageCookie?.value).toBe(configuration.DEFAULT_LANGUAGE);
    });
  });

  describe('addDebugHeaders', () => {
    it('should add debug headers to response', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const request = createMockRequest('http://localhost:3000/test?market_id=1&lang=eng');
      addDebugHeaders(mockResponse, request);

      expect(mockResponse.headers.get('x-pathname')).toBe('/test');
      expect(mockResponse.headers.get('x-market-id')).toBe('1');
      expect(mockResponse.headers.get('x-language')).toBe('eng');
      expect(mockResponse.headers.get('x-timestamp')).toBeDefined();

      process.env.NODE_ENV = originalEnv;
    });
  });
});
