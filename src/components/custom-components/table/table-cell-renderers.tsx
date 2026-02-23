'use client';

/**
 * Table cell renderers – one renderer per column_data_type (SRP).
 * To add a new type: add a key to `renderers` and a function (ctx) => ReactNode | null (OCP).
 * TableComponent depends on getCellContent(context), not on concrete renderers (DIP).
 */
import * as CountryFlags from 'country-flag-icons/react/3x2';
import { Badge } from 'investtech/external-components';
import { Link } from '@/components/link';
import React from 'react';

import type { TableData } from '@/lib/types/tables-example';
import {
  hasWarningIconWithText,
  isIconArrowValue,
  isIconFlagValue,
  isLabelStructValue,
  isLinkStructValue,
} from '@/table-utils/table-cell-value-guards';
import type { ArrowIconType } from '@/table-utils/table-datatypes';
import {
  labelStructColorToBadgeVariant,
  labelStructColorToTextColor,
} from '@/table-utils/table-datatypes';
import { AlertIcon, TextTagWithArrowIcon, WarningIconTiny } from '@/utils/common-functions';
import { RenderHTML } from '@/utils/create-mark-up';

import { AlertsIconSheet } from '../alerts-icon-sheet';
import { NotesIconSheet } from '../notes-icon-sheet';
import { PortfolioIconSheet } from '../portfolio-icon-sheet';
import { RatingIconDialog } from '../rating-icon-dialog';
import { WatchlistIconSheet } from '../watchlist-icon-sheet';

import {
  img_tech_chart_struct,
  renderChartPlaceholder,
} from './table-cell-renderer-img-tech-chart';

export type TextAlign = 'left' | 'right' | 'center' | 'justify';

/** Context passed to each cell renderer. Single interface for dependency inversion. */
export interface CellRendererContext {
  value: TableData[keyof TableData][string] | undefined;
  displayText: string;
  rowKey: string;
  columnKey: string;
  align: TextAlign;
}

type CellRenderer = (ctx: CellRendererContext) => React.ReactNode | null;

const SPAN_CLASS = 'flex items-center gap-1';

type MyDataIconOptions = { hasValue?: boolean };

const MY_DATA_ICON_MAP: Record<
  string,
  (value?: string, options?: MyDataIconOptions) => React.ReactNode
> = {
  myWatchlist: (_value, options) => <WatchlistIconSheet highlight={options?.hasValue} />,
  myPortfolio: (_value, options) => <PortfolioIconSheet highlight={options?.hasValue} />,
  myRating: (value) => (
    <RatingIconDialog rating={value != null && value !== '' ? Number(value) : 0} />
  ),
  myNotes: (_value, options) => <NotesIconSheet highlight={options?.hasValue} />,
  myAlerts: (_value, options) => <AlertsIconSheet highlight={options?.hasValue} />,
};

/** Returns the icon for myData_struct feature; null for myDataAny or unknown. */
function getMyDataIconForFeature(
  feature: string,
  value?: string,
  options?: MyDataIconOptions
): React.ReactNode | null {
  const render = MY_DATA_ICON_MAP[feature];
  return render ? render(value, options) : null;
}

/** Non-empty check for icon/badge columns. */
function hasValue(value: unknown): boolean {
  return value != null && value !== '';
}

