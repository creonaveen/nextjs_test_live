// tooltip-optimized.ts
// Drop-in optimized tooltip code with proper Mode-1 HTML rendering.
/* eslint-disable max-lines, max-lines-per-function, max-params, max-statements -- chart tooltip test module; refactor in follow-up */

type TooltipState = {
  svg: SVGElement;
  tooltip: HTMLElement;
  htmlContainer: HTMLElement; // NEW - dedicated HTML container for mode 1
  ttDate: HTMLElement;
  ttPrice: HTMLElement;
  ttVolume: HTMLElement;
  dottedLine: SVGLineElement | null;
  trackerBall: SVGCircleElement | null;
  viewBoxWidth: number;
  viewBoxHeight: number;
  rafId: number | null;
  latestEvent: MouseEvent | null;
  isFullScreen: boolean;
  currentTooltipSetting: number;
};

const stateMap = new WeakMap<Element, TooltipState>();

function isTouchDevice(): boolean {
  const hasCoarsePointer =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(pointer: coarse)').matches;
  const isMobileUA =
    typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return hasCoarsePointer || isMobileUA;
}

function getExistingState(svgContainer: Element, svg: SVGElement | null): TooltipState | null {
  if (!svg) return null;
  const existing = stateMap.get(svgContainer);
  return existing && existing.svg === svg ? existing : null;
}

function createOrReuseElements(svgContainer: Element): TooltipState | null {
  const svg = svgContainer.querySelector('svg') as SVGElement | null;
  if (!svg) return null;
  const existing = getExistingState(svgContainer, svg);
  if (existing) return existing;

  // Remove any previous tooltip node (safe)
  const existingTooltip = svgContainer.querySelector('.chart-tooltip');
  if (existingTooltip && existingTooltip.parentNode)
    existingTooltip.parentNode.removeChild(existingTooltip);

  // Create tooltip wrapper element
  const tooltip = document.createElement('div');
  tooltip.className = 'chart-tooltip tooltip';
  tooltip.style.position = 'absolute';
  tooltip.style.display = 'none';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.zIndex = '9999';
  tooltip.style.maxWidth = '420px';
  tooltip.style.boxSizing = 'border-box';
  tooltip.style.wordBreak = 'break-word';

  // HTML container for mode 1 (renders raw HTML)
  const htmlContainer = document.createElement('div');
  htmlContainer.className = 'chart-tooltip-html';
  // Inline styles to match your old appearance (adjust as needed)
  htmlContainer.style.background = 'var(--grey-800)';
  htmlContainer.style.color = 'var(--white)';
  htmlContainer.style.padding = '10px 14px';
  htmlContainer.style.borderRadius = '12px';
  htmlContainer.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
  htmlContainer.style.fontSize = '14px';
  htmlContainer.style.fontWeight = '700';
  htmlContainer.style.lineHeight = '1.25';
  htmlContainer.style.display = 'none';
  htmlContainer.style.maxWidth = '420px';
  htmlContainer.style.whiteSpace = 'normal';
  htmlContainer.style.wordBreak = 'break-word';
  htmlContainer.style.overflowWrap = 'break-word';
  htmlContainer.style.pointerEvents = 'auto'; // allow links if any (read-only)

  // Structured content for mode 2 (fast text updates)
  const content = document.createElement('div');
  content.className = 'chart-tooltip-content p-4';
  content.style.display = 'none'; // default hidden; will toggle per mode
  const dateEl = document.createElement('div');
  dateEl.className = 'tt-date text-sm font-bold';
  const priceEl = document.createElement('div');
  priceEl.className = 'tt-price text-sm  font-bold';
  const volEl = document.createElement('div');
  volEl.className = 'tt-volume text-sm font-bold';

  content.appendChild(dateEl);
  content.appendChild(priceEl);
  content.appendChild(volEl);

  // Append both containers; we will toggle visibility by mode
  tooltip.appendChild(htmlContainer);
  tooltip.appendChild(content);
  svgContainer.appendChild(tooltip);

  // Dotted line and tracker ball (SVG)
  const dottedLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  dottedLine.setAttribute('class', 'dotted-line');
  dottedLine.style.display = 'none';
  dottedLine.setAttribute('stroke-dasharray', '4 4');
  svg.appendChild(dottedLine);

  const trackerBall = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  trackerBall.setAttribute('class', 'tracker-ball');
  trackerBall.style.display = 'none';
  svg.appendChild(trackerBall);

  const viewBoxAttr = svg.getAttribute('viewBox');
  let viewBoxWidth = 0,
    viewBoxHeight = 0;
  if (viewBoxAttr) {
    const parts = viewBoxAttr.split(/\s+/);
    viewBoxWidth = parseFloat(parts[2]) || 0;
    viewBoxHeight = parseFloat(parts[3]) || 0;
  } else {
    viewBoxWidth = parseFloat(svg.getAttribute('width') || '0');
    viewBoxHeight = parseFloat(svg.getAttribute('height') || '0');
  }

  const newState: TooltipState = {
    svg,
    tooltip,
    htmlContainer,
    ttDate: dateEl,
    ttPrice: priceEl,
    ttVolume: volEl,
    dottedLine,
    trackerBall,
    viewBoxWidth,
    viewBoxHeight,
    rafId: null,
    latestEvent: null,
    isFullScreen: false,
    currentTooltipSetting: 2, // default
  };

  stateMap.set(svgContainer, newState);
  return newState;
}

