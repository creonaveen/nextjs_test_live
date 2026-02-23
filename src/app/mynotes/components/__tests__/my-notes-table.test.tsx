import userEvent from '@testing-library/user-event';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';

import { usePlatform } from '@/lib/platform';
import { useDeleteMyNotes, useGetMyNotes } from '@/store/api-service/mynotes-api-service';
import { renderWithQueryClient, screen } from '@/test/utils/render-with-query-client';

import MyNotesTable from '../my-notes-table';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(),
}));

jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(),
}));

jest.mock('@/store/api-service/mynotes-api-service', () => ({
  useGetMyNotes: jest.fn(),
  useDeleteMyNotes: jest.fn(),
}));

jest.mock('@/lib/utils', () => {
  const actual = jest.requireActual('@/lib/utils');
  return {
    ...actual,
    cn: (...inputs: unknown[]) => {
      const filtered = inputs.filter(Boolean);
      return filtered.length > 0 ? filtered.join(' ') : '';
    },
    getLanguageFromStorage: jest.fn(() => 'eng'),
    formatNoteForDisplay: jest.fn((text: string) => text),
    getResponsiveHideClass: jest.fn(() => ''),
  };
});

jest.mock('@/utils/date', () => ({
  getDate: jest.fn((date: string) => date || '2024-01-01'),
}));

jest.mock('@/components/custom-components/icon', () => ({
  arrowUp: jest.fn(() => <span data-testid="arrow-up">↑</span>),
  arrowDown: jest.fn(() => <span data-testid="arrow-down">↓</span>),
}));

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

jest.mock('../note-dialog', () => ({
  NoteDialog: ({ note, onOpenChange }: unknown) => (
    <button onClick={() => onOpenChange(true)} data-testid="note-dialog">
      {note}
    </button>
  ),
}));

jest.mock('../delete-note-dialog', () => ({
  DeleteNoteDialog: ({ selectedNote, deleteNote }: unknown) => (
    <button onClick={() => deleteNote(selectedNote?.company_id)} data-testid="delete-note-dialog">
      Delete
    </button>
  ),
}));

const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;
const mockUseQueryState = useQueryState as jest.MockedFunction<typeof useQueryState>;
const mockUsePlatform = usePlatform as jest.MockedFunction<typeof usePlatform>;
const mockUseGetMyNotes = useGetMyNotes as jest.MockedFunction<typeof useGetMyNotes>;
const mockUseDeleteMyNotes = useDeleteMyNotes as jest.MockedFunction<typeof useDeleteMyNotes>;

describe('MyNotesTable', () => {
  const mockSetPage = jest.fn();
  const mockSetLimit = jest.fn();
  const mockSetOrdering = jest.fn();
  const mockRefetch = jest.fn();

  const mockData = {
    results: [
      {
        company_id: '1',
        name: 'Test Company',
        note: 'Test note',
        date: '2024-01-01',
        market_id: '1',
      },
    ],
    count: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
    mockUseQueryState.mockImplementation((key: string) => {
      if (key === 'page') return [1, mockSetPage];
      if (key === 'limit') return [10, mockSetLimit];
      if (key === 'ordering') return ['date', mockSetOrdering];
      return [null, jest.fn()];
    });
    mockUsePlatform.mockReturnValue('desktop');
    mockUseGetMyNotes.mockReturnValue({
      data: mockData,
      isLoading: false,
      refetch: mockRefetch,
      isRefetching: false,
    } as unknown);
    mockUseDeleteMyNotes.mockReturnValue({
      isLoading: false,
      isSuccess: false,
      isRefetching: false,
    } as unknown);
  });

  it('should render my notes table', () => {
    renderWithQueryClient(<MyNotesTable />);

    expect(screen.getByText('myNotes')).toBeInTheDocument();
  });

  it('should render notes data', () => {
    renderWithQueryClient(<MyNotesTable />);

    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Test note')).toBeInTheDocument();
  });

  it('should render loading skeleton when loading', () => {
    mockUseGetMyNotes.mockReturnValue({
      data: null,
      isLoading: true,
      refetch: mockRefetch,
      isRefetching: false,
    } as unknown);

    const { container } = renderWithQueryClient(<MyNotesTable />);

    const tableBody = container.querySelector('tbody');
    expect(tableBody).toBeInTheDocument();
  });

  it('should render no data message when results are empty', () => {
    mockUseGetMyNotes.mockReturnValue({
      data: { results: [], count: 0 },
      isLoading: false,
      refetch: mockRefetch,
      isRefetching: false,
    } as unknown);

    renderWithQueryClient(<MyNotesTable />);

    expect(screen.getByText('noData')).toBeInTheDocument();
  });

  it('should handle column header click for ordering', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<MyNotesTable />);

    const nameHeader = screen.getByText('company').closest('th');
    if (nameHeader) {
      await user.click(nameHeader);
      expect(mockSetOrdering).toHaveBeenCalled();
    }
  });
});
