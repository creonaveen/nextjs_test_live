import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslations } from 'next-intl';

import { useGetCompanyList } from '@/store/api-service/companies-api-service';

import { AddCompanyDialog } from '../add-company-dialog';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/store/api-service/companies-api-service', () => ({
  useGetCompanyList: jest.fn(),
}));

jest.mock('@/lib/hooks/use-keyboard-navigation', () => ({
  useKeyboardNavigation: jest.fn(() => ({
    selectedIndex: 0,
    getItemRef: jest.fn(),
  })),
}));

jest.mock('@/lib/utils', () => ({
  cn: (...inputs: unknown[]) => {
    const filtered = inputs.filter(Boolean);
    return filtered.length > 0 ? filtered.join(' ') : '';
  },
  getLanguageFromStorage: jest.fn(() => 'eng'),
}));

const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;
const mockUseGetCompanyList = useGetCompanyList as jest.MockedFunction<typeof useGetCompanyList>;

describe('AddCompanyDialog', () => {
  const mockHandleCompanyChange = jest.fn();
  const mockExistingCompanies = [];
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
    mockUseGetCompanyList.mockReturnValue({
      data: {
        results: [{ id: '1', name: 'Test Company', country_code: 'US' }],
      },
      isLoading: false,
    } as unknown);
  });

  it('should render add company dialog trigger', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AddCompanyDialog
          handleCompanyChange={mockHandleCompanyChange}
          existingCompanies={mockExistingCompanies}
        />
      </QueryClientProvider>
    );

    expect(screen.getByText('addCompany')).toBeInTheDocument();
  });

  it('should open dialog when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <QueryClientProvider client={queryClient}>
        <AddCompanyDialog
          handleCompanyChange={mockHandleCompanyChange}
          existingCompanies={mockExistingCompanies}
        />
      </QueryClientProvider>
    );

    const trigger = screen.getByText('addCompany');
    await user.click(trigger);

    expect(screen.getByPlaceholderText('searchCompany')).toBeInTheDocument();
  });
});
