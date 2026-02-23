import Paginator from '@/components/custom-components/paginator';
import { StockList } from '@/lib/types/stocks';

interface StocksPaginatorProps {
  data: StockList | undefined;
  isLoading: boolean;
  limitFromUrl: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function StocksPaginator({
  data,
  isLoading,
  limitFromUrl,
  onPageChange,
  onLimitChange,
}: StocksPaginatorProps) {
  if (!data?.results || !data?.count || data.count <= 5) {
    return null;
  }

  return (
    <div className="flex w-full justify-end">
      <Paginator
        pageParent={onPageChange}
        pageSizeParent={onLimitChange}
        pageSize={limitFromUrl}
        isAPILoad={isLoading}
        countRow={data.count}
      />
    </div>
  );
}
