'use client';

import { useScrollDirection } from '@/lib/hooks/use-scroll-direction';
import { cn } from '@/lib/utils';

import { AddToWatchlist } from './add-to-watchlist';
import { TakeNotesSheet } from './sheet-components/take-notes-sheet';

interface MobileFloatingButtonsProps {
  companyName: string;
  companyId: string;
  existingNote: string | null;
  isInWatchlist: boolean;
  onRefreshData?: () => Promise<void>;
  isRefetching?: boolean;
  labels: {
    takeNotesPlaceholder: string;
    addToWatchlistLabel: string;
    removeFromWatchlistLabel: string;
    addedToWatchlistLabel: string;
    removedFromWatchlistLabel: string;
    addNoteLabel: string;
    editNoteLabel: string;
  };
}

function TakeNotesButton({
  companyName,
  companyId,
  existingNote,
  onRefreshData,
  isRefetching,
  labels,
}: Pick<
  MobileFloatingButtonsProps,
  'companyName' | 'companyId' | 'existingNote' | 'onRefreshData' | 'isRefetching' | 'labels'
>) {
  return (
    <div className="flex flex-1 justify-center">
      <TakeNotesSheet
        companyName={companyName}
        companyId={companyId}
        existingNote={existingNote}
        onRefreshData={onRefreshData}
        isRefetching={isRefetching}
        labels={{
          placeholder: labels.takeNotesPlaceholder,
          addNoteLabel: labels.addNoteLabel,
          editNoteLabel: labels.editNoteLabel,
        }}
      />
    </div>
  );
}

function WatchlistButton({
  companyId,
  companyName,
  isInWatchlist,
  onRefreshData,
  isRefetching,
  labels,
}: Pick<
  MobileFloatingButtonsProps,
  'companyId' | 'companyName' | 'isInWatchlist' | 'onRefreshData' | 'isRefetching' | 'labels'
>) {
  return (
    <div className="flex flex-1 justify-center">
      <AddToWatchlist
        companyId={companyId}
        companyName={companyName}
        isInWatchlist={isInWatchlist}
        onRefreshData={onRefreshData}
        isRefetching={isRefetching}
        labels={{
          addToWatchlistLabel: labels.addToWatchlistLabel,
          removeFromWatchlistLabel: labels.removeFromWatchlistLabel,
          addedToWatchlistLabel: labels.addedToWatchlistLabel,
          removedFromWatchlistLabel: labels.removedFromWatchlistLabel,
        }}
      />
    </div>
  );
}

export function MobileFloatingButtons(props: MobileFloatingButtonsProps) {
  const { isVisible } = useScrollDirection();

  return (
    <div
      className={cn(
        'bg-card border-t-grey-100 dark:border-t-grey-700 fixed inset-x-0 bottom-0 z-40 flex justify-center gap-3 rounded-t-xl border-t px-4 pt-3 shadow-sm transition-all duration-300 md:hidden',
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      )}
      style={{
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <TakeNotesButton {...props} />
      <WatchlistButton {...props} />
    </div>
  );
}
