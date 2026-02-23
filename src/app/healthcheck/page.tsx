export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { cache } from 'react';

import { getServerQueryParams } from '@/lib/hooks/get-server-query-params';
import { isRedirectError } from '@/lib/redirect-utils';
import { HealthCheckResponse, Metadata } from '@/lib/types/health-check';
import {
  healthCheckApiService,
  HealthCheckQueryParams,
} from '@/store/api-service/health-check-service';

import { HealthCheckContent } from './components/health-check-content';

interface PageProps {
  searchParams: Promise<{
    watchlist_id?: string;
    portfolio_id?: string;
    portfolio_tickers?: string;
    portfolio_num_shares?: string;
    ref_index_ticker?: string;
    ref_index_company_id?: string;
    sections?: string;
  }>;
}

async function resolveQueryParams(
  searchParamsPromise: PageProps['searchParams']
): Promise<HealthCheckQueryParams> {
  const searchParams = await searchParamsPromise;
  const { lang, market_id } = await getServerQueryParams();

  return {
    lang,
    market_id,
    ...pickDefined(searchParams),
  };
}

function pickDefined<T extends Record<string, unknown>>(obj?: T) {
  if (!obj) return {};

  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value != null && value !== '')
  );
}

const getHealthCheckData = cache(
  async (queryParams: HealthCheckQueryParams): Promise<HealthCheckResponse> => {
    return (await healthCheckApiService.getHealthCheck(queryParams)) as HealthCheckResponse;
  }
);

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  try {
    const queryParams = await resolveQueryParams(searchParams);
    const data = await getHealthCheckData(queryParams);

    return {
      title: data?.meta?.title ?? 'investtech',
      description: data?.meta?.description ?? 'investtech',
    };
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;

    if (process.env.NODE_ENV === 'development') {
      console.error('Metadata fetch failed:', error);
    }

    return {
      title: 'investtech',
      description: 'investtech',
    };
  }
}

function handleHealthCheckError(error: unknown): never {
  if (isRedirectError(error)) throw error;

  if (
    error &&
    typeof error === 'object' &&
    'response' in error &&
    (error as { response?: { status?: number } })?.response?.status === 404
  ) {
    redirect('/');
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('API error:', error);
  }

  throw new Error('Health check failed to load');
}

export default async function HealthCheckPage({ searchParams }: PageProps) {
  try {
    const queryParams = await resolveQueryParams(searchParams);
    const data = await getHealthCheckData(queryParams);

    if (!data) {
      throw new Error('Health check failed to load');
    }

    return <HealthCheckContent data={data} />;
  } catch (error: unknown) {
    handleHealthCheckError(error);
  }
}
