/* eslint-disable max-lines, max-lines-per-function, max-params, max-statements -- chart tooltip module; refactor in follow-up */
import DOMPurify from 'isomorphic-dompurify';

import type { TooltipLegends } from '@/lib/types/svg';
import logger from '@/utils/logger';

/**
 * Interface for tooltip data stored on SVG container elements
 */
interface TooltipData {
  svg: SVGElement;
  tooltip: HTMLElement;
  dottedLine: SVGLineElement;
  trackerBall: SVGCircleElement;
  viewBoxWidth: number;
  viewBoxHeight: number;
  isFullScreen: boolean;
  currentTooltipSetting: number;
  tooltipLegends?: TooltipLegends;
  mouseEnterHandlerRef: (e: Event) => void;
  mouseMoveHandlerRef: (e: Event) => void;
  mouseLeaveHandlerRef: (e: Event) => void;
  // Touch/click support for technical info mode (id === 1) on touch devices
  clickHandlerRef?: (e: Event) => void;
  outsideClickHandlerRef?: (e: Event) => void; // Handler for clicks outside chart to dismiss tooltip
  activeTooltipData?: string | null; // Store the data attribute content for comparison (more reliable than element reference)
  isTooltipVisible?: boolean; // Track visibility state explicitly
  // Touch support for price info mode (id === 2) on touch devices
  touchStartHandlerRef?: (e: Event) => void;
  touchMoveHandlerRef?: (e: Event) => void;
  touchEndHandlerRef?: (e: Event) => void;
  touchCancelHandlerRef?: (e: Event) => void;
  scrollHandlerRef?: (e: Event) => void;
  // Touch interaction state for price info mode
  touchStartX?: number;
  touchStartY?: number;
  isDragging?: boolean;
  isPriceTooltipActive?: boolean;
  holdTimeoutId?: ReturnType<typeof setTimeout>; // Timeout for hold-to-activate
}

/**
 * Extended Element interface that includes optional tooltip data
 */
interface ExtendedElement extends Element {
  _tooltipData?: TooltipData;
}

// Helper function to detect if device is primarily touch-based (mobile/tablet)
function isTouchDevice(): boolean {
  // Check if the primary pointer is coarse (touch) rather than fine (mouse/trackpad)
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  // Check if it's a mobile/tablet via user agent
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Only return true if it's a touch-primary device (mobile/tablet)
  return hasCoarsePointer || isMobileUA;
}

export function normalizeCoordinates(
  svgContainer: Element,
  x: number,
  y: number,
  viewBoxWidth: number,
  viewBoxHeight: number
) {
  const svg = svgContainer.querySelector('svg') as SVGElement;
  const rect = svg.getBoundingClientRect();

  const containerWidth = rect.width;
  const containerHeight = rect.height;

  const normalizedX = ((x - rect.left) / containerWidth) * viewBoxWidth;
  const normalizedY = ((y - rect.top) / containerHeight) * viewBoxHeight;

  return { x: normalizedX, y: normalizedY };
}

// Function to find the closest line to the mouse coordinates, called inside updateTooltipAndDottedLine()
export function findClosestLine(svgContainer: Element, mouseX: number): Element | null {
  // Get all the lines with the class vertical-line
  const lines = svgContainer.querySelectorAll('.imgsvg_verticalHooverLine');
  let closestLine: Element | null = null;
  let minDistance = Number.POSITIVE_INFINITY;

  lines.forEach(function (line) {
    const lineX = parseFloat(line.getAttribute('x1') || '0');
    const distance = Math.abs(mouseX - lineX);

    // Check if this line is closer than the previous closest line
    if (distance < minDistance) {
      minDistance = distance;
      closestLine = line;
    }
  });

  return closestLine;
}

function hideTooltipLineAndBall(
  tooltip: HTMLElement,
  dottedLine: SVGLineElement,
  trackerBall: SVGCircleElement
): void {
  tooltip.style.display = 'none';
  dottedLine.style.display = 'none';
  trackerBall.style.display = 'none';
}

function buildPriceTooltipHtml(data: string[], tooltipLegends?: TooltipLegends): string {
  const dateLabel = tooltipLegends?.cterm_date + ':' || 'Date:';
  const priceLabel = tooltipLegends?.cterm_price + ':' || 'Price:';
  const volumeLabel = tooltipLegends?.cterm_volume + ':' || 'Volume:';
  return (
    '<div class="tooltip-grid">' +
    '<span class="tooltip-label">' +
    DOMPurify.sanitize(dateLabel, { ALLOWED_TAGS: [] }) +
    '</span><span class="tooltip-value">' +
    DOMPurify.sanitize(data[2] || '', { ALLOWED_TAGS: [] }) +
    '</span>' +
    '<span class="tooltip-label">' +
    DOMPurify.sanitize(priceLabel, { ALLOWED_TAGS: [] }) +
    '</span><span class="tooltip-value">' +
    DOMPurify.sanitize(data[3] || '', { ALLOWED_TAGS: [] }) +
    '</span>' +
    '<span class="tooltip-label">' +
    DOMPurify.sanitize(volumeLabel, { ALLOWED_TAGS: [] }) +
    '</span><span class="tooltip-value">' +
    DOMPurify.sanitize(data[4] || '', { ALLOWED_TAGS: [] }) +
    '</span></div>'
  );
}

function clampTooltipToContainer(
  relativeX: number,
  relativeY: number,
  containerRect: DOMRect,
  tooltip: HTMLElement,
  e: MouseEvent,
  isFullScreen: boolean,
  xOffset: number,
  yOffset: number
): { tooltipX: number; tooltipY: number } {
  const tooltipWidth = tooltip.offsetWidth || 220;
  const tooltipHeight = tooltip.offsetHeight || 100;
  let tooltipX = relativeX + xOffset;
  let tooltipY = relativeY - tooltipHeight - yOffset;
  if (isFullScreen) {
    tooltipX = e.clientX + xOffset;
    tooltipY = e.clientY - tooltipHeight + yOffset;
  }
  if (tooltipX + tooltipWidth > containerRect.width) {
    tooltipX = relativeX - tooltipWidth - xOffset;
  }
  if (tooltipX < 0) {
    tooltipX = xOffset;
  }
  if (tooltipY < 0) {
    tooltipY = relativeY + yOffset;
  }
  if (tooltipY + tooltipHeight > containerRect.height) {
    tooltipY = containerRect.height - tooltipHeight - yOffset;
  }
  return { tooltipX, tooltipY };
}

