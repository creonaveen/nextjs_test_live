import type { ChartDimensions } from './chart-dimensions';
import { calculateChartDimensions } from './chart-dimensions';
import { CHART_DEFAULTS, VIEWPORT_DEFAULTS } from './constants';

export const ChartPresets = {
  mainChart: (containerRef?: HTMLElement | null): ChartDimensions => {
    return calculateChartDimensions({
      containerRef,
      defaultWidth: CHART_DEFAULTS.WIDTH,
      defaultHeight: CHART_DEFAULTS.MAIN_CHART_HEIGHT,
      aspectRatio: 2.4,
      maxWidth: CHART_DEFAULTS.MAX_WIDTH,
      maxHeight: 800,
      minWidth: CHART_DEFAULTS.MIN_WIDTH,
      minHeight: CHART_DEFAULTS.MIN_HEIGHT,
    });
  },

  rsiChart: (containerRef?: HTMLElement | null): ChartDimensions => {
    return calculateChartDimensions({
      containerRef,
      defaultWidth: CHART_DEFAULTS.WIDTH,
      defaultHeight: CHART_DEFAULTS.RSI_CHART_HEIGHT,
      aspectRatio: 8.57,
      maxWidth: CHART_DEFAULTS.MAX_WIDTH,
      maxHeight: 200,
      minWidth: CHART_DEFAULTS.MIN_WIDTH,
      minHeight: 100,
    });
  },

  maximizedChart: (containerRef?: HTMLElement | null): ChartDimensions => {
    const viewportWidth =
      typeof window !== 'undefined' ? window.innerWidth : VIEWPORT_DEFAULTS.WIDTH;
    const viewportHeight =
      typeof window !== 'undefined' ? window.innerHeight : VIEWPORT_DEFAULTS.HEIGHT;
    return calculateChartDimensions({
      containerRef,
      defaultWidth: viewportWidth * 0.95,
      defaultHeight: viewportHeight * 0.75,
      maxWidth: viewportWidth,
      maxHeight: viewportHeight * 0.9,
      minWidth: CHART_DEFAULTS.MIN_WIDTH,
      minHeight: 240,
      useViewportWidth: true,
    });
  },

  thumbnailChart: (containerRef?: HTMLElement | null): ChartDimensions => {
    return calculateChartDimensions({
      containerRef,
      defaultWidth: CHART_DEFAULTS.THUMBNAIL_WIDTH,
      defaultHeight: CHART_DEFAULTS.THUMBNAIL_HEIGHT,
      aspectRatio: 2,
      maxWidth: 600,
      maxHeight: 300,
      minWidth: 200,
      minHeight: 100,
    });
  },
};
