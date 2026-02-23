import { Input } from 'investtech/external-components';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Spinner } from '@/components/custom-components/spinner';

interface CompanySearchInputProps {
  company: import('@/lib/types/watchlist').WatchlistCompany | null;
  searchQuery: string | null;
  isLoading: boolean;
  isLoadingMutation: boolean;
  onSearchChange: (value: string) => void;
  searchResults: React.ReactNode;
}

export function CompanySearchInput({
  company,
  searchQuery,
  isLoading,
  isLoadingMutation,
  onSearchChange,
  searchResults,
}: CompanySearchInputProps) {
  const t = useTranslations('common');

  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="relative grid w-full flex-1 gap-2">
        <Input
          id="watchlist-add-company-input"
          placeholder={t('searchCompany')}
          value={company?.name ?? searchQuery ?? ''}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={isLoadingMutation}
          className="search-input"
        />
        <div className="absolute top-1/2 right-2 -translate-y-1/2">
          {isLoading ? (
            <Spinner />
          ) : company?.name || (searchQuery && searchQuery?.length > 0) ? (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              disabled={isLoadingMutation}
              className="text-grey-600 hover:text-grey-800 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <Search className="h-5 w-5" />
          )}
        </div>
        {searchResults}
      </div>
    </div>
  );
}
