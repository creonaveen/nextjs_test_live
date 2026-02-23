'use client';

import { useParams } from 'next/navigation';

import { configuration } from '@/environment/configuration';
import { usePlatform } from '@/lib/platform';
import { Chart, CompanySectionMainChart, MainChart, TechnicalComment } from '@/lib/types/company';
import { getLanguageFromStorage } from '@/lib/utils';
import { useGetSvgData } from '@/store/api-service/svg-api-service';
import { useGetUserSettingsData } from '@/store/api-service/user-settings-api-service';
import { useMainChartSectionState } from './main-chart-section-effects';
import { useMainChartSectionAllEffects } from './main-chart-section-all-effects';
import { buildTimeSpanOptions } from './main-chart-section-utils';

export interface MainChartSectionProps {
  chartSectionData: CompanySectionMainChart;
  onRefreshData?: (selectedProduct?: number) => Promise<void>;
  isRefetching?: boolean;
}

export interface UseMainChartSectionReturn {
  companyId: string;
  platform: 'mobile' | 'desktop';
  main_chart: MainChart;
  rsi_chart: Chart;
  technical_comment: TechnicalComment;
  labelsAndTexts: CompanySectionMainChart['labels_and_texts'];
  chartContainerRef: React.RefObject<HTMLDivElement | null>;
  rsiChartContainerRef: React.RefObject<HTMLDivElement | null>;
  userSettingsStore: ReturnType<typeof useMainChartSectionState>['userSettingsStore'];
  selectedTimeSpan: number | undefined;
  timeSpanOptions: Array<{ value: string; label: string; id: string }>;
  currentTooltipSetting: number | undefined;
  updatedMainChartParam: string | undefined;
  mainChartData: { raw_svg?: string; tooltip_legends?: unknown } | undefined;
  mainChartIsLoading: boolean;
  rsiChartData: { raw_svg?: string } | undefined;
  rsiChartIsLoading: boolean;
  chartContainerClasses: string;
  isRefetching: boolean | undefined;
  handleTimeSpanChange: (value: string) => void;
  handleIndicatorToggle: (indicatorId: number) => void;
  handleTooltipChange: (tooltipSetting: number) => void;
}

interface SvgQueriesParams {
  companyId: string;
  platform: 'mobile' | 'desktop';
  language: string;
  main_chart: MainChart;
  rsi_chart: Chart;
  state: ReturnType<typeof useMainChartSectionState>;
}

function getMainChartTooltipId(params: SvgQueriesParams): number {
  const store = params.state.userSettingsStore?.update_info?.chart_tooltip_id;
  const fallback = params.main_chart.img_param.chart_tooltip_id ?? 1;
  return store ?? fallback;
}

function getMainChartShowBorder(main_chart: MainChart): 0 | 1 {
  return main_chart.img_param.show_image_border ? 1 : 0;
}

function buildMainChartSvgPayload(params: SvgQueriesParams) {
  const { companyId, platform, language, main_chart, state } = params;
  const dims = state.mainChartDimensions;
  const mainW = dims?.width ?? 1200;
  const tooltipId = getMainChartTooltipId(params);
  const extra = dims?.platform === 'mobile' ? { h: Math.round(mainW * 0.7) } : {};
  const chartMaximize = platform === 'desktop' && main_chart.img_param.chart_maximize ? 1 : 0;
  const chartParam = state.updatedMainChartParam ?? main_chart.chart_param;
  return {
    svg_id: main_chart.img_param.id,
    company_id: companyId,
    chart_param: encodeURI(chartParam),
    chart_tooltip_id: tooltipId,
    show_image_border: getMainChartShowBorder(main_chart),
    chart_maximize: chartMaximize,
    w: mainW,
    ...extra,
    lang: language,
  };
}

function useMainChartSvgQuery(params: SvgQueriesParams) {
  const fetchMain = params.state.mainChartDimensions !== null;
  const mainPayload = buildMainChartSvgPayload(params);
  const { data: mainChartData, isLoading: mainChartIsLoading } = useGetSvgData(
    mainPayload,
    fetchMain
  );
  return { mainChartData, mainChartIsLoading };
}

function useRsiChartSvgQuery(params: SvgQueriesParams) {
  const { language, rsi_chart, state } = params;
  const rsiDims = state.rsiChartDimensions;
  const fetchRsi = rsi_chart.active && rsiDims !== null;
  const rsiPayload = {
    svg_id: rsi_chart.img_param?.id ?? undefined,
    w: rsiDims?.width ?? 1200,
    h: rsiDims?.height ?? 140,
    chart_param: encodeURI(rsi_chart.chart_param),
    lang: language,
  };
  const { data: rsiChartData, isLoading: rsiChartIsLoading } = useGetSvgData(rsiPayload, fetchRsi);
  return { rsiChartData, rsiChartIsLoading };
}

