'use client';

import { Button } from 'investtech/external-components';
import { Card, CardContent } from 'investtech/external-components';
import { Table, TableBody, TableCell, TableRow } from 'investtech/external-components';
import { HelpCircle } from 'lucide-react';
import { Link } from '@/components/link';
import React from 'react';

import { TooltipOrSheet } from '@/components/custom-components/tooltip-or-sheet';
import { BadgeWithTooltip, SeeMoreButton, STYLE_CLASSES } from './home-card-primitives';
import { TextTagWithArrowIcon } from '@/utils/common-functions';
import { Watchlist } from '@/lib/types/home';

interface WatchlistCardProps {
  data: Watchlist;
  title: string;
  onWatchlistNavigate: () => void;
}

const hasTableData = (data: Watchlist) => data.table_data && data.table_data?.data?.length > 0;

function WatchlistHeader({
  data,
  title,
  showBadge,
}: {
  data: Watchlist;
  title: string;
  showBadge: boolean;
}) {
  if (showBadge) {
    return (
      <div className="space-y-1">
        <BadgeWithTooltip
          label={data.label!}
          help_text={data.help_text}
          testId="watchlist-tooltip-trigger"
        />
        <h2 className={STYLE_CLASSES.title} id="watchlist-heading">
          {title}
        </h2>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between">
      <h2 className={STYLE_CLASSES.title} id="watchlist-heading">
        {title}
      </h2>
      {data.help_text && (
        <TooltipOrSheet
          id="watchlist-tooltip"
          text={data.help_text}
          triggerElement={
            <HelpCircle
              size={18}
              className="text-grey-400 hover:text-grey-600 dark:hover:text-grey-300 transition-colors"
              aria-label="Help information"
              id="watchlist-tooltip-trigger"
            />
          }
        />
      )}
    </div>
  );
}

function WatchlistEmptyContent({
  data,
  onWatchlistNavigate,
}: {
  data: Watchlist;
  onWatchlistNavigate: () => void;
}) {
  return (
    <>
      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-1 text-start">
          <h3 className={STYLE_CLASSES.heading} id="watchlist-caption-title">
            {data.caption_title}
          </h3>
          <p className={STYLE_CLASSES.caption} id="watchlist-caption-text">
            {data.caption_description}
          </p>
        </div>
      </div>
      {data.see_more?.text && (
        <Button
          variant="accentRound"
          className="w-fit"
          onClick={onWatchlistNavigate}
          aria-label="Go to watchlist"
          id="create-new-watchlist-button"
        >
          {data.see_more.text}
        </Button>
      )}
    </>
  );
}

function WatchlistTableContent({ data }: { data: Watchlist }) {
  const rows = data.table_data?.data ?? [];
  if (rows.length === 0) return null;

  return (
    <div className="flex-1">
      <Table>
        <TableBody>
          {rows.map((item, index) => (
            <TableRow
              key={`${item.company.id}-${index}`}
              showHover={false}
              id={`watchlist-table-row-${index + 1}`}
            >
              <TableCell
                className={`${STYLE_CLASSES.tableCell} ${STYLE_CLASSES.companyInfo}`}
                id={`watchlist-company-name-${index + 1}`}
              >
                <Link
                  href={`/company/${item.company.id}?market_id=${item.company.market_id ?? ''}`}
                  className="whitespace-nowrap"
                  aria-label={`View ${item.company.name ?? 'company'} details`}
                >
                  {item.company.name ?? '-'}
                </Link>
              </TableCell>
              <TableCell
                className={`${STYLE_CLASSES.tableCell} numeric-table-cell text-right`}
                id={`watchlist-score-${index + 1}`}
              >
                <TextTagWithArrowIcon
                  content={item.score_arrow.score.toString()}
                  icon={item.score_arrow.arrow.icon}
                  color={item.score_arrow.arrow.color}
                  className="font-medium"
                  testId={`watchlist-score-${index + 1}`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function WatchlistCardContent({
  data,
  isEmpty,
  title,
  showBadgeHeader,
  onWatchlistNavigate,
}: {
  data: Watchlist;
  isEmpty: boolean;
  title: string;
  showBadgeHeader: boolean;
  onWatchlistNavigate: () => void;
}) {
  return (
    <CardContent className={STYLE_CLASSES.cardContent}>
      <div>
        <WatchlistHeader data={data} title={title} showBadge={showBadgeHeader ?? false} />
      </div>
      {isEmpty ? (
        <WatchlistEmptyContent data={data} onWatchlistNavigate={onWatchlistNavigate} />
      ) : (
        <>
          <WatchlistTableContent data={data} />
          {data.see_more?.text && (
            <SeeMoreButton
              text={data.see_more.text}
              href="/watchlist"
              testId="watchlist-read-more"
            />
          )}
        </>
      )}
    </CardContent>
  );
}

export const WatchlistCard = React.memo(function WatchlistCard({
  data,
  title,
  onWatchlistNavigate,
}: WatchlistCardProps) {
  const showBadgeHeader = data.label && hasTableData(data);
  const isEmpty =
    (!data.table_data || data.table_data?.data?.length === 0) &&
    Boolean(data.caption_title && data.caption_description);

  return (
    <Card className="p-5" id="watchlist-card">
      <WatchlistCardContent
        data={data}
        isEmpty={isEmpty}
        title={title}
        showBadgeHeader={showBadgeHeader ?? false}
        onWatchlistNavigate={onWatchlistNavigate}
      />
    </Card>
  );
});
