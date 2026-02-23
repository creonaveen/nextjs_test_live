import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';

import { MarketCommentary } from '@/lib/types/market-commentary';

import MarketCommentaryDetails from '../market-commentary-details';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('../companies', () => ({
  __esModule: true,
  default: ({ data }: unknown) => (
    <div data-testid="companies">Companies: {data?.companies?.length || 0} companies</div>
  ),
}));

jest.mock('../statistics-table', () => ({
  __esModule: true,
  default: ({ data }: unknown) => (
    <div data-testid="statistics-table">Statistics: {data?.statistics?.length || 0} tables</div>
  ),
}));

// DescriptionDialog mock removed as the component is commented out in MarketCommentaryDetails

const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;

describe('MarketCommentaryDetails', () => {
  const mockData: MarketCommentary = {
    companies: [],
    statistics: [],
    product_description: {
      info_text: 'Market commentary information',
      popup: {
        title: 'Info',
        text: 'Popup text',
      },
    },
    meta: {
      title: 'Market Commentary',
      description: 'Market commentary description',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
  });

  it('should render market commentary header', () => {
    render(<MarketCommentaryDetails data={mockData} isError={false} />);

    expect(screen.getByText('marketCommentary')).toBeInTheDocument();
  });

  it('should render product description info text', () => {
    render(<MarketCommentaryDetails data={mockData} isError={false} />);

    expect(screen.getByText('Market commentary information')).toBeInTheDocument();
  });

  // Description dialog test removed as the component is commented out in MarketCommentaryDetails

  it('should render companies component when companies exist', () => {
    const dataWithCompanies = {
      ...mockData,
      companies: [
        {
          company_id: 1,
          name: 'Test Company',
          ticker: 'TEST',
        } as unknown,
      ],
    };

    render(<MarketCommentaryDetails data={dataWithCompanies} isError={false} />);

    const companies = screen.getByTestId('companies');
    expect(companies).toBeInTheDocument();
    expect(companies).toHaveTextContent('1 companies');
  });

  it('should render statistics table when statistics exist', () => {
    const dataWithStatistics = {
      ...mockData,
      statistics: [
        {
          table_name: 'Test Table',
          table_definition: [],
          content: [],
        } as unknown,
      ],
    };

    render(<MarketCommentaryDetails data={dataWithStatistics} isError={false} />);

    const statistics = screen.getByTestId('statistics-table');
    expect(statistics).toBeInTheDocument();
    expect(statistics).toHaveTextContent('1 tables');
  });

  it('should not render companies component when companies is missing', () => {
    const dataWithoutCompanies = {
      ...mockData,
      companies: undefined,
    };

    render(<MarketCommentaryDetails data={dataWithoutCompanies as unknown} isError={false} />);

    const companies = screen.queryByTestId('companies');
    expect(companies).not.toBeInTheDocument();
  });

  it('should not render statistics table when statistics is missing', () => {
    const dataWithoutStatistics = {
      ...mockData,
      statistics: undefined,
    };

    render(<MarketCommentaryDetails data={dataWithoutStatistics as unknown} isError={false} />);

    const statistics = screen.queryByTestId('statistics-table');
    expect(statistics).not.toBeInTheDocument();
  });

  it('should throw error when isError is true', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<MarketCommentaryDetails data={mockData} isError={true} />);
    }).toThrow();

    consoleSpy.mockRestore();
  });

  it('should render both companies and statistics when both exist', () => {
    const dataWithBoth = {
      ...mockData,
      companies: [
        {
          company_id: 1,
          name: 'Test Company',
          ticker: 'TEST',
        } as unknown,
      ],
      statistics: [
        {
          table_name: 'Test Table',
          table_definition: [],
          content: [],
        } as unknown,
      ],
    };

    render(<MarketCommentaryDetails data={dataWithBoth} isError={false} />);

    expect(screen.getByTestId('companies')).toBeInTheDocument();
    expect(screen.getByTestId('statistics-table')).toBeInTheDocument();
  });
});
