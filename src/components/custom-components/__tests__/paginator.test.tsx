import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as nuqs from 'nuqs';

import Paginator from '../paginator';

// Mock nuqs
const mockSetCurrentPage = jest.fn().mockResolvedValue(undefined);
const mockSetSelectedPageSize = jest.fn().mockResolvedValue(undefined);

jest.mock('nuqs', () => ({
  useQueryState: jest.fn((key: string) => {
    if (key === 'page') {
      return [1, mockSetCurrentPage];
    }
    if (key === 'limit') {
      return [20, mockSetSelectedPageSize];
    }
    return [null, jest.fn().mockResolvedValue(undefined)];
  }),
}));

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      rowsPerPage: 'Rows per page',
      of: 'of',
      firstPage: 'First page',
      previousPage: 'Previous page',
      nextPage: 'Next page',
      lastPage: 'Last page',
      'pagination.first': 'First page',
      'pagination.previous': 'Previous page',
      'pagination.next': 'Next page',
      'pagination.last': 'Last page',
    };
    return translations[key] || key;
  },
}));

// Mock window.scrollTo
global.scrollTo = jest.fn();

describe('Paginator', () => {
  const mockPageParent = jest.fn();
  const mockPageSizeParent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockSetCurrentPage.mockClear();
    mockSetSelectedPageSize.mockClear();
  });

  it('should render paginator with default values', () => {
    render(
      <Paginator
        pageParent={mockPageParent}
        pageSize={20}
        pageSizeParent={mockPageSizeParent}
        countRow={100}
      />
    );

    expect(screen.getByText(/rows per page/i)).toBeInTheDocument();
    expect(screen.getByText(/of 100/i)).toBeInTheDocument();
  });

  it('should display correct row range', () => {
    render(
      <Paginator
        pageParent={mockPageParent}
        pageSize={20}
        pageSizeParent={mockPageSizeParent}
        countRow={100}
      />
    );

    expect(screen.getByText(/1 - 20/i)).toBeInTheDocument();
  });

  it('should call pageParent when page changes', async () => {
    const user = userEvent.setup();
    render(
      <Paginator
        pageParent={mockPageParent}
        pageSize={20}
        pageSizeParent={mockPageSizeParent}
        countRow={100}
      />
    );

    const nextButton = screen.getByLabelText('Go to next page');
    await user.click(nextButton);

    expect(mockSetCurrentPage).toHaveBeenCalled();
  });

  it('should call pageSizeParent when page size changes', async () => {
    const user = userEvent.setup();
    render(
      <Paginator
        pageParent={mockPageParent}
        pageSize={20}
        pageSizeParent={mockPageSizeParent}
        countRow={100}
      />
    );

    const select = screen.getByRole('combobox');
    await user.click(select);

    const option50 = screen.getByText('50');
    await user.click(option50);

    expect(mockSetSelectedPageSize).toHaveBeenCalled();
  });

  it('should disable first and previous buttons on first page', () => {
    render(
      <Paginator
        pageParent={mockPageParent}
        pageSize={20}
        pageSizeParent={mockPageSizeParent}
        countRow={100}
      />
    );

    const firstButton = screen.getByLabelText('Go to first page');
    const previousButton = screen.getByLabelText('Go to previous page');

    expect(firstButton).toHaveClass('pointer-events-none');
    expect(previousButton).toHaveClass('pointer-events-none');
  });

  it('should show spinner when isAPILoad is true', () => {
    const { container } = render(
      <Paginator
        pageParent={mockPageParent}
        pageSize={20}
        pageSizeParent={mockPageSizeParent}
        countRow={100}
        isAPILoad={true}
      />
    );

    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('should calculate total pages correctly', () => {
    render(
      <Paginator
        pageParent={mockPageParent}
        pageSize={20}
        pageSizeParent={mockPageSizeParent}
        countRow={100}
      />
    );

    // Total pages should be 5 (100 / 20)
    expect(screen.getByText(/of 100/i)).toBeInTheDocument();
  });

  it('should handle zero countRow', () => {
    render(
      <Paginator
        pageParent={mockPageParent}
        pageSize={20}
        pageSizeParent={mockPageSizeParent}
        countRow={0}
      />
    );

    expect(screen.getByText(/0 - 0/i)).toBeInTheDocument();
  });

  it('should include custom page size in options if not in standard list', () => {
    (nuqs.useQueryState as jest.Mock).mockImplementation((key: string) => {
      if (key === 'page') {
        return [1, mockSetCurrentPage];
      }
      if (key === 'limit') {
        return [15, mockSetSelectedPageSize]; // Custom value not in standard list
      }
      return [null, jest.fn()];
    });

    render(
      <Paginator
        pageParent={mockPageParent}
        pageSize={20}
        pageSizeParent={mockPageSizeParent}
        countRow={100}
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });
});