// Helper to safely get numeric from attribute
function getAttrNumber(el: Element | null, attr: string, fallback = 0): number {
  if (!el) return fallback;
  const val = el.getAttribute(attr);
  return val ? parseFloat(val) : fallback;
}

/**
 * Schedule processing once per animation frame. Mouse events set latestEvent + schedule rAF.
 */
function scheduleProcess(svgContainer: Element) {
  const st = stateMap.get(svgContainer);
  if (!st) return;
  if (st.rafId != null) return; // already scheduled

  st.rafId = requestAnimationFrame(() => {
    st.rafId = null;
    processLatestEvent(svgContainer);
  });
}

// eslint-disable-next-line complexity -- tooltip mode 1 DOM logic; refactor in follow-up
function processMode1(
  st: TooltipState,
  e: MouseEvent,
  clientX: number,
  clientY: number,
  containerRect: DOMRect
): void {
  const hoveredElement = (e.target as Element)?.closest
    ? (e.target as Element).closest('.chartElement')
    : null;

  if (!hoveredElement) {
    st.tooltip.style.display = 'none';
    if (st.dottedLine) st.dottedLine.style.display = 'none';
    if (st.trackerBall) st.trackerBall.style.display = 'none';
    return;
  }

  const titleHTML =
    hoveredElement.querySelector('title')?.innerHTML || hoveredElement.getAttribute('data') || '';
  st.htmlContainer.innerHTML = titleHTML;
  st.htmlContainer.style.display = 'block';
  (st.tooltip.querySelector('.chart-tooltip-content') as HTMLElement).style.display = 'none';
  st.tooltip.style.display = 'block';
  st.tooltip.style.opacity = '1';

  const ttRect = st.htmlContainer.getBoundingClientRect();
  const tooltipWidth = ttRect.width || st.htmlContainer.offsetWidth || 220;
  const tooltipHeight = ttRect.height || st.htmlContainer.offsetHeight || 100;
  const relativeX = clientX - containerRect.left;
  const relativeY = clientY - containerRect.top;
  const xOffset = 12;
  const yOffset = 10;
  let tooltipX = relativeX + xOffset;
  let tooltipY = relativeY - tooltipHeight - yOffset;

  if (st.isFullScreen) {
    tooltipX = clientX + xOffset;
    tooltipY = clientY - tooltipHeight + yOffset;
  }
  if (tooltipX + tooltipWidth > containerRect.width) tooltipX = relativeX - tooltipWidth - xOffset;
  if (tooltipX < 0) tooltipX = xOffset;
  if (tooltipY < 0) tooltipY = relativeY + yOffset;
  if (tooltipY + tooltipHeight > containerRect.height)
    tooltipY = containerRect.height - tooltipHeight - yOffset;

  st.tooltip.style.left = `${tooltipX}px`;
  st.tooltip.style.top = `${tooltipY}px`;
  st.tooltip.style.position = 'absolute';
  st.tooltip.style.display = 'block';
  if (st.dottedLine) st.dottedLine.style.display = 'none';
  if (st.trackerBall) st.trackerBall.style.display = 'none';
}

