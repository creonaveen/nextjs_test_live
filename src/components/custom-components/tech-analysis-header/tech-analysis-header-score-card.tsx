'use client';

import { Badge } from 'investtech/external-components';
import { Card } from 'investtech/external-components';
import { TriangleAlertIcon } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import FactorDiagram from '@/components/custom-components/factor-diagram/factor-diagram';
import { TooltipOrSheet } from '@/components/custom-components/tooltip-or-sheet';
import { usePlatform } from '@/lib/platform';
import type { LabelsAndTexts, Recommendation, Risk } from '@/lib/types/shared-components';
import { getRiskBadgeVariant } from '@/lib/utils';

export interface InvesttechScoreCardProps {
  risk: Risk;
  recommendation: Recommendation;
  factor_diagram_thumb?: string;
  labelAndTexts: LabelsAndTexts;
  riskCardClasses: string;
  riskCardBackgroundClasses: string;
}

function InvesttechScoreHeader({ labelAndTexts }: { labelAndTexts: LabelsAndTexts }) {
  return (
    <>
      <p
        className="text-grey-700 dark:text-grey-400 text-[10px] tracking-wide uppercase"
        id="tech-analysis-header-recommendation-label"
      >
        {labelAndTexts.recommendation ?? ''}
      </p>
      {labelAndTexts.recommendation_card_help && (
        <TooltipOrSheet
          id="tech-analysis-header-card-help-tooltip"
          text={
            Array.isArray(labelAndTexts.recommendation_card_help)
              ? labelAndTexts.recommendation_card_help.join('\n\n')
              : labelAndTexts.recommendation_card_help || ''
          }
          useHtml={!Array.isArray(labelAndTexts.recommendation_card_help)}
          triggerElement={
            <Image
              src="circle_question_mark.svg"
              alt="Circle Question Mark"
              width={20}
              height={20}
              className="cursor-pointer font-bold"
              onClick={(e) => e.stopPropagation()}
              id="tech-analysis-header-card-help-trigger"
            />
          }
        />
      )}
    </>
  );
}

function ScoreValue({
  risk,
  recommendation,
  riskCardClasses,
  id,
}: {
  risk: Risk;
  recommendation: Recommendation;
  riskCardClasses: string;
  id: string;
}) {
  const isExtreme = risk.total.level === 'Extreme';
  if (isExtreme) {
    return (
      <span className={riskCardClasses} id={id}>
        {risk.total.text_long ?? ''}
      </span>
    );
  }
  const score = recommendation.investtech?.score ?? '';
  const evalText = recommendation.investtech?.eval_text ?? recommendation.analyst?.eval_text ?? '';
  return (
    <span className={riskCardClasses} id={id}>
      {score} {evalText}
    </span>
  );
}

