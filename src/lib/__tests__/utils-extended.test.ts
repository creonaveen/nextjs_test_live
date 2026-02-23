import { configuration } from '@/environment/configuration';
import {
  cn,
  setCookie,
  getCookie,
  getMarketIDFromStorage,
  getLanguageFromStorage,
  getColorClass,
  getCompanyColorClass,
  getRiskBadgeVariant,
  getBadgeVariant,
  getCardColorClass,
  getBadgeColorClass,
  getBadgeText,
  getArrowTextColor,
  getResponsiveHideClass,
  getTableColumnHideClass,
  formatNoteForDisplay,
} from '@/lib/utils';
import {
  Storage,
  setCookie as setCookieImpl,
  getCookie as getCookieImpl,
} from '@/store/local-storage';

// Mock Storage
jest.mock('@/store/local-storage', () => ({
  Storage: {
    getMarketId: jest.fn(),
    getLanguage: jest.fn(),
  },
  setCookie: jest.fn(),
  getCookie: jest.fn(),
}));

// Mock configuration
jest.mock('@/environment/configuration', () => ({
  configuration: {
    DEFAULT_MARKET_ID: '1',
    DEFAULT_LANGUAGE: 'eng',
  },
}));

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle conditional classes', () => {
    const isFalse = false;
    expect(cn('class1', isFalse && 'class2', 'class3')).toBe('class1 class3');
  });
});

describe('setCookie and getCookie', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set and get cookie', () => {
    (getCookieImpl as jest.Mock).mockReturnValue('value');
    setCookie('test', 'value', 365);
    expect(setCookieImpl).toHaveBeenCalledWith('test', 'value', 365);
    expect(getCookie('test')).toBe('value');
  });

  it('should return empty string for non-existent cookie', () => {
    (getCookieImpl as jest.Mock).mockReturnValue('');
    expect(getCookie('nonexistent')).toBe('');
  });

  /* Skipped due to non-configurable window in current JSDOM environment
  it('should not set cookie in SSR', () => {
    setCookie('test', 'value');
    // Should not throw in SSR
  });
  */
});

describe('getMarketIDFromStorage', () => {
  it('should return market ID from storage', () => {
    (Storage.getMarketId as jest.Mock).mockReturnValue('2');
    expect(getMarketIDFromStorage()).toBe('2');
  });

  it('should return default market ID on error', () => {
    (Storage.getMarketId as jest.Mock).mockImplementation(() => {
      throw new Error('Storage error');
    });
    expect(getMarketIDFromStorage()).toBe(configuration.DEFAULT_MARKET_ID);
  });
});

