import { CHART_DEFAULTS } from './constants';

export type Platform = 'desktop' | 'tablet' | 'mobile';

export interface ChartDimensions {
  width: number;
  height: number;
  platform: Platform;
  containerWidth: number;
  containerHeight: number;
}

export interface ChartDimensionOptions {
  containerRef?: HTMLElement | null;
  defaultWidth?: number;
  defaultHeight?: number;
  aspectRatio?: number;
  maxWidth?: number;
  maxHeight?: number;
  minWidth?: number;
  minHeight?: number;
  useViewportWidth?: boolean;
  debounceMs?: number;
  changeThreshold?: number;
}

export function detectPlatform(): Platform {
  if (typeof window === 'undefined') {
    return 'desktop'; // Default for SSR
  }

  const width = window.innerWidth;

  if (width >= 1024) {
    return 'desktop'; // lg breakpoint
  } else if (width >= 640) {
    return 'tablet'; // sm breakpoint
  } else {
    return 'mobile'; // below sm
  }
}

function getContainerDimensions(
  containerRef?: HTMLElement | null,
  defaultWidth: number = CHART_DEFAULTS.WIDTH,
  defaultHeight: number = CHART_DEFAULTS.HEIGHT,
  useViewportWidth: boolean = true
): { containerWidth: number; containerHeight: number } {
  if (containerRef) {
    const rect = containerRef.getBoundingClientRect();
    return {
      containerWidth: rect.width || defaultWidth,
      containerHeight: rect.height || defaultHeight,
    };
  }
  if (useViewportWidth && typeof window !== 'undefined') {
    return { containerWidth: window.innerWidth, containerHeight: defaultHeight };
  }
  return { containerWidth: defaultWidth, containerHeight: defaultHeight };
}

export interface ClampDimensionsParams {
  width: number;
  height: number;
  aspectRatio?: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
}

function clampDimensions(params: ClampDimensionsParams): { width: number; height: number } {
  const { width, height, aspectRatio, minWidth, maxWidth, minHeight, maxHeight } = params;
  let w = Math.min(width, maxWidth);
  let h = aspectRatio ? w / aspectRatio : Math.min(height, maxHeight);
  w = Math.max(minWidth, Math.min(w, maxWidth));
  h = Math.max(minHeight, Math.min(h, maxHeight));
  return { width: Math.round(w), height: Math.round(h) };
}

/**
 * Calculates chart dimensions based on container and viewport
 * @param options - Configuration options for dimension calculation
 * @returns Calculated chart dimensions
 */
export function calculateChartDimensions(options: ChartDimensionOptions = {}): ChartDimensions {
  const {
    containerRef,
    defaultWidth = CHART_DEFAULTS.WIDTH,
    defaultHeight = CHART_DEFAULTS.HEIGHT,
    aspectRatio,
    maxWidth = CHART_DEFAULTS.MAX_WIDTH,
    maxHeight = CHART_DEFAULTS.MAX_HEIGHT,
    minWidth = CHART_DEFAULTS.MIN_WIDTH,
    minHeight = CHART_DEFAULTS.MIN_HEIGHT,
    useViewportWidth = true,
  } = options;

  const platform = detectPlatform();
  const { containerWidth, containerHeight } = getContainerDimensions(
    containerRef,
    defaultWidth,
    defaultHeight,
    useViewportWidth
  );

  let width = containerWidth;
  let height = aspectRatio ? width / aspectRatio : containerHeight;
  const { width: w, height: h } = clampDimensions({
    width,
    height,
    aspectRatio,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
  });

  return {
    width: w,
    height: h,
    platform,
    containerWidth: Math.round(containerWidth),
    containerHeight: Math.round(containerHeight),
  };
}

interface DimensionTriggerParams {
  containerRef: HTMLElement;
  callback: (dimensions: ChartDimensions) => void;
  options: ChartDimensionOptions;
  lastDimensionsRef: { current: ChartDimensions | null };
  changeThreshold: number;
}

