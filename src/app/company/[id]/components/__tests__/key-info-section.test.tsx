import { render, screen } from '@testing-library/react';
import * as router from 'next/navigation';
import React from 'react';

import { KeyInfoSection } from '../key-info-section';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@/components/custom-components/tooltip-or-sheet', () => ({
  TooltipOrSheet: ({ text, triggerElement }: unknown) => (
    <div data-testid="tooltip-or-sheet">
      {triggerElement}
      {text}
    </div>
  ),
}));

jest.mock('@/components/custom-components/factor-diagram/factor-diagram', () => ({
  __esModule: true,
  default: ({ rawSvgHtml }: { rawSvgHtml: string }) => (
    <div data-testid="factor-diagram">{rawSvgHtml ? 'Factor Diagram' : 'No Diagram'}</div>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="help-image" />
  ),
}));

describe('KeyInfoSection', () => {
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  };

  const mockData = {
    data: {
      risk_assessment: {
        liquidity: {
          title: 'Liquidity Risk',
          label: {
            sign: 1,
            size: 'risk',
            content: 'Low',
          },
          explanation: 'Low liquidity risk explanation',
        },
        volatility: {
          title: 'Volatility Risk',
          label: {
            sign: -1,
            size: 'risk',
            content: 'High',
          },
          explanation: 'High volatility risk explanation',
        },
      },
      key_stats: {
        periods: {
          day1: {
            period: '1 Day',
            change_pct: {
              sign: 1,
              value: '+2.5%',
            },
          },
          day5: {
            period: '5 Days',
            change_pct: {
              sign: -1,
              value: '-1.2%',
            },
          },
          day22: {
            period: '22 Days',
            change_pct: {
              sign: 1,
              value: '+5.0%',
            },
          },
          day66: {
            period: '66 Days',
            change_pct: {
              sign: 1,
              value: '+8.0%',
            },
          },
          year_to_date: {
            period: 'YTD',
            change_pct: {
              sign: 1,
              value: '+15.0%',
            },
          },
        },
        volatility: {
          day1: 10,
          day5: 12,
          day22: 15,
          day66: 18,
        },
      },
      factor_diagram: {
        is_dummy: false,
        svg: '<svg>Factor Diagram SVG</svg>',
        tooltips: {},
        help_post_name: 'factor-diagram-help',
        labels: {
          help_source: 'factor-diagram-help',
        },
      },
    },
    labels_and_texts: {
      risk_assessment_card_title: 'Risk Assessment',
      risk_assessment_card_help: 'Risk assessment help text',
      key_statistics_card_title: 'Key Statistics',
      key_statistics_card_help: 'Key statistics help text',
      change_column: 'Change',
      volatility_info: 'Volatility:',
      factor_diagram_card_title: 'Factor Diagram',
      factor_diagram_card_help: 'Factor diagram help text',
      see_more: 'See more',
      help_source: 'factor-diagram-help',
    },
  };

  const defaultProps = {
    data: mockData as unknown,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (router.useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should render risk assessment card', () => {
    render(<KeyInfoSection {...defaultProps} />);

    expect(screen.getByText('Risk Assessment')).toBeInTheDocument();
    expect(screen.getByText('Liquidity Risk')).toBeInTheDocument();
    expect(screen.getByText('Volatility Risk')).toBeInTheDocument();
  });

  it('should render risk badges with correct content', () => {
    render(<KeyInfoSection {...defaultProps} />);

    expect(screen.getByText('Low')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('should render risk explanations', () => {
    render(<KeyInfoSection {...defaultProps} />);

    expect(screen.getByText('Low liquidity risk explanation')).toBeInTheDocument();
    expect(screen.getByText('High volatility risk explanation')).toBeInTheDocument();
  });

  it('should render key statistics card', () => {
    render(<KeyInfoSection {...defaultProps} />);

    expect(screen.getByText('Key Statistics')).toBeInTheDocument();
    expect(screen.getByText('Change')).toBeInTheDocument();
  });

  it('should render all period statistics', () => {
    render(<KeyInfoSection {...defaultProps} />);

    expect(screen.getByText('1 Day')).toBeInTheDocument();
    expect(screen.getByText('5 Days')).toBeInTheDocument();
    expect(screen.getByText('22 Days')).toBeInTheDocument();
    expect(screen.getByText('66 Days')).toBeInTheDocument();
    expect(screen.getByText('YTD')).toBeInTheDocument();
  });

  it('should render change percentages', () => {
    render(<KeyInfoSection {...defaultProps} />);

    expect(screen.getByText('+2.5%')).toBeInTheDocument();
    expect(screen.getByText('-1.2%')).toBeInTheDocument();
    expect(screen.getByText('+5.0%')).toBeInTheDocument();
  });

  it('should render volatility information', () => {
    render(<KeyInfoSection {...defaultProps} />);

    expect(screen.getByText(/Volatility:/)).toBeInTheDocument();
    expect(screen.getByText(/10%, 12%, 15% and 18%/)).toBeInTheDocument();
  });

  it('should render factor diagram card', () => {
    render(<KeyInfoSection {...defaultProps} />);

    expect(screen.getAllByText('Factor Diagram').length).toBeGreaterThan(0);
    expect(screen.getByTestId('factor-diagram')).toBeInTheDocument();
  });

  it('should render factor diagram when not dummy', () => {
    render(<KeyInfoSection {...defaultProps} />);

    const factorDiagramElements = screen.getAllByText('Factor Diagram');
    expect(factorDiagramElements.length).toBeGreaterThan(0);
  });

  it('should not render factor diagram card when is_dummy is true', () => {
    const dataWithDummy = {
      ...mockData,
      data: {
        ...mockData.data,
        factor_diagram: {
          ...mockData.data.factor_diagram,
          is_dummy: true,
          svg: '', // Empty SVG when is_dummy
        },
      },
    };

    render(<KeyInfoSection {...defaultProps} data={dataWithDummy as unknown} />);

    // When is_dummy is true and svg doesn't include factorGraphNoData, the card should not be rendered
    const factorDiagramCards = screen.queryAllByText('Factor Diagram');
    expect(factorDiagramCards.length).toBe(0);
  });

  it('should render TooltipOrSheet for risk assessment help', () => {
    render(<KeyInfoSection {...defaultProps} />);

    const tooltips = screen.getAllByTestId('tooltip-or-sheet');
    expect(tooltips.length).toBeGreaterThan(0);
  });

  it('should render TooltipOrSheet for key statistics help', () => {
    render(<KeyInfoSection {...defaultProps} />);

    const tooltips = screen.getAllByTestId('tooltip-or-sheet');
    expect(tooltips.length).toBeGreaterThan(1);
  });

  it('should render factor diagram', () => {
    render(<KeyInfoSection {...defaultProps} />);

    expect(screen.getByTestId('factor-diagram')).toBeInTheDocument();
  });

  it('should render factor diagram title', () => {
    render(<KeyInfoSection {...defaultProps} />);

    expect(screen.getByText('Factor Diagram')).toBeInTheDocument();
  });

  it('should handle missing change_pct values', () => {
    const dataWithMissingChange = {
      ...mockData,
      data: {
        ...mockData.data,
        key_stats: {
          ...mockData.data.key_stats,
          periods: {
            ...mockData.data.key_stats.periods,
            day1: {
              period: '1 Day',
              change_pct: {
                sign: null,
                value: null,
              },
            },
          },
        },
      },
    };

    render(<KeyInfoSection {...defaultProps} data={dataWithMissingChange as unknown} />);

    expect(screen.getByText('1 Day')).toBeInTheDocument();
  });

  it('should render with correct card layout classes', () => {
    const { container } = render(<KeyInfoSection {...defaultProps} />);

    const cards = container.querySelectorAll('[data-slot="card"]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should handle empty periods array', () => {
    const dataWithEmptyPeriods = {
      ...mockData,
      data: {
        ...mockData.data,
        key_stats: {
          ...mockData.data.key_stats,
          periods: {
            day1: { period: '', change_pct: { sign: 0, value: '' } },
            day5: { period: '', change_pct: { sign: 0, value: '' } },
            day22: { period: '', change_pct: { sign: 0, value: '' } },
            day66: { period: '', change_pct: { sign: 0, value: '' } },
            year_to_date: { period: '', change_pct: { sign: 0, value: '' } },
          },
        },
      },
    };

    render(<KeyInfoSection {...defaultProps} data={dataWithEmptyPeriods as unknown} />);

    expect(screen.getByText('Key Statistics')).toBeInTheDocument();
  });

  it('should render help images', () => {
    render(<KeyInfoSection {...defaultProps} />);

    const helpImages = screen.getAllByTestId('help-image');
    expect(helpImages.length).toBeGreaterThan(0);
  });
});
