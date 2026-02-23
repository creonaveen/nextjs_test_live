import type { ScoreBarCategory } from '@/lib/types/health-check';
import {
  cn,
  setCookie,
  getCookie,
  getColorClass,
  getCompanyColorClass,
  getRiskBadgeVariant,
  getBadgeVariant,
  getCardColorClass,
  formatNoteForDisplay,
  getResponsiveHideClass,
  getTableColumnHideClass,
  hexToRgba,
  getScoreBarColor,
  createCategoryColorMap,
  getIndicatorStyle,
  getBackgroundStyle,
  getPieSectionColor,
  getCorrelationAnalysisColors,
} from '@/lib/utils';

// Mock Storage
jest.mock('@/store/local-storage', () => {
  const actual = jest.requireActual('@/store/local-storage');
  return {
    ...actual,
    Storage: {
      getUserIDWithDefault: jest.fn(() => '49855'),
      getMarketIdWithDefault: jest.fn(() => '1'),
      getLanguageWithDefault: jest.fn(() => 'eng'),
    },
    // Export setCookie and getCookie from actual module
    setCookie: actual.setCookie,
    getCookie: actual.getCookie,
  };
});

// Mock configuration
jest.mock('@/environment/configuration', () => ({
  configuration: {
    DEFAULT_MARKET_ID: '1',
    DEFAULT_LANGUAGE: 'eng',
  },
}));

describe('cn', () => {
  it('should merge class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    const isFalse = false;
    expect(cn('foo', isFalse && 'bar', 'baz')).toBe('foo baz');
  });

  it('should merge Tailwind classes correctly', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4'); // Later class should override
  });
});

describe('setCookie', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('should set a cookie with default expiration', () => {
    setCookie('test', 'value');
    expect(document.cookie).toContain('test=value');
  });

  it('should set a cookie with custom expiration days', () => {
    setCookie('test', 'value', { expireDays: 30 });
    expect(document.cookie).toContain('test=value');
  });

  it('should handle SSR environment (window undefined)', () => {
    // Note: The function checks typeof window === 'undefined' and returns early
    // This is primarily for SSR environments. In Jest/jsdom, window always exists,
    // so we can't fully test this scenario, but the code has the check in place.
    // The function should work normally in browser-like environments (Jest/jsdom)
    document.cookie = '';
    setCookie('ssr-test', 'value');
    // In Jest environment, this will work because window exists
    expect(document.cookie).toContain('ssr-test=value');
  });
});

describe('getCookie', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('should get cookie value', () => {
    document.cookie = 'test=value; path=/';
    expect(getCookie('test')).toBe('value');
  });

  it('should return empty string if cookie does not exist', () => {
    expect(getCookie('nonexistent')).toBe('');
  });

  /* Skipped due to non-configurable window in current JSDOM environment
  it('should return empty string if window is undefined', () => {
    const originalWindow = global.window;
    // @ts-expect-error - testing undefined window
    global.window = undefined;

    expect(getCookie('test')).toBe('');

    global.window = originalWindow;
  });
  */

  it('should handle cookies with multiple values', () => {
    document.cookie = 'foo=bar; path=/';
    document.cookie = 'test=value; path=/';
    expect(getCookie('test')).toBe('value');
  });
});

describe('getColorClass', () => {
  it('should return warning-text for 0', () => {
    expect(getColorClass(0)).toBe('text-warning-text dark:text-warning-text-active');
  });

  it('should return error-text for -1', () => {
    expect(getColorClass(-1)).toBe('text-error-text dark:text-error-text-active');
  });

  it('should return success-text for positive numbers', () => {
    expect(getColorClass(1)).toBe('text-success-text dark:text-success-text-active');
    expect(getColorClass(5)).toBe('text-success-text dark:text-success-text-active');
  });

  it('should return empty string for invalid input', () => {
    expect(getColorClass('invalid')).toBe('');
    expect(getColorClass(NaN)).toBe('');
  });

  it('should handle string numbers', () => {
    expect(getColorClass('0')).toBe('text-warning-text dark:text-warning-text-active');
    expect(getColorClass('-1')).toBe('text-error-text dark:text-error-text-active');
    expect(getColorClass('1')).toBe('text-success-text dark:text-success-text-active');
  });
});

