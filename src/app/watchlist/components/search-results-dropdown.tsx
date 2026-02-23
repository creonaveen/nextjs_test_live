import * as Flags from 'country-flag-icons/react/3x2';
import { Button } from 'investtech/external-components';
import { useTranslations } from 'next-intl';

import { WatchlistCompany } from '@/lib/types/watchlist';
import { cn } from '@/lib/utils';

type FlagComponent = React.ComponentType<{ className?: string }>;

interface SearchResultsDropdownProps {
  searchQuery: string | null;
  results: WatchlistCompany[];
  isLoading: boolean;
  selectedIndex: number;
  isLoadingMutation: boolean;
  getItemRef: (index: number) => React.RefObject<HTMLLIElement>;
  onSelect: (company: WatchlistCompany) => void;
}

export function SearchResultsDropdown({
  searchQuery,
  results,
  isLoading,
  selectedIndex,
  isLoadingMutation,
  getItemRef,
  onSelect,
}: SearchResultsDropdownProps) {
  const t = useTranslations('common');
  const e = useTranslations('errors');

  if (!searchQuery) return null;

  return (
    <div className="bg-background dark:bg-grey-800 absolute top-full right-0 left-0 z-50 mt-1 rounded-md border py-1 shadow-lg">
      <ul className="max-h-60 overflow-y-auto">
        {isLoading ? (
          <li className="text-grey-500 px-4 py-2 text-sm">{t('loading')}...</li>
        ) : results?.length > 0 ? (
          results.map((result, idx) => (
            <SearchResultItem
              key={idx}
              result={result}
              idx={idx}
              selectedIndex={selectedIndex}
              isLoadingMutation={isLoadingMutation}
              getItemRef={getItemRef}
              onSelect={onSelect}
            />
          ))
        ) : (
          <li className="text-grey-600 dark:text-grey-200 px-4 py-2 text-sm">
            {e('noResultsFound')}
          </li>
        )}
      </ul>
    </div>
  );
}

interface SearchResultItemProps {
  result: WatchlistCompany;
  idx: number;
  selectedIndex: number;
  isLoadingMutation: boolean;
  getItemRef: (index: number) => React.RefObject<HTMLLIElement>;
  onSelect: (company: WatchlistCompany) => void;
}

function SearchResultItem({
  result,
  idx,
  selectedIndex,
  isLoadingMutation,
  getItemRef,
  onSelect,
}: SearchResultItemProps) {
  const isSelected = idx === selectedIndex;
  const FlagComponent = (Flags as Record<string, FlagComponent>)[
    result?.country_code?.toUpperCase() ?? ''
  ];

  return (
    <li ref={getItemRef(idx)}>
      <Button
        id={`watchlist-add-company-${idx + 1}`}
        type="button"
        variant="ghost"
        className={cn(
          'hover:bg-grey-100 dark:hover:bg-grey-900 hover:text-primary dark:hover:text-primary flex w-full items-center justify-start gap-2 rounded-md px-4 py-2 text-left text-sm text-black no-underline',
          isSelected && 'bg-grey-100 dark:bg-grey-900 text-black dark:text-white'
        )}
        onClick={() => onSelect(result)}
        disabled={isLoadingMutation}
      >
        {FlagComponent && <FlagComponent className="h-4 w-6" />}
        {result.name}
      </Button>
    </li>
  );
}
