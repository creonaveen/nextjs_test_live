import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChartMaximizeDialogSheet } from '../chart/chart-maximize-dialog-sheet';
import { ChartMaximizeWithTrigger } from '../chart/chart-maximize-with-trigger';

// Mock usePlatform
const mockUsePlatform = jest.fn(() => 'desktop');
jest.mock('@/lib/platform', () => ({
  usePlatform: () => mockUsePlatform(),
}));

// Mock useGetSvgData
const mockUseGetSvgData = jest.fn();
jest.mock('@/store/api-service/svg-api-service', () => ({
  useGetSvgData: (...args: unknown[]) => mockUseGetSvgData(...args),
}));

// Mock useGetStaticContent
const mockUseGetStaticContent = jest.fn();
jest.mock('@/store/api-service/static-content-api-service', () => ({
  useGetStaticContent: (...args: unknown[]) => mockUseGetStaticContent(...args),
}));

// Mock observeChartResize
const mockObserveChartResize = jest.fn(() => () => {});
jest.mock('@/utils/chart-dimensions', () => ({
  observeChartResize: (...args: unknown[]) => mockObserveChartResize(...args),
}));

// Mock attachOrDetachEventListeners
jest.mock('@/utils/main-chart-tooltip', () => ({
  attachOrDetachEventListeners: jest.fn(),
}));

// Mock getLanguageFromStorage and cn
jest.mock('@/lib/utils', () => ({
  getLanguageFromStorage: () => 'eng',
  cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
}));

// Mock configuration
jest.mock('@/environment/configuration', () => ({
  configuration: {
    DEFAULT_LANGUAGE: 'eng',
  },
}));

