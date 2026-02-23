import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslations } from 'next-intl';

import { NoteDialog } from '../note-dialog';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;

describe('NoteDialog', () => {
  const mockOnOpenChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
  });

  it('should render note dialog trigger', () => {
    render(<NoteDialog note="Test note" onOpenChange={mockOnOpenChange} />);

    expect(screen.getByText('Test note')).toBeInTheDocument();
  });

  it('should call onOpenChange when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<NoteDialog note="Test note" onOpenChange={mockOnOpenChange} />);

    const trigger = screen.getByText('Test note');
    await user.click(trigger);

    expect(mockOnOpenChange).toHaveBeenCalledWith(true);
  });

  it('should open dialog when trigger is activated', async () => {
    const user = userEvent.setup();
    render(<NoteDialog note="Test note" onOpenChange={mockOnOpenChange} />);

    const trigger = screen.getByText('Test note');
    await user.click(trigger);

    expect(mockOnOpenChange).toHaveBeenCalled();
  });
});
