import { render, screen } from '@testing-library/react';

import Return from '../return';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      errors: {
        noData: 'No data available',
      },
    };
    return translations[namespace]?.[key] || key;
  },
}));

jest.mock('@/components/custom-components/table-skeleton', () => ({
  __esModule: true,
  default: () => (
    <tbody data-testid="table-skeleton">
      <tr>
        <td>Table Skeleton</td>
      </tr>
    </tbody>
  ),
}));

jest.mock('investtech/external-components', () => ({
  Card: ({ children }: unknown) => <div data-testid="card">{children}</div>,
  CardContent: ({ children }: unknown) => <div data-testid="card-content">{children}</div>,
  Table: ({ children }: unknown) => <table>{children}</table>,
  TableHeader: ({ children }: unknown) => <thead>{children}</thead>,
  TableBody: ({ children }: unknown) => <tbody>{children}</tbody>,
  TableRow: ({ children }: unknown) => <tr>{children}</tr>,
  TableHead: ({ children }: unknown) => <th>{children}</th>,
  TableCell: ({ children }: unknown) => <td>{children}</td>,
}));

jest.mock('@/lib/utils', () => ({
  getResponsiveHideClass: jest.fn(() => ''),
  toKebabCase: jest.fn((str) => str?.toLowerCase().replace(/\s+/g, '-')),
}));

describe('Return', () => {
  const mockData = {
    headers: {
      return_annualized: 'Annualized Return',
    },
    annualized_return: {
      table_definition: [
        { key: 'name', column_name: 'Name', hidden_on_mobile: false, hidden_on_tablet: false },
        { key: 'year', column_name: '1 Year', hidden_on_mobile: false, hidden_on_tablet: false },
        { key: '3year', column_name: '3 Year', hidden_on_mobile: false, hidden_on_tablet: true },
        { key: '5year', column_name: '5 Year', hidden_on_mobile: false, hidden_on_tablet: false },
        { key: '10year', column_name: '10 Year', hidden_on_mobile: true, hidden_on_tablet: false },
        {
          key: 'since_inception',
          column_name: 'Since Inception',
          hidden_on_mobile: true,
          hidden_on_tablet: false,
        },
      ],
      content: [
        {
          name: 'Portfolio',
          annual_percentage_year: { value: '+5%' },
          annual_percentage_3year: { value: '+6%' },
          annual_percentage_5year: { value: '+7%' },
          annual_percentage_10year: { value: '+8%' },
          annual_percentage_since_inception: { value: '+9%' },
        },
      ],
    },
  };

  it('should render annualized return table', () => {
    render(<Return data={mockData as unknown} isLoading={false} />);

    expect(screen.getByText('Annualized Return')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('should render loading skeleton when isLoading is true', () => {
    render(<Return data={mockData as unknown} isLoading={true} />);

    expect(screen.getByTestId('table-skeleton')).toBeInTheDocument();
  });

  it('should render empty state when no data', () => {
    const dataWithoutReturn = {
      ...mockData,
      annualized_return: undefined,
    };

    render(<Return data={dataWithoutReturn as unknown} isLoading={false} />);

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should render return values', () => {
    render(<Return data={mockData as unknown} isLoading={false} />);

    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });
});
