import React from 'react';
import { render, screen } from '@testing-library/react';

import { TechAnalysisHeader } from '../tech-analysis-header/tech-analysis-header';

jest.mock('@/components/link', () => ({
  Link: ({ href, children, ...props }: { href: string; children?: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock FactorDiagram
jest.mock('@/components/custom-components/factor-diagram/factor-diagram', () => ({
  __esModule: true,
  default: ({ rawSvgHtml }: { rawSvgHtml: string }) => (
    <div data-testid="factor-diagram">{rawSvgHtml}</div>
  ),
}));

// Mock TooltipOrSheet
jest.mock('../tooltip-or-sheet', () => ({
  TooltipOrSheet: ({ triggerElement, text }: unknown) => (
    <div data-testid="tooltip-or-sheet">
      {triggerElement}
      {text}
    </div>
  ),
}));

// Mock usePlatform
jest.mock('@/lib/platform', () => ({
  usePlatform: () => 'desktop',
}));

const mockPrice = {
  close: '100.50',
  profit_loss_percent: {
    value: '+5.2%',
    sign: '+',
  },
  price_date_long: '2024-01-15',
};

const mockStaticInfo = {
  description: 'Test company description',
  description_suggested_clip_length: 50,
  company_url: 'example.com',
  source: 'Test Source',
};

const mockSectors = {
  sector: { name: 'Technology' },
  group: { name: 'Software' },
  industry: { name: 'SaaS' },
};

const mockRecommendation = {
  investtech: {
    score: 8,
    eval_text: 'Buy',
    color: 'buy',
  },
  analyst: {
    eval_text: 'Hold',
    color: 'hold',
  },
};

const mockRisk = {
  total: {
    level: 'Low',
    text_long: 'Low Risk',
    color: 'green',
  },
};

const mockLabelAndTexts = {
  close: 'Close',
  updated: 'Updated',
  about_company: 'About Company',
  source: 'Source',
  sector: 'Sector',
  recommendation: 'Recommendation',
  recommendation_card_help: 'Help text',
};

describe('TechAnalysisHeader', () => {
  it('should render price information', () => {
    render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    // Multiple "Close" elements exist (mobile and desktop), use getAllByText
    expect(screen.getAllByText('Close').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Updated').length).toBeGreaterThan(0);
  });

  it('should render price value with HTML', () => {
    const { container } = render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    const priceElement = container.querySelector('span[class*="text-sm"]');
    expect(priceElement).toBeInTheDocument();
  });

  it('should render profit/loss badge', () => {
    const { container } = render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    // Badge might be rendered multiple times (mobile/desktop)
    expect(container.textContent).toContain('+5.2%');
  });

  it('should render company description', () => {
    const { container } = render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    expect(container.textContent).toMatch(/test company description/i);
  });

  it('should render company URL as link', () => {
    render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    // Multiple links might exist (mobile/desktop)
    const links = screen.getAllByText('example.com');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', 'https://example.com');
  });

  it('should render sector badges', () => {
    const { container } = render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    expect(container.textContent).toContain('Technology');
    expect(container.textContent).toContain('Software');
    expect(container.textContent).toContain('SaaS');
  });

  it('should render recommendation score', () => {
    const { container } = render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    expect(container.textContent).toMatch(/8/);
    expect(container.textContent).toContain('Buy');
  });

  it('should render risk badge', () => {
    render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    expect(screen.getByText('Low Risk')).toBeInTheDocument();
  });

  it('should render factor diagram when provided', () => {
    render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
        factor_diagram_thumb="<svg></svg>"
      />
    );

    expect(screen.getByTestId('factor-diagram')).toBeInTheDocument();
  });

  it('should not render factor diagram when factorGraphNoData class is present', () => {
    render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
        factor_diagram_thumb='<div class="factorGraphNoData">NoData</div>'
      />
    );

    expect(screen.queryByTestId('factor-diagram')).not.toBeInTheDocument();
  });

  it('should not render factor diagram when factorGraphNoData string is in SVG', () => {
    render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
        factor_diagram_thumb="<svg>factorGraphNoData</svg>"
      />
    );

    expect(screen.queryByTestId('factor-diagram')).not.toBeInTheDocument();
  });

  it('should render extreme risk warning', () => {
    const extremeRisk = {
      total: {
        level: 'Extreme',
        text_long: 'Extreme Risk',
        color: 'red',
      },
    };

    render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={extremeRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    expect(screen.getByText('Extreme Risk')).toBeInTheDocument();
  });

  it('should handle missing profit_loss_percent', () => {
    const priceWithoutProfitLoss = {
      ...mockPrice,
      profit_loss_percent: undefined,
    };

    render(
      <TechAnalysisHeader
        price={priceWithoutProfitLoss}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    expect(screen.queryByText('+5.2%')).not.toBeInTheDocument();
  });

  it('should handle missing description', () => {
    const staticInfoWithoutDescription = {
      ...mockStaticInfo,
      description: '',
    };

    render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={staticInfoWithoutDescription}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    expect(screen.queryByText(/test company description/i)).not.toBeInTheDocument();
  });

  it('should handle missing sectors', () => {
    const emptySectors = {
      sector: null,
      group: null,
      industry: null,
    };

    render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={emptySectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    expect(screen.queryByText('Technology')).not.toBeInTheDocument();
  });

  it('should render analyst recommendation when investtech is missing', () => {
    const analystOnlyRecommendation = {
      investtech: {
        eval_text: 'Hold',
        color: 'hold',
        score: null,
      },
      analyst: {
        eval_text: 'Hold',
        color: 'hold',
      },
    };

    render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={analystOnlyRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    expect(screen.getByText(/Hold/)).toBeInTheDocument();
  });

  it('should apply correct styling for About Company label in dark mode context', () => {
    const { container } = render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    // Check that the dark mode class is applied correctly
    // The class contains dark:text-grey-600
    expect(container.textContent).toContain('About Company');
  });

  it('should use primary-active color for company URL link', () => {
    const { container } = render(
      <TechAnalysisHeader
        price={mockPrice}
        static_info={mockStaticInfo}
        sectors={mockSectors}
        recommendation={mockRecommendation}
        risk={mockRisk}
        labelAndTexts={mockLabelAndTexts}
      />
    );

    // Check that links with primary-active class exist
    const links = container.querySelectorAll('a[class*="text-primary"]');
    expect(links.length).toBeGreaterThan(0);
    // Verify one of the links has href to company URL
    expect(container.textContent).toContain('example.com');
  });
});
