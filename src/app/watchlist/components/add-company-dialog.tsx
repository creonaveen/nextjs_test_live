import { Dialog, DialogContent } from 'investtech/external-components';

import { useAddCompanyDialogState } from '../hooks/use-company-search';
import { AddCompanyDialogContent } from './add-company-dialog-content';
import { AddCompanyDialogTrigger } from './add-company-dialog-trigger';
import { WatchlistCompany } from '@/lib/types/watchlist';

function AddCompanyDialogInner({ existingCompanies }: { existingCompanies: WatchlistCompany[] }) {
  const {
    open,
    setOpen,
    searchQuery,
    company,
    results,
    error,
    isLoading,
    isLoadingMutation,
    selectedIndex,
    getItemRef,
    handleSearchChange,
    handleSelectChange,
    resetState,
    handleSave,
  } = useAddCompanyDialogState({ existingCompanies });

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen: boolean) => {
        if (isOpen) resetState();
        setOpen(isOpen);
      }}
    >
      <AddCompanyDialogTrigger onClick={() => setOpen(true)} />
      <DialogContent
        id="watchlist-add-company-dialog"
        className="sm:max-w-md"
        aria-describedby={undefined}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <AddCompanyDialogContent
          company={company}
          searchQuery={searchQuery}
          results={results}
          error={error}
          isLoading={isLoading}
          isLoadingMutation={isLoadingMutation}
          selectedIndex={selectedIndex}
          getItemRef={getItemRef as unknown as (index: number) => React.RefObject<HTMLLIElement>}
          onSearchChange={handleSearchChange as (value: string) => void}
          onSelectChange={handleSelectChange}
          onCancel={resetState}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
}

export function AddCompanyDialog({ existingCompanies }: { existingCompanies: WatchlistCompany[] }) {
  return <AddCompanyDialogInner existingCompanies={existingCompanies} />;
}
