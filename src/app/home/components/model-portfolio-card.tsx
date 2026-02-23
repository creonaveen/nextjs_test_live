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
import { ModelPortfolio } from '@/lib/types/home';

interface ModelPortfolioCardProps {
  data: ModelPortfolio;
  title: string;
}

function ModelPortfolioTable({ data }: { data: ModelPortfolio }) {
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
              id={`modelportfolio-table-row-${index + 1}`}
            >
              <TableCell
                className={`${STYLE_CLASSES.tableCell} ${STYLE_CLASSES.companyInfo}`}
                id={`modelportfolio-company-name-${index + 1}`}
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
                id={`modelportfolio-profit-loss-${index + 1}`}
              >
                <BadgeVariant
                  value={item.profit_loss_percent.value}
                  sign={item.profit_loss_percent.sign}
                  testId={`modelportfolio-profit-loss-badge-${index + 1}`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export const ModelPortfolioCard = React.memo(function ModelPortfolioCard({
  data,
  title,
}: ModelPortfolioCardProps) {
  return (
    <Card className="p-5" id="modelportfolio-card">
      <CardContent className={STYLE_CLASSES.cardContent}>
        <div className="space-y-1">
          <BadgeWithTooltip
            label={data.label}
            help_text={data.help_text}
            testId="modelportfolio-tooltip-trigger"
          />
          <h2 className={STYLE_CLASSES.title} id="modelportfolio-heading">
            {title}
          </h2>
        </div>
        <ModelPortfolioTable data={data} />
        {data.see_more?.text && (
          <SeeMoreButton
            text={data.see_more.text}
            href="/modelportfolio"
            testId="modelportfolio-read-more"
          />
        )}
      </CardContent>
    </Card>
  );
});
