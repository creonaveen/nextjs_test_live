'use client';

import { TechAnalysisHeader } from '@/components/custom-components/tech-analysis-header/tech-analysis-header';
import {
  LabelsAndTexts,
  Price,
  Recommendation,
  Risk,
  Sectors,
  StaticInfo,
} from '@/lib/types/shared-components';

/**
 * Demo component for the TechAnalysisHeader component.
 * Shows how to use the technical analysis header with company data.
 *
 * @returns A demo of the TechAnalysisHeader component
 */
export function TechAnalysisHeaderDemo() {
  // Sample price data
  const samplePrice: Price = {
    close: '125.50',
    profit_loss_percent: {
      sign: 1,
      value: '+5.2%',
      is_badge: true,
    },
    price_date: '2024-01-15',
    price_date_long: 'January 15, 2024',
  };

  // Sample static info
  const sampleStaticInfo: StaticInfo = {
    about_header_text: 'About the Company',
    description:
      'A leading technology company specializing in cloud computing, artificial intelligence, and enterprise software solutions. The company has been at the forefront of digital transformation for over two decades, serving millions of customers worldwide.',
    description_suggested_clip_length: 100,
    company_url: 'example.com',
    source: 'Company Website',
  };

  // Sample sectors
  const sampleSectors: Sectors = {
    sector: {
      id: '1',
      name: 'Technology',
      link: '/sector/technology',
    },
    group: {
      id: '2',
      name: 'Software',
      link: '/group/software',
    },
    industry: {
      id: '3',
      name: 'Enterprise Software',
      link: '/industry/enterprise-software',
    },
  };

  // Sample recommendation
  const sampleRecommendation: Recommendation = {
    type: 'investtech',
    free_version: 0,
    investtech: {
      score: '8',
      eval_code: 2,
      eval_text: 'Buy',
      color: 'buy',
      color_tailwind: 'text-green-600',
    },
  };

  // Sample risk data
  const sampleRisk: Risk = {
    calculated: true,
    liquidity: {
      text: 'Good',
      level: 'Low',
      score: 88,
    },
    volatility: {
      text: 'Low',
      level: 'Low',
      score: 85,
    },
    total: {
      icon: false,
      text_long: 'Low Risk',
      text_short: 'Low',
      level: 'Low',
      score: 86,
      color: 'green',
    },
  };

  // Sample labels and texts
  const sampleLabelsAndTexts: LabelsAndTexts = {
    close: 'Close',
    updated: 'Updated',
    about_company: 'About the Company',
    website: 'Website',
    source: 'Source',
    sector: 'Sector',
    recommendation: 'Recommendation',
    recommendation_card_help: [
      'Investtech recommendation is based on technical analysis.',
      'The score ranges from 1-9, where higher scores indicate stronger buy signals.',
    ],
  };

  // Sample factor diagram thumbnail SVG
  const sampleFactorDiagramThumb = `<div class="it_inlineChartTiny  w-[100px]"><!-- START.Element_FactorDiagram --><svg width="50" height="50"><defs>	<radialGradient id="fillFactorMostlyPositive50" cx="25" cy="25" r="18" gradientUnits="userSpaceOnUse">		<stop offset="0%" style="stop-color:#3fb145;stop-opacity:1"></stop>		<stop offset="100%" style="stop-color:#3fb145;stop-opacity:1"></stop>	</radialGradient></defs><ellipse class="ifgAxisTickCircles" cx="25" cy="25" rx="24" ry="24" style="stroke-width:1" /><ellipse  class="ifgAxisTickCircles" cx="25" cy="25" rx="15" ry="15" style="stroke-width:1" /><line x1="25" y1="25" x2="40" y2="5" style="stroke:rgb(180,180,180);stroke-width:1" /><line x1="25" y1="25" x2="10" y2="5" style="stroke:rgb(180,180,180);stroke-width:1" /><line x1="25" y1="25" x2="2" y2="33" style="stroke:rgb(180,180,180);stroke-width:1" /><line x1="25" y1="25" x2="25" y2="50" style="stroke:rgb(180,180,180);stroke-width:1" /><line x1="25" y1="25" x2="48" y2="33" style="stroke:rgb(180,180,180);stroke-width:1" /><path  d="M39,30 C41,24 41,13 36,9 C32,6 21,9 16,13 C11,17 9,24 11,30 C13,35 19,39 25,39 C31,39 37,35 39,30  Z" style="fill:url(#fillFactorMostlyPositive50);fill-opacity:0.85" /><path id="slice1" class="ifgTooltipSliceOpacityLight Technical901" d="M 48 25 A 24 24 0 0 1 32 47 L 25 25"  transform="rotate(-90,25,25)"></path><path id="slice2" class="ifgTooltipSliceOpacityLight Quantitative1622" d="M 48 25 A 24 24 0 0 1 32 47 L 25 25"  transform="rotate(-162,25,25)"></path><path id="slice3" class="ifgTooltipSliceOpacityLight Insider2343" d="M 48 25 A 24 24 0 0 1 32 47 L 25 25"  transform="rotate(-234,25,25)"></path><path id="slice4" class="ifgTooltipSliceOpacityLight Stability3064" d="M 48 25 A 24 24 0 0 1 32 47 L 25 25"  transform="rotate(-306,25,25)"></path><path id="slice5" class="ifgTooltipSliceOpacityLight Fundamental3785" d="M 48 25 A 24 24 0 0 1 32 47 L 25 25"  transform="rotate(-378,25,25)"></path></svg><div class='factorGraphTooltip factorGraphTooltipLarge FGTooltipTop'><span></span></div><div class='factorGraphTooltipMobile factorGraphTooltipLarge'><span>mobile</span></div><!-- STOP.Element_FactorDiagram --></div>`;

  return (
    <TechAnalysisHeader
      price={samplePrice}
      static_info={sampleStaticInfo}
      sectors={sampleSectors}
      recommendation={sampleRecommendation}
      factor_diagram_thumb={sampleFactorDiagramThumb}
      risk={sampleRisk}
      labelAndTexts={sampleLabelsAndTexts}
    />
  );
}

