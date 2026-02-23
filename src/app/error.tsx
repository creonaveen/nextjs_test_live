'use client';

import { Button } from 'investtech/external-components';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import { Link } from '@/components/link';
import { isNotFoundError } from '@/lib/redirect-utils';
import { Storage } from '@/store/local-storage';
import logger from '@/utils/logger';
import { configuration } from '@/environment/configuration';

/**
 * Props for ErrorPage component
 */
interface ErrorPageProps {
  /** Error object that triggered the error boundary */
  error: Error & { digest?: string };
}

function useErrorPageEffects(error: Error & { digest?: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const marketId = useMemo(() => {
    if (!isClient) return configuration.DEFAULT_MARKET_ID;
    try {
      return Storage.getMarketId();
    } catch {
      return configuration.DEFAULT_MARKET_ID;
    }
  }, [isClient]);

  useEffect(() => {
    logger.error('Error boundary caught an error', error, {
      component: 'error-boundary',
      errorBoundary: true,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return { marketId };
}

function ErrorPageLogo() {
  return (
    <div className="flex w-full justify-start p-6 md:p-10">
      <Image
        className="block w-auto dark:hidden"
        alt="Investtech Logo"
        src="light_logo.svg"
        width={32}
        height={32}
        aria-hidden="true"
      />
      <Image
        className="hidden w-auto dark:block"
        alt="Investtech Logo"
        src="dark_logo.svg"
        width={32}
        height={32}
        aria-hidden="true"
      />
    </div>
  );
}

function ErrorPageBody({ homeUrl }: { homeUrl: string }) {
  const c = useTranslations('common');
  const e = useTranslations('errors');
  return (
    <div className="relative flex grow flex-col items-center justify-center px-6">
      <h2
        className="font-headline mt-6 text-2xl font-normal text-black md:text-4xl dark:text-white"
        id="error-heading"
      >
        {e('oopsSomethingWentWrong')}
      </h2>
      <p
        className="mt-2 text-sm font-semibold text-black md:text-base dark:text-white"
        id="error-paragraph"
      >
        {e('pleaseTryAgainLater')}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link href={homeUrl} id="error-home-button-link">
          <Button aria-label="Go to home" id="error-home-button">
            {c('home')}
          </Button>
        </Link>
      </div>
    </div>
  );
}

/**
 * ErrorPage - Error boundary component for routes
 *
 * Displays user-friendly error messages and provides options to navigate home
 * or retry the failed operation. Handles both standard errors and Next.js
 * special errors (redirect, notFound).
 *
 * @param error - Error object that triggered the boundary
 */
export default function ErrorPage({ error }: ErrorPageProps) {
  if (isNotFoundError(error)) {
    notFound();
  }

  const { marketId } = useErrorPageEffects(error);
  const homeUrl = `?market_id=${marketId}`;

  return (
    <div
      className="dark:bg-grey-900 fixed inset-0 z-50 flex min-h-screen flex-col bg-white text-center"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <ErrorPageLogo />
      <ErrorPageBody homeUrl={homeUrl} />
    </div>
  );
}
