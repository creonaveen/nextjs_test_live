import { Skeleton } from 'investtech/external-components';
import React from 'react';

import { sanitizeSvg } from '@/utils/sanitize-svg';

const DIALOG_SVG_CLASS =
  'w-full bg-chart-background rounded-xl [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-h-full [&>svg]:bg-chart-background';

interface ChartContentProps {
  isMobile: boolean;
  hasApiProps: boolean;
  showLoading: boolean;
  rawSvg?: string;
  children: React.ReactNode;
}

export function ChartContent({
  isMobile,
  hasApiProps,
  showLoading,
  rawSvg,
  children,
}: ChartContentProps) {
  const svgClass = isMobile ? '' : DIALOG_SVG_CLASS;

  if (hasApiProps && showLoading)
    return isMobile ? (
      <Skeleton className="h-[80vh] max-h-[80vh] w-[90vw] max-w-[90vw]" />
    ) : (
      <Skeleton className="h-[500px] w-full" />
    );

  if (hasApiProps && rawSvg)
    return <div className={svgClass} dangerouslySetInnerHTML={{ __html: sanitizeSvg(rawSvg) }} />;

  return <div className={svgClass}>{children}</div>;
}