export const techAnalysisHeaderCode = `
'use client';

import { TechAnalysisHeader } from '@/components/custom-components/tech-analysis-header';
import {
  LabelsAndTexts,
  Price,
  Recommendation,
  Risk,
  Sectors,
  StaticInfo,
} from '@/lib/types/shared-components';

export function TechAnalysisHeaderDemo() {
  // Price information
  const samplePrice: Price = {
    close: '125.50',
    profit_loss_percent: {
      sign: 1,
      value: '+5.2%',
      is_badge: true,
    },
    price_date: '2024-01-15',
    price_date_long: 'January 15, 2024',
  };

  // Company static information
  const sampleStaticInfo: StaticInfo = {
    about_header_text: 'About the Company',
    description: 'Company description text...',
    description_suggested_clip_length: 100,
    company_url: 'example.com',
    source: 'Company Website',
  };

  // Sector classification
  const sampleSectors: Sectors = {
    sector: {
      id: '1',
      name: 'Technology',
      link: '/sector/technology',
    },
    group: {
      id: '2',
      name: 'Software',
      link: '/group/software',
    },
    industry: {
      id: '3',
      name: 'Enterprise Software',
      link: '/industry/enterprise-software',
    },
  };

  // Investment recommendation
  const sampleRecommendation: Recommendation = {
    type: 'investtech',
    free_version: 0,
    investtech: {
      score: '8',
      eval_code: 2,
      eval_text: 'Buy',
      color: 'buy',
      color_tailwind: 'text-green-600',
    },
  };

  // Risk assessment
  const sampleRisk: Risk = {
    calculated: true,
    liquidity: {
      text: 'Good',
      level: 'Low',
      score: 88,
    },
    volatility: {
      text: 'Low',
      level: 'Low',
      score: 85,
    },
    total: {
      icon: false,
      text_long: 'Low Risk',
      text_short: 'Low',
      level: 'Low',
      score: 86,
      color: 'green',
    },
  };

  // Labels and texts for internationalization
  const sampleLabelsAndTexts: LabelsAndTexts = {
    close: 'Close',
    updated: 'Updated',
    about_company: 'About the Company',
    website: 'Website',
    source: 'Source',
    sector: 'Sector',
    recommendation: 'Recommendation',
    recommendation_card_help: [
      'Investtech recommendation is based on technical analysis.',
      'The score ranges from 1-9, where higher scores indicate stronger buy signals.',
    ],
  };

  // Optional factor diagram thumbnail SVG
  const sampleFactorDiagramThumb = \`<!-- SVG content -->\`;

  return (
    <TechAnalysisHeader
      price={samplePrice}
      static_info={sampleStaticInfo}
      sectors={sampleSectors}
      recommendation={sampleRecommendation}
      factor_diagram_thumb={sampleFactorDiagramThumb}
      risk={sampleRisk}
      labelAndTexts={sampleLabelsAndTexts}
    />
  );
}
`;

export const techAnalysisHeaderJson = {
  price: {
    close: '125.50',
    profit_loss_percent: {
      sign: 1,
      value: '+5.2%',
      is_badge: true,
    },
    price_date: '2024-01-15',
    price_date_long: 'January 15, 2024',
  },
  static_info: {
    about_header_text: 'About the Company',
    description: 'Company description text...',
    description_suggested_clip_length: 100,
    company_url: 'example.com',
    source: 'Company Website',
  },
  sectors: {
    sector: {
      id: '1',
      name: 'Technology',
      link: '/sector/technology',
    },
    group: {
      id: '2',
      name: 'Software',
      link: '/group/software',
    },
    industry: {
      id: '3',
      name: 'Enterprise Software',
      link: '/industry/enterprise-software',
    },
  },
  recommendation: {
    type: 'investtech',
    free_version: 0,
    investtech: {
      score: '8',
      eval_code: 2,
      eval_text: 'Buy',
      color: 'buy',
      color_tailwind: 'text-green-600',
    },
  },
  risk: {
    calculated: true,
    liquidity: {
      text: 'Good',
      level: 'Low',
      score: 88,
    },
    volatility: {
      text: 'Low',
      level: 'Low',
      score: 85,
    },
    total: {
      icon: false,
      text_long: 'Low Risk',
      text_short: 'Low',
      level: 'Low',
      score: 86,
      color: 'green',
    },
  },
  labels_and_texts: {
    close: 'Close',
    updated: 'Updated',
    about_company: 'About the Company',
    website: 'Website',
    source: 'Source',
    sector: 'Sector',
    recommendation: 'Recommendation',
    recommendation_card_help: [
      'Investtech recommendation is based on technical analysis.',
      'The score ranges from 1-9, where higher scores indicate stronger buy signals.',
    ],
  },
  factor_diagram_thumb: 'SVG string containing factor diagram thumbnail',
};
