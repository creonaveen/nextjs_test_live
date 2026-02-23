'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { usePlatform } from '@/lib/platform';
import { formatNoteForDisplay } from '@/lib/utils';
import { useCreateMyNotes, useDeleteMyNotes } from '@/store/api-service/mynotes-api-service';

import {
  computeTakeNotesDerived,
  mergeTakeNotesSheetState,
  TakeNotesDerivedInput,
} from './take-notes-sheet-state';

/* -------------------------------------------------------------------------- */
/* Schema & Types                                                              */
/* -------------------------------------------------------------------------- */

const NOTE_SCHEMA = z.object({
  note: z.string().min(1, { message: 'Note cannot be empty' }),
});

export type NoteFormValues = z.infer<typeof NOTE_SCHEMA>;

export interface TakeNotesSheetLabels {
  placeholder?: string;
  addNoteLabel?: string;
  editNoteLabel?: string;
}

export interface UseTakeNotesSheetArgs {
  companyId: string;
  existingNote: string | null | undefined;
  onRefreshData?: () => Promise<void>;
  isRefetching: boolean;
  labels: TakeNotesSheetLabels;
}

/* -------------------------------------------------------------------------- */
/* Form Hook                                                                   */
/* -------------------------------------------------------------------------- */

function useTakeNotesForm(existingNote: string | null | undefined, labels: TakeNotesSheetLabels) {
  const defaultLabels = useMemo(
    () => ({
      placeholder: labels.placeholder ?? 'Enter your notes here',
      addNoteLabel: labels.addNoteLabel ?? 'Add note',
      editNoteLabel: labels.editNoteLabel ?? 'Edit note',
    }),
    [labels]
  );

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(NOTE_SCHEMA),
    mode: 'onSubmit',
    defaultValues: { note: formatNoteForDisplay(existingNote) },
  });

  return { ...form, currentNote: form.watch('note'), defaultLabels };
}

/* -------------------------------------------------------------------------- */
/* Mutation State                                                              */
/* -------------------------------------------------------------------------- */

function useTakeNotesMutationState(
  onRefreshData: (() => Promise<void>) | undefined,
  reset: (v: { note: string }) => void
) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeletingNote, setIsDeletingNote] = useState(false);
  const createNoteMutation = useCreateMyNotes();
  const deleteNoteMutation = useDeleteMyNotes();

  useEffect(() => {
    if (!createNoteMutation.isSuccess) return;
    void onRefreshData?.();
    setIsOpen(false);
    createNoteMutation.reset();
  }, [createNoteMutation.isSuccess, onRefreshData, createNoteMutation]);

  useEffect(() => {
    if (!deleteNoteMutation.isSuccess) return;
    reset({ note: '' });
    void onRefreshData?.();
    setIsOpen(false);
    setIsDeletingNote(false);
    deleteNoteMutation.reset();
  }, [deleteNoteMutation.isSuccess, onRefreshData, reset, deleteNoteMutation]);

  return {
    isOpen,
    setIsOpen,
    isDeletingNote,
    setIsDeletingNote,
    createNoteMutation,
    deleteNoteMutation,
  };
}

/* -------------------------------------------------------------------------- */
/* Actions                                                                     */
/* -------------------------------------------------------------------------- */

function useSubmitNote(
  companyId: string,
  createNoteMutation: ReturnType<typeof useCreateMyNotes>,
  setError: (name: 'note', opts: { type: string; message: string }) => void
) {
  return useCallback(
    async (data: NoteFormValues) => {
      try {
        await createNoteMutation.mutateAsync({
          action: 'modify',
          company_id: companyId,
          note: data.note.trim(),
        });
      } catch {
        setError('note', {
          type: 'manual',
          message: 'Failed to save note. Please try again.',
        });
      }
    },
    [companyId, createNoteMutation, setError]
  );
}

