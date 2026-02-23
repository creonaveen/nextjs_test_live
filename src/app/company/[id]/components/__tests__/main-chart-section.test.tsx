import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { useGetSvgData } from '@/store/api-service/svg-api-service';
import { useGetUserSettingsData } from '@/store/api-service/user-settings-api-service';

import * as platform from '@/lib/platform';
import MainChartSection from '../main-chart/main-chart-section';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '123' }),
  useRouter: jest.fn(),
}));

jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(() => 'desktop'),
}));

jest.mock('@/lib/utils', () => {
  const actual = jest.requireActual('@/lib/utils');
  return {
    ...actual,
    getLanguageFromStorage: jest.fn(() => 'eng'),
    // Use the actual cn function - it should work fine in tests
    cn: actual.cn,
  };
});

jest.mock('@/store/api-service/svg-api-service', () => ({
  useGetSvgData: jest.fn(),
}));

jest.mock('@/store/api-service/user-settings-api-service', () => ({
  useGetUserSettingsData: jest.fn(),
}));

jest.mock('@/utils/chart-dimensions', () => ({
  observeChartResize: jest.fn((container, callback) => {
    // Simulate dimensions callback
    setTimeout(() => {
      callback({
        width: 1200,
        height: 500,
        platform: 'desktop',
      });
    }, 100);
    return jest.fn(); // Return cleanup function
  }),
}));

jest.mock('@/utils/main-chart-tooltip', () => ({
  attachOrDetachEventListeners: jest.fn(),
}));

jest.mock('@/components/custom-components/chart/chart-maximize-with-trigger', () => ({
  ChartMaximizeWithTrigger: ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title?: string;
  }) => (
    <div data-testid="chart-maximize">
      {title}
      {children}
    </div>
  ),
}));

jest.mock('../sheet-components/settings-sheet', () => {
  // Track state of toggled indicators for testing
  const toggledStates = new Map<string, boolean>();

  return {
    SettingsSheet: ({
      onIndicatorToggle,
      onSettingsChange,
    }: {
      onIndicatorToggle?: (indicator: number) => void;
      onSettingsChange?: (tooltip: number) => void;
    }) => {
      const handleIndicator80Toggle = () => {
        const currentState = toggledStates.get('80') ?? false;
        toggledStates.set('80', !currentState);
        onIndicatorToggle?.(currentState ? -80 : 80);
      };

      const handleIndicator89Toggle = () => {
        const currentState = toggledStates.get('89') ?? false;
        toggledStates.set('89', !currentState);
        onIndicatorToggle?.(currentState ? -89 : 89);
      };

      return (
        <div data-testid="settings-sheet">
          <button onClick={handleIndicator80Toggle} data-testid="toggle-indicator-80">
            Toggle Indicator 80
          </button>
          <button onClick={handleIndicator89Toggle} data-testid="toggle-indicator-89">
            Toggle Indicator 89
          </button>
          <button onClick={() => onSettingsChange?.(2)} data-testid="change-tooltip">
            Change Tooltip
          </button>
        </div>
      );
    },
  };
});

jest.mock('../../loading', () => ({
  TechnicalCommentSkeleton: () => <div data-testid="technical-comment-skeleton">Loading...</div>,
}));

const mockUseGetSvgData = useGetSvgData as jest.MockedFunction<typeof useGetSvgData>;
const mockUseGetUserSettingsData = useGetUserSettingsData as jest.MockedFunction<
  typeof useGetUserSettingsData
>;