function showDottedLineAndBall(
  dottedLine: SVGLineElement,
  trackerBall: SVGCircleElement,
  lineX: number,
  lineMidY: string,
  chartHeight: number
): void {
  dottedLine.setAttribute('x1', lineX.toString());
  dottedLine.setAttribute('x2', lineX.toString());
  dottedLine.setAttribute('y1', '0');
  dottedLine.setAttribute('y2', chartHeight.toString());
  dottedLine.style.display = 'block';
  trackerBall.setAttribute('cx', lineX.toString());
  trackerBall.setAttribute('cy', lineMidY);
  trackerBall.setAttribute('r', '6');
  trackerBall.style.display = 'block';
}

// Function to update the tooltip content and position, and display the dotted line
export function updateTooltipAndDottedLine(
  svgContainer: Element,
  e: MouseEvent,
  viewBoxWidth: number,
  viewBoxHeight: number,
  tooltip: HTMLElement,
  dottedLine: SVGLineElement,
  trackerBall: SVGCircleElement,
  isFullScreen: boolean,
  tooltipLegends?: TooltipLegends
) {
  if (isTouchDevice()) return;

  const mouseX = e.clientX + window.scrollX;
  const mouseY = e.clientY + window.scrollY;
  const normalizedCoords = normalizeCoordinates(
    svgContainer,
    mouseX,
    mouseY,
    viewBoxWidth,
    viewBoxHeight
  );
  const closestLine = findClosestLine(svgContainer, normalizedCoords.x);

  if (!closestLine) {
    hideTooltipLineAndBall(tooltip, dottedLine, trackerBall);
    return;
  }

  const lineX = parseFloat((closestLine as Element).getAttribute('x1') || '0');
  const data = (closestLine as Element).getAttribute('data')?.split(',') || [];
  const lineMidY = data[1];
  if (!lineMidY || isNaN(parseFloat(lineMidY))) {
    hideTooltipLineAndBall(tooltip, dottedLine, trackerBall);
    return;
  }

  tooltip.style.opacity = '1';
  tooltip.innerHTML = DOMPurify.sanitize(buildPriceTooltipHtml(data, tooltipLegends), {
    ALLOWED_TAGS: ['div', 'span'],
    ALLOWED_ATTR: ['class'],
  });

  const containerRect = svgContainer.getBoundingClientRect();
  const relativeX = e.clientX - containerRect.left;
  const relativeY = e.clientY - containerRect.top;
  const { tooltipX, tooltipY } = clampTooltipToContainer(
    relativeX,
    relativeY,
    containerRect,
    tooltip,
    e,
    isFullScreen,
    10,
    10
  );

  tooltip.style.position = 'absolute';
  tooltip.style.left = tooltipX + 'px';
  tooltip.style.top = tooltipY + 'px';
  tooltip.style.display = 'block';
  showDottedLineAndBall(dottedLine, trackerBall, lineX, lineMidY, viewBoxHeight);
}

// Function to show chart elements info, called inside companyPages_init.js
export function showChartElementInfo(
  element: Element,
  tooltip: HTMLElement,
  e: MouseEvent,
  isFullScreen: boolean
) {
  // Prevent on touch devices
  if (isTouchDevice()) {
    return;
  }

  const info = element.getAttribute('data');

  // Update the tooltip content with better styling and bold text
  // Sanitize HTML content to prevent XSS attacks
  const raw = info || 'No data available';

  const lines = raw
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean);

  const tooltipHtml = `<div class="text-left p-4 max-w-xs break-words text-sm leading-relaxed">${lines}</div>`;

  tooltip.innerHTML = DOMPurify.sanitize(tooltipHtml, {
    ALLOWED_TAGS: ['div', 'br', 'strong'],
    ALLOWED_ATTR: ['class'],
  });

  // Make sure tooltip is visible - reset any conflicting styles
  tooltip.style.display = 'block';
  tooltip.style.opacity = '1';
  tooltip.style.visibility = 'visible';
  tooltip.style.pointerEvents = 'auto';
  // tooltip.style.fontWeight = 'bold';

  // Get the chart container's position relative to the viewport
  const containerRect = (e.currentTarget as Element).getBoundingClientRect();

  // Calculate mouse position relative to the chart container
  const relativeX = e.clientX - containerRect.left;
  const relativeY = e.clientY - containerRect.top;

  // Set tooltip width and ensure text wrapping
  tooltip.style.maxWidth = '300px';
  tooltip.style.width = 'auto';
  tooltip.style.wordWrap = 'break-word';
  tooltip.style.whiteSpace = 'normal';
  tooltip.style.overflowWrap = 'break-word';
  tooltip.style.hyphens = 'auto';

  // Get tooltip dimensions after content is set
  const tooltipWidth = tooltip.offsetWidth || 300;
  const tooltipHeight = tooltip.offsetHeight || 100;
  const xOffset = 15;
  const yOffset = 15;

  // Calculate tooltip position relative to the container
  let tooltipX = relativeX + xOffset;
  let tooltipY = relativeY - tooltipHeight - yOffset;

  // Adjust for full screen mode
  if (isFullScreen) {
    tooltipX = e.clientX + xOffset;
    tooltipY = e.clientY - tooltipHeight + yOffset;
  }

  // Prevent the tooltip from overflowing the container (horizontal and vertical adjustment)
  if (tooltipX + tooltipWidth > containerRect.width) {
    tooltipX = relativeX - tooltipWidth - xOffset;
  }
  if (tooltipX < 0) {
    tooltipX = xOffset; // Add padding from the left edge
  }
  if (tooltipY < 0) {
    tooltipY = relativeY + yOffset; // Position below cursor if above container
  }
  if (tooltipY + tooltipHeight > containerRect.height) {
    tooltipY = containerRect.height - tooltipHeight - yOffset;
  }

  // Set final tooltip position relative to the container
  tooltip.style.position = 'absolute';
  tooltip.style.left = tooltipX + 'px';
  tooltip.style.top = tooltipY + 'px';

  // Display the tooltip
  tooltip.style.display = 'block';
  tooltip.style.opacity = '1';
}

