/* eslint-disable max-lines -- shared utils; split in follow-up if needed */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { configuration } from '@/environment/configuration';
import { Storage } from '@/store/local-storage';
import logger from '@/utils/logger';

import type { ScoreBarCategory } from './types/health-check';
import { ImageWidth } from './types/research-page';

/**
 * Merges Tailwind CSS classes with proper conflict resolution.
 * Combines clsx for conditional classes and tailwind-merge for deduplication.
 *
 * @param inputs - Class values to merge (strings, objects, arrays)
 * @returns Merged class string with conflicts resolved
 *
 * @example
 * ```tsx
 * cn('px-2 py-1', 'px-4') // Returns 'py-1 px-4' (px-2 is overridden by px-4)
 * cn({ 'bg-red': true, 'bg-blue': false }) // Returns 'bg-red'
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Cookie functions are now in @/store/local_storage
// Import and use setCookie/getCookie from there for consistency
// These wrapper functions are kept for backward compatibility but delegate to Storage
export { setCookie, getCookie } from '@/store/local-storage';

/**
 * Retrieves the market ID from local storage with fallback to default.
 * Handles errors gracefully and returns the default market ID if storage access fails.
 *
 * @returns Market ID string (e.g., '1' for Norway)
 *
 * @example
 * ```tsx
 * const marketId = getMarketIDFromStorage();
 * // Returns '1' or stored value
 * ```
 */
export function getMarketIDFromStorage(): string {
  try {
    // This now automatically handles defaults
    return Storage.getMarketId();
  } catch (error) {
    logger.error(
      'Error fetching Market ID from storage',
      error instanceof Error ? error : new Error(String(error)),
      { component: 'utils-getMarketID' }
    );
    return configuration.DEFAULT_MARKET_ID; // fallback value from configuration
  }
}

/**
 * Retrieves the language preference from local storage with fallback to default.
 * Handles errors gracefully and returns the default language if storage access fails.
 *
 * @returns Language code string (e.g., 'eng', 'nor', 'swe', 'dan')
 *
 * @example
 * ```tsx
 * const language = getLanguageFromStorage();
 * // Returns 'eng' or stored value
 * ```
 */
export function getLanguageFromStorage(): string {
  try {
    return Storage.getLanguage();
  } catch (error) {
    logger.error(
      'Error fetching Language from storage',
      error instanceof Error ? error : new Error(String(error)),
      { component: 'utils-getLanguage' }
    );
    return configuration.DEFAULT_LANGUAGE;
  }
}

/**
 * Returns the appropriate text color class based on a numeric value.
 * Used for displaying positive/negative/neutral indicators.
 *
 * @param value - Numeric value or string that can be converted to number
 * @returns Tailwind CSS class for text color ('text-success-text', 'text-error-text', 'text-warning-text', or empty string)
 *
 * @example
 * ```tsx
 * getColorClass(1) // Returns 'text-success-text'
 * getColorClass(-1) // Returns 'text-error-text'
 * getColorClass(0) // Returns 'text-warning-text'
 * ```
 */
export function getColorClass(value: number | string): string {
  const num = Number(value);
  if (isNaN(num)) return ''; // no class if invalid

  return num === 0
    ? 'text-warning-text dark:text-warning-text-active'
    : num === -1
      ? 'text-error-text dark:text-error-text-active'
      : 'text-success-text dark:text-success-text-active';
}

export function getCompanyColorClass(value: string, type: 'background' | 'text'): string {
  if (!value) return '';

  const styles = {
    buy: {
      background: 'bg-success-background',
      text: 'text-success-text-active',
    },
    sell: {
      background: 'bg-error-background',
      text: 'text-error-text-active',
    },
    default: {
      background: 'bg-warning-background',
      text: 'text-warning-text-active',
    },
  };

  const styleSet = styles[value as keyof typeof styles] || styles.default;
  return styleSet[type];
}

export function getRiskBadgeVariant(value: string): 'lowRisk' | 'highRisk' | 'neutralRisk' {
  if (!value) return 'neutralRisk';

  switch (value) {
    case 'positive':
      return 'lowRisk';
    case 'negative':
      return 'highRisk';
    case 'neutral':
      return 'neutralRisk';
  }

  return 'neutralRisk';
}

