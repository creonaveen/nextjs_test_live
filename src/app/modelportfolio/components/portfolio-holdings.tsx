import { Badge } from 'investtech/external-components';
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
import {
  ModelPortfolio,
  PortfolioReturnItem,
  TableColumnDefinition,
} from '@/lib/types/model-portfolio';
import { getBadgeVariant } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';

import { PortfolioHoldingsTable } from './portfolio-holdings-table';

interface PortfolioHoldingsProps {
  data: ModelPortfolio;
  isLoading: boolean;
}

const TITLE_CLASSES = 'text-grey-900 dark:text-grey-200 pb-4 text-lg font-semibold mb-4';
const TABLE_HEAD_CLASS = 'table-cell lg:min-w-[80px] cursor-default';
const TABLE_CELL_CLASS = 'table-cell numeric-table-cell text-right lg:min-w-[80px]';

/* -------------------- Header Row -------------------- */

function ReturnHeaderRow({ columns }: { columns: TableColumnDefinition[] }) {
  return (
    <TableHeader>
      <TableRow showHover={false}>
        {columns.map((col, index) => {
          const align = index === 0 ? 'text-left' : 'text-right';
          const justify = index === 0 ? 'justify-start' : 'justify-end';

          return (
            <TableHead
              key={col.key}
              id={`modelportfolio-return-table-head-${index + 1}`}
              className={`${TABLE_HEAD_CLASS} ${align}`}
            >
              <div className={`column-header ${justify} whitespace-nowrap`}>
                <span>{col.column_name || ''}</span>
              </div>
            </TableHead>
          );
        })}
      </TableRow>
    </TableHeader>
  );
}

/* -------------------- Empty State -------------------- */

function ReturnEmptyState() {
  const e = useTranslations('errors');

  return (
    <TableBody>
      <TableRow showHover={false}>
        <TableCell colSpan={2} className="text-grey-500 py-4 text-center">
          {e('noData')}
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

/* -------------------- Data Row -------------------- */

function ReturnDataRow({ item, index }: { item: PortfolioReturnItem; index: number }) {
  const value = item?.profit_loss_percent?.value;
  const variant = getBadgeVariant(item?.profit_loss_percent?.sign);

  return (
    <TableRow showHover={false} id={`modelportfolio-return-table-row-${index + 1}`}>
      <TableCell className="table-cell text-left" id={`modelportfolio-return-name-${index + 1}`}>
        {item?.name}
      </TableCell>

      <TableCell
        className={TABLE_CELL_CLASS}
        id={`modelportfolio-profit-loss-percent-${index + 1}`}
      >
        <Badge
          size="small"
          variant={variant}
          className="numeric-table-cell"
          id={`modelportfolio-profit-loss-percent-badge-${index + 1}`}
        >
          {value ? <RenderHTML html={String(value)} /> : <span>-</span>}
        </Badge>
      </TableCell>
    </TableRow>
  );
}

/* -------------------- Table Body -------------------- */

function ReturnTableBody({ content }: { content: PortfolioReturnItem[] }) {
  if (!content.length) {
    return <ReturnEmptyState />;
  }

  return (
    <TableBody>
      {content.map((item, index) => (
        <ReturnDataRow key={index} item={item} index={index} />
      ))}
    </TableBody>
  );
}

/* -------------------- Portfolio Return Card -------------------- */

function PortfolioReturnCard({ data }: { data: ModelPortfolio }) {
  const content = data?.portfolio_return?.content ?? [];
  const columns = data?.portfolio_return?.table_definition ?? [];
  const heading = data?.headers?.return_port_and_idx;

  return (
    <Card className="flex h-full flex-col" id="modelportfolio-return-card">
      <CardContent className="flex-1">
        <div className={TITLE_CLASSES} id="modelportfolio-return-heading">
          {heading}
        </div>

        <Table className="w-full table-auto">
          <ReturnHeaderRow columns={columns} />
          <ReturnTableBody content={content} />
        </Table>
      </CardContent>
    </Card>
  );
}

/* -------------------- Loading Card -------------------- */

function PortfolioReturnLoading() {
  const c = useTranslations('common');

  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center gap-2">
        <div className="border-grey-400 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
        <span className="text-sm font-medium">{c('loading')}...</span>
      </div>
    </Card>
  );
}

/* -------------------- Comment Card -------------------- */

function PortfolioCommentCard({ data, isLoading }: { data: ModelPortfolio; isLoading: boolean }) {
  const t = useTranslations('modelPortfolio');
  const generalText = data?.portfolio_comments?.general_text ?? [];

  if (isLoading) return <PortfolioReturnLoading />;

  return (
    <Card className="flex h-full flex-col" id="comment-and-analysis-card">
      <CardContent>
        <div className="flex flex-col gap-2">
          <span className={TITLE_CLASSES}>{t('commentAndAnalysis')}</span>

          <span className="text-sm font-light break-words">
            {generalText.map((block, index) => {
              if (block.type === 'text') {
                return <span key={index}>{block.text && <RenderHTML html={block.text} />}</span>;
              }

              if (block.type === 'link') {
                return (
                  <Link
                    key={index}
                    href={block.href || '#'}
                    className="text-primary hover:text-primary/80 underline"
                  >
                    {block.anchor_text}
                  </Link>
                );
              }

              return null;
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------- Main Component -------------------- */

export default function PortfolioHoldings({ data, isLoading }: PortfolioHoldingsProps) {
  return (
    <div className="flex flex-col space-y-3 lg:flex-row lg:space-y-0 lg:space-x-3">
      <div className="w-full rounded-sm lg:w-3/4">
        <PortfolioHoldingsTable data={data} isLoading={isLoading} />
      </div>

      <div className="flex flex-row items-stretch gap-4 lg:w-1/4 lg:flex-col">
        <div className="w-full flex-1 rounded-sm sm:w-1/2 lg:w-full">
          {isLoading ? <PortfolioReturnLoading /> : <PortfolioReturnCard data={data} />}
        </div>

        <div className="hidden w-full flex-1 rounded-sm sm:block sm:w-1/2 lg:hidden">
          <PortfolioCommentCard data={data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
