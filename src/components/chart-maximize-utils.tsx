import { useEffect, useRef, useState } from 'react';

import { TooltipLegends } from '@/lib/types/svg';
import { useGetStaticContent } from '@/store/api-service/static-content-api-service';
import { useGetSvgData } from '@/store/api-service/svg-api-service';
import { observeChartResize } from '@/utils/chart-dimensions';
import { attachOrDetachEventListeners } from '@/utils/main-chart-tooltip';

// Tooltip setup delay constants (ms)
export const TOOLTIP_RETRY_DELAY_MS = 100;
export const TOOLTIP_SETUP_DELAY_MS = 500;

// Helper function to setup tooltips - moved outside component
export const setupTooltips = (
  container: HTMLElement,
  tooltipSetting: number,
  tooltipLegends?: TooltipLegends
) => {
  // Ensure SVG is actually rendered in the DOM before attaching tooltips
  const svg = container.querySelector('svg');
  if (!svg) {
    // SVG not ready yet, retry after a short delay
    setTimeout(
      () => setupTooltips(container, tooltipSetting, tooltipLegends),
      TOOLTIP_RETRY_DELAY_MS
    );
    return;
  }

  // Attach listeners when tooltip setting > 0, detach when 0
  const shouldAttach = !!((tooltipSetting ?? 0) > 0);
  attachOrDetachEventListeners(container, shouldAttach, true, tooltipSetting ?? 0, tooltipLegends);
};

/** Props for chart SVG API */
export interface ChartApiProps {
  svg_id?: string;
  company_id?: string;
  chart_param?: string;
  chart_tooltip_id?: number;
  show_image_border?: number;
}

/** Props for static content API */
export interface StaticContentApiProps {
  svg_id?: string;
  reference: string;
  parameters: string;
}

// Hook: observe chart container resize and track maximized width
function useMaximizedWidth(
  isOpen: boolean,
  hasApiProps: boolean,
  chartContainerRef: React.RefObject<HTMLDivElement | null>
) {
  const [maximizedWidth, setMaximizedWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen || !hasApiProps) {
      setMaximizedWidth(null);
      return;
    }

    let cleanup: (() => void) | undefined;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!chartContainerRef.current) return;

        cleanup = observeChartResize(
          chartContainerRef.current,
          (dimensions) => setMaximizedWidth(dimensions.width),
          {
            defaultWidth: 1920,
            defaultHeight: 1080,
            maxWidth: 1920,
            maxHeight: 1080,
            useViewportWidth: true,
          }
        );
      });
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, [isOpen, hasApiProps, chartContainerRef]);

  return maximizedWidth;
}

// Hook: fetch maximized chart/static data
function useMaximizedFetch(opts: {
  apiProps: ChartApiProps | undefined;
  staticContentApiProps: StaticContentApiProps | undefined;
  shouldFetch: boolean;
  width: number;
  language: string;
}) {
  const { apiProps, staticContentApiProps, shouldFetch, width, language } = opts;
  const { data: chartData, isLoading: chartLoading } = useGetSvgData(
    apiProps && shouldFetch
      ? {
          svg_id: apiProps.svg_id,
          company_id: apiProps.company_id,
          chart_param: apiProps.chart_param ? encodeURI(apiProps.chart_param) : undefined,
          chart_tooltip_id: apiProps.chart_tooltip_id,
          show_image_border: apiProps.show_image_border,
          w: width,
          lang: language,
        }
      : undefined,
    apiProps ? shouldFetch : false
  );

  const { data: staticData, isLoading: staticLoading } = useGetStaticContent(
    staticContentApiProps && shouldFetch
      ? {
          svg_id: staticContentApiProps.svg_id,
          reference: staticContentApiProps.reference,
          parameters: encodeURI(staticContentApiProps.parameters),
          w: width,
        }
      : undefined,
    staticContentApiProps ? shouldFetch : false
  );

  const data = apiProps ? chartData : staticData;
  const isLoading = apiProps ? chartLoading : staticLoading;
  return { data, isLoading };
}

// Custom hook for chart maximization logic
export const useChartMaximization = (
  isOpen: boolean,
  apiProps?: ChartApiProps,
  staticContentApiProps?: StaticContentApiProps,
  language = 'en'
) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const hasApiProps = !!(apiProps || staticContentApiProps);
  const maximizedWidth = useMaximizedWidth(isOpen, hasApiProps, chartContainerRef);

  const shouldFetch = hasApiProps && maximizedWidth !== null;
  const isWaitingForWidth = hasApiProps && maximizedWidth === null;
  const width = maximizedWidth ?? 1920;

  const { data: maximizedData, isLoading } = useMaximizedFetch({
    apiProps,
    staticContentApiProps,
    shouldFetch,
    width,
    language,
  });

  return {
    chartContainerRef,
    maximizedWidth,
    maximizedData,
    showLoading: isWaitingForWidth || isLoading,
    hasApiProps,
  };
};
