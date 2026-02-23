import { DialogHeader, DialogTitle } from 'investtech/external-components';
import { useTranslations } from 'next-intl';

import { WatchlistCompany } from '@/lib/types/watchlist';
import { AddCompanyDialogFooter } from './add-company-dialog-footer';
import { CompanySearchInput } from './company-search-input';
import { SearchResultsDropdown } from './search-results-dropdown';

interface AddCompanyDialogContentProps {
  company: WatchlistCompany | null;
  searchQuery: string | null;
  results: WatchlistCompany[];
  error: string | null;
  isLoading: boolean;
  isLoadingMutation: boolean;
  selectedIndex: number;
  getItemRef: (index: number) => React.RefObject<HTMLLIElement>;
  onSearchChange: (value: string) => void;
  onSelectChange: (company: WatchlistCompany) => void;
  onCancel: () => void;
  onSave: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function AddCompanyDialogContent({
  company,
  searchQuery,
  results,
  error,
  isLoading,
  isLoadingMutation,
  selectedIndex,
  getItemRef,
  onSearchChange,
  onSelectChange,
  onCancel,
  onSave,
}: AddCompanyDialogContentProps) {
  const t = useTranslations('common');

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('addCompany')}</DialogTitle>
      </DialogHeader>
      <CompanySearchInput
        company={company}
        searchQuery={searchQuery}
        isLoading={isLoading}
        isLoadingMutation={isLoadingMutation}
        onSearchChange={onSearchChange}
        searchResults={
          <SearchResultsDropdown
            searchQuery={searchQuery}
            results={results}
            isLoading={isLoading}
            selectedIndex={selectedIndex}
            isLoadingMutation={isLoadingMutation}
            getItemRef={getItemRef}
            onSelect={onSelectChange}
          />
        }
      />
      {error && <span className="text-destructive mt-1 text-xs">{error}</span>}
      <AddCompanyDialogFooter
        company={company}
        isLoadingMutation={isLoadingMutation}
        onCancel={onCancel}
        onSave={onSave}
      />
    </>
  );
}
