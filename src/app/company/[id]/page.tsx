import { redirect } from 'next/navigation';
import { cache } from 'react';

import { is404Error } from '@/lib/errors';
import { getServerQueryParams } from '@/lib/hooks/get-server-query-params';
import { isRedirectError } from '@/lib/redirect-utils';
import { CompanyDetail } from '@/lib/types/company';
import { Metadata } from '@/lib/types/research-page';
import { getCompanyDetailsServerSide } from '@/store/api-service/companies-api-service.server';

import { CompanyPageClient } from './components/company-page-client';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Route segment config for ISR optimization
 * Revalidate every hour for semi-dynamic content
 */
export const revalidate = 3600; // 1 hour

const getCompanyDetailsData = cache(
  async (id: string, lang: string): Promise<CompanyDetail | null> => {
    return await getCompanyDetailsServerSide({
      company_id: id,
      lang: lang,
    });
  }
);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  let data: CompanyDetail | null = null;
  const { lang } = await getServerQueryParams();

  try {
    data = await getCompanyDetailsData(id, lang);

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

export default async function CompanyDetailsPage({ params }: PageProps) {
  const { id } = await params;
  let data: CompanyDetail | null = null;
  const { lang } = await getServerQueryParams();

  try {
    data = await getCompanyDetailsData(id, lang);
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }

    // Log error for debugging but don't expose details to client
    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', error);
    }

    // Redirect on 404
    if (is404Error(error)) {
      redirect(`/`);
    }

    // For 500 errors or other server errors, throw a user-friendly error
    // This will be caught by the error boundary
    throw new Error('Company details failed to load');
  }

  if (!data) {
    throw new Error('Company details failed to load');
  }

  return <CompanyPageClient data={data} />;
}
