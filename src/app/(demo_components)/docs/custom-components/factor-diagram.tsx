'use client';

import FactorDiagram from '@/components/custom-components/factor-diagram/factor-diagram';
import { FactorDiagramTooltips, FactorDiagramLabelsAndTexts } from '@/lib/types/shared-components';

/**
 * Demo component for the FactorDiagram component.
 * Shows how to use the factor diagram with SVG and tooltips.
 *
 * @returns A demo of the FactorDiagram component
 */
export function FactorDiagramDemo() {
  // Sample SVG for the factor diagram
  const sampleSvg = `<!-- START.Element_FactorDiagram --><div id="factorDiagBody" ><div id="portFactorDiagramDesktop"><svg width="400" height="400"><defs>\t<radialGradient id="fillFactorMostlyPositive400" cx="200" cy="200" r="140" gradientUnits="userSpaceOnUse">\t\t<stop offset="0%" style="stop-color:#3fb145;stop-opacity:1"></stop>\t\t<stop offset="100%" style="stop-color:#3fb145;stop-opacity:1"></stop>\t</radialGradient></defs><ellipse class="ifgAxisTickCircles" cx="200" cy="200" rx="160" ry="160" style="stroke-width:5" /><ellipse  class="ifgAxisTickCircles" cx="200" cy="200" rx="100" ry="100" style="stroke-width:5" /><line x1="200" y1="200" x2="299" y2="64" style="stroke:rgb(180,180,180);stroke-width:1" /><text x="304" y="56" transform="rotate(396,304,56)" text-anchor="middle" alignment-baseline="central" class="ifgAxisLegendMedium">Technical</text><line x1="200" y1="200" x2="101" y2="64" style="stroke:rgb(180,180,180);stroke-width:1" /><text x="96" y="56" transform="rotate(324,96,56)" text-anchor="middle" alignment-baseline="central" class="ifgAxisLegendMedium">Quantitative</text><line x1="200" y1="200" x2="40" y2="252" style="stroke:rgb(180,180,180);stroke-width:1" /><text x="31" y="255" transform="rotate(72,31,255)" text-anchor="middle" alignment-baseline="central" class="ifgAxisLegendMedium">Insider</text><line x1="200" y1="200" x2="200" y2="368" style="stroke:rgb(180,180,180);stroke-width:1" /><text x="200" y="378" transform="rotate(0,200,378)" text-anchor="middle" alignment-baseline="central" class="ifgAxisLegendMedium">Stability</text><line x1="200" y1="200" x2="360" y2="252" style="stroke:rgb(180,180,180);stroke-width:1" /><text x="369" y="255" transform="rotate(-72,369,255)" text-anchor="middle" alignment-baseline="central" class="ifgAxisLegendMedium">Fundamental</text><path class="normalArea" d="M327,241 C342,189 314,119 277,94 C240,70 176,90 140,118 C104,146 85,186 97,234 C109,281 154,352 200,354 C246,355 311,293 327,241  Z" style="fill:url(#fillFactorMostlyPositive400);fill-opacity:0.85" /><path id="slice1" class="ifgTooltipSliceOpacityLight Technical901 enabled"  d="M 360 200 A 160 160 0 0 1 249 352 L 200 200"  transform="rotate(-90,200,200)" data-slice="slice1" data-factor="technical" data-tooltip-target="slice1" style="cursor: pointer;"></path><path id="slice2" class="ifgTooltipSliceOpacityLight Quantitative1622 enabled"  d="M 360 200 A 160 160 0 0 1 249 352 L 200 200"  transform="rotate(-162,200,200)" data-slice="slice2" data-factor="quantitative" data-tooltip-target="slice2" style="cursor: pointer;"></path><path id="slice3" class="ifgTooltipSliceOpacityLight Insider2343 enabled"  d="M 360 200 A 160 160 0 0 1 249 352 L 200 200"  transform="rotate(-234,200,200)" data-slice="slice3" data-factor="insider" data-tooltip-target="slice3" style="cursor: pointer;"></path><path id="slice4" class="ifgTooltipSliceOpacityLight Stability3064 enabled"  d="M 360 200 A 160 160 0 0 1 249 352 L 200 200"  transform="rotate(-306,200,200)" data-slice="slice4" data-factor="stability" data-tooltip-target="slice4" style="cursor: pointer;"></path><path id="slice5" class="ifgTooltipSliceOpacityLight Fundamental3785 enabled"  d="M 360 200 A 160 160 0 0 1 249 352 L 200 200"  transform="rotate(-378,200,200)" data-slice="slice5" data-factor="fundamental" data-tooltip-target="slice5" style="cursor: pointer;"></path></svg></div></div><!-- STOP.Element_FactorDiagram -->`;

  // Sample tooltips data
  const sampleTooltips: FactorDiagramTooltips = {
    slice1: {
      title: 'Technical',
      status: 'Strong',
      score: '51',
      description:
        "Technical shows the stock's strength based on short, medium and long term technical analysis. The stronger the stock, the higher investor optimism is considered to be. According to Investtech's research, technically positive stocks have developed well and outperformed other stocks.",
      elements: [
        {
          name: 'RSI momentum',
          value: '51.2',
          score: '6',
        },
        {
          name: 'Technical short term',
          value: '17.9',
          score: '-0',
        },
        {
          name: 'Technical medium term',
          value: '67.3',
          score: '100',
        },
        {
          name: 'Technical long term',
          value: '77.9',
          score: '100',
        },
        {
          name: 'Total technical',
          value: ' ',
          score: '51',
        },
      ],
    },
    slice2: {
      title: 'Quantitative',
      status: 'Neutral',
      score: '3',
      description:
        "Quantitative measures the stock's estimated future return compared to the other stocks in the market. The factor is calculated from the statistical return of stocks with similar quantitative characteristics. The stock's trend status, support and resistance levels, price patterns, momentum and insider trades are used, and the score is adjusted for high or low volatility and liquidity.",
      elements: [
        {
          name: 'Quantitative ranking',
          value: '51.3',
          score: '3',
        },
        {
          name: 'Total quantitative',
          value: ' ',
          score: '3',
        },
      ],
    },
    slice3: {
      title: 'Insider',
      status: 'Neutral',
      score: '14',
      description:
        "Insider is the stock's assessment based on reported insider trades. When directors of the board, executives and other insiders who are required to report trades purchase stocks in their respective companies, it indicates that they believe in rising prices and that no immediate negative surprises are forthcoming. Insider analysis can be considered a simplified fundamental analysis.",
      elements: [
        {
          name: 'Inside score',
          value: '14.4',
          score: '14',
        },
        {
          name: 'Total insider',
          value: ' ',
          score: '14',
        },
      ],
    },
    slice4: {
      title: 'Stability',
      status: 'Strong',
      score: '89',
      description:
        'Stability is an assessment of the likely stability of the stock price. Stocks with high stability have historically had low price fluctuations, strong liquidity and been listed on the stock exchange for a long time. The risk of falling prices is low in such stocks, but the upside can be low as well. In other words, expect stable price development with only small changes. Stocks with low stability have high risk. It is risky to own and trade them, and they can both fall and rise a lot in a short period of time.',
      elements: [
        {
          name: 'Volatility month',
          value: '11.6',
          score: '85',
        },
        {
          name: 'Liquidity million NOK',
          value: '385.5',
          score: '88',
        },
        {
          name: 'Age years',
          value: '>25.0',
          score: '100',
        },
        {
          name: 'Total stability',
          value: ' ',
          score: '89',
        },
      ],
    },
    slice5: {
      title: 'Fundamental',
      status: 'Strong',
      score: '55',
      description:
        "Fundamental describes the stock's value based on accounting value and financial quality. The factor is calculated from stock price vs the company's earnings, i.e. its P/E (price-to-earnings ratio) and its book value, i.e. P/B (price-to-book value ratio). High fundamental value often means low downside risk, while low fundamental value often indicates good growth opportunities and a large upside.",
      elements: [
        {
          name: 'P/E',
          value: '12.2',
          score: '79',
        },
        {
          name: 'P/B',
          value: '2.3',
          score: '32',
        },
        {
          name: 'Total fundamental',
          value: ' ',
          score: '55',
        },
      ],
    },
  };

  // Sample labels and texts
  const sampleLabelsAndTexts: FactorDiagramLabelsAndTexts = {
    title: 'Factor diagram',
    explanation:
      "Investtech's Factor diagram visualises the stock's most important qualities. The more green, the more positive the stock is considered to be.",
    cterm_element: 'Element',
    context: '', // Added required 'context' property to satisfy type check
    cterm_value: 'Value',
    cterm_score: 'Score',
    cterm_see_more: 'See more',
    help_source: 'h2_FactorDiagram',
  };

  return (
    <div className="flex justify-center">
      <FactorDiagram
        rawSvgHtml={sampleSvg}
        tooltips={sampleTooltips}
        labelsAndTexts={sampleLabelsAndTexts}
      />
    </div>
  );
}

