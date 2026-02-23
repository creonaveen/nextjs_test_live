import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { Company } from '@/lib/types/company';
import { WatchlistCompany } from '@/lib/types/watchlist';
import { getLanguageFromStorage } from '@/lib/utils';
import { useKeyboardNavigation } from '@/lib/hooks/use-keyboard-navigation';
import { useGetCompanyList } from '@/store/api-service/companies-api-service';
import { useModifyWatchlist } from '@/store/api-service/watchlist-api-service';
import logger from '@/utils/logger';

export function useCompanySearch() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [company, setCompany] = useState<WatchlistCompany | null>(null);
  const [results, setResults] = useState<WatchlistCompany[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useGetCompanyList({
    q: searchQuery,
  });

  const handleSearchChange = (value: string) => {
    setCompany(null); // reset selected company
    setSearchQuery(value.trim()); // only control query here
    setError(null);
  };

  const handleSelectChange = (selectedCompany: WatchlistCompany) => {
    setCompany(selectedCompany);
    setSearchQuery(null); // close dropdown
    setResults([]);
  };

  useEffect(() => {
    if (data?.results?.length) {
      setResults(
        data.results.map((company: Company) => ({
          id: company.id,
          name: company.name,
          country_code: company.country_code,
        }))
      );
    } else {
      setResults([]);
    }
  }, [data]);

  const resetState = () => {
    setSearchQuery(null);
    setCompany(null);
    setResults([]);
    setError(null);
  };

  return {
    searchQuery,
    company,
    results,
    error,
    isLoading,
    handleSearchChange,
    handleSelectChange,
    setError,
    resetState,
  };
}

function useAddCompanyDialogLogic({
  existingCompanies,
  search,
  modifyWatchlist,
  setOpen,
}: {
  existingCompanies: WatchlistCompany[];
  search: ReturnType<typeof useCompanySearch>;
  modifyWatchlist: ReturnType<typeof useModifyWatchlist>;
  setOpen: (open: boolean) => void;
}) {
  const e = useTranslations('errors');
  const language = getLanguageFromStorage();

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!search.company) return;

    if (existingCompanies.some((c) => c.id === search.company!.id)) {
      search.setError(e('companyAlreadyExists'));
      event.preventDefault();
      return;
    }

    void modifyWatchlist
      .mutateAsync({
        company_id: search.company.id,
        lang: language,
      })
      .then(() => {
        setOpen(false);
        search.resetState();
      })
      .catch((error) => {
        search.setError(e('errorAddingCompany') || 'Failed to add company. Please try again.');
        logger.error('Failed to add company to watchlist', error, {
          companyId: search?.company?.id,
        });
      });
  };

  return { handleSave };
}

export function useAddCompanyDialogState({
  existingCompanies,
}: {
  existingCompanies: WatchlistCompany[];
}) {
  const [open, setOpen] = useState(false);
  const search = useCompanySearch();
  const modifyWatchlist = useModifyWatchlist();

  const { selectedIndex, getItemRef } = useKeyboardNavigation({
    items: search.results,
    isOpen: open,
    onSelect: search.handleSelectChange,
    onClose: () => setOpen(false),
    initialIndex: 0,
  });

  const { handleSave } = useAddCompanyDialogLogic({
    existingCompanies,
    search,
    modifyWatchlist,
    setOpen,
  });

  return {
    open,
    setOpen,
    searchQuery: search.searchQuery,
    company: search.company,
    results: search.results,
    error: search.error,
    isLoading: search.isLoading,
    isLoadingMutation: modifyWatchlist.isPending,
    selectedIndex,
    getItemRef,
    handleSearchChange: search.handleSearchChange,
    handleSelectChange: search.handleSelectChange,
    resetState: search.resetState,
    handleSave,
  };
}