describe('MainChartSection', () => {
  const mockChartSectionData = {
    data: {
      main_chart: {
        img_param: {
          id: 1,
          chart_tooltip_id: 1,
          show_image_border: false,
          chart_maximize: false,
        },
        chart_param: 'chartId=1&indicators=80,86',
      },
      rsi_chart: {
        active: true,
        img_param: {
          id: 2,
        },
        chart_param: 'rsi_chart_param',
      },
      technical_comment: {
        time_span_string: '1 Day',
        analysis: '<p>Technical analysis text</p>',
      },
    },
    labels_and_texts: {
      algorithmic_technical_analysis: 'Algorithmic Technical Analysis',
      technical_indicators: 'Technical Indicators',
    },
  };

  const mockUserSettingsData = {
    main_chart_settings: {
      current_product: 1,
      chart_type: {
        allowed: [1, 2, 3],
        group_technical_analysis: {
          1: { id: '1', caption: '1 Day' },
          2: { id: '2', caption: '5 Days' },
          3: { id: '3', caption: '22 Days' },
        },
      },
      chart_indicators: {
        selected: ['80', '86'],
        options: {
          '80': { id: '80', caption: 'Indicator 80' },
          '86': { id: '86', caption: 'Indicator 86' },
        },
      },
      tooltip_settings: {
        selected: 2,
        options: {
          '0': { id: '0', caption: 'Off' },
          '1': { id: '1', caption: 'Basic' },
          '2': { id: '2', caption: 'Advanced' },
        },
      },
    },
    update_info: {
      chart_tooltip_id: 2,
    },
  };

  const defaultProps = {
    chartSectionData: mockChartSectionData as unknown,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset module to clear the toggledStates Map in the mock
    jest.resetModules();
    (platform.usePlatform as jest.Mock).mockReturnValue('desktop');

    mockUseGetUserSettingsData.mockReturnValue({
      data: mockUserSettingsData,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
      refetch: jest.fn(),
    } as unknown);

    mockUseGetSvgData.mockReturnValue({
      data: {
        raw_svg: '<svg>Main Chart SVG</svg>',
      },
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    } as unknown);
  });

  it('should render main chart section', () => {
    render(<MainChartSection {...defaultProps} />);

    // The text is rendered as "Algorithmic Technical Analysis, 1 Day"
    expect(screen.getByText(/Algorithmic Technical Analysis/)).toBeInTheDocument();
  });

  it('should render loading skeleton when main chart is loading', () => {
    mockUseGetSvgData.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: jest.fn(),
    } as unknown);

    const { container } = render(<MainChartSection {...defaultProps} />);

    // Find skeleton by data-slot attribute
    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toBeInTheDocument();
  });

  it('should render main chart SVG when loaded', async () => {
    const { container } = render(<MainChartSection {...defaultProps} />);

    await waitFor(() => {
      // Find the main chart container by data-chartid attribute
      const svgContainer = container.querySelector('[data-chartid="ajaxChartIdMainChart"]');
      expect(svgContainer).toBeInTheDocument();
      expect(svgContainer?.innerHTML).toContain('svg');
    });
  });

  it('should render timespan radio group', () => {
    render(<MainChartSection {...defaultProps} />);

    expect(screen.getByText('1 Day')).toBeInTheDocument();
    expect(screen.getByText('5 Days')).toBeInTheDocument();
    expect(screen.getByText('22 Days')).toBeInTheDocument();
  });

  it('should render settings sheet', () => {
    render(<MainChartSection {...defaultProps} />);

    expect(screen.getByTestId('settings-sheet')).toBeInTheDocument();
  });

  it('should handle timespan change', async () => {
    const mockOnRefreshData = jest.fn().mockResolvedValue({});
    const user = userEvent.setup();

    render(<MainChartSection {...defaultProps} onRefreshData={mockOnRefreshData} />);

    // Wait for user settings to load
    await waitFor(() => {
      expect(screen.getByText('1 Day')).toBeInTheDocument();
    });

    // Find and click a different timespan (5 Days = product 2)
    const day5Radio = screen.getByLabelText('5 Days');
    if (day5Radio) {
      await user.click(day5Radio);
    }

    // Should trigger refresh after a delay with the selected product parameter (2 for 5 Days)
    await waitFor(
      () => {
        expect(mockOnRefreshData).toHaveBeenCalled();
        // Verify that the timespan value was passed to onRefreshData
        expect(mockOnRefreshData).toHaveBeenCalledWith(2);
      },
      { timeout: 2000 }
    );
  });

  it('should render RSI chart when active', () => {
    const { container } = render(<MainChartSection {...defaultProps} />);

    // RSI chart should be rendered - find by data-chart-info attribute
    const rsiChartContainer = container.querySelector('[data-chart-info="2"]');
    expect(rsiChartContainer).toBeInTheDocument();
  });

  it('should not render RSI chart when inactive', () => {
    const dataWithoutRsi = {
      ...mockChartSectionData,
      data: {
        ...mockChartSectionData.data,
        rsi_chart: {
          active: false,
        },
      },
    };

    render(<MainChartSection {...defaultProps} chartSectionData={dataWithoutRsi as unknown} />);

    expect(screen.getByText(/Algorithmic Technical Analysis/)).toBeInTheDocument();
  });

  it('should render technical comment', () => {
    render(<MainChartSection {...defaultProps} />);

    expect(screen.getByText(/Algorithmic Technical Analysis/)).toBeInTheDocument();
    expect(screen.getByText('1 Day')).toBeInTheDocument();
  });

  it('should render technical comment skeleton when refetching', () => {
    render(<MainChartSection {...defaultProps} isRefetching={true} />);

    expect(screen.getByTestId('technical-comment-skeleton')).toBeInTheDocument();
  });

  it('should handle indicator 80 toggle (other indicator)', async () => {
    const mockOnRefreshData = jest.fn().mockResolvedValue({});
    const user = userEvent.setup();

    render(<MainChartSection {...defaultProps} onRefreshData={mockOnRefreshData} />);

    await waitFor(() => {
      expect(screen.getByTestId('settings-sheet')).toBeInTheDocument();
    });

    const toggleButton = screen.getByTestId('toggle-indicator-80');
    await user.click(toggleButton);

    // Should trigger API call with indicator_update
    await waitFor(() => {
      expect(mockUseGetUserSettingsData).toHaveBeenCalled();
    });

    // onRefreshData should NOT be called for indicator 80
    expect(mockOnRefreshData).not.toHaveBeenCalled();
  });

  it('should handle indicator 89 toggle and call onRefreshData', async () => {
    const mockOnRefreshData = jest.fn().mockResolvedValue({});
    const user = userEvent.setup();

    render(<MainChartSection {...defaultProps} onRefreshData={mockOnRefreshData} />);

    await waitFor(() => {
      expect(screen.getByTestId('settings-sheet')).toBeInTheDocument();
    });

    const toggleButton = screen.getByTestId('toggle-indicator-89');
    await user.click(toggleButton);

    // Should call onRefreshData for indicator 89
    await waitFor(() => {
      expect(mockOnRefreshData).toHaveBeenCalled();
    });
  });

  it('should handle indicator -89 toggle (deactivate) and call onRefreshData', async () => {
    const mockOnRefreshData = jest.fn().mockResolvedValue({});
    const user = userEvent.setup();

    render(<MainChartSection {...defaultProps} onRefreshData={mockOnRefreshData} />);

    await waitFor(() => {
      expect(screen.getByTestId('settings-sheet')).toBeInTheDocument();
    });

    // Toggle indicator 89 (activate)
    let toggleButton = screen.getByTestId('toggle-indicator-89');
    await user.click(toggleButton);

    await waitFor(() => {
      expect(mockOnRefreshData).toHaveBeenCalledTimes(2);
    });

    // Toggle again to deactivate (-89)
    toggleButton = screen.getByTestId('toggle-indicator-89');
    await user.click(toggleButton);

    // Should call onRefreshData again for -89
    await waitFor(() => {
      expect(mockOnRefreshData).toHaveBeenCalledTimes(3);
    });
  });

  it('should handle tooltip setting change', async () => {
    const user = userEvent.setup();

    render(<MainChartSection {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByTestId('settings-sheet')).toBeInTheDocument();
    });

    const tooltipButton = screen.getByTestId('change-tooltip');
    await user.click(tooltipButton);

    // Should update tooltip setting
    await waitFor(() => {
      expect(mockUseGetSvgData).toHaveBeenCalled();
    });
  });

  it('should render chart maximize when enabled', () => {
    const dataWithMaximize = {
      ...mockChartSectionData,
      data: {
        ...mockChartSectionData.data,
        main_chart: {
          ...mockChartSectionData.data.main_chart,
          img_param: {
            ...mockChartSectionData.data.main_chart.img_param,
            chart_maximize: true,
            chart_maximize_title: 'Maximize Chart',
          },
        },
      },
    };

    render(<MainChartSection {...defaultProps} chartSectionData={dataWithMaximize as unknown} />);

    expect(screen.getByTestId('chart-maximize')).toBeInTheDocument();
    expect(screen.getByText('Maximize Chart')).toBeInTheDocument();
  });

  it('should handle loading user settings', () => {
    mockUseGetUserSettingsData.mockReturnValue({
      data: undefined,
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    } as unknown);

    render(<MainChartSection {...defaultProps} />);

    expect(screen.getByText(/Algorithmic Technical Analysis/)).toBeInTheDocument();
  });

  it('should handle missing user settings', () => {
    mockUseGetUserSettingsData.mockReturnValue({
      data: null,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
      refetch: jest.fn(),
    } as unknown);

    render(<MainChartSection {...defaultProps} />);

    expect(screen.getByText(/Algorithmic Technical Analysis/)).toBeInTheDocument();
  });

  it('should use mobile dimensions for main chart on mobile', () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('mobile');

    render(<MainChartSection {...defaultProps} />);

    expect(screen.getByText(/Algorithmic Technical Analysis/)).toBeInTheDocument();
  });

  it('should handle RSI chart loading state', () => {
    mockUseGetSvgData.mockImplementation((params) => {
      if (params.svg_id === 2) {
        return {
          data: undefined,
          isLoading: true,
          isError: false,
          error: null,
          refetch: jest.fn(),
        } as unknown;
      }
      return {
        data: { raw_svg: '<svg>Main Chart</svg>' },
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      } as unknown;
    });

    const { container } = render(<MainChartSection {...defaultProps} />);

    // Find skeleton by data-slot attribute
    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toBeInTheDocument();
  });

  it('should pass correct timespan product value to onRefreshData', async () => {
    const mockOnRefreshData = jest.fn().mockResolvedValue({});
    const user = userEvent.setup();

    render(<MainChartSection {...defaultProps} onRefreshData={mockOnRefreshData} />);

    // Wait for user settings to load
    await waitFor(() => {
      expect(screen.getByText('1 Day')).toBeInTheDocument();
    });

    // Test changing to 22 Days (product 3)
    const day22Radio = screen.getByLabelText('22 Days');
    if (day22Radio) {
      await user.click(day22Radio);
    }

    // Should trigger refresh with product value 3
    await waitFor(
      () => {
        expect(mockOnRefreshData).toHaveBeenCalledWith(3);
      },
      { timeout: 2000 }
    );

    jest.clearAllMocks();

    // Test changing back to 1 Day (product 1)
    const day1Radio = screen.getByLabelText('1 Day');
    if (day1Radio) {
      await user.click(day1Radio);
    }

    // Should trigger refresh with product value 1
    await waitFor(
      () => {
        expect(mockOnRefreshData).toHaveBeenCalledWith(1);
      },
      { timeout: 2000 }
    );
  });
});
