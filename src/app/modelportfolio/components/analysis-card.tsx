import { Card } from 'investtech/external-components';
import React from 'react';

import { Analysis } from '@/lib/types/model-portfolio';

import {
  AnalysisCardBody,
  AnalysisCardHeader,
  getAnalysisCardHeaderProps,
} from './analysis-card-content';

export type { RenderSvgFn } from './analysis-card-content';

export interface AnalysisCardProps {
  analysis: Analysis;
  index: number;
  analystRecommendationTitle: string;
  onCardClick: (companyId: number) => void;
  onCardKeyDown: (e: React.KeyboardEvent, companyId: number) => void;
  buttonClasses: string;
  colViewClasses: string;
  renderSvg: (
    index: number,
    analysis: Analysis,
    alt: string,
    className?: string
  ) => React.ReactNode;
  readMoreLabel: string;
  riskLabel: string;
}

function getNewlyTradedBorderClass(newlyTraded: number): string {
  if (newlyTraded === 1) return 'border-success-background dark:border-success-background border-4';
  if (newlyTraded === -1) return 'border-error-background dark:border-error-background border-4';
  return '';
}

export function AnalysisCard({
  analysis,
  index,
  analystRecommendationTitle,
  onCardClick,
  onCardKeyDown,
  buttonClasses,
  colViewClasses,
  renderSvg,
  readMoreLabel,
  riskLabel,
}: AnalysisCardProps) {
  const borderClass = getNewlyTradedBorderClass(analysis?.newly_traded ?? 0);
  const baseClass =
    'border-grey-100 dark:border-grey-700 h-full cursor-pointer border px-4 py-0 pt-4 pb-8 transition-colors';

  const headerProps = getAnalysisCardHeaderProps(analysis);

  return (
    <Card
      id={`comment-and-analysis-card-${index + 1}`}
      onClick={() => analysis?.company_id && onCardClick(analysis.company_id)}
      role="button"
      tabIndex={0}
      aria-label={`View analysis for ${analysis.company_name || 'company'}`}
      onKeyDown={(e) => analysis?.company_id && onCardKeyDown(e, analysis.company_id)}
      className={`${baseClass} ${borderClass}`}
    >
      <AnalysisCardHeader
        index={index}
        analystRecommendationTitle={analystRecommendationTitle}
        {...headerProps}
      />
      <AnalysisCardBody
        analysis={analysis}
        index={index}
        colViewClasses={colViewClasses}
        buttonClasses={buttonClasses}
        renderSvg={renderSvg}
        readMoreLabel={readMoreLabel}
        riskLabel={riskLabel}
      />
    </Card>
  );
}