function removeExistingTooltipListeners(svgContainer: Element, existingData: TooltipData): void {
  const refs = [
    [existingData.mouseEnterHandlerRef, 'mouseenter', svgContainer] as const,
    [existingData.mouseMoveHandlerRef, 'mousemove', svgContainer] as const,
    [existingData.mouseLeaveHandlerRef, 'mouseleave', svgContainer] as const,
    [existingData.clickHandlerRef, 'click', svgContainer] as const,
    [existingData.outsideClickHandlerRef, 'click', document] as const,
    [existingData.touchStartHandlerRef, 'touchstart', svgContainer] as const,
    [existingData.touchMoveHandlerRef, 'touchmove', svgContainer] as const,
    [existingData.touchEndHandlerRef, 'touchend', svgContainer] as const,
    [existingData.touchCancelHandlerRef, 'touchcancel', svgContainer] as const,
    [existingData.scrollHandlerRef, 'scroll', window] as const,
  ];
  refs.forEach(([ref, event, target]) => {
    if (ref) {
      target.removeEventListener(event, ref);
    }
  });
}

function applyTooltipWidthClass(tooltip: HTMLElement, currentTooltipSetting: number): void {
  if (currentTooltipSetting === 1) {
    tooltip.classList.add('w-[300px]');
  } else {
    tooltip.classList.remove('w-[300px]');
  }
}

interface TooltipListenerRefs {
  mouseEnterHandlerRef: (e: Event) => void;
  mouseMoveHandlerRef: (e: Event) => void;
  mouseLeaveHandlerRef: (e: Event) => void;
  clickHandlerRef: (e: Event) => void;
  outsideClickHandlerRef: (e: Event) => void;
  touchStartHandlerRef: (e: Event) => void;
  touchMoveHandlerRef: (e: Event) => void;
  touchEndHandlerRef: (e: Event) => void;
  touchCancelHandlerRef: (e: Event) => void;
  scrollHandlerRef: () => void;
}

function attachListenersByMode(
  svgContainer: Element,
  isTouch: boolean,
  currentTooltipSetting: number,
  refs: TooltipListenerRefs
): void {
  const {
    clickHandlerRef,
    outsideClickHandlerRef,
    scrollHandlerRef,
    touchStartHandlerRef,
    touchMoveHandlerRef,
    touchEndHandlerRef,
    touchCancelHandlerRef,
    mouseEnterHandlerRef,
    mouseMoveHandlerRef,
    mouseLeaveHandlerRef,
  } = refs;

  if (isTouch) {
    if (currentTooltipSetting === 1) {
      svgContainer.addEventListener('click', clickHandlerRef);
      document.addEventListener('click', outsideClickHandlerRef);
      window.addEventListener('scroll', scrollHandlerRef, { passive: true });
      return;
    }
    if (currentTooltipSetting === 2) {
      svgContainer.addEventListener('touchstart', touchStartHandlerRef, { passive: true });
      svgContainer.addEventListener('touchmove', touchMoveHandlerRef, { passive: false });
      svgContainer.addEventListener('touchend', touchEndHandlerRef, { passive: true });
      svgContainer.addEventListener('touchcancel', touchCancelHandlerRef, { passive: true });
      window.addEventListener('scroll', scrollHandlerRef, { passive: true });
    }
    return;
  }

  svgContainer.addEventListener('mouseenter', mouseEnterHandlerRef);
  svgContainer.addEventListener('mousemove', mouseMoveHandlerRef);
  svgContainer.addEventListener('mouseleave', mouseLeaveHandlerRef);
  if (currentTooltipSetting === 1) {
    svgContainer.addEventListener('click', clickHandlerRef);
    document.addEventListener('click', outsideClickHandlerRef);
    window.addEventListener('scroll', scrollHandlerRef, { passive: true });
  }
  if (currentTooltipSetting === 2) {
    svgContainer.addEventListener('touchstart', touchStartHandlerRef, { passive: true });
    svgContainer.addEventListener('touchmove', touchMoveHandlerRef, { passive: false });
    svgContainer.addEventListener('touchend', touchEndHandlerRef, { passive: true });
    svgContainer.addEventListener('touchcancel', touchCancelHandlerRef, { passive: true });
    window.addEventListener('scroll', scrollHandlerRef, { passive: true });
  }
}

export function attachTooltipToSvg(
  svgContainer: Element,
  isFullScreen = false,
  currentTooltipSetting: number,
  tooltipLegends?: TooltipLegends
) {
  const isTouch = isTouchDevice();
  if (isTouch && currentTooltipSetting !== 1 && currentTooltipSetting !== 2) {
    return;
  }

  const existingData = (svgContainer as ExtendedElement)._tooltipData;
  if (existingData) {
    removeExistingTooltipListeners(svgContainer, existingData);
  }

  const svg = svgContainer.querySelector('svg') as SVGElement | null;
  if (!svg) {
    logger.warn('[Tooltip] SVG element not found in container, skipping tooltip attachment');
    return;
  }

  svgContainer.setAttribute('data-chart-info', currentTooltipSetting.toString());
  logger.debug('[Tooltip] Setting data-chart-info', { currentTooltipSetting });

  const { tooltip, dottedLine, trackerBall, viewBoxWidth, viewBoxHeight } = createTooltipElements(
    svgContainer,
    svg
  );

  // Store event handler references for proper cleanup
  const mouseEnterHandlerRef = (e: Event) => mouseEnterHandler(e as MouseEvent, svgContainer);
  const mouseMoveHandlerRef = (e: Event) =>
    mouseMoveHandler(e as MouseEvent, svgContainer, isFullScreen);
  const mouseLeaveHandlerRef = (e: Event) => mouseLeaveHandler(e as MouseEvent, svgContainer);

  // Click handler for touch devices (technical info mode only, non-fullscreen)
  const clickHandlerRef = (e: Event) => handleChartClick(e as MouseEvent, svgContainer);
  const outsideClickHandlerRef = (e: Event) => handleOutsideClick(e as MouseEvent, svgContainer);

  // Touch handlers for price info mode (id === 2)
  const touchStartHandlerRef = (e: Event) => handlePriceTouchStart(e as TouchEvent, svgContainer);
  const touchMoveHandlerRef = (e: Event) => handlePriceTouchMove(e as TouchEvent, svgContainer);
  const touchEndHandlerRef = (e: Event) => handlePriceTouchEnd(e as TouchEvent, svgContainer);
  const touchCancelHandlerRef = (e: Event) => handlePriceTouchCancel(e as TouchEvent, svgContainer);
  const scrollHandlerRef = () => handleScrollDismiss(svgContainer);

  (svgContainer as ExtendedElement)._tooltipData = {
    svg: svg,
    tooltip: tooltip,
    dottedLine: dottedLine,
    trackerBall: trackerBall,
    viewBoxWidth: viewBoxWidth,
    viewBoxHeight: viewBoxHeight,
    isFullScreen: isFullScreen,
    currentTooltipSetting: currentTooltipSetting,
    tooltipLegends: tooltipLegends,
    mouseEnterHandlerRef: mouseEnterHandlerRef,
    mouseMoveHandlerRef: mouseMoveHandlerRef,
    mouseLeaveHandlerRef: mouseLeaveHandlerRef,
    clickHandlerRef: clickHandlerRef,
    outsideClickHandlerRef: outsideClickHandlerRef,
    activeTooltipData: null,
    isTooltipVisible: false,
    // Touch handlers for price info mode
    touchStartHandlerRef: touchStartHandlerRef,
    touchMoveHandlerRef: touchMoveHandlerRef,
    touchEndHandlerRef: touchEndHandlerRef,
    touchCancelHandlerRef: touchCancelHandlerRef,
    scrollHandlerRef: scrollHandlerRef,
    // Touch state
    touchStartX: undefined,
    touchStartY: undefined,
    isDragging: false,
    isPriceTooltipActive: false,
    holdTimeoutId: undefined,
  };

  applyTooltipWidthClass(tooltip, currentTooltipSetting);
  attachListenersByMode(svgContainer, isTouch, currentTooltipSetting, {
    mouseEnterHandlerRef,
    mouseMoveHandlerRef,
    mouseLeaveHandlerRef,
    clickHandlerRef,
    outsideClickHandlerRef,
    touchStartHandlerRef,
    touchMoveHandlerRef,
    touchEndHandlerRef,
    touchCancelHandlerRef,
    scrollHandlerRef,
  });
}

