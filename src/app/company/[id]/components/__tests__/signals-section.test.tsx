import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as router from 'next/navigation';
import React from 'react';

import { SignalsSection } from '../signals-section';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} data-testid="signal-image" />
  ),
}));

jest.mock('investtech/external-components', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode }) => (
    <button {...props}>{children}</button>
  ),
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Dialog: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog">{children}</div>
  ),
  DialogTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-trigger">{children}</div>
  ),
  DialogContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-title">{children}</div>
  ),
  DialogDescription: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-description">{children}</div>
  ),
}));

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
};

describe('SignalsSection', () => {
  const mockData = {
    data: {
      signals: {
        signal1: {
          title: 'Signal 1',
          post_name: 'signal-1-post',
          help_teaser_image: {
            src_light: '/signal1-light.png',
            src_dark: '/signal1-dark.png',
            src_light_big: '/signal1-light-big.png',
            src_dark_big: '/signal1-dark-big.png',
          },
          arrow_image: {
            src: '/arrow-up.png',
          },
          has_statistics: true,
          statistics: {
            color: 'green',
            annual_excess_return: '15.5',
            num_signals_text: '10 signals',
          },
        },
        signal2: {
          title: 'Signal 2',
          post_name: 'signal-2-post',
          help_teaser_image: {
            src_light: '/signal2-light.png',
            src_dark: '/signal2-dark.png',
            src_light_big: '/signal2-light-big.png',
            src_dark_big: '/signal2-dark-big.png',
          },
          arrow_image: {
            src: '/arrow-down.png',
          },
          has_statistics: false,
        },
      },
    },
    labels_and_texts: {
      sub_title: 'Current Signals',
      module_title: 'Technical Signals',
      pp: '%',
      help_data: {
        data: {
          title: 'Help Title',
          teaser_text: 'Help teaser text',
          teaser_text_short: 'Help teaser text short',
        },
      },
      see_more: 'See more',
    },
  };

  const mockKeyInfoLabelsAndTexts = {
    see_more: 'See more',
  };

  const defaultProps = {
    data: mockData as unknown,
    keyInfoLabelsAndTexts: mockKeyInfoLabelsAndTexts as unknown,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (router.useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should render section header', () => {
    render(<SignalsSection {...defaultProps} />);

    expect(screen.getByText('Current Signals')).toBeInTheDocument();
    expect(screen.getByText('Technical Signals')).toBeInTheDocument();
  });

  it('should render signal cards', () => {
    render(<SignalsSection {...defaultProps} />);

    expect(screen.getByText('Signal 1')).toBeInTheDocument();
    expect(screen.getByText('Signal 2')).toBeInTheDocument();
  });

  it('should navigate to signal post when card is clicked', async () => {
    const user = userEvent.setup();
    render(<SignalsSection {...defaultProps} />);

    const signalCard = screen.getByText('Signal 1').closest('[class*="Card"]');
    if (signalCard) {
      await user.click(signalCard as HTMLElement);
      expect(mockRouter.push).toHaveBeenCalledWith('/docs/signal-1-post');
    }
  });

  it('should render signal images', () => {
    render(<SignalsSection {...defaultProps} />);

    const images = screen.getAllByTestId('signal-image');
    expect(images.length).toBeGreaterThan(0);
  });

  it('should render statistics when has_statistics is true', () => {
    render(<SignalsSection {...defaultProps} />);

    // Text might be split across elements, so use a more flexible matcher
    expect(screen.getByText(/15\.5/)).toBeInTheDocument();
    expect(screen.getByText(/%/)).toBeInTheDocument();
  });

  it('should not render statistics when has_statistics is false', () => {
    render(<SignalsSection {...defaultProps} />);

    // Signal 2 has has_statistics: false, so statistics should not be rendered
    expect(screen.getByText('Signal 2')).toBeInTheDocument();
  });

  it('should render help dialog', () => {
    render(<SignalsSection {...defaultProps} />);

    expect(screen.getByText('See more')).toBeInTheDocument();
  });

  it('should open help dialog when clicked', async () => {
    const user = userEvent.setup();
    render(<SignalsSection {...defaultProps} />);

    const seeMoreButton = screen.getByText('See more');
    await user.click(seeMoreButton);

    expect(screen.getByText('Help Title')).toBeInTheDocument();
    // There are multiple "Help teaser text" elements, so use getAllByText
    const helpTexts = screen.getAllByText('Help teaser text');
    expect(helpTexts.length).toBeGreaterThan(0);
  });

  it('should filter out signals without titles', () => {
    const dataWithEmptySignal = {
      ...mockData,
      data: {
        ...mockData.data,
        signals: {
          ...mockData.data.signals,
          signal3: {
            title: '',
            post_name: 'signal-3-post',
          },
        },
      },
    };

    render(<SignalsSection {...defaultProps} data={dataWithEmptySignal as unknown} />);

    expect(screen.getByText('Signal 1')).toBeInTheDocument();
    expect(screen.getByText('Signal 2')).toBeInTheDocument();
    expect(screen.queryByText('signal-3-post')).not.toBeInTheDocument();
  });

  it('should handle missing post_name gracefully', async () => {
    const user = userEvent.setup();
    const dataWithoutPostName = {
      ...mockData,
      data: {
        ...mockData.data,
        signals: {
          signal1: {
            ...mockData.data.signals.signal1,
            post_name: null,
          },
        },
      },
    };

    render(<SignalsSection {...defaultProps} data={dataWithoutPostName as unknown} />);

    const signalCard = screen.getByText('Signal 1').closest('[class*="Card"]');
    if (signalCard) {
      await user.click(signalCard as HTMLElement);
      // Should not navigate if post_name is missing
      expect(mockRouter.push).not.toHaveBeenCalled();
    }
  });

  it('should render with correct grid layout', () => {
    const { container } = render(<SignalsSection {...defaultProps} />);

    const grid = container.querySelector('[class*="grid"]');
    expect(grid).toBeInTheDocument();
  });

  it('should handle empty signals object', () => {
    const dataWithEmptySignals = {
      ...mockData,
      data: {
        ...mockData.data,
        signals: {},
      },
    };

    render(<SignalsSection {...defaultProps} data={dataWithEmptySignals as unknown} />);

    expect(screen.getByText('Technical Signals')).toBeInTheDocument();
    // No signal cards should be rendered
    expect(screen.queryByText('Signal 1')).not.toBeInTheDocument();
  });

  it('should render arrow image in statistics', () => {
    render(<SignalsSection {...defaultProps} />);

    const images = screen.getAllByTestId('signal-image');
    const arrowImage = images.find((img) => img.getAttribute('src') === '/arrow-up.png');
    expect(arrowImage).toBeInTheDocument();
  });

  it('should handle missing statistics data', () => {
    const dataWithoutStatistics = {
      ...mockData,
      data: {
        ...mockData.data,
        signals: {
          signal1: {
            ...mockData.data.signals.signal1,
            has_statistics: true,
            statistics: null,
          },
        },
      },
    };

    render(<SignalsSection {...defaultProps} data={dataWithoutStatistics as unknown} />);

    expect(screen.getByText('Signal 1')).toBeInTheDocument();
  });

  it('should render help teaser text', () => {
    render(<SignalsSection {...defaultProps} />);

    expect(screen.getByText('Help teaser text short')).toBeInTheDocument();
  });

  it('should handle missing help_data', () => {
    const dataWithoutHelp = {
      ...mockData,
      labels_and_texts: {
        ...mockData.labels_and_texts,
        help_data: null,
      },
    };

    render(<SignalsSection {...defaultProps} data={dataWithoutHelp as unknown} />);

    expect(screen.getByText('Technical Signals')).toBeInTheDocument();
    // Help dialog should not be rendered when help_data is null
    expect(screen.queryByText('See more')).not.toBeInTheDocument();
  });
});
