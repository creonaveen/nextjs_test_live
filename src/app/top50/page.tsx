export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { cache } from 'react';

import { getServerQueryParams } from '@/lib/hooks/get-server-query-params';
import { isRedirectError } from '@/lib/redirect-utils';
import { Top50List, Metadata } from '@/lib/types/top50';
import { top50ApiService, Top50QueryParams } from '@/store/api-service/top50-api-service.server';

import { Top50Table } from './components/top50-table';

function is404ApiError(error: unknown): boolean {
  return (
    !!error &&
    typeof error === 'object' &&
    'response' in error &&
    !!error.response &&
    typeof error.response === 'object' &&
    'status' in error.response &&
    error.response.status === 404
  );
}

/**
 * Cached function to fetch top50 list data from the API
 *
 * @param market_id - Market identifier for filtering top50
 * @param lang - Language code for localized content
 * @returns Promise resolving to Top50List data
 */
const getTop50Data = cache(async (market_id: string, lang: string): Promise<Top50List> => {
  const queryParams: Top50QueryParams = {
    market_id: market_id,
    ordering: '-score',
    page: 1,
    limit: 50,
    buyOrSell: 'buy',
    timespan: 'medium',
    lang: lang,
  };

  return await top50ApiService.getTop50List(queryParams);
});

/**
 * Generates metadata for the top50 page
 *
 * @returns Promise resolving to Metadata object for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  const { market_id, lang } = await getServerQueryParams();

  try {
    const data = await getTop50Data(market_id, lang);

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
 * Top50 Page Component
 *
 * Server component that fetches and displays the top50 list.
 * Handles errors gracefully and redirects on 404 errors.
 *
 * @returns JSX element containing the top50 table
 */
export default async function Top50Page() {
  const { market_id, lang } = await getServerQueryParams();

  let data: Top50List | null = null;

  try {
    data = await getTop50Data(market_id, lang);
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    if (process.env.NODE_ENV === 'development') console.error('API error:', error);
    if (is404ApiError(error)) redirect(`/`);
    throw new Error('Failed to load top50 data');
  }

  // Ensure we have valid data before rendering
  if (!data) {
    throw new Error('Top50 data is missing');
  }

  return <Top50Table serverData={data} />;
}
