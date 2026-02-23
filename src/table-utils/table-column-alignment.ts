import { useMemo } from 'react';

import type { TableAlign, TableData, TableDataType } from '@/lib/types/tables-example';
import { isNumericDataType, isStringLikeDataType } from '@/table-utils/table-datatypes';

export type TextAlign = 'left' | 'right' | 'center' | 'justify';

const VALID_ALIGN: readonly TextAlign[] = ['left', 'right', 'center', 'justify'];

function isValidAlign(value: string | undefined): value is TextAlign {
  return typeof value === 'string' && VALID_ALIGN.includes(value as TextAlign);
}

/** Returns true if the cell value is a number (primitive or object with numeric value). */
function isNumericCellValue(value: TableData[keyof TableData][string] | undefined): boolean {
  if (value == null) return false;
  if (typeof value === 'number') return true;
  if (
    typeof value === 'object' &&
    'value' in value &&
    typeof (value as { value: unknown }).value === 'number'
  ) {
    return true;
  }
  return false;
}

/** Returns true if the column's first cell is icon_struct with icon_class 'flag' (e.g. country flags). */
function isIconStructFlagColumn(
  columnKey: string,
  tableData: TableData,
  rowKeys: string[]
): boolean {
  if (rowKeys.length === 0) return false;
  const colIndex = columnKey.slice(1);
  const cellKey = `c${colIndex}`;
  const firstRowKey = rowKeys[0];
  const row = tableData[firstRowKey];
  const value = row?.[cellKey];
  if (value == null || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return obj.icon_class === 'flag';
}

/** Returns true if the column's first cell is icon_struct arrow with text_position 'last'. */
function isIconStructArrowTextPositionLast(
  columnKey: string,
  tableData: TableData,
  rowKeys: string[]
): boolean {
  if (rowKeys.length === 0) return false;
  const colIndex = columnKey.slice(1);
  const cellKey = `c${colIndex}`;
  const firstRowKey = rowKeys[0];
  const row = tableData[firstRowKey];
  const value = row?.[cellKey];
  if (value == null || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return obj.icon_class === 'arrow' && obj.text_position === 'last';
}

/**
 * Infers alignment from the first row's cell value:
 * number → right, string (or other) → left.
 */
function getGeneralColumnAlign(
  columnKey: string,
  tableData: TableData,
  rowKeys: string[]
): TextAlign {
  if (rowKeys.length === 0) return 'left';
  const colIndex = columnKey.slice(1);
  const cellKey = `c${colIndex}`;
  const firstRowKey = rowKeys[0];
  const row = tableData[firstRowKey];
  const value = row?.[cellKey];
  return isNumericCellValue(value) ? 'right' : 'left';
}

type ColumnDataTypeCategory =
  | 'string-like'
  | 'string_struct'
  | 'numeric'
  | 'img_tech_chart'
  | 'img_factor_diagram'
  | 'icon_struct'
  | 'alarm'
  | 'my_data_icon'
  | 'my_watchlist_icon'
  | 'my_watchlist'
  | 'my_watchlist_ui'
  | 'my_portfolio'
  | 'my_rating'
  | 'my_rating_ui'
  | 'my_data_struct'
  | 'general'
  | 'other';

const DATA_TYPE_TO_CATEGORY: Record<string, ColumnDataTypeCategory> = {
  img_tech_chart_struct: 'img_tech_chart',
  img_factor_diagram_struct: 'img_factor_diagram',
  icon_struct: 'icon_struct',
  alarm: 'alarm',
  myDataIcon: 'my_data_icon',
  myWatchlistIcon: 'my_watchlist_icon',
  myWatchlist: 'my_watchlist',
  myWatchlistUI: 'my_watchlist_ui',
  myPortfolio: 'my_portfolio',
  myRating: 'my_rating',
  myData_struct: 'my_data_struct',
};

function getColumnDataTypeCategory(
  dataType: string | undefined,
  isStringLike: (d: string | undefined) => boolean,
  isNumeric: (d: string | undefined) => boolean
): ColumnDataTypeCategory {
  if (isStringLike(dataType)) return 'string-like';
  if (dataType === 'string_struct') return 'string_struct';
  if (isNumeric(dataType)) return 'numeric';
  const fromMap = DATA_TYPE_TO_CATEGORY[dataType ?? ''];
  if (fromMap != null) return fromMap;
  return dataType === 'general' || dataType === undefined ? 'general' : 'other';
}

const FIRST_COLUMN_LEFT_CATEGORIES = new Set<ColumnDataTypeCategory>([
  'string-like',
  'string_struct',
  'alarm',
  'my_data_icon',
  'my_watchlist_icon',
  'my_watchlist',
  'my_watchlist_ui',
  'my_portfolio',
  'my_rating',
  'my_rating_ui',
  'my_data_struct',
]);

const OTHER_COLUMN_LEFT_CATEGORIES = new Set<ColumnDataTypeCategory>([
  ...FIRST_COLUMN_LEFT_CATEGORIES,
  'img_tech_chart',
  'img_factor_diagram',
]);

export type UseColumnAlignmentParams = {
  columnKeys: string[];
  columnAlign: TableAlign;
  columnDataType: TableDataType;
  tableData: TableData;
  rowKeys: string[];
};

function getAlignForColumn(ctx: {
  columnKey: string;
  index: number;
  category: ColumnDataTypeCategory;
  tableData: TableData;
  rowKeys: string[];
}): TextAlign {
  const { columnKey, index, category, tableData, rowKeys } = ctx;
  const leftCategories = index === 0 ? FIRST_COLUMN_LEFT_CATEGORIES : OTHER_COLUMN_LEFT_CATEGORIES;
  if (leftCategories.has(category)) return 'left';
  if (category === 'icon_struct') {
    const leftIcon =
      isIconStructFlagColumn(columnKey, tableData, rowKeys) ||
      isIconStructArrowTextPositionLast(columnKey, tableData, rowKeys);
    return leftIcon ? 'left' : 'right';
  }
  if (category === 'general') {
    return getGeneralColumnAlign(columnKey, tableData, rowKeys);
  }
  return 'right';
}

function computeAlignmentMap(params: UseColumnAlignmentParams): Record<string, TextAlign> {
  const { columnKeys, columnAlign, columnDataType, tableData, rowKeys } = params;
  const map: Record<string, TextAlign> = {};
  for (let i = 0; i < columnKeys.length; i++) {
    const columnKey = columnKeys[i];
    const explicitAlign = columnAlign[columnKey];
    if (isValidAlign(explicitAlign)) {
      map[columnKey] = explicitAlign;
      continue;
    }
    const dataType = columnDataType[columnKey];
    const category = getColumnDataTypeCategory(dataType, isStringLikeDataType, isNumericDataType);
    map[columnKey] = getAlignForColumn({
      columnKey,
      index: i,
      category,
      tableData,
      rowKeys,
    });
  }
  return map;
}

/**
 * Resolves text alignment per column with a consistent priority:
 * 1. column_align from JSON (if present for that column)
 * 2. First column (index 0): string/string(N)/stringWrap(N)/general/undefined → left; else → right
 * 3. column_data_type is string, string(N), stringWrap(N), string_struct, or myData_struct → left
 * 4. column_data_type is numeric or 'numstring' → right
 * 5. column_data_type === 'img_tech_chart_struct' → right
 * 6. column_data_type === 'general' or undefined → center
 * 7. Otherwise → right
 */
export function useColumnAlignment(params: UseColumnAlignmentParams): Record<string, TextAlign> {
  const { columnKeys, columnAlign, columnDataType, tableData, rowKeys } = params;
  return useMemo(
    () => computeAlignmentMap(params),
    // Depend on destructured values so we don't recompute when params object reference changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columnKeys, columnAlign, columnDataType, tableData, rowKeys]
  );
}
