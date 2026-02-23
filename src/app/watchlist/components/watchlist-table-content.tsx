import { Card, CardContent } from 'investtech/external-components';
import { Table, TableBody, TableCell, TableRow } from 'investtech/external-components';
import { useTranslations } from 'next-intl';

import TableSkeleton from '@/components/custom-components/table-skeleton';
import { usePlatform } from '@/lib/platform';
import { Watchlists, WatchlistResult } from '@/lib/types/watchlist';

import { WatchlistTableHeader } from './watchlist-table-header';
import { WatchlistTableRow } from './watchlist-table-row';

interface WatchlistTableContentProps {
  data: Watchlists | undefined;
  isLoading: boolean;
  ordering: string;
  limitFromUrl: number;
  onOrdering: (key: string) => void;
  onCompanyChange: (id: string | undefined) => void;
  isRefetching: boolean;
}

export function WatchlistTableContent({
  data,
  isLoading,
  ordering,
  limitFromUrl,
  onOrdering,
  onCompanyChange,
  isRefetching,
}: WatchlistTableContentProps) {
  const e = useTranslations('errors');
  const platform = usePlatform();

  return (
    <div className="overflow-x-auto rounded-sm">
      <Card className="w-full">
        <CardContent>
          <Table id="watchlist-table-1" className="table-auto">
            <WatchlistTableHeader ordering={ordering} onOrdering={onOrdering} />

            {isLoading ? (
              <TableSkeleton
                rows={limitFromUrl}
                columns={platform === 'mobile' ? 3 : platform === 'tablet' ? 5 : 6}
              />
            ) : (
              <TableBody>
                {data?.results?.length === 0 ? (
                  <TableRow showHover={false}>
                    <TableCell colSpan={6} className="text-foreground py-4 text-center">
                      {e('noData')}
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.results?.map((company: WatchlistResult, index: number) => (
                    <WatchlistTableRow
                      key={company.ticker}
                      company={company}
                      index={index}
                      isLoading={isLoading}
                      isRefetching={isRefetching}
                      onCompanyChange={onCompanyChange}
                    />
                  ))
                )}
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
