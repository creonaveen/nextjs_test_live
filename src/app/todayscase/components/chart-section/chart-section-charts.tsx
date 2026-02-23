'use client';

import { Card, CardContent } from 'investtech/external-components';
import { Skeleton } from 'investtech/external-components';
import { RefObject } from 'react';

import { MainChart } from '@/lib/types/todays-case';
import { sanitizeSvg } from '@/utils/sanitize-svg';
import { ChartMaximizeWithTrigger } from '@/components/custom-components/chart/chart-maximize-with-trigger';

function MainChartSvgCard({
  rawSvg,
  chartContainerClasses,
}: {
  rawSvg: string;
  chartContainerClasses: string;
}) {
  return (
    <Card className={chartContainerClasses}>
      <CardContent className="p-0">
        <div
          dangerouslySetInnerHTML={{ __html: sanitizeSvg(rawSvg) }}
          id="todays-case-main-chart-svg"
        />
      </CardContent>
    </Card>
  );
}

interface MainChartContentProps {
  showMaximize: boolean;
  title: string;
  enableTooltips: boolean;
  tooltipSetting: number;
  staticContentApiProps: { svg_id: string; reference: string; parameters: string };
  rawSvg: string;
  chartContainerClasses: string;
}

function MainChartContent({
  showMaximize,
  title,
  enableTooltips,
  tooltipSetting,
  staticContentApiProps,
  rawSvg,
  chartContainerClasses,
}: MainChartContentProps) {
  if (showMaximize) {
    return (
      <ChartMaximizeWithTrigger
        title={title}
        enableTooltips={enableTooltips}
        tooltipSetting={tooltipSetting}
        staticContentApiProps={staticContentApiProps}
      >
        <MainChartSvgCard rawSvg={rawSvg} chartContainerClasses={chartContainerClasses} />
      </ChartMaximizeWithTrigger>
    );
  }
  return <MainChartSvgCard rawSvg={rawSvg} chartContainerClasses={chartContainerClasses} />;
}

interface MainChartBlockProps {
  main_chart: MainChart | null | undefined;
  chartContainerRef: RefObject<HTMLDivElement | null>;
  mainChartData: { raw_svg?: string } | undefined;
  mainChartIsLoading: boolean;
  platform: string;
  chartContainerClasses: string;
}

function getShowMaximize(main_chart: MainChart, platform: string): boolean {
  const p = main_chart && main_chart.img_param;
  return Boolean(p && p.chart_maximize && platform === 'desktop');
}

function getMainChartTitle(main_chart: MainChart): string {
  const p = main_chart && main_chart.img_param;
  return (p && p.chart_maximize_title) || (main_chart && main_chart.chart_name) || '';
}

function getMainChartStaticProps(main_chart: MainChart): {
  svg_id: string;
  reference: string;
  parameters: string;
} {
  const p = main_chart && main_chart.img_param;
  const sf = main_chart && main_chart.static_svg_file;
  return {
    svg_id: (p && p.id) || '',
    reference: (sf && sf.reference) || '',
    parameters: encodeURI((sf && sf.parameters) || ''),
  };
}

function getMainChartContentProps(
  main_chart: MainChart,
  mainChartData: { raw_svg?: string } | undefined,
  platform: string,
  chartContainerClasses: string
): MainChartContentProps | null {
  const rawSvg = mainChartData && mainChartData.raw_svg;
  if (!rawSvg) return null;
  const p = main_chart && main_chart.img_param;
  return {
    showMaximize: getShowMaximize(main_chart, platform),
    title: getMainChartTitle(main_chart),
    enableTooltips: Boolean(p && p.show_tooltip),
    tooltipSetting: (p && p.chart_tooltip_id) || 1,
    staticContentApiProps: getMainChartStaticProps(main_chart),
    rawSvg,
    chartContainerClasses,
  };
}

export function MainChartBlock({
  main_chart,
  chartContainerRef,
  mainChartData,
  mainChartIsLoading,
  platform,
  chartContainerClasses,
}: MainChartBlockProps) {
  if (!main_chart) return null;
  const contentProps = getMainChartContentProps(
    main_chart,
    mainChartData,
    platform,
    chartContainerClasses
  );
  return (
    <div
      className="relative"
      ref={chartContainerRef}
      data-chart-info="2"
      data-chartid={main_chart?.img_param?.id}
      id="todays-case-main-chart-container"
    >
      {mainChartIsLoading ? (
        <Skeleton className="h-[200px] w-full rounded-lg md:h-[500px]" />
      ) : contentProps ? (
        <MainChartContent {...contentProps} />
      ) : null}
    </div>
  );
}

interface InsiderChartBlockProps {
  insider_chart: { caption?: string; static_svg_file?: unknown } | null | undefined;
  insiderChartContainerRef: RefObject<HTMLDivElement | null>;
  insiderChartData: { raw_svg?: string } | undefined;
  insiderChartIsLoading: boolean;
  chartContainerClasses: string;
  captionClasses: string;
}

export function InsiderChartBlock({
  insider_chart,
  insiderChartContainerRef,
  insiderChartData,
  insiderChartIsLoading,
  chartContainerClasses,
  captionClasses,
}: InsiderChartBlockProps) {
  if (!insider_chart) return null;
  return (
    <>
      <div
        className="relative"
        ref={insiderChartContainerRef}
        id="todays-case-insider-chart-container"
      >
        {insiderChartIsLoading ? (
          <Skeleton className="h-[100px] w-full rounded-lg md:h-[140px]" />
        ) : (
          <Card className={chartContainerClasses}>
            <CardContent className="p-0">
              {insiderChartData?.raw_svg && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizeSvg(insiderChartData.raw_svg),
                  }}
                  id="todays-case-insider-chart-svg"
                />
              )}
            </CardContent>
          </Card>
        )}
      </div>
      <div
        className="flex items-center justify-between"
        id="todays-case-insider-chart-caption-section"
      >
        <div id="todays-case-insider-chart-caption-wrapper">
          <p className={captionClasses} id="todays-case-insider-chart-caption">
            {insider_chart?.caption ?? ''}
          </p>
        </div>
      </div>
    </>
  );
}
