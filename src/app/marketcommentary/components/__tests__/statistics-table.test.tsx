import { render, screen } from '@testing-library/react';

import { MarketCommentary } from '@/lib/types/market-commentary';

import StatisticsTable from '../statistics-table';

// Mock dependencies
jest.mock('@/lib/utils', () => {
  const actual = jest.requireActual('@/lib/utils');
  return {
    ...actual,
    cn: (...inputs: unknown[]) => {
      const filtered = inputs.filter(Boolean);
      return filtered.length > 0 ? filtered.join(' ') : '';
    },
    getBadgeVariant: jest.fn(() => 'success'),
  };
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock('@/environment/configuration', () => ({
  configuration: {
    DEFAULT_MARKET_ID: '1',
    DEFAULT_LANGUAGE: 'eng',
  },
}));

describe('StatisticsTable', () => {
  const mockData: MarketCommentary = {
    companies: [],
    statistics: [
      {
        table_name: 'Performance Statistics',
        table_definition: [
          { key: 'name', column_name: 'Company' },
          { key: 'value1', column_name: 'Value 1' },
          { key: 'value2', column_name: 'Value 2' },
        ],
        content: [
          {
            id: 1,
            name: 'Company A',
            value1: { value: '+10%', is_badge: true },
            value2: { value: '20.00', is_badge: false },
          },
          {
            id: 2,
            name: 'Company B',
            value1: { value: '-5%', is_badge: true },
            value2: { value: '15.00', is_badge: false },
          },
        ],
      },
      {
        table_name: 'Risk Statistics',
        table_definition: [
          { key: 'name', column_name: 'Company' },
          { key: 'risk', column_name: 'Risk Level' },
        ],
        content: [
          {
            id: 3,
            name: 'Company C',
            risk: { value: 'Low', is_badge: true },
          },
        ],
      },
    ],
    product_description: {
      info_text: 'Info',
      popup: {
        title: 'Popup',
        text: 'Text',
      },
    },
    meta: {
      title: 'Market Commentary',
      description: 'Description',
    },
  };

  it('should render statistics tables', () => {
    render(<StatisticsTable data={mockData} />);

    expect(screen.getByText('Performance Statistics')).toBeInTheDocument();
    expect(screen.getByText('Risk Statistics')).toBeInTheDocument();
  });

  it('should render table content', () => {
    render(<StatisticsTable data={mockData} />);

    expect(screen.getByText('Company A')).toBeInTheDocument();
    expect(screen.getByText('Company B')).toBeInTheDocument();
    expect(screen.getByText('Company C')).toBeInTheDocument();
  });

  it('should render badges for badge values', () => {
    render(<StatisticsTable data={mockData} />);

    expect(screen.getByText('+10%')).toBeInTheDocument();
    expect(screen.getByText('-5%')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  it('should render regular values for non-badge values', () => {
    render(<StatisticsTable data={mockData} />);

    expect(screen.getByText('20.00')).toBeInTheDocument();
    expect(screen.getByText('15.00')).toBeInTheDocument();
  });

  it('should render company links', () => {
    render(<StatisticsTable data={mockData} />);

    const links = screen.getAllByRole('link');
    const companyLinks = links.filter((link) => link.textContent?.includes('Company'));
    expect(companyLinks.length).toBeGreaterThan(0);
  });

  it('should render grid layout', () => {
    const { container } = render(<StatisticsTable data={mockData} />);

    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  it('should handle empty statistics array', () => {
    const emptyData = {
      ...mockData,
      statistics: [],
    };

    render(<StatisticsTable data={emptyData} />);

    expect(screen.queryByText('Performance Statistics')).not.toBeInTheDocument();
  });

  it('should handle missing table_definition', () => {
    const dataWithoutDefinition = {
      ...mockData,
      statistics: [
        {
          table_name: 'Test Table',
          table_definition: [],
          content: [
            {
              id: 1,
              name: 'Test Company',
            },
          ],
        },
      ],
    };

    render(<StatisticsTable data={dataWithoutDefinition} />);

    expect(screen.getByText('Test Table')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('should handle missing content', () => {
    const dataWithoutContent = {
      ...mockData,
      statistics: [
        {
          table_name: 'Empty Table',
          table_definition: [{ key: 'name', column_name: 'Company' }],
          content: [],
        },
      ],
    };

    render(<StatisticsTable data={dataWithoutContent} />);

    expect(screen.getByText('Empty Table')).toBeInTheDocument();
  });

  it('should render multiple tables', () => {
    render(<StatisticsTable data={mockData} />);

    const tables = screen.getAllByRole('table');
    expect(tables.length).toBe(2);
  });

  it('should handle cell values that are not objects', () => {
    const dataWithSimpleValues = {
      ...mockData,
      statistics: [
        {
          table_name: 'Simple Table',
          table_definition: [
            { key: 'name', column_name: 'Company' },
            { key: 'value', column_name: 'Value' },
          ],
          content: [
            {
              id: 1,
              name: 'Company X',
              value: 'Simple Value',
            },
          ],
        },
      ],
    };

    render(<StatisticsTable data={dataWithSimpleValues} />);

    expect(screen.getByText('Simple Value')).toBeInTheDocument();
  });

  it('should display dash for missing values', () => {
    const dataWithMissingValues = {
      ...mockData,
      statistics: [
        {
          table_name: 'Missing Values Table',
          table_definition: [
            { key: 'name', column_name: 'Company' },
            { key: 'missing', column_name: 'Missing' },
          ],
          content: [
            {
              id: 1,
              name: 'Company Y',
            },
          ],
        },
      ],
    };

    render(<StatisticsTable data={dataWithMissingValues} />);

    const dashes = screen.getAllByText('-');
    expect(dashes.length).toBeGreaterThan(0);
  });
});