// eslint-disable-next-line complexity -- tooltip mode 2 DOM logic; refactor in follow-up
function processMode2(
  st: TooltipState,
  normalizedX: number,
  clientX: number,
  clientY: number,
  containerRect: DOMRect,
  svg: SVGElement
): void {
  const lines = svg.querySelectorAll('.imgsvg_verticalHooverLine');
  let closestLine: Element | null = null;
  let minDist = Infinity;
  lines.forEach((line) => {
    const x1 = getAttrNumber(line, 'x1', 0);
    const dist = Math.abs(normalizedX - x1);
    if (dist < minDist) {
      minDist = dist;
      closestLine = line;
    }
  });

  if (!closestLine || st.currentTooltipSetting === 0) {
    st.tooltip.style.display = 'none';
    if (st.dottedLine) st.dottedLine.style.display = 'none';
    if (st.trackerBall) st.trackerBall.style.display = 'none';
    return;
  }

  const rawData = (closestLine as Element).getAttribute('data') || '';
  const dataParts = rawData.split(',');
  const dateStr = dataParts[2] || '';
  const priceStr = dataParts[3] || '';
  const volStr = dataParts[4] || '';

  st.htmlContainer.style.display = 'none';
  (st.tooltip.querySelector('.chart-tooltip-content') as HTMLElement).style.display = 'block';
  st.ttDate.textContent = `Date: ${dateStr}`;
  st.ttPrice.textContent = `Price: ${priceStr}`;
  st.ttVolume.textContent = `Volume: ${volStr}`;
  st.tooltip.style.display = 'block';
  st.tooltip.style.opacity = '1';

  const contentEl = st.tooltip.querySelector('.chart-tooltip-content') as HTMLElement;
  const contentRect = contentEl.getBoundingClientRect();
  const tooltipWidth = contentRect.width || contentEl.offsetWidth || 220;
  const tooltipHeight = contentRect.height || contentEl.offsetHeight || 100;
  const relativeX = clientX - containerRect.left;
  const relativeY = clientY - containerRect.top;
  const xOffset = 10;
  const yOffset = 10;
  let tooltipX = relativeX + xOffset;
  let tooltipY = relativeY - tooltipHeight - yOffset;

  if (st.isFullScreen) {
    tooltipX = clientX + xOffset;
    tooltipY = clientY - tooltipHeight + yOffset;
  }
  if (tooltipX + tooltipWidth > containerRect.width) tooltipX = relativeX - tooltipWidth - xOffset;
  if (tooltipX < 0) tooltipX = xOffset;
  if (tooltipY < 0) tooltipY = relativeY + yOffset;
  if (tooltipY + tooltipHeight > containerRect.height)
    tooltipY = containerRect.height - tooltipHeight - yOffset;

  const lineXView = getAttrNumber(closestLine, 'x1', 0);
  st.tooltip.style.left = `${tooltipX}px`;
  st.tooltip.style.top = `${tooltipY}px`;
  st.tooltip.style.position = 'absolute';
  st.tooltip.style.display = 'block';

  if (st.dottedLine) {
    st.dottedLine.setAttribute('x1', `${lineXView}`);
    st.dottedLine.setAttribute('x2', `${lineXView}`);
    st.dottedLine.setAttribute('y1', `0`);
    st.dottedLine.setAttribute('y2', `${st.viewBoxHeight}`);
    st.dottedLine.style.display = 'block';
  }
  if (st.trackerBall) {
    const lineMidY = dataParts[1] || '0';
    st.trackerBall.setAttribute('cx', `${lineXView}`);
    st.trackerBall.setAttribute('cy', `${lineMidY}`);
    st.trackerBall.setAttribute('r', '6');
    st.trackerBall.style.display = 'block';
  }
}

/**
 * This function does all expensive reads first, then writes.
 * It now supports both:
 *  - Mode 1: HTML element-level tooltip (uses htmlContainer.innerHTML)
 *  - Mode 2: vertical-line tooltip (uses structured content)
 */
function processLatestEvent(svgContainer: Element) {
  const st = stateMap.get(svgContainer);
  if (!st || !st.latestEvent) return;
  const e = st.latestEvent;
  st.latestEvent = null;

  const svg = st.svg;
  const svgRect = svg.getBoundingClientRect();
  const containerRect = svgContainer.getBoundingClientRect();
  const clientX = e.clientX;
  const clientY = e.clientY;
  const containerWidth = svgRect.width || 1;
  const normalizedX = ((clientX - svgRect.left) / containerWidth) * st.viewBoxWidth;

  if (st.currentTooltipSetting === 1) {
    processMode1(st, e, clientX, clientY, containerRect);
    return;
  }
  processMode2(st, normalizedX, clientX, clientY, containerRect, svg);
}

/**
 * Attach optimized handlers
 */
