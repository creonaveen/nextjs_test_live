import { Card, CardContent } from 'investtech/external-components';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'investtech/external-components';
import { useTranslations } from 'next-intl';
import { Link } from '@/components/link';

import TableSkeleton from '@/components/custom-components/table-skeleton';
import {
  AnnualizedReturnItem,
  ModelPortfolio,
  TableColumnDefinition,
} from '@/lib/types/model-portfolio';
import { getResponsiveHideClass, toKebabCase } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';

interface ReturnProps {
  data: ModelPortfolio;
  isLoading: boolean;
}

const TABLE_HEADER_CLASS = 'table-cell cursor-default min-w-[60px] lg:min-w-[80px]';
const TABLE_CELL_CLASS = 'table-cell numeric-table-cell min-w-[60px] text-right';

/* -------------------- Header Row -------------------- */

function ReturnTableHeadRow({ columns }: { columns: TableColumnDefinition[] }) {
  return (
    <TableRow showHover={false}>
      {columns.map((col) => {
        const hideClasses = getResponsiveHideClass(
          [
            col.hidden_on_mobile ? 'mobile' : undefined,
            col.hidden_on_tablet ? 'tablet' : undefined,
          ].filter(Boolean) as ('mobile' | 'tablet')[]
        );

        return (
          <TableHead
            key={col.key}
            id={`return-table-head-${toKebabCase(String(col.key))}`}
            className={`${TABLE_HEADER_CLASS} ${hideClasses}`}
          >
            <div className="column-header justify-end whitespace-nowrap">
              <span>{col.column_name || ''}</span>
            </div>
          </TableHead>
        );
      })}
    </TableRow>
  );
}

/* -------------------- Value Cell -------------------- */

function ReturnValueCell({
  value,
  id,
  extraClass,
}: {
  value: unknown;
  id: string;
  extraClass?: string;
}) {
  const html = value != null ? String(value) : null;

  return (
    <TableCell className={`${TABLE_CELL_CLASS} ${extraClass ?? ''}`} id={id}>
      {html ? <RenderHTML html={html} /> : <span>-</span>}
    </TableCell>
  );
}

/* -------------------- Data Cells -------------------- */

function ReturnCells({ item, index }: { item: AnnualizedReturnItem; index: number }) {
  const rowIndex = index + 1;

  const cellConfig = [
    {
      key: 'annual_percentage_year',
      value: item.annual_percentage_year?.value,
      hide: [],
    },
    {
      key: 'annual_percentage_3year',
      value: item.annual_percentage_3year?.value,
      hide: ['mobile', 'tablet'] as ('mobile' | 'tablet')[],
    },
    {
      key: 'annual_percentage_5year',
      value: item.annual_percentage_5year?.value,
      hide: [],
    },
    {
      key: 'annual_percentage_10year',
      value: item.annual_percentage_10year?.value,
      hide: ['mobile'] as 'mobile'[],
    },
    {
      key: 'annual_percentage_since_inception',
      value: item.annual_percentage_since_inception?.value,
      hide: ['mobile'] as 'mobile'[],
    },
  ];

  return (
    <>
      {cellConfig.map((cell) => (
        <ReturnValueCell
          key={cell.key}
          value={cell.value}
          id={`return-table-${cell.key}-${rowIndex}`}
          extraClass={cell.hide.length ? getResponsiveHideClass(cell.hide) : undefined}
        />
      ))}
    </>
  );
}

/* -------------------- Body Row -------------------- */

function ReturnTableBodyRow({ item, index }: { item: AnnualizedReturnItem; index: number }) {
  const rowIndex = index + 1;
  const isLinkRow = index === 1;

  return (
    <TableRow showHover={false} id={`return-table-row-${rowIndex}`}>
      <TableCell
        className={`whitespace-normal ${isLinkRow ? 'company-link-button cursor-pointer' : ''}`}
        id={`return-table-company-name-${rowIndex}`}
      >
        {isLinkRow ? <Link href={`/company/${item?.id ?? ''}`}>{item?.name}</Link> : item?.name}
      </TableCell>

      <ReturnCells item={item} index={index} />
    </TableRow>
  );
}

/* -------------------- Table Content -------------------- */

function TableContent({ data, isLoading }: { data: ModelPortfolio; isLoading: boolean }) {
  const e = useTranslations('errors');
  const annualizedReturn = data?.annualized_return;
  const content = annualizedReturn?.content;

  if (isLoading) {
    return <TableSkeleton rows={2} columns={6} />;
  }

  if (!annualizedReturn) {
    return (
      <TableBody>
        <TableRow showHover={false}>
          <TableCell colSpan={6} className="text-foreground py-4 text-center">
            {e('noData')}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {content?.map((item, index) => (
        <ReturnTableBodyRow key={index} item={item} index={index} />
      ))}
    </TableBody>
  );
}

/* -------------------- Main Component -------------------- */

export default function Return({ data, isLoading }: ReturnProps) {
  const columns = data?.annualized_return?.table_definition ?? [];
  const heading = data?.headers?.return_annualized;

  return (
    <div className="flex flex-col rounded-sm">
      <Card className="w-full" id="return-card">
        <CardContent>
          <div className="pb-4 text-lg font-semibold" id="return-heading">
            {heading}
          </div>

          <Table className="w-full table-auto">
            <TableHeader>
              <ReturnTableHeadRow columns={columns} />
            </TableHeader>

            <TableContent data={data} isLoading={isLoading} />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