interface TooltipElements {
  tooltip: HTMLElement;
  dottedLine: SVGLineElement;
  trackerBall: SVGCircleElement;
  viewBoxWidth: number;
  viewBoxHeight: number;
}

function createTooltipElements(svgContainer: Element, svg: SVGElement): TooltipElements {
  const existingTooltips = svgContainer.querySelectorAll('.tooltip');
  existingTooltips.forEach((el) => svgContainer.removeChild(el));

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip chart-tooltip';
  tooltip.id = 'chart-tooltip';
  svgContainer.appendChild(tooltip);

  const existingDottedLine = svg.querySelector('.dotted-line');
  if (existingDottedLine) svg.removeChild(existingDottedLine);
  const existingTrackerBall = svg.querySelector('.tracker-ball');
  if (existingTrackerBall) svg.removeChild(existingTrackerBall);

  const dottedLine = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'line'
  ) as SVGLineElement;
  dottedLine.setAttribute('class', 'dotted-line');
  dottedLine.setAttribute('stroke', '#888');
  dottedLine.setAttribute('stroke-width', '1');
  dottedLine.setAttribute('stroke-dasharray', '3, 3');
  dottedLine.style.display = 'none';
  svg.appendChild(dottedLine);

  const trackerBall = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  ) as SVGCircleElement;
  trackerBall.setAttribute('class', 'tracker-ball');
  trackerBall.setAttribute('fill', '#f00');
  trackerBall.style.display = 'none';
  svg.appendChild(trackerBall);

  const viewBox = svg.getAttribute('viewBox')?.split(' ');
  const viewBoxWidth = viewBox
    ? parseFloat(viewBox[2])
    : parseFloat(svg.getAttribute('width') || '0');
  const viewBoxHeight = viewBox
    ? parseFloat(viewBox[3])
    : parseFloat(svg.getAttribute('height') || '0');

  return { tooltip, dottedLine, trackerBall, viewBoxWidth, viewBoxHeight };
}

function ensureDottedLineInSvg(data: TooltipData, svg: SVGElement): void {
  let dottedLine = data.dottedLine;
  if (dottedLine && svg.contains(dottedLine)) return;
  const existing = svg.querySelector('.dotted-line');
  if (existing) svg.removeChild(existing);
  dottedLine = document.createElementNS('http://www.w3.org/2000/svg', 'line') as SVGLineElement;
  dottedLine.setAttribute('class', 'dotted-line');
  dottedLine.setAttribute('stroke', '#888');
  dottedLine.setAttribute('stroke-width', '1');
  dottedLine.setAttribute('stroke-dasharray', '3, 3');
  dottedLine.style.display = 'none';
  svg.appendChild(dottedLine);
  data.dottedLine = dottedLine;
}

function ensureTrackerBallInSvg(data: TooltipData, svg: SVGElement): void {
  let trackerBall = data.trackerBall;
  if (trackerBall && svg.contains(trackerBall)) return;
  const existing = svg.querySelector('.tracker-ball');
  if (existing) svg.removeChild(existing);
  trackerBall = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  ) as SVGCircleElement;
  trackerBall.setAttribute('class', 'tracker-ball');
  trackerBall.setAttribute('fill', '#f00');
  trackerBall.style.display = 'none';
  svg.appendChild(trackerBall);
  data.trackerBall = trackerBall;
}

function ensureTooltipDivInContainer(data: TooltipData, svgContainer: Element): void {
  const tooltip = data.tooltip;
  if (tooltip && svgContainer.contains(tooltip)) return;
  const existing = svgContainer.querySelector('.tooltip');
  if (existing) svgContainer.removeChild(existing);
  const newTooltip = document.createElement('div');
  newTooltip.className = 'tooltip chart-tooltip';
  newTooltip.id = 'chart-tooltip';
  svgContainer.appendChild(newTooltip);
  data.tooltip = newTooltip;
  applyTooltipWidthClass(newTooltip, data.currentTooltipSetting ?? 2);
}

function refreshViewBoxDimensions(data: TooltipData, svg: SVGElement): void {
  if (data.viewBoxWidth && data.viewBoxHeight) return;
  const viewBox = svg.getAttribute('viewBox')?.split(' ');
  data.viewBoxWidth = viewBox
    ? parseFloat(viewBox[2])
    : parseFloat(svg.getAttribute('width') || '0');
  data.viewBoxHeight = viewBox
    ? parseFloat(viewBox[3])
    : parseFloat(svg.getAttribute('height') || '0');
}

// Helper function to ensure tooltip elements exist and recreate them if missing
function ensureTooltipElements(svgContainer: Element): boolean {
  const data = (svgContainer as ExtendedElement)._tooltipData;
  if (!data) return false;

  const svg = svgContainer.querySelector('svg') as SVGElement | null;
  if (!svg) return false;

  ensureDottedLineInSvg(data, svg);
  ensureTrackerBallInSvg(data, svg);
  ensureTooltipDivInContainer(data, svgContainer);
  refreshViewBoxDimensions(data, svg);
  return true;
}