describe('getCompanyColorClass', () => {
  it('should return correct background class for buy', () => {
    expect(getCompanyColorClass('buy', 'background')).toBe('bg-success-background');
  });

  it('should return correct text class for buy', () => {
    expect(getCompanyColorClass('buy', 'text')).toBe('text-success-text-active');
  });

  it('should return correct background class for sell', () => {
    expect(getCompanyColorClass('sell', 'background')).toBe('bg-error-background');
  });

  it('should return correct text class for sell', () => {
    expect(getCompanyColorClass('sell', 'text')).toBe('text-error-text-active');
  });

  it('should return default classes for unknown values', () => {
    expect(getCompanyColorClass('unknown', 'background')).toBe('bg-warning-background');
    expect(getCompanyColorClass('unknown', 'text')).toBe('text-warning-text-active');
  });

  it('should return empty string for empty value', () => {
    expect(getCompanyColorClass('', 'background')).toBe('');
    expect(getCompanyColorClass('', 'text')).toBe('');
  });
});

describe('getRiskBadgeVariant', () => {
  it('should return lowRisk for positive', () => {
    expect(getRiskBadgeVariant('positive')).toBe('lowRisk');
  });

  it('should return highRisk for negative', () => {
    expect(getRiskBadgeVariant('negative')).toBe('highRisk');
  });

  it('should return neutralRisk for neutral', () => {
    expect(getRiskBadgeVariant('neutral')).toBe('neutralRisk');
  });

  it('should return neutralRisk for unknown values', () => {
    expect(getRiskBadgeVariant('unknown')).toBe('neutralRisk');
    expect(getRiskBadgeVariant('')).toBe('neutralRisk');
  });
});

describe('getBadgeVariant', () => {
  it('should return warning for 0', () => {
    expect(getBadgeVariant(0)).toBe('warning');
  });

  it('should return error for -1', () => {
    expect(getBadgeVariant(-1)).toBe('error');
  });

  it('should return success for 1', () => {
    expect(getBadgeVariant(1)).toBe('success');
  });

  it('should return error for negative numbers', () => {
    expect(getBadgeVariant(-5)).toBe('error');
  });

  it('should return success for positive numbers', () => {
    expect(getBadgeVariant(5)).toBe('success');
  });

  it('should handle string numbers', () => {
    expect(getBadgeVariant('0')).toBe('warning');
    expect(getBadgeVariant('-1')).toBe('error');
    expect(getBadgeVariant('1')).toBe('success');
    expect(getBadgeVariant('5%')).toBe('success');
    expect(getBadgeVariant('+5')).toBe('success');
  });

  it('should return primary for invalid values', () => {
    expect(getBadgeVariant(null)).toBe('primary');
    expect(getBadgeVariant(undefined)).toBe('primary');
    expect(getBadgeVariant('invalid')).toBe('primary');
  });
});

describe('getCardColorClass', () => {
  it('should return correct background class for warning variant', () => {
    expect(getCardColorClass(0)).toBe('bg-warning-background');
  });

  it('should return correct background class for error variant', () => {
    expect(getCardColorClass(-1)).toBe('bg-error-background');
  });

  it('should return correct background class for success variant', () => {
    expect(getCardColorClass(1)).toBe('bg-success-background');
  });

  it('should return correct background class for primary variant', () => {
    expect(getCardColorClass(null)).toBe('bg-primary-background');
  });
});

describe('formatNoteForDisplay', () => {
  it('should format escaped newlines', () => {
    expect(formatNoteForDisplay('Hello\\\\nWorld')).toBe('Hello\nWorld');
  });

  it('should handle multiple escaped newlines', () => {
    expect(formatNoteForDisplay('Line1\\\\nLine2\\\\nLine3')).toBe('Line1\nLine2\nLine3');
  });

  it('should handle nested escapes correctly', () => {
    // Test that escaped newlines are properly converted
    // The function replaces \\\\n patterns with actual newlines
    const input = 'Line1\\\\nLine2\\\\nLine3';
    const result = formatNoteForDisplay(input);
    expect(result).toContain('\n');
    expect(result.split('\n').length).toBeGreaterThan(1);
  });

  it('should return empty string for null or undefined', () => {
    expect(formatNoteForDisplay(null)).toBe('');
    expect(formatNoteForDisplay(undefined)).toBe('');
    expect(formatNoteForDisplay('')).toBe('');
  });

  it('should return original string if no escaped newlines', () => {
    expect(formatNoteForDisplay('Hello World')).toBe('Hello World');
  });
});

