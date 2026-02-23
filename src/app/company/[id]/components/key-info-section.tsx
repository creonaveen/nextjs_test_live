'use client';

import * as React from 'react';
import { useMemo } from 'react';
import Image from 'next/image';

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from 'investtech/external-components';

import { FactorDiagramContainer } from '@/components/custom-components/factor-diagram/factor-diagram-container';
import { TooltipOrSheet } from '@/components/custom-components/tooltip-or-sheet';
import {
  CompanySectionKeyInfo,
  CompanySectionKeyInfoData,
  KeyInfoLabelsAndTexts,
  Period,
  Periods,
} from '@/lib/types/company';
import { getBadgeVariant } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface KeyInfoSectionProps {
  data: CompanySectionKeyInfo;
}

type BadgeSize = 'default' | 'small' | 'medium' | 'big' | 'risk';

/* -------------------------------------------------------------------------- */
/* Shared UI                                                                  */
/* -------------------------------------------------------------------------- */

function CardTitleWithHelp({ title, help, id }: { title: string; help?: string; id: string }) {
  return (
    <CardTitle className="flex items-center justify-between text-base font-semibold">
      <RenderHTML html={title} />
      <TooltipOrSheet
        id={id}
        text={<RenderHTML html={help ?? ''} />}
        triggerElement={
          <Image
            src="circle_question_mark.svg"
            alt="Help"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          />
        }
      />
    </CardTitle>
  );
}

/* -------------------------------------------------------------------------- */
/* Risk Assessment Card                                                       */
/* -------------------------------------------------------------------------- */

function RiskBlock({
  title,
  explanation,
  label,
}: {
  title: string;
  explanation: string;
  label: {
    sign: number;
    size: string;
    content: string;
  };
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">
          <RenderHTML html={title} />
        </p>
        <Badge variant={getBadgeVariant(label.sign)} size={label.size as BadgeSize}>
          <RenderHTML html={label.content} />
        </Badge>
      </div>
      <p className="text-sm">
        <RenderHTML html={explanation} />
      </p>
    </div>
  );
}

function RiskAssessmentCard({
  data,
  labels,
}: {
  data: CompanySectionKeyInfoData['risk_assessment'];
  labels: KeyInfoLabelsAndTexts;
}) {
  return (
    <Card className="rounded-none p-5 sm:rounded-xl">
      <CardHeader>
        <CardTitleWithHelp
          title={labels.risk_assessment_card_title}
          help={labels.risk_assessment_card_help}
          id="risk-assessment-help"
        />
      </CardHeader>

      <CardContent className="space-y-4 p-0">
        <RiskBlock
          title={data.liquidity.title}
          explanation={data.liquidity.explanation}
          label={data.liquidity.label}
        />
        <RiskBlock
          title={data.volatility.title}
          explanation={data.volatility.explanation}
          label={data.volatility.label}
        />
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Key Statistics Card                                                        */
/* -------------------------------------------------------------------------- */

function StatisticsTable({ periods, changeLabel }: { periods: Period[]; changeLabel: string }) {
  return (
    <Table>
      <TableBody>
        <TableRow showHover={false}>
          <TableCell />
          <TableCell className="text-right text-[10px] font-medium uppercase">
            <RenderHTML html={changeLabel} />
          </TableCell>
        </TableRow>

        {periods.map((period, index) => (
          <TableRow key={index} showHover={false}>
            <TableCell>
              <RenderHTML html={period.period} />
            </TableCell>
            <TableCell className="text-right">
              <Badge variant={getBadgeVariant(period.change_pct.sign ?? 0)} size="small">
                <RenderHTML html={period.change_pct.value ?? '-'} />
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function KeyStatisticsCard({
  data,
  labels,
}: {
  data: CompanySectionKeyInfoData['key_stats'];
  labels: KeyInfoLabelsAndTexts;
}) {
  const { day1, day5, day22, day66, year_to_date }: Periods = data.periods;

  const periods = useMemo<Period[]>(
    () => [day1, day5, day22, day66, year_to_date],
    [day1, day5, day22, day66, year_to_date]
  );

  return (
    <Card className="rounded-none p-5 sm:rounded-xl">
      <CardHeader>
        <CardTitleWithHelp
          title={labels.key_statistics_card_title}
          help={labels.key_statistics_card_help}
          id="key-statistics-help"
        />
      </CardHeader>

      <CardContent className="p-0">
        <StatisticsTable periods={periods} changeLabel={labels.change_column} />

        <p className="text-sm">
          {labels.volatility_info} {data.volatility.day1}%, {data.volatility.day5}%,{' '}
          {data.volatility.day22}% and {data.volatility.day66}%.
        </p>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

export const KeyInfoSection = React.memo(function KeyInfoSection({ data }: KeyInfoSectionProps) {
  const { risk_assessment, key_stats, factor_diagram } = data.data as CompanySectionKeyInfoData;

  const labels = data.labels_and_texts;

  const hasFactorDiagram =
    !factor_diagram.is_dummy && !factor_diagram.svg.includes('factorGraphNoData');

  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:px-4 md:px-6 ${
        hasFactorDiagram ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
      }`}
    >
      <RiskAssessmentCard data={risk_assessment} labels={labels} />

      <KeyStatisticsCard data={key_stats} labels={labels} />

      <FactorDiagramContainer
        factor_diagram={factor_diagram}
        labels_and_texts={factor_diagram.labels}
      />
    </div>
  );
});
