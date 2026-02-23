'use client';

import { Button } from 'investtech/external-components';
import { Card } from 'investtech/external-components';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import { configuration } from '@/environment/configuration';
import logger from '@/utils/logger';
import { redirectToUrl } from '@/utils/navigation-utils';

interface SessionExpiryTabProps {
  language: string;
}

/**
 * Validates if a language code is supported
 */
function isValidLanguage(lang: string | undefined): lang is string {
  if (!lang) return false;
  return configuration.VALID_LANGUAGES.includes(
    lang as (typeof configuration.VALID_LANGUAGES)[number]
  );
}

/**
 * Validates if a URL is safe to redirect to
 */
function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    // Only allow https URLs for security
    return parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
}

function useSubscriptionUrl(language: string): string | null {
  return useMemo(() => {
    const currentLanguage = isValidLanguage(language) ? language : configuration.DEFAULT_LANGUAGE;
    const url =
      configuration.NORDNET_SUBSCRIPTION_URLS[
        currentLanguage as keyof typeof configuration.NORDNET_SUBSCRIPTION_URLS
      ];

    if (!url) {
      logger.error(
        'No subscription URL found for language',
        new Error('Missing subscription URL'),
        { language: currentLanguage, component: 'session-expiry-url' }
      );
      return null;
    }

    if (!isValidUrl(url)) {
      logger.error('Invalid subscription URL for language', new Error('Invalid URL format'), {
        language: currentLanguage,
        url,
        component: 'session-expiry-url-validation',
      });
      return null;
    }

    return url;
  }, [language]);
}

function useRedirectHandler(subscriptionUrl: string | null) {
  const s = useTranslations('session_expiry');
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleClick = () => {
    if (!subscriptionUrl) {
      const errorMessage = s('redirect_error');
      setError(errorMessage || 'Unable to redirect. Please try again later.');
      return;
    }

    setIsRedirecting(true);
    setError(null);

    try {
      redirectToUrl(subscriptionUrl);
    } catch (err) {
      setIsRedirecting(false);
      const errorMessage = s('redirect_error');
      setError(errorMessage || 'Unable to redirect. Please try again later.');

      logger.error(
        'Redirect failed in session expiry',
        err instanceof Error ? err : new Error(String(err)),
        { subscriptionUrl, component: 'session-expiry-redirect' }
      );
    }
  };

  return { s, handleClick, error, isRedirecting };
}

function SessionExpiryLogo() {
  return (
    <div className="flex justify-start">
      <Image
        className="relative block h-8 w-auto cursor-pointer dark:hidden"
        alt="Investtech Logo"
        src="light_logo.svg"
        width={115}
        height={24}
      />
      <Image
        className="relative hidden h-8 w-auto cursor-pointer dark:block"
        alt="Investtech Logo"
        src="dark_logo.svg"
        width={115}
        height={24}
      />
    </div>
  );
}

interface SessionExpiryContentProps {
  s: (key: string) => string;
  error: string | null;
  isRedirecting: boolean;
  subscriptionUrl: string | null;
  onRestartClick: () => void;
}

function SessionExpiryContent({
  s,
  error,
  isRedirecting,
  subscriptionUrl,
  onRestartClick,
}: SessionExpiryContentProps) {
  return (
    <div className="flex min-h-[80dvh] items-center justify-center px-4">
      <Card className="w-full max-w-md space-y-11 p-6 text-left">
        <SessionExpiryLogo />
        <div className="flex flex-col gap-2">
          <h1 className="text-grey-900 text-2xl font-bold dark:text-white">{s('title')}</h1>
          <p className="text-grey-750 dark:text-grey-200 text-xs font-normal md:text-sm">
            {s('message_prefix')} {'app'} {s('message_suffix')}
          </p>
          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="text-destructive text-xs font-normal md:text-sm"
            >
              {error}
            </div>
          )}
        </div>
        <Button
          onClick={onRestartClick}
          size="md"
          className="w-fit"
          disabled={isRedirecting || !subscriptionUrl}
          aria-label={s('restart_button') || 'Restart session and redirect to subscription page'}
          aria-describedby={error ? 'error-message' : undefined}
        >
          {isRedirecting ? s('redirecting') || 'Redirecting...' : s('restart_button')}
        </Button>
      </Card>
    </div>
  );
}

export default function SessionExpiryTab({ language }: SessionExpiryTabProps) {
  const subscriptionUrl = useSubscriptionUrl(language);
  const { s, handleClick, error, isRedirecting } = useRedirectHandler(subscriptionUrl);
  return (
    <SessionExpiryContent
      s={s}
      error={error}
      isRedirecting={isRedirecting}
      subscriptionUrl={subscriptionUrl}
      onRestartClick={handleClick}
    />
  );
}
