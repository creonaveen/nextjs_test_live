'use client';

import { Progress } from 'investtech/external-components';
import { HelpCircle } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';

import { TooltipOrSheet } from './tooltip-or-sheet';

interface ProgressBarTooltipProps {
  value: number;
  indicatorClassName?: string;
  indicatorStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
  barTitle: string;
  barValue: string;
  tooltipText?: string;
  isMainHealth?: boolean;
}

interface TooltipContentProps {
  value: number;
  indicatorClassName?: string;
  indicatorStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
  barTitle: string;
  barValue: string;
  tooltipText: string;
  titleTextColor: string;
}

/* ---------------- helpers ---------------- */

const getContainerStyles = (
  isMainHealth: boolean,
  style?: React.CSSProperties
): React.CSSProperties | undefined => {
  if (!isMainHealth || !style?.backgroundColor) return undefined;

  return {
    backgroundColor: style.backgroundColor,
    borderColor: style.backgroundColor,
  };
};

const getTitleTextColor = (isMainHealth: boolean): string =>
  isMainHealth ? 'text-black dark:text-white' : 'text-grey-700 dark:text-grey-300 font-semibold';

/* ---------------- sub-components ---------------- */

function TooltipContent({
  value,
  indicatorClassName,
  indicatorStyle,
  className,
  style,
  barTitle,
  barValue,
  tooltipText,
  titleTextColor,
}: TooltipContentProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1 lg:hidden">
        <div className="flex items-center justify-between">
          <span className={`text-sm ${titleTextColor}`}>{barTitle}</span>
          <span className="dark:text-grey-50 font-semibold text-black">{barValue}</span>
        </div>
        <Progress
          value={value}
          indicatorClassName={indicatorClassName}
          indicatorStyle={indicatorStyle}
          className={className}
          style={style}
        />
      </div>
      <RenderHTML html={tooltipText} />
    </div>
  );
}

/**
 * Tooltip trigger icon component
 */
function TooltipTrigger() {
  return (
    <HelpCircle
      size={18}
      aria-label="Help information"
      className="text-grey-600 hover:text-grey-600 dark:text-grey-400 dark:hover:text-grey-300 transition-colors"
    />
  );
}

interface HeaderTooltipProps {
  value: number;
  indicatorClassName?: string;
  indicatorStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
  barTitle: string;
  barValue: string;
  tooltipText: string;
  titleTextColor: string;
}

function HeaderTooltip(props: HeaderTooltipProps) {
  return (
    <TooltipOrSheet
      text={
        <TooltipContent
          value={props.value}
          indicatorClassName={props.indicatorClassName}
          indicatorStyle={props.indicatorStyle}
          className={props.className}
          style={props.style}
          barTitle={props.barTitle}
          barValue={props.barValue}
          tooltipText={props.tooltipText}
          titleTextColor={props.titleTextColor}
        />
      }
      triggerElement={
        <span
          className="inline-flex cursor-pointer items-center"
          aria-label="Help information"
          tabIndex={0}
        >
          <TooltipTrigger />
        </span>
      }
    />
  );
}

/**
 * Header component for the progress bar with title, value, and tooltip
 */
function ProgressBarHeader({
  value,
  indicatorClassName,
  indicatorStyle,
  className,
  style,
  barTitle,
  barValue,
  tooltipText,
  titleTextColor,
}: {
  value: number;
  indicatorClassName?: string;
  indicatorStyle?: React.CSSProperties;
  className?: string;
  style?: React.CSSProperties;
  barTitle: string;
  barValue: string;
  tooltipText?: string;
  titleTextColor: string;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className={`text-sm ${titleTextColor}`}>{barTitle}</span>
      <div className="flex items-center gap-2 font-medium">
        <span className="font-semibold">{barValue}</span>
        {tooltipText && (
          <HeaderTooltip
            value={value}
            indicatorClassName={indicatorClassName}
            indicatorStyle={indicatorStyle}
            className={className}
            style={style}
            barTitle={barTitle}
            barValue={barValue}
            tooltipText={tooltipText}
            titleTextColor={titleTextColor}
          />
        )}
      </div>
    </div>
  );
}

/* ---------------- main component ---------------- */

export function ProgressBarTooltip({
  value,
  indicatorClassName,
  indicatorStyle,
  className,
  style,
  barTitle,
  barValue,
  tooltipText,
  isMainHealth = false,
}: ProgressBarTooltipProps) {
  const containerStyle = getContainerStyles(isMainHealth, style);
  const titleTextColor = getTitleTextColor(isMainHealth);

  return (
    <div
      className={cn('space-y-2 rounded-md py-3', isMainHealth && 'border-2 border-dashed px-3')}
      style={containerStyle}
    >
      <ProgressBarHeader
        value={value}
        indicatorClassName={indicatorClassName}
        indicatorStyle={indicatorStyle}
        className={className}
        style={style}
        barTitle={barTitle}
        barValue={barValue}
        tooltipText={tooltipText}
        titleTextColor={titleTextColor}
      />

      <Progress
        value={value}
        indicatorClassName={indicatorClassName}
        indicatorStyle={indicatorStyle}
        className={className}
        style={style}
      />
    </div>
  );
}