export const factorDiagramCode = `
import { Button } from '@/components/external-components/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/external-components/card';
import { Skeleton } from '@/components/external-components/skeleton';
import { RenderHTML } from '@/utils/create-mark-up';
import dynamic from 'next/dynamic';
import { usePlatform } from '@/lib/platform';
import {
  FactorDiagramTooltips,
  FactorDiagramLabelsAndTexts,
  FactorDiagram,
} from '@/lib/types/shared-components';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Dynamic imports for FactorDiagram components
const FactorDiagramDesktop = dynamic(
  () => import('@/components/custom-components/factor-diagram/factor-diagram'),
  {
    loading: () => <Skeleton className="h-[400px] w-full rounded-lg" />,
    ssr: true,
  }
);

const FactorDiagramMobile = dynamic(
  () => import('@/components/custom-components/factor-diagram/factor-diagram-mobile'),
  {
    loading: () => <Skeleton className="h-[400px] w-full rounded-lg" />,
    ssr: true,
  }
);

// Wrapper component to conditionally render mobile or desktop factor diagram
function FactorDiagramWrapper({
  rawSvgHtml,
  tooltips,
  labelsAndTexts,
}: {
  rawSvgHtml: string;
  tooltips?: FactorDiagramTooltips;
  labelsAndTexts?: FactorDiagramLabelsAndTexts;
}) {
  const platform = usePlatform();
  const isMobileOrTablet = platform === 'mobile' || platform === 'tablet';

  if (isMobileOrTablet) {
    return (
      <FactorDiagramMobile
        rawSvgHtml={rawSvgHtml}
        tooltips={tooltips}
        labelsAndTexts={labelsAndTexts}
      />
    );
  }

  return (
    <FactorDiagramDesktop
      rawSvgHtml={rawSvgHtml}
      tooltips={tooltips}
      labelsAndTexts={labelsAndTexts}
    />
  );
}

export function FactorDiagramContainer({
  factor_diagram,
  labels_and_texts,
}: {
  factor_diagram: FactorDiagram;
  labels_and_texts: FactorDiagramLabelsAndTexts;
}) {

  const router = useRouter();

  // Memoize click handler to prevent unnecessary re-renders
  const handleSeeMoreClick = useCallback(() => {
    router.push('/' + '/docs/' + factor_diagram.help_post_name);
  }, [router, factor_diagram.help_post_name]);

  return (
    <>
      {!factor_diagram.is_dummy && !factor_diagram.svg.includes('factorGraphNoData') && (
        <Card
          className="justify-between space-y-4 rounded-none p-5 sm:rounded-xl"
          id="factor-diagram-card"
        >
          <CardHeader className="md:mb-0" id="factor-diagram-header">
            <CardTitle className={'text-grey-700 dark:text-grey-50 text-[10px] font-medium uppercase'} id="factor-diagram-title">
              <RenderHTML html={labels_and_texts.title} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center" id="factor-diagram-content">
            <div className="text-center">
              <div className="justify-self-center" id="factor-diagram-container">
                <FactorDiagramWrapper
                  rawSvgHtml={factor_diagram.svg}
                  tooltips={factor_diagram.tooltips}
                  labelsAndTexts={labels_and_texts}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter id="factor-diagram-footer">
            {/* Factor Diagram Description */}
            <div id="factor-diagram-description">
              {/* <p className="dark:text-grey-50 text-sm font-bold text-black">
              {dummy_factor_diagram_explanation}
            </p> */}
              <p className={'text-grey-800 dark:text-grey-50 text-sm font-normal'}>
                <RenderHTML html={labels_and_texts.explanation ?? ''} />{' '}
                <Button
                  variant="link"
                  className="m-0 h-auto cursor-pointer p-0 text-sm font-normal underline"
                  onClick={handleSeeMoreClick}
                  id="factor-diagram-see-more-button"
                >
                  <RenderHTML html={labels_and_texts.cterm_see_more} />
                </Button>
              </p>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
`;

