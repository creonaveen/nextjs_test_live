import { render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';

import MyNotesPage from '../page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('../components/my-notes-table', () => ({
  __esModule: true,
  default: () => <div data-testid="my-notes-table">MyNotesTable</div>,
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;

describe('MyNotesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render MyNotesTable', () => {
    mockUseParams.mockReturnValue({} as unknown);

    render(<MyNotesPage />);

    expect(screen.getByTestId('my-notes-table')).toBeInTheDocument();
    expect(screen.getByText('MyNotesTable')).toBeInTheDocument();
  });
});
