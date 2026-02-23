'use client';

import { Card, CardContent } from 'investtech/external-components';
import React from 'react';

import {
  BadgeWithTooltip,
  ImageRenderer,
  SeeMoreButton,
  STYLE_CLASSES,
} from './home-card-primitives';
import { MarketCommentary } from '@/lib/types/home';

interface MarketCommentaryCardProps {
  data: MarketCommentary;
  title: string;
  onNavigate: () => void;
}

function MarketCommentaryChartBlock({ data }: { data: MarketCommentary }) {
  const spec = data.company.chart_spec;
  const imgId = spec?.img_param?.id;

  return (
    <div className="flex-1 space-y-3">
      <Card className={STYLE_CLASSES.card}>
        <CardContent className={STYLE_CLASSES.subCardContent}>
          <div className="space-y-1">
            <h3 className={STYLE_CLASSES.subtitle} id="market-commentary-company-name">
              {data.company.name ?? ''}
            </h3>
            <p className={STYLE_CLASSES.ticker} id="market-commentary-ticker">
              {data.company.ticker ?? ''}
            </p>
          </div>
          {imgId && (
            <ImageRenderer
              id={imgId}
              chart_params={spec!.chart_param ?? ''}
              alt={data.company.name ?? 'Market commentary chart'}
              chart_tooltip_id={spec!.img_param.chart_tooltip_id ?? -1}
              testId="market-commentary-chart"
            />
          )}
        </CardContent>
      </Card>
      {data.text && (
        <p className={STYLE_CLASSES.caption} id="market-commnetary-text">
          {data.text}
        </p>
      )}
    </div>
  );
}

export const MarketCommentaryCard = React.memo(function MarketCommentaryCard({
  data,
  title,
  onNavigate,
}: MarketCommentaryCardProps) {
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
      aria-label="Market commentary - click to see more"
      id="market-commentary-card"
    >
      <CardContent className={STYLE_CLASSES.cardContent}>
        <div className="space-y-1">
          <BadgeWithTooltip
            label={data.label}
            help_text={data.help_text}
            testId="market-commentary-tooltip-trigger"
          />
          <h2 className={STYLE_CLASSES.title} id="market-commentary-heading">
            {title}
          </h2>
        </div>
        <MarketCommentaryChartBlock data={data} />
        {data.see_more?.text && (
          <SeeMoreButton text={data.see_more.text} testId="market-commentary-read-more" />
        )}
      </CardContent>
    </Card>
  );
});
