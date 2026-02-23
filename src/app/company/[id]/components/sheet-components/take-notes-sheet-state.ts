/**
 * Pure helpers for take-notes-sheet state. Extracted to keep hook file under max-lines.
 */

import type { NoteFormValues } from './take-notes-sheet-hook';

export interface TakeNotesDerivedInput {
  form: {
    formState: { isSubmitting: boolean };
    currentNote: string;
    defaultLabels: { editNoteLabel: string; addNoteLabel: string };
    reset: (values: { note: string }) => void;
  };
  mut: {
    isDeletingNote: boolean;
    createNoteMutation: { isPending: boolean };
    deleteNoteMutation: { isPending: boolean };
  };
}

export function computeTakeNotesDerived(opts: {
  form: TakeNotesDerivedInput['form'];
  mut: TakeNotesDerivedInput['mut'];
  isRefetching: boolean;
  isBusy: boolean;
  existingNote: string | null | undefined;
}) {
  const { form, mut, isRefetching, isBusy, existingNote } = opts;
  const isSaving = [
    form.formState.isSubmitting,
    !mut.isDeletingNote && isRefetching,
    mut.createNoteMutation.isPending,
  ].some(Boolean);
  const isDeletingDisplay = [
    mut.deleteNoteMutation.isPending,
    mut.isDeletingNote && isRefetching,
  ].some(Boolean);
  const hasExistingNote = Boolean(existingNote?.trim());
  const saveDisabled = [isBusy, !form.currentNote?.trim(), form.currentNote === existingNote].some(
    Boolean
  );
  const clearDisabled = isBusy || !form.currentNote?.trim();
  const triggerLabel = hasExistingNote
    ? form.defaultLabels.editNoteLabel
    : form.defaultLabels.addNoteLabel;

  return {
    saveDisabled,
    clearDisabled,
    isSaving,
    isDeletingDisplay,
    hasExistingNote,
    triggerLabel,
  };
}

interface MergeStateForm {
  defaultLabels: { editNoteLabel: string; addNoteLabel: string };
  register: unknown;
  handleSubmit: unknown;
  formState: { errors: unknown; isSubmitting: boolean };
  currentNote: string;
}

interface MergeStateActions {
  onSubmit: (data: NoteFormValues) => Promise<void>;
  handleClear: (e: React.MouseEvent) => void;
}

export function mergeTakeNotesSheetState(opts: {
  form: MergeStateForm;
  mut: { isOpen: boolean };
  actions: MergeStateActions;
  derived: ReturnType<typeof computeTakeNotesDerived>;
  handleOpenChange: (open: boolean) => void;
  platform: 'desktop' | 'mobile';
  existingNote: string | null | undefined;
}) {
  const { form, mut, actions, derived, handleOpenChange, platform, existingNote } = opts;
  return {
    isOpen: mut.isOpen,
    handleOpenChange,
    platform,
    defaultLabels: form.defaultLabels,
    maxLength: 1000,
    register: form.register,
    handleSubmit: form.handleSubmit,
    onSubmit: actions.onSubmit,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    currentNote: form.currentNote,
    handleClear: actions.handleClear,
    existingNote,
    ...derived,
  };
}