describe('getLanguageFromStorage', () => {
  it('should return language from storage', () => {
    (Storage.getLanguage as jest.Mock).mockReturnValue('nor');
    expect(getLanguageFromStorage()).toBe('nor');
  });

  it('should return default language on error', () => {
    (Storage.getLanguage as jest.Mock).mockImplementation(() => {
      throw new Error('Storage error');
    });
    expect(getLanguageFromStorage()).toBe(configuration.DEFAULT_LANGUAGE);
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

  it('should return empty string for NaN', () => {
    expect(getColorClass('invalid')).toBe('');
  });
});

describe('getCompanyColorClass', () => {
  it('should return buy background class', () => {
    expect(getCompanyColorClass('buy', 'background')).toBe('bg-success-background');
  });

  it('should return sell background class', () => {
    expect(getCompanyColorClass('sell', 'background')).toBe('bg-error-background');
  });

  it('should return default background class', () => {
    expect(getCompanyColorClass('unknown', 'background')).toBe('bg-warning-background');
  });

  it('should return buy text class', () => {
    expect(getCompanyColorClass('buy', 'text')).toBe('text-success-text-active');
  });

  it('should return empty string for empty value', () => {
    expect(getCompanyColorClass('', 'background')).toBe('');
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

  it('should return neutralRisk for empty value', () => {
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

  it('should handle string values with %', () => {
    expect(getBadgeVariant('5%')).toBe('success');
    expect(getBadgeVariant('-5%')).toBe('error');
  });

  it('should return primary for null/undefined', () => {
    expect(getBadgeVariant(null as unknown)).toBe('primary');
    expect(getBadgeVariant(undefined as unknown)).toBe('primary');
  });
});

describe('getCardColorClass', () => {
  it('should return appropriate background class based on value', () => {
    expect(getCardColorClass(0)).toBe('bg-warning-background');
    expect(getCardColorClass(-1)).toBe('bg-error-background');
    expect(getCardColorClass(1)).toBe('bg-success-background');
  });
});

describe('getBadgeColorClass', () => {
  it('should return appropriate color class for 0', () => {
    expect(getBadgeColorClass(0)).toContain('warning');
  });

  it('should return appropriate color class for -1', () => {
    expect(getBadgeColorClass(-1)).toContain('error');
  });

  it('should return appropriate color class for 1', () => {
    expect(getBadgeColorClass(1)).toContain('success');
  });
});

describe('getBadgeText', () => {
  it('should return appropriate text class for 0', () => {
    expect(getBadgeText(0)).toBe('text-warning-text-active');
  });

  it('should return appropriate text class for -1', () => {
    expect(getBadgeText(-1)).toBe('text-error-text-active');
  });

  it('should return appropriate text class for 1', () => {
    expect(getBadgeText(1)).toBe('text-success-text-active');
  });
});

describe('getArrowTextColor', () => {
  it('should return warning color for 0', () => {
    expect(getArrowTextColor(0)).toBe('text-warning');
  });

  it('should return error color for -1', () => {
    expect(getArrowTextColor(-1)).toBe('text-error');
  });

  it('should return success color for 1', () => {
    expect(getArrowTextColor(1)).toBe('text-success');
  });
});

describe('getResponsiveHideClass', () => {
  it('should return empty string when no hideOn provided', () => {
    expect(getResponsiveHideClass()).toBe('');
    expect(getResponsiveHideClass([])).toBe('');
  });

  it('should return hide class for mobile', () => {
    expect(getResponsiveHideClass(['mobile'])).toBe('hidden sm:table-cell');
  });

  it('should return hide class for tablet', () => {
    expect(getResponsiveHideClass(['tablet'])).toBe('hidden md:table-cell');
  });

  it('should return hide class for laptop', () => {
    expect(getResponsiveHideClass(['laptop'])).toBe('hidden lg:table-cell');
  });

  it('should return hide class for desktop', () => {
    expect(getResponsiveHideClass(['desktop'])).toBe('hidden xl:table-cell');
  });
});

describe('getTableColumnHideClass', () => {
  it('should return empty string when no hideOn provided', () => {
    expect(getTableColumnHideClass()).toBe('');
    expect(getTableColumnHideClass([])).toBe('');
  });

  it('should return appropriate classes for mobile', () => {
    const result = getTableColumnHideClass(['mobile']);
    expect(result).toContain('hidden');
    expect(result).toContain('sm:table-cell');
  });

  it('should cascade desktop to laptop', () => {
    const result = getTableColumnHideClass(['desktop']);
    expect(result).toContain('md:hidden');
  });
});

describe('formatNoteForDisplay', () => {
  it('should return empty string for null/undefined', () => {
    expect(formatNoteForDisplay(null)).toBe('');
    expect(formatNoteForDisplay(undefined)).toBe('');
  });

  it('should replace \\\\n with newline', () => {
    expect(formatNoteForDisplay('Line1\\\\nLine2')).toBe('Line1\nLine2');
  });

  it('should handle multiple replacements', () => {
    expect(formatNoteForDisplay('Line1\\\\nLine2\\\\nLine3')).toBe('Line1\nLine2\nLine3');
  });

  it('should return original string if no replacements needed', () => {
    expect(formatNoteForDisplay('Normal text')).toBe('Normal text');
  });
});
