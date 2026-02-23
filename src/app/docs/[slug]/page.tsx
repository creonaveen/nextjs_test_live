import { notFound } from 'next/navigation';
import { cache } from 'react';

import { getServerQueryParams } from '@/lib/hooks/get-server-query-params';
import type { Metadata, ResearchPage as ResearchPageType } from '@/lib/types/research-page';
import type { ResearchQueryParams } from '@/store/api-service/research-api-service';
import { researchApiServiceServer } from '@/store/api-service/research-api-service.server';

import MainPage from './components/main-page';
import { isNotFoundError, isRedirectError } from '@/lib/redirect-utils';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* =========================
   Cached API Call
========================= */

const getResearchData = cache(
  async (slug: string, market_id: string, lang: string): Promise<ResearchPageType> => {
    const queryParams: ResearchQueryParams = {
      market_id,
      lang,
    };

    return (await researchApiServiceServer.getResearch(slug, queryParams)) as ResearchPageType;
  }
);

/* =========================
   Error Helpers
========================= */

function is404Error(error: unknown): boolean {
  return (
    isNotFoundError(error) ||
    (typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      (error as { status?: number }).status === 404)
  );
}

function handleServerError(error: unknown, context: string) {
  if (isRedirectError(error)) {
    throw error;
  }

  if (process.env.NODE_ENV === 'development') {
    console.error(`${context} failed:`, error);
  }

  if (is404Error(error)) {
    notFound();
  }
}

/* =========================
   Metadata
========================= */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { market_id, lang } = await getServerQueryParams();

  try {
    const data = await getResearchData(slug, market_id, lang);

    return {
      title: data?.meta?.title ?? 'investtech',
      description: data?.meta?.description ?? 'investtech',
    };
  } catch (error: unknown) {
    handleServerError(error, 'Metadata fetch');

    return {
      title: 'investtech',
      description: 'investtech',
    };
  }
}

/* =========================
   Page
========================= */

export default async function ResearchPagePage({ params }: PageProps) {
  const { slug } = await params;
  const { market_id, lang } = await getServerQueryParams();

  try {
    const data = await getResearchData(slug, market_id, lang);

    if (!data) {
      throw new Error('Research page failed to load');
    }

    return <MainPage data={data} />;
  } catch (error: unknown) {
    handleServerError(error, 'Research API');

    throw new Error('Research page failed to load');
  }
}
