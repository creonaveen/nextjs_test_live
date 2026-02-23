import { Button } from 'investtech/external-components';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'investtech/external-components';
import { Skeleton } from 'investtech/external-components';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { usePlatform } from '@/lib/platform';
import {
  FactorDiagramTooltips,
  FactorDiagramLabelsAndTexts,
  FactorDiagram,
} from '@/lib/types/shared-components';
import { RenderHTML } from '@/utils/create-mark-up';
import { getUrlWithParams } from '@/utils/navigation-utils';

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
  // Class names (static strings, no need to memoize)
  const contentClasses = 'text-grey-800 dark:text-grey-50 text-sm font-normal';
  const cardTitleClasses =
    'text-grey-900 dark:text-grey-50 flex items-center justify-between text-base font-semibold';

  const router = useRouter();
  const searchParams = useSearchParams();
  const market_id = searchParams.get('market_id');
  const language = searchParams.get('language');

  // Memoize click handler to prevent unnecessary re-renders
  const handleSeeMoreClick = useCallback(() => {
    router.push(
      getUrlWithParams(
        `/docs/${labels_and_texts.help_source}`,
        `market_id=${market_id}&language=${language}`
      )
    );
  }, [router, labels_and_texts.help_source, market_id, language]);

  return (
    <>
      {!factor_diagram.is_dummy && !factor_diagram.svg.includes('factorGraphNoData') && (
        <FactorDiagramCard
          factor_diagram={factor_diagram}
          labels_and_texts={labels_and_texts}
          cardTitleClasses={cardTitleClasses}
          contentClasses={contentClasses}
          handleSeeMoreClick={handleSeeMoreClick}
        />
      )}
    </>
  );
}

/**
 * Factor diagram description component
 */
function FactorDiagramDescription({
  labels_and_texts,
  contentClasses,
  handleSeeMoreClick,
}: {
  labels_and_texts: FactorDiagramLabelsAndTexts;
  contentClasses: string;
  handleSeeMoreClick: () => void;
}) {
  return (
    <div id="factor-diagram-description">
      <p className={`${contentClasses}`}>
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
  );
}

/**
 * Factor diagram card component
 */
function FactorDiagramCard({
  factor_diagram,
  labels_and_texts,
  cardTitleClasses,
  contentClasses,
  handleSeeMoreClick,
}: {
  factor_diagram: FactorDiagram;
  labels_and_texts: FactorDiagramLabelsAndTexts;
  cardTitleClasses: string;
  contentClasses: string;
  handleSeeMoreClick: () => void;
}) {
  return (
    <Card
      className="justify-between space-y-4 rounded-none p-5 sm:rounded-xl"
      id="factor-diagram-card"
    >
      <CardHeader className="md:mb-0" id="factor-diagram-header">
        <CardTitle className={`${cardTitleClasses}`} id="factor-diagram-title">
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
        <FactorDiagramDescription
          labels_and_texts={labels_and_texts}
          contentClasses={contentClasses}
          handleSeeMoreClick={handleSeeMoreClick}
        />
      </CardFooter>
    </Card>
  );
}
