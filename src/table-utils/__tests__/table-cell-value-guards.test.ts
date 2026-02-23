import {
  isLabelStructValue,
  isTextValueColoredValue,
  isIconFlagValue,
  isIconArrowValue,
  isLinkStructValue,
  hasWarningIconWithText,
  isImgTechChartStructValue,
} from '@/table-utils/table-cell-value-guards';

describe('table-cell-value-guards', () => {
  describe('isLabelStructValue', () => {
    it('returns true for object with c_name labelValueColored, text and color', () => {
      expect(
        isLabelStructValue({
          c_name: 'labelValueColored',
          text: 'Buy',
          color: 'positive',
          value: 1,
        })
      ).toBe(true);
    });

    it('returns false for wrong c_name', () => {
      expect(
        isLabelStructValue({
          c_name: 'textValueColored',
          text: 'x',
          color: 'neutral',
        })
      ).toBe(false);
    });

    it('returns false for primitive', () => {
      expect(isLabelStructValue('hello')).toBe(false);
      expect(isLabelStructValue(42)).toBe(false);
    });

    it('returns false for null/undefined', () => {
      expect(isLabelStructValue(null as never)).toBe(false);
      expect(isLabelStructValue(undefined as never)).toBe(false);
    });
  });

  describe('isTextValueColoredValue', () => {
    it('returns true for object with c_name textValueColored, text and color', () => {
      expect(
        isTextValueColoredValue({
          c_name: 'textValueColored',
          text: '+5%',
          color: 'positive',
          value: 5,
        })
      ).toBe(true);
    });

    it('returns false for labelValueColored', () => {
      expect(
        isTextValueColoredValue({
          c_name: 'labelValueColored',
          text: 'x',
          color: 'neutral',
        })
      ).toBe(false);
    });
  });

  describe('isIconFlagValue', () => {
    it('returns true for icon struct with icon_class flag and non-empty value', () => {
      expect(
        isIconFlagValue({
          c_name: 'icon',
          icon_class: 'flag',
          value: 'no',
        })
      ).toBe(true);
    });

    it('returns false when value is empty string', () => {
      expect(
        isIconFlagValue({
          c_name: 'icon',
          icon_class: 'flag',
          value: '',
        })
      ).toBe(false);
    });

    it('returns false when icon_class is not flag', () => {
      expect(
        isIconFlagValue({
          c_name: 'icon',
          icon_class: 'arrow',
          value: 'up',
        })
      ).toBe(false);
    });
  });

  describe('isIconArrowValue', () => {
    it('returns true for icon struct with icon_class arrow, direction and color', () => {
      expect(
        isIconArrowValue({
          icon_class: 'arrow',
          direction: 'up',
          color: 'positive',
        })
      ).toBe(true);
    });

    it('returns true when text is present', () => {
      expect(
        isIconArrowValue({
          icon_class: 'arrow',
          direction: 'up',
          color: 'positive',
          text: 'Strong',
        })
      ).toBe(true);
    });

    it('returns false for null or non-object', () => {
      expect(isIconArrowValue(null as never)).toBe(false);
      expect(isIconArrowValue('x')).toBe(false);
    });

    it('returns false when direction or color missing', () => {
      expect(isIconArrowValue({ icon_class: 'arrow', color: 'positive' } as never)).toBe(false);
      expect(isIconArrowValue({ icon_class: 'arrow', direction: 'up' } as never)).toBe(false);
    });
  });

  describe('isLinkStructValue', () => {
    it('returns true for object with non-empty url and text', () => {
      expect(
        isLinkStructValue({
          url: 'https://example.com',
          text: 'Link',
        })
      ).toBe(true);
    });

    it('returns false for empty url', () => {
      expect(isLinkStructValue({ url: '', text: 'Link' })).toBe(false);
    });

    it('returns false when text is not string', () => {
      expect(isLinkStructValue({ url: 'https://x.com', text: 1 } as never)).toBe(false);
    });

    it('returns false for null', () => {
      expect(isLinkStructValue(null as never)).toBe(false);
    });
  });

  describe('hasWarningIconWithText', () => {
    it('returns true for object with icon warning and string text', () => {
      expect(
        hasWarningIconWithText({
          icon: 'warning',
          text: 'Warning message',
        })
      ).toBe(true);
    });

    it('returns false when icon is not warning', () => {
      expect(hasWarningIconWithText({ icon: 'info', text: 'x' } as never)).toBe(false);
    });

    it('returns false when text is missing or not string', () => {
      expect(hasWarningIconWithText({ icon: 'warning' } as never)).toBe(false);
      expect(hasWarningIconWithText({ icon: 'warning', text: 123 } as never)).toBe(false);
    });
  });

  describe('isImgTechChartStructValue', () => {
    it('returns true for object with non-empty chart_param', () => {
      expect(
        isImgTechChartStructValue({
          chart_param: 'abc123',
        })
      ).toBe(true);
    });

    it('returns false for empty chart_param', () => {
      expect(isImgTechChartStructValue({ chart_param: '' })).toBe(false);
    });

    it('returns false when chart_param is not string', () => {
      expect(isImgTechChartStructValue({ chart_param: 1 } as never)).toBe(false);
    });

    it('returns false for null', () => {
      expect(isImgTechChartStructValue(null as never)).toBe(false);
    });
  });
});
