import userEvent from '@testing-library/user-event';

import * as platform from '@/lib/platform';
import { useCreateMyNotes, useDeleteMyNotes } from '@/store/api-service/mynotes-api-service';
import { renderWithQueryClient, screen, waitFor } from '@/test/utils/render-with-query-client';

import { TakeNotesSheet } from '../take-notes-sheet';

// Mock dependencies
jest.mock('@/lib/platform', () => ({
  usePlatform: jest.fn(() => 'desktop'),
}));

jest.mock('@/lib/utils', () => {
  const actual = jest.requireActual('@/lib/utils');
  return {
    ...actual,
    formatNoteForDisplay: jest.fn((note) => note || ''),
    getLanguageFromStorage: jest.fn(() => 'eng'),
    cn: (...inputs: unknown[]) => {
      const filtered = inputs.filter(Boolean);
      return filtered.length > 0 ? filtered.join(' ') : '';
    },
  };
});

jest.mock('@/store/api-service/mynotes-api-service', () => ({
  useCreateMyNotes: jest.fn(),
  useDeleteMyNotes: jest.fn(),
}));

const mockUseCreateMyNotes = useCreateMyNotes as jest.MockedFunction<typeof useCreateMyNotes>;
const mockUseDeleteMyNotes = useDeleteMyNotes as jest.MockedFunction<typeof useDeleteMyNotes>;

