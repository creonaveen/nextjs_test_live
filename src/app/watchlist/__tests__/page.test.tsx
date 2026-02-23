import { render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';

import WatchlistPage from '../page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('../components/watchlist-table', () => ({
  WatchlistTable: () => <div data-testid="watchlist-table">WatchlistTable</div>,
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;

describe('WatchlistPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render WatchlistTable from params', () => {
    mockUseParams.mockReturnValue({} as unknown);

    render(<WatchlistPage />);

    expect(screen.getByTestId('watchlist-table')).toBeInTheDocument();
    expect(screen.getByText('WatchlistTable')).toBeInTheDocument();
  });
});
