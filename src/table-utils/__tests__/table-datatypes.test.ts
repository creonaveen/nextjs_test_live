import {
  ARROW_ICON_VALUES,
  getTableClassName,
  getHiddenTableClasses,
  getFormattedTableName,
  labelStructColorToBadgeVariant,
  labelStructColorToTextColor,
  getStringMaxLength,
  getStringWrapLength,
  isNumericDataType,
  isStringLikeDataType,
  getImgTechChartSizeConfig,
  getRoundCornersSize,
} from '@/table-utils/table-datatypes';

describe('table-datatypes', () => {
  describe('ARROW_ICON_VALUES', () => {
    it('contains expected arrow directions', () => {
      expect(ARROW_ICON_VALUES).toEqual(['arrow_up', 'arrow_down', 'arrow_right', 'arrow_left']);
    });
  });

  describe('getTableClassName', () => {
    it('returns empty string for undefined', () => {
      expect(getTableClassName(undefined)).toBe('');
    });

    it('returns empty string for empty string', () => {
      expect(getTableClassName('')).toBe('');
    });

    it('maps Lowlight to low-light', () => {
      expect(getTableClassName('Lowlight')).toBe('low-light');
    });

    it('maps Highlight to high-light', () => {
      expect(getTableClassName('Highlight')).toBe('high-light');
    });

    it('maps Header to header', () => {
      expect(getTableClassName('Header')).toBe('header');
    });

    it('maps Summary to summary', () => {
      expect(getTableClassName('Summary')).toBe('summary');
    });

    it('returns empty string for unknown value', () => {
      expect(getTableClassName('Unknown')).toBe('');
    });
  });

  describe('getHiddenTableClasses', () => {
    it('returns hidden for hiddenForAll', () => {
      expect(getHiddenTableClasses('hiddenForAll')).toBe('hidden');
    });

    it('returns hidden lg:table-cell for hiddenForDesktop', () => {
      expect(getHiddenTableClasses('hiddenForDesktop')).toBe('hidden lg:table-cell');
    });

    it('returns hidden md:table-cell for hiddenForLaptop', () => {
      expect(getHiddenTableClasses('hiddenForLaptop')).toBe('hidden md:table-cell');
    });

    it('returns hidden sm:table-cell for hiddenForTablet', () => {
      expect(getHiddenTableClasses('hiddenForTablet')).toBe('hidden sm:table-cell');
    });

    it('returns hidden for hiddenForMobile', () => {
      expect(getHiddenTableClasses('hiddenForMobile')).toBe('hidden');
    });
  });

  describe('getFormattedTableName', () => {
    it('returns empty string for empty input', () => {
      expect(getFormattedTableName('')).toBe('');
    });

    it('maps cleanTable to clean-table', () => {
      expect(getFormattedTableName('cleanTable')).toBe('clean-table');
    });

    it('maps standardTable to standard-table', () => {
      expect(getFormattedTableName('standardTable')).toBe('standard-table');
    });

    it('maps researchTable to research-table', () => {
      expect(getFormattedTableName('researchTable')).toBe('research-table');
    });

    it('returns standard-table for unknown value', () => {
      expect(getFormattedTableName('other')).toBe('standard-table');
    });
  });

  describe('labelStructColorToBadgeVariant', () => {
    it('maps positive to success', () => {
      expect(labelStructColorToBadgeVariant('positive')).toBe('success');
    });

    it('maps negative to error', () => {
      expect(labelStructColorToBadgeVariant('negative')).toBe('error');
    });

    it('maps neutral to warning', () => {
      expect(labelStructColorToBadgeVariant('neutral')).toBe('warning');
    });

    it('returns primary for unknown color', () => {
      expect(labelStructColorToBadgeVariant('other')).toBe('primary');
    });
  });

  describe('labelStructColorToTextColor', () => {
    it('maps positive to text-success-text', () => {
      expect(labelStructColorToTextColor('positive')).toBe('text-success-text');
    });

    it('maps negative to text-error-text', () => {
      expect(labelStructColorToTextColor('negative')).toBe('text-error-text');
    });

    it('maps neutral to text-warning-text', () => {
      expect(labelStructColorToTextColor('neutral')).toBe('text-warning-text');
    });

    it('returns text-warning-text for unknown color', () => {
      expect(labelStructColorToTextColor('other')).toBe('text-warning-text');
    });
  });

  describe('getStringMaxLength', () => {
    it('parses string(N) and returns N', () => {
      expect(getStringMaxLength('string(10)')).toBe(10);
      expect(getStringMaxLength('string(100)')).toBe(100);
    });

    it('returns undefined for string without parens', () => {
      expect(getStringMaxLength('string')).toBeUndefined();
    });

    it('returns undefined for general', () => {
      expect(getStringMaxLength('general')).toBeUndefined();
    });

    it('returns undefined for undefined', () => {
      expect(getStringMaxLength(undefined)).toBeUndefined();
    });

    it('returns undefined for non-string', () => {
      expect(getStringMaxLength(123 as unknown as string)).toBeUndefined();
    });
  });

  describe('getStringWrapLength', () => {
    it('parses stringWrap(N) and returns N', () => {
      expect(getStringWrapLength('stringWrap(10)')).toBe(10);
      expect(getStringWrapLength('stringWrap(15)')).toBe(15);
    });

    it('returns undefined for string', () => {
      expect(getStringWrapLength('string')).toBeUndefined();
    });

    it('returns undefined for undefined', () => {
      expect(getStringWrapLength(undefined)).toBeUndefined();
    });
  });

  describe('isNumericDataType', () => {
    it('returns true for numstring, price, percent, integer, etc.', () => {
      expect(isNumericDataType('numstring')).toBe(true);
      expect(isNumericDataType('price')).toBe(true);
      expect(isNumericDataType('percent')).toBe(true);
      expect(isNumericDataType('integer')).toBe(true);
      expect(isNumericDataType('decimal2')).toBe(true);
    });

    it('returns false for string', () => {
      expect(isNumericDataType('string')).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isNumericDataType(undefined)).toBe(false);
    });
  });

  describe('isStringLikeDataType', () => {
    it('returns true for string', () => {
      expect(isStringLikeDataType('string')).toBe(true);
    });

    it('returns true for string(N)', () => {
      expect(isStringLikeDataType('string(10)')).toBe(true);
    });

    it('returns true for stringWrap(N)', () => {
      expect(isStringLikeDataType('stringWrap(5)')).toBe(true);
    });

    it('returns false for numeric type', () => {
      expect(isStringLikeDataType('price')).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(isStringLikeDataType(undefined)).toBe(false);
    });
  });

  describe('getImgTechChartSizeConfig', () => {
    it('returns config for tiny', () => {
      expect(getImgTechChartSizeConfig('tiny')).toEqual({
        containerClassName: 'w-[150px]',
        defaultWidth: 150,
      });
    });

    it('returns config for small', () => {
      expect(getImgTechChartSizeConfig('small')).toEqual({
        containerClassName: 'w-[200px]',
        defaultWidth: 200,
      });
    });

    it('returns config for medium', () => {
      expect(getImgTechChartSizeConfig('medium')).toEqual({
        containerClassName: 'w-[400px]',
        defaultWidth: 400,
      });
    });

    it('returns config for large', () => {
      expect(getImgTechChartSizeConfig('large')).toEqual({
        containerClassName: 'w-[500px]',
        defaultWidth: 500,
      });
    });

    it('defaults to small for undefined', () => {
      expect(getImgTechChartSizeConfig(undefined)).toEqual({
        containerClassName: 'w-[200px]',
        defaultWidth: 200,
      });
    });
  });

  describe('getRoundCornersSize', () => {
    it('returns sm for tiny and small', () => {
      expect(getRoundCornersSize('tiny')).toBe('sm');
      expect(getRoundCornersSize('small')).toBe('sm');
    });

    it('returns md for medium and large', () => {
      expect(getRoundCornersSize('medium')).toBe('md');
      expect(getRoundCornersSize('large')).toBe('md');
    });

    it('returns md for undefined or unknown', () => {
      expect(getRoundCornersSize(undefined)).toBe('md');
      expect(getRoundCornersSize('other')).toBe('md');
    });
  });
});
