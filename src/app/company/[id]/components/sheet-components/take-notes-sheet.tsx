'use client';

import { Button, Sheet, SheetTrigger } from 'investtech/external-components';
import type { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

import { useTakeNotesSheet, NoteFormValues } from './take-notes-sheet-hook';
import { TakeNotesSheetContent } from './take-notes-sheet-content';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface TakeNotesSheetProps {
  companyName: string;
  companyId: string;
  existingNote?: string | null;
  onRefreshData?: () => Promise<void>;
  isRefetching?: boolean;
  labels?: {
    buttonLabel?: string;
    title?: string;
    saveButton?: string;
    clearButton?: string;
    placeholder?: string;
    addNoteLabel?: string;
    editNoteLabel?: string;
  };
}

/* -------------------------------------------------------------------------- */
/*                              Main Component                                 */
/* -------------------------------------------------------------------------- */

export function TakeNotesSheet(props: TakeNotesSheetProps) {
  const state = useTakeNotesSheet({
    companyId: props.companyId,
    existingNote: props.existingNote ?? null,
    onRefreshData: props.onRefreshData,
    isRefetching: props.isRefetching ?? false,
    labels: props.labels ?? {},
  });

  const handleTriggerClick = () => {
    state.handleOpenChange(true);
  };

  return (
    <Sheet open={state.isOpen} onOpenChange={state.handleOpenChange}>
      <SheetTrigger asChild>
        <TriggerButton
          platform={state.platform}
          label={state.triggerLabel}
          companyName={props.companyName}
          onClick={handleTriggerClick}
        />
      </SheetTrigger>

      <SheetContent
        companyName={props.companyName}
        isRefetching={props.isRefetching}
        state={state}
      />
    </Sheet>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Subcomponents                                 */
/* -------------------------------------------------------------------------- */

function TriggerButton({
  platform,
  label,
  companyName,
  onClick,
}: {
  platform: string;
  label: string;
  companyName: string;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="primaryRound"
      className={platform === 'mobile' ? 'w-full' : ''}
      aria-label={`${label} for ${companyName}`}
      id="take-notes-trigger"
      onClick={onClick}
      type="button"
    >
      {label}
    </Button>
  );
}

function SheetContent({
  companyName,
  isRefetching = false,
  state,
}: {
  companyName: string;
  isRefetching?: boolean;
  state: ReturnType<typeof useTakeNotesSheet>;
}) {
  return (
    <TakeNotesSheetContent
      companyName={companyName}
      platform={state.platform as 'mobile' | 'desktop'}
      defaultLabels={
        state.defaultLabels as {
          placeholder: string;
          addNoteLabel: string;
          editNoteLabel: string;
        }
      }
      maxLength={state.maxLength}
      register={state.register as UseFormRegister<NoteFormValues>}
      handleSubmit={state.handleSubmit as UseFormHandleSubmit<NoteFormValues>}
      onSubmit={state.onSubmit}
      errors={state.errors as { note?: { message?: string } }}
      isSubmitting={state.isSubmitting}
      isRefetching={isRefetching}
      currentNote={state.currentNote}
      handleClear={(e) => void state.handleClear(e)}
      hasExistingNote={state.hasExistingNote}
      saveDisabled={state.saveDisabled}
      clearDisabled={state.clearDisabled}
      isSaving={state.isSaving}
      isDeletingDisplay={state.isDeletingDisplay}
    />
  );
}
