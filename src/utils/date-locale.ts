/**
 * Locale-aware date formatting utilities
 *
 * These functions use date-fns with locale support for proper internationalization.
 * Locale is determined from the language cookie or defaults to English.
 */

import { format, Locale } from 'date-fns';
import { enUS, nb, sv, da, fi } from 'date-fns/locale';

import { getLanguageFromStorage } from '@/lib/utils';

/**
 * Maps language codes to date-fns locales
 */
const localeMap: Record<string, Locale> = {
  eng: enUS,
  nor: nb,
  swe: sv,
  dan: da,
  fin: fi,
  // Fallback to English for unknown languages
  default: enUS,
};

/**
 * Gets the appropriate date-fns locale based on the current language setting
 * @returns date-fns Locale object
 */
export function getDateLocale(): Locale {
  const language = getLanguageFromStorage();
  return localeMap[language] || localeMap.default;
}

/**
 * Formats a date string (or Date object) to a locale-aware display format
 * Uses the user's language preference for month names and formatting
 *
 * @param value - Date string or Date object
 * @param formatString - Optional date-fns format string (default: 'dd MMM yyyy')
 * @returns Formatted date string according to user's locale
 *
 * @example
 * // For Norwegian user: "05 mai 2025"
 * // For English user: "05 May 2025"
 * dateToDisplayLocaleAware('2025-05-05')
 */
export function dateToDisplayLocaleAware(
  value?: string | Date | null,
  formatString = 'dd MMM yyyy'
): string {
  if (!value) return '';

  try {
    const date = typeof value === 'string' ? new Date(value) : value;
    if (!(date instanceof Date) || isNaN(date.getTime())) return '';

    const locale = getDateLocale();
    return format(date, formatString, { locale });
  } catch {
    return '';
  }
}

/**
 * Formats a date to a long locale-aware format
 *
 * @param value - Date string or Date object
 * @returns Formatted date string (e.g., "14 August 2025" for English, "14 august 2025" for Norwegian)
 */
export function dateToLongLocaleAware(value?: string | Date | null): string {
  return dateToDisplayLocaleAware(value, 'dd MMMM yyyy');
}

/**
 * Formats a date to a short locale-aware format
 *
 * @param value - Date string or Date object
 * @returns Formatted date string (e.g., "14 Aug 2025")
 */
export function dateToShortLocaleAware(value?: string | Date | null): string {
  return dateToDisplayLocaleAware(value, 'dd MMM yyyy');
}

/**
 * Formats date and time in a locale-aware format
 *
 * @param dateString - ISO date string
 * @returns Formatted string with date and time (e.g., "14 August 2025 – 10:50 AM")
 */
export function getDateAndTimeLocaleAware(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const locale = getDateLocale();
    const datePart = format(date, 'dd MMMM yyyy', { locale });
    const timePart = format(date, 'HH:mm', { locale });

    return `${datePart} – ${timePart}`;
  } catch {
    return '';
  }
}
