'use client';

import { useEffect, useRef, useState } from 'react';

import { usePlatform } from '@/lib/platform';
import { CompanySectionMainChart } from '@/lib/types/todays-case';
import { useGetStaticContent } from '@/store/api-service/static-content-api-service';
import { ChartDimensions, observeChartResize } from '@/utils/chart-dimensions';
import { attachOrDetachEventListeners } from '@/utils/main-chart-tooltip';
import { TooltipLegends } from '@/lib/types/svg';

const MAIN_CHART_RESIZE_OPTIONS = {
  defaultWidth: 1200,
  defaultHeight: 500,
  aspectRatio: 2.4,
  maxWidth: 1920,
  maxHeight: 800,
  minWidth: 320,
  minHeight: 200,
  debounceMs: 500,
};

const INSIDER_CHART_RESIZE_OPTIONS = {
  defaultWidth: 1200,
  defaultHeight: 140,
  aspectRatio: 8.57,
  maxWidth: 1920,
  maxHeight: 200,
  minWidth: 320,
  minHeight: 100,
  debounceMs: 500,
};

function useChartDimensions(
  chartContainerRef: React.RefObject<HTMLDivElement | null>,
  insiderChartContainerRef: React.RefObject<HTMLDivElement | null>,
  hasInsiderChart: boolean
) {
  const [mainChartDimensions, setMainChartDimensions] = useState<ChartDimensions | null>(null);
  const [insiderChartDimensions, setInsiderChartDimensions] = useState<ChartDimensions | null>(
    null
  );

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;
    const cleanup = observeChartResize(
      container,
      (dimensions) => setMainChartDimensions(dimensions),
      MAIN_CHART_RESIZE_OPTIONS
    );
    return cleanup;
  }, [chartContainerRef]);

  useEffect(() => {
    if (!hasInsiderChart) return;
    const container = insiderChartContainerRef.current;
    if (!container) return;
    const cleanup = observeChartResize(
      container,
      (dimensions) => setInsiderChartDimensions(dimensions),
      INSIDER_CHART_RESIZE_OPTIONS
    );
    return cleanup;
  }, [hasInsiderChart, insiderChartContainerRef]);

  return { mainChartDimensions, insiderChartDimensions };
}

function useChartTooltip(opts: {
  chartContainerRef: React.RefObject<HTMLDivElement | null>;
  showTooltip: boolean;
  mainChartData: { raw_svg?: string; tooltip_legends?: unknown } | undefined;
  platform: string;
  chartTooltipId: number;
}) {
  const { chartContainerRef, showTooltip, mainChartData, platform, chartTooltipId } = opts;
  useEffect(() => {
    if (!showTooltip || !mainChartData?.raw_svg || platform !== 'desktop') return;
    const container = chartContainerRef.current;
    const setup = () => {
      if (container) {
        attachOrDetachEventListeners(
          container,
          true,
          false,
          chartTooltipId,
          mainChartData?.tooltip_legends as TooltipLegends | undefined
        );
      }
    };
    setup();
    const timeoutId = setTimeout(setup, 1000);
    return () => {
      if (container) {
        attachOrDetachEventListeners(
          container,
          false,
          false,
          chartTooltipId,
          mainChartData?.tooltip_legends as TooltipLegends | undefined
        );
      }
      clearTimeout(timeoutId);
    };
  }, [showTooltip, mainChartData, platform, chartTooltipId, chartContainerRef]);
}

function getMainChartDims(
  main_chart: CompanySectionMainChart['data']['main_chart'],
  dimensions: ChartDimensions | null
) {
  const w = (dimensions && dimensions.width) || 1200;
  const h = Math.round(w * 0.7);
  const isMobile = dimensions && dimensions.platform === 'mobile';
  const enabled = Boolean(main_chart && main_chart.static_svg_file && dimensions !== null);
  return { w, h, isMobile, enabled };
}

function getMainChartParamsObject(main_chart: CompanySectionMainChart['data']['main_chart']) {
  const p = main_chart && main_chart.img_param;
  const sf = main_chart && main_chart.static_svg_file;
  return {
    svg_id: (p && p.id) || '',
    reference: (sf && sf.reference) || '',
    parameters: encodeURI((sf && sf.parameters) || ''),
  };
}

