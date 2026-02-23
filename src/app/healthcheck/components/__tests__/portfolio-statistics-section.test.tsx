import { fireEvent, render, screen } from '@testing-library/react';

import type { PortfolioDevelopmentReport } from '@/lib/types/health-check';

import { PortfolioStatisticsSection } from '../portfolio-statistics-section';

jest.mock('@radix-ui/react-radio-group', () => ({
  RadioGroup: ({
    children,
    onValueChange,
  }: {
    children: React.ReactNode;
    onValueChange: (value: string) => void;
  }) => (
    <div data-testid="radio-group" onClick={() => onValueChange('1M')}>
      {children}
    </div>
  ),
}));

jest.mock('investtech/external-components', () => {
  const actual = jest.requireActual<typeof import('investtech/external-components')>(
    'investtech/external-components'
  );
  return {
    ...actual,
    RadioGroupItem: ({ id, value }: { id: string; value: string }) => (
      <input id={id} value={value} readOnly />
    ),
    Button: ({ children, ...props }: { children: React.ReactNode }) => (
      <button type="button" {...props}>
        {children}
      </button>
    ),
    Label: ({ children }: { children: React.ReactNode }) => <label>{children}</label>,
    Table: ({ children }: { children: React.ReactNode }) => <table>{children}</table>,
    TableBody: ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>,
    TableRow: ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>,
    TableCell: ({ children }: { children: React.ReactNode }) => <td>{children}</td>,
    Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CardTitle: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

jest.mock('@/components/custom-components/svg-renderer', () => ({
  __esModule: true,
  default: ({ chart_params }: { chart_params: string }) => (
    <div data-testid="svg-renderer" data-params={chart_params} />
  ),
}));

jest.mock('@/utils/create-mark-up', () => ({
  RenderHTML: ({ html }: { html: string }) => <span>{html}</span>,
}));

describe('PortfolioStatisticsSection', () => {
  it('should update chart params when time span changes', () => {
    const data: PortfolioDevelopmentReport = {
      ingress: {
        title: 'Statistics',
        ingress_main: 'Main',
        ingress_full: 'Full',
      },
      portfolio_chart: {
        chart_spec: { chart_api_param: '?chart=1' },
        time_span: {
          selected: 'three',
          options: {
            one: { name: '1M', label: '1M', link: '&mnths=1', is_active: true },
            three: { name: '3M', label: '3M', link: '&mnths=3', is_active: true },
          },
        },
      },
      portfolio_statistics: {
        return_pct: [{ label: 'Return', port: '10%' }],
      },
    } as PortfolioDevelopmentReport;

    render(<PortfolioStatisticsSection data={data} />);

    expect(screen.getByTestId('svg-renderer')).toHaveAttribute('data-params', 'chart=1&mnths=3');

    fireEvent.click(screen.getByTestId('radio-group'));

    expect(screen.getByTestId('svg-renderer')).toHaveAttribute('data-params', 'chart=1&mnths=1');
  });
});
