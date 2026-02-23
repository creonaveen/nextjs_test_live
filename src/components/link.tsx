'use client';

import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import { configuration } from '@/environment/configuration';
import { getLanguageFromStorage, getMarketIDFromStorage } from '@/lib/utils';

interface EnhancedLinkProps extends React.ComponentProps<typeof NextLink> {
  href: string;
  children: React.ReactNode;
}

/* ------------------------------ */
/* Helpers (reduce complexity)    */
/* ------------------------------ */

const getBasePath = () => (configuration.BASE_PATH ? `/${configuration.BASE_PATH}` : '');

const getMarketAndLanguage = (searchParams: ReturnType<typeof useSearchParams>) => {
  const market_id =
    searchParams.get('market_id') ?? getMarketIDFromStorage() ?? configuration?.DEFAULT_MARKET_ID;

  const language =
    searchParams.get('language') ?? getLanguageFromStorage() ?? configuration?.DEFAULT_LANGUAGE;

  return { market_id, language };
};

const normalizePath = (href: string, base: string) => {
  const hrefWithoutBase = base ? href.replace(base, '') : href;
  return hrefWithoutBase.startsWith('/') ? hrefWithoutBase : `/${hrefWithoutBase}`;
};

const appendQueryParams = (path: string, market_id?: string | null, language?: string | null) => {
  const hasMarketId = path.includes('market_id=');
  const hasLanguage = path.includes('language=') || path.includes('lang=');

  const queryParts: string[] = [];

  if (!hasMarketId && market_id) {
    queryParts.push(`market_id=${market_id}`);
  }

  if (!hasLanguage && language) {
    queryParts.push(`language=${language}`);
  }

  if (queryParts.length === 0) return path;

  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}${queryParts.join('&')}`;
};

/* ------------------------------ */
/* Component                      */
/* ------------------------------ */

export const Link = ({ href, children, ...props }: EnhancedLinkProps) => {
  const searchParams = useSearchParams();

  const base = getBasePath();
  const { market_id, language } = getMarketAndLanguage(searchParams);

  const normalizedPath = normalizePath(href, base);
  const processedHref = appendQueryParams(normalizedPath, market_id, language);

  return (
    <NextLink prefetch={configuration.LINK_PREFETCH_ENABLED} href={processedHref} {...props}>
      {children}
    </NextLink>
  );
};

Link.displayName = 'Link';
