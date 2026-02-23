import { Badge } from 'investtech/external-components';
import { Button } from 'investtech/external-components';
import { CardContent } from 'investtech/external-components';
import Image from 'next/image';
import { Link } from '@/components/link';
import React from 'react';

import { TooltipOrSheet } from '@/components/custom-components/tooltip-or-sheet';
import { Analysis, TextBlock } from '@/lib/types/model-portfolio';
import { getBadgeVariant } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';

export type RenderSvgFn = (
  index: number,
  analysis: Analysis,
  alt: string,
  className?: string
) => React.ReactNode;

export function getNewlyTradedBadgeClass(newlyTraded: number): string {
  return newlyTraded === 1
    ? 'bg-success-background text-success-text'
    : 'bg-error-background text-error-text';
}

const TOOLTIP_IMAGE = (
  <Image
    src="circle_question_mark.svg"
    alt="More information about analyst recommendation"
    width={16}
    height={16}
    onClick={(e) => e.stopPropagation()}
    className="cursor-pointer"
    role="button"
    tabIndex={0}
    aria-label="Show analyst recommendation details"
  />
);

function isNewlyTradedBadgeVisible(newlyTraded: number): boolean {
  return newlyTraded === 1 || newlyTraded === -1;
}

export interface AnalysisCardHeaderProps {
  index: number;
  analystRecommendationTitle: string;
  tooltipTitle: string;
  tooltipText: string;
  showBadge: boolean;
  badgeClass: string;
  extraHeaderText: string;
}

export function AnalysisCardHeader({
  index,
  analystRecommendationTitle,
  tooltipTitle,
  tooltipText,
  showBadge,
  badgeClass,
  extraHeaderText,
}: AnalysisCardHeaderProps) {
  const tooltipId = `comment-and-analysis-card-tooltip-${index + 1}`;
  const badgeId = `comment-and-analysis-card-${index + 1}-newly-traded-badge`;

  return (
    <div className="border-grey-200 flex items-center justify-between border-b pb-3">
      <div className="flex items-center gap-2">
        <span
          className="text-grey-700 dark:text-grey-300 truncate text-[10px] font-medium uppercase"
          aria-label="Analyst recommendation"
          id="analyst-recommendation-title"
        >
          {analystRecommendationTitle}
        </span>
        <TooltipOrSheet
          id={tooltipId}
          title={tooltipTitle}
          text={tooltipText}
          triggerElement={TOOLTIP_IMAGE}
        />
      </div>
      {showBadge && (
        <span className={`badge ${badgeClass}`} id={badgeId}>
          {extraHeaderText}
        </span>
      )}
    </div>
  );
}

function getTooltipContent(analysis: Analysis): { tooltipTitle: string; tooltipText: string } {
  const popup = analysis?.badge?.popup;
  return {
    tooltipTitle: popup?.title ?? '',
    tooltipText: popup?.text ?? '',
  };
}

function getBadgeContent(analysis: Analysis): {
  showBadge: boolean;
  badgeClass: string;
  extraHeaderText: string;
} {
  const newlyTraded = analysis?.newly_traded ?? 0;
  return {
    showBadge: isNewlyTradedBadgeVisible(newlyTraded),
    badgeClass: getNewlyTradedBadgeClass(newlyTraded),
    extraHeaderText: analysis?.extra_header?.text ?? '',
  };
}

export function getAnalysisCardHeaderProps(
  analysis: Analysis
): Omit<AnalysisCardHeaderProps, 'index' | 'analystRecommendationTitle'> {
  return { ...getTooltipContent(analysis), ...getBadgeContent(analysis) };
}

