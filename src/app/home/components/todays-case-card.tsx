'use client';

import { Card, CardContent } from 'investtech/external-components';
import React from 'react';

import {
  BadgeWithTooltip,
  ImageRenderer,
  SeeMoreButton,
  STYLE_CLASSES,
} from './home-card-primitives';
import { TextTagWithArrowIcon } from '@/utils/common-functions';
import { TodaysCase } from '@/lib/types/home';

interface TodaysCaseCardProps {
  data: TodaysCase;
  title: string;
  onNavigate: () => void;
}

function TodaysCaseCompanyRow({ data }: { data: TodaysCase }) {
  const rec = data.recommendation;
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="space-y-1">
        <h3 className={STYLE_CLASSES.subtitle} id="todays-case-company-name">
          {data.company.name ?? ''}
        </h3>
        <p className={STYLE_CLASSES.ticker} id="todays-case-ticker">
          {data.company.ticker ?? ''}
        </p>
      </div>
      {rec && (
        <TextTagWithArrowIcon
          content={rec.status}
          icon={rec.icon}
          color={rec.color}
          className="font-semibold"
          testId="todays-case-recommendation-text"
        />
      )}
    </div>
  );
}

function TodaysCaseChartBlock({ data }: { data: TodaysCase }) {
  const spec = data.company.chart_spec;
  const imgId = spec?.img_param?.id;

  return (
    <div className="flex-1 space-y-3">
      <Card className={STYLE_CLASSES.card}>
        <CardContent className={STYLE_CLASSES.subCardContent}>
          <TodaysCaseCompanyRow data={data} />
          {imgId && spec && (
            <ImageRenderer
              id={imgId}
              chart_params={spec.chart_param ?? ''}
              alt={data.company.name ?? "Today's case chart"}
              chart_tooltip_id={spec.img_param.chart_tooltip_id ?? -1}
              testId="todays-case-chart"
            />
          )}
        </CardContent>
      </Card>
      {spec?.caption && (
        <p className={STYLE_CLASSES.caption} id="todays-case-text">
          {spec.caption}
        </p>
      )}
    </div>
  );
}

export const TodaysCaseCard = React.memo(function TodaysCaseCard({
  data,
  title,
  onNavigate,
}: TodaysCaseCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') onNavigate();
  };

  return (
    <Card
      className={STYLE_CLASSES.cardClickable}
      onClick={onNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Todays case - click to see more"
      id="todays-case-card"
    >
      <CardContent className={STYLE_CLASSES.cardContent}>
        <div className="space-y-1">
          <BadgeWithTooltip
            label={data.label}
            help_text={data.help_text}
            testId="todays-case-tooltip-trigger"
          />
          <h2 className={STYLE_CLASSES.title} id="todays-case-heading">
            {title}
          </h2>
        </div>
        <TodaysCaseChartBlock data={data} />
        {data.see_more?.text && (
          <SeeMoreButton text={data.see_more.text} testId="todays-case-read-more" />
        )}
      </CardContent>
    </Card>
  );
});
