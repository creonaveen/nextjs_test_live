import { renderHook } from '@testing-library/react';

import { useColumnAlignment } from '@/table-utils/table-column-alignment';

function getParams(overrides: Partial<Parameters<typeof useColumnAlignment>[0]> = {}) {
  return {
    columnKeys: ['i1', 'i2', 'i3'],
    columnAlign: {},
    columnDataType: {},
    tableData: {
      i1: { c1: 'Name', c2: 100, c3: 'Note' },
      i2: { c1: 'Other', c2: 200, c3: 'Y' },
    },
    rowKeys: ['i1', 'i2'],
    ...overrides,
  };
}

describe('table-column-alignment', () => {
  describe('useColumnAlignment', () => {
    it('returns left for string-like first column when no explicit align', () => {
      const { result } = renderHook(() =>
        useColumnAlignment(
          getParams({
            columnDataType: { i1: 'string', i2: 'price', i3: 'string' },
          })
        )
      );
      expect(result.current.i1).toBe('left');
      expect(result.current.i2).toBe('right');
      expect(result.current.i3).toBe('left');
    });

    it('respects explicit column_align over inferred', () => {
      const { result } = renderHook(() =>
        useColumnAlignment(
          getParams({
            columnAlign: { i1: 'center', i2: 'left' },
            columnDataType: { i1: 'string', i2: 'price', i3: 'string' },
          })
        )
      );
      expect(result.current.i1).toBe('center');
      expect(result.current.i2).toBe('left');
      expect(result.current.i3).toBe('left');
    });

    it('returns right for numeric column_data_type', () => {
      const { result } = renderHook(() =>
        useColumnAlignment(
          getParams({
            columnDataType: { i1: 'string', i2: 'percent', i3: 'integer' },
          })
        )
      );
      expect(result.current.i2).toBe('right');
      expect(result.current.i3).toBe('right');
    });

    it('returns left for general column when first cell is string', () => {
      const { result } = renderHook(() =>
        useColumnAlignment(
          getParams({
            columnDataType: { i1: 'general', i2: 'general', i3: 'general' },
          })
        )
      );
      expect(result.current.i1).toBe('left');
      expect(result.current.i2).toBe('right'); // 100 is numeric
      expect(result.current.i3).toBe('left'); // 'Note' is string
    });

    it('handles empty rowKeys', () => {
      const { result } = renderHook(() =>
        useColumnAlignment(
          getParams({
            rowKeys: [],
            tableData: {},
          })
        )
      );
      expect(result.current.i1).toBe('left');
      expect(result.current.i2).toBe('left');
      expect(result.current.i3).toBe('left');
    });

    it('returns consistent map for single column', () => {
      const { result } = renderHook(() =>
        useColumnAlignment({
          columnKeys: ['i1'],
          columnAlign: {},
          columnDataType: { i1: 'string' },
          tableData: { i1: { c1: 'Only' } },
          rowKeys: ['i1'],
        })
      );
      expect(result.current).toEqual({ i1: 'left' });
    });
  });
});
