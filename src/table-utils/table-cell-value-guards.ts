import type { LabelValueColored, TableData, TextValueColored } from '@/lib/types/tables-example';

/** Cell value from table data (string, number, or structured object) */
export type TableCellValue = TableData[keyof TableData][string];

/** Literal c_name values for structured table cells */
const C_NAME = {
  LABEL_VALUE_COLORED: 'labelValueColored',
  TEXT_VALUE_COLORED: 'textValueColored',
  ICON: 'icon',
} as const;

/**
 * Checks that value is a non-null object with a string property `c_name`.
 * Use with a specific c_name literal to narrow to LabelValueColored or TextValueColored.
 */
function hasStructuredCellShape(
  value: unknown
): value is Record<string, unknown> & { c_name: string } {
  return (
    value != null &&
    typeof value === 'object' &&
    'c_name' in value &&
    typeof (value as Record<string, unknown>).c_name === 'string'
  );
}

/**
 * Narrow structured cell to a specific c_name and require `text` and `color` keys.
 */
function isStructuredCellWithTextAndColor<T extends string>(
  value: TableCellValue,
  cName: T
): value is Record<string, unknown> & { c_name: T; text: string; color: string } {
  if (!hasStructuredCellShape(value) || (value as { c_name: string }).c_name !== cName) {
    return false;
  }
  const obj = value as Record<string, unknown>;
  return 'text' in obj && 'color' in obj;
}

/**
 * Type guard: value is LabelValueColored (label_struct / labelValueColored).
 */
export function isLabelStructValue(value: TableCellValue): value is LabelValueColored {
  return isStructuredCellWithTextAndColor(value, C_NAME.LABEL_VALUE_COLORED);
}

/**
 * Type guard: value is TextValueColored (textValueColored).
 */
export function isTextValueColoredValue(value: TableCellValue): value is TextValueColored {
  return isStructuredCellWithTextAndColor(value, C_NAME.TEXT_VALUE_COLORED);
}

/** Icon/flag cell: c_name 'icon', icon_class 'flag', value = country code (e.g. 'no', 'se') */
export type IconFlagValue = Record<string, unknown> & {
  c_name: 'icon';
  icon_class: 'flag';
  value: string;
};

/**
 * Type guard: value is icon struct with icon_class 'flag' (country code in value).
 * Use when column_data_type is 'icon_struct' to render country flag from value.
 */
export function isIconFlagValue(value: TableCellValue): value is IconFlagValue {
  if (!hasStructuredCellShape(value) || (value as { c_name: string }).c_name !== C_NAME.ICON) {
    return false;
  }
  const obj = value as Record<string, unknown>;
  return (
    obj.icon_class === 'flag' &&
    'value' in obj &&
    typeof obj.value === 'string' &&
    obj.value.length > 0
  );
}

/** Icon/arrow cell: icon_class 'arrow', e.g. techScoreArrow (arrow only) or techScoreWithArrow (text + arrow). */
export type IconArrowValue = Record<string, unknown> & {
  icon_class: 'arrow';
  color: string;
  direction: string;
  text?: string;
  text_position?: string;
};

/**
 * Type guard: value is icon struct with icon_class 'arrow'.
 * Use when column_data_type is 'icon_struct' to render arrow only or TextTagWithArrowIcon when text is present.
 */
export function isIconArrowValue(value: TableCellValue): value is IconArrowValue {
  if (value == null || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return (
    obj.icon_class === 'arrow' &&
    'direction' in obj &&
    typeof obj.direction === 'string' &&
    'color' in obj &&
    typeof obj.color === 'string' &&
    (!('text' in obj) || typeof obj.text === 'string')
  );
}

/** Link struct cell: url and text (e.g. companyLink). Used when column_data_type is 'link_struct'. */
export type LinkStructValue = Record<string, unknown> & {
  url: string;
  text: string;
};

/**
 * Type guard: value is link struct with url and text.
 * Use when column_data_type is 'link_struct' to render navigation link.
 */
export function isLinkStructValue(value: TableCellValue): value is LinkStructValue {
  if (value == null || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return (
    'url' in obj &&
    typeof obj.url === 'string' &&
    obj.url.length > 0 &&
    'text' in obj &&
    typeof obj.text === 'string'
  );
}

/**
 * Value with warning icon: any struct (string, colored text, badge, etc.) that has icon 'warning'.
 * Use one check: if object has icon === 'warning' and text, render warning icon + text with text_position.
 */
export type ValueWithWarningIcon = Record<string, unknown> & {
  icon: 'warning';
  text: string;
  text_position?: 'first' | 'last';
  color?: string;
};

/**
 * Type guard: value is an object with icon 'warning' and string text.
 * Use in getCellContent to render warning icon + text (with text_position) for any column type.
 */
export function hasWarningIconWithText(value: TableCellValue): value is ValueWithWarningIcon {
  if (value == null || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return obj.icon === 'warning' && 'text' in obj && typeof obj.text === 'string';
}

/** Optional img_param object for img_tech_chart_struct (alternative to other_params string). */
export type ImgTechChartImgParam = {
  show_image_border?: number | boolean;
  chart_tooltip_id?: number;
  chart_maximize?: number | boolean;
};

/** Img tech chart struct cell (img_tech_chart_struct). Used to render inline SVG chart via SvgRenderer. */
export type ImgTechChartStructValue = Record<string, unknown> & {
  chart_param: string;
  alt_text?: string;
  img_param?: ImgTechChartImgParam;
  url?: string;
  api_base?: string;
};

/**
 * Type guard: value has chart_param (required for SvgRenderer).
 * Use when column_data_type is 'img_tech_chart_struct' to render chart.
 */
export function isImgTechChartStructValue(value: TableCellValue): value is ImgTechChartStructValue {
  if (value == null || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return 'chart_param' in obj && typeof obj.chart_param === 'string' && obj.chart_param.length > 0;
}
