export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { cache } from 'react';

import { getServerQueryParams } from '@/lib/hooks/get-server-query-params';
import { isRedirectError } from '@/lib/redirect-utils';
import { Metadata, ModelPortfolio } from '@/lib/types/model-portfolio';
import {
  modelPortfolioApiService,
  ModelPortfolioQueryParams,
} from '@/store/api-service/model-portfolio-api-service';

import ModelPortfolioDetails from './components/model-portfolio-details';

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface ApiError {
  response?: {
    status?: number;
  };
  message?: string;
}

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

function validateInputs(market_id: string, lang: string) {
  if (!market_id || typeof market_id !== 'string') {
    throw new Error('Invalid market_id');
  }

  if (!lang || typeof lang !== 'string') {
    throw new Error('Invalid language code');
  }
}

/* -------------------------------------------------------------------------- */
/* Fetch Logic                                                                */
/* -------------------------------------------------------------------------- */

async function fetchModelPortfolioData(
  queryParams: ModelPortfolioQueryParams
): Promise<ModelPortfolio> {
  const data = await modelPortfolioApiService.getModelPortfolio(queryParams);

  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response data structure');
  }

  return data;
}

function handleFetchError(error: unknown): never {
  if (isRedirectError(error)) {
    throw error;
  }

  const apiError = error as ApiError;

  throw new Error(`Failed to fetch model portfolio: ${apiError?.message || 'Unknown error'}`);
}

/* -------------------------------------------------------------------------- */
/* Cached Data Fetcher (Complexity Fixed)                                     */
/* -------------------------------------------------------------------------- */

const getModelPortfolioData = cache(
  async (market_id: string, lang: string): Promise<ModelPortfolio> => {
    validateInputs(market_id, lang);

    const queryParams: ModelPortfolioQueryParams = {
      market_id,
      lang,
    };

    try {
      return await fetchModelPortfolioData(queryParams);
    } catch (error) {
      handleFetchError(error);
    }
  }
);

/* -------------------------------------------------------------------------- */
/* Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export async function generateMetadata(): Promise<Metadata> {
  const { market_id, lang } = await getServerQueryParams();

  try {
    const data = await getModelPortfolioData(market_id, lang);

    return {
      title: data?.meta?.title ?? 'investtech',
      description: data?.meta?.description ?? 'investtech',
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('Metadata fetch failed:', error);
    }

    return {
      title: 'investtech',
      description: 'investtech',
    };
  }
}

/* -------------------------------------------------------------------------- */
/* Page Component                                                             */
/* -------------------------------------------------------------------------- */

export default async function ModelPortfolioPage() {
  const { market_id, lang } = await getServerQueryParams();

  let data: ModelPortfolio | null = null;
  let isError = false;

  try {
    data = await getModelPortfolioData(market_id, lang);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    const apiError = error as ApiError;

    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', apiError);
    }

    if (apiError?.response?.status === 404) {
      redirect('/');
    }

    isError = true;
  }

  if (!data && !isError) {
    isError = true;
  }

  return <ModelPortfolioDetails data={data || ({} as ModelPortfolio)} isError={isError} />;
}
