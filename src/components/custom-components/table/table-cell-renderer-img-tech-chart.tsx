'use client';

import { Link } from '@/components/link';
import React from 'react';

import type { ChartApiProps } from '@/components/chart-maximize-utils';
import SvgRenderer from '@/components/custom-components/svg-renderer';
import { isImgTechChartStructValue } from '@/table-utils/table-cell-value-guards';
import { getImgTechChartSizeConfig } from '@/table-utils/table-datatypes';

import { ChartMaximizeWithTrigger } from '../chart/chart-maximize-with-trigger';

import type { CellRendererContext } from './table-cell-renderers';

type ImgTechChartValue = Parameters<typeof isImgTechChartStructValue>[0] & {
  img_param?: Record<string, unknown>;
  url?: string;
  alt_text?: string;
  chart_param?: string;
  size?: string;
};

function safeNum(v: unknown): number | undefined {
  if (v == null) return undefined;
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
}

function parseImgTechChartParams(value: ImgTechChartValue): {
  chartSizeConfig: ReturnType<typeof getImgTechChartSizeConfig>;
  showImageBorder: number | undefined;
  chartTooltipId: number;
  chartMaximize: number;
  hasUrl: boolean;
  alt_text: string;
  chart_param: string | undefined;
  url: string | undefined;
  containerClassName: string;
} {
  const imgParam = value.img_param ?? {};
  const showImageBorder = safeNum(imgParam.show_image_border);
  const chartTooltipId = safeNum(imgParam.chart_tooltip_id) ?? 0;
  const chartMaximize = safeNum(imgParam.chart_maximize) ?? 0;
  const chartSizeConfig = getImgTechChartSizeConfig(value.size);
  const hasUrl = value.url != null && typeof value.url === 'string' && value.url.trim().length > 0;
  return {
    chartSizeConfig,
    showImageBorder,
    chartTooltipId,
    chartMaximize,
    hasUrl,
    alt_text: value.alt_text ?? 'Chart',
    chart_param: value.chart_param,
    url: hasUrl ? (value.url as string) : undefined,
    containerClassName: chartSizeConfig.containerClassName,
  };
}

function buildSvgRendererProps(
  value: ImgTechChartValue,
  params: ReturnType<typeof parseImgTechChartParams>
): React.ComponentProps<typeof SvgRenderer> {
  return {
    alt: params.alt_text,
    chart_params: value.chart_param,
    show_image_border: params.showImageBorder,
    chart_tooltip_id: params.chartTooltipId,
    chart_maximize: params.chartMaximize === 1 ? 1 : 0,
    enableResponsive: false,
    containerWidth: params.chartSizeConfig.defaultWidth,
    className: 'h-full w-full',
  };
}

function buildChartApiProps(params: ReturnType<typeof parseImgTechChartParams>): ChartApiProps {
  const base: ChartApiProps = {
    chart_param: params.chart_param ?? '',
    chart_tooltip_id: params.chartTooltipId,
  };
  if (params.showImageBorder !== undefined) {
    base.show_image_border = params.showImageBorder;
  }
  return base;
}

export function img_tech_chart_struct(ctx: CellRendererContext): React.ReactNode | null {
  const { value } = ctx;
  if (!value || typeof value !== 'object' || !isImgTechChartStructValue(value)) {
    return null;
  }
  const val = value as ImgTechChartValue;
  const params = parseImgTechChartParams(val);
  const svgRendererProps = buildSvgRendererProps(val, params);
  const chartContent = <SvgRenderer {...svgRendererProps} />;
  const apiProps = buildChartApiProps(params);

  const tooltipSetting = params.chartTooltipId > 0 ? 2 : 0;
  const wrappedContent =
    params.chartMaximize === 1 ? (
      <ChartMaximizeWithTrigger
        title={params.alt_text}
        tooltipSetting={tooltipSetting}
        apiProps={apiProps}
      >
        {chartContent}
      </ChartMaximizeWithTrigger>
    ) : params.hasUrl && params.url ? (
      <Link href={params.url} className="block h-full w-full" title={params.alt_text}>
        {chartContent}
      </Link>
    ) : (
      chartContent
    );

  return <div className={params.containerClassName}>{wrappedContent}</div>;
}

/** Renders img_tech_chart_struct when value is missing (placeholder). */
export function renderChartPlaceholder(ctx: CellRendererContext): React.ReactNode {
  const { value } = ctx;
  if (!value || typeof value !== 'object' || !isImgTechChartStructValue(value)) return null;
  return (
    <span className="text-muted-foreground text-xs">
      {(value as { alt_text?: string }).alt_text ?? 'Chart'}
    </span>
  );
}