function showChartElementTooltipOnEnter(
  chartElement: Element,
  tooltip: HTMLElement,
  e: MouseEvent,
  svgContainer: Element
): void {
  const title = chartElement.querySelector('title')?.textContent;
  tooltip.innerHTML = DOMPurify.sanitize(title || '', { ALLOWED_TAGS: [] });
  tooltip.style.opacity = '1';
  const containerRect = svgContainer.getBoundingClientRect();
  const relativeX = e.clientX - containerRect.left;
  const relativeY = e.clientY - containerRect.top;
  const isFullScreen = (svgContainer as ExtendedElement)._tooltipData?.isFullScreen || false;
  if (isFullScreen) {
    tooltip.style.position = 'fixed';
    tooltip.style.left = e.clientX + 15 + 'px';
    tooltip.style.top = e.clientY + 10 + 'px';
  } else {
    tooltip.style.position = 'absolute';
    tooltip.style.left = relativeX + 10 + 'px';
    tooltip.style.top = relativeY - tooltip.offsetHeight - 10 + 'px';
  }
  tooltip.style.display = 'block';
}

// Define the event handlers
export function mouseEnterHandler(e: MouseEvent, svgContainer: Element) {
  if (isTouchDevice()) return;

  if (!ensureTooltipElements(svgContainer)) {
    const data = (svgContainer as ExtendedElement)._tooltipData;
    if (data?.currentTooltipSetting !== undefined) {
      attachTooltipToSvg(svgContainer, data.isFullScreen || false, data.currentTooltipSetting);
    }
    return;
  }

  const target = e.target as Element;
  const tooltip = (svgContainer as ExtendedElement)._tooltipData?.tooltip;
  if (target.classList.contains('chartElement') && tooltip) {
    showChartElementTooltipOnEnter(target, tooltip, e, svgContainer);
  }
}

function hideTooltipAndLineAndBall(data: TooltipData): void {
  data.tooltip.style.display = 'none';
  if (data.dottedLine) data.dottedLine.style.display = 'none';
  if (data.trackerBall) data.trackerBall.style.display = 'none';
}

function mouseMoveModeTechnical(
  e: MouseEvent,
  svgContainer: Element,
  data: TooltipData,
  isFullScreen: boolean
): void {
  const svg = svgContainer.querySelector('svg') as SVGElement | null;
  if (!svg) {
    data.tooltip.style.display = 'none';
    return;
  }
  const chartElement = (e.target as Element)?.closest('.chartElement');
  if (chartElement) {
    showChartElementInfo(chartElement, data.tooltip, e, isFullScreen);
  } else {
    data.tooltip.style.display = 'none';
  }
}

function mouseMoveModePrice(
  e: MouseEvent,
  svgContainer: Element,
  data: TooltipData,
  isFullScreen: boolean
): void {
  if (!data.dottedLine || !data.trackerBall || !data.viewBoxWidth || !data.viewBoxHeight) return;
  updateTooltipAndDottedLine(
    svgContainer,
    e,
    data.viewBoxWidth,
    data.viewBoxHeight,
    data.tooltip,
    data.dottedLine,
    data.trackerBall,
    isFullScreen,
    data.tooltipLegends
  );
}

export function mouseMoveHandler(e: MouseEvent, svgContainer: Element, isFullScreen = false) {
  if (isTouchDevice()) return;

  const data = (e.currentTarget as ExtendedElement)._tooltipData;
  if (!data?.tooltip) return;

  ensureTooltipElements(svgContainer);
  const showChartInfo = svgContainer.getAttribute('data-chart-info');

  if (showChartInfo === '0') {
    hideTooltipAndLineAndBall(data);
  } else if (showChartInfo === '1') {
    mouseMoveModeTechnical(e, svgContainer, data, isFullScreen);
  } else if (showChartInfo === '2') {
    mouseMoveModePrice(e, svgContainer, data, isFullScreen);
  }
}

export function mouseLeaveHandler(e: MouseEvent, svgContainer: Element) {
  // Prevent on touch devices
  if (isTouchDevice()) {
    return;
  }

  const data = (svgContainer as ExtendedElement)._tooltipData;
  if (data) {
    data.tooltip.style.display = 'none';
    data.tooltip.style.opacity = '0';
    if (data.dottedLine) {
      data.dottedLine.style.display = 'none';
    }
    if (data.trackerBall) {
      data.trackerBall.style.display = 'none';
    }
  }
}

/**
 * Click handler for touch devices in technical info mode (id === 1)
 * Implements toggle behavior: tap to show tooltip, tap same element to hide
 * Note: This is only for non-fullscreen mode on touch devices
 */
/**
 * Handle clicks outside the chart to dismiss technical info tooltip (id === 1)
 */
export function handleOutsideClick(e: MouseEvent, svgContainer: Element) {
  const data = (svgContainer as ExtendedElement)._tooltipData;

  // Only handle for technical info mode (id === 1)
  if (!data || data.currentTooltipSetting !== 1 || !data.isTooltipVisible) {
    return;
  }

  const target = e.target as Element;

  // Check if click is outside the SVG container
  if (!svgContainer.contains(target)) {
    // Hide tooltip
    data.tooltip.style.display = 'none';
    data.tooltip.style.opacity = '0';
    data.activeTooltipData = null;
    data.isTooltipVisible = false;
  }
}

function dismissTechnicalTooltip(data: TooltipData): void {
  data.tooltip.style.display = 'none';
  data.tooltip.style.opacity = '0';
  data.activeTooltipData = null;
  data.isTooltipVisible = false;
}

function handleChartElementClick(
  chartElement: Element,
  clickedData: string,
  data: TooltipData,
  e: MouseEvent,
  svgContainer: Element
): void {
  const isSameTooltip = data.activeTooltipData === clickedData && data.isTooltipVisible;
  if (isSameTooltip) {
    dismissTechnicalTooltip(data);
  } else {
    showChartElementInfoClick(chartElement, data.tooltip, e, svgContainer);
    data.activeTooltipData = clickedData;
    data.isTooltipVisible = true;
  }
}

export function handleChartClick(e: MouseEvent, svgContainer: Element) {
  const data = (svgContainer as ExtendedElement)._tooltipData;
  if (!data || data.currentTooltipSetting !== 1) return;

  if (isTouchDevice()) e.stopPropagation();

  const chartElement = (e.target as Element).closest('.chartElement');
  const clickedData = chartElement?.getAttribute('data') ?? null;

  if (chartElement && clickedData) {
    handleChartElementClick(chartElement, clickedData, data, e, svgContainer);
  } else if (data.isTooltipVisible) {
    dismissTechnicalTooltip(data);
  }
}

