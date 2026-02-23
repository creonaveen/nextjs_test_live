import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryState } from 'nuqs';

import { getLanguageFromStorage } from '@/lib/utils';
import { useGetWatchlist, useModifyWatchlist } from '@/store/api-service/watchlist-api-service';
import logger from '@/utils/logger';
import { getUrlWithParams } from '@/utils/navigation-utils';

function useWatchlistQueryState() {
  const [ordering, setOrdering] = useQueryState('ordering', { defaultValue: 'name' });
  const [pageFromUrl, setPageFromUrl] = useQueryState('page', {
    defaultValue: 1,
    parse: Number,
    serialize: (v: number) => String(v),
  });
  const [limitFromUrl, setLimitFromUrl] = useQueryState('limit', {
    defaultValue: 10,
    parse: Number,
    serialize: (v: number) => String(v),
  });

  return { ordering, setOrdering, pageFromUrl, setPageFromUrl, limitFromUrl, setLimitFromUrl };
}

interface WatchlistHandlersParams {
  data: { results?: unknown[]; watchlist_id?: string } | undefined;
  ordering: string;
  setOrdering: (
    value: string | ((old: string) => string | null) | null,
    options?: Record<string, unknown>
  ) => Promise<URLSearchParams>;
  setLimitFromUrl: (
    value: number | ((old: number) => number | null) | null,
    options?: Record<string, unknown>
  ) => Promise<URLSearchParams>;
  modifyWatchlist: ReturnType<typeof useModifyWatchlist>;
  language: string;
  router: ReturnType<typeof useRouter>;
  searchParams: ReturnType<typeof useSearchParams>;
}

function useWatchlistHandlers({
  data,
  ordering,
  setOrdering,
  setLimitFromUrl,
  modifyWatchlist,
  language,
  router,
  searchParams,
}: WatchlistHandlersParams) {
  const handleLimitChange = (newLimit: number) => {
    void setLimitFromUrl(newLimit);
  };

  const handleOrdering = (key: string) => {
    if (data?.results && data?.results?.length === 0) return;
    void setOrdering(ordering === key ? '-' + String(key) : String(key));
  };

  const handleCompanyChange = async (id: string | undefined) => {
    if (!id) return;

    try {
      await modifyWatchlist.mutateAsync({
        company_id: id,
        lang: language,
      });
    } catch (error) {
      logger.error('Failed to modify watchlist', error);
      throw error;
    }
  };

  const handleHealthCheckNavigation = () => {
    if (!data?.watchlist_id) return;

    router.push(
      getUrlWithParams(
        `/healthcheck?watchlist_id=${data.watchlist_id}&market_id=${searchParams.get('market_id')}&language=${searchParams.get('language')}`,
        new URLSearchParams()
      )
    );
  };

  return { handleLimitChange, handleOrdering, handleCompanyChange, handleHealthCheckNavigation };
}

export function useWatchlistState() {
  const searchParams = useSearchParams();
  const language = getLanguageFromStorage();
  const router = useRouter();

  const { ordering, setOrdering, pageFromUrl, setPageFromUrl, limitFromUrl, setLimitFromUrl } =
    useWatchlistQueryState();

  const { data, isLoading, isRefetching, error } = useGetWatchlist({
    page: pageFromUrl,
    limit: limitFromUrl,
    ordering: ordering,
    lang: language,
  });

  const modifyWatchlist = useModifyWatchlist();

  const { handleLimitChange, handleOrdering, handleCompanyChange, handleHealthCheckNavigation } =
    useWatchlistHandlers({
      data,
      ordering,
      setOrdering,
      setLimitFromUrl,
      modifyWatchlist,
      language,
      router,
      searchParams,
    });

  return {
    data,
    isLoading,
    isRefetching,
    error,
    ordering,
    pageFromUrl,
    setPageFromUrl,
    limitFromUrl,
    handleLimitChange,
    handleOrdering,
    handleCompanyChange,
    handleHealthCheckNavigation,
    modifyWatchlist,
  };
}
