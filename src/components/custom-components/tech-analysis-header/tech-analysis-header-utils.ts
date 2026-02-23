import { getCompanyColorClass } from '@/lib/utils';

import type { Recommendation, Risk } from '@/lib/types/shared-components';

/** Shared class strings for tech-analysis-header subcomponents. */
export const LABEL_CLASSES =
  'text-grey-700 dark:text-grey-300 font-medium text-[10px] uppercase tracking-wide';
export const PRIMARY_TEXT_CLASSES = 'text-grey-800 dark:text-grey-50 font-normal tracking-wide';
export const FLEX_COLUMN_GAP_1 = 'flex flex-col gap-1';
export const FLEX_COLUMN_GAP_2 = 'flex flex-col gap-2';
export const FLEX_COLUMN_GAP_4 = 'flex flex-col gap-4';

function getRecommendationColorKey(
  risk: Risk,
  recommendation: Recommendation,
  forText: boolean
): string {
  if (risk.total.level === 'Extreme') return 'sell';
  if (recommendation.investtech?.color) return recommendation.investtech.color;
  if (recommendation.analyst?.color) return recommendation.analyst.color;
  return forText ? 'neutral' : '';
}

export function getRiskCardClasses(risk: Risk, recommendation: Recommendation): string {
  const colorKey = getRecommendationColorKey(risk, recommendation, true);
  return `font-headline text-[24px] sm:text-[32px] leading-none font-normal lg:text-[40px] lg:font-medium ${getCompanyColorClass(colorKey, 'text')}`;
}

export function getRiskCardBackgroundClasses(risk: Risk, recommendation: Recommendation): string {
  const colorKey = getRecommendationColorKey(risk, recommendation, false);
  return colorKey ? getCompanyColorClass(colorKey, 'background') : '';
}
