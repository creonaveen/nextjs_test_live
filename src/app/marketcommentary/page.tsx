export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { cache } from 'react';

import { getServerQueryParams } from '@/lib/hooks/get-server-query-params';
import { isRedirectError } from '@/lib/redirect-utils';
import { MarketCommentary, Metadata } from '@/lib/types/market-commentary';
import {
  marketCommentaryApiService,
  MarketCommentaryQueryParams,
} from '@/store/api-service/market-commentary-api-service';

import MarketCommentaryDetails from './components/market-commentary-details';

const getMarketCommentaryData = cache(
  async (market_id: string, lang: string): Promise<MarketCommentary> => {
    const queryParams: MarketCommentaryQueryParams = {
      market_id: market_id,
      lang: lang,
    };

    return (await marketCommentaryApiService.getMarketCommentary(queryParams)) as MarketCommentary;
  }
);

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
 * Fetches market commentary data with error handling
 *
 * @param market_id - Market identifier for filtering data
 * @param lang - Language code for localized content
 * @returns Promise resolving to MarketCommentary data
 */
async function fetchMarketCommentaryData(
  market_id: string,
  lang: string
): Promise<MarketCommentary> {
  try {
    return await getMarketCommentaryData(market_id, lang);
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

    throw new Error('Market commentary failed to load');
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { market_id, lang } = await getServerQueryParams();

  try {
    const data = await getMarketCommentaryData(market_id, lang);
    return {
      title: data?.meta?.title ?? 'investtech',
      description: data?.meta?.description ?? 'investtech',
    };
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }
    // Log error for debugging but don't expose details to client
    if (process.env.NODE_ENV === 'development') {
      console.error('Metadata fetch failed:', error);
    }
    return {
      title: 'investtech',
      description: 'investtech',
    };
  }
}

export default async function MarketCommentaryPage() {
  const { market_id, lang } = await getServerQueryParams();

  const data = await fetchMarketCommentaryData(market_id, lang);

  return <MarketCommentaryDetails data={data} isError={false} />;
}
