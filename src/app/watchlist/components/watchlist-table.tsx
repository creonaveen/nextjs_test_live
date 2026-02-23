'use client';

import { useTranslations } from 'next-intl';

import { WatchlistErrorState } from './watchlist-error-state';
import { WatchlistPagination } from './watchlist-pagination';
import { WatchlistTableActions } from './watchlist-table-actions';
import { WatchlistTableContent } from './watchlist-table-content';
import { useWatchlistState } from '../hooks/use-watchlist-state';

export function WatchlistTable() {
  const n = useTranslations('navigation');

  const {
    data,
    isLoading,
    isRefetching,
    error,
    ordering,
    setPageFromUrl,
    limitFromUrl,
    handleLimitChange,
    handleOrdering,
    handleCompanyChange,
    handleHealthCheckNavigation,
  } = useWatchlistState();

  if (error) {
    return <WatchlistErrorState error={error} />;
  }

  return (
    <div>
      <div className="page-header-table" id="page-title">
        {n('watchlist')}
      </div>

      <WatchlistTableActions data={data} onHealthCheckClick={handleHealthCheckNavigation} />

      <WatchlistTableContent
        data={data}
        isLoading={isLoading}
        ordering={ordering}
        limitFromUrl={limitFromUrl}
        onOrdering={handleOrdering}
        onCompanyChange={(id) => void handleCompanyChange(id)}
        isRefetching={isRefetching}
      />

      <WatchlistPagination
        data={data}
        limitFromUrl={limitFromUrl}
        setPageFromUrl={(page) => void setPageFromUrl(page)}
        handleLimitChange={(limit) => handleLimitChange(limit)}
        isLoading={isLoading}
        isRefetching={isRefetching}
      />
    </div>
  );
}
