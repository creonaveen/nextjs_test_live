import {
  techScoreToColorStyle,
  signToColorStyle,
  parseStyleTriggers,
  getRowTriggeredStyles,
  getCellColorClass,
} from '@/table-utils/table-color';

describe('table-color', () => {
  describe('techScoreToColorStyle', () => {
    it('returns positive for score >= 25', () => {
      expect(techScoreToColorStyle(25)).toBe('positive');
      expect(techScoreToColorStyle(100)).toBe('positive');
    });

    it('returns negative for score <= -25', () => {
      expect(techScoreToColorStyle(-25)).toBe('negative');
      expect(techScoreToColorStyle(-100)).toBe('negative');
    });

    it('returns neutral for score between -25 and 25', () => {
      expect(techScoreToColorStyle(0)).toBe('neutral');
      expect(techScoreToColorStyle(24)).toBe('neutral');
      expect(techScoreToColorStyle(-24)).toBe('neutral');
    });
  });

  describe('signToColorStyle', () => {
    it('returns positive for positive number', () => {
      expect(signToColorStyle(1)).toBe('positive');
      expect(signToColorStyle(0.1)).toBe('positive');
    });

    it('returns negative for negative number', () => {
      expect(signToColorStyle(-1)).toBe('negative');
      expect(signToColorStyle(-0.1)).toBe('negative');
    });

    it('returns neutral for zero', () => {
      expect(signToColorStyle(0)).toBe('neutral');
    });
  });

  describe('parseStyleTriggers', () => {
    it('parses type.fn into map entries', () => {
      const result = parseStyleTriggers({
        i1: 'styleTrigger.signToColor',
        i2: 'styleUser.signToColor',
      });
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ type: 'styleTrigger', fn: 'signToColor' });
      expect(result[1]).toEqual({ type: 'styleUser', fn: 'signToColor' });
    });

    it('sorts keys before building map', () => {
      const result = parseStyleTriggers({ i2: 'styleTrigger.techScoreTocolor', i1: '' });
      expect(result[0]).toEqual({ type: '', fn: '' });
      expect(result[1]).toEqual({ type: 'styleTrigger', fn: 'techScoreTocolor' });
    });

    it('handles empty value as empty type and fn', () => {
      const result = parseStyleTriggers({ i1: '' });
      expect(result).toEqual([{ type: '', fn: '' }]);
    });

    it('handles empty object', () => {
      expect(parseStyleTriggers({})).toEqual([]);
    });

    it('splits on dot and uses second segment as fn', () => {
      const result = parseStyleTriggers({ i1: 'styleTrigger.foo.bar' });
      expect(result[0]).toEqual({ type: 'styleTrigger', fn: 'foo' });
    });
  });

  describe('getRowTriggeredStyles', () => {
    it('returns all neutral when triggerMap is empty', () => {
      expect(getRowTriggeredStyles([10, -5], [])).toEqual(['neutral', 'neutral']);
    });

    it('applies signToColor from styleTrigger column to styleUser columns', () => {
      const triggerMap = [
        { type: 'styleTrigger', fn: 'signToColor' },
        { type: 'styleUser', fn: 'signToColor' },
      ];
      const row = [10, 0];
      expect(getRowTriggeredStyles(row, triggerMap)).toEqual(['neutral', 'positive']);
    });

    it('applies negative for negative trigger value to user columns', () => {
      const triggerMap = [
        { type: 'styleTrigger', fn: 'signToColor' },
        { type: 'styleUser', fn: 'signToColor' },
      ];
      const row = [-3, 0];
      expect(getRowTriggeredStyles(row, triggerMap)).toEqual(['neutral', 'negative']);
    });

    it('fills array to row length with neutral by default', () => {
      const triggerMap = [{ type: '', fn: '' }];
      expect(getRowTriggeredStyles([1, 2, 3], triggerMap)).toEqual([
        'neutral',
        'neutral',
        'neutral',
      ]);
    });
  });

  describe('getCellColorClass', () => {
    it('returns text-success-text for positive', () => {
      expect(getCellColorClass('positive')).toBe('text-success-text');
    });

    it('returns text-error-text for negative', () => {
      expect(getCellColorClass('negative')).toBe('text-error-text');
    });

    it('returns text-warning-text for neutral', () => {
      expect(getCellColorClass('neutral')).toBe('text-warning-text');
    });

    it('returns empty string for unknown', () => {
      expect(getCellColorClass('other' as 'positive')).toBe('');
    });
  });
});
