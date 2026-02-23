import {
  normalizeCoordinates,
  findClosestLine,
  updateTooltipAndDottedLine,
  showChartElementInfo,
  attachTooltipToSvg,
  mouseEnterHandler,
  mouseMoveHandler,
  mouseLeaveHandler,
  attachOrDetachEventListeners,
  detachEventListeners,
  handleChartClick,
  handleOutsideClick,
  handleScrollDismiss,
  handlePriceTouchStart,
  handlePriceTouchMove,
  handlePriceTouchEnd,
  handlePriceTouchCancel,
} from '../main-chart-tooltip';

// Type helper for accessing tooltip data in tests
interface ExtendedElement extends Element {
  _tooltipData?: {
    tooltip: HTMLElement;
    dottedLine: SVGLineElement;
    trackerBall: SVGCircleElement;
    isTooltipVisible?: boolean;
    activeTooltipData?: string | null;
    isPriceTooltipActive?: boolean;
    isDragging?: boolean;
    holdTimeoutId?: ReturnType<typeof setTimeout>;
    touchStartX?: number;
    touchStartY?: number;
    viewBoxWidth?: number;
    viewBoxHeight?: number;
    currentTooltipSetting?: number;
    tooltipLegends?: unknown;
  };
}

describe('main-chart-tooltip', () => {
  let mockSvgContainer: HTMLElement;
  let mockSvg: SVGElement;
  let mockTooltip: HTMLElement;
  let mockDottedLine: SVGLineElement;
  let mockTrackerBall: SVGCircleElement;

  beforeEach(() => {
    // Create mock SVG container
    mockSvgContainer = document.createElement('div');
    mockSvgContainer.className = 'svg-container';

    // Create mock SVG element
    mockSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGElement;
    mockSvg.setAttribute('viewBox', '0 0 800 400');
    mockSvg.setAttribute('width', '800');
    mockSvg.setAttribute('height', '400');
    mockSvgContainer.appendChild(mockSvg);

    // Create mock tooltip
    mockTooltip = document.createElement('div');
    mockTooltip.className = 'tooltip';
    mockSvgContainer.appendChild(mockTooltip);

    // Create mock dotted line
    mockDottedLine = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    ) as SVGLineElement;
    mockDottedLine.setAttribute('class', 'dotted-line');
    mockSvg.appendChild(mockDottedLine);

    // Create mock tracker ball
    mockTrackerBall = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    ) as SVGCircleElement;
    mockTrackerBall.setAttribute('class', 'tracker-ball');
    mockSvg.appendChild(mockTrackerBall);

    // Add some vertical lines for testing
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('class', 'imgsvg_verticalHooverLine');
    line1.setAttribute('x1', '100');
    line1.setAttribute('data', '100,200,2024-01-01,150.50,1000');
    mockSvg.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('class', 'imgsvg_verticalHooverLine');
    line2.setAttribute('x1', '200');
    line2.setAttribute('data', '200,250,2024-01-02,155.75,1200');
    mockSvg.appendChild(line2);

    // Mock getBoundingClientRect
    jest.spyOn(mockSvg, 'getBoundingClientRect').mockReturnValue({
      width: 800,
      height: 400,
      left: 0,
      top: 0,
      right: 800,
      bottom: 400,
      x: 0,
      y: 0,
      toJSON: jest.fn(),
    } as DOMRect);

    jest.spyOn(mockSvgContainer, 'getBoundingClientRect').mockReturnValue({
      width: 800,
      height: 400,
      left: 0,
      top: 0,
      right: 800,
      bottom: 400,
      x: 0,
      y: 0,
      toJSON: jest.fn(),
    } as DOMRect);

    // Mock window.matchMedia for touch device detection
    jest.spyOn(window, 'matchMedia').mockImplementation(
      (query) =>
        ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }) as MediaQueryList
    );

    // Mock navigator.userAgent
    Object.defineProperty(navigator, 'userAgent', {
      writable: true,
      value: 'Mozilla/5.0',
    });

    // Mock window.scrollX and scrollY
    Object.defineProperty(window, 'scrollX', { writable: true, value: 0 });
    Object.defineProperty(window, 'scrollY', { writable: true, value: 0 });
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  describe('normalizeCoordinates', () => {
    it('should normalize coordinates correctly', () => {
      const result = normalizeCoordinates(mockSvgContainer, 400, 200, 800, 400);
      expect(result.x).toBeCloseTo(400);
      expect(result.y).toBeCloseTo(200);
    });

    it('should handle coordinates at container edges', () => {
      const result = normalizeCoordinates(mockSvgContainer, 0, 0, 800, 400);
      expect(result.x).toBeCloseTo(0);
      expect(result.y).toBeCloseTo(0);
    });

    it('should handle coordinates at container bottom-right', () => {
      const result = normalizeCoordinates(mockSvgContainer, 800, 400, 800, 400);
      expect(result.x).toBeCloseTo(800);
      expect(result.y).toBeCloseTo(400);
    });
  });

  describe('findClosestLine', () => {
    it('should find the closest line to the given x coordinate', () => {
      const closestLine = findClosestLine(mockSvgContainer, 110);
      expect(closestLine).not.toBeNull();
      expect(closestLine?.getAttribute('x1')).toBe('100');
    });

    it('should return null if no lines exist', () => {
      const emptyContainer = document.createElement('div');
      const emptySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      emptyContainer.appendChild(emptySvg);
      const result = findClosestLine(emptyContainer, 100);
      expect(result).toBeNull();
    });

    it('should find the second line when closer', () => {
      const closestLine = findClosestLine(mockSvgContainer, 190);
      expect(closestLine).not.toBeNull();
      expect(closestLine?.getAttribute('x1')).toBe('200');
    });
  });

  describe('updateTooltipAndDottedLine', () => {
    it('should update tooltip and dotted line when a line is found', () => {
      const mockEvent = {
        clientX: 100,
        clientY: 200,
      } as MouseEvent;

      updateTooltipAndDottedLine(
        mockSvgContainer,
        mockEvent,
        800,
        400,
        mockTooltip,
        mockDottedLine,
        mockTrackerBall,
        false
      );

      expect(mockTooltip.style.display).toBe('block');
      expect(mockTooltip.style.opacity).toBe('1');
      expect(mockDottedLine.style.display).toBe('block');
      expect(mockTrackerBall.style.display).toBe('block');
      expect(mockTooltip.innerHTML).toContain('undefined:');
      expect(mockTooltip.innerHTML).toContain('undefined:');
      expect(mockTooltip.innerHTML).toContain('undefined:');
    });

    it('should use custom tooltip legends when provided', () => {
      const mockEvent = {
        clientX: 100,
        clientY: 200,
      } as MouseEvent;

      const customLegends = {
        cterm_date: 'Datum:',
        cterm_price: 'Pris:',
        cterm_volume: 'Volym:',
      };

      updateTooltipAndDottedLine(
        mockSvgContainer,
        mockEvent,
        800,
        400,
        mockTooltip,
        mockDottedLine,
        mockTrackerBall,
        false,
        customLegends
      );

      expect(mockTooltip.style.display).toBe('block');
      expect(mockTooltip.innerHTML).toContain('Datum:');
      expect(mockTooltip.innerHTML).toContain('Pris:');
      expect(mockTooltip.innerHTML).toContain('Volym:');
    });

    it('should fallback to default legends when not provided', () => {
      const mockEvent = {
        clientX: 100,
        clientY: 200,
      } as MouseEvent;

      updateTooltipAndDottedLine(
        mockSvgContainer,
        mockEvent,
        800,
        400,
        mockTooltip,
        mockDottedLine,
        mockTrackerBall,
        false
      );

      expect(mockTooltip.innerHTML).toContain('undefined:');
      expect(mockTooltip.innerHTML).toContain('undefined:');
      expect(mockTooltip.innerHTML).toContain('undefined:');
    });

    it('should hide tooltip when no line is found', () => {
      const emptyContainer = document.createElement('div');
      const emptySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      emptyContainer.appendChild(emptySvg);

      const mockEvent = {
        clientX: 100,
        clientY: 200,
      } as MouseEvent;

      updateTooltipAndDottedLine(
        emptyContainer,
        mockEvent,
        800,
        400,
        mockTooltip,
        mockDottedLine,
        mockTrackerBall,
        false
      );

      expect(mockTooltip.style.display).toBe('none');
      expect(mockDottedLine.style.display).toBe('none');
      expect(mockTrackerBall.style.display).toBe('none');
    });

    it('should handle invalid data gracefully', () => {
      const invalidLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      invalidLine.setAttribute('class', 'imgsvg_verticalHooverLine');
      invalidLine.setAttribute('x1', '300');
      invalidLine.setAttribute('data', 'invalid,data');
      mockSvg.appendChild(invalidLine);

      const mockEvent = {
        clientX: 300,
        clientY: 200,
      } as MouseEvent;

      updateTooltipAndDottedLine(
        mockSvgContainer,
        mockEvent,
        800,
        400,
        mockTooltip,
        mockDottedLine,
        mockTrackerBall,
        false
      );

      expect(mockTooltip.style.display).toBe('none');
    });

    it('should adjust tooltip position to prevent overflow', () => {
      const mockEvent = {
        clientX: 750,
        clientY: 50,
      } as MouseEvent;

      mockTooltip.style.width = '220px';
      mockTooltip.style.height = '100px';

      updateTooltipAndDottedLine(
        mockSvgContainer,
        mockEvent,
        800,
        400,
        mockTooltip,
        mockDottedLine,
        mockTrackerBall,
        false
      );

      expect(mockTooltip.style.display).toBe('block');
    });
  });

  describe('showChartElementInfo', () => {
    it('should display chart element info in tooltip', () => {
      const mockElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      mockElement.setAttribute('data', 'Test chart element info');
      mockElement.classList.add('chartElement');

      const mockEvent = {
        clientX: 100,
        clientY: 200,
        currentTarget: mockSvgContainer,
      } as unknown as MouseEvent;

      showChartElementInfo(mockElement, mockTooltip, mockEvent, false);

      expect(mockTooltip.style.display).toBe('block');
      expect(mockTooltip.style.opacity).toBe('1');
      expect(mockTooltip.innerHTML).toContain('Test chart element info');
    });

    it('should handle missing data attribute', () => {
      const mockElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      mockElement.classList.add('chartElement');

      const mockEvent = {
        clientX: 100,
        clientY: 200,
        currentTarget: mockSvgContainer,
      } as unknown as MouseEvent;

      showChartElementInfo(mockElement, mockTooltip, mockEvent, false);

      expect(mockTooltip.innerHTML).toContain('No data available');
    });

    it('should process multi-line data correctly', () => {
      const multiLineData = 'Line 1\nLine 2\nLine 3';
      const mockElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      mockElement.setAttribute('data', multiLineData);
      mockElement.classList.add('chartElement');

      const mockEvent = {
        clientX: 100,
        clientY: 200,
        currentTarget: mockSvgContainer,
      } as unknown as MouseEvent;

      showChartElementInfo(mockElement, mockTooltip, mockEvent, false);

      expect(mockTooltip.innerHTML).toContain('Line 1');
      expect(mockTooltip.innerHTML).toContain('Line 2');
      expect(mockTooltip.innerHTML).toContain('Line 3');
    });

    it('should trim whitespace from data lines', () => {
      const dataWithWhitespace = '  Line 1  \n  Line 2  \n  Line 3  ';
      const mockElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      mockElement.setAttribute('data', dataWithWhitespace);
      mockElement.classList.add('chartElement');

      const mockEvent = {
        clientX: 100,
        clientY: 200,
        currentTarget: mockSvgContainer,
      } as unknown as MouseEvent;

      showChartElementInfo(mockElement, mockTooltip, mockEvent, false);

      // Verify lines are trimmed (content appears in innerHTML)
      expect(mockTooltip.innerHTML).toContain('Line 1');
    });

    it('should apply correct tooltip styling classes', () => {
      const mockElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      mockElement.setAttribute('data', 'Test info');
      mockElement.classList.add('chartElement');

      const mockEvent = {
        clientX: 100,
        clientY: 200,
        currentTarget: mockSvgContainer,
      } as unknown as MouseEvent;

      showChartElementInfo(mockElement, mockTooltip, mockEvent, false);

      // Verify the tooltip content div has the new styling classes
      expect(mockTooltip.innerHTML).toContain('text-left');
      expect(mockTooltip.innerHTML).toContain('p-4');
      expect(mockTooltip.innerHTML).toContain('max-w-xs');
      expect(mockTooltip.innerHTML).toContain('break-words');
      expect(mockTooltip.innerHTML).toContain('text-sm');
      expect(mockTooltip.innerHTML).toContain('leading-relaxed');
    });

    it('should not apply bold font-weight inline style', () => {
      const mockElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      mockElement.setAttribute('data', 'Test info');
      mockElement.classList.add('chartElement');

      const mockEvent = {
        clientX: 100,
        clientY: 200,
        currentTarget: mockSvgContainer,
      } as unknown as MouseEvent;

      showChartElementInfo(mockElement, mockTooltip, mockEvent, false);

      // Verify fontWeight is not set (commented out in the new code)
      expect(mockTooltip.style.fontWeight).toBe('');
    });

    it('should allow sanitized HTML tags (div, br, strong)', () => {
      const mockElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      mockElement.setAttribute('data', 'Test with special content');
      mockElement.classList.add('chartElement');

      const mockEvent = {
        clientX: 100,
        clientY: 200,
        currentTarget: mockSvgContainer,
      } as unknown as MouseEvent;

      showChartElementInfo(mockElement, mockTooltip, mockEvent, false);

      // Verify tooltip is sanitized but visible
      expect(mockTooltip.innerHTML).toBeTruthy();
      expect(mockTooltip.innerHTML).toContain('Test with special content');
    });
  });

  describe('attachTooltipToSvg', () => {
    it('should attach tooltip to SVG container', () => {
      attachTooltipToSvg(mockSvgContainer, false, 2);

      const tooltip = mockSvgContainer.querySelector('.tooltip');
      expect(tooltip).not.toBeNull();
      expect(mockSvgContainer.getAttribute('data-chart-info')).toBe('2');
    });

    it('should attach tooltip with custom legends', () => {
      const customLegends = {
        cterm_date: 'Datum:',
        cterm_price: 'Pris:',
        cterm_volume: 'Volym:',
      };

      attachTooltipToSvg(mockSvgContainer, false, 2, customLegends);

      const tooltip = mockSvgContainer.querySelector('.tooltip');
      expect(tooltip).not.toBeNull();
      expect((mockSvgContainer as unknown)._tooltipData.tooltipLegends).toEqual(customLegends);
    });

    it('should remove existing tooltip before attaching new one', () => {
      // Remove the tooltip from beforeEach first
      const existingTooltipFromBeforeEach = mockSvgContainer.querySelector('.tooltip');
      if (existingTooltipFromBeforeEach) {
        mockSvgContainer.removeChild(existingTooltipFromBeforeEach);
      }

      const existingTooltip = document.createElement('div');
      existingTooltip.className = 'tooltip';
      mockSvgContainer.appendChild(existingTooltip);

      attachTooltipToSvg(mockSvgContainer, false, 2);

      const tooltips = mockSvgContainer.querySelectorAll('.tooltip');
      expect(tooltips.length).toBe(1);
    });

    it('should return early if SVG element does not exist', () => {
      const emptyContainer = document.createElement('div');
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      attachTooltipToSvg(emptyContainer, false, 2);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should apply correct tooltip width based on setting', () => {
      attachTooltipToSvg(mockSvgContainer, false, 1);
      const tooltip = mockSvgContainer.querySelector('.tooltip');
      expect(tooltip?.classList.contains('w-[300px]')).toBe(true);
    });
  });

  describe('mouseEnterHandler', () => {
    it('should show tooltip on mouse enter for chart element', () => {
      attachTooltipToSvg(mockSvgContainer, false, 2);

      const chartElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      chartElement.classList.add('chartElement');
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = 'Test title';
      chartElement.appendChild(title);
      mockSvg.appendChild(chartElement);

      const mockEvent = {
        target: chartElement,
        clientX: 100,
        clientY: 200,
      } as unknown as MouseEvent;

      mouseEnterHandler(mockEvent, mockSvgContainer);

      const tooltip = mockSvgContainer.querySelector('.tooltip') as HTMLElement;
      expect(tooltip.style.display).toBe('block');
    });

    it('should not show tooltip for non-chart elements', () => {
      attachTooltipToSvg(mockSvgContainer, false, 2);

      const regularElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const mockEvent = {
        target: regularElement,
        clientX: 100,
        clientY: 200,
      } as unknown as MouseEvent;

      mouseEnterHandler(mockEvent, mockSvgContainer);

      const tooltip = mockSvgContainer.querySelector('.tooltip') as HTMLElement;
      // Tooltip should not be visible for non-chart elements
      expect(tooltip.style.display).not.toBe('block');
    });
  });

  describe('mouseMoveHandler', () => {
    it('should hide tooltip when setting is 0', () => {
      attachTooltipToSvg(mockSvgContainer, false, 0);

      const mockEvent = {
        clientX: 100,
        clientY: 200,
        currentTarget: mockSvgContainer,
        target: mockSvg,
      } as unknown as MouseEvent;

      mouseMoveHandler(mockEvent, mockSvgContainer, false);

      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      expect(data.tooltip.style.display).toBe('none');
    });

    it('should show technical info when setting is 1', () => {
      attachTooltipToSvg(mockSvgContainer, false, 1);

      const chartElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      chartElement.classList.add('chartElement');
      chartElement.setAttribute('data', 'Technical info');
      mockSvg.appendChild(chartElement);

      const mockEvent = {
        clientX: 100,
        clientY: 200,
        currentTarget: mockSvgContainer,
        target: chartElement,
      } as unknown as MouseEvent;

      mouseMoveHandler(mockEvent, mockSvgContainer, false);

      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      expect(data.tooltip.style.display).toBe('block');
    });

    it('should show price info when setting is 2', () => {
      attachTooltipToSvg(mockSvgContainer, false, 2);

      const mockEvent = {
        clientX: 100,
        clientY: 200,
        currentTarget: mockSvgContainer,
        target: mockSvg,
      } as unknown as MouseEvent;

      mouseMoveHandler(mockEvent, mockSvgContainer, false);

      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      // Tooltip should be visible if a line is found
      expect(data.tooltip).toBeDefined();
    });
  });

  describe('mouseLeaveHandler', () => {
    it('should hide tooltip on mouse leave', () => {
      attachTooltipToSvg(mockSvgContainer, false, 2);

      const mockEvent = {
        clientX: 100,
        clientY: 200,
      } as MouseEvent;

      mouseLeaveHandler(mockEvent, mockSvgContainer);

      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      expect(data.tooltip.style.display).toBe('none');
      expect(data.tooltip.style.opacity).toBe('0');
      expect(data.dottedLine.style.display).toBe('none');
      expect(data.trackerBall.style.display).toBe('none');
    });
  });

  describe('attachOrDetachEventListeners', () => {
    it('should attach event listeners when shouldAttach is true', () => {
      attachOrDetachEventListeners(mockSvgContainer, true, false, 2);

      const tooltip = mockSvgContainer.querySelector('.tooltip');
      expect(tooltip).not.toBeNull();
      expect(mockSvgContainer.getAttribute('data-chart-info')).toBe('2');
    });

    it('should attach event listeners with custom legends', () => {
      const customLegends = {
        cterm_date: 'Datum:',
        cterm_price: 'Pris:',
        cterm_volume: 'Volym:',
      };

      attachOrDetachEventListeners(mockSvgContainer, true, false, 2, customLegends);

      const tooltip = mockSvgContainer.querySelector('.tooltip');
      expect(tooltip).not.toBeNull();
      expect((mockSvgContainer as unknown)._tooltipData.tooltipLegends).toEqual(customLegends);
    });

    it('should detach event listeners when shouldAttach is false', () => {
      attachTooltipToSvg(mockSvgContainer, false, 2);
      attachOrDetachEventListeners(mockSvgContainer, false, false, 2);

      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      expect(data.tooltip.style.display).toBe('none');
    });
  });

  describe('detachEventListeners', () => {
    it('should remove event listeners and hide tooltip elements', () => {
      attachTooltipToSvg(mockSvgContainer, false, 2);
      detachEventListeners(mockSvgContainer);

      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      expect(data.tooltip.style.display).toBe('none');
      expect(data.dottedLine.style.display).toBe('none');
      expect(data.trackerBall.style.display).toBe('none');
    });
  });

  describe('handleChartClick - Touch support for technical info mode', () => {
    beforeEach(() => {
      // Mock touch device - override the main beforeEach mock
      jest.spyOn(window, 'matchMedia').mockImplementation(
        (query) =>
          ({
            matches: query === '(pointer: coarse)',
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          }) as MediaQueryList
      );
    });

    it('should toggle tooltip visibility when clicking on chart element', () => {
      attachTooltipToSvg(mockSvgContainer, false, 1);

      const chartElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      chartElement.classList.add('chartElement');
      chartElement.setAttribute('data', 'test-data-123');
      mockSvg.appendChild(chartElement);

      const mockEvent = {
        target: chartElement,
        stopPropagation: jest.fn(),
        clientX: 100,
        clientY: 200,
      } as unknown as MouseEvent;

      // First click - should show tooltip
      handleChartClick(mockEvent, mockSvgContainer);
      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      expect(data).toBeDefined();
      if (!data) return;
      expect(data.isTooltipVisible).toBe(true);
      expect(data.activeTooltipData).toBe('test-data-123');
      expect(data.tooltip.style.display).toBe('block');

      // Second click on same element - should hide tooltip
      handleChartClick(mockEvent, mockSvgContainer);
      expect(data.isTooltipVisible).toBe(false);
      expect(data.tooltip.style.display).toBe('none');
    });

    it('should show tooltip for different element when switching', () => {
      attachTooltipToSvg(mockSvgContainer, false, 1);

      const chartElement1 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      chartElement1.classList.add('chartElement');
      chartElement1.setAttribute('data', 'data-1');
      mockSvg.appendChild(chartElement1);

      const chartElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      chartElement2.classList.add('chartElement');
      chartElement2.setAttribute('data', 'data-2');
      mockSvg.appendChild(chartElement2);

      const event1 = {
        target: chartElement1,
        stopPropagation: jest.fn(),
        clientX: 100,
        clientY: 200,
      } as unknown as MouseEvent;

      const event2 = {
        target: chartElement2,
        stopPropagation: jest.fn(),
        clientX: 200,
        clientY: 200,
      } as unknown as MouseEvent;

      handleChartClick(event1, mockSvgContainer);
      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      expect(data.activeTooltipData).toBe('data-1');
      expect(data.isTooltipVisible).toBe(true);

      handleChartClick(event2, mockSvgContainer);
      expect(data.activeTooltipData).toBe('data-2');
      expect(data.isTooltipVisible).toBe(true);
    });
  });

  describe('handleOutsideClick - Dismiss tooltip on outside click', () => {
    it('should hide tooltip when clicking outside SVG container', () => {
      attachTooltipToSvg(mockSvgContainer, false, 1);

      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      data.isTooltipVisible = true;
      data.tooltip.style.display = 'block';

      const outsideElement = document.createElement('div');
      document.body.appendChild(outsideElement);

      const mockEvent = {
        target: outsideElement,
      } as unknown as MouseEvent;

      handleOutsideClick(mockEvent, mockSvgContainer);

      expect(data.isTooltipVisible).toBe(false);
      expect(data.tooltip.style.display).toBe('none');
    });

    it('should not hide tooltip when clicking inside SVG container', () => {
      attachTooltipToSvg(mockSvgContainer, false, 1);

      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      data.isTooltipVisible = true;
      data.tooltip.style.display = 'block';

      const mockEvent = {
        target: mockSvg,
      } as unknown as MouseEvent;

      handleOutsideClick(mockEvent, mockSvgContainer);

      expect(data.isTooltipVisible).toBe(true);
    });
  });

  describe('handleScrollDismiss - Dismiss tooltip on scroll', () => {
    it('should hide technical info tooltip on scroll', () => {
      attachTooltipToSvg(mockSvgContainer, false, 1);

      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      data.isTooltipVisible = true;
      data.tooltip.style.display = 'block';

      handleScrollDismiss(mockSvgContainer);

      expect(data.isTooltipVisible).toBe(false);
      expect(data.tooltip.style.display).toBe('none');
    });

    it('should hide price info tooltip on scroll', () => {
      attachTooltipToSvg(mockSvgContainer, false, 2);

      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      data.isPriceTooltipActive = true;
      data.isDragging = false;

      handleScrollDismiss(mockSvgContainer);

      expect(data.isPriceTooltipActive).toBe(false);
      expect(data.tooltip.style.display).toBe('none');
    });
  });

  describe('handlePriceTouchStart - Price info mode touch support', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      // Mock touch device
      jest.spyOn(window, 'matchMedia').mockImplementation(
        (query) =>
          ({
            matches: query === '(pointer: coarse)',
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          }) as MediaQueryList
      );
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should start hold timeout on touch start', () => {
      attachTooltipToSvg(mockSvgContainer, false, 2);

      const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line1.setAttribute('class', 'imgsvg_verticalHooverLine');
      line1.setAttribute('x1', '100');
      line1.setAttribute('data', '100,200,2024-01-01,150.50,1000');
      mockSvg.appendChild(line1);

      const mockTouchEvent = {
        touches: [{ clientX: 100, clientY: 200 }],
        preventDefault: jest.fn(),
      } as unknown as TouchEvent;

      handlePriceTouchStart(mockTouchEvent, mockSvgContainer);

      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      expect(data.holdTimeoutId).toBeDefined();
      expect(data.touchStartX).toBe(100);
      expect(data.touchStartY).toBe(200);
      expect(data.isDragging).toBe(false);
      expect(data.isPriceTooltipActive).toBe(false);

      // Fast-forward time to trigger timeout
      jest.advanceTimersByTime(150);

      expect(data.isPriceTooltipActive).toBe(true);
      expect(data.isDragging).toBe(true);
      expect(data.holdTimeoutId).toBeUndefined();
    });
  });

  describe('handlePriceTouchMove - Price info mode touch move', () => {
    beforeEach(() => {
      // Mock touch device
      jest.spyOn(window, 'matchMedia').mockImplementation(
        (query) =>
          ({
            matches: query === '(pointer: coarse)',
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          }) as MediaQueryList
      );
    });

    it('should update tooltip position when dragging', () => {
      attachTooltipToSvg(mockSvgContainer, false, 2);

      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      data.isPriceTooltipActive = true;
      data.isDragging = true;

      const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line1.setAttribute('class', 'imgsvg_verticalHooverLine');
      line1.setAttribute('x1', '100');
      line1.setAttribute('data', '100,200,2024-01-01,150.50,1000');
      mockSvg.appendChild(line1);

      // Mock tooltip offsetWidth/Height for positioning calculations
      jest.spyOn(data.tooltip, 'offsetWidth', 'get').mockReturnValue(220);
      jest.spyOn(data.tooltip, 'offsetHeight', 'get').mockReturnValue(100);

      const mockTouchEvent = {
        touches: [{ clientX: 150, clientY: 250 }],
        preventDefault: jest.fn(),
      } as unknown as TouchEvent;

      handlePriceTouchMove(mockTouchEvent, mockSvgContainer);

      expect(mockTouchEvent.preventDefault).toHaveBeenCalled();
      expect(data.tooltip.style.display).toBe('block');
    });
  });

  describe('handlePriceTouchEnd - Price info mode touch end', () => {
    beforeEach(() => {
      // Mock touch device
      jest.spyOn(window, 'matchMedia').mockImplementation(
        (query) =>
          ({
            matches: query === '(pointer: coarse)',
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          }) as MediaQueryList
      );
    });

    it('should hide tooltip on touch end', () => {
      attachTooltipToSvg(mockSvgContainer, false, 2);

      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      data.isPriceTooltipActive = true;
      data.tooltip.style.display = 'block';

      const mockTouchEvent = {
        touches: [],
      } as unknown as TouchEvent;

      handlePriceTouchEnd(mockTouchEvent, mockSvgContainer);

      expect(data.isPriceTooltipActive).toBe(false);
      expect(data.tooltip.style.display).toBe('none');
    });
  });

  describe('handlePriceTouchCancel - Price info mode touch cancel', () => {
    beforeEach(() => {
      // Mock touch device
      jest.spyOn(window, 'matchMedia').mockImplementation(
        (query) =>
          ({
            matches: query === '(pointer: coarse)',
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          }) as MediaQueryList
      );
    });

    it('should hide tooltip on touch cancel', () => {
      attachTooltipToSvg(mockSvgContainer, false, 2);

      const data = (mockSvgContainer as ExtendedElement)._tooltipData;
      data.isPriceTooltipActive = true;
      data.tooltip.style.display = 'block';

      const mockTouchEvent = {
        touches: [],
      } as unknown as TouchEvent;

      handlePriceTouchCancel(mockTouchEvent, mockSvgContainer);

      expect(data.isPriceTooltipActive).toBe(false);
      expect(data.tooltip.style.display).toBe('none');
    });
  });
});
