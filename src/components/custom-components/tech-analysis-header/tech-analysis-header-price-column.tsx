'use client';

import { Badge } from 'investtech/external-components';
import * as React from 'react';

import { usePlatform } from '@/lib/platform';
import type { LabelsAndTexts, Price } from '@/lib/types/shared-components';
import { getBadgeVariant } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';

import {
  FLEX_COLUMN_GAP_1,
  FLEX_COLUMN_GAP_4,
  LABEL_CLASSES,
  PRIMARY_TEXT_CLASSES,
} from './tech-analysis-header-utils';

export interface PriceColumnProps {
  price: Price;
  labelAndTexts: LabelsAndTexts;
}

function CloseWithBadge({ price }: { price: Price }) {
  return (
    <div className="flex items-center gap-1">
      <span className={`${PRIMARY_TEXT_CLASSES} text-sm`} id="tech-analysis-header-close-value">
        <RenderHTML html={price?.close ?? ''} />
      </span>
      {price?.profit_loss_percent?.value && (
        <Badge
          variant={getBadgeVariant(price?.profit_loss_percent.sign) ?? 'warning'}
          size={'small'}
          id="tech-analysis-header-profit-loss-percent-badge"
        >
          {price?.profit_loss_percent.value}
        </Badge>
      )}
    </div>
  );
}

function PriceColumnMobile({ price, labelAndTexts }: PriceColumnProps) {
  const platform = usePlatform();

  return (
    <div className="flex flex-col gap-1 md:hidden md:gap-2">
      <div className="flex justify-between">
        <p className={LABEL_CLASSES} id="tech-analysis-header-close-label">
          {labelAndTexts.close ?? ''}
        </p>
        {platform !== 'mobile' && (
          <p className={LABEL_CLASSES} id="tech-analysis-header-updated-label">
            {labelAndTexts.updated ?? ''}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 md:justify-between">
        <CloseWithBadge price={price} />
        {platform === 'mobile' && <div className="bg-grey-700 h-full w-0.5"></div>}
        <p
          className={`${PRIMARY_TEXT_CLASSES} text-sm md:text-xs`}
          id="tech-analysis-header-date-value"
        >
          {price?.price_date_long ?? ''}
        </p>
      </div>
    </div>
  );
}

function PriceColumnDesktop({ price, labelAndTexts }: PriceColumnProps) {
  return (
    <div className="hidden flex-col gap-4 md:flex">
      <div className={FLEX_COLUMN_GAP_1}>
        <p className={LABEL_CLASSES} id="tech-analysis-header-close-label">
          {labelAndTexts.close ?? ''}
        </p>
        <CloseWithBadge price={price} />
      </div>
      <div className={FLEX_COLUMN_GAP_1}>
        <p className={LABEL_CLASSES} id="tech-analysis-header-updated-label">
          {labelAndTexts.updated ?? ''}
        </p>
        <p className={`${PRIMARY_TEXT_CLASSES} text-xs`} id="tech-analysis-header-updated-value">
          {price?.price_date_long ?? ''}
        </p>
      </div>
    </div>
  );
}

export const PriceColumn = React.memo(function PriceColumn({
  price,
  labelAndTexts,
}: PriceColumnProps) {
  return (
    <div className={`${FLEX_COLUMN_GAP_4} col-span-1`}>
      <PriceColumnMobile price={price} labelAndTexts={labelAndTexts} />
      <PriceColumnDesktop price={price} labelAndTexts={labelAndTexts} />
    </div>
  );
});