/**
 * Show chart element info for click/touch events
 * Similar to showChartElementInfo but uses click event coordinates
 */
function showChartElementInfoClick(
  element: Element,
  tooltip: HTMLElement,
  e: MouseEvent,
  svgContainer: Element
) {
  const info = element.getAttribute('data');

  // Update the tooltip content
  const raw = info || 'No data available';

  const lines = raw
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean);

  const tooltipHtml = `<div class="text-left p-4 max-w-xs break-words text-sm leading-relaxed">${lines}</div>`;

  tooltip.innerHTML = DOMPurify.sanitize(tooltipHtml, {
    ALLOWED_TAGS: ['div', 'br', 'strong'],
    ALLOWED_ATTR: ['class'],
  });

  // Make sure tooltip is visible
  tooltip.style.display = 'block';
  tooltip.style.opacity = '1';
  tooltip.style.visibility = 'visible';
  tooltip.style.pointerEvents = 'auto';
  tooltip.style.zIndex = '9999';

  // Get the chart container's position relative to the viewport
  const containerRect = svgContainer.getBoundingClientRect();

  // Calculate click position relative to the chart container
  const relativeX = e.clientX - containerRect.left;
  const relativeY = e.clientY - containerRect.top;

  // Set tooltip width and ensure text wrapping
  tooltip.style.maxWidth = '300px';
  tooltip.style.width = 'auto';
  tooltip.style.wordWrap = 'break-word';
  tooltip.style.whiteSpace = 'normal';
  tooltip.style.overflowWrap = 'break-word';
  tooltip.style.hyphens = 'auto';

  // Get tooltip dimensions after content is set
  const tooltipWidth = tooltip.offsetWidth || 300;
  const tooltipHeight = tooltip.offsetHeight || 100;
  const xOffset = 15;
  const yOffset = 15;

  // Calculate tooltip position relative to the container
  let tooltipX = relativeX + xOffset;
  let tooltipY = relativeY - tooltipHeight - yOffset;

  // Prevent the tooltip from overflowing the container
  if (tooltipX + tooltipWidth > containerRect.width) {
    tooltipX = relativeX - tooltipWidth - xOffset;
  }
  if (tooltipX < 0) {
    tooltipX = xOffset;
  }
  if (tooltipY < 0) {
    tooltipY = relativeY + yOffset;
  }
  if (tooltipY + tooltipHeight > containerRect.height) {
    tooltipY = containerRect.height - tooltipHeight - yOffset;
  }

  // Set final tooltip position
  tooltip.style.position = 'absolute';
  tooltip.style.left = tooltipX + 'px';
  tooltip.style.top = tooltipY + 'px';
}

// ============================================================================
// TOUCH HANDLERS FOR PRICE INFO MODE (id === 2)
// ============================================================================

function computeTouchTooltipPosition(
  svgContainer: Element,
  lineX: number,
  viewBoxWidth: number,
  tooltip: HTMLElement
): { tooltipX: number; tooltipY: number } {
  const containerRect = svgContainer.getBoundingClientRect();
  const svg = svgContainer.querySelector('svg');
  let tooltipScreenX: number;
  if (svg) {
    const svgRect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    const scaleX = svgRect.width / (viewBox.width || viewBoxWidth);
    tooltipScreenX = lineX * scaleX;
  } else {
    tooltipScreenX = (lineX / viewBoxWidth) * containerRect.width;
  }

  tooltip.style.display = 'block';
  tooltip.style.position = 'absolute';
  tooltip.style.left = '-9999px';
  tooltip.style.top = '-9999px';
  const xOffset = 10;
  const tooltipWidth = tooltip.offsetWidth || 220;
  const fixedTopMargin = 20;
  const chartMiddle = containerRect.width / 2;

  let tooltipX =
    tooltipScreenX > chartMiddle
      ? tooltipScreenX - tooltipWidth - xOffset
      : tooltipScreenX + xOffset;
  if (tooltipX + tooltipWidth > containerRect.width) {
    tooltipX = tooltipScreenX - tooltipWidth - xOffset;
  }
  if (tooltipX < 0) {
    tooltipX = tooltipScreenX + xOffset;
    if (tooltipX + tooltipWidth > containerRect.width) {
      tooltipX = containerRect.width - tooltipWidth - xOffset;
    }
  }
  return { tooltipX, tooltipY: fixedTopMargin };
}

/**
 * Updates the price tooltip and dotted line based on touch coordinates
 * Similar to updateTooltipAndDottedLine but adapted for touch events
 */
function updatePriceTooltipForTouch(
  svgContainer: Element,
  clientX: number,
  clientY: number,
  data: TooltipData
) {
  const { viewBoxWidth, viewBoxHeight, tooltip, dottedLine, trackerBall, tooltipLegends } = data;

  const touchX = clientX + window.scrollX;
  const touchY = clientY + window.scrollY;
  const normalizedCoords = normalizeCoordinates(
    svgContainer,
    touchX,
    touchY,
    viewBoxWidth,
    viewBoxHeight
  );
  const closestLine = findClosestLine(svgContainer, normalizedCoords.x);

  if (!closestLine) return;

  const lineX = parseFloat(closestLine.getAttribute('x1') || '0');
  const lineData = closestLine.getAttribute('data')?.split(',') || [];
  const lineMidY = lineData[1];
  if (!lineMidY || isNaN(parseFloat(lineMidY))) return;

  tooltip.innerHTML = DOMPurify.sanitize(buildPriceTooltipHtml(lineData, tooltipLegends), {
    ALLOWED_TAGS: ['div', 'span'],
    ALLOWED_ATTR: ['class'],
  });

  const { tooltipX, tooltipY } = computeTouchTooltipPosition(
    svgContainer,
    lineX,
    viewBoxWidth,
    tooltip
  );
  tooltip.style.position = 'absolute';
  tooltip.style.left = tooltipX + 'px';
  tooltip.style.top = tooltipY + 'px';
  tooltip.style.display = 'block';
  tooltip.style.opacity = '1';
  tooltip.style.zIndex = '9999';

  showDottedLineAndBall(dottedLine, trackerBall, lineX, lineMidY, viewBoxHeight);
}

/**
 * Hides the price tooltip, dotted line, and tracker ball
 */