export function getBadgeVariant(
  value: number | string
): 'warning' | 'error' | 'success' | 'primary' {
  if (value === null || value === undefined) return 'primary';

  let num: number;

  if (typeof value === 'string') {
    // normalize string -> remove %, +, spaces
    num = Number(value.replace('%', '').replace('+', '').trim());
  } else {
    num = value;
  }

  if (isNaN(num)) return 'primary';

  // Explicit handling for fixed flags
  switch (num) {
    case 0:
      return 'warning';
    case -1:
      return 'error';
    case 1:
      return 'success';
    default:
      return num < 0 ? 'error' : 'success';
  }
}

export function getCardColorClass(value: number | string): string {
  const variant = getBadgeVariant(value);

  const bgMap: Record<typeof variant, string> = {
    warning: 'bg-warning-background',
    error: 'bg-error-background',
    success: 'bg-success-background',
    primary: 'bg-primary-background',
  };

  return bgMap[variant] || 'bg-warning-background';
}

export function getBadgeColorClass(value: number): string {
  switch (value) {
    case 0:
      return 'bg-warning-active text-warning-text-active dark:text-warning-background dark:bg-warning';
    case -1:
      return 'bg-error-text-active text-error-background dark:text-error-background dark:bg-error';
    case 1:
      return 'bg-success text-success-background dark:text-success-background dark:bg-success';
  }
  return 'warning';
}

export function getBadgeText(value: number): string {
  switch (value) {
    case 0:
      return 'text-warning-text-active';
    case -1:
      return 'text-error-text-active';
    case 1:
      return 'text-success-text-active';
  }
  return 'warning';
}

export function getArrowTextColor(value: number): string {
  switch (value) {
    case 0:
      return 'text-warning';
    case -1:
      return 'text-error';
    case 1:
      return 'text-success';
  }
  return 'warning';
}

const RESPONSIVE_HIDE_SINGLE: Record<string, string> = {
  mobile: 'hidden sm:table-cell',
  tablet: 'hidden md:table-cell',
  laptop: 'hidden lg:table-cell',
  desktop: 'hidden xl:table-cell',
};

function getMultiBreakpointHideClasses(
  hideOn: ('mobile' | 'tablet' | 'laptop' | 'desktop')[]
): string[] {
  const classes: string[] = [];
  if (hideOn.includes('mobile')) classes.push('hidden');
  if (hideOn.includes('tablet')) classes.push('md:hidden lg:table-cell');
  if (hideOn.includes('laptop')) classes.push('md:hidden lg:table-cell');
  if (hideOn.includes('desktop')) classes.push('lg:hidden');
  return classes;
}

export function getResponsiveHideClass(
  hideOn?: ('mobile' | 'tablet' | 'laptop' | 'desktop')[]
): string {
  if (!hideOn || hideOn.length === 0) return '';
  if (hideOn.length === 1) {
    return RESPONSIVE_HIDE_SINGLE[hideOn[0]] ?? '';
  }
  return getMultiBreakpointHideClasses(hideOn).join(' ');
}

function buildTableColumnClasses(
  hideMobile: boolean,
  hideTablet: boolean,
  hideLaptop: boolean,
  hideDesktop: boolean
): string[] {
  const classes: string[] = [];
  classes.push(hideMobile ? 'hidden' : 'table-cell');
  classes.push(hideTablet ? 'sm:hidden' : hideMobile ? 'sm:table-cell' : '');
  classes.push(hideLaptop ? 'md:hidden' : hideTablet ? 'md:table-cell' : '');
  if (!hideDesktop && hideLaptop) classes.push('lg:table-cell');
  return classes.filter(Boolean);
}

export function getTableColumnHideClass(
  hideOn?: ('mobile' | 'tablet' | 'laptop' | 'desktop')[]
): string {
  if (!hideOn || hideOn.length === 0) return '';
  const hideMobile = hideOn.includes('mobile');
  const hideTablet = hideOn.includes('tablet');
  const hideLaptop = hideOn.includes('laptop') || hideOn.includes('desktop');
  const hideDesktop = hideOn.includes('desktop');
  return buildTableColumnClasses(hideMobile, hideTablet, hideLaptop, hideDesktop).join(' ');
}

export function formatNoteForDisplay(note: string | null | undefined): string {
  if (!note) return '';
  let result = note;
  let prev;

  do {
    prev = result;
    result = result.replace(/\\\\n/g, '\n');
  } while (result !== prev);

  return result;
}

export function getGridColumnsClass(width: ImageWidth): string {
  switch (width) {
    case 'xs':
      return 'md:grid-cols-4';
    case 'sm':
      return 'md:grid-cols-3';
    case 'md':
      return 'md:grid-cols-2';
    case 'full':
      return 'md:grid-cols-1';
    default:
      return 'md:grid-cols-1';
  }
}

