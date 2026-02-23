import { render, screen } from '@testing-library/react';

import type { HealthCheckResponse } from '@/lib/types/health-check';

import { HealthCheckContent } from '../health-check-content';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('@/components/custom-components/factor-diagram/factor-diagram-container', () => ({
  FactorDiagramContainer: () => <div data-testid="factor-diagram" />,
}));

jest.mock('investtech/external-components', () => {
  const actual = jest.requireActual<typeof import('investtech/external-components')>(
    'investtech/external-components'
  );
  return {
    ...actual,
    Button: ({ children, ...props }: { children: React.ReactNode }) => (
      <button {...props}>{children}</button>
    ),
    Dialog: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DialogTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DialogTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DialogDescription: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

jest.mock('../correlation-matrix-section', () => ({
  __esModule: true,
  default: () => <div data-testid="correlation-section" />,
}));

jest.mock('../elements-health-section', () => ({
  ElementsHealth: () => <div data-testid="elements-health" />,
}));

jest.mock('../full-health-report-section', () => ({
  __esModule: true,
  default: () => <div data-testid="full-health-report" />,
}));

jest.mock('../key-ratios-section', () => ({
  KeyRatiosSection: () => <div data-testid="key-ratios" />,
}));

jest.mock('../overall-health-section', () => ({
  OverallHealth: () => <div data-testid="overall-health" />,
}));

jest.mock('../pie-donuts-section', () => ({
  PieDonutsSection: () => <div data-testid="pie-donuts" />,
}));

jest.mock('../portfolio-dev-report-section', () => ({
  __esModule: true,
  default: () => <div data-testid="portfolio-dev-report" />,
}));

jest.mock('../portfolio-statistics-section', () => ({
  PortfolioStatisticsSection: () => <div data-testid="portfolio-statistics" />,
}));

jest.mock('../warnings-section', () => ({
  __esModule: true,
  default: () => <div data-testid="warnings-section" />,
}));

describe('HealthCheckContent', () => {
  const baseData = {
    meta: { title: 'Health', description: 'Health check' },
    health_data: {
      overall_health_section: { title: 'Overall health' },
      score_bar_data: { categories: [] },
    },
    test_links: [],
  } as HealthCheckResponse;

  it('should render fallback when no test links available', () => {
    render(<HealthCheckContent data={baseData} />);

    expect(screen.getByText('Overall health')).toBeInTheDocument();
    expect(screen.getByTestId('overall-health')).toBeInTheDocument();
    expect(screen.getByTestId('elements-health')).toBeInTheDocument();
  });

  it('should render optional sections when data is available', () => {
    const dataWithSections = {
      ...baseData,
      factor_diagram: { active: true, labels: {} },
      kpis: { has_data: true },
      pies: { available_charts: [{ chart_id: '1' }] },
      correlation_analysis: { items: [] },
      data_and_calculation_warnings_section: { has_warnings: true, warning_count: 1 },
      health_data: {
        overall_health_section: { title: 'Overall health' },
        score_bar_data: { categories: [] },
        full_health_report_section: { title: 'Full report' },
        elements_health_section: { title: 'Elements' },
      },
    } as HealthCheckResponse;

    render(<HealthCheckContent data={dataWithSections} />);

    expect(screen.getByTestId('overall-health')).toBeInTheDocument();
    expect(screen.getByTestId('elements-health')).toBeInTheDocument();
    expect(screen.getByTestId('factor-diagram')).toBeInTheDocument();
    expect(screen.getByTestId('key-ratios')).toBeInTheDocument();
    expect(screen.getByTestId('warnings-section')).toBeInTheDocument();
    expect(screen.getByTestId('pie-donuts')).toBeInTheDocument();
    expect(screen.getByTestId('correlation-section')).toBeInTheDocument();
    expect(screen.getByTestId('full-health-report')).toBeInTheDocument();
  });
});
