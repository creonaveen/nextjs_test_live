/**
 * Constants used across utility functions
 */

/**
 * Tooltip default dimensions and offsets
 */
export const TOOLTIP_DEFAULTS = {
  WIDTH: 220,
  HEIGHT: 100,
  X_OFFSET: 10,
  Y_OFFSET: 10,
  MAX_WIDTH: 300,
} as const;

/**
 * Chart default dimensions
 */
export const CHART_DEFAULTS = {
  WIDTH: 1200,
  HEIGHT: 500,
  MAX_WIDTH: 1920,
  MAX_HEIGHT: 1080,
  MIN_WIDTH: 320,
  MIN_HEIGHT: 200,
  // Common chart dimensions
  MAIN_CHART_HEIGHT: 500,
  RSI_CHART_HEIGHT: 140,
  THUMBNAIL_WIDTH: 400,
  THUMBNAIL_HEIGHT: 200,
} as const;

/**
 * Viewport fallback dimensions for SSR
 */
export const VIEWPORT_DEFAULTS = {
  WIDTH: 1920,
  HEIGHT: 1080,
} as const;
