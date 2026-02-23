import { Card, CardContent, Table, TableHeader } from 'investtech/external-components';

import { AlphabeticFilter } from '@/components/custom-components/alphabetic-filter';
import TableSkeleton from '@/components/custom-components/table-skeleton';
import { StockList } from '@/lib/types/stocks';

import { TableHeaderRow } from './stock-table-header';
import { TableBodyContent } from './stock-table-body';
import { StocksPaginator } from './table-paginator';

interface StocksTableContentProps {
  tableColumns: TableColumn[];
  ordering: string;
  handleOrdering: (key: string) => void;
  isLoading: boolean;
  data: StockList | undefined;
  limitFromUrl: number;
  platform: string;
  alphabeticFilter: string | null;
  handleAlphabeticFilterChange: (letter: string | undefined) => void;
  translations: {
    noData: string;
    stocks: string;
    alphabeticFilter: string;
  };
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

interface TableColumn {
  key: string;
  label: string;
  align: 'left' | 'right';
  hideOn?: ('mobile' | 'tablet' | 'laptop' | 'desktop')[];
}

const getSkeletonColumns = (platform: string) =>
  platform === 'mobile' ? 3 : platform === 'tablet' ? 5 : 6;

function StocksTableCard({
  tableColumns,
  ordering,
  handleOrdering,
  isLoading,
  data,
  limitFromUrl,
  platform,
  translations,
}: {
  tableColumns: TableColumn[];
  ordering: string;
  handleOrdering: (key: string) => void;
  isLoading: boolean;
  data: StockList | undefined;
  limitFromUrl: number;
  platform: string;
  translations: { noData: string; stocks: string };
}) {
  return (
    <Card className="w-full">
      <CardContent>
        <Table className="w-full table-auto" aria-label={translations.stocks}>
          <TableHeader>
            <TableHeaderRow
              columns={tableColumns}
              ordering={ordering}
              onOrderingChange={handleOrdering}
            />
          </TableHeader>

          {isLoading ? (
            <TableSkeleton rows={limitFromUrl} columns={getSkeletonColumns(platform)} />
          ) : (
            <TableBodyContent data={data} translations={{ noData: translations.noData }} />
          )}
        </Table>
      </CardContent>
    </Card>
  );
}

export function StocksTableContent({
  tableColumns,
  ordering,
  handleOrdering,
  isLoading,
  data,
  limitFromUrl,
  platform,
  alphabeticFilter,
  handleAlphabeticFilterChange,
  translations,
  onPageChange,
  onLimitChange,
}: StocksTableContentProps) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <AlphabeticFilter
          selectedLetter={alphabeticFilter ?? undefined}
          onSelect={handleAlphabeticFilterChange}
          showAll
        />
      </div>
      <div className="overflow-x-auto rounded-sm">
        <StocksTableCard
          tableColumns={tableColumns}
          ordering={ordering}
          handleOrdering={handleOrdering}
          isLoading={isLoading}
          data={data}
          limitFromUrl={limitFromUrl}
          platform={platform}
          translations={translations}
        />
      </div>
      <StocksPaginator
        data={data}
        isLoading={isLoading}
        limitFromUrl={limitFromUrl}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </div>
  );
}
