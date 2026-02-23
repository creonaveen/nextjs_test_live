import Paginator from '@/components/custom-components/paginator';
import { Watchlists } from '@/lib/types/watchlist';

interface WatchlistPaginationProps {
  data: Watchlists | undefined;
  limitFromUrl: number;
  setPageFromUrl: (page: number) => void;
  handleLimitChange: (limit: number) => void;
  isLoading: boolean;
  isRefetching: boolean;
}

export function WatchlistPagination({
  data,
  limitFromUrl,
  setPageFromUrl,
  handleLimitChange,
  isLoading,
  isRefetching,
}: WatchlistPaginationProps) {
  if (!data?.results || data?.count <= 5) return null;

  const handlePageChange = (page: number) => {
    void setPageFromUrl(page);
  };

  const handleSizeChange = (limit: number) => {
    void handleLimitChange(limit);
  };

  return (
    <div className="flex w-full justify-end">
      <Paginator
        pageParent={handlePageChange}
        pageSizeParent={handleSizeChange}
        pageSize={limitFromUrl}
        isAPILoad={isLoading || isRefetching}
        countRow={data?.count}
      />
    </div>
  );
}
