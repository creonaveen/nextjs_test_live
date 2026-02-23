'use client';

import * as React from 'react';

import type {
  LabelsAndTexts,
  Price,
  Recommendation,
  Risk,
  Sectors,
  StaticInfo,
} from '@/lib/types/shared-components';

import { PriceAndCompanyCard } from './tech-analysis-header-price-card';
import { InvesttechScoreCard } from './tech-analysis-header-score-card';
import { getRiskCardBackgroundClasses, getRiskCardClasses } from './tech-analysis-header-utils';

/**
 * Props for TechAnalysisHeader component
 */
export interface TechAnalysisHeaderProps {
  /** Price information including close price and date */
  price: Price;
  /** Static company information including description and URL */
  static_info: StaticInfo;
  /** Sector classification (sector, group, industry) */
  sectors: Sectors;
  /** Investment recommendation and evaluation */
  recommendation: Recommendation;
  /** Optional factor diagram thumbnail SVG */
  factor_diagram_thumb?: string;
  /** Risk assessment information */
  risk: Risk;
  /** Labels and text content for internationalization */
  labelAndTexts: LabelsAndTexts;
  /** Extra CSS classes */
  extraClasses?: string;
}

/**
 * TechAnalysisHeader - Reusable technical analysis header component.
 * Displays price, company info, sectors, and Investtech score in a responsive grid.
 */
export const TechAnalysisHeader = React.memo(function TechAnalysisHeader({
  price,
  static_info,
  sectors,
  recommendation,
  factor_diagram_thumb,
  risk,
  labelAndTexts,
  extraClasses,
}: TechAnalysisHeaderProps) {
  const riskCardClasses = getRiskCardClasses(risk, recommendation);
  const riskCardBackgroundClasses = getRiskCardBackgroundClasses(risk, recommendation);

  const scoreCard = (
    <InvesttechScoreCard
      risk={risk}
      recommendation={recommendation}
      factor_diagram_thumb={factor_diagram_thumb}
      labelAndTexts={labelAndTexts}
      riskCardClasses={riskCardClasses}
      riskCardBackgroundClasses={riskCardBackgroundClasses}
    />
  );

  return (
    <div
      className={`mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-3 md:gap-6 ${extraClasses ?? ''}`}
    >
      <PriceAndCompanyCard
        price={price}
        static_info={static_info}
        sectors={sectors}
        labelAndTexts={labelAndTexts}
      />
      {scoreCard}
    </div>
  );
});
