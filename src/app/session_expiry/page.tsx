import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { configuration } from '@/environment/configuration';
import { getServerSideLanguage } from '@/lib/server-cookie';

import SessionExpirySkeleton from './components/loading';
import SessionExpiryTab from './components/session-expiry-tab';
import { isRedirectError } from '@/lib/redirect-utils';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('sessionExpiry');

  try {
    return {
      title: t('title'),
      description: t('description'),
    };
  } catch (error) {
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

export default async function SessionExpiryPage() {
  const language = (await getServerSideLanguage()) ?? configuration?.DEFAULT_LANGUAGE;

  return (
    <Suspense fallback={<SessionExpirySkeleton />}>
      <SessionExpiryTab language={language} />
    </Suspense>
  );
}