const CHART_CONTAINER_CLASSES =
  'bg-card dark:bg-chart-background overflow-hidden p-0 rounded-none sm:rounded-sm md:rounded-md dark:rounded-none dark:sm:rounded-md dark:md:rounded-md dark:lg:rounded-xl';

interface QueriesAndEffectsParams {
  state: ReturnType<typeof useMainChartSectionState>;
  companyId: string;
  platform: 'mobile' | 'desktop';
  language: string;
  main_chart: MainChart;
  rsi_chart: Chart;
  onRefreshData: MainChartSectionProps['onRefreshData'];
  isRefetching: boolean | undefined;
}

function useMainChartSectionQueriesAndEffects(params: QueriesAndEffectsParams) {
  const {
    state,
    companyId,
    platform,
    language,
    main_chart,
    rsi_chart,
    onRefreshData,
    isRefetching,
  } = params;
  const {
    data: userSettingsData,
    isLoading: userSettingsIsLoading,
    isSuccess: userSettingsIsSuccess,
  } = useGetUserSettingsData({
    company_id: companyId,
    indicator_update: state.toggledIndicatorId,
    product: state.selectedTimeSpan,
    chart_tooltip_id: state.currentTooltipSetting,
    lang: language,
  });
  const svgParams: SvgQueriesParams = {
    companyId,
    platform,
    language,
    main_chart,
    rsi_chart,
    state,
  };
  const { mainChartData, mainChartIsLoading } = useMainChartSvgQuery(svgParams);
  const { rsiChartData, rsiChartIsLoading } = useRsiChartSvgQuery(svgParams);
  useMainChartSectionAllEffects({
    state,
    main_chart,
    rsi_chart,
    userSettingsData: userSettingsData ?? undefined,
    userSettingsIsLoading,
    userSettingsIsSuccess,
    mainChartData,
    onRefreshData,
    isRefetching,
  });
  return { mainChartData, mainChartIsLoading, rsiChartData, rsiChartIsLoading };
}

function buildSectionReturn(
  state: ReturnType<typeof useMainChartSectionState>,
  data: {
    companyId: string;
    platform: 'mobile' | 'desktop';
    main_chart: MainChart;
    rsi_chart: Chart;
    technical_comment: TechnicalComment;
    labelsAndTexts: CompanySectionMainChart['labels_and_texts'];
    mainChartData: { raw_svg?: string; tooltip_legends?: unknown } | undefined;
    mainChartIsLoading: boolean;
    rsiChartData: { raw_svg?: string } | undefined;
    rsiChartIsLoading: boolean;
    isRefetching: boolean | undefined;
  }
): UseMainChartSectionReturn {
  return {
    ...data,
    chartContainerRef: state.chartContainerRef,
    rsiChartContainerRef: state.rsiChartContainerRef,
    userSettingsStore: state.userSettingsStore,
    selectedTimeSpan: state.selectedTimeSpan,
    timeSpanOptions: buildTimeSpanOptions(state.userSettingsStore),
    currentTooltipSetting: state.currentTooltipSetting,
    updatedMainChartParam: state.updatedMainChartParam,
    chartContainerClasses: CHART_CONTAINER_CLASSES,
    handleTimeSpanChange: (v: string) => state.setSelectedTimeSpan(parseInt(v)),
    handleIndicatorToggle: (id: number) => state.setToggledIndicatorId(id),
    handleTooltipChange: (tooltipSetting: number) => state.setCurrentTooltipSetting(tooltipSetting),
  };
}

export function useMainChartSection({
  chartSectionData,
  onRefreshData,
  isRefetching,
}: MainChartSectionProps): UseMainChartSectionReturn {
  const companyId = (useParams() as { id: string }).id,
    platform = usePlatform() as 'mobile' | 'desktop';
  const language = getLanguageFromStorage() ?? configuration?.DEFAULT_LANGUAGE;
  const { main_chart, rsi_chart, technical_comment } = chartSectionData.data;
  const labelsAndTexts = chartSectionData.labels_and_texts;
  const state = useMainChartSectionState();
  const { mainChartData, mainChartIsLoading, rsiChartData, rsiChartIsLoading } =
    useMainChartSectionQueriesAndEffects({
      state,
      companyId,
      platform,
      language,
      main_chart,
      rsi_chart,
      onRefreshData,
      isRefetching,
    });
  return buildSectionReturn(state, {
    companyId,
    platform,
    main_chart,
    rsi_chart,
    technical_comment,
    labelsAndTexts,
    mainChartData,
    mainChartIsLoading,
    rsiChartData,
    rsiChartIsLoading,
    isRefetching,
  });
}
