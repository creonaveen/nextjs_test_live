'use client';

import { TableCell, TableRow } from 'investtech/external-components';
import { Tooltip, TooltipContent, TooltipTrigger } from 'investtech/external-components';
import { Link } from '@/components/link';

import { MyNote } from '@/lib/types/my-notes';
import { formatNoteForDisplay } from '@/lib/utils';
import { getDate } from '@/utils/date';

import { DeleteNoteDialog } from './delete-note-dialog';
import { NoteDialog } from './note-dialog';

export interface NotesTableRowProps {
  note: MyNote;
  index: number;
  platform: string;
  selectedNoteId: string | null;
  deleteIsLoading: boolean;
  onNoteSelect: (noteId: string | null) => void;
  onNoteDelete: (company_id: string) => void;
  getResponsiveHideClass: (classes?: ('mobile' | 'tablet' | 'desktop' | 'laptop')[]) => string;
}

interface NoteCellProps {
  rowId: number;
  formattedNote: string;
  platform: string;
  isSelected: boolean;
  note: MyNote;
  onNoteSelect: (noteId: string | null) => void;
}

function NoteCell({
  rowId,
  formattedNote,
  platform,
  isSelected,
  note,
  onNoteSelect,
}: NoteCellProps) {
  const cellClass = `max-w-[60px] truncate text-sm sm:max-w-[200px] md:max-w-[300px] lg:max-w-[600px] xl:max-w-[800px] ${isSelected ? 'dark:bg-accent/50 bg-grey-100' : ''}`;
  return (
    <TableCell className={cellClass} id={`mynotes-table-note-${rowId}`}>
      {platform === 'desktop' ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="truncate">{formattedNote}</span>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            sideOffset={10}
            align="start"
            className="tooltip-content-scrollbar-hide max-w-[400px] text-left leading-relaxed break-words whitespace-pre-line"
          >
            {formattedNote}
          </TooltipContent>
        </Tooltip>
      ) : (
        <NoteDialog
          onOpenChange={(open) => onNoteSelect(open ? note.company_id : null)}
          note={formattedNote}
        />
      )}
    </TableCell>
  );
}

export function NotesTableRow({
  note,
  index,
  platform,
  selectedNoteId,
  deleteIsLoading,
  onNoteSelect,
  onNoteDelete,
  getResponsiveHideClass,
}: NotesTableRowProps) {
  const rowId = index + 1;
  const formattedNote = formatNoteForDisplay(note.note);
  const isSelected = selectedNoteId === note.company_id;

  return (
    <TableRow showHover={false} key={note.company_id} id={`mynotes-table-row-${rowId}`}>
      <TableCell
        className={`numeric-table-cell ${getResponsiveHideClass(['mobile'])}`}
        id={`mynotes-table-date-${rowId}`}
      >
        {getDate(note.date)}
      </TableCell>
      <TableCell
        className="company-link-button lg:min-w-none table-cell sm:min-w-[200px]"
        id={`mynotes-table-name-${rowId}`}
      >
        <Link
          href={`/company/${note.company_id}?market_id=${note.market_id}`}
          className="whitespace-wrap"
        >
          {note.name}
        </Link>
      </TableCell>
      <NoteCell
        rowId={rowId}
        formattedNote={formattedNote}
        platform={platform}
        isSelected={isSelected}
        note={note}
        onNoteSelect={onNoteSelect}
      />
      <TableCell className="text-right" id={`mynotes-table-delete-${rowId}`}>
        <DeleteNoteDialog
          isLoading={deleteIsLoading}
          selectedNote={note}
          deleteNote={onNoteDelete as (company_id: string) => Promise<void>}
        />
      </TableCell>
    </TableRow>
  );
}