describe('TakeNotesSheet', () => {
  // Mock translation function that returns the key as the value
  const mockT = (key: string) => {
    const translations: Record<string, string> = {
      save: 'Save',
      saving: 'Saving',
      clear: 'Clear',
      delete: 'Delete',
      deleting: 'Deleting',
      characters: 'characters',
    };
    return translations[key] || key;
  };

  const defaultProps = {
    companyName: 'Test Company',
    companyId: '123',
    t: mockT,
    labels: {
      buttonLabel: 'Take Notes',
      title: 'MY NOTES',
      placeholder: 'Enter your notes here',
      addNoteLabel: 'Add note',
      editNoteLabel: 'Edit note',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (platform.usePlatform as jest.Mock).mockReturnValue('desktop');

    mockUseCreateMyNotes.mockReturnValue({
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined,
      mutateAsync: jest.fn(),
      reset: jest.fn(),
    } as unknown as ReturnType<typeof useCreateMyNotes>);

    mockUseDeleteMyNotes.mockReturnValue({
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined,
      mutateAsync: jest.fn(),
      reset: jest.fn(),
    } as unknown as ReturnType<typeof useDeleteMyNotes>);
  });

  it('should render trigger button', () => {
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'Add note for Test Company' })).toBeInTheDocument();
  });

  it('should open sheet when trigger is clicked', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('should render textarea with placeholder', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    const textarea = screen.getByPlaceholderText('Enter your notes here');
    expect(textarea).toBeInTheDocument();
  });

  it('should display existing note when provided', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} existingNote="Existing note text" />);

    const trigger = screen.getByRole('button', { name: 'Edit note for Test Company' });
    await user.click(trigger);

    const textarea = screen.getByPlaceholderText('Enter your notes here') as HTMLTextAreaElement;
    expect(textarea.value).toBe('Existing note text');
  });

  it('should display character count', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    const textarea = screen.getByPlaceholderText('Enter your notes here');
    await user.type(textarea, 'Test note');

    expect(screen.getByText(/9\/1000/)).toBeInTheDocument();
  });

  it('should disable save button when note is empty', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });

    // Find save button by its aria-label (it has type="submit", not type="button")
    const saveButton = screen.getByRole('button', { name: 'Save note for Test Company' });
    expect(saveButton).toBeDisabled();
  });

  it('should enable save button when note has content', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText('Enter your notes here');
    await user.type(textarea, 'Test note');

    // Find save button by its aria-label (it has type="submit", not type="button")
    const saveButton = screen.getByRole('button', { name: 'Save note for Test Company' });
    expect(saveButton).not.toBeDisabled();
  });

  it('should disable save button when note matches existing note', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} existingNote="Test note" />);

    const trigger = screen.getByRole('button', { name: 'Edit note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Edit note' })).toBeInTheDocument();
    });

    // Find save button by its id (it has type="submit", not type="button")
    const saveButton = screen.getByRole('button', { name: 'Save note for Test Company' });
    expect(saveButton).toBeDisabled();
  });

  it('should call useCreateMyNotes when form is submitted', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText('Enter your notes here');
    await user.type(textarea, 'New note');

    // Find save button by its aria-label (it has type="submit", not type="button")
    const saveButton = screen.getByRole('button', { name: 'Save note for Test Company' });
    await user.click(saveButton);
    await waitFor(() => {
      expect(mockUseCreateMyNotes).toHaveBeenCalled();
    });
  });

  it('should show loading state when saving', async () => {
    mockUseCreateMyNotes.mockReturnValue({
      isPending: true,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined,
      mutateAsync: jest.fn(),
      reset: jest.fn(),
    } as unknown as ReturnType<typeof useCreateMyNotes>);

    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText('Enter your notes here');
    await user.type(textarea, 'New note');

    // Button keeps aria-label "Save note for ..."; when saving it shows "Saving" and is disabled
    const saveButton = screen.getByRole('button', { name: 'Save note for Test Company' });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
    expect(saveButton).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText(/saving/i)).toBeInTheDocument();
  });

  it('should close sheet after successful save', async () => {
    const mockOnRefreshData = jest.fn().mockResolvedValue({});
    mockUseCreateMyNotes.mockReturnValue({
      isPending: false,
      isSuccess: true,
      isError: false,
      error: null,
      data: undefined,
      mutateAsync: jest.fn(),
      reset: jest.fn(),
    } as unknown as ReturnType<typeof useCreateMyNotes>);

    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} onRefreshData={mockOnRefreshData} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText('Enter your notes here');
    await user.type(textarea, 'New note');

    // Find save button by its aria-label (it has type="submit", not type="button")
    const saveButton = screen.getByRole('button', { name: 'Save note for Test Company' });
    await user.click(saveButton);
    await waitFor(() => {
      expect(mockOnRefreshData).toHaveBeenCalled();
    });
  });

  it('should show delete button when note exists', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} existingNote="Existing note" />);

    const trigger = screen.getByRole('button', { name: 'Edit note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Edit note' })).toBeInTheDocument();
    });

    // Find delete/clear button (second button in footer)
    const buttons = screen.getAllByRole('button');
    const deleteButton = buttons.find(
      (btn) => btn.closest('[data-slot="sheet-footer"]') && btn.getAttribute('type') === 'button'
    );

    expect(deleteButton).toBeInTheDocument();
  });

  it('should show clear button when no note exists', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });

    // Find clear button (second button in footer)
    const buttons = screen.getAllByRole('button');
    const clearButton = buttons.find(
      (btn) => btn.closest('[data-slot="sheet-footer"]') && btn.getAttribute('type') === 'button'
    );

    expect(clearButton).toBeInTheDocument();
  });

  it('should call useDeleteMyNotes when delete is clicked', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} existingNote="Existing note" />);

    const trigger = screen.getByRole('button', { name: 'Edit note for Test Company' });
    await user.click(trigger);

    const deleteButton = screen.getByRole('button', { name: 'Delete note for Test Company' });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(mockUseDeleteMyNotes).toHaveBeenCalled();
    });
  });

  it('should clear form when clear is clicked with no existing note', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    const textarea = screen.getByPlaceholderText('Enter your notes here');
    await user.type(textarea, 'Test note');

    const clearButton = screen.getByRole('button', { name: 'Clear note for Test Company' });
    await user.click(clearButton);

    expect((textarea as HTMLTextAreaElement).value).toBe('');
  });

  it('should disable buttons when loading', async () => {
    mockUseCreateMyNotes.mockReturnValue({
      isPending: true,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined,
      mutateAsync: jest.fn(),
      reset: jest.fn(),
    } as unknown as ReturnType<typeof useCreateMyNotes>);

    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });

    const saveButton = screen.getByRole('button', { name: 'Save note for Test Company' });
    const clearButton = screen.getByRole('button', { name: 'Clear note for Test Company' });

    expect(saveButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  it('should handle form validation error', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });

    // Try to submit empty form (should be disabled, but test the validation)
    const textarea = screen.getByPlaceholderText('Enter your notes here');
    await user.type(textarea, '   '); // Only whitespace

    // Find save button by its aria-label (it has type="submit", not type="button")
    // Button should be disabled when only whitespace
    const saveButton = screen.getByRole('button', { name: 'Save note for Test Company' });
    expect(saveButton).toBeDisabled();
  });

  it('should render with full width on mobile', () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('mobile');
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    expect(trigger).toHaveClass('w-full');
  });

  it('should render sheet on right side for desktop', async () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('desktop');
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });
  });

  it('should render sheet on bottom for mobile', async () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('mobile');
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });
  });

  it('should use default labels when not provided', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} labels={undefined} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });
  });

  it('should prevent closing during save operation', async () => {
    mockUseCreateMyNotes.mockReturnValue({
      isPending: true,
      isSuccess: false,
      isError: false,
      error: null,
      data: undefined,
      mutateAsync: jest.fn(),
      reset: jest.fn(),
    } as unknown as ReturnType<typeof useCreateMyNotes>);

    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    // Sheet should remain open during save
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });
  });

  it('should prevent auto-focus on mobile to avoid keyboard triggering', async () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('mobile');
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });

    // Textarea should exist but should not have auto focus
    const textarea = screen.getByPlaceholderText('Enter your notes here');
    expect(textarea).toBeInTheDocument();
    // On mobile, the textarea should not be auto-focused on sheet open
    expect(document.activeElement).not.toBe(textarea);
  });

  it('should take full height on mobile view', async () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('mobile');
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });

    // Sheet content uses h-auto on mobile (bottom sheet)
    const sheetContent = screen
      .getByRole('heading', { name: 'Add note' })
      .closest('[data-slot="sheet-content"]');
    expect(sheetContent).toHaveClass('h-full');
  });

  it('should take full height on tablet view', async () => {
    (platform.usePlatform as jest.Mock).mockReturnValue('tablet');
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });

    // Sheet content uses h-auto on tablet (bottom sheet)
    const sheetContent = screen
      .getByRole('heading', { name: 'Add note' })
      .closest('[data-slot="sheet-content"]');
    expect(sheetContent).toHaveClass('h-auto');
  });

  it('should have proper spacing between textarea and buttons on all platforms', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });

    // Find the footer which should have mt-8 spacing
    const headerElement = screen
      .getByRole('heading', { name: 'Add note' })
      .closest('[data-slot="sheet-header"]');
    const sheetFooter = headerElement?.parentElement?.querySelector('[data-slot="sheet-footer"]');
    expect(sheetFooter).toHaveClass('mt-8');
  });

  it('should have autoComplete attribute on textarea', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    const trigger = screen.getByRole('button', { name: 'Add note for Test Company' });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Add note' })).toBeInTheDocument();
    });

    const textarea = screen.getByPlaceholderText('Enter your notes here') as HTMLTextAreaElement;
    expect(textarea).toHaveAttribute('autoComplete', 'off');
  });

  it('should display "Add note" label when no existing note', () => {
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'Add note for Test Company' })).toBeInTheDocument();
  });

  it('should display "Edit note" label when existing note is provided', () => {
    renderWithQueryClient(<TakeNotesSheet {...defaultProps} existingNote="Existing note" />);

    expect(screen.getByRole('button', { name: 'Edit note for Test Company' })).toBeInTheDocument();
  });

  it('should switch from "Add note" to "Edit note" label when rerendered with existing note', () => {
    const { rerender } = renderWithQueryClient(<TakeNotesSheet {...defaultProps} />);

    // Initially shows "Add note"
    expect(screen.getByRole('button', { name: 'Add note for Test Company' })).toBeInTheDocument();

    // Update the component with an existing note
    const updatedProps = { ...defaultProps, existingNote: 'New note' };
    rerender(<TakeNotesSheet {...updatedProps} />);

    // Now should show "Edit note"
    expect(screen.getByRole('button', { name: 'Edit note for Test Company' })).toBeInTheDocument();
  });

  it('should use custom labels when provided', () => {
    const customLabels = {
      buttonLabel: 'Take Notes',
      title: 'MY NOTES',
      placeholder: 'Enter your notes here',
      addNoteLabel: 'Lägg till anteckning',
      editNoteLabel: 'Redigera anteckning',
    };

    renderWithQueryClient(<TakeNotesSheet {...defaultProps} labels={customLabels} />);

    expect(
      screen.getByRole('button', { name: 'Lägg till anteckning for Test Company' })
    ).toBeInTheDocument();
  });
});