function getMainChartFetchParams(
  main_chart: CompanySectionMainChart['data']['main_chart'],
  mainChartDimensions: ChartDimensions | null
) {
  const dims = getMainChartDims(main_chart, mainChartDimensions);
  const base = getMainChartParamsObject(main_chart);
  return {
    enabled: dims.enabled,
    params: {
      ...base,
      w: dims.w,
      ...(dims.isMobile && { h: dims.h }),
    },
  };
}

function getInsiderChartDims(
  insider_chart: CompanySectionMainChart['data']['insider_chart'],
  dimensions: ChartDimensions | null
) {
  const w = (dimensions && dimensions.width) || 1200;
  const h = (dimensions && dimensions.height) || 140;
  const enabled = Boolean(insider_chart && insider_chart.static_svg_file && dimensions !== null);
  return { w, h, enabled };
}

function getInsiderChartParamsObject(
  insider_chart: CompanySectionMainChart['data']['insider_chart']
) {
  const p = insider_chart && insider_chart.img_param;
  const sf = insider_chart && insider_chart.static_svg_file;
  return {
    svg_id: (p && p.id) || undefined,
    reference: (sf && sf.reference) || '',
    parameters: encodeURI((sf && sf.parameters) || ''),
  };
}

function getInsiderChartFetchParams(
  insider_chart: CompanySectionMainChart['data']['insider_chart'],
  insiderChartDimensions: ChartDimensions | null
) {
  const dims = getInsiderChartDims(insider_chart, insiderChartDimensions);
  const base = getInsiderChartParamsObject(insider_chart);
  return {
    enabled: dims.enabled,
    params: { ...base, w: dims.w, h: dims.h },
  };
}

function useChartSectionFetches(
  main_chart: CompanySectionMainChart['data']['main_chart'],
  insider_chart: CompanySectionMainChart['data']['insider_chart'],
  mainChartDimensions: ChartDimensions | null,
  insiderChartDimensions: ChartDimensions | null
) {
  const mainParams = getMainChartFetchParams(main_chart, mainChartDimensions);
  const insiderParams = getInsiderChartFetchParams(insider_chart, insiderChartDimensions);
  const { data: mainChartData, isLoading: mainChartIsLoading } = useGetStaticContent(
    mainParams.params,
    mainParams.enabled
  );
  const { data: insiderChartData, isLoading: insiderChartIsLoading } = useGetStaticContent(
    insiderParams.params,
    insiderParams.enabled
  );
  return {
    mainChartData,
    mainChartIsLoading,
    insiderChartData,
    insiderChartIsLoading,
  };
}

export function useChartSectionState(company_section_main_chart: CompanySectionMainChart) {
  const platform = usePlatform();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const insiderChartContainerRef = useRef<HTMLDivElement>(null);
  const { main_chart, insider_chart } = company_section_main_chart?.data ?? {};
  const hasInsiderChart = Boolean(insider_chart?.static_svg_file);

  const { mainChartDimensions, insiderChartDimensions } = useChartDimensions(
    chartContainerRef,
    insiderChartContainerRef,
    hasInsiderChart
  );
  const fetches = useChartSectionFetches(
    main_chart,
    insider_chart,
    mainChartDimensions,
    insiderChartDimensions
  );
  const chartTooltipId = main_chart?.img_param?.chart_tooltip_id ?? 1;
  useChartTooltip({
    chartContainerRef,
    showTooltip: Boolean(main_chart?.img_param?.show_tooltip),
    mainChartData: fetches.mainChartData,
    platform,
    chartTooltipId,
  });
  return {
    platform,
    main_chart,
    insider_chart,
    chartContainerRef,
    insiderChartContainerRef,
    mainChartData: fetches.mainChartData,
    mainChartIsLoading: fetches.mainChartIsLoading,
    insiderChartData: fetches.insiderChartData,
    insiderChartIsLoading: fetches.insiderChartIsLoading,
  };
}
