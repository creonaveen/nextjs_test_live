'use client';

import * as Flags from 'country-flag-icons/react/3x2';
import { Button, Input } from 'investtech/external-components';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useDebounce } from '@/lib/hooks/use-debounce';
import { useKeyboardNavigation } from '@/lib/hooks/use-keyboard-navigation';
import { useMarketId } from '@/lib/hooks/use-market-id';
import { Company } from '@/lib/types/company';
import { cn } from '@/lib/utils';
import { useGetCompanyList } from '@/store/api-service/companies-api-service';
import { getUrlWithParams } from '@/utils/navigation-utils';

interface SearchResult {
  id: string;
  name: string;
  country_code: string;
  market_id: number;
}

type FlagComponent = React.ComponentType<{ className?: string }>;

const mapCompanies = (data?: { results?: Company[] }): SearchResult[] =>
  data?.results?.map(({ id, name, country_code, market_id }) => ({
    id,
    name,
    country_code,
    market_id,
  })) ?? [];

function useOutsideClick(ref: React.RefObject<HTMLElement>, onClose: () => void) {
  useEffect(() => {
    const handler = (e: MouseEvent) =>
      ref.current && !ref.current.contains(e.target as Node) && onClose();
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, onClose]);
}

// Hook for managing search state and data
function useCompanySearch(marketId: number | null) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data, isLoading } = useGetCompanyList({
    market_id: marketId as unknown as string,
    page: 1,
    limit: 10,
    q: debouncedQuery.trim(),
  });

  const results = useMemo(() => mapCompanies(data), [data]);

  useEffect(() => {
    if (!debouncedQuery) setIsOpen(false);
    else setIsOpen(true);
  }, [debouncedQuery]);

  return { searchQuery, setSearchQuery, isOpen, setIsOpen, results, isLoading };
}

// Search input component
function SearchInput({
  searchQuery,
  setSearchQuery,
  isOpen,
  isLoading,
  t,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isOpen: boolean;
  isLoading: boolean;
  t: (key: string) => string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Input
        ref={inputRef}
        value={searchQuery}
        placeholder={t('searchCompany')}
        onChange={(e) => setSearchQuery(e.target.value)}
        role="combobox"
        aria-expanded={isOpen}
        className="search-input rounded-full"
      />
      <div className="absolute top-1/2 right-1 -translate-y-1/2">
        {isLoading ? (
          <div className="border-t-primary h-5 w-5 animate-spin rounded-full border-2" />
        ) : searchQuery ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label={t('clearSearch')}
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4" />
          </Button>
        ) : (
          <Search className="m-2 h-5 w-5" />
        )}
      </div>
    </>
  );
}

function SearchResultItem({
  result,
  index,
  selected,
  keyboard,
  handleSelect,
}: {
  result: SearchResult;
  index: number;
  selected: boolean;
  keyboard: ReturnType<typeof useKeyboardNavigation>;
  handleSelect: (result: SearchResult) => void;
}) {
  const Flag = (Flags as Record<string, FlagComponent>)[result.country_code.toUpperCase()];

  return (
    <button
      key={result.id}
      ref={keyboard.getItemRef(index)}
      onClick={() => handleSelect(result)}
      role="option"
      aria-selected={selected}
      className={cn(
        'flex w-full items-center gap-2 px-4 py-2 text-sm',
        selected && 'bg-accent-1 dark:bg-grey-900'
      )}
    >
      {Flag && <Flag className="h-4 w-6" />}
      {result.name}
    </button>
  );
}

function LoadingState({ t }: { t: (key: string) => string }) {
  return <div className="px-4 py-2 text-sm">{t('loading')}...</div>;
}

function NoResultsState({ e }: { e: (key: string) => string }) {
  return <div className="text-grey-500 px-4 py-2 text-sm">{e('noResultsFound')}</div>;
}

// Search results dropdown component
function SearchResults({
  isOpen,
  results,
  isLoading,
  keyboard,
  handleSelect,
  setIsOpen,
  t,
  e,
}: {
  isOpen: boolean;
  results: SearchResult[];
  isLoading: boolean;
  keyboard: ReturnType<typeof useKeyboardNavigation>;
  handleSelect: (result: SearchResult) => void;
  setIsOpen: (isOpen: boolean) => void;
  t: (key: string) => string;
  e: (key: string) => string;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef as React.RefObject<HTMLElement>, () => setIsOpen(false));

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="dark:bg-grey-800 absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white py-2 shadow-lg"
      role="listbox"
    >
      {isLoading ? (
        <LoadingState t={t} />
      ) : results.length ? (
        results.map((r, i) => (
          <SearchResultItem
            key={r.id}
            result={r}
            index={i}
            selected={i === keyboard.selectedIndex}
            keyboard={keyboard}
            handleSelect={handleSelect}
          />
        ))
      ) : (
        <NoResultsState e={e} />
      )}
    </div>
  );
}

function CompanySearchBar() {
  const t = useTranslations('common');
  const e = useTranslations('errors');
  const router = useRouter();
  const searchParams = useSearchParams();
  const marketId = useMarketId();

  const { searchQuery, setSearchQuery, isOpen, setIsOpen, results, isLoading } = useCompanySearch(
    marketId as unknown as number
  );

  const handleSelect = useCallback(
    (r: SearchResult) => {
      setSearchQuery('');
      setIsOpen(false);

      const params = new URLSearchParams();
      params.set('market_id', String(r.market_id));

      const language = searchParams.get('language');
      if (language) params.set('language', language);

      router.push(getUrlWithParams(`/company/${r.id}`, params));
    },
    [router, searchParams, setSearchQuery, setIsOpen]
  );

  const keyboard = useKeyboardNavigation({
    items: results,
    isOpen,
    onSelect: handleSelect,
    onClose: () => setIsOpen(false),
  });

  return (
    <div className="relative w-full">
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isOpen={isOpen}
        isLoading={isLoading}
        t={t}
      />
      <SearchResults
        isOpen={isOpen}
        results={results}
        isLoading={isLoading}
        keyboard={keyboard}
        handleSelect={handleSelect}
        setIsOpen={setIsOpen}
        t={t}
        e={e}
      />
    </div>
  );
}

export default CompanySearchBar;
