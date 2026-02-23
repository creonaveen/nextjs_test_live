import type { RefObject } from 'react';

import type { TooltipLegends } from '@/lib/types/svg';
import type { UserSettingsData } from '@/lib/types/user-settings';
import { attachOrDetachEventListeners } from '@/utils/main-chart-tooltip';

interface TooltipSetupChartData {
  tooltip_legends?: TooltipLegends | unknown;
}

/**
 * Sets up tooltip listeners on the main chart container (with retry until SVG is in DOM)
 * and returns a cleanup function.
 */
export function setupMainChartTooltips(
  containerRef: RefObject<HTMLDivElement | null>,
  mainChartData: TooltipSetupChartData | null | undefined,
  currentTooltipSetting: number
): (() => void) | undefined {
  if (!mainChartData) return undefined;

  let retryTimeoutId: ReturnType<typeof setTimeout> | null = null;
  let setupTimeoutId: ReturnType<typeof setTimeout> | null = null;
  const containerEl = containerRef.current;
  const tooltipSetting = currentTooltipSetting ?? 0;
  const legends = mainChartData?.tooltip_legends as TooltipLegends | undefined;

  const runSetup = () => {
    if (!containerRef.current) {
      setupTimeoutId = setTimeout(runSetup, 500);
      return;
    }
    const svg = containerRef.current.querySelector('svg');
    if (!svg) {
      retryTimeoutId = setTimeout(runSetup, 100);
      return;
    }
    const shouldAttach = tooltipSetting > 0;
    attachOrDetachEventListeners(
      containerRef.current,
      shouldAttach,
      false,
      tooltipSetting,
      legends
    );
  };

  const rafId = requestAnimationFrame(runSetup);
  const timeoutId = setTimeout(runSetup, 500);

  return () => {
    cancelAnimationFrame(rafId);
    if (retryTimeoutId) clearTimeout(retryTimeoutId);
    if (setupTimeoutId) clearTimeout(setupTimeoutId);
    clearTimeout(timeoutId);
    if (containerEl) {
      attachOrDetachEventListeners(containerEl, false, false, tooltipSetting, legends);
    }
  };
}

/**
 * Build chart param string with updated timespan and indicators.
 * Used when user toggles indicators so the main chart SVG is requested with the new set.
 */
export function createUpdatedChartParam(
  baseParam: string,
  timespan: string,
  indicators: string[] | null | undefined
): string {
  const paramPairs = baseParam.split('&');
  const paramMap: Record<string, string> = {};

  paramPairs.forEach((pair) => {
    const [key, value] = pair.split('=');
    if (key && value) {
      paramMap[key] = decodeURIComponent(value);
    }
  });

  const indicatorsArray = Array.isArray(indicators) ? indicators : [];
  const filteredIndicators = indicatorsArray
    .filter((indicator) => indicator != null && indicator.toString().trim() !== '')
    .map((indicator) => indicator.toString().trim())
    .filter((indicator) => indicator !== '89');

  if (filteredIndicators.length > 0) {
    paramMap.indicators = filteredIndicators.join(',');
  } else {
    delete paramMap.indicators;
  }

  paramMap.chartId = timespan;

  return Object.entries(paramMap)
    .filter(([, value]) => value != null && value.toString().trim() !== '')
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

export interface TimeSpanOption {
  value: string;
  label: string;
  id: string;
}

export function buildTimeSpanOptions(userSettingsStore: UserSettingsData | null): TimeSpanOption[] {
  const chartType = userSettingsStore?.main_chart_settings?.chart_type;
  const allowed = chartType?.allowed ?? [];
  const group = chartType?.group_technical_analysis as
    | Record<number, { caption?: string; id?: string }>
    | undefined;
  return allowed
    .map((optionId: number) => {
      const option = group?.[optionId];
      return {
        value: optionId.toString(),
        label: option?.caption ?? '',
        id: option?.id ?? '',
      };
    })
    .filter((o: TimeSpanOption) => o.value && o.label && o.id);
}
