import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';

/**
 * Icon component factory functions
 * These functions create consistent icon components with standardized sizing and styling
 */

/**
 * Creates a chevron up icon
 * @param className - Additional CSS classes to apply
 * @returns React JSX element with ChevronUp icon
 */
export function chevronUp(className: string): React.JSX.Element {
  return <ChevronUp size={12} className={`up-down-icon ${className}`} aria-hidden="true" />;
}

/**
 * Creates a chevron down icon
 * @param className - Additional CSS classes to apply
 * @returns React JSX element with ChevronDown icon
 */
export function chevronDown(className: string): React.JSX.Element {
  return <ChevronDown size={12} className={`up-down-icon ${className}`} aria-hidden="true" />;
}

/**
 * Creates an arrow up icon
 * @param className - Optional additional CSS classes to apply
 * @returns React JSX element with ArrowUp icon
 */
export function arrowUp(className?: string): React.JSX.Element {
  return <ArrowUp size={12} className={`up-down-icon ${className || ''}`} aria-hidden="true" />;
}

/**
 * Creates an arrow down icon
 * @param className - Optional additional CSS classes to apply
 * @returns React JSX element with ArrowDown icon
 */
export function arrowDown(className?: string): React.JSX.Element {
  return <ArrowDown size={12} className={`up-down-icon ${className || ''}`} aria-hidden="true" />;
}

/**
 * Creates an arrow right icon
 * @param className - Optional additional CSS classes to apply
 * @returns React JSX element with ArrowRight icon
 */
export function arrowRight(className?: string): React.JSX.Element {
  return <ArrowRight size={12} className={`up-down-icon ${className || ''}`} aria-hidden="true" />;
}

/**
 * Creates an arrow left icon
 * @param className - Optional additional CSS classes to apply
 * @returns React JSX element with ArrowLeft icon
 */
export function arrowLeft(className?: string): React.JSX.Element {
  return <ArrowLeft size={12} className={`up-down-icon ${className || ''}`} aria-hidden="true" />;
}
