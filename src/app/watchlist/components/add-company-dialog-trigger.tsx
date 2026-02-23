import { Button } from 'investtech/external-components';
import { useTranslations } from 'next-intl';

interface AddCompanyDialogTriggerProps {
  onClick: () => void;
}

export function AddCompanyDialogTrigger({ onClick }: AddCompanyDialogTriggerProps) {
  const t = useTranslations('common');

  return (
    <Button
      id="watchlist-add-company-button"
      variant="default"
      className="cursor-pointer"
      onClick={onClick}
    >
      {t('addCompany')}
    </Button>
  );
}
