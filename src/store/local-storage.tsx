'use client';

import { configuration } from '@/environment/configuration';
import { parseDate, getCurrentDate } from '@/utils/date';
import logger from '@/utils/logger';

// Default values from configuration
const DEFAULT_MARKET_ID = configuration.DEFAULT_MARKET_ID;
const DEFAULT_LANGUAGE = configuration.DEFAULT_LANGUAGE;

/**
 * Cookie configuration options
 */
interface CookieOptions {
  expireDays?: number;
  sameSite?: 'Strict' | 'Lax' | 'None';
  secure?: boolean;
  path?: string;
}

/**
 * Sets a cookie with security best practices
 * @param name - Cookie name
 * @param value - Cookie value
 * @param options - Cookie options (expireDays, sameSite, secure, path)
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const {
    sameSite = configuration.COOKIE_SAME_SITE as boolean | 'lax' | 'strict' | 'none' | undefined,
    secure = configuration.COOKIE_SECURE,
    path = '/',
  } = options;
  const d: Date = parseDate(getCurrentDate());
  d.setTime(d.getTime() + configuration.COOKIE_MAX_AGE);
  const expires = `expires=${d.toUTCString()}`;
  const sameSiteAttr = `SameSite=${sameSite}`;
  const secureAttr = secure ? 'Secure' : '';
  const pathAttr = `path=${path}`;

  // Build cookie string with all attributes
  const cookieParts = [
    `${name}=${encodeURIComponent(value)}`,
    expires,
    sameSiteAttr,
    secureAttr,
    pathAttr,
  ].filter(Boolean); // Remove empty strings

  document.cookie = cookieParts.join('; ');
}

/**
 * Gets a cookie value by name
 * @param cname - Cookie name
 * @returns Cookie value or empty string if not found
 */
export function getCookie(cname: string): string {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return '';
  }

  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    const c = ca[i]?.trim() || '';
    if (c.startsWith(name)) {
      return c.substring(name.length);
    }
  }

  return '';
}
/**
 * Storage keys for type safety
 */
export const STORAGE_KEYS = {
  MARKET_ID: 'market_id',
  LANGUAGE: 'language',
  USER_ID: 'user_id',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * Storage utility class for managing cookies with type safety and error handling
 */
export class Storage {
  /**
   * Generic method to get a cookie value with a default fallback
   */
  private static getCookieWithDefault(key: StorageKey, defaultValue: string): string {
    try {
      const value = getCookie(key);
      return value && value.trim() !== '' ? value : defaultValue;
    } catch (error) {
      logger.warn(`Failed to get ${key} cookie`, {
        key,
        error: error instanceof Error ? error.message : String(error),
        component: 'storage-getCookie',
      });
      return defaultValue;
    }
  }

  /**
   * Generic method to set a cookie value
   */
  private static setCookieValue(key: StorageKey, value: string): void {
    try {
      const finalValue = value || this.getDefaultValue(key);
      setCookie(key, finalValue);
    } catch (error) {
      logger.warn(`Failed to set ${key} cookie`, {
        key,
        error: error instanceof Error ? error.message : String(error),
        component: 'storage-setCookie',
      });
    }
  }

  /**
   * Get default value for a storage key
   */
  private static getDefaultValue(key: StorageKey): string {
    switch (key) {
      case STORAGE_KEYS.MARKET_ID:
        return DEFAULT_MARKET_ID;
      case STORAGE_KEYS.LANGUAGE:
        return DEFAULT_LANGUAGE;
      default:
        return '';
    }
  }

  // Market ID methods
  static setMarketId(marketId: string): void {
    this.setCookieValue(STORAGE_KEYS.MARKET_ID, marketId);
  }

  /**
   * Get the current market ID from storage
   * @returns Market ID string, defaults to configured default if not set
   */
  static getMarketId(): string {
    return this.getCookieWithDefault(STORAGE_KEYS.MARKET_ID, DEFAULT_MARKET_ID);
  }

  // Language methods
  /**
   * Set the language preference in storage
   * @param language - Language code (e.g., 'eng', 'swe', 'nor', 'dan', 'fin')
   */
  static setLanguage(language: string): void {
    this.setCookieValue(STORAGE_KEYS.LANGUAGE, language);
  }

  /**
   * Get the current language from storage
   * @returns Language code string, defaults to configured default if not set
   */
  static getLanguage(): string {
    return this.getCookieWithDefault(STORAGE_KEYS.LANGUAGE, DEFAULT_LANGUAGE);
  }
}
