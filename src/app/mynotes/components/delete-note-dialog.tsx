import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button } from 'investtech/external-components';
import {
  Dialog,
  DialogAction,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'investtech/external-components';
import { MyNote } from '@/lib/types/my-notes';
import { formatNoteForDisplay } from '@/lib/utils';
import { getDate } from '@/utils/date';

interface DeleteNoteDialogProps {
  isLoading: boolean;
  selectedNote: MyNote | null;
  deleteNote: (company_id: string) => Promise<void>;
}

function LoadingSpinner({ commonT }: { commonT: (key: string) => string }) {
  return (
    <div className="flex items-center justify-center py-8" aria-live="polite" aria-busy="true">
      <div className="border-grey-300 h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
      <span className="sr-only">{commonT('loading')}</span>
    </div>
  );
}

function NoteDetailsDisplay({
  selectedNote,
  heading,
  text,
  notesT,
}: {
  selectedNote: MyNote | null;
  heading: string;
  text: string;
  notesT: (key: string) => string;
}) {
  return (
    <div className="mt-1.5 flex items-center gap-2">
      <div className="flex flex-col">
        <div className="flex flex-1 space-x-5 pb-3">
          <div className="flex flex-col">
            <span className={heading}>{notesT('date').toUpperCase()}</span>
            <span className={text + ' numeric-table-cell table-cell'}>
              {getDate(selectedNote?.date || '')}
            </span>
          </div>
          <div className="flex flex-col">
            <span className={heading}>{notesT('company').toUpperCase()}</span>
            <span className={text}>{selectedNote?.name}</span>
          </div>
        </div>
        <span className={heading}>{notesT('notes').toUpperCase()}</span>
        <span className={text + ' whitespace-pre-line'}>
          {formatNoteForDisplay(selectedNote?.note)}
        </span>
      </div>
    </div>
  );
}

function DialogActions({
  isLoading,
  isDeleting,
  selectedNote,
  commonT,
  onDelete,
}: {
  isLoading: boolean;
  isDeleting: boolean;
  selectedNote: MyNote | null;
  commonT: (key: string) => string;
  onDelete: () => void;
}) {
  const isBusy = isLoading || isDeleting;
  const companyName = selectedNote?.name || 'company';
  const deleteAriaLabel = isBusy
    ? `Deleting note for ${companyName}`
    : `Delete note for ${companyName}`;

  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button
          id="delete-note-dialog-close-button"
          type="button"
          variant="ghost"
          disabled={isBusy}
          aria-label={commonT('cancel') || 'Cancel deletion'}
        >
          {commonT('cancel')}
        </Button>
      </DialogClose>
      <DialogAction asChild>
        <Button
          id="delete-note-dialog-delete-button"
          type="button"
          variant="default"
          className="cursor-pointer"
          onClick={onDelete}
          disabled={isBusy || !selectedNote?.company_id}
          aria-label={deleteAriaLabel}
          aria-busy={isBusy}
        >
          {commonT('delete')}
        </Button>
      </DialogAction>
    </DialogFooter>
  );
}

function DeleteDialogBody({
  isBusy,
  selectedNote,
  notesT,
  commonT,
}: {
  isBusy: boolean;
  selectedNote: MyNote | null;
  notesT: (key: string) => string;
  commonT: (key: string) => string;
}) {
  return isBusy ? (
    <LoadingSpinner commonT={commonT} />
  ) : (
    <NoteDetailsDisplay
      selectedNote={selectedNote}
      heading="text-grey-700 dark:text-grey-200 text-[10px] font-medium"
      text="font-medium text-sm flex break-words break-all whitespace-normal"
      notesT={notesT}
    />
  );
}

interface DeleteNoteDialogContentProps {
  isBusy: boolean;
  selectedNote: MyNote | null;
  notesT: (key: string) => string;
  commonT: (key: string) => string;
  isLoading: boolean;
  isDeleting: boolean;
  onDelete: () => void;
}

function DeleteNoteDialogContent({
  isBusy,
  selectedNote,
  notesT,
  commonT,
  isLoading,
  isDeleting,
  onDelete,
}: DeleteNoteDialogContentProps) {
  const headerTitle = notesT('deleteNote');
  const headerDesc = notesT('deleteNoteDescription');
  return (
    <>
      <DialogTrigger asChild>
        <Trash
          size={32}
          id="note-delete-icon"
          aria-hidden="true"
          aria-label={headerTitle}
          className="hover:text-primary hover:bg-grey-100 dark:hover:bg-accent-1/50 ml-auto cursor-pointer rounded-full p-2"
        />
      </DialogTrigger>
      <DialogContent
        id="delete-note-dialog"
        className="gap-6 sm:max-w-md"
        aria-describedby={undefined}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{headerTitle}</DialogTitle>
          <span className="text-grey-700 dark:text-grey-300 text-sm">{headerDesc}</span>
        </DialogHeader>
        <DeleteDialogBody
          isBusy={isBusy}
          selectedNote={selectedNote}
          notesT={notesT}
          commonT={commonT}
        />
        <DialogActions
          isLoading={isLoading}
          isDeleting={isDeleting}
          selectedNote={selectedNote}
          commonT={commonT}
          onDelete={onDelete}
        />
      </DialogContent>
    </>
  );
}

export function DeleteNoteDialog({ isLoading, selectedNote, deleteNote }: DeleteNoteDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const notesT = useTranslations('myNotes');
  const commonT = useTranslations('common');

  useEffect(() => {
    if (!isLoading && isDeleting) {
      setOpen(false);
      setIsDeleting(false);
    }
  }, [isLoading, isDeleting]);

  const handleDelete = () => {
    if (!selectedNote?.company_id) return;
    setIsDeleting(true);
    const p = deleteNote(selectedNote.company_id);
    if (p?.catch) p.catch(() => setIsDeleting(false));
  };

  const isBusy = isLoading || isDeleting;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isBusy && setOpen(isOpen)}>
      <DeleteNoteDialogContent
        isBusy={isBusy}
        selectedNote={selectedNote}
        notesT={notesT}
        commonT={commonT}
        isLoading={isLoading}
        isDeleting={isDeleting}
        onDelete={handleDelete}
      />
    </Dialog>
  );
}
