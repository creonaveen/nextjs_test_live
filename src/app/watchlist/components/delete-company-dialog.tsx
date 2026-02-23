import { Button } from 'investtech/external-components';
import {
  Dialog,
  DialogAction,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'investtech/external-components';
import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { WatchlistCompany } from '@/lib/types/watchlist';

interface DeleteCompanyDialogContentProps {
  isLoading: boolean;
  isDeleting: boolean;
  selectedCompany: WatchlistCompany | null;
  onDelete: () => void;
}

function DeleteCompanyDialogHeader() {
  const w = useTranslations('watchlist');
  return (
    <DialogHeader>
      <DialogTitle>{w('deleteCompany')}</DialogTitle>
    </DialogHeader>
  );
}

function DeleteCompanyDialogBody({
  isLoading,
  isDeleting,
  selectedCompany,
}: {
  isLoading: boolean;
  isDeleting: boolean;
  selectedCompany: WatchlistCompany | null;
}) {
  const w = useTranslations('watchlist');

  if (isLoading || isDeleting) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="border-grey-300 h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mt-1.5 flex items-center gap-2">
      <span className="text-grey-700 dark:text-grey-200 text-sm">
        {w('deleteCompanyPrefix')}
        <span className="text-foreground text-[16px] font-bold">
          {` ${selectedCompany?.name ?? 'company'} `}
        </span>
        {w('deleteCompanySuffix')}
      </span>
    </div>
  );
}

function DeleteCompanyDialogFooter({
  isLoading,
  isDeleting,
  selectedCompany,
  onDelete,
}: {
  isLoading: boolean;
  isDeleting: boolean;
  selectedCompany: WatchlistCompany | null;
  onDelete: () => void;
}) {
  const t = useTranslations('common');

  if (!selectedCompany?.id) {
    return null;
  }

  const companyName = selectedCompany.name || 'company';
  const isProcessing = isLoading || isDeleting;

  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button
          id="watchlist-delete-company-cancel-button"
          type="button"
          variant="ghost"
          disabled={isProcessing}
          aria-label={t('cancel') || 'Cancel deletion'}
        >
          {t('cancel')}
        </Button>
      </DialogClose>
      <DialogAction asChild>
        <Button
          id="watchlist-delete-company-delete-button"
          type="button"
          variant="default"
          className="cursor-pointer"
          onClick={() => onDelete()}
          disabled={isProcessing}
          aria-label={`${isDeleting ? 'Deleting' : 'Delete'} ${companyName} from watchlist`}
          aria-busy={isProcessing}
        >
          {isDeleting ? t('deleting') || 'Deleting...' : t('delete')}
        </Button>
      </DialogAction>
    </DialogFooter>
  );
}

function DeleteCompanyDialogContent({
  isLoading,
  isDeleting,
  selectedCompany,
  onDelete,
}: DeleteCompanyDialogContentProps) {
  return (
    <>
      <DeleteCompanyDialogHeader />
      <DeleteCompanyDialogBody
        isLoading={isLoading}
        isDeleting={isDeleting}
        selectedCompany={selectedCompany}
      />
      <DeleteCompanyDialogFooter
        isLoading={isLoading}
        isDeleting={isDeleting}
        selectedCompany={selectedCompany}
        onDelete={onDelete}
      />
    </>
  );
}

export function DeleteCompanyDialog({
  isLoading,
  selectedCompany,
  deleteCompany,
}: {
  isLoading: boolean;
  selectedCompany: WatchlistCompany | null;
  deleteCompany: (company_id: string | undefined) => void;
}) {
  const w = useTranslations('watchlist');
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (!selectedCompany?.id) return;
    setIsDeleting(true);
    deleteCompany(`-${selectedCompany.id}`);
    setOpen(false);
    setIsDeleting(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) setIsDeleting(false);
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Trash
          size={32}
          id="watchlist-delete-company-icon"
          className="hover:text-primary hover:bg-grey-100 dark:hover:bg-accent-1/50 ml-auto cursor-pointer rounded-full p-2"
          aria-label={w('deleteCompany')}
        />
      </DialogTrigger>
      <DialogContent
        id="watchlist-delete-company-dialog"
        className="gap-6 sm:max-w-md"
        aria-describedby={undefined}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DeleteCompanyDialogContent
          isLoading={isLoading}
          isDeleting={isDeleting}
          selectedCompany={selectedCompany}
          onDelete={handleDelete}
        />
      </DialogContent>
    </Dialog>
  );
}
