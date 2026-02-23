'use client';

import { Card, CardContent } from 'investtech/external-components';
import { Table, TableBody, TableCell, TableRow } from 'investtech/external-components';
import { Link } from '@/components/link';
import React from 'react';

import {
  BadgeWithTooltip,
  BadgeVariant,
  SeeMoreButton,
  STYLE_CLASSES,
} from './home-card-primitives';
import { Top50 } from '@/lib/types/home';

interface Top50CardProps {
  data: Top50;
  title: string;
}

function Top50Table({ data }: { data: Top50 }) {
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
              id={`top50-table-row-${index + 1}`}
            >
              <TableCell
                className={`${STYLE_CLASSES.tableCell} pr-2 text-left`}
                id={`top50-row-number-${index + 1}`}
              >
                {index + 1}
              </TableCell>
              <TableCell
                className={`${STYLE_CLASSES.tableCell} ${STYLE_CLASSES.companyInfo}`}
                id={`top50-company-name-${index + 1}`}
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
                id={`top50-profit-loss-${index + 1}`}
              >
                <BadgeVariant
                  value={item.profit_loss_percent.value}
                  sign={item.profit_loss_percent.sign}
                  testId={`top50-profit-loss-badge-${index + 1}`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export const Top50Card = React.memo(function Top50Card({ data, title }: Top50CardProps) {
  return (
    <Card className="p-5" id="top50-card">
      <CardContent className={STYLE_CLASSES.cardContent}>
        <div className="space-y-1">
          <BadgeWithTooltip
            label={data.label}
            help_text={data.help_text}
            testId="top50-tooltip-trigger"
          />
          <h2 className={STYLE_CLASSES.title} id="top50-heading">
            {title}
          </h2>
        </div>
        <Top50Table data={data} />
        {data.see_more?.text && (
          <SeeMoreButton text={data.see_more.text} href="/top50" testId="top50-read-more" />
        )}
      </CardContent>
    </Card>
  );
});