function hidePriceTooltip(data: TooltipData) {
  // Clear hold timeout if still pending
  if (data.holdTimeoutId) {
    clearTimeout(data.holdTimeoutId);
    data.holdTimeoutId = undefined;
  }
  data.tooltip.style.display = 'none';
  data.tooltip.style.opacity = '0';
  data.dottedLine.style.display = 'none';
  data.trackerBall.style.display = 'none';
  data.isPriceTooltipActive = false;
  data.isDragging = false;
}

/**
 * Touch start handler for price info mode (id === 2)
 * Initiates touch interaction and shows initial tooltip
 */
export function handlePriceTouchStart(e: TouchEvent, svgContainer: Element) {
  const data = (svgContainer as ExtendedElement)._tooltipData;

  if (!data || data.currentTooltipSetting !== 2) {
    return;
  }

  const touch = e.touches[0];
  if (!touch) return;

  // Clear any existing timeout
  if (data.holdTimeoutId) {
    clearTimeout(data.holdTimeoutId);
    data.holdTimeoutId = undefined;
  }

  // Store initial touch position
  data.touchStartX = touch.clientX;
  data.touchStartY = touch.clientY;
  data.isDragging = false;
  data.isPriceTooltipActive = false;

  // Start hold timeout - tooltip activates after 100ms hold
  const HOLD_DELAY = 100;
  data.holdTimeoutId = setTimeout(() => {
    data.holdTimeoutId = undefined;
    data.isDragging = true;
    data.isPriceTooltipActive = true;

    // Ensure dotted line and tracker ball exist before showing
    ensureTooltipElements(svgContainer);

    // Show tooltip at touch position
    if (data.touchStartX !== undefined && data.touchStartY !== undefined) {
      updatePriceTooltipForTouch(svgContainer, data.touchStartX, data.touchStartY, data);
    }
  }, HOLD_DELAY);
}

/**
 * Touch move handler for price info mode (id === 2)
 * Updates tooltip as user drags horizontally, allows vertical scrolling
 */
export function handlePriceTouchMove(e: TouchEvent, svgContainer: Element) {
  const data = (svgContainer as ExtendedElement)._tooltipData;

  if (!data || data.currentTooltipSetting !== 2) {
    return;
  }

  const touch = e.touches[0];
  if (!touch) return;

  // If hold timeout is still pending, check if user moved too much (scrolling intent)
  if (data.holdTimeoutId) {
    const deltaX = Math.abs(touch.clientX - (data.touchStartX || 0));
    const deltaY = Math.abs(touch.clientY - (data.touchStartY || 0));
    const MOVE_THRESHOLD = 10;

    // If user moved significantly, cancel the hold timeout and allow scrolling
    if (deltaX > MOVE_THRESHOLD || deltaY > MOVE_THRESHOLD) {
      clearTimeout(data.holdTimeoutId);
      data.holdTimeoutId = undefined;
      data.isDragging = false;
      data.isPriceTooltipActive = false;
    }
    return; // Don't prevent default while waiting for hold
  }

  // If tooltip is active (hold completed), prevent scroll and update tooltip
  if (data.isPriceTooltipActive) {
    e.preventDefault();
    updatePriceTooltipForTouch(svgContainer, touch.clientX, touch.clientY, data);
  }
}

/**
 * Touch end handler for price info mode (id === 2)
 * Hides tooltip when user lifts finger from the chart
 */
export function handlePriceTouchEnd(e: TouchEvent, svgContainer: Element) {
  const data = (svgContainer as ExtendedElement)._tooltipData;

  if (!data || data.currentTooltipSetting !== 2) {
    return;
  }

  // Cancel hold timeout if still pending
  if (data.holdTimeoutId) {
    clearTimeout(data.holdTimeoutId);
    data.holdTimeoutId = undefined;
  }

  // Hide tooltip when user lifts finger
  hidePriceTooltip(data);
}

/**
 * Touch cancel handler for price info mode (id === 2)
 * Hides tooltip when touch is interrupted (e.g., by system gesture)
 */
export function handlePriceTouchCancel(e: TouchEvent, svgContainer: Element) {
  const data = (svgContainer as ExtendedElement)._tooltipData;

  if (!data || data.currentTooltipSetting !== 2) {
    return;
  }

  // Cancel hold timeout if still pending
  if (data.holdTimeoutId) {
    clearTimeout(data.holdTimeoutId);
    data.holdTimeoutId = undefined;
  }

  // Hide tooltip when touch is cancelled
  hidePriceTooltip(data);
}

/**
 * Click handler for dismissing price tooltip when tapping outside the chart
 */
export function handlePriceTooltipDismiss(e: MouseEvent, svgContainer: Element) {
  const data = (svgContainer as ExtendedElement)._tooltipData;

  if (!data || data.currentTooltipSetting !== 2 || !data.isPriceTooltipActive) {
    return;
  }

  // Check if click/tap is outside the SVG container
  const containerRect = svgContainer.getBoundingClientRect();
  const isOutside =
    e.clientX < containerRect.left ||
    e.clientX > containerRect.right ||
    e.clientY < containerRect.top ||
    e.clientY > containerRect.bottom;

  if (isOutside) {
    hidePriceTooltip(data);
  }
}

/**
 * Scroll handler to dismiss price tooltip when page scrolls
 */
export function handleScrollDismiss(svgContainer: Element) {
  const data = (svgContainer as ExtendedElement)._tooltipData;

  if (!data) {
    return;
  }

  // Handle technical info mode (id === 1)
  if (data.currentTooltipSetting === 1 && data.isTooltipVisible) {
    data.tooltip.style.display = 'none';
    data.tooltip.style.opacity = '0';
    data.activeTooltipData = null;
    data.isTooltipVisible = false;
    return;
  }

  // Handle price info mode (id === 2)
  if (data.currentTooltipSetting === 2 && data.isPriceTooltipActive && !data.isDragging) {
    hidePriceTooltip(data);
  }
}

export function attachOrDetachEventListeners(
  svgContainer: Element,
  shouldAttach: boolean,
  isFullScreen = false,
  currentTooltipSetting: number,
  tooltipLegends?: TooltipLegends
) {
  // For touch devices, allow technical info mode (id === 1) and price info mode (id === 2)
  if (isTouchDevice() && currentTooltipSetting !== 1 && currentTooltipSetting !== 2) {
    return;
  }

  if (shouldAttach) {
    // attachTooltipToSvg already adds event listeners, so we don't need to add them again
    attachTooltipToSvg(svgContainer, isFullScreen, currentTooltipSetting, tooltipLegends);
  } else {
    // Detach event listeners
    detachEventListeners(svgContainer);
  }
}