function useClearNote({
  companyId,
  existingNote,
  deleteNoteMutation,
  reset,
  setIsOpen,
  setIsDeletingNote,
}: {
  companyId: string;
  existingNote: string | null | undefined;
  deleteNoteMutation: ReturnType<typeof useDeleteMyNotes>;
  reset: (v: { note: string }) => void;
  setIsOpen: (v: boolean) => void;
  setIsDeletingNote: (v: boolean) => void;
}) {
  return useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!existingNote?.trim()) {
        reset({ note: '' });
        setIsOpen(false);
        return;
      }

      setIsDeletingNote(true);
      try {
        await deleteNoteMutation.mutateAsync({
          action: 'modify',
          company_id: `-${companyId}`,
        });
      } catch {
        setIsDeletingNote(false);
      }
    },
    [companyId, existingNote, deleteNoteMutation, reset, setIsOpen, setIsDeletingNote]
  );
}

/* -------------------------------------------------------------------------- */
/* Main Hook                                                                  */
/* -------------------------------------------------------------------------- */

function useTakeNotesActions({
  companyId,
  existingNote,
  createNoteMutation,
  deleteNoteMutation,
  setError,
  reset,
  setIsOpen,
  setIsDeletingNote,
}: {
  companyId: string;
  existingNote: string | null | undefined;
  createNoteMutation: ReturnType<typeof useCreateMyNotes>;
  deleteNoteMutation: ReturnType<typeof useDeleteMyNotes>;
  setError: (name: 'note', opts: { type: string; message: string }) => void;
  reset: (v: { note: string }) => void;
  setIsOpen: (v: boolean) => void;
  setIsDeletingNote: (v: boolean) => void;
}) {
  const onSubmit = useSubmitNote(companyId, createNoteMutation, setError);

  const handleClear = useClearNote({
    companyId,
    existingNote,
    deleteNoteMutation,
    reset,
    setIsOpen,
    setIsDeletingNote,
  });

  return { onSubmit, handleClear };
}

/* -------------------------------------------------------------------------- */
/* Derived Helpers                                                             */
/* -------------------------------------------------------------------------- */

function useTakeNotesBusyState(
  form: TakeNotesDerivedInput['form'],
  mut: TakeNotesDerivedInput['mut'],
  isRefetching: boolean
) {
  return useMemo(
    () =>
      [
        form.formState.isSubmitting,
        isRefetching,
        mut.createNoteMutation.isPending,
        mut.deleteNoteMutation.isPending,
      ].some(Boolean),
    [
      form.formState.isSubmitting,
      isRefetching,
      mut.createNoteMutation.isPending,
      mut.deleteNoteMutation.isPending,
    ]
  );
}

function useTakeNotesOpenHandler({
  isBusy,
  existingNote,
  form,
  setIsOpen,
}: {
  isBusy: boolean;
  existingNote: string | null | undefined;
  form: TakeNotesDerivedInput['form'];
  setIsOpen: (v: boolean) => void;
}) {
  return useCallback(
    (open: boolean) => {
      if (!open && isBusy) return;
      setIsOpen(open);
      form.reset({ note: formatNoteForDisplay(existingNote) });
    },
    [isBusy, existingNote, form, setIsOpen]
  );
}

/* -------------------------------------------------------------------------- */
/* Main Hook                         
/* -------------------------------------------------------------------------- */

export function useTakeNotesSheet(args: UseTakeNotesSheetArgs) {
  const { companyId, existingNote, onRefreshData, isRefetching, labels } = args;

  useQueryClient();
  const platform = usePlatform();

  const form = useTakeNotesForm(existingNote, labels);
  const mut = useTakeNotesMutationState(onRefreshData, form.reset);
  const actions = useTakeNotesActions({
    companyId,
    existingNote,
    createNoteMutation: mut.createNoteMutation,
    deleteNoteMutation: mut.deleteNoteMutation,
    setError: form.setError,
    reset: form.reset,
    setIsOpen: mut.setIsOpen,
    setIsDeletingNote: mut.setIsDeletingNote,
  });

  const isBusy = useTakeNotesBusyState(form, mut, isRefetching);
  const handleOpenChange = useTakeNotesOpenHandler({
    isBusy,
    existingNote,
    form,
    setIsOpen: mut.setIsOpen,
  });

  const derived = useMemo(
    () => computeTakeNotesDerived({ form, mut, isRefetching, isBusy, existingNote }),
    [form, mut, isRefetching, isBusy, existingNote]
  );

  return mergeTakeNotesSheetState({
    form,
    mut,
    actions,
    derived,
    handleOpenChange,
    platform: platform as 'desktop' | 'mobile',
    existingNote,
  });
}
