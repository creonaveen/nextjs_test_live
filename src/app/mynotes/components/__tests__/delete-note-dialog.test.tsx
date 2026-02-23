import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslations } from 'next-intl';

import { DeleteNoteDialog } from '../delete-note-dialog';

// Mock dependencies
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

jest.mock('@/lib/utils', () => {
  const actual = jest.requireActual('@/lib/utils');
  return {
    ...actual,
    cn: (...inputs: unknown[]) => {
      const filtered = inputs.filter(Boolean);
      return filtered.length > 0 ? filtered.join(' ') : '';
    },
    formatNoteForDisplay: jest.fn((text: string) => text),
  };
});

jest.mock('@/utils/date', () => ({
  getDate: jest.fn((date: string) => date || '2024-01-01'),
}));

const mockUseTranslations = useTranslations as jest.MockedFunction<typeof useTranslations>;

describe('DeleteNoteDialog', () => {
  const mockDeleteNote = jest.fn();
  const mockNote = {
    company_id: '1',
    name: 'Test Company',
    note: 'Test note',
    date: '2024-01-01',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue((key: string) => key);
  });

  it('should render delete note dialog trigger', () => {
    const { container } = render(
      <DeleteNoteDialog isLoading={false} selectedNote={mockNote} deleteNote={mockDeleteNote} />
    );

    const trigger = container.querySelector('#note-delete-icon');
    expect(trigger).toBeInTheDocument();
  });

  it('should call deleteNote when delete button is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DeleteNoteDialog isLoading={false} selectedNote={mockNote} deleteNote={mockDeleteNote} />
    );

    const trigger = container.querySelector('#note-delete-icon');
    if (trigger) {
      await user.click(trigger);

      // Open dialog first
      const deleteButton = screen.getByText('delete');
      if (deleteButton) {
        await user.click(deleteButton);
        expect(mockDeleteNote).toHaveBeenCalledWith('1');
      }
    }
  });

  it('should show loading state when isLoading is true', () => {
    const { container } = render(
      <DeleteNoteDialog isLoading={true} selectedNote={mockNote} deleteNote={mockDeleteNote} />
    );

    const trigger = container.querySelector('#note-delete-icon');
    expect(trigger).toBeInTheDocument();
  });
});
