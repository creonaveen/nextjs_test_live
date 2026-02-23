import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Props for CenteredProgress component
 */
export interface CenteredProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress value (can be negative for bidirectional progress) */
  value: number;
  /** Maximum absolute value (default: 200) */
  max?: number;
  /** Whether to display the numeric value below the progress bar */
  showValue?: boolean;
  /** Size variant of the progress bar */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant (default uses blue/orange, technical uses green/red) */
  variant?: 'default' | 'technical';
}

/**
 * CenteredProgress - Bidirectional progress bar component
 *
 * Displays a progress bar that can show positive and negative values from a center point.
 * Useful for displaying technical indicators, sentiment scores, or comparative metrics.
 *
 * @example
 * ```tsx
 * <CenteredProgress
 *   value={75}
 *   max={100}
 *   showValue={true}
 *   size="md"
 *   variant="technical"
 * />
 * ```
 */
// Size variants
const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

function getProgressColor(variant: 'default' | 'technical', isPositive: boolean): string {
  if (variant === 'technical') {
    return isPositive
      ? 'bg-gradient-to-r from-green-800 to-green-600'
      : 'bg-gradient-to-l from-red-800 to-red-600';
  }
  return isPositive
    ? 'bg-gradient-to-r from-blue-400 to-blue-600'
    : 'bg-gradient-to-l from-orange-400 to-orange-600';
}

function getValueTextColor(variant: 'default' | 'technical', isPositive: boolean): string {
  if (variant === 'technical') {
    return isPositive ? 'text-success' : 'text-error';
  }
  return isPositive ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400';
}

function ValueDisplay({
  clampedValue,
  variant,
}: {
  clampedValue: number;
  variant: 'default' | 'technical';
}) {
  const isPositive = clampedValue >= 0;

  return (
    <div className="flex justify-center">
      <span className={cn('text-sm font-medium', getValueTextColor(variant, isPositive))}>
        {clampedValue > 0 ? '+' : ''}
        {clampedValue}
      </span>
    </div>
  );
}

const CenteredProgress = React.forwardRef<HTMLDivElement, CenteredProgressProps>(
  (
    { className, value, max = 200, showValue = false, size = 'md', variant = 'default', ...props },
    ref
  ) => {
    // Clamp value between -max and max
    const clampedValue = Math.max(-max, Math.min(max, value));

    // Calculate percentage (0-100) for the progress bar
    const percentage = (Math.abs(clampedValue) / max) * 100;

    // Determine if value is positive or negative
    const isPositive = clampedValue >= 0;

    const progressColor = getProgressColor(variant, isPositive);

    return (
      <div className="w-full space-y-1">
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={Number(-max)}
          aria-valuemax={Number(max)}
          aria-label={`Progress: ${clampedValue} of ${max}`}
          className={cn(
            'relative w-full overflow-hidden rounded-full bg-black',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {/* Center line indicator */}
          <div className="bg-grey-00 absolute top-0 left-1/2 h-full w-0.5 -translate-x-0.5 transform" />

          {/* Progress bar */}
          <div
            className={cn(
              'centered-progress-bar h-full transition-all duration-300 ease-in-out',
              progressColor,
              isPositive ? 'origin-left' : 'origin-right'
            )}
            style={
              {
                '--progress-width': `${percentage}%`,
                '--progress-margin-left': isPositive ? '50%' : `${50 - percentage}%`,
              } as React.CSSProperties
            }
          />
        </div>

        {showValue && <ValueDisplay clampedValue={clampedValue} variant={variant} />}
      </div>
    );
  }
);

CenteredProgress.displayName = 'CenteredProgress';

export { CenteredProgress };
