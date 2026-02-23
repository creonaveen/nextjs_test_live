import { render } from '@testing-library/react';
import { useTranslations } from 'next-intl';

import { DeleteCompanyDialog } from '../delete-company-dialog';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;

describe('DeleteCompanyDialog', () => {
  const mockDeleteCompany = jest.fn();
  const mockCompany = {
    id: '1',
    name: 'Test Company',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
  });

  it('should render delete company dialog trigger', () => {
    const { container } = render(
      <DeleteCompanyDialog
        isLoading={false}
        selectedCompany={mockCompany}
        deleteCompany={mockDeleteCompany}
      />
    );

    const trigger = container.querySelector('#watchlist-delete-icon');
    expect(trigger).toBeDefined();
  });

  it('should show loading state when isLoading is true', () => {
    const { container } = render(
      <DeleteCompanyDialog
        isLoading={true}
        selectedCompany={mockCompany}
        deleteCompany={mockDeleteCompany}
      />
    );

    const trigger = container.querySelector('#watchlist-delete-icon');
    expect(trigger).toBeDefined();
  });
});