export function attachOrDetachEventListenersOptimized(
  svgContainer: Element,
  shouldAttach: boolean,
  isFullScreen = false,
  currentTooltipSetting = 2
) {
  if (isTouchDevice()) return;

  // Clean up first
  detachEventListenersOptimized(svgContainer);

  if (!shouldAttach) return;

  const st = createOrReuseElements(svgContainer);
  if (!st) return;

  st.isFullScreen = isFullScreen;
  st.currentTooltipSetting = currentTooltipSetting;

  const mouseEnter = (ev: Event) => {
    if (isTouchDevice()) return;
    const e = ev as MouseEvent;
    const hovered = (e.target as Element)?.closest('.chartElement');
    if (!hovered) return;

    // Prefill quick content for immediate feedback
    if (st.currentTooltipSetting === 1) {
      const titleHTML =
        hovered.querySelector('title')?.innerHTML || hovered.getAttribute('data') || '';
      st.htmlContainer.innerHTML = titleHTML;
      st.htmlContainer.style.display = 'block';
      (st.tooltip.querySelector('.chart-tooltip-content') as HTMLElement).style.display = 'none';
      st.tooltip.style.display = 'block';
    } else {
      // For mode 2 we show structured content later in RAF
      (st.tooltip.querySelector('.chart-tooltip-content') as HTMLElement).style.display = 'block';
      st.htmlContainer.style.display = 'none';
      st.tooltip.style.display = 'block';
    }

    st.latestEvent = e;
    scheduleProcess(svgContainer);
  };

  const mouseMove = (ev: Event) => {
    if (isTouchDevice()) return;
    st.latestEvent = ev as MouseEvent;
    scheduleProcess(svgContainer);
  };

  const mouseLeave = () => {
    if (isTouchDevice()) return;
    // hide immediately
    st.tooltip.style.display = 'none';
    st.htmlContainer.style.display = 'none';
    (st.tooltip.querySelector('.chart-tooltip-content') as HTMLElement).style.display = 'none';
    if (st.dottedLine) st.dottedLine.style.display = 'none';
    if (st.trackerBall) st.trackerBall.style.display = 'none';
    // cancel pending frame
    if (st.rafId != null) {
      cancelAnimationFrame(st.rafId);
      st.rafId = null;
    }
    st.latestEvent = null;
  };

  // store handlers for cleanup
  const container = svgContainer as Element & {
    _mouseEnterHandler?: (e: MouseEvent) => void;
    _mouseMoveHandler?: (e: MouseEvent) => void;
    _mouseLeaveHandler?: (e: MouseEvent) => void;
  };
  container._mouseEnterHandler = mouseEnter;
  container._mouseMoveHandler = mouseMove;
  container._mouseLeaveHandler = mouseLeave;

  svgContainer.addEventListener('mouseenter', mouseEnter);
  svgContainer.addEventListener('mousemove', mouseMove);
  svgContainer.addEventListener('mouseleave', mouseLeave);
}

export function detachEventListenersOptimized(svgContainer: Element) {
  const container = svgContainer as Element & {
    _mouseEnterHandler?: (e: MouseEvent) => void;
    _mouseMoveHandler?: (e: MouseEvent) => void;
    _mouseLeaveHandler?: (e: MouseEvent) => void;
  };
  const mouseEnter = container._mouseEnterHandler;
  const mouseMove = container._mouseMoveHandler;
  const mouseLeave = container._mouseLeaveHandler;
  if (mouseEnter) {
    svgContainer.removeEventListener('mouseenter', mouseEnter as EventListener);
    delete container._mouseEnterHandler;
  }
  if (mouseMove) {
    svgContainer.removeEventListener('mousemove', mouseMove as EventListener);
    delete container._mouseMoveHandler;
  }
  if (mouseLeave) {
    svgContainer.removeEventListener('mouseleave', mouseLeave as EventListener);
    delete container._mouseLeaveHandler;
  }

  const st = stateMap.get(svgContainer);
  if (st) {
    if (st.rafId != null) {
      cancelAnimationFrame(st.rafId);
      st.rafId = null;
    }
    // hide visuals
    st.tooltip.style.display = 'none';
    st.htmlContainer.style.display = 'none';
    (st.tooltip.querySelector('.chart-tooltip-content') as HTMLElement).style.display = 'none';
    if (st.dottedLine) st.dottedLine.style.display = 'none';
    if (st.trackerBall) st.trackerBall.style.display = 'none';
  }
}
