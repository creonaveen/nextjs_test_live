import { Badge } from 'investtech/external-components';
import { Heart, TriangleAlertIcon } from 'lucide-react';
import React from 'react';

import { arrowLeft, arrowDown, arrowRight, arrowUp } from '@/components/custom-components/icon';

import { RenderHTML } from './create-mark-up';

const ICON_SIZE = 28;
const ICON_CLASS =
  'text-grey-500 dark:text-grey-400 hover:text-primary dark:hover:text-primary-text-hover dark:active:text-primary-text-active active:text-primary-text-active hover:bg-grey-100 dark:hover:bg-accent-1/50 ml-auto shrink-0 cursor-pointer rounded-full p-1.25';

const ARROW_COLOR_MAP: Record<string, string> = {
  positive: 'bg-success',
  negative: 'bg-error',
  neutral: 'bg-warning',
};

const ARROW_ICON_MAP: Record<string, () => React.JSX.Element> = {
  arrow_up: arrowUp,
  arrow_down: arrowDown,
  arrow_right: arrowRight,
  arrow_left: arrowLeft,
};

function getArrowBackgroundClass(color: string): string {
  return ARROW_COLOR_MAP[color] ?? 'bg-warning';
}

function renderArrowSpan(icon: string, bgClass: string, testId: string): React.JSX.Element {
  const IconComponent = ARROW_ICON_MAP[icon];
  return (
    <span className={`dark:text-grey-900 rounded-full p-1 text-white ${bgClass}`} id={testId}>
      {IconComponent ? IconComponent() : null}
    </span>
  );
}

function hasContent(value?: string): boolean {
  return value != null && value.trim().length > 0;
}

/**
 * Component that displays text with an arrow icon in a colored badge.
 *
 * @param content - Text content to display
 * @param icon - Icon type: 'arrow_up', 'arrow_down', 'arrow_right', or 'arrow_left'
 * @param color - Color theme: 'positive', 'negative', or 'neutral'
 * @param className - Additional CSS classes
 * @returns JSX element
 */
export function TextTagWithArrowIcon({
  content,
  testId,
  icon,
  color,
  className,
  textPosition = 'first',
  align = 'right',
}: {
  content?: string;
  testId: string;
  icon: string;
  color: string;
  className?: string;
  /** 'first' = text then arrow; 'last' = arrow then text */
  textPosition?: 'first' | 'last';
  /** Horizontal alignment of content within the cell: 'left' | 'right' */
  align?: 'left' | 'right';
}): React.JSX.Element {
  const bgClass = getArrowBackgroundClass(color);
  const justifyClass = align === 'left' ? 'justify-start' : 'justify-end';
  const arrowSpan = renderArrowSpan(icon, bgClass, testId);
  const wrapperClass = `text-grey-900 dark:text-grey-100 flex shrink-0 items-center ${justifyClass}`;

  if (!hasContent(content)) {
    return <span className={`${wrapperClass} ${className ?? ''}`}>{arrowSpan}</span>;
  }

  const flexClass = `${wrapperClass} gap-1 text-sm ${className ?? ''}`;
  const isArrowFirst = textPosition === 'last';
  return (
    <span className={flexClass}>
      {isArrowFirst ? (
        <>
          {arrowSpan}
          {content}
        </>
      ) : (
        <>
          {content}
          {arrowSpan}
        </>
      )}
    </span>
  );
}

export function MyDataIcon(): React.JSX.Element {
  return (
    <span className="flex items-center gap-1">
      <Heart size={ICON_SIZE} className={ICON_CLASS} aria-hidden />
    </span>
  );
}

export function AlertIcon(): React.JSX.Element {
  return (
    <span className="flex items-center gap-1">
      <TriangleAlertIcon
        size={18}
        className="text-primary hover:text-primary-text-hover active:text-primary-text-active shrink-0 cursor-pointer"
        aria-hidden
      />
    </span>
  );
}

export function MyDataBadge({ displayText }: { displayText: string }): React.JSX.Element {
  return (
    <span className="flex items-center gap-1">
      <Badge variant="neutral" size="medium">
        <RenderHTML html={displayText} />
      </Badge>
    </span>
  );
}

export function WarningIconTiny({ size = 4 }: { size?: number }): React.JSX.Element {
  return (
    <span className="flex items-center gap-1">
      <TriangleAlertIcon className={`text-error-text size-${size} shrink-0`} />
    </span>
  );
}
