import { render, screen } from '@testing-library/react';

import type { PortfolioDevelopmentReport } from '@/lib/types/health-check';

import { PortfolioDevReportSection } from '../portfolio-dev-report-section';

const portfolioSectionSpy = jest.fn(() => <div data-testid="portfolio-section" />);

jest.mock('../portfolio-section', () => ({
  PortfolioSection: (props: Record<string, unknown>) => portfolioSectionSpy(props),
}));

jest.mock('@/components/custom-components/tooltip-or-sheet', () => ({
  TooltipOrSheet: ({
    triggerElement,
    text,
  }: {
    triggerElement: React.ReactNode;
    text: React.ReactNode;
  }) => (
    <div>
      {triggerElement}
      {text}
    </div>
  ),
}));

jest.mock('investtech/external-components', () => {
  const actual = jest.requireActual<typeof import('investtech/external-components')>(
    'investtech/external-components'
  );
  return {
    ...actual,
    Accordion: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    AccordionItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    AccordionTrigger: ({ children }: { children: React.ReactNode }) => (
      <button type="button">{children}</button>
    ),
    AccordionContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

jest.mock('@/utils/create-mark-up', () => ({
  RenderHTML: ({ html }: { html: string }) => <span>{html}</span>,
}));

describe('PortfolioDevReportSection', () => {
  beforeEach(() => {
    portfolioSectionSpy.mockClear();
  });

  it('should render portfolio sections and accordion label', () => {
    const data: PortfolioDevelopmentReport = {
      main_report: {
        title: 'Portfolio report',
        sub_title: 'Subtitle',
        ingress_full: 'Ingress',
        help_data: { title: 'Help', text_primary: 'Primary', text_secondary: 'Secondary' },
        stocks: {
          num_stocks: 6,
          labels: {
            show_more: 'Show more',
            show_more_items: 'Show more items',
            show_fewer_items: 'Show fewer',
          },
          stocks: Array.from({ length: 6 }).map((_, index) => ({
            ticker: `T${index}`,
            company_id: `${index}`,
            market_id: '1',
            company_name: `Company ${index}`,
            comment_text: 'Comment',
            chart_api_param_stock: '?stock=1',
            chart_api_param_common: '&chart_maximize=1',
            has_access: true,
          })),
        },
      },
      is_available: true,
      portfolio_chart: { is_available: true },
    } as PortfolioDevelopmentReport;

    render(<PortfolioDevReportSection data={data} />);

    expect(screen.getByText('Portfolio report')).toBeInTheDocument();
    expect(screen.getByText('Show more items')).toBeInTheDocument();
    expect(portfolioSectionSpy).toHaveBeenCalledTimes(6);
  });
});