function hideTooltipElements(data: TooltipData): void {
  if (data.tooltip) {
    data.tooltip.style.display = 'none';
    data.tooltip.style.opacity = '0';
  }
  if (data.dottedLine) data.dottedLine.style.display = 'none';
  if (data.trackerBall) data.trackerBall.style.display = 'none';
}

export function detachEventListeners(svgContainer: Element) {
  const data = (svgContainer as ExtendedElement)._tooltipData;
  if (!data) return;

  removeExistingTooltipListeners(svgContainer, data);
  data.activeTooltipData = null;
  data.isTooltipVisible = false;
  data.isDragging = false;
  data.isPriceTooltipActive = false;
  data.touchStartX = undefined;
  data.touchStartY = undefined;
  hideTooltipElements(data);
}

//<-------------------------------- KEEPING FOR FUTURE USE -------------------------------->
/**
 * Extracts tooltip information from SVG elements
 * @param svgContainer - The SVG container element
 * @returns Array of tooltip data objects
 */
/* export function extractTooltipsFromSvg(svgContainer: Element): Array<{
    element: Element;
    type: string;
    data: Record<string, unknown>;
    position: { x: number; y: number };
    content: string;
  }> {
    const tooltips: Array<{
      element: Element;
      type: string;
      data: Record<string, unknown>;
      position: { x: number; y: number };
      content: string;
    }> = [];
  
    const svg = svgContainer.querySelector('svg') as SVGElement;
    if (!svg) return tooltips;
  
    // Extract pivot points (circles with pivot point classes)
    const pivotPoints = svg.querySelectorAll('circle.imgsvg_pivotPoint');
    pivotPoints.forEach((circle) => {
      const cx = parseFloat(circle.getAttribute('cx') || '0');
      const cy = parseFloat(circle.getAttribute('cy') || '0');
      const classes = circle.getAttribute('class') || '';
  
      let pivotType = 'pivot';
      if (classes.includes('imgsvg_pivotPointTop')) {
        pivotType = 'pivot-top';
      } else if (classes.includes('imgsvg_pivotPointBottom')) {
        pivotType = 'pivot-bottom';
      }
  
      tooltips.push({
        element: circle,
        type: pivotType,
        data: {
          cx,
          cy,
          r: parseFloat(circle.getAttribute('r') || '0'),
          classes: classes.split(' '),
        },
        position: { x: cx, y: cy },
        content: `${pivotType}: (${cx}, ${cy})`,
      });
    });
  
    // Extract price line data from polyline elements
    const priceLines = svg.querySelectorAll('polyline.imgsvg_priceLine');
    priceLines.forEach((polyline) => {
      const points = polyline.getAttribute('points');
      if (points) {
        const pointPairs = points.split(' ').map((pair) => {
          const [x, y] = pair.split(',').map(Number);
          return { x, y };
        });
  
        tooltips.push({
          element: polyline,
          type: 'price-line',
          data: {
            points: pointPairs,
            pointCount: pointPairs.length,
          },
          position: { x: pointPairs[0]?.x || 0, y: pointPairs[0]?.y || 0 },
          content: `Price line with ${pointPairs.length} points`,
        });
      }
    });
  
    // Extract text elements (labels, values)
    const textElements = svg.querySelectorAll('text');
    textElements.forEach((text) => {
      const x = parseFloat(text.getAttribute('x') || '0');
      const y = parseFloat(text.getAttribute('y') || '0');
      const content = text.textContent || '';
      const classes = text.getAttribute('class') || '';
  
      tooltips.push({
        element: text,
        type: 'text-label',
        data: {
          x,
          y,
          content,
          classes: classes.split(' '),
        },
        position: { x, y },
        content: content,
      });
    });
  
    // Extract grid lines
    const gridLines = svg.querySelectorAll('line.imgsvg_gridLineMajor, line.imgsvg_gridLineMinor');
    gridLines.forEach((line) => {
      const x1 = parseFloat(line.getAttribute('x1') || '0');
      const y1 = parseFloat(line.getAttribute('y1') || '0');
      const x2 = parseFloat(line.getAttribute('x2') || '0');
      const y2 = parseFloat(line.getAttribute('y2') || '0');
      const classes = line.getAttribute('class') || '';
  
      tooltips.push({
        element: line,
        type: 'grid-line',
        data: {
          x1,
          y1,
          x2,
          y2,
          classes: classes.split(' '),
        },
        position: { x: (x1 + x2) / 2, y: (y1 + y2) / 2 },
        content: `Grid line: (${x1},${y1}) to (${x2},${y2})`,
      });
    });
  
    // Extract any elements with data attributes
    const dataElements = svg.querySelectorAll('[data]');
    dataElements.forEach((element) => {
      const data = element.getAttribute('data');
      const rect = element.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
  
      tooltips.push({
        element,
        type: 'data-element',
        data: { data, tagName: element.tagName },
        position: {
          x: rect.left - svgRect.left,
          y: rect.top - svgRect.top,
        },
        content: `Data: ${data}`,
      });
    });
  
    // Extract elements with title tags (tooltip content)
    const titleElements = svg.querySelectorAll('*[title]');
    titleElements.forEach((element) => {
      const title = element.getAttribute('title');
      const rect = element.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
  
      tooltips.push({
        element,
        type: 'title-element',
        data: { title, tagName: element.tagName },
        position: {
          x: rect.left - svgRect.left,
          y: rect.top - svgRect.top,
        },
        content: title || '',
      });
    });
  
    return tooltips;
  } */

/**
 * Gets tooltip data for a specific element at given coordinates
 * @param svgContainer - The SVG container element
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param tolerance - Tolerance for finding nearby elements (default: 10)
 * @returns Tooltip data for the closest element or null
 */
/* export function getTooltipAtCoordinates(
    svgContainer: Element,
    x: number,
    y: number,
    tolerance: number = 10
  ): {
    element: Element;
    type: string;
    data: Record<string, unknown>;
    position: { x: number; y: number };
    content: string;
  } | null {
    const tooltips = extractTooltipsFromSvg(svgContainer);
  
    let closestTooltip = null;
    let minDistance = Number.POSITIVE_INFINITY;
  
    tooltips.forEach((tooltip) => {
      const distance = Math.sqrt(
        Math.pow(tooltip.position.x - x, 2) + Math.pow(tooltip.position.y - y, 2)
      );
  
      if (distance < minDistance && distance <= tolerance) {
        minDistance = distance;
        closestTooltip = tooltip;
      }
    });
  
    return closestTooltip;
  } */
