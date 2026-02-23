import { redirect } from 'next/navigation';
import { cache } from 'react';

import { getServerQueryParams } from '@/lib/hooks/get-server-query-params';
import { isRedirectError } from '@/lib/redirect-utils';
import { Metadata, TodaysCaseData } from '@/lib/types/todays-case';
import { getTodaysCaseServerSide } from '@/store/api-service/todays-case-api-service.server';

import TodaysCaseDetails from './components/todays-case-details';

const getTodaysCaseData = cache(async (market_id: string, lang: string, priceDate?: string) => {
  return getTodaysCaseServerSide({
    market_id,
    lang,
    price_date: priceDate,
  });
});

const DEFAULT_METADATA: Metadata = {
  title: 'investtech',
  description: 'investtech',
};

function is404Error(error: unknown): boolean {
  const status = (error as { response?: { status: number } })?.response?.status;
  return status === 404;
}

function handleServerError(error: unknown, logLabel: string): never {
  if (isRedirectError(error)) throw error;

  if (process.env.NODE_ENV === 'development') {
    console.error(logLabel, error);
  }

  if (is404Error(error)) {
    redirect(`/`);
  }

  throw new Error("Today's Case failed to load");
}

interface PageProps {
  searchParams: Promise<{ price_date?: string }>;
}

async function getMetadataData(
  market_id: string,
  lang: string,
  priceDate?: string
): Promise<TodaysCaseData | null> {
  try {
    return await getTodaysCaseData(market_id, lang, priceDate);
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (process.env.NODE_ENV === 'development') {
      console.error('Metadata fetch failed:', error);
    }

    return null;
  }
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { market_id, lang } = await getServerQueryParams();
  const priceDate = (await searchParams)?.price_date;

  const data = await getMetadataData(market_id, lang, priceDate);

  return {
    title: data?.meta?.title ?? DEFAULT_METADATA.title,
    description: data?.meta?.description ?? DEFAULT_METADATA.description,
  };
}

export default async function TodaysCasePage({ searchParams }: PageProps) {
  try {
    const { market_id, lang } = await getServerQueryParams();
    const priceDate = (await searchParams)?.price_date;

    const data = await getTodaysCaseData(market_id, lang, priceDate);

    if (!data) {
      throw new Error('No data');
    }

    return <TodaysCaseDetails data={data} />;
  } catch (error) {
    handleServerError(error, 'API error:');
  }
}
