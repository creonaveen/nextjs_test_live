'use client';

import { Card, CardContent } from 'investtech/external-components';
import { Skeleton } from 'investtech/external-components';

import { ChartMaximizeWithTrigger } from '@/components/custom-components/chart/chart-maximize-with-trigger';
import { MainChart } from '@/lib/types/company';
import { sanitizeSvg } from '@/utils/sanitize-svg';

import type { CompanySectionMainChart } from '@/lib/types/company';

export interface MainChartSvgBlockProps {
  chartContainerRef: React.RefObject<HTMLDivElement | null>;
  main_chart: MainChart;
  companyId: string;
  platform: 'mobile' | 'desktop';
  userSettingsStore: { update_info?: { chart_tooltip_id?: number } } | null;
  updatedMainChartParam: string | undefined;
  currentTooltipSetting: number | undefined;
  mainChartData: { raw_svg?: string } | undefined;
  mainChartIsLoading: boolean;
  chartContainerClasses: string;
  labelsAndTexts: CompanySectionMainChart['labels_and_texts'];
}

const MAIN_CHART_WRAPPER_CLASS = 'relative mb-3 sm:mb-4 md:mb-6';
const MAIN_CHART_WRAPPER_ATTRS = {
  'data-chart-info': '2',
  'data-chartid': 'ajaxChartIdMainChart',
  id: 'main-chart-container',
};

function MainChartSvgBlockLoading({
  chartContainerRef,
}: Pick<MainChartSvgBlockProps, 'chartContainerRef'>) {
  return (
    <div className={MAIN_CHART_WRAPPER_CLASS} ref={chartContainerRef} {...MAIN_CHART_WRAPPER_ATTRS}>
      <Skeleton className="h-[200px] w-full rounded-lg md:h-[500px]" />
    </div>
  );
}

function getMaximizeApiProps(props: MainChartSvgBlockProps) {
  const tooltipId =
    props.userSettingsStore?.update_info?.chart_tooltip_id ??
    props.main_chart.img_param.chart_tooltip_id ??
    1;
  return {
    svg_id: props.main_chart.img_param.id,
    company_id: props.companyId,
    chart_param: props.updatedMainChartParam ?? props.main_chart.chart_param,
    chart_tooltip_id: tooltipId,
    show_image_border: props.main_chart.img_param.show_image_border ? 1 : 0,
  };
}

function MainChartSvgBlockMaximize(props: MainChartSvgBlockProps) {
  const apiProps = getMaximizeApiProps(props);
  const ariaLabel =
    props.main_chart.img_param.chart_maximize_title ??
    props.labelsAndTexts.module_title ??
    'Main chart';
  return (
    <div
      className={MAIN_CHART_WRAPPER_CLASS}
      ref={props.chartContainerRef}
      {...MAIN_CHART_WRAPPER_ATTRS}
    >
      <ChartMaximizeWithTrigger
        title={props.main_chart.img_param.chart_maximize_title ?? ''}
        tooltipSetting={props.currentTooltipSetting}
        apiProps={apiProps}
      >
        <Card className={props.chartContainerClasses} onContextMenu={(e) => e.preventDefault()}>
          <CardContent className="p-0">
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeSvg(props.mainChartData?.raw_svg ?? ''),
              }}
              role="img"
              aria-label={ariaLabel}
            />
          </CardContent>
        </Card>
      </ChartMaximizeWithTrigger>
    </div>
  );
}

function MainChartSvgBlockSimple(props: MainChartSvgBlockProps) {
  return (
    <div
      className={MAIN_CHART_WRAPPER_CLASS}
      ref={props.chartContainerRef}
      {...MAIN_CHART_WRAPPER_ATTRS}
    >
      <Card
        className={`${props.chartContainerClasses} chart-no-longpress`}
        onContextMenu={(e) => e.preventDefault()}
      >
        <CardContent className="p-0">
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeSvg(props.mainChartData?.raw_svg ?? ''),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function MainChartSvgBlock(props: MainChartSvgBlockProps) {
  if (props.mainChartIsLoading) {
    return <MainChartSvgBlockLoading chartContainerRef={props.chartContainerRef} />;
  }
  if (props.main_chart.img_param.chart_maximize && props.platform === 'desktop') {
    return <MainChartSvgBlockMaximize {...props} />;
  }
  return <MainChartSvgBlockSimple {...props} />;
}

export interface RsiChartBlockProps {
  rsiChartContainerRef: React.RefObject<HTMLDivElement | null>;
  rsiChartData: { raw_svg?: string } | undefined;
  rsiChartIsLoading: boolean;
  chartContainerClasses: string;
}

export function RsiChartBlock({
  rsiChartContainerRef,
  rsiChartData,
  rsiChartIsLoading,
  chartContainerClasses,
}: RsiChartBlockProps) {
  if (rsiChartIsLoading) {
    return (
      <div ref={rsiChartContainerRef} className="mb-2 md:mb-0" id="rsi-chart-container">
        <Skeleton className="h-[100px] w-full rounded-lg md:h-[140px]" />
      </div>
    );
  }
  return (
    <div ref={rsiChartContainerRef} className="mb-2 md:mb-0" id="rsi-chart-container">
      <Card className={chartContainerClasses}>
        <CardContent className="p-0">
          <div
            dangerouslySetInnerHTML={{ __html: sanitizeSvg(rsiChartData?.raw_svg ?? '') }}
            role="img"
            aria-label="RSI chart"
          />
        </CardContent>
      </Card>
    </div>
  );
}
