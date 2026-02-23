'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { SvgRendererContent } from './svg-renderer-components';
import { useSvgRenderer } from './svg-renderer-hooks';

interface SvgRendererProps {
  testId?: string;
  svg_id?: string;
  alt: string;
  className?: string;
  chart_params?: string;
  containerWidth?: number;
  containerHeight?: number;
  enableResponsive?: boolean;
  defaultWidth?: number;
  defaultHeight?: number;
  aspectRatio?: number;
  debounceMs?: number;
  chart_tooltip_id?: number;
  show_image_border?: number;
  chart_maximize?: number;
}

const SvgRenderer = React.memo(function SvgRenderer({
  testId,
  svg_id,
  alt,
  className,
  chart_params,
  chart_tooltip_id,
  containerWidth,
  containerHeight,
  enableResponsive = true,
  defaultWidth = 1200,
  defaultHeight = 500,
  aspectRatio,
  debounceMs = 500,
  show_image_border,
  chart_maximize,
}: SvgRendererProps) {
  const e = useTranslations('errors');
  const { containerRef, data, error, showLoading, showError, hasData } = useSvgRenderer({
    svg_id,
    chart_params,
    chart_tooltip_id,
    show_image_border,
    containerWidth,
    containerHeight,
    enableResponsive,
    defaultWidth,
    defaultHeight,
    aspectRatio,
    debounceMs,
    chart_maximize,
  });

  return (
    <div
      id={testId}
      ref={containerRef}
      className={`${className} flex h-full w-full items-center justify-center`}
    >
      <SvgRendererContent
        showLoading={showLoading}
        showError={showError}
        hasData={hasData}
        error={error}
        data={data as { raw_svg: string } | null}
        alt={alt}
        e={e}
      />
    </div>
  );
});

export default SvgRenderer;
