'use client';

import { useMemo } from 'react';

import { useMarketId } from '@/lib/hooks/use-market-id';
import { NavbarMenuItem } from '@/lib/types/navbar';

export const myPagesComponents: NavbarMenuItem[] = [
  {
    title: 'watchlist',
    href: '/watchlist',
  },
  {
    title: 'myNotes',
    href: '/mynotes',
  },
];

export const marketComponents: NavbarMenuItem[] = [
  {
    title: 'stocks',
    href: '/stocks',
  },
  {
    title: 'indices',
    href: '/indices',
  },
  {
    title: 'marketCommentary',
    href: '/marketcommentary',
  },
];

export const recommendationsComponents: NavbarMenuItem[] = [
  {
    title: 'todaysCase',
    href: '/todayscase',
  },
  {
    title: 'modelPortfolio',
    href: '/modelportfolio',
  },
];

export const stockPickingComponents: NavbarMenuItem[] = [
  {
    title: 'top50',
    href: '/top50',
  },
];

export const researchAndLearnComponents: NavbarMenuItem[] = [
  {
    title: 'userTips',
    href: '/research',
    subItems: [
      { title: 'stockSchool', href: '/docs/stockSchool' },
      { title: 'theMostCommonMistakesInvestorsMake', href: '/docs/h2_commonMistakes' },
      { title: 'advantagesYouHaveAsASmallSaver', href: '/docs/userTipsSmallInvestor' },
      { title: 'userTipsFromInvesttechAnalysts', href: '/docs/h2_analystsTips' },
    ],
  },
  {
    title: 'investtechResearch',
    href: '/help',
    subItems: [
      { title: 'aboutInvesttechResearch', href: '/docs/h2_ResearchMain' },
      { title: 'trends', href: '/docs/helpResearchTrend' },
      { title: 'supportAndResistance', href: '/docs/helpResearchSupportAndResistance' },
      { title: 'pricePatterns', href: '/docs/helpResearchFormations' },
      { title: 'volume', href: '/docs/helpResearchVolume' },
      { title: 'momentumAndRSI', href: '/docs/helpResearchMomentumAndRsi' },
      { title: 'insiderTrades', href: '/docs/helpResearchInsider' },
      { title: 'others', href: '/docs/helpResearchMore' },
    ],
  },
  {
    title: 'aboutTheAnalyses',
    href: '/docs/h2_aboutAnalyses',
  },
  {
    title: 'aboutInvesttech',
    href: '/docs/h2partner_aboutUs',
  },
];

export const navSections = [
  {
    value: 'myPages',
    label: 'myPages',
    items: myPagesComponents,
  },
  {
    value: 'market',
    label: 'market',
    items: marketComponents,
  },
  {
    value: 'recommendations',
    label: 'recommendations',
    items: recommendationsComponents,
  },
  {
    value: 'stockPicking',
    label: 'stockPicking',
    items: stockPickingComponents,
  },
  {
    value: 'researchAndLearn',
    label: 'researchAndLearn',
    items: researchAndLearnComponents,
  },
];

/**
 * Hook to get navigation sections filtered based on current market ID
 * Hides "Today's Case" and "Model Portfolio" when market_id is 452 (Denmark)
 */
export function useNavSections() {
  const marketId = useMarketId();

  return useMemo(() => {
    // For market_id 452 (Denmark), filter out todaysCase and modelPortfolio
    if (marketId === '452') {
      return navSections
        .map((section) => {
          if (section.value === 'recommendations') {
            return {
              ...section,
              items: section.items.filter(
                (item) => item.title !== 'todaysCase' && item.title !== 'modelPortfolio'
              ),
            };
          }
          return section;
        })
        .filter((section) => section.items.length > 0); // Remove sections with no items
    }

    return navSections;
  }, [marketId]);
}