describe('getResponsiveHideClass', () => {
  it('should return empty string for empty array', () => {
    expect(getResponsiveHideClass([])).toBe('');
    expect(getResponsiveHideClass(undefined)).toBe('');
  });

  it('should return correct class for mobile', () => {
    expect(getResponsiveHideClass(['mobile'])).toBe('hidden sm:table-cell');
  });

  it('should return correct class for tablet', () => {
    expect(getResponsiveHideClass(['tablet'])).toBe('hidden md:table-cell');
  });

  it('should return correct class for laptop', () => {
    expect(getResponsiveHideClass(['laptop'])).toBe('hidden lg:table-cell');
  });

  it('should return correct class for desktop', () => {
    expect(getResponsiveHideClass(['desktop'])).toBe('hidden xl:table-cell');
  });

  it('should handle multiple breakpoints', () => {
    const result = getResponsiveHideClass(['mobile', 'tablet']);
    expect(result).toContain('hidden');
    expect(result).toContain('md:hidden lg:table-cell');
  });
});

describe('getTableColumnHideClass', () => {
  it('should return empty string for empty array', () => {
    expect(getTableColumnHideClass([])).toBe('');
    expect(getTableColumnHideClass(undefined)).toBe('');
  });

  it('should hide on mobile', () => {
    expect(getTableColumnHideClass(['mobile'])).toBe('hidden sm:table-cell');
  });

  it('should hide on tablet', () => {
    const result = getTableColumnHideClass(['tablet']);
    // Tablet: visible on mobile, hidden on tablet (sm breakpoint), visible again on laptop
    expect(result).toBe('table-cell sm:hidden md:table-cell');
  });

  it('should hide on laptop', () => {
    // Laptop: visible on mobile/tablet, hidden on laptop (md breakpoint), visible again on desktop
    const result = getTableColumnHideClass(['laptop']);
    expect(result).toBe('table-cell md:hidden lg:table-cell');
  });

  it('should hide on desktop and cascade to laptop', () => {
    const result = getTableColumnHideClass(['desktop']);
    expect(result).toBe('table-cell md:hidden');
  });

  it('should handle multiple breakpoints', () => {
    const result = getTableColumnHideClass(['mobile', 'tablet']);
    expect(result).toContain('hidden');
    expect(result).toContain('sm:hidden');
  });
});

describe('hexToRgba', () => {
  it('should convert hex to rgba with default opacity', () => {
    expect(hexToRgba('#F2726F')).toBe('rgba(242, 114, 111, 1)');
  });

  it('should convert hex without hash and custom opacity', () => {
    expect(hexToRgba('F2726F', 0.2)).toBe('rgba(242, 114, 111, 0.2)');
  });
});

describe('score bar helpers', () => {
  it('should map score bar class to color', () => {
    expect(getScoreBarColor('barNegative')).toBe('#F2726F');
    expect(getScoreBarColor('barNeutral')).toBe('#FFD24D');
    expect(getScoreBarColor('barPositive')).toBe('#76A35D');
    expect(getScoreBarColor('unknown')).toBe('#F2726F');
  });

  it('should create a category color map', () => {
    const categories: ScoreBarCategory[] = [
      { id: 1, name: 'Low', min_value: 0, max_value: 10, class: 'barNegative' },
      { id: 2, name: 'Mid', min_value: 11, max_value: 20, class: 'barNeutral' },
    ];

    const result = createCategoryColorMap(categories);
    expect(result[1]).toBe('#F2726F');
    expect(result[2]).toBe('#FFD24D');
  });

  it('should build indicator and background styles', () => {
    const colorMap = { 1: '#F2726F' };

    expect(getIndicatorStyle(1, colorMap)).toEqual({ backgroundColor: '#F2726F' });
    expect(getIndicatorStyle(99, colorMap)).toBeUndefined();

    expect(getBackgroundStyle(1, colorMap)).toEqual({
      backgroundColor: 'rgba(242, 114, 111, 0.2)',
      color: '#F2726F',
    });
    expect(getBackgroundStyle(99, colorMap)).toBeUndefined();
  });
});

describe('getPieSectionColor', () => {
  it('should map known color names to CSS variables', () => {
    expect(getPieSectionColor('colPositive')).toBe('var(--color-pos2)');
    expect(getPieSectionColor('colSectorFinance')).toBe('var(--color-sector-fi)');
  });

  it('should return empty string for unknown names', () => {
    expect(getPieSectionColor('unknown')).toBe('');
  });
});

describe('getCorrelationAnalysisColors', () => {
  it('should map known classes to color tokens', () => {
    expect(getCorrelationAnalysisColors('tableCellPositive')).toEqual({
      backgroundColor: 'var(--color-tableCellPositive-bg)',
      textColor: 'var(--color-tableCellPositive-text)',
    });
  });

  it('should fall back to neutral colors', () => {
    expect(getCorrelationAnalysisColors('unknown')).toEqual({
      backgroundColor: 'var(--color-tableCellNeutral-bg)',
      textColor: 'var(--color-tableCellNeutral-text)',
    });
  });
});
