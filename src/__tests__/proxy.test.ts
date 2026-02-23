// Mock NextResponse before importing
jest.mock('next/server', () => {
  const mockNextResponse = {
    next: jest.fn(() => ({
      cookies: {
        set: jest.fn(),
        get: jest.fn(),
      },
      headers: new Headers(),
      status: 200,
    })),
    redirect: jest.fn((url: string | URL) => {
      const headers = new Headers();
      const urlString = typeof url === 'string' ? url : url.toString();
      headers.set('location', urlString);
      return {
        headers,
        status: 307,
      };
    }),
  };

  return {
    NextRequest: jest.requireActual('next/server').NextRequest,
    NextResponse: mockNextResponse,
  };
});

// Mock dependencies
jest.mock('../middleware.config', () => ({
  shouldExcludePath: jest.fn(),
  addDebugHeaders: jest.fn(),
  ensureDefaultCookies: jest.fn(),
  setAuthCookie: jest.fn(),
  validateUrlMarketId: jest.fn(),
  validateUrlLanguage: jest.fn(),
  validateUrlLimit: jest.fn(),
}));

jest.mock('@/environment/configuration', () => ({
  configuration: {
    AUTH_ENABLED: true,
  },
}));

import { NextRequest, NextResponse as mockNextResponse } from 'next/server';

import * as middlewareConfig from '../middleware.config';
import { proxy } from '../proxy';

// Helper to create NextRequest mock
function createMockRequest(url: string, options?: { method?: string; headers?: HeadersInit }) {
  const urlObj = new URL(url);
  const mockHeaders = new Headers(options?.headers);

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

  return {
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
    },
    headers: mockHeaders,
    method: options?.method || 'GET',
    url: url,
  } as unknown as NextRequest;
}

describe('proxy', () => {
  const {
    shouldExcludePath,
    addDebugHeaders,
    ensureDefaultCookies,
    setAuthCookie,
    validateUrlMarketId,
    validateUrlLanguage,
    validateUrlLimit,
  } = middlewareConfig as jest.Mocked<typeof middlewareConfig>;

  let testCounter = 0;

  beforeEach(() => {
    jest.clearAllMocks();
    if (mockNextResponse.next) mockNextResponse.next.mockClear();
    if (mockNextResponse.redirect) mockNextResponse.redirect.mockClear();
    testCounter++;
  });

  it('should skip JSON requests', async () => {
    const uniqueUrl = `http://localhost:3000/test-json-${Date.now()}`;
    const request = createMockRequest(uniqueUrl, {
      headers: { 'content-type': 'application/json' },
    });

    const response = await proxy(request);

    // shouldExcludePath is called first, then JSON check happens
    // So shouldExcludePath will be called, but proxy returns early for JSON
    expect(shouldExcludePath).toHaveBeenCalled();
    expect(mockNextResponse.next).toHaveBeenCalled();
    expect(response).toBeDefined();
    // Verify that other proxy functions are not called for JSON requests
    expect(middlewareConfig.ensureDefaultCookies).not.toHaveBeenCalled();
  });

  it('should skip excluded paths', async () => {
    (shouldExcludePath as jest.Mock).mockReturnValue(true);
    const uniqueUrl = `http://localhost:3000/_next/static/test-${Date.now()}`;
    const request = createMockRequest(uniqueUrl);

    const response = await proxy(request);

    expect(shouldExcludePath).toHaveBeenCalled();
    expect(mockNextResponse.next).toHaveBeenCalled();
    expect(response).toBeDefined();
  });

  it('should skip validation for not-found page', async () => {
    (shouldExcludePath as jest.Mock).mockReturnValue(false);
    // Use exact /not-found pathname as proxy checks for this exact path
    const request = createMockRequest('http://localhost:3000/not-found');

    const response = await proxy(request);

    expect(validateUrlLanguage).not.toHaveBeenCalled();
    expect(validateUrlMarketId).not.toHaveBeenCalled();
    expect(mockNextResponse.next).toHaveBeenCalled();
    expect(response).toBeDefined();
  });

  it('should validate and process valid requests', async () => {
    (shouldExcludePath as jest.Mock).mockReturnValue(false);
    (validateUrlLanguage as jest.Mock).mockImplementation(() => {});
    (validateUrlMarketId as jest.Mock).mockImplementation(() => {});
    (validateUrlLimit as jest.Mock).mockImplementation(() => {});
    (ensureDefaultCookies as jest.Mock).mockImplementation(() => {});
    (setAuthCookie as jest.Mock).mockResolvedValue(undefined);
    (addDebugHeaders as jest.Mock).mockImplementation(() => {});

    // Use a unique URL with counter and timestamp to avoid cache collision
    const uniqueUrl = `http://localhost:3000/test-validate-${testCounter}-${Date.now()}-${Math.random()}?market_id=1&lang=eng`;
    const request = createMockRequest(uniqueUrl);

    const response = await proxy(request);

    expect(validateUrlLanguage).toHaveBeenCalled();
    expect(validateUrlMarketId).toHaveBeenCalled();
    expect(validateUrlLimit).toHaveBeenCalled();
    expect(ensureDefaultCookies).toHaveBeenCalled();
    expect(addDebugHeaders).toHaveBeenCalled();
    expect(mockNextResponse.next).toHaveBeenCalled();
    expect(response).toBeDefined();
    // Note: setAuthCookie is conditionally called based on configuration.AUTH_ENABLED
    // This is tested in integration tests
  });

  it('should redirect to not-found on validation error', async () => {
    (shouldExcludePath as jest.Mock).mockReturnValue(false);
    (validateUrlLanguage as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid language');
    });

    const uniqueUrl = `http://localhost:3000/test-error-${Date.now()}?lang=invalid`;
    const request = createMockRequest(uniqueUrl);

    const response = await proxy(request);

    expect(mockNextResponse.redirect).toHaveBeenCalled();
    expect(response).toBeDefined();
    expect(response.status).toBe(307); // Redirect status
  });

  it('should validate limit for table pages', async () => {
    (shouldExcludePath as jest.Mock).mockReturnValue(false);
    (validateUrlLanguage as jest.Mock).mockImplementation(() => {});
    (validateUrlMarketId as jest.Mock).mockImplementation(() => {});
    (validateUrlLimit as jest.Mock).mockImplementation(() => {});
    (ensureDefaultCookies as jest.Mock).mockImplementation(() => {});
    (setAuthCookie as jest.Mock).mockResolvedValue(undefined);
    (addDebugHeaders as jest.Mock).mockImplementation(() => {});

    const uniqueUrl = `http://localhost:3000/stocks-${Date.now()}?limit=50`;
    const request = createMockRequest(uniqueUrl);

    await proxy(request);

    expect(validateUrlLimit).toHaveBeenCalled();
  });
});
