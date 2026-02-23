import {
  getSortedKeys,
  getDisplayValue,
  getTriggerValue,
} from '@/table-utils/table-trigger-styling';

describe('table-trigger-styling', () => {
  describe('getSortedKeys', () => {
    it('sorts keys by numeric part after first character', () => {
      expect(getSortedKeys(['i3', 'i1', 'i2'])).toEqual(['i1', 'i2', 'i3']);
    });

    it('mutates and returns the same array', () => {
      const keys = ['i2', 'i1'];
      const result = getSortedKeys(keys);
      expect(result).toBe(keys);
      expect(keys).toEqual(['i1', 'i2']);
    });

    it('handles single key', () => {
      expect(getSortedKeys(['i1'])).toEqual(['i1']);
    });

    it('handles empty array', () => {
      expect(getSortedKeys([])).toEqual([]);
    });

    it('sorts by numeric value not lexicographic', () => {
      expect(getSortedKeys(['i10', 'i2', 'i1'])).toEqual(['i1', 'i2', 'i10']);
    });
  });

  describe('getDisplayValue', () => {
    it('returns string value as-is', () => {
      expect(getDisplayValue('hello')).toBe('hello');
    });

    it('returns number value as-is', () => {
      expect(getDisplayValue(42)).toBe(42);
    });

    it('returns object.text when value has text property', () => {
      expect(getDisplayValue({ text: 'Label', value: 1 })).toBe('Label');
    });

    it('returns empty string for undefined', () => {
      expect(getDisplayValue(undefined)).toBe('');
    });

    it('returns empty string for object without text', () => {
      expect(getDisplayValue({ value: 1 })).toBe('');
    });

    it('returns empty string for null', () => {
      expect(getDisplayValue(null as unknown as undefined)).toBe('');
    });
  });

  describe('getTriggerValue', () => {
    it('returns number as-is', () => {
      expect(getTriggerValue(100)).toBe(100);
    });

    it('returns string as-is', () => {
      expect(getTriggerValue('x')).toBe('x');
    });

    it('returns object.value when value is number', () => {
      expect(getTriggerValue({ text: 'Up', value: 1 })).toBe(1);
    });

    it('returns object when no numeric value', () => {
      const obj = { text: 'only' };
      expect(getTriggerValue(obj as never)).toBe(obj);
    });
  });
});
