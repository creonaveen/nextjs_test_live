'use client';

import React from 'react';

import type { ChartApiProps, StaticContentApiProps } from '../../chart-maximize-utils';

import { ChartMaximizeDialogSheet } from './chart-maximize-dialog-sheet';

/**
 * Props for ChartMaximizeWithTrigger component
 */
interface ChartMaximizeWithTriggerProps {
  id?: string;
  /** Title to display in the dialog/sheet header */
  title?: string;
  /** Children to render as the trigger element and fallback content */
  children: React.ReactNode;
  /** Whether to enable tooltips (deprecated, use tooltipSetting instead) */
  enableTooltips?: boolean;
  /** Tooltip setting level (0 = disabled, 1-2 = enabled with different levels) */
  tooltipSetting?: number;
  /** API props for fetching chart data via SVG API */
  apiProps?: ChartApiProps;
  /** API props for fetching static content */
  staticContentApiProps?: StaticContentApiProps;
}

/**
 * ChartMaximizeWithTrigger - Wrapper component that adds click-to-maximize functionality
 *
 * Wraps children with a clickable container that opens the maximized chart dialog/sheet.
 * Only renders the dialog/sheet when opened for better performance.
 *
 * @example
 * ```tsx
 * <ChartMaximizeWithTrigger
 *   title="Stock Chart"
 *   tooltipSetting={2}
 *   apiProps={{
 *     svg_id: "12345"
 *   }}
 * >
 *   <ChartPreview />
 * </ChartMaximizeWithTrigger>
 * ```
 */
export function ChartMaximizeWithTrigger({
  id,
  title,
  children,
  enableTooltips = true,
  tooltipSetting = 2,
  apiProps,
  staticContentApiProps,
}: ChartMaximizeWithTriggerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
    }
  }, []);

  return (
    <>
      {/* Render the trigger outside the dialog - clone children and add onClick */}
      <div
        className="cursor-pointer"
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={title ? `Maximize chart: ${title}` : 'Maximize chart'}
      >
        {children}
      </div>

      {/* Only render the dialog/sheet when it needs to be opened */}
      {isOpen && (
        <ChartMaximizeDialogSheet
          testId={id}
          title={title}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          enableTooltips={enableTooltips}
          tooltipSetting={tooltipSetting}
          apiProps={apiProps}
          staticContentApiProps={staticContentApiProps}
        >
          {children}
        </ChartMaximizeDialogSheet>
      )}
    </>
  );
}
