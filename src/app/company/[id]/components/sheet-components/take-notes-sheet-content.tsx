'use client';

import {
  Button,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from 'investtech/external-components';
import { Textarea } from 'investtech/external-components';
import { useTranslations } from 'next-intl';
import type { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

import { Spinner } from '@/components/custom-components/spinner';
import type { NoteFormValues } from './take-notes-sheet-hook';

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface TakeNotesSheetContentProps {
  companyName: string;
  platform: 'desktop' | 'mobile';
  defaultLabels: { placeholder: string; addNoteLabel: string; editNoteLabel: string };
  maxLength: number;
  register: UseFormRegister<NoteFormValues>;
  handleSubmit: UseFormHandleSubmit<NoteFormValues>;
  onSubmit: (data: NoteFormValues) => Promise<void>;
  errors: { note?: { message?: string } };
  isSubmitting: boolean;
  isRefetching: boolean;
  currentNote: string;
  handleClear: (e: React.MouseEvent) => void;
  hasExistingNote: boolean;
  saveDisabled: boolean;
  clearDisabled: boolean;
  isSaving: boolean;
  isDeletingDisplay: boolean;
}

/* -------------------------------------------------------------------------- */
/* Buttons                                                                    */
/* -------------------------------------------------------------------------- */

function SaveButton({
  companyName,
  handleSubmit,
  onSubmit,
  disabled,
  isSaving,
}: {
  companyName: string;
  handleSubmit: UseFormHandleSubmit<NoteFormValues>;
  onSubmit: (data: NoteFormValues) => Promise<void>;
  disabled: boolean;
  isSaving: boolean;
}) {
  const t = useTranslations('common');

  return (
    <Button
      type="submit"
      onClick={(e) => void handleSubmit(onSubmit)(e)}
      disabled={disabled}
      aria-label={`Save note for ${companyName}`}
      aria-busy={isSaving}
    >
      {isSaving ? (
        <span className="flex items-center gap-2">
          {t('saving')}
          <Spinner />
        </span>
      ) : (
        t('save')
      )}
    </Button>
  );
}

function ClearButton({
  companyName,
  handleClear,
  hasExistingNote,
  disabled,
  isDeleting,
}: {
  companyName: string;
  handleClear: (e: React.MouseEvent) => void;
  hasExistingNote: boolean;
  disabled: boolean;
  isDeleting: boolean;
}) {
  const t = useTranslations('common');

  return (
    <SheetClose asChild>
      <Button
        type="button"
        variant="outline"
        onClick={handleClear}
        disabled={disabled}
        aria-label={`${hasExistingNote ? 'Delete' : 'Clear'} note for ${companyName}`}
        aria-busy={isDeleting}
      >
        {isDeleting ? (
          <span className="flex items-center gap-2">
            {t('deleting')}
            <Spinner />
          </span>
        ) : hasExistingNote ? (
          t('delete')
        ) : (
          t('clear')
        )}
      </Button>
    </SheetClose>
  );
}

/* -------------------------------------------------------------------------- */
/* Header                                                                     */
/* -------------------------------------------------------------------------- */

function NotesHeader({ title, companyName }: { title: string; companyName: string }) {
  return (
    <SheetHeader className="gap-2">
      <SheetTitle className="text-xs font-medium tracking-wide uppercase">{title}</SheetTitle>
      <SheetDescription className="text-lg font-semibold">{companyName}</SheetDescription>
    </SheetHeader>
  );
}

/* -------------------------------------------------------------------------- */
/* Textarea                                                                   */
/* -------------------------------------------------------------------------- */

function NotesTextarea({
  register,
  placeholder,
  maxLength,
  disabled,
  error,
  currentNote,
}: {
  register: UseFormRegister<NoteFormValues>;
  placeholder: string;
  maxLength: number;
  disabled: boolean;
  error?: string;
  currentNote: string;
}) {
  const t = useTranslations('common');

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        {...register('note')}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        autoComplete="off"
        className="max-h-[350px] min-h-[200px] resize-none md:min-h-[420px]"
      />
      {error && <p className="text-error-text text-sm">{error}</p>}
      <span className="text-right text-xs">
        {currentNote.length}/{maxLength} {t('characters')}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

function NotesFooter(props: {
  companyName: string;
  handleSubmit: UseFormHandleSubmit<NoteFormValues>;
  onSubmit: (data: NoteFormValues) => Promise<void>;
  handleClear: (e: React.MouseEvent) => void;
  hasExistingNote: boolean;
  saveDisabled: boolean;
  clearDisabled: boolean;
  isSaving: boolean;
  isDeletingDisplay: boolean;
}) {
  return (
    <SheetFooter className="mt-8 flex w-auto flex-1 flex-wrap gap-3">
      <div className="mt-8 flex w-auto flex-1 flex-wrap gap-3">
        <SaveButton {...props} disabled={props.saveDisabled} />
        <ClearButton
          companyName={props.companyName}
          handleClear={props.handleClear}
          hasExistingNote={props.hasExistingNote}
          disabled={props.clearDisabled}
          isDeleting={props.isDeletingDisplay}
        />
      </div>
    </SheetFooter>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Content     
/* -------------------------------------------------------------------------- */

type TakeNotesFormProps = {
  register: UseFormRegister<NoteFormValues>;
  handleSubmit: UseFormHandleSubmit<NoteFormValues>;
  onSubmit: (data: NoteFormValues) => Promise<void>;
  errors: { note?: { message?: string } };
  isSubmitting: boolean;
  isRefetching: boolean;
  currentNote: string;
  defaultLabels: { placeholder: string };
  maxLength: number;
  companyName: string;
  handleClear: (e: React.MouseEvent) => void;
  hasExistingNote: boolean;
  saveDisabled: boolean;
  clearDisabled: boolean;
  isSaving: boolean;
  isDeletingDisplay: boolean;
};

function TakeNotesForm(props: TakeNotesFormProps) {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    isRefetching,
    currentNote,
    defaultLabels,
    maxLength,
    companyName,
    handleClear,
    hasExistingNote,
    saveDisabled,
    clearDisabled,
    isSaving,
    isDeletingDisplay,
  } = props;

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="flex h-full flex-col">
      <div className="flex flex-1 flex-col justify-between gap-4">
        <NotesTextarea
          register={register}
          placeholder={defaultLabels.placeholder}
          maxLength={maxLength}
          disabled={isSubmitting || isRefetching}
          error={errors.note?.message}
          currentNote={currentNote}
        />
        <NotesFooter
          companyName={companyName}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          handleClear={handleClear}
          hasExistingNote={hasExistingNote}
          saveDisabled={saveDisabled}
          clearDisabled={clearDisabled}
          isSaving={isSaving}
          isDeletingDisplay={isDeletingDisplay}
        />
      </div>
    </form>
  );
}

export function TakeNotesSheetContent(props: TakeNotesSheetContentProps) {
  const { companyName, platform, defaultLabels, hasExistingNote } = props;

  const title = hasExistingNote ? defaultLabels.editNoteLabel : defaultLabels.addNoteLabel;

  return (
    <SheetContent
      side={platform === 'desktop' ? 'right' : 'bottom'}
      className={`px-5 pt-5 pb-5 lg:pb-20 ${platform === 'mobile' && 'h-full'}`}
      onOpenAutoFocus={(e) => platform !== 'desktop' && e.preventDefault()}
    >
      <NotesHeader title={title} companyName={companyName} />
      <TakeNotesForm {...props} />
    </SheetContent>
  );
}
