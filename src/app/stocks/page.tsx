export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { cache } from 'react';

import { getServerQueryParams } from '@/lib/hooks/get-server-query-params';
import { isRedirectError } from '@/lib/redirect-utils';
import { Metadata, StockList } from '@/lib/types/stocks';
import { stocksApiService, StocksQueryParams } from '@/store/api-service/stocks-api-service.server';

import StocksTable from './components/stock-tables';

/**
 * Cached function to fetch stocks list data from the API
 *
 * @param market_id - Market identifier for filtering stocks
 * @param lang - Language code for localized content
 * @returns Promise resolving to StockList data
 */
const getStocksListData = cache(async (market_id: string, lang: string): Promise<StockList> => {
  const queryParams: StocksQueryParams = {
    market_id: market_id,
    ordering: 'name',
    page: 1,
    limit: 10,
    alphabetic_filter: '',
    lang: lang,
  };

  return await stocksApiService.getStocksList(queryParams);
});

/**
 * Checks if error is a 404 error that should trigger redirect
 */
function is404Error(error: unknown): boolean {
  return !!(
    error &&
    typeof error === 'object' &&
    'response' in error &&
    error.response &&
    typeof error.response === 'object' &&
    'status' in error.response &&
    error.response.status === 404
  );
}

/**
 * Fetches stocks data with error handling
 *
 * @param market_id - Market identifier for filtering stocks
 * @param lang - Language code for localized content
 * @returns Promise resolving to StockList data
 */
async function fetchStocksData(market_id: string, lang: string): Promise<StockList> {
  try {
    return await getStocksListData(market_id, lang);
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', error);
    }

    if (is404Error(error)) {
      redirect('/');
    }

    throw new Error('Failed to load stocks data');
  }
}

/**
 * Generates metadata for the stocks page
 *
 * @returns Promise resolving to Metadata object for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  const { market_id, lang } = await getServerQueryParams();

  try {
    const data = await getStocksListData(market_id, lang);
    return {
      title: data?.meta?.title ?? 'investtech',
      description: data?.meta?.description ?? 'investtech',
    };
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }
    // Only log errors in development environment
    if (process.env.NODE_ENV === 'development') {
      console.error('Metadata fetch failed:', error);
    }
    return {
      title: 'investtech',
      description: 'investtech',
    };
  }
}

/**
 * Stocks Page Component
 *
 * Server component that fetches and displays the stocks list.
 * Handles errors gracefully and redirects on 404 errors.
 *
 * @returns JSX element containing the stocks table
 */
export default async function StocksPage() {
  const { market_id, lang } = await getServerQueryParams();

  const data = await fetchStocksData(market_id, lang);

  return <StocksTable serverData={data} />;
}