function MobileScoreCardRow({
  risk,
  recommendation,
  factor_diagram_thumb,
  labelAndTexts,
  riskCardClasses,
  isExtreme,
}: InvesttechScoreCardProps & { isExtreme: boolean }) {
  const scoreId = isExtreme
    ? 'tech-analysis-header-extreme-risk-value'
    : 'tech-analysis-header-investtech-score-value';
  const scoreWrapperClass = isExtreme
    ? 'items-center justify-start'
    : 'mb-1 flex flex-row items-center justify-start';

  return (
    <div className="flex h-full flex-row justify-between px-3">
      <div className="justify-between gap-2 pt-3">
        <div className="flex items-center gap-2">
          <InvesttechScoreHeader labelAndTexts={labelAndTexts} />
        </div>
        <div className={scoreWrapperClass}>
          <ScoreValue
            risk={risk}
            recommendation={recommendation}
            riskCardClasses={riskCardClasses}
            id={scoreId}
          />
        </div>
      </div>
      {isExtreme ? (
        <div className="items-center pt-3">
          <TriangleAlertIcon className="text-error-text-active size-12" />
        </div>
      ) : (
        <div>
          {factor_diagram_thumb && !factor_diagram_thumb.includes('factorGraphNoData') && (
            <div className="flex h-16 w-16 items-center">
              <FactorDiagram rawSvgHtml={factor_diagram_thumb} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MobileScoreCardBody(props: InvesttechScoreCardProps & { isExtreme: boolean }) {
  const { risk, isExtreme } = props;

  return (
    <div className="flex flex-col px-0" id="tech-analysis-header-investtech-score-card">
      <MobileScoreCardRow {...props} />
      {!isExtreme && (
        <div className="flex w-full justify-center">
          <Badge
            variant={getRiskBadgeVariant(risk.total.color)}
            size="riskMobile"
            id="tech-analysis-header-risk-badge"
          >
            {risk.total.text_long ?? ''}
          </Badge>
        </div>
      )}
    </div>
  );
}

function InvesttechScoreCardMobile(props: InvesttechScoreCardProps) {
  const { risk, riskCardBackgroundClasses } = props;
  const isExtreme = risk.total.level === 'Extreme';

  return (
    <Card
      className={`${riskCardBackgroundClasses} gap-0 rounded-xl pt-0 ${isExtreme ? 'pb-3' : 'pb-0'}`}
    >
      <MobileScoreCardBody {...props} isExtreme={isExtreme} />
    </Card>
  );
}

function DesktopExtremeBlock(props: InvesttechScoreCardProps) {
  const { risk, recommendation, riskCardClasses } = props;
  return (
    <div className="row-span-2 flex h-full w-full items-center justify-center text-center">
      <div className="flex flex-row items-center justify-center gap-4">
        <ScoreValue
          risk={risk}
          recommendation={recommendation}
          riskCardClasses={riskCardClasses}
          id="tech-analysis-header-extreme-risk-value"
        />
        <TriangleAlertIcon className="text-error-text-active size-10" />
      </div>
    </div>
  );
}

function DesktopNormalBlock(props: InvesttechScoreCardProps) {
  const { risk, recommendation, factor_diagram_thumb, riskCardClasses } = props;
  return (
    <div className="row-span-2 flex h-full flex-col items-center justify-between gap-4 text-center">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-row items-center justify-center gap-4">
          <ScoreValue
            risk={risk}
            recommendation={recommendation}
            riskCardClasses={riskCardClasses}
            id="tech-analysis-header-investtech-score-value"
          />
          {factor_diagram_thumb && !factor_diagram_thumb.includes('factorGraphNoData') && (
            <div className="flex h-16 w-16 items-center" id="tech-analysis-header-factor-diagram">
              <FactorDiagram rawSvgHtml={factor_diagram_thumb} />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Badge
          variant={getRiskBadgeVariant(risk.total.color)}
          size="risk"
          id="tech-analysis-header-risk-badge"
        >
          {risk.total.text_long ?? ''}
        </Badge>
      </div>
    </div>
  );
}

function InvesttechScoreCardDesktop(props: InvesttechScoreCardProps) {
  const { risk, labelAndTexts, riskCardBackgroundClasses } = props;
  const isExtreme = risk.total.level === 'Extreme';

  return (
    <Card
      className={`${riskCardBackgroundClasses} gap-3 rounded-xl px-3 pt-3 ${isExtreme ? 'pb-3 md:pb-4 lg:gap-0' : 'gap-0 pt-3 pb-0'}`}
      id="tech-analysis-header-investtech-score-card"
    >
      <div className="row-span-1 flex items-start justify-between">
        <InvesttechScoreHeader labelAndTexts={labelAndTexts} />
      </div>
      {isExtreme ? <DesktopExtremeBlock {...props} /> : <DesktopNormalBlock {...props} />}
    </Card>
  );
}

export const InvesttechScoreCard = React.memo(function InvesttechScoreCard(
  props: InvesttechScoreCardProps
) {
  const platform = usePlatform();
  return platform === 'mobile' ? (
    <InvesttechScoreCardMobile {...props} />
  ) : (
    <InvesttechScoreCardDesktop {...props} />
  );
});
