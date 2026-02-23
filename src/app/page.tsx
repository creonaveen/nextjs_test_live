import { cache, Suspense } from 'react';

import { getServerQueryParams } from '@/lib/hooks/get-server-query-params';
import { isRedirectError } from '@/lib/redirect-utils';
import { Metadata } from '@/lib/types/home';
import { getHomePageServerSide } from '@/store/api-service/home-api-service.server';

import HomeTab from './home/home-tab';
import HomeLoading from './home/loading';

/**
 * Cached function to fetch home page data
 * Uses React cache() to deduplicate requests within the same render pass
 * @param market_id - Market identifier
 * @param lang - Language code
 * @returns Home page data or null if fetch fails
 */

const getHomePageData = cache(async (market_id: string, lang: string) => {
  return await getHomePageServerSide({
    market_id: market_id,
    lang: lang,
  });
});

/**
 * Generates dynamic metadata for the partner root page
 * Fetches metadata from the home page API
 *
 * @returns Metadata object for SEO and page title
 */
export async function generateMetadata(): Promise<Metadata> {
  const { market_id, lang } = await getServerQueryParams();

  try {
    const data = await getHomePageData(market_id, lang);
    return {
      title: data?.meta?.title ?? 'investtech',
      description: data?.meta?.description ?? 'investtech',
    };
  } catch (error: unknown) {
    // Re-throw redirect errors to allow Next.js to handle them
    if (isRedirectError(error)) {
      throw error;
    }

    // Log error for debugging but don't expose details to client
    if (process.env.NODE_ENV === 'development') {
      console.error('Metadata fetch failed:', error);
    }

    // Return default metadata on error
    return { title: 'investtech', description: 'investtech' };
  }
}

/**
 * HomeContent - Server component that fetches and renders home page data
 *
 */
async function HomeContent() {
  const { market_id, lang } = await getServerQueryParams();
  let data = null;

  try {
    data = await getHomePageData(market_id, lang);
  } catch (error: unknown) {
    // Re-throw redirect errors to allow Next.js to handle them
    if (isRedirectError(error)) {
      throw error;
    }

    // Log error for debugging but don't expose details to client
    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', error);
    }

    // Re-throw with user-friendly error message
    throw new Error(`Failed to load home page data`);
  }

  if (!data) {
    throw new Error(`Home page data is null`);
  }

  return <HomeTab data={data} />;
}

/**
 * PartnerRootPage - Default export for the partner slug route
 *
 * Wraps content in Suspense boundary for loading states.
 *
 * @returns Suspense-wrapped home page content
 */
export default async function PartnerRootPage() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomeContent />
    </Suspense>
  );
}
