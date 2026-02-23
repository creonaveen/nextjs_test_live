export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { cache } from 'react';

import { getServerQueryParams } from '@/lib/hooks/get-server-query-params';
import { isRedirectError } from '@/lib/redirect-utils';
import { IndicesList, Metadata } from '@/lib/types/indices';
import {
  indicesApiService,
  IndicesQueryParams,
} from '@/store/api-service/indices-api-service.server';

import IndicesTable from './components/indices-table';

/**
 * Cached function to fetch indices list data from the API
 *
 * @param market_id - Market identifier for filtering indices
 * @param lang - Language code for localized content
 * @returns Promise resolving to IndicesList data
 */
const getIndicesListData = cache(async (market_id: string, lang: string): Promise<IndicesList> => {
  const queryParams: IndicesQueryParams = {
    market_id: market_id,
    lang: lang,
    ordering: 'name',
    page: 1,
    limit: 10,
  };

  return await indicesApiService.getIndicesList(queryParams);
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
 * Fetches indices data with error handling
 *
 * @param market_id - Market identifier for filtering indices
 * @param lang - Language code for localized content
 * @returns Promise resolving to IndicesList data
 */
async function fetchIndicesData(market_id: string, lang: string): Promise<IndicesList> {
  try {
    return await getIndicesListData(market_id, lang);
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

    throw new Error('Failed to load indices data');
  }
}

/**
 * Generates metadata for the indices page
 *
 * @returns Promise resolving to Metadata object for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  const { market_id, lang } = await getServerQueryParams();

  try {
    const data = await getIndicesListData(market_id, lang);
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
 * Indices Page Component
 *
 * Server component that fetches and displays the indices list.
 * Handles errors gracefully and redirects on 404 errors.
 *
 * @returns JSX element containing the indices table
 */
export default async function IndicesPage() {
  const { market_id, lang } = await getServerQueryParams();

  const data = await fetchIndicesData(market_id, lang);

  return <IndicesTable serverData={data} />;
}
