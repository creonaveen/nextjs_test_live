'use client';

import { useEffect, useRef, useState } from 'react';

import { ChartDimensions, observeChartResize } from '@/utils/chart-dimensions';

import { createUpdatedChartParam } from './main-chart-section-utils';

import type { UserSettingsData } from '@/lib/types/user-settings';

export interface MainChartSectionState {
  chartContainerRef: React.RefObject<HTMLDivElement | null>;
  rsiChartContainerRef: React.RefObject<HTMLDivElement | null>;
  userSettingsStore: UserSettingsData | null;
  setUserSettingsStore: React.Dispatch<React.SetStateAction<UserSettingsData | null>>;
  selectedTimeSpan: number | undefined;
  setSelectedTimeSpan: React.Dispatch<React.SetStateAction<number | undefined>>;
  toggledIndicatorId: number | undefined;
  setToggledIndicatorId: React.Dispatch<React.SetStateAction<number | undefined>>;
  currentTooltipSetting: number | undefined;
  setCurrentTooltipSetting: React.Dispatch<React.SetStateAction<number | undefined>>;
  updatedMainChartParam: string | undefined;
  setUpdatedMainChartParam: React.Dispatch<React.SetStateAction<string | undefined>>;
  mainChartDimensions: ChartDimensions | null;
  setMainChartDimensions: React.Dispatch<React.SetStateAction<ChartDimensions | null>>;
  rsiChartDimensions: ChartDimensions | null;
  setRsiChartDimensions: React.Dispatch<React.SetStateAction<ChartDimensions | null>>;
  prevTooltipRef: React.MutableRefObject<number | undefined>;
}

export function useMainChartSectionState(): MainChartSectionState {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const rsiChartContainerRef = useRef<HTMLDivElement>(null);
  const prevTooltipRef = useRef<number | undefined>(undefined);

  const [userSettingsStore, setUserSettingsStore] = useState<UserSettingsData | null>(null);
  const [selectedTimeSpan, setSelectedTimeSpan] = useState<number | undefined>(undefined);
  const [toggledIndicatorId, setToggledIndicatorId] = useState<number | undefined>(undefined);
  const [currentTooltipSetting, setCurrentTooltipSetting] = useState<number | undefined>(undefined);
  const [updatedMainChartParam, setUpdatedMainChartParam] = useState<string | undefined>(undefined);
  const [mainChartDimensions, setMainChartDimensions] = useState<ChartDimensions | null>(null);
  const [rsiChartDimensions, setRsiChartDimensions] = useState<ChartDimensions | null>(null);

  return {
    chartContainerRef,
    rsiChartContainerRef,
    userSettingsStore,
    setUserSettingsStore,
    selectedTimeSpan,
    setSelectedTimeSpan,
    toggledIndicatorId,
    setToggledIndicatorId,
    currentTooltipSetting,
    setCurrentTooltipSetting,
    updatedMainChartParam,
    setUpdatedMainChartParam,
    mainChartDimensions,
    setMainChartDimensions,
    rsiChartDimensions,
    setRsiChartDimensions,
    prevTooltipRef,
  };
}

interface DimensionsEffectsParams {
  chartContainerRef: React.RefObject<HTMLDivElement | null>;
  rsiChartContainerRef: React.RefObject<HTMLDivElement | null>;
  setMainChartDimensions: React.Dispatch<React.SetStateAction<ChartDimensions | null>>;
  setRsiChartDimensions: React.Dispatch<React.SetStateAction<ChartDimensions | null>>;
  rsiActive: boolean;
}

export function useMainChartDimensionsEffects(params: DimensionsEffectsParams): void {
  const {
    chartContainerRef,
    rsiChartContainerRef,
    setMainChartDimensions,
    setRsiChartDimensions,
    rsiActive,
  } = params;
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const cleanup = observeChartResize(
      chartContainerRef.current,
      (dimensions) => setMainChartDimensions(dimensions),
      {
        defaultWidth: 1200,
        defaultHeight: 500,
        aspectRatio: 2.4,
        maxWidth: 1920,
        maxHeight: 800,
        minWidth: 320,
        minHeight: 200,
        debounceMs: 500,
      }
    );
    return cleanup;
  }, [chartContainerRef, setMainChartDimensions]);

  useEffect(() => {
    if (!rsiChartContainerRef.current || !rsiActive) return;
    const cleanup = observeChartResize(
      rsiChartContainerRef.current,
      (dimensions) => setRsiChartDimensions(dimensions),
      {
        defaultWidth: 1200,
        defaultHeight: 140,
        aspectRatio: 8.57,
        maxWidth: 1920,
        maxHeight: 200,
        minWidth: 320,
        minHeight: 100,
        debounceMs: 500,
      }
    );
    return cleanup;
  }, [rsiChartContainerRef, setRsiChartDimensions, rsiActive]);
}

