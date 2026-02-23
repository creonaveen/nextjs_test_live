import { Button, DialogClose, DialogFooter } from 'investtech/external-components';
import { useTranslations } from 'next-intl';

import { WatchlistCompany } from '@/lib/types/watchlist';

interface AddCompanyDialogFooterProps {
  company: WatchlistCompany | null;
  isLoadingMutation: boolean;
  onCancel: () => void;
  onSave: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function AddCompanyDialogFooter({
  company,
  isLoadingMutation,
  onCancel,
  onSave,
}: AddCompanyDialogFooterProps) {
  const t = useTranslations('common');

  return (
    <DialogFooter className="justify-end">
      <DialogClose asChild>
        <Button
          id="watchlist-add-company-cancel-button"
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isLoadingMutation}
        >
          {t('cancel')}
        </Button>
      </DialogClose>
      <Button
        id="watchlist-add-company-save-button"
        type="button"
        variant="default"
        className="cursor-pointer"
        onClick={onSave}
        disabled={!company || isLoadingMutation}
      >
        {isLoadingMutation ? t('saving') : t('save')}
      </Button>
    </DialogFooter>
  );
}
