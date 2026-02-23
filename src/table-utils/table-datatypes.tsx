/** Arrow icon values for TextTagWithArrowIcon (icon_struct with icon_class 'arrow'). */
export const ARROW_ICON_VALUES = ['arrow_up', 'arrow_down', 'arrow_right', 'arrow_left'] as const;
export type ArrowIconType = (typeof ARROW_ICON_VALUES)[number];

export function getTableClassName(value?: string): string {
  if (!value) {
    return '';
  }

  switch (value) {
    case 'Lowlight':
      return 'low-light';
    case 'Highlight':
      return 'high-light';
    case 'Header':
      return 'header';
    case 'Summary':
      return 'summary';
  }

  return '';
}

export function getHiddenTableClasses(hiddenOn: string) {
  switch (hiddenOn) {
    case 'hiddenForAll':
      return 'hidden';
    case 'hiddenForDesktop':
      return 'hidden lg:table-cell';
    case 'hiddenForLaptop':
      return 'hidden md:table-cell';
    case 'hiddenForTablet':
      return 'hidden sm:table-cell';
    case 'hiddenForMobile':
      return 'hidden';
  }
}

export function getFormattedTableName(value: string): string {
  if (!value) {
    return '';
  }

  switch (value) {
    case 'cleanTable':
      return 'clean-table';
    case 'standardTable':
      return 'standard-table';
    case 'researchTable':
      return 'research-table';
    default:
      return 'standard-table';
  }
}

export function labelStructColorToBadgeVariant(
  color: string
): 'success' | 'error' | 'warning' | 'neutral' | 'primary' {
  switch (color) {
    case 'positive':
      return 'success';
    case 'negative':
      return 'error';
    case 'neutral':
      return 'warning';
    default:
      return 'primary';
  }
}

export function labelStructColorToTextColor(
  color: string
): 'text-success-text' | 'text-error-text' | 'text-warning-text' {
  switch (color) {
    case 'positive':
      return 'text-success-text';
    case 'negative':
      return 'text-error-text';
    case 'neutral':
      return 'text-warning-text';
    default:
      return 'text-warning-text';
  }
}

/**
 * Parses string(N) column data type and returns max character length.
 * e.g. 'string(10)' -> 10, 'string' or 'general' -> undefined
 */
export function getStringMaxLength(dataType: string | undefined): number | undefined {
  if (!dataType || typeof dataType !== 'string') return undefined;
  const match = dataType.match(/^string\((\d+)\)$/);
  return match ? parseInt(match[1], 10) : undefined;
}

/**
 * Parses stringWrap(N) column data type and returns wrap length (used for max-width: N * 10px).
 * e.g. 'stringWrap(10)' -> 10, 'stringWrap(15)' -> 15
 */
export function getStringWrapLength(dataType: string | undefined): number | undefined {
  if (!dataType || typeof dataType !== 'string') return undefined;
  const match = dataType.match(/^stringWrap\((\d+)\)$/);
  return match ? parseInt(match[1], 10) : undefined;
}

/**
 * Numeric column_data_type values used in numeric-datatype examples (and numstring).
 * Columns with these types are right-aligned by default.
 */
const NUMERIC_DATATYPES = new Set([
  'numstring',
  'price',
  'priceCurrency',
  'pricePrecision4',
  'percent',
  'priceChange',
  'priceChangePrecision4',
  'percentChange',
  'value',
  'count',
  'integer',
  'signedInteger',
  'decimal1',
  'decimal2',
  'decimal3',
  'decimalPos',
]);

export function isNumericDataType(dataType: string | undefined): boolean {
  return typeof dataType === 'string' && NUMERIC_DATATYPES.has(dataType);
}

/**
 * True if column_data_type is string, string(N), or stringWrap(N).
 * These columns are left-aligned by default.
 */
export function isStringLikeDataType(dataType: string | undefined): boolean {
  if (!dataType || typeof dataType !== 'string') return false;
  if (dataType === 'string') return true;
  if (getStringMaxLength(dataType) != null) return true; // string(N)
  if (getStringWrapLength(dataType) != null) return true; // stringWrap(N)
  return false;
}

/** Size for img_tech_chart_struct chart container and SvgRenderer dimensions. */
export type ImgTechChartSize = 'tiny' | 'small' | 'medium' | 'large';

export interface ImgTechChartSizeConfig {
  containerClassName: string;
  defaultWidth: number;
}

/**
 * Returns container className and default dimensions for img_tech_chart_struct by size.
 * tiny: no min-w; small: h-[80px] min-w-[180px]; medium: h-[180px] min-w-[400px].
 */
export function getImgTechChartSizeConfig(size: string | undefined): ImgTechChartSizeConfig {
  const normalized = (size ?? 'small') as ImgTechChartSize;
  switch (normalized) {
    case 'tiny':
      return { containerClassName: 'w-[150px]', defaultWidth: 150 };
    case 'small':
      return { containerClassName: 'w-[200px]', defaultWidth: 200 };
    case 'medium':
      return { containerClassName: 'w-[400px]', defaultWidth: 400 };
    case 'large':
      return { containerClassName: 'w-[500px]', defaultWidth: 500 };
  }
}

// Returns the Tailwind rounded size based on img tech chart size.
export function getRoundCornersSize(size: string | undefined): string {
  switch (size) {
    case 'tiny':
      return 'sm';
    case 'small':
      return 'sm';
    case 'medium':
      return 'md';
    case 'large':
      return 'md';
    default:
      return 'md'; // Default to 'md' if size is undefined or unrecognized
  }
}