export function AnalysisCardCompanyRow({
  analysis,
  index,
  colViewClasses,
  riskLabel,
}: {
  analysis: Analysis;
  index: number;
  colViewClasses: string;
  riskLabel: string;
}) {
  const cardId = `comment-and-analysis-card-${index + 1}`;
  const badge = analysis?.badge;
  const badgeVariant = getBadgeVariant(badge?.sign);
  const riskVariant = getBadgeVariant(badge?.risk_level?.sign);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className={colViewClasses}>
        <span
          className="text-grey-900 dark:text-grey-200 max-w-[180px] truncate text-base font-semibold break-words lg:max-w-[120px] xl:max-w-none"
          id={`${cardId}-company-name`}
        >
          {analysis.company_name}
        </span>
        <span className="text-grey-700 dark:text-grey-300 text-xs" id={`${cardId}-ticker`}>
          {analysis?.ticker}
        </span>
      </div>
      <div className="flex flex-1 justify-between gap-2 md:justify-end">
        <Badge
          size="big"
          variant={badgeVariant}
          className="rounded-md px-5 py-3"
          id={`${cardId}-badge`}
        >
          {badge?.text}
        </Badge>
        <Badge
          size="big"
          variant={riskVariant}
          className="rounded-md px-5 py-3"
          id={`${cardId}-risk-badge`}
        >
          {riskLabel}:{badge?.risk_level?.text}
        </Badge>
      </div>
    </div>
  );
}

export function AnalysisCardPriceRow({ analysis, index }: { analysis: Analysis; index: number }) {
  const cardId = `comment-and-analysis-card-${index + 1}`;
  const value = analysis?.profit_loss_percent?.value ?? '-';
  const sign = analysis?.profit_loss_percent?.sign ?? 0;

  return (
    <div className="flex flex-col items-end justify-end gap-1">
      <span className="text-grey-700 dark:text-grey-300 text-[10px]" id={`${cardId}-price-label`}>
        {analysis?.price_label}
      </span>
      <div className="flex flex-1 items-center gap-2">
        <span
          className="text-grey-800 dark:text-grey-200 numeric-table-cell text-sm font-normal"
          id={`${cardId}-close`}
        >
          {analysis?.close}
        </span>
        <Badge
          size="small"
          variant={getBadgeVariant(sign)}
          className="numeric-table-cell"
          id={`${cardId}-profit-loss-percent-badge`}
        >
          {value}
        </Badge>
      </div>
    </div>
  );
}

export function AnalysisCardTextBlock({
  analysis,
  index,
  buttonClasses,
  readMoreLabel,
}: {
  analysis: Analysis;
  index: number;
  buttonClasses: string;
  readMoreLabel: string;
}) {
  const cardId = `comment-and-analysis-card-${index + 1}`;
  const html = analysis.text?.map((text: TextBlock) => text.text).join(' ') ?? '';

  return (
    <div className="flex flex-col gap-2">
      <p className="text-foreground text-sm" id={`${cardId}-text`}>
        {analysis.text && <RenderHTML html={html} />}
        <Link href={`/company/${analysis?.company_id}`} className="whitespace-nowrap">
          <Button variant="link" className={`${buttonClasses} ml-1`} id={`${cardId}-read-more`}>
            {readMoreLabel}
          </Button>
        </Link>
      </p>
      {analysis?.own_stocks && (
        <span className="text-foreground text-sm italic" id={`${cardId}-own-stocks`}>
          <RenderHTML html={analysis.own_stocks} />{' '}
        </span>
      )}
    </div>
  );
}

export function AnalysisCardBody({
  analysis,
  index,
  colViewClasses,
  buttonClasses,
  renderSvg,
  readMoreLabel,
  riskLabel,
}: {
  analysis: Analysis;
  index: number;
  colViewClasses: string;
  buttonClasses: string;
  renderSvg: RenderSvgFn;
  readMoreLabel: string;
  riskLabel: string;
}) {
  return (
    <CardContent className={`${colViewClasses} gap-2 px-0 py-4`}>
      <AnalysisCardCompanyRow
        analysis={analysis}
        index={index}
        colViewClasses={colViewClasses}
        riskLabel={riskLabel}
      />
      <AnalysisCardPriceRow analysis={analysis} index={index} />
      {renderSvg(index, analysis, 'Comment and Analysis', 'py-8')}
      <AnalysisCardTextBlock
        analysis={analysis}
        index={index}
        buttonClasses={buttonClasses}
        readMoreLabel={readMoreLabel}
      />
    </CardContent>
  );
}