function buildDimensionTrigger(params: DimensionTriggerParams) {
  const { containerRef, callback, options, lastDimensionsRef, changeThreshold } = params;
  return () => {
    const rect = containerRef.getBoundingClientRect();
    const hasValidDimensions = rect.width > 0 && rect.height > 0;
    const dimensions = calculateChartDimensions({ ...options, containerRef });
    if (!hasValidDimensions && lastDimensionsRef.current) return;
    const last = lastDimensionsRef.current;
    const changed =
      !last ||
      Math.abs(dimensions.width - last.width) > changeThreshold ||
      Math.abs(dimensions.height - last.height) > changeThreshold ||
      dimensions.platform !== last.platform;
    if (changed) {
      lastDimensionsRef.current = dimensions;
      callback(dimensions);
    }
  };
}

interface SetupResizeParams {
  containerRef: HTMLElement;
  callback: (dimensions: ChartDimensions) => void;
  options: ChartDimensionOptions;
  debounceMs: number;
  changeThreshold: number;
}

interface ResizeObserverRefs {
  isInitialCallRef: { current: boolean };
  lastDimensionsRef: { current: ChartDimensions | null };
  fallbackTimeoutRef: { current: NodeJS.Timeout | null };
}

function createResizeObserverAndFallback(
  params: SetupResizeParams,
  callbacks: { onResize: () => void; onInitialTrigger: () => void },
  refs: ResizeObserverRefs
): ResizeObserver | null {
  const { containerRef, callback, options } = params;
  const { onResize, onInitialTrigger } = callbacks;
  const { isInitialCallRef, lastDimensionsRef, fallbackTimeoutRef } = refs;
  if (typeof ResizeObserver === 'undefined') {
    const initialDimensions = calculateChartDimensions({ ...options, containerRef });
    lastDimensionsRef.current = initialDimensions;
    callback(initialDimensions);
    return null;
  }
  const ro = new ResizeObserver(() => {
    if (isInitialCallRef.current) isInitialCallRef.current = false;
    onResize();
  });
  ro.observe(containerRef);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!isInitialCallRef.current) return;
      const rect = containerRef.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        onInitialTrigger();
        isInitialCallRef.current = false;
      } else {
        fallbackTimeoutRef.current = setTimeout(() => {
          if (isInitialCallRef.current && !lastDimensionsRef.current) {
            onInitialTrigger();
            isInitialCallRef.current = false;
          }
        }, 1000);
      }
    });
  });
  return ro;
}

function setupResizeObserverAndCleanup(params: SetupResizeParams): () => void {
  const lastDimensionsRef: { current: ChartDimensions | null } = { current: null };
  const isInitialCallRef = { current: true };
  const fallbackTimeoutRef: { current: NodeJS.Timeout | null } = { current: null };
  let resizeTimeout: NodeJS.Timeout | null = null;

  const triggerCallback = buildDimensionTrigger({
    ...params,
    lastDimensionsRef,
  });
  const debouncedCallback = () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      triggerCallback();
      isInitialCallRef.current = false;
    }, params.debounceMs);
  };

  const resizeObserver = createResizeObserverAndFallback(
    params,
    { onResize: debouncedCallback, onInitialTrigger: triggerCallback },
    { isInitialCallRef, lastDimensionsRef, fallbackTimeoutRef }
  );

  const handleWindowResize = () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(debouncedCallback, params.debounceMs);
  };
  window.addEventListener('resize', handleWindowResize);

  return () => {
    resizeObserver?.disconnect();
    window.removeEventListener('resize', handleWindowResize);
    if (resizeTimeout) clearTimeout(resizeTimeout);
    if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
  };
}

/**
 * Creates a resize observer for chart container
 * @param containerRef - The container element to observe
 * @param callback - Function to call when dimensions change
 * @param options - Chart dimension options
 * @returns Cleanup function to disconnect observer
 */
export function observeChartResize(
  containerRef: HTMLElement,
  callback: (dimensions: ChartDimensions) => void,
  options: ChartDimensionOptions = {}
): () => void {
  if (typeof window === 'undefined' || !containerRef) return () => {};
  const debounceMs = options.debounceMs ?? 500;
  const changeThreshold = options.changeThreshold ?? 0;
  return setupResizeObserverAndCleanup({
    containerRef,
    callback,
    options,
    debounceMs,
    changeThreshold,
  });
}

export { ChartPresets } from './chart-presets';
