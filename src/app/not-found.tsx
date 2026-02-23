'use client';

import { Button } from 'investtech/external-components';
import Image from 'next/image';
import { Link } from '@/components/link';
import { useTranslations } from 'next-intl';
import { Suspense, useMemo } from 'react';

import { Storage } from '@/store/local-storage';
import { configuration } from '@/environment/configuration';

function useNotFoundHomeUrl() {
  const marketId = useMemo(() => {
    try {
      return Storage.getMarketId();
    } catch {
      return configuration.DEFAULT_MARKET_ID;
    }
  }, []);
  const language = useMemo(() => {
    try {
      return Storage.getLanguage();
    } catch {
      return configuration.DEFAULT_LANGUAGE;
    }
  }, []);
  return `?market_id=${marketId}&language=${language}`;
}

function NotFoundLogo() {
  return (
    <div className="flex w-full justify-start p-6 md:p-10">
      <Image
        className="block w-auto dark:hidden"
        alt="Investtech Logo"
        src="light_logo.svg"
        width={32}
        height={32}
      />
      <Image
        className="hidden w-auto dark:block"
        alt="Investtech Logo"
        src="dark_logo.svg"
        width={32}
        height={32}
      />
    </div>
  );
}

function NotFoundBody({ homeUrl }: { homeUrl: string }) {
  const c = useTranslations('common');
  const e = useTranslations('errors');
  return (
    <div className="relative flex grow flex-col items-center justify-center px-6">
      <Image
        className="block dark:hidden"
        src="image_light_404.svg"
        alt="404"
        width={1000}
        height={1000}
      />
      <Image
        className="hidden dark:block"
        src="image_dark_404.svg"
        alt="404"
        width={1000}
        height={1000}
      />
      <h2
        className="font-headline mt-6 text-2xl font-semibold text-black md:text-4xl dark:text-white"
        id="not-found-heading"
      >
        {e('lookingForSomething')}
      </h2>
      <p className="mt-2 text-sm font-semibold md:text-base" id="not-found-paragraph">
        {e('weCouldntFindThePageYoureLookingFor')}
      </p>
      <Link href={homeUrl} className="mt-8" id="not-found-home-button-link">
        <Button id="not-found-home-button">{c('home')}</Button>
      </Link>
    </div>
  );
}

function NotFoundContent() {
  const homeUrl = useNotFoundHomeUrl();
  return (
    <div className="dark:bg-grey-900 fixed inset-0 z-50 flex min-h-[100dvh] flex-col overflow-y-auto bg-white text-center">
      <NotFoundLogo />
      <NotFoundBody homeUrl={homeUrl} />
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense
      fallback={
        <div className="dark:bg-grey-900 relative z-50 flex min-h-[100dvh] flex-col overflow-y-auto bg-white text-center">
          <div className="flex w-full justify-start p-6 md:p-10">
            <Image
              className="block w-auto dark:hidden"
              alt="Investtech Logo"
              src="light_logo.svg"
              width={32}
              height={32}
            />
            <Image
              className="hidden w-auto dark:block"
              alt="Investtech Logo"
              src="dark_logo.svg"
              width={32}
              height={32}
            />
          </div>
          <div className="relative flex grow flex-col items-center justify-center px-6">
            <div className="text-lg">Loading...</div>
          </div>
        </div>
      }
    >
      <NotFoundContent />
    </Suspense>
  );
}