describe('ChartMaximizeDialogSheet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetSvgData.mockReturnValue({
      data: null,
      isLoading: false,
    });
    mockUseGetStaticContent.mockReturnValue({
      data: null,
      isLoading: false,
    });
  });

  it('should render dialog on desktop when open', () => {
    render(
      <ChartMaximizeDialogSheet isOpen={true} onOpenChange={jest.fn()} title="Test Chart">
        <div>Chart Content</div>
      </ChartMaximizeDialogSheet>
    );

    expect(screen.getByText('Test Chart')).toBeInTheDocument();
  });

  it('should render sheet on mobile when open', () => {
    mockUsePlatform.mockReturnValueOnce('mobile');

    render(
      <ChartMaximizeDialogSheet isOpen={true} onOpenChange={jest.fn()} title="Test Chart">
        <div>Chart Content</div>
      </ChartMaximizeDialogSheet>
    );

    expect(screen.getByText('Test Chart')).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    render(
      <ChartMaximizeDialogSheet isOpen={false} onOpenChange={jest.fn()} title="Test Chart">
        <div>Chart Content</div>
      </ChartMaximizeDialogSheet>
    );

    expect(screen.queryByText('Test Chart')).not.toBeInTheDocument();
  });

  it('should call onOpenChange when dialog is closed', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <ChartMaximizeDialogSheet isOpen={true} onOpenChange={onOpenChange} title="Test Chart">
        <div>Chart Content</div>
      </ChartMaximizeDialogSheet>
    );

    // Click outside to close (simulated)
    const dialogContent = screen.getByText('Test Chart').closest('div');
    if (dialogContent) {
      await user.click(dialogContent);
    }

    // onOpenChange should be called
    expect(onOpenChange).toHaveBeenCalled();
  });

  it('should fetch SVG data when apiProps are provided', () => {
    render(
      <ChartMaximizeDialogSheet
        isOpen={true}
        onOpenChange={jest.fn()}
        apiProps={{
          svg_id: '123',
        }}
      >
        <div>Chart Content</div>
      </ChartMaximizeDialogSheet>
    );

    expect(mockUseGetSvgData).toHaveBeenCalled();
  });

  it('should fetch static content when staticContentApiProps are provided', () => {
    render(
      <ChartMaximizeDialogSheet
        isOpen={true}
        onOpenChange={jest.fn()}
        staticContentApiProps={{
          svg_id: '123',
          reference: 'ref',
          parameters: 'params',
        }}
      >
        <div>Chart Content</div>
      </ChartMaximizeDialogSheet>
    );

    expect(mockUseGetStaticContent).toHaveBeenCalled();
  });

  it('should render loading skeleton when loading', async () => {
    // Mock observeChartResize to immediately set dimensions
    mockObserveChartResize.mockImplementation((container, callback) => {
      // Simulate dimensions being set immediately
      setTimeout(() => {
        callback({
          width: 1920,
          height: 1080,
          platform: 'desktop',
          containerWidth: 1920,
          containerHeight: 1080,
        });
      }, 0);
      return () => {}; // cleanup function
    });

    mockUseGetSvgData.mockReturnValue({
      data: null,
      isLoading: true,
    });

    const { container } = render(
      <ChartMaximizeDialogSheet
        isOpen={true}
        onOpenChange={jest.fn()}
        apiProps={{
          svg_id: '123',
        }}
      >
        <div>Chart Content</div>
      </ChartMaximizeDialogSheet>
    );

    // Wait for the skeleton to appear (might be in a portal)
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Check both container and document for skeleton (might be in portal)
    const skeleton =
      container.querySelector('.animate-pulse') || document.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  });

  it('should render SVG when data is available', async () => {
    const mockSvgData = {
      raw_svg: '<svg><rect width="100" height="100"/></svg>',
    };

    // Mock observeChartResize to immediately set dimensions
    mockObserveChartResize.mockImplementation((container, callback) => {
      // Simulate dimensions being set immediately
      setTimeout(() => {
        callback({
          width: 1920,
          height: 1080,
          platform: 'desktop',
          containerWidth: 1920,
          containerHeight: 1080,
        });
      }, 0);
      return () => {}; // cleanup function
    });

    mockUseGetSvgData.mockReturnValue({
      data: mockSvgData,
      isLoading: false,
    });

    const { container } = render(
      <ChartMaximizeDialogSheet
        isOpen={true}
        onOpenChange={jest.fn()}
        apiProps={{
          svg_id: '123',
        }}
      >
        <div>Chart Content</div>
      </ChartMaximizeDialogSheet>
    );

    // Wait for dimensions to be set and SVG to render
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Check both container and document for SVG (might be in portal)
    const svg = container.querySelector('svg') || document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});

describe('ChartMaximizeWithTrigger', () => {
  it('should render trigger element', () => {
    const { container } = render(
      <ChartMaximizeWithTrigger title="Test Chart">
        <button>Maximize</button>
      </ChartMaximizeWithTrigger>
    );

    // Query for the actual button element, not the wrapper div
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/maximize/i);
  });

  it('should open dialog when trigger is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ChartMaximizeWithTrigger title="Test Chart">
        <button>Maximize</button>
      </ChartMaximizeWithTrigger>
    );

    // Click on the wrapper div which handles the onClick event
    const wrapper = container.querySelector('[role="button"]');
    expect(wrapper).toBeInTheDocument();
    if (wrapper) {
      await user.click(wrapper);
    }

    expect(screen.getByText('Test Chart')).toBeInTheDocument();
  });

  it('should open dialog on Enter key press', async () => {
    const { container } = render(
      <ChartMaximizeWithTrigger title="Test Chart">
        <button>Maximize</button>
      </ChartMaximizeWithTrigger>
    );

    // Press Enter on the wrapper div which handles the onKeyDown event
    const wrapper = container.querySelector('[role="button"]') as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    if (wrapper) {
      fireEvent.keyDown(wrapper, { key: 'Enter', code: 'Enter' });
    }

    expect(screen.getByText('Test Chart')).toBeInTheDocument();
  });
});
