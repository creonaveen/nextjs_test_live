'use client';

import { useEffect } from 'react';

import type { UserSettingsData } from '@/lib/types/user-settings';

import { setupMainChartTooltips } from './main-chart-section-utils';
import {
  useMainChartDimensionsEffects,
  useInitUserSettingsEffect,
  useTimeSpanRefreshEffect,
  useTooltipTrackEffect,
  useIndicator89Effect,
  useOtherIndicatorsEffect,
  useResetOnRefetchEffect,
  type MainChartSectionState,
} from './main-chart-section-effects';

export interface AllEffectsParams {
  state: MainChartSectionState;
  main_chart: { chart_param: string; img_param: { chart_tooltip_id?: number } };
  rsi_chart: { active: boolean };
  userSettingsData: UserSettingsData | undefined;
  userSettingsIsLoading: boolean;
  userSettingsIsSuccess: boolean;
  mainChartData: { raw_svg?: string; tooltip_legends?: unknown } | null | undefined;
  onRefreshData: ((selectedProduct?: number) => Promise<void>) | undefined;
  isRefetching: boolean | undefined;
}

function useDimensionAndInitEffects(
  state: MainChartSectionState,
  main_chart: AllEffectsParams['main_chart'],
  rsi_chart: AllEffectsParams['rsi_chart'],
  userSettingsData: UserSettingsData | undefined
): void {
  const mainChartTooltipId =
    userSettingsData?.update_info?.chart_tooltip_id ?? main_chart.img_param.chart_tooltip_id ?? 1;
  useMainChartDimensionsEffects({
    chartContainerRef: state.chartContainerRef,
    rsiChartContainerRef: state.rsiChartContainerRef,
    setMainChartDimensions: state.setMainChartDimensions,
    setRsiChartDimensions: state.setRsiChartDimensions,
    rsiActive: rsi_chart.active,
  });
  useInitUserSettingsEffect({
    userSettingsData: userSettingsData ?? undefined,
    mainChartTooltipId,
    setUserSettingsStore: state.setUserSettingsStore,
    setSelectedTimeSpan: state.setSelectedTimeSpan,
    setCurrentTooltipSetting: state.setCurrentTooltipSetting,
    prevTooltipRef: state.prevTooltipRef,
  });
}

interface SyncAndTooltipParams {
  state: MainChartSectionState;
  main_chart: AllEffectsParams['main_chart'];
  userSettingsIsLoading: boolean;
  userSettingsIsSuccess: boolean;
  mainChartData: AllEffectsParams['mainChartData'];
  onRefreshData: AllEffectsParams['onRefreshData'];
  isRefetching: boolean | undefined;
}

function useSyncAndTooltipEffects(p: SyncAndTooltipParams): void {
  const {
    state,
    main_chart,
    userSettingsIsLoading,
    userSettingsIsSuccess,
    mainChartData,
    onRefreshData,
    isRefetching,
  } = p;
  useTimeSpanRefreshEffect(
    state.selectedTimeSpan,
    userSettingsIsLoading,
    userSettingsIsSuccess,
    onRefreshData
  );
  useTooltipTrackEffect(
    state.currentTooltipSetting,
    userSettingsIsLoading,
    userSettingsIsSuccess,
    state.prevTooltipRef
  );
  useIndicator89Effect(state.toggledIndicatorId, onRefreshData);
  useOtherIndicatorsEffect({
    toggledIndicatorId: state.toggledIndicatorId,
    userSettingsStore: state.userSettingsStore,
    userSettingsIsLoading,
    userSettingsIsSuccess,
    mainChartParam: main_chart.chart_param,
    setUpdatedMainChartParam: state.setUpdatedMainChartParam,
  });
  useResetOnRefetchEffect(
    main_chart.chart_param,
    isRefetching,
    state.setUpdatedMainChartParam,
    state.setToggledIndicatorId
  );
  useMainChartTooltipSetup(state.chartContainerRef, mainChartData, state.currentTooltipSetting);
}

function useMainChartTooltipSetup(
  chartContainerRef: React.RefObject<HTMLDivElement | null>,
  mainChartData: AllEffectsParams['mainChartData'],
  currentTooltipSetting: number | undefined
): void {
  useEffect(() => {
    if (!mainChartData?.raw_svg) return;
    const cleanup = setupMainChartTooltips(
      chartContainerRef,
      mainChartData,
      currentTooltipSetting ?? 0
    );
    return cleanup;
  }, [chartContainerRef, mainChartData, currentTooltipSetting]);
}

export function useMainChartSectionAllEffects(params: AllEffectsParams): void {
  const {
    state,
    main_chart,
    rsi_chart,
    userSettingsData,
    userSettingsIsLoading,
    userSettingsIsSuccess,
    mainChartData,
    onRefreshData,
    isRefetching,
  } = params;
  useDimensionAndInitEffects(state, main_chart, rsi_chart, userSettingsData ?? undefined);
  useSyncAndTooltipEffects({
    state,
    main_chart,
    userSettingsIsLoading,
    userSettingsIsSuccess,
    mainChartData,
    onRefreshData,
    isRefetching,
  });
}
