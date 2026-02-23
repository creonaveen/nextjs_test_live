import { configuration } from '@/environment/configuration';

import { Storage, setCookie, getCookie } from '../local-storage';

// Mock the date utility
jest.mock('@/utils/date', () => ({
  parseDate: jest.fn((date: string) => new Date(date)),
  getCurrentDate: jest.fn(() => new Date().toISOString()),
}));

describe('local-storage', () => {
  const originalDocumentCookie = document.cookie;

  beforeEach(() => {
    // Clear cookies before each test
    document.cookie = '';
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore original cookie state
    document.cookie = originalDocumentCookie;
  });

  describe('setCookie and getCookie', () => {
    it('should set and get a cookie', () => {
      setCookie('test_cookie', 'test_value', 1);
      const value = getCookie('test_cookie');
      expect(value).toBe('test_value');
    });

    it('should return empty string for non-existent cookie', () => {
      const value = getCookie('non_existent');
      expect(value).toBe('');
    });

    it('should handle cookies with spaces', () => {
      setCookie('test_cookie', 'value with spaces', 1);
      const value = getCookie('test_cookie');
      expect(value).toBe('value with spaces');
    });

    /* Skipped due to non-configurable window in current JSDOM environment
    it('should not set cookie in server environment', () => {
      const originalWindow = global.window;
      // @ts-expect-error - Testing server environment where window is undefined (jsdom 27+ has non-configurable window)
      global.window = undefined;

      setCookie('test_cookie', 'test_value', 1);
      // Should not throw error

      global.window = originalWindow;
    });
    */

    /* Skipped due to non-configurable window in current JSDOM environment
    it('should return empty string in server environment', () => {
      const originalWindow = global.window;
      // @ts-expect-error - Testing server environment where window is undefined (jsdom 27+ has non-configurable window)
      global.window = undefined;

      const value = getCookie('test_cookie');
      expect(value).toBe('');

      global.window = originalWindow;
    });
    */
  });

  describe('Storage.setMarketId', () => {
    it('should set market ID cookie', () => {
      Storage.setMarketId('123');
      const value = getCookie('market_id');
      expect(value).toBe('123');
    });

    it('should use default market ID when empty string is provided', () => {
      Storage.setMarketId('');
      const value = getCookie('market_id');
      expect(value).toBe(configuration.DEFAULT_MARKET_ID);
    });

    it('should handle errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      // Mock document.cookie setter to throw error
      const originalCookieDescriptor =
        Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
        Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

      Object.defineProperty(document, 'cookie', {
        get: () => '',
        set: () => {
          throw new Error('Cookie error');
        },
        configurable: true,
      });

      Storage.setMarketId('123');
      expect(consoleSpy).toHaveBeenCalled();

      // Restore original
      if (originalCookieDescriptor) {
        Object.defineProperty(document, 'cookie', originalCookieDescriptor);
      } else {
        delete (document as unknown).cookie;
      }
      consoleSpy.mockRestore();
    });
  });

  describe('Storage.getMarketId', () => {
    it('should get market ID from cookie', () => {
      setCookie('market_id', '456');
      const value = Storage.getMarketId();
      expect(value).toBe('456');
    });

    it('should return default market ID when cookie is empty', () => {
      const value = Storage.getMarketId();
      expect(value).toBe(configuration.DEFAULT_MARKET_ID);
    });

    it('should return default market ID when cookie is whitespace', () => {
      setCookie('market_id', '   ');
      const value = Storage.getMarketId();
      expect(value).toBe(configuration.DEFAULT_MARKET_ID);
    });

    it('should handle errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      // Mock document.cookie getter to throw error
      const originalCookieDescriptor =
        Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
        Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

      Object.defineProperty(document, 'cookie', {
        get: () => {
          throw new Error('Cookie error');
        },
        set: () => {},
        configurable: true,
      });

      const value = Storage.getMarketId();
      expect(value).toBe(configuration.DEFAULT_MARKET_ID);
      expect(consoleSpy).toHaveBeenCalled();

      // Restore original
      if (originalCookieDescriptor) {
        Object.defineProperty(document, 'cookie', originalCookieDescriptor);
      } else {
        delete (document as unknown).cookie;
      }
      consoleSpy.mockRestore();
    });
  });

  // Note: getMarketId() already returns default, so getMarketIdWithDefault() is not needed
  // Note: ensureMarketIdDefault() method does not exist in Storage class

  describe('Storage.setLanguage', () => {
    it('should set language cookie', () => {
      Storage.setLanguage('eng');
      const value = getCookie('language');
      expect(value).toBe('eng');
    });

    it('should use default language when empty string is provided', () => {
      Storage.setLanguage('');
      const value = getCookie('language');
      expect(value).toBe(configuration.DEFAULT_LANGUAGE);
    });

    it('should handle errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      // Mock document.cookie setter to throw error
      const originalCookieDescriptor =
        Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
        Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

      Object.defineProperty(document, 'cookie', {
        get: () => '',
        set: () => {
          throw new Error('Cookie error');
        },
        configurable: true,
      });

      Storage.setLanguage('eng');
      expect(consoleSpy).toHaveBeenCalled();

      // Restore original
      if (originalCookieDescriptor) {
        Object.defineProperty(document, 'cookie', originalCookieDescriptor);
      } else {
        delete (document as unknown).cookie;
      }
      consoleSpy.mockRestore();
    });
  });

  describe('Storage.getLanguage', () => {
    it('should get language from cookie', () => {
      setCookie('language', 'nor');
      const value = Storage.getLanguage();
      expect(value).toBe('nor');
    });

    it('should return default language when cookie is empty', () => {
      const value = Storage.getLanguage();
      expect(value).toBe(configuration.DEFAULT_LANGUAGE);
    });

    it('should return default language when cookie is whitespace', () => {
      setCookie('language', '   ');
      const value = Storage.getLanguage();
      expect(value).toBe(configuration.DEFAULT_LANGUAGE);
    });

    it('should handle errors gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      // Mock document.cookie getter to throw error
      const originalCookieDescriptor =
        Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
        Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

      Object.defineProperty(document, 'cookie', {
        get: () => {
          throw new Error('Cookie error');
        },
        set: () => {},
        configurable: true,
      });

      const value = Storage.getLanguage();
      expect(value).toBe(configuration.DEFAULT_LANGUAGE);
      expect(consoleSpy).toHaveBeenCalled();

      // Restore original
      if (originalCookieDescriptor) {
        Object.defineProperty(document, 'cookie', originalCookieDescriptor);
      } else {
        delete (document as unknown).cookie;
      }
      consoleSpy.mockRestore();
    });
  });

  // Note: getLanguage() already returns default, so getLanguageWithDefault() is not needed
  // Note: ensureLanguageDefault() method does not exist in Storage class

  // Note: UserID methods (setUserID, getUserID, getUserIDWithDefault, ensureUserIDDefault, ensureAllDefaults)
  // do not exist in the Storage class. These tests have been removed.
});