export const factorDiagramJson = {
  factor_diagram: {
    svg: 'SVG string containing the factor diagram visualization',
    tooltips: {
      slice1: {
        title: 'Technical',
        status: 'Strong',
        score: '51',
        description: 'Description of the technical factor...',
        elements: [
          {
            name: 'RSI momentum',
            value: '51.2',
            score: '6',
          },
        ],
      },
      slice2: {
        title: 'Quantitative',
        status: 'Neutral',
        score: '3',
        description: 'Description of the quantitative factor...',
        elements: [
          {
            name: 'Quantitative ranking',
            value: '51.3',
            score: '3',
          },
        ],
      },
      slice3: {
        title: 'Insider',
        status: 'Neutral',
        score: '14',
        description: 'Description of the insider factor...',
        elements: [
          {
            name: 'Inside score',
            value: '14.4',
            score: '14',
          },
        ],
      },
      slice4: {
        title: 'Stability',
        status: 'Strong',
        score: '89',
        description: 'Description of the stability factor...',
        elements: [
          {
            name: 'Volatility month',
            value: '11.6',
            score: '85',
          },
        ],
      },
      slice5: {
        title: 'Fundamental',
        status: 'Strong',
        score: '55',
        description: 'Description of the fundamental factor...',
        elements: [
          {
            name: 'P/E',
            value: '12.2',
            score: '79',
          },
        ],
      },
    },
    labels_and_texts: {
      title: 'Factor diagram',
      explanation: 'Help text...',
      cterm_element: 'Element',
      cterm_value: 'Value',
      cterm_score: 'Score',
      cterm_see_more: 'See more',
      help_source: 'h2_FactorDiagram',
    },
  },
};
