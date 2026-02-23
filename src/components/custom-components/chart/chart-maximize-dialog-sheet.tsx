'use client';

import React from 'react';

import { configuration } from '@/environment/configuration';
import { usePlatform } from '@/lib/platform';
import { getLanguageFromStorage } from '@/lib/utils';

import { useChartMaximization } from '../../chart-maximize-utils';
import type { ChartApiProps, StaticContentApiProps } from '../../chart-maximize-utils';
import { useTooltipAttachment } from '../use-tooltip-attachment';

import { ChartContent } from './chart-content';
import { DesktopChartDialog } from './desktop-chart-dialog';
import { MobileChartSheet } from './mobile-chart-sheet';

interface ChartMaximizeDialogSheetProps {
  testId?: string; /** Title to display in the dialog/sheet header */
  title?: string; /** Children to render as fallback when API data is not available */
  children: React.ReactNode; /** Whether the dialog/sheet is open */
  isOpen: boolean; /** Callback when open state changes */
  onOpenChange: (
    open: boolean
  ) => void; /** Whether to enable tooltips (deprecated, use tooltipSetting instead) */
  enableTooltips?: boolean; /** Tooltip setting level (0 = disabled, 1-2 = enabled with different levels) */
  tooltipSetting?: number; /** API props for fetching chart data via SVG API */
  apiProps?: ChartApiProps; /** API props for fetching static content */
  staticContentApiProps?: StaticContentApiProps;
}

export function ChartMaximizeDialogSheet({
  testId,
  title,
  children,
  isOpen,
  onOpenChange,
  tooltipSetting,
  apiProps,
  staticContentApiProps,
}: ChartMaximizeDialogSheetProps) {
  const platform = usePlatform();
  const language = getLanguageFromStorage() ?? configuration?.DEFAULT_LANGUAGE;
  const { chartContainerRef, maximizedData, showLoading, hasApiProps } = useChartMaximization(
    isOpen,
    apiProps,
    staticContentApiProps,
    language
  );
  useTooltipAttachment({ platform, isOpen, tooltipSetting, maximizedData, chartContainerRef });

  const isMobile = platform !== 'desktop';
  const content = (
    <ChartContent
      isMobile={isMobile}
      hasApiProps={hasApiProps}
      showLoading={showLoading}
      rawSvg={maximizedData?.raw_svg}
    >
      {children}
    </ChartContent>
  );

  const commonProps = { testId, title, isOpen, onOpenChange, chartContainerRef };

  return isMobile ? (
    <MobileChartSheet {...commonProps} platform={platform}>
      {content}
    </MobileChartSheet>
  ) : (
    <DesktopChartDialog {...commonProps} tooltipSetting={tooltipSetting}>
      {content}
    </DesktopChartDialog>
  );
}
