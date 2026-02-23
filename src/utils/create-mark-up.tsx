import DOMPurify from 'isomorphic-dompurify';
import React from 'react';

/**
 * Renders HTML content safely by sanitizing it to prevent XSS attacks.
 * Uses DOMPurify with ALLOW_UNKNOWN_PROTOCOLS: false to block dangerous href protocols
 * (javascript:, data:, vbscript:, etc.) on both server and client, preventing hydration mismatches.
 *
 * @param html - HTML string to render
 * @returns React element with sanitized HTML or null if html is empty
 *
 * @example
 * ```tsx
 * <RenderHTML html="<strong>Bold text</strong>" />
 * ```
 */
export function RenderHTML({ html }: { html: string }): React.JSX.Element | null {
  if (!html) return null;

  // Use DOMPurify with enhanced href validation that works on both server and client
  // ALLOW_UNKNOWN_PROTOCOLS: false blocks javascript:, data:, vbscript:, etc.
  // This ensures href validation happens server-side, preventing hydration mismatches
  // SAFE_FOR_TEMPLATES: true provides additional security for template usage
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'b',
      'i',
      'em',
      'strong',
      'a',
      'p',
      'br',
      'span',
      'div',
      'ul',
      'ol',
      'li',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id'],
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false, // Blocks javascript:, data:, vbscript:, etc. - works on both server and client
    SAFE_FOR_TEMPLATES: true,
  });

  // DOMPurify with ALLOW_UNKNOWN_PROTOCOLS: false already sanitizes hrefs on both server and client
  // This prevents hydration mismatches and ensures consistent behavior across environments
  // The isSafeHref function is kept for reference but DOMPurify handles the sanitization
  return <span dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
