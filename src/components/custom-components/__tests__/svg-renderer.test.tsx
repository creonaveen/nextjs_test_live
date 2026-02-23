import { render, screen } from '@testing-library/react';

import SvgRenderer from '../svg-renderer';

interface UseGetSvgDataParams {
  svg_id?: string;
  chart_param?: string;
  chart_tooltip_id?: number;
  show_image_border?: number;
  w: number;
  lang: string;
}

interface UseGetSvgDataResult {
  data?: { raw_svg: string };
  isLoading: boolean;
  error?: { message: string };
}

interface ObserveChartResizeParams {
  defaultWidth: number;
  defaultHeight: number;
  aspectRatio?: number;
  debounceMs: number;
}

// Mock useGetSvgData
const mockUseGetSvgData = jest.fn<UseGetSvgDataResult, [UseGetSvgDataParams?, boolean?]>();
jest.mock('@/store/api-service/svg-api-service', () => ({
  useGetSvgData: (...args: [UseGetSvgDataParams?, boolean?]) => mockUseGetSvgData(...args),
}));

// Mock observeChartResize
const mockObserveChartResize = jest.fn<
  () => void,
  [HTMLElement, (dimensions: unknown) => void, ObserveChartResizeParams]
>(() => () => {});
jest.mock('@/utils/chart-dimensions', () => ({
  observeChartResize: (
    ...args: [HTMLElement, (dimensions: unknown) => void, ObserveChartResizeParams]
  ) => mockObserveChartResize(...args),
  ChartDimensions: {},
}));

interface Translations {
  imageLoadError: string;
}

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key as keyof Translations,
}));

// Mock getLanguageFromStorage and cn
jest.mock('@/lib/utils', () => ({
  getLanguageFromStorage: () => 'eng',
  cn: (...args: (string | boolean | null | undefined)[]) => args.filter(Boolean).join(' '),
}));

// Mock configuration
jest.mock('@/environment/configuration', () => ({
  configuration: {
    DEFAULT_LANGUAGE: 'eng',
  },
}));

describe('SvgRenderer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetSvgData.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });
  });

  it('should render loading skeleton initially', () => {
    mockUseGetSvgData.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { container } = render(<SvgRenderer svg_id="123" alt="Test Chart" />);

    const skeleton = container.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  });

  it('should render SVG when data is available', () => {
    const mockSvgData = {
      raw_svg: '<svg><rect width="100" height="100"/></svg>',
    };

    mockUseGetSvgData.mockReturnValue({
      data: mockSvgData,
      isLoading: false,
      error: null,
    });

    const { container } = render(
      <SvgRenderer svg_id="123" alt="Test Chart" enableResponsive={false} containerWidth={800} />
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render error message when error occurs', () => {
    mockUseGetSvgData.mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'Failed to load image' },
    });

    render(
      <SvgRenderer svg_id="123" alt="Test Chart" enableResponsive={false} containerWidth={800} />
    );

    expect(screen.getByText(/failed to load image/i)).toBeInTheDocument();
  });

  it('should call useGetSvgData with correct parameters', () => {
    render(
      <SvgRenderer
        svg_id="123"
        alt="Test Chart"
        chart_params="param=value"
        enableResponsive={false}
        containerWidth={800}
      />
    );

    expect(mockUseGetSvgData).toHaveBeenCalledWith(
      expect.objectContaining({
        svg_id: '123',
        w: 800,
        lang: 'eng',
        chart_param: 'param=value',
      }),
      true
    );
  });

  it('should use default width when containerWidth is not provided', () => {
    render(<SvgRenderer svg_id="123" alt="Test Chart" enableResponsive={false} />);

    expect(mockUseGetSvgData).toHaveBeenCalledWith(
      expect.objectContaining({
        svg_id: '123',
        w: 1200, // defaultWidth
        lang: 'eng',
      }),
      true
    );
  });

  it('should accept custom className', () => {
    const { container } = render(
      <SvgRenderer
        svg_id="123"
        alt="Test Chart"
        className="custom-class"
        enableResponsive={false}
        containerWidth={800}
      />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('should setup observeChartResize when enableResponsive is true', () => {
    render(<SvgRenderer svg_id="123" alt="Test Chart" enableResponsive={true} />);

    // observeChartResize should be called when enableResponsive is true
    expect(mockObserveChartResize).toHaveBeenCalled();
  });

  it('should not setup observeChartResize when enableResponsive is false', () => {
    mockObserveChartResize.mockClear();
    render(
      <SvgRenderer svg_id="123" alt="Test Chart" enableResponsive={false} containerWidth={800} />
    );

    // observeChartResize should not be called when enableResponsive is false
    expect(mockObserveChartResize).not.toHaveBeenCalled();
  });
});
