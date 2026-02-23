import { FactorDiagramTooltips, FactorTooltip } from '@/lib/types/shared-components';

// Helper function to get tooltip data by tooltip target
export const getTooltipByTarget = (
  tooltipTarget: string,
  tooltipsData: FactorDiagramTooltips
): FactorTooltip | null => {
  if (!tooltipsData) return null;
  const tooltipKey = tooltipTarget as keyof FactorDiagramTooltips;
  return tooltipsData[tooltipKey] || null;
};

// Helper function to calculate tooltip position
export const calculateTooltipPosition = (
  target: Element,
  container: HTMLElement
): { left: number; top: number; width: number; height: number } | null => {
  const rect = target.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  if (!containerRect) return null;

  return {
    left: rect.left - containerRect.left,
    top: rect.top - containerRect.top,
    width: rect.width,
    height: rect.height,
  };
};

/** Shared params shape for tooltip event handler factories */
export interface TooltipHandlerParams {
  tooltips: FactorDiagramTooltips | undefined;
  containerRef: React.RefObject<HTMLDivElement>;
  currentSliceTargetRef: React.MutableRefObject<string | null>;
  tooltipPositionRef: React.MutableRefObject<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>;
  hideTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
  setActiveTooltip: (tooltip: FactorTooltip | null) => void;
  setIsTooltipOpen: (open: boolean) => void;
  setHoveredElement: (element: Element | null) => void;
}

// Mouse over event handler
export const createMouseOverHandler = (params: TooltipHandlerParams) => (event: MouseEvent) => {
  const {
    tooltips,
    containerRef,
    currentSliceTargetRef,
    tooltipPositionRef,
    hideTimeoutRef,
    setActiveTooltip,
    setIsTooltipOpen,
    setHoveredElement,
  } = params;

  const target = event.target as Element;

  if (target.classList.contains('ifgTooltipSliceOpacityLight')) {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    const tooltipTarget = target.getAttribute('id');

    if (
      tooltipTarget &&
      tooltipTarget !== currentSliceTargetRef.current &&
      tooltips &&
      containerRef.current
    ) {
      currentSliceTargetRef.current = tooltipTarget;
      const tooltipData = getTooltipByTarget(tooltipTarget, tooltips);

      if (tooltipData) {
        const position = calculateTooltipPosition(target, containerRef.current);
        if (position) {
          tooltipPositionRef.current = position;
          setHoveredElement(target);
          setActiveTooltip(tooltipData);
          setIsTooltipOpen(true);
        }
      }
    }
  }
};

// Mouse out event handler
export const createMouseOutHandler =
  (params: { currentSliceTargetRef: React.MutableRefObject<string | null> }) =>
  (event: MouseEvent) => {
    const { currentSliceTargetRef } = params;
    const target = event.target as Element;
    const relatedTarget = event.relatedTarget as Element;

    if (target.classList.contains('ifgTooltipSliceOpacityLight')) {
      if (relatedTarget && relatedTarget.classList.contains('ifgTooltipSliceOpacityLight')) {
        return;
      }
      currentSliceTargetRef.current = null;
    }
  };

// Mouse leave event handler
export const createMouseLeaveHandler =
  (
    params: Pick<
      TooltipHandlerParams,
      | 'currentSliceTargetRef'
      | 'tooltipPositionRef'
      | 'hideTimeoutRef'
      | 'setActiveTooltip'
      | 'setIsTooltipOpen'
      | 'setHoveredElement'
    >
  ) =>
  () => {
    const {
      currentSliceTargetRef,
      tooltipPositionRef,
      hideTimeoutRef,
      setActiveTooltip,
      setIsTooltipOpen,
      setHoveredElement,
    } = params;
    currentSliceTargetRef.current = null;

    hideTimeoutRef.current = setTimeout(() => {
      setActiveTooltip(null);
      setIsTooltipOpen(false);
      setHoveredElement(null);
      tooltipPositionRef.current = null;
    }, 100);
  };

// Helper function to create tooltip event handlers
export const createTooltipEventHandlers = (params: TooltipHandlerParams) => {
  return {
    handleContainerMouseOver: createMouseOverHandler(params),
    handleContainerMouseOut: createMouseOutHandler(params),
    handleContainerMouseLeave: createMouseLeaveHandler(params),
  };
};