interface InitUserSettingsParams {
  userSettingsData: UserSettingsData | undefined;
  mainChartTooltipId: number;
  setUserSettingsStore: React.Dispatch<React.SetStateAction<UserSettingsData | null>>;
  setSelectedTimeSpan: React.Dispatch<React.SetStateAction<number | undefined>>;
  setCurrentTooltipSetting: React.Dispatch<React.SetStateAction<number | undefined>>;
  prevTooltipRef: React.MutableRefObject<number | undefined>;
}

export function useInitUserSettingsEffect(params: InitUserSettingsParams): void {
  const {
    userSettingsData,
    mainChartTooltipId,
    setUserSettingsStore,
    setSelectedTimeSpan,
    setCurrentTooltipSetting,
    prevTooltipRef,
  } = params;
  useEffect(() => {
    if (!userSettingsData) return;
    setUserSettingsStore(userSettingsData);
    setSelectedTimeSpan(userSettingsData.main_chart_settings.current_product);
    if (prevTooltipRef.current === undefined) {
      const initialTooltip = +(
        userSettingsData?.update_info?.chart_tooltip_id ??
        mainChartTooltipId ??
        1
      );
      setCurrentTooltipSetting(initialTooltip);
      prevTooltipRef.current = initialTooltip;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run only when userSettingsData loads
  }, [userSettingsData]);
}

export function useTimeSpanRefreshEffect(
  selectedTimeSpan: number | undefined,
  userSettingsIsLoading: boolean,
  userSettingsIsSuccess: boolean,
  onRefreshData: ((selectedProduct?: number) => Promise<void>) | undefined
): void {
  useEffect(() => {
    if (
      selectedTimeSpan === undefined ||
      userSettingsIsLoading ||
      !userSettingsIsSuccess ||
      !onRefreshData
    ) {
      return;
    }
    const timeoutId = setTimeout(() => void onRefreshData(selectedTimeSpan), 100);
    return () => clearTimeout(timeoutId);
  }, [selectedTimeSpan, userSettingsIsLoading, userSettingsIsSuccess, onRefreshData]);
}

export function useTooltipTrackEffect(
  currentTooltipSetting: number | undefined,
  userSettingsIsLoading: boolean,
  userSettingsIsSuccess: boolean,
  prevTooltipRef: React.MutableRefObject<number | undefined>
): void {
  useEffect(() => {
    if (
      currentTooltipSetting === undefined ||
      prevTooltipRef.current === undefined ||
      currentTooltipSetting === prevTooltipRef.current ||
      userSettingsIsLoading ||
      !userSettingsIsSuccess
    ) {
      return;
    }
    prevTooltipRef.current = currentTooltipSetting;
  }, [currentTooltipSetting, userSettingsIsLoading, userSettingsIsSuccess, prevTooltipRef]);
}

export function useIndicator89Effect(
  toggledIndicatorId: number | undefined,
  onRefreshData: (() => Promise<void>) | undefined
): void {
  useEffect(() => {
    if (
      !toggledIndicatorId ||
      (toggledIndicatorId !== -89 && toggledIndicatorId !== 89) ||
      !onRefreshData
    ) {
      return;
    }
    const t = setTimeout(() => void onRefreshData(), 100);
    return () => clearTimeout(t);
  }, [toggledIndicatorId, onRefreshData]);
}

interface OtherIndicatorsParams {
  toggledIndicatorId: number | undefined;
  userSettingsStore: UserSettingsData | null;
  userSettingsIsLoading: boolean;
  userSettingsIsSuccess: boolean;
  mainChartParam: string;
  setUpdatedMainChartParam: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function useOtherIndicatorsEffect(params: OtherIndicatorsParams): void {
  const {
    toggledIndicatorId,
    userSettingsStore,
    userSettingsIsLoading,
    userSettingsIsSuccess,
    mainChartParam,
    setUpdatedMainChartParam,
  } = params;
  useEffect(() => {
    if (
      !toggledIndicatorId ||
      toggledIndicatorId === -89 ||
      toggledIndicatorId === 89 ||
      !userSettingsStore ||
      userSettingsIsLoading ||
      !userSettingsIsSuccess
    ) {
      return;
    }
    const selected = userSettingsStore.main_chart_settings.chart_indicators.selected;
    const selectedIndicators = Array.isArray(selected) ? selected : [];
    const product = userSettingsStore.main_chart_settings.current_product?.toString() ?? '';
    setUpdatedMainChartParam(createUpdatedChartParam(mainChartParam, product, selectedIndicators));
  }, [
    toggledIndicatorId,
    userSettingsStore,
    userSettingsIsLoading,
    userSettingsIsSuccess,
    mainChartParam,
    setUpdatedMainChartParam,
  ]);
}

export function useResetOnRefetchEffect(
  mainChartParam: string,
  isRefetching: boolean | undefined,
  setUpdatedMainChartParam: React.Dispatch<React.SetStateAction<string | undefined>>,
  setToggledIndicatorId: React.Dispatch<React.SetStateAction<number | undefined>>
): void {
  useEffect(() => {
    if (!isRefetching) {
      setUpdatedMainChartParam(undefined);
      setToggledIndicatorId(undefined);
    }
  }, [mainChartParam, isRefetching, setUpdatedMainChartParam, setToggledIndicatorId]);
}
