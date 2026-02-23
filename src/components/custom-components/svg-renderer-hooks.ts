'use client';

import { useEffect, useRef, useState } from 'react';

import { configuration } from '@/environment/configuration';
import { getLanguageFromStorage } from '@/lib/utils';
import { useGetSvgData } from '@/store/api-service/svg-api-service';
import { ChartDimensions, observeChartResize } from '@/utils/chart-dimensions';

export function useResponsiveDimensions(
  containerRef: React.RefObject<HTMLDivElement>,
  options: {
    enable: boolean;
    containerWidth?: number;
    containerHeight?: number;
    defaultWidth: number;
    defaultHeight: number;
    aspectRatio?: number;
    debounceMs: number;
  }
): ChartDimensions | null {
  const [dimensions, setDimensions] = useState<ChartDimensions | null>(null);

  useEffect(() => {
    if (!options.enable || !containerRef.current) return;

    return observeChartResize(containerRef.current, setDimensions, {
      defaultWidth: options.containerWidth ?? options.defaultWidth,
      defaultHeight: options.containerHeight ?? options.defaultHeight,
      aspectRatio: options.aspectRatio,
      debounceMs: options.debounceMs,
    });
  }, [
    options.enable,
    options.containerWidth,
    options.containerHeight,
    options.defaultWidth,
    options.defaultHeight,
    options.aspectRatio,
    options.debounceMs,
    containerRef,
  ]);

  return dimensions;
}

export function useFinalWidth(
  enableResponsive: boolean,
  dimensions: ChartDimensions | null,
  containerWidth: number | undefined,
  defaultWidth: number
): number {
  if (!enableResponsive) return containerWidth ?? defaultWidth;
  return dimensions?.width ?? containerWidth ?? defaultWidth;
}

export function useShouldFetch(
  enableResponsive: boolean,
  dimensions: ChartDimensions | null,
  containerWidth?: number
): boolean {
  return !enableResponsive || dimensions !== null || containerWidth !== undefined;
}

type SvgDataOptions = {
  svg_id?: string;
  chart_params?: string;
  chart_tooltip_id?: number;
  show_image_border?: number;
  enableResponsive: boolean;
  dimensions: ChartDimensions | null;
  containerWidth?: number;
  defaultWidth: number;
  chart_maximize?: number;
};

function buildSvgQueryParams(
  options: SvgDataOptions,
  finalWidth: number,
  lang: string
): Parameters<typeof useGetSvgData>[0] {
  return {
    svg_id: options.svg_id,
    ...(options.chart_params && { chart_param: encodeURI(options.chart_params) }),
    ...(options.chart_tooltip_id !== undefined && {
      chart_tooltip_id: options.chart_tooltip_id,
    }),
    ...(options.show_image_border !== undefined && {
      show_image_border: options.show_image_border,
    }),
    ...(options.chart_maximize !== undefined && {
      chart_maximize: options.chart_maximize,
    }),
    w: finalWidth,
    lang,
  };
}

export function useSvgData(options: SvgDataOptions) {
  const language = getLanguageFromStorage() ?? configuration.DEFAULT_LANGUAGE;
  const finalWidth = useFinalWidth(
    options.enableResponsive,
    options.dimensions,
    options.containerWidth,
    options.defaultWidth
  );
  const shouldFetch = useShouldFetch(
    options.enableResponsive,
    options.dimensions,
    options.containerWidth
  );
  const queryParams = buildSvgQueryParams(options, finalWidth, language);
  const { data, isLoading, error } = useGetSvgData(queryParams, shouldFetch);

  return {
    data,
    error,
    showLoading: !shouldFetch || isLoading,
    showError: shouldFetch && Boolean(error) && !isLoading,
    hasData: Boolean(data?.raw_svg),
  };
}

export function useSvgRenderer(props: {
  svg_id?: string;
  chart_params?: string;
  chart_tooltip_id?: number;
  show_image_border?: number;
  containerWidth?: number;
  containerHeight?: number;
  enableResponsive: boolean;
  defaultWidth: number;
  defaultHeight: number;
  aspectRatio?: number;
  debounceMs: number;
  chart_maximize?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const dimensions = useResponsiveDimensions(containerRef as React.RefObject<HTMLDivElement>, {
    enable: props.enableResponsive,
    containerWidth: props.containerWidth,
    containerHeight: props.containerHeight,
    defaultWidth: props.defaultWidth,
    defaultHeight: props.defaultHeight,
    aspectRatio: props.aspectRatio,
    debounceMs: props.debounceMs,
  });

  const svgState = useSvgData({
    svg_id: props.svg_id,
    chart_params: props.chart_params,
    chart_tooltip_id: props.chart_tooltip_id,
    show_image_border: props.show_image_border,
    enableResponsive: props.enableResponsive,
    dimensions,
    containerWidth: props.containerWidth,
    defaultWidth: props.defaultWidth,
    chart_maximize: props.chart_maximize,
  });

  return { containerRef, ...svgState };
}