const renderers: Partial<Record<string, CellRenderer>> = {
  icon_struct(ctx) {
    const { value, displayText, columnKey, rowKey, align } = ctx;
    if (value == null || typeof value !== 'object') return null;
    if (isIconFlagValue(value)) {
      type FlagComponentType = React.ComponentType<{ className?: string }>;
      const FlagComponent = (CountryFlags as Record<string, FlagComponentType>)[
        value.value.toUpperCase()
      ];
      return FlagComponent ? (
        <span title={value.value.toUpperCase()}>
          <FlagComponent className="h-4 w-6 shrink-0" />
        </span>
      ) : (
        <RenderHTML html={displayText} />
      );
    }
    if (isIconArrowValue(value)) {
      return (
        <TextTagWithArrowIcon
          testId={`${rowKey}-${columnKey}-text-tag-with-arrow-icon`}
          content={value.text ?? undefined}
          icon={`arrow_${value.direction}` as ArrowIconType}
          color={value.color}
          textPosition={value.text_position === 'last' ? 'last' : 'first'}
          align={align === 'left' ? 'left' : 'right'}
        />
      );
    }
    return null;
  },

  img_tech_chart_struct,

  link_struct(ctx) {
    const { value } = ctx;
    if (!value || typeof value !== 'object' || !isLinkStructValue(value)) return null;
    return (
      <Link href={value.url} className="hover:text-primary inline hover:underline">
        <RenderHTML html={value.text} />
      </Link>
    );
  },

  string_struct(ctx) {
    const { value, displayText } = ctx;
    if (value != null && typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      if (typeof obj.text === 'string') {
        const colorClass =
          obj.color != null && typeof obj.color === 'string'
            ? labelStructColorToTextColor(obj.color)
            : '';
        return (
          <span className={colorClass || undefined}>
            <RenderHTML html={obj.text} />
          </span>
        );
      }
    }
    return <RenderHTML html={displayText} />;
  },

  alarm(ctx) {
    if (!hasValue(ctx.value)) return null;
    return (
      <span className={SPAN_CLASS}>
        <AlertIcon />
      </span>
    );
  },

  /** myData_struct: cell value is object with feature (myWatchlist, myPortfolio, etc.); show matching icon only when is_set is true. */
  myData_struct(ctx) {
    const { value, displayText } = ctx;
    if (value == null || typeof value !== 'object') return <RenderHTML html={displayText} />;
    const obj = value as Record<string, unknown>;
    if (obj.is_set !== true) return <span />;
    const feature = typeof obj.feature === 'string' ? obj.feature : undefined;
    if (!feature) return <RenderHTML html={displayText} />;
    const cellValue = obj.value != null && obj.value !== '' ? String(obj.value) : undefined;
    const hasValue = obj.value != null && obj.value !== '';
    const icon = getMyDataIconForFeature(feature, cellValue, { hasValue });
    if (icon != null) {
      return <span className={SPAN_CLASS}>{icon}</span>;
    }
    return <RenderHTML html={displayText} />;
  },

  label_struct(ctx) {
    const { value } = ctx;
    if (!value || typeof value !== 'object' || !isLabelStructValue(value)) return null;
    const obj = value as Record<string, unknown>;
    const showWarningIcon = obj.icon === 'warning';
    const textFirst = obj.text_position === 'first';
    return (
      <Badge
        variant={labelStructColorToBadgeVariant(value.color)}
        size={
          value.size === 'small' || value.size === 'medium' || value.size === 'big'
            ? value.size
            : 'small'
        }
      >
        {showWarningIcon ? (
          <span className={SPAN_CLASS}>
            {textFirst ? (
              <>
                <RenderHTML html={value.text} />
                <WarningIconTiny size={5} />
              </>
            ) : (
              <>
                <WarningIconTiny size={5} />
                <RenderHTML html={value.text} />
              </>
            )}
          </span>
        ) : (
          <RenderHTML html={value.text} />
        )}
      </Badge>
    );
  },
};

/** Renders warning icon + text for any value with icon 'warning' and text (uses text_position). */
function renderWarningIconWithText(value: {
  text: string;
  text_position?: string;
  color?: string;
}): React.ReactNode {
  const textFirst = value.text_position === 'first';
  const colorClass = value.color ? labelStructColorToTextColor(value.color) : '';
  const className = colorClass ? `${SPAN_CLASS} ${colorClass}` : SPAN_CLASS;
  return (
    <span className={className}>
      {textFirst ? (
        <>
          <RenderHTML html={value.text} />
          <WarningIconTiny />
        </>
      ) : (
        <>
          <WarningIconTiny />
          <RenderHTML html={value.text} />
        </>
      )}
    </span>
  );
}

function getWarningContentIfAny(
  dataType: string | undefined,
  ctx: CellRendererContext
): React.ReactNode | null {
  if (dataType === 'label_struct') return null;
  if (ctx.value == null || typeof ctx.value !== 'object') return null;
  if (!hasWarningIconWithText(ctx.value)) return null;
  return renderWarningIconWithText(ctx.value);
}

function getRendererContent(
  dataType: string | undefined,
  ctx: CellRendererContext
): React.ReactNode | null {
  const render = dataType ? renderers[dataType] : undefined;
  if (!render) return null;
  const result = render(ctx);
  return result !== null ? result : null;
}

function getFallbackContent(ctx: CellRendererContext): React.ReactNode {
  if (ctx.value != null && typeof ctx.value === 'object') {
    const obj = ctx.value as { color?: string; text?: string };
    const colorClass = obj.color ? labelStructColorToTextColor(obj.color) : '';
    return (
      <span className={colorClass || undefined}>
        <RenderHTML html={obj.text ?? ctx.displayText} />
      </span>
    );
  }
  return <RenderHTML html={ctx.displayText} />;
}

/**
 * Returns the cell content for a given data type and context.
 * Open/Closed: new column types are added by registering in renderers, not by editing this function.
 */
export function getCellContent(
  dataType: string | undefined,
  ctx: CellRendererContext
): React.ReactNode {
  if (dataType === 'img_tech_chart_struct') {
    const chartContent = getRendererContent(dataType, ctx);
    if (chartContent != null) return chartContent;
    return renderChartPlaceholder(ctx);
  }
  const warningContent = getWarningContentIfAny(dataType, ctx);
  if (warningContent != null) return warningContent;
  const rendererContent = getRendererContent(dataType, ctx);
  if (rendererContent != null) return rendererContent;
  return getFallbackContent(ctx);
}
