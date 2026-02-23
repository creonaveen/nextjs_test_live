import { validateMarketIdAgainstList, validateLanguageAgainstList } from '@/utils/validation-utils';

// Mock configuration
jest.mock('@/environment/configuration', () => ({
  configuration: {
    VALID_MARKET_IDS: ['1', '451', '351', '461', '452'] as const,
    VALID_LANGUAGES: ['eng', 'nor', 'swe', 'dan'] as const,
  },
}));

describe('validateMarketIdAgainstList', () => {
  it('should return valid for valid market ID', () => {
    const result = validateMarketIdAgainstList('1');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return valid for another valid market ID', () => {
    const result = validateMarketIdAgainstList('451');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return invalid for invalid market ID', () => {
    const result = validateMarketIdAgainstList('999');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Invalid market ID');
    expect(result.error).toContain('999');
  });

  it('should return valid for null (optional parameter)', () => {
    const result = validateMarketIdAgainstList(null);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return valid for undefined (optional parameter)', () => {
    const result = validateMarketIdAgainstList(undefined);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return invalid with helpful error message', () => {
    const result = validateMarketIdAgainstList('invalid');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Valid market IDs are:');
  });

  it('should validate all valid market IDs', () => {
    const validIds = ['1', '451', '351', '461', '452'];
    validIds.forEach((id) => {
      const result = validateMarketIdAgainstList(id);
      expect(result.isValid).toBe(true);
    });
  });
});

describe('validateLanguageAgainstList', () => {
  it('should return valid for valid language', () => {
    const result = validateLanguageAgainstList('eng');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return valid for another valid language', () => {
    const result = validateLanguageAgainstList('nor');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return invalid for invalid language', () => {
    const result = validateLanguageAgainstList('fr');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Invalid language');
    expect(result.error).toContain('fr');
  });

  it('should return valid for null (optional parameter)', () => {
    const result = validateLanguageAgainstList(null);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return valid for undefined (optional parameter)', () => {
    const result = validateLanguageAgainstList(undefined);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return invalid with helpful error message', () => {
    const result = validateLanguageAgainstList('invalid');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Valid languages are:');
  });

  it('should validate all valid languages', () => {
    const validLanguages = ['eng', 'nor', 'swe', 'dan'];
    validLanguages.forEach((lang) => {
      const result = validateLanguageAgainstList(lang);
      expect(result.isValid).toBe(true);
    });
  });
});
