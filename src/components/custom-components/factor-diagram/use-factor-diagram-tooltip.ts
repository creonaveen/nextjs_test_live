import { useEffect, useRef, useState } from 'react';

import { FactorDiagramTooltips, FactorTooltip } from '@/lib/types/shared-components';

import { createTooltipEventHandlers } from './factor-diagram-tooltip-handlers';

function attachEventListeners(
  container: HTMLDivElement,
  handlers: {
    mouseOver: (e: MouseEvent) => void;
    mouseOut: (e: MouseEvent) => void;
    mouseLeave: (e: MouseEvent) => void;
  },
  listenersAttachedRef: React.MutableRefObject<boolean>
) {
  if (!listenersAttachedRef.current) {
    container.addEventListener('mouseover', handlers.mouseOver);
    container.addEventListener('mouseout', handlers.mouseOut);
    container.addEventListener('mouseleave', handlers.mouseLeave);
    listenersAttachedRef.current = true;
  }
}

function detachEventListeners(
  container: HTMLDivElement,
  handlers: {
    mouseOver: (e: MouseEvent) => void;
    mouseOut: (e: MouseEvent) => void;
    mouseLeave: (e: MouseEvent) => void;
  },
  listenersAttachedRef: React.MutableRefObject<boolean>
) {
  if (listenersAttachedRef.current) {
    container.removeEventListener('mouseover', handlers.mouseOver);
    container.removeEventListener('mouseout', handlers.mouseOut);
    container.removeEventListener('mouseleave', handlers.mouseLeave);
    listenersAttachedRef.current = false;
  }
}

// Hook for managing tooltip event listeners
const useTooltipEventListeners = ({
  tooltips,
  platform,
  processedSvgHtml,
  handleContainerMouseOver,
  handleContainerMouseOut,
  handleContainerMouseLeave,
  containerRef,
  hideTimeoutRef,
  listenersAttachedRef,
}: {
  tooltips: (FactorDiagramTooltips & { rawSvgHtml?: string }) | undefined;
  platform: string;
  processedSvgHtml: string;
  handleContainerMouseOver: (e: MouseEvent) => void;
  handleContainerMouseOut: (e: MouseEvent) => void;
  handleContainerMouseLeave: (e: MouseEvent) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  hideTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
  listenersAttachedRef: React.MutableRefObject<boolean>;
}) => {
  useEffect(() => {
    const container = containerRef.current;
    const handlers = {
      mouseOver: handleContainerMouseOver,
      mouseOut: handleContainerMouseOut,
      mouseLeave: handleContainerMouseLeave,
    };

    if (!tooltips || platform !== 'desktop') {
      return handleDisabledTooltips(container, handlers, listenersAttachedRef, hideTimeoutRef);
    }

    return handleEnabledTooltips(containerRef, handlers, listenersAttachedRef, hideTimeoutRef);
  }, [
    tooltips,
    processedSvgHtml,
    platform,
    handleContainerMouseOver,
    handleContainerMouseOut,
    handleContainerMouseLeave,
    containerRef,
    hideTimeoutRef,
    listenersAttachedRef,
  ]);
};

function handleDisabledTooltips(
  container: HTMLDivElement | null,
  handlers: {
    mouseOver: (e: MouseEvent) => void;
    mouseOut: (e: MouseEvent) => void;
    mouseLeave: (e: MouseEvent) => void;
  },
  listenersAttachedRef: React.MutableRefObject<boolean>,
  hideTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
) {
  if (container) {
    detachEventListeners(container, handlers, listenersAttachedRef);
  }
  const hideTimeout = hideTimeoutRef.current;
  return () => {
    if (hideTimeout) clearTimeout(hideTimeout);
  };
}

function handleEnabledTooltips(
  containerRef: React.RefObject<HTMLDivElement>,
  handlers: {
    mouseOver: (e: MouseEvent) => void;
    mouseOut: (e: MouseEvent) => void;
    mouseLeave: (e: MouseEvent) => void;
  },
  listenersAttachedRef: React.MutableRefObject<boolean>,
  hideTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
) {
  const container = containerRef.current;
  const timer = setTimeout(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      attachEventListeners(currentContainer, handlers, listenersAttachedRef);
    }
  }, 100);

  return () => {
    clearTimeout(timer);
    const hideTimeout = hideTimeoutRef.current;
    if (hideTimeout) clearTimeout(hideTimeout);
    if (container) {
      detachEventListeners(container, handlers, listenersAttachedRef);
    }
  };
}

function useTooltipState() {
  const [activeTooltip, setActiveTooltip] = useState<FactorTooltip | null>(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);

  return {
    activeTooltip,
    setActiveTooltip,
    isTooltipOpen,
    setIsTooltipOpen,
    hoveredElement,
    setHoveredElement,
  };
}

function useTooltipRefs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const listenersAttachedRef = useRef<boolean>(false);
  const currentSliceTargetRef = useRef<string | null>(null);
  const tooltipPositionRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  return {
    containerRef,
    hideTimeoutRef,
    listenersAttachedRef,
    currentSliceTargetRef,
    tooltipPositionRef,
  };
}

// Custom hook for factor diagram tooltip logic
export const useFactorDiagramTooltip = (
  tooltips: (FactorDiagramTooltips & { rawSvgHtml?: string }) | undefined,
  platform: string
) => {
  const state = useTooltipState();
  const refs = useTooltipRefs();

  const processedSvgHtml = processSvgHtml(tooltips);

  const eventHandlers = createTooltipEventHandlers({
    tooltips,
    containerRef: refs.containerRef as React.RefObject<HTMLDivElement>,
    currentSliceTargetRef: refs.currentSliceTargetRef,
    tooltipPositionRef: refs.tooltipPositionRef,
    hideTimeoutRef: refs.hideTimeoutRef,
    setActiveTooltip: state.setActiveTooltip,
    setIsTooltipOpen: state.setIsTooltipOpen,
    setHoveredElement: state.setHoveredElement,
  });

  useTooltipEventListeners({
    tooltips,
    platform,
    processedSvgHtml,
    handleContainerMouseOver: eventHandlers.handleContainerMouseOver,
    handleContainerMouseOut: eventHandlers.handleContainerMouseOut,
    handleContainerMouseLeave: eventHandlers.handleContainerMouseLeave,
    containerRef: refs.containerRef as React.RefObject<HTMLDivElement>,
    hideTimeoutRef: refs.hideTimeoutRef,
    listenersAttachedRef: refs.listenersAttachedRef,
  });

  return createTooltipReturnValue(state, refs, processedSvgHtml);
};

function processSvgHtml(
  tooltips: (FactorDiagramTooltips & { rawSvgHtml?: string }) | undefined
): string {
  if (!tooltips?.rawSvgHtml) return '';
  const processed = tooltips.rawSvgHtml.replace(/\s*title="[^"]*"/g, '');
  const hasTooltipClasses = processed.includes('ifgTooltipSliceOpacityLight');
  return hasTooltipClasses ? processed : processed;
}

function createTooltipReturnValue(
  state: ReturnType<typeof useTooltipState>,
  refs: ReturnType<typeof useTooltipRefs>,
  processedSvgHtml: string
) {
  return {
    activeTooltip: state.activeTooltip,
    isTooltipOpen: state.isTooltipOpen,
    hoveredElement: state.hoveredElement,
    containerRef: refs.containerRef,
    tooltipPositionRef: refs.tooltipPositionRef,
    processedSvgHtml,
  };
}