export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Converts a hex color to rgba format with the specified opacity.
 *
 * @param hex - Hex color string (e.g., '#F2726F' or 'F2726F')
 * @param opacity - Opacity value between 0 and 1 (default: 1)
 * @returns RGBA color string (e.g., 'rgba(242, 114, 111, 0.2)')
 *
 * @example
 * ```tsx
 * hexToRgba('#F2726F', 0.2) // Returns 'rgba(242, 114, 111, 0.2)'
 * hexToRgba('F2726F', 1) // Returns 'rgba(242, 114, 111, 1)'
 * ```
 */
export function hexToRgba(hex: string, opacity: number = 1): string {
  // Remove the hash if present
  const cleanHex = hex.replace('#', '');

  // Parse the hex color
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Creates a lookup map from category ID to color for ScoreBarCategory arrays.
 *
 * @param categories - Array of ScoreBarCategory objects
 * @returns Record mapping category ID to color string
 *
 * @example
 * ```tsx
 * const colorMap = createCategoryColorMap(categories);
 * const color = colorMap[categoryId] || '';
 * ```
 */

export function getScoreBarColor(scoreBarClass: string): string {
  switch (scoreBarClass) {
    case 'barNegative':
      return '#F2726F';
    case 'barNeutral':
      return '#FFD24D';
    case 'barPositive':
      return '#76A35D';
    default:
      return '#F2726F';
  }
}

export function createCategoryColorMap(categories: ScoreBarCategory[]): Record<number, string> {
  return categories.reduce((acc: Record<number, string>, category: ScoreBarCategory) => {
    acc[category.id] = getScoreBarColor(category.class);
    return acc;
  }, {});
}

export function getIndicatorStyle(categoryId: number, categoryColorMap: Record<number, string>) {
  const categoryColor = categoryColorMap[categoryId] || '';
  return categoryColor ? { backgroundColor: categoryColor } : undefined;
}

export function getBackgroundStyle(categoryId: number, categoryColorMap: Record<number, string>) {
  const categoryColor = categoryColorMap[categoryId] || '';
  return categoryColor
    ? { backgroundColor: hexToRgba(categoryColor, 0.2), color: categoryColor }
    : undefined;
}

const PIE_SECTION_COLORS: Record<string, string> = {
  colNegative: 'var(--color-neg2)',
  colWeakNegative: 'var(--color-neg1)',
  colNeutral: 'var(--color-neutral)',
  colWeakPositive: 'var(--color-pos1)',
  colPositive: 'var(--color-pos2)',
  colSectorBasicMaterials: 'var(--color-sector-bm)',
  colSectorConsumer: 'var(--color-sector-co)',
  colSectorEnergy: 'var(--color-sector-en)',
  colSectorFinance: 'var(--color-sector-fi)',
  colSectorHealthcare: 'var(--color-sector-hc)',
  colSectorIndustrials: 'var(--color-sector-in)',
  colSectorIT: 'var(--color-sector-it)',
  colSectorRealEstate: 'var(--color-sector-re)',
  colSectorNotAssigned: 'var(--color-sector-not-assigned)',
};

export function getPieSectionColor(colorName: string): string {
  return PIE_SECTION_COLORS[colorName] ?? '';
}

export function getCorrelationAnalysisColors(colorName: string): {
  backgroundColor: string;
  textColor: string;
} {
  switch (colorName) {
    case 'tableCellPositive':
      return {
        backgroundColor: 'var(--color-tableCellPositive-bg)',
        textColor: 'var(--color-tableCellPositive-text)',
      };
    case 'tableCellNeutral':
      return {
        backgroundColor: 'var(--color-tableCellNeutral-bg)',
        textColor: 'var(--color-tableCellNeutral-text)',
      };
    case 'tableCellNegative':
      return {
        backgroundColor: 'var(--color-tableCellNegative-bg)',
        textColor: 'var(--color-tableCellNegative-text)',
      };
    case 'tableCellExtremelyNegative':
      return {
        backgroundColor: 'var(--color-tableCellExtremelyNegative-bg)',
        textColor: 'var(--color-tableCellExtremelyNegative-text)',
      };
    default:
      return {
        backgroundColor: 'var(--color-tableCellNeutral-bg)',
        textColor: 'var(--color-tableCellNeutral-text)',
      };
  }
}

export function toKebabCase(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9.\s]/g, '') // allow dot
    .replace(/\s+/g, '-');
}
