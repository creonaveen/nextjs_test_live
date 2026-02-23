import DOMPurify from 'isomorphic-dompurify';

const SVG_ALLOWED_ATTR = [
  'id',
  'class',
  'style',
  'viewBox',
  'width',
  'height',
  'xmlns',
  'xmlns:xlink',
  'points',
  'd',
  'x',
  'y',
  'x1',
  'y1',
  'x2',
  'y2',
  'cx',
  'cy',
  'r',
  'rx',
  'ry',
  'stroke',
  'stroke-width',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-dasharray',
  'stroke-dashoffset',
  'fill',
  'fill-opacity',
  'fill-rule',
  'opacity',
  'offset',
  'stop-color',
  'stop-opacity',
  'transform',
  'transform-origin',
  'font-family',
  'font-size',
  'font-weight',
  'text-anchor',
  'alignment-baseline',
  'dy',
  'dx',
  'data',
  'clip-path',
  'mask',
  'filter',
  'href',
  'xlink:href',
  'data-*',
];

function getSvgSanitizeConfig() {
  return {
    ADD_URI_SAFE_ATTR: ['data'],
    ADD_ATTR: ['data'],
    ALLOWED_ATTR: SVG_ALLOWED_ATTR,
    ALLOW_UNKNOWN_PROTOCOLS: false,
    RETURN_DOM_FRAGMENT: false,
  };
}

/**
 * Sanitizes SVG content to prevent XSS attacks while preserving SVG functionality.
 *
 * This function uses DOMPurify with a configuration that allows SVG elements
 * and their essential attributes while removing potentially dangerous scripts
 * and event handlers.
 *
 * @param svgContent - Raw SVG string content to sanitize
 * @returns Sanitized SVG string safe for rendering
 *
 * @example
 * ```tsx
 * const sanitized = sanitizeSvg(rawSvgString);
 * <div dangerouslySetInnerHTML={{ __html: sanitized }} />
 * ```
 */
export function sanitizeSvg(svgContent: string): string {
  if (!svgContent || typeof svgContent !== 'string') return '';
  const config = getSvgSanitizeConfig();
  return DOMPurify.sanitize(svgContent, config as Parameters<typeof DOMPurify.sanitize>[1]);
}

/**
 * Type guard to check if a value is a valid SVG string
 */
export function isValidSvg(svg: unknown): svg is string {
  return typeof svg === 'string' && svg.trim().length > 0;
}
