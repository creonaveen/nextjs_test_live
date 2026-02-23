'use client';

import { useTranslations } from 'next-intl';

import { Button } from 'investtech/external-components';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'investtech/external-components';

export function NoteDialog({
  onOpenChange,
  note,
}: {
  onOpenChange: (open: boolean) => void;
  note: string;
}) {
  const notesT = useTranslations('myNotes');

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          id="note-dialog-button"
          type="button"
          variant="link"
          aria-label={notesT('myNotesDescription') || 'View note'}
          className="text-grey-900 dark:text-grey-200 cursor-pointer truncate text-left"
          onClick={() => {
            onOpenChange(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenChange(true);
            }
          }}
        >
          {note}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="gap-6 sm:max-w-lg"
        aria-describedby={undefined}
        id="note-dialog-content"
      >
        <DialogHeader>
          <DialogTitle>{notesT('notes')}</DialogTitle>
        </DialogHeader>
        <div
          className="max-h-[300px] overflow-y-auto text-sm leading-relaxed break-words whitespace-pre-line"
          role="region"
          aria-label={notesT('notes')}
        >
          {note}
        </div>
      </DialogContent>
    </Dialog>
  );
}
