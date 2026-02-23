import { Button } from 'investtech/external-components';
import { useTranslations } from 'next-intl';

import { Watchlists } from '@/lib/types/watchlist';
import { AddCompanyDialog } from './add-company-dialog';

interface WatchlistTableActionsProps {
  data: Watchlists | undefined;
  onHealthCheckClick: () => void;
}

export function WatchlistTableActions({ data, onHealthCheckClick }: WatchlistTableActionsProps) {
  const n = useTranslations('navigation');

  return (
    <div className="mb-4 flex w-full justify-end gap-3">
      <AddCompanyDialog existingCompanies={data?.results ?? []} />
      {data?.watchlist_id && data?.count > 0 && (
        <Button variant="outline" size="sm" onClick={onHealthCheckClick}>
          {n('healthCheck')}
        </Button>
      )}
    </div>
  );
}
