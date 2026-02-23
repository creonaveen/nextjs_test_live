'use client';

import { Badge } from 'investtech/external-components';
import { Card, CardContent } from 'investtech/external-components';
import { Link } from '@/components/link';
import * as React from 'react';

import { TooltipOrSheet } from '@/components/custom-components/tooltip-or-sheet';
import type { LabelsAndTexts, Price, Sectors, StaticInfo } from '@/lib/types/shared-components';

import { PriceColumn } from './tech-analysis-header-price-column';
import {
  FLEX_COLUMN_GAP_2,
  LABEL_CLASSES,
  PRIMARY_TEXT_CLASSES,
} from './tech-analysis-header-utils';

export interface PriceCardProps {
  price: Price;
  static_info: StaticInfo;
  sectors: Sectors;
  labelAndTexts: LabelsAndTexts;
}

function SectorBadges({
  sectors,
  labelAndTexts,
  visibilityClass,
}: {
  sectors: Sectors;
  labelAndTexts: LabelsAndTexts;
  visibilityClass: string;
}) {
  const hasSectors = sectors.sector?.name || sectors.group?.name || sectors.industry?.name;
  if (!hasSectors) return null;

  const items = [
    { key: 'sector', data: sectors.sector },
    { key: 'group', data: sectors.group },
    { key: 'industry', data: sectors.industry },
  ].filter(({ data }) => data?.name && data.name.trim() !== '');

  return (
    <div className={`${FLEX_COLUMN_GAP_2} ${visibilityClass}`}>
      <p className={`${LABEL_CLASSES} uppercase`} id="tech-analysis-header-sector-label">
        {labelAndTexts.sector ?? ''}
      </p>
      {items.map(({ key, data }) => (
        <Badge
          key={key}
          variant="neutral"
          className="break-words whitespace-normal"
          title={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${data.name}`}
          id="tech-analysis-header-sector-badge"
        >
          {data.name}
        </Badge>
      ))}
    </div>
  );
}

function TooltipMainContent({
  static_info,
  labelAndTexts,
}: {
  static_info: StaticInfo;
  labelAndTexts: LabelsAndTexts;
}) {
  return (
    <div className="flex flex-col gap-2">
      {static_info.description && (
        <>
          <p
            className="text-grey-400 dark:text-grey-700 text-[10px] font-semibold tracking-wide uppercase"
            id="tech-analysis-header-about-company-label"
          >
            {labelAndTexts.about_company}
          </p>
          <p
            className="text-xs leading-relaxed font-normal"
            id="tech-analysis-header-about-company-description"
          >
            {static_info.description}
          </p>
          <div className="flex items-center" id="tech-analysis-header-company-link">
            <Link
              href={`https://${static_info.company_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-primary-active text-primary-hover hover:text-primary dark:active:text-primary-text-active text-sm font-normal underline dark:font-medium"
            >
              {static_info.company_url}
            </Link>
          </div>
        </>
      )}
      <p className={PRIMARY_TEXT_CLASSES} id="tech-analysis-header-source-label">
        {static_info.source && `${labelAndTexts.source ?? ''}: ${static_info.source ?? ''}`}
      </p>
    </div>
  );
}

function AboutCompanyTooltipContent({
  static_info,
  sectors,
  labelAndTexts,
}: {
  static_info: StaticInfo;
  sectors: Sectors;
  labelAndTexts: LabelsAndTexts;
}) {
  const hasSectors = sectors.sector?.name || sectors.group?.name || sectors.industry?.name;

  return (
    <>
      <TooltipMainContent static_info={static_info} labelAndTexts={labelAndTexts} />
      {hasSectors && (
        <SectorBadges sectors={sectors} labelAndTexts={labelAndTexts} visibilityClass="lg:hidden" />
      )}
    </>
  );
}

const AboutCompanyTrigger = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & { static_info: StaticInfo }
>(function AboutCompanyTrigger({ static_info, ...rest }, ref) {
  const clipLen = static_info?.description_suggested_clip_length ?? 0;
  const desc = static_info?.description ?? '';
  const text = desc.length > clipLen ? desc.substring(0, clipLen) + '...' : desc;
  return (
    <div
      ref={ref}
      className={`cursor-pointer text-xs leading-relaxed tracking-wide ${PRIMARY_TEXT_CLASSES}`}
      id="tech-analysis-header-about-company-trigger"
      {...rest}
    >
      {text}
    </div>
  );
});

function CompanyLinkAndSource({
  static_info,
  labelAndTexts,
}: {
  static_info: StaticInfo;
  labelAndTexts: LabelsAndTexts;
}) {
  return (
    <>
      <div className="flex items-center" id="tech-analysis-header-company-link">
        {static_info.company_url && (
          <Link
            href={`https://${static_info.company_url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-sm underline"
          >
            {static_info.company_url}
          </Link>
        )}
      </div>
      <p className={`${PRIMARY_TEXT_CLASSES} text-xs`} id="tech-analysis-header-source-label">
        {static_info.source ? `${labelAndTexts.source ?? ''}: ${static_info.source}` : ''}
      </p>
    </>
  );
}

function AboutCompanyColumn({
  static_info,
  sectors,
  labelAndTexts,
}: {
  static_info: StaticInfo;
  sectors: Sectors;
  labelAndTexts: LabelsAndTexts;
}) {
  return (
    <div className={`${FLEX_COLUMN_GAP_2} col-span-2 hidden max-w-[318px] md:flex`}>
      <p className={LABEL_CLASSES} id="tech-analysis-header-about-company-label">
        {labelAndTexts.about_company ?? ''}
      </p>
      <TooltipOrSheet
        id="tech-analysis-header-about-company-tooltip"
        text={
          <AboutCompanyTooltipContent
            static_info={static_info}
            sectors={sectors}
            labelAndTexts={labelAndTexts}
          />
        }
        triggerElement={<AboutCompanyTrigger static_info={static_info} />}
      />
      <CompanyLinkAndSource static_info={static_info} labelAndTexts={labelAndTexts} />
    </div>
  );
}

export const PriceAndCompanyCard = React.memo(function PriceAndCompanyCard({
  price,
  static_info,
  sectors,
  labelAndTexts,
}: PriceCardProps) {
  const sectorVisibility = static_info?.description ? 'lg:flex' : 'md:flex';

  return (
    <Card className="md:bg-card col-span-1 rounded-xl bg-transparent p-0 md:col-span-2 md:p-3 md:px-5 md:pt-5 md:pb-8">
      <CardContent className="grid grid-cols-1 justify-between gap-2 px-0 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        <PriceColumn price={price} labelAndTexts={labelAndTexts} />
        {static_info?.description && (
          <AboutCompanyColumn
            static_info={static_info}
            sectors={sectors}
            labelAndTexts={labelAndTexts}
          />
        )}
        <SectorBadges
          sectors={sectors}
          labelAndTexts={labelAndTexts}
          visibilityClass={`hidden ${sectorVisibility}`}
        />
      </CardContent>
    </Card>
  );
});
