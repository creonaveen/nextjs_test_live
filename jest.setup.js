// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill for Request/Response APIs needed by Next.js server components
// Use native fetch API if available (Node.js 18+), otherwise use a minimal polyfill
if (typeof global.Request === 'undefined') {
  // Node.js 18+ has built-in fetch, but jsdom may not have Request/Response
  // Try to use native Request/Response if available
  try {
    // Check if globalThis.Request exists (Node.js 18+ built-in)
    if (typeof globalThis.Request !== 'undefined') {
      global.Request = globalThis.Request;
      global.Response = globalThis.Response;
    } else {
      throw new Error('No Request/Response available');
    }
  } catch (e) {
    // Fallback: minimal polyfill
    global.Request = class {
      constructor(url, init) {
        this._url = typeof url === 'string' ? url : url.toString();
        this._init = init || {};
      }
      get url() {
        return this._url;
      }
    };
    global.Response = class {
      constructor(body, init) {
        this._body = body;
        this._init = init || {};
      }
    };
  }
}

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key) => key,
  useLocale: () => 'eng',
  useMessages: () => ({}),
}));

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
    resolvedTheme: 'light',
  }),
  ThemeProvider: ({ children }) => children,
}));

// Suppress console errors in tests (optional - remove if you want to see them)
const originalError = console.error;
const originalWarn = console.warn;
const originalLog = console.log;
const originalDebug = console.debug;
beforeAll(() => {
  console.error = (...args) => {
    // Suppress expected error messages from utility functions
    const errorMessage = typeof args[0] === 'string' ? args[0] : '';
    const errorObject = args[0];

    // Check if it's an Error object with navigation-related message
    if (errorObject && typeof errorObject === 'object' && 'message' in errorObject) {
      const message = errorObject.message || '';
      if (
        message.includes('Not implemented: navigation') ||
        message.includes('navigation (except hash changes)')
      ) {
        return;
      }
    }

    // React warnings
    if (
      errorMessage.includes('Warning: ReactDOM.render') ||
      errorMessage.includes('Warning: An invalid form control') ||
      (errorMessage.includes('An update to') &&
        errorMessage.includes('inside a test was not wrapped in act(...)')) ||
      errorMessage.includes('A suspended resource finished loading inside a test') ||
      errorMessage.includes('A component suspended inside an `act` scope')
    ) {
      return;
    }
    // Suppress React DOM nesting warnings (expected when testing layout components with html/head/body)
    if (
      errorMessage.includes('cannot be a child of') ||
      errorMessage.includes('hydration error') ||
      errorMessage.includes('You are mounting a new html component') ||
      errorMessage.includes('You are mounting a new head component') ||
      errorMessage.includes('You are mounting a new body component')
    ) {
      return;
    }
    // Expected error messages from date utility functions (tested error handling)
    if (
      errorMessage.includes('Invalid time format') ||
      errorMessage.includes('Invalid time values') ||
      errorMessage.includes('Error parsing date') ||
      errorMessage.includes('Error formatting date')
    ) {
      return;
    }
    // Expected error messages from storage utility functions (tested error handling)
    if (
      errorMessage.includes('Error fetching User ID from storage') ||
      errorMessage.includes('Error fetching Market ID from storage') ||
      errorMessage.includes('Error fetching Language from storage')
    ) {
      return;
    }
    // Expected error messages from test error handling (testing error states)
    if (
      errorMessage.includes('Failed to fetch data') ||
      errorMessage.includes('Failed to fetch watchlist') ||
      errorMessage.includes('Failed to add company') ||
      errorMessage.includes('API Error') ||
      errorMessage.includes('Network error')
    ) {
      return;
    }
    // Suppress React warnings about async Client Components (expected in test environment)
    if (
      errorMessage.includes('is an async Client Component') ||
      errorMessage.includes('Only Server Components can be async')
    ) {
      return;
    }
    // Expected error messages from test error handling (testing error states)
    if (
      errorMessage.includes('Failed to fetch data') ||
      errorMessage.includes('Failed to fetch watchlist') ||
      errorMessage.includes('Failed to add company') ||
      errorMessage.includes('API Error') ||
      errorMessage.includes('Network error')
    ) {
      return;
    }
    // Suppress React warnings about async Client Components (expected in test environment)
    if (
      errorMessage.includes('is an async Client Component') ||
      errorMessage.includes('Only Server Components can be async')
    ) {
      return;
    }
    // Expected warning messages from middleware (tested validation fallbacks)
    if (
      errorMessage.includes('Middleware: Invalid market ID') ||
      errorMessage.includes('Middleware: Invalid language') ||
      errorMessage.includes('Middleware: Failed to get authorization') ||
      errorMessage.includes('Middleware: Validation failed')
    ) {
      return;
    }
    // Suppress scrollIntoView errors (jsdom limitation)
    if (
      errorMessage.includes('scrollIntoView is not a function') ||
      errorMessage.includes('candidate?.scrollIntoView')
    ) {
      return;
    }
    // Suppress scrollTo errors (jsdom limitation)
    if (
      errorMessage.includes('Not implemented: window.scrollTo') ||
      (errorObject &&
        typeof errorObject === 'object' &&
        errorObject.type === 'not implemented' &&
        errorObject.message?.includes('window.scrollTo'))
    ) {
      return;
    }
    // Suppress window.open errors (jsdom limitation)
    if (
      errorMessage.includes('Not implemented: window.open') ||
      (errorObject &&
        typeof errorObject === 'object' &&
        errorObject.type === 'not implemented' &&
        errorObject.message?.includes('window.open'))
    ) {
      return;
    }
    // Suppress Radix UI Dialog/Sheet accessibility warnings (these are informational)
    if (
      errorMessage.includes('requires a') &&
      (errorMessage.includes('DialogTitle') ||
        errorMessage.includes('DialogDescription') ||
        errorMessage.includes('Description'))
    ) {
      return;
    }
    // Suppress jsdom navigation errors (expected in test environment)
    if (
      errorMessage.includes('Not implemented: navigation') ||
      errorMessage.includes('navigation (except hash changes)') ||
      (errorObject &&
        typeof errorObject === 'object' &&
        errorObject.type === 'not implemented' &&
        (errorObject.message?.includes('navigation') || errorMessage.includes('navigation')))
    ) {
      return;
    }
    // Suppress error boundary console.error messages (expected in error boundary tests)
    // Check for error boundary messages in first argument (message string)
    // or in context object (third argument with errorBoundary: true)
    const isErrorBoundaryMessage =
      errorMessage.includes('Error boundary caught') ||
      errorMessage.includes('[ERROR] Error boundary caught an error');
    const hasErrorBoundaryContext =
      args.length > 2 &&
      args[2] &&
      typeof args[2] === 'object' &&
      'errorBoundary' in args[2] &&
      args[2].errorBoundary === true;
    if (isErrorBoundaryMessage || hasErrorBoundaryContext) {
      return;
    }
    originalError.call(console, ...args);
  };

  // Suppress console.log in tests (optional - useful for cleaner test output)
  console.log = (...args) => {
    // Suppress debug logs from Header component
    if (typeof args[0] === 'string') {
      const logMessage = args[0];
      if (
        logMessage === 'language' ||
        logMessage === 'currentLanguage' ||
        logMessage.includes('Middleware: Ensured market_id cookie') ||
        logMessage.includes('Middleware: Ensured language cookie') ||
        logMessage.includes('Middleware called for:') ||
        logMessage.includes('Middleware called for page:') ||
        logMessage.includes('Middleware: Duplicate request detected') ||
        logMessage.includes('[MainChartSection] Setting up tooltips with:') ||
        logMessage.includes('[MainChartSection] RSI chart dimensions updated:') ||
        logMessage.includes('[MainChartSection] Tooltip setting changed to:')
      ) {
        return;
      }
    }
    originalLog.call(console, ...args);
  };

  console.warn = (...args) => {
    // Suppress Radix UI Dialog/Sheet accessibility warnings (these are informational)
    if (typeof args[0] === 'string') {
      const warnMessage = args[0];
      if (
        (warnMessage.includes('requires a') &&
          (warnMessage.includes('DialogTitle') ||
            warnMessage.includes('DialogDescription') ||
            warnMessage.includes('Description'))) ||
        warnMessage.includes('Missing `Description`') ||
        warnMessage.includes('Missing `DialogTitle`') ||
        warnMessage.includes('Middleware: Invalid market ID') ||
        warnMessage.includes('Middleware: Invalid language')
      ) {
        return;
      }
    }
    originalWarn.call(console, ...args);
  };

  // Suppress console.debug in tests (optional - useful for cleaner test output)
  console.debug = (...args) => {
    // Suppress debug logs from logger utility
    if (typeof args[0] === 'string') {
      const debugMessage = args[0];
      if (
        debugMessage.includes('[DEBUG]') ||
        debugMessage.includes('[Tooltip]') ||
        debugMessage.includes('Setting data-chart-info')
      ) {
        return;
      }
    }
    originalDebug.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
  console.log = originalLog;
  console.debug = originalDebug;
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Polyfill for pointer capture APIs (required by Radix UI in jsdom)
if (typeof Element !== 'undefined' && !Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = jest.fn().mockReturnValue(false);
  Element.prototype.setPointerCapture = jest.fn();
  Element.prototype.releasePointerCapture = jest.fn();
}

// Polyfill for scrollIntoView (required by Radix UI in jsdom)
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = jest.fn();
}

// Mock window.scrollTo (required for components that use scrollTo)
if (typeof window !== 'undefined') {
  window.scrollTo = jest.fn();
}

// Mock window.matchMedia (required by vaul/drawer and other libraries)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock getComputedStyle for vaul/drawer library (required for transform parsing)
const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = jest.fn((element) => {
  const style = originalGetComputedStyle ? originalGetComputedStyle(element) : {};
  const mockStyle = {
    ...style,
    transform: element?.style?.transform || 'translateY(0px)',
    getPropertyValue: (prop) => {
      if (prop === 'transform') {
        return element?.style?.transform || 'translateY(0px)';
      }
      return style?.getPropertyValue?.(prop) || '';
    },
  };
  return mockStyle;
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
  // Clear all cookies
  document.cookie.split(';').forEach((c) => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });
});
