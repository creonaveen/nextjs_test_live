import { TableCell, TableRow } from 'investtech/external-components';
import { Link } from '@/components/link';

import { WatchlistResult } from '@/lib/types/watchlist';
import { getColorClass, getResponsiveHideClass } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';

import { DeleteCompanyDialog } from './delete-company-dialog';

interface WatchlistTableRowProps {
  company: WatchlistResult;
  index: number;
  isLoading: boolean;
  isRefetching: boolean;
  onCompanyChange: (id: string | undefined) => void;
}

function CompanyLinkCell({
  company,
  field,
  className,
  id,
}: {
  company: WatchlistResult;
  field: 'name' | 'ticker';
  className: string;
  id: string;
}) {
  const value = company[field] ?? '-';
  return (
    <TableCell className={className} id={id}>
      <Link
        href={`/company/${company.id}?market_id=${company.market_id}`}
        className="whitespace-nowrap"
      >
        {value}
      </Link>
    </TableCell>
  );
}

function NumericCell({
  value,
  className,
  id,
}: {
  value: string | number | null | undefined;
  className: string;
  id: string;
}) {
  return (
    <TableCell className={className} id={id}>
      {value ?? '-'}
    </TableCell>
  );
}

function ClosePriceCell({ company, index }: { company: WatchlistResult; index: number }) {
  return (
    <TableCell
      className={`${getResponsiveHideClass(['mobile'])} numeric-table-cell min-w-[60px] text-right lg:min-w-[80px]`}
      id={`watchlist-table-close-${index + 1}`}
    >
      {company.close ? <RenderHTML html={company.close} /> : <span>-</span>}
    </TableCell>
  );
}

function ProfitLossCell({ company, index }: { company: WatchlistResult; index: number }) {
  return (
    <TableCell
      className={`${getResponsiveHideClass(['mobile'])} numeric-table-cell min-w-[60px] text-right lg:min-w-[80px] ${getColorClass(
        company.profit_loss_percent?.sign ?? '-'
      )}`}
      id={`watchlist-table-profit-loss-percent-${index + 1}`}
    >
      {company.profit_loss_percent?.value ?? '-'}
    </TableCell>
  );
}

export function WatchlistTableRow({
  company,
  index,
  isLoading,
  isRefetching,
  onCompanyChange,
}: WatchlistTableRowProps) {
  return (
    <TableRow id={`watchlist-table-row-${index + 1}`} showHover={false} key={company.ticker}>
      <CompanyLinkCell
        company={company}
        field="name"
        className="company-link-button table-cell max-w-[110px] truncate sm:max-w-none sm:min-w-[100px]"
        id={`watchlist-table-name-${index + 1}`}
      />
      <CompanyLinkCell
        company={company}
        field="ticker"
        className={`${getResponsiveHideClass(['laptop'])} company-link-button min-w-[60px] lg:min-w-[80px]`}
        id={`watchlist-table-ticker-${index + 1}`}
      />
      <NumericCell
        value={company.investtech_score}
        className="numeric-table-cell table-cell min-w-[60px] text-right lg:min-w-[80px]"
        id={`watchlist-table-score-${index + 1}`}
      />
      <ClosePriceCell company={company} index={index} />
      <ProfitLossCell company={company} index={index} />
      <TableCell className="text-right" id={`watchlist-table-delete-${index + 1}`}>
        <DeleteCompanyDialog
          isLoading={isLoading || isRefetching}
          selectedCompany={company}
          deleteCompany={(id) => void onCompanyChange(id)}
        />
      </TableCell>
    </TableRow>
  );
}
