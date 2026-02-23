'use client';

import { Badge } from 'investtech/external-components';
import { Button } from 'investtech/external-components';
import { HelpCircle } from 'lucide-react';
import { Link } from '@/components/link';
import React from 'react';

import SvgRenderer from '@/components/custom-components/svg-renderer';
import { TooltipOrSheet } from '@/components/custom-components/tooltip-or-sheet';
import { Label } from '@/lib/types/home';
import { getBadgeVariant, isExternalUrl, toKebabCase } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';

/**
 * Props for BadgeWithTooltip component
 */
export interface BadgeWithTooltipProps {
  label: Label;
  help_text: string;
  testId: string;
}

export const BadgeWithTooltip = React.memo(function BadgeWithTooltip({
  label,
  help_text,
  testId,
}: BadgeWithTooltipProps) {
  const badgeClasses = 'text-[10px] font-medium uppercase';

  return (
    <div className="flex items-start justify-between">
      {label.is_badge && (
        <Badge
          variant="neutral"
          size="small"
          className={badgeClasses}
          id={toKebabCase(label.content ?? '')}
        >
          {label.content ?? ''}
        </Badge>
      )}
      {help_text && (
        <TooltipOrSheet
          id={testId}
          text={help_text ?? ''}
          triggerElement={
            <HelpCircle
              size={18}
              className="text-grey-400 hover:text-grey-600 dark:hover:text-grey-300 transition-colors"
              aria-label="Help information"
              id={testId}
            />
          }
        />
      )}
    </div>
  );
});

export interface SeeMoreButtonProps {
  text: string;
  href?: string;
  testId: string;
}

export const handleExternalClick = (href: string) => {
  if (!href) return;
  const newWindow = window.open(href, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    newWindow.opener = null;
  }
};

export const SeeMoreButton = React.memo(function SeeMoreButton({
  text,
  href,
  testId,
}: SeeMoreButtonProps) {
  const isExternalLink = isExternalUrl(href ?? '');

  return isExternalLink ? (
    <Button
      variant="outline"
      size="sm"
      className="w-fit px-6"
      onClick={() => handleExternalClick(href ?? '')}
      aria-label={text.replace(/<[^>]*>/g, '') || 'Open external link'}
      id={testId}
    >
      <RenderHTML html={text} />
    </Button>
  ) : href ? (
    <Link href={href}>
      <Button
        variant="outline"
        size="sm"
        className="w-fit px-6"
        aria-label={text.replace(/<[^>]*>/g, '') || 'See more'}
        id={testId}
      >
        <RenderHTML html={text} />
      </Button>
    </Link>
  ) : (
    <Button
      variant="outline"
      size="sm"
      className="w-fit px-6"
      aria-label={text.replace(/<[^>]*>/g, '') || 'See more'}
      id={testId}
    >
      <RenderHTML html={text} />
    </Button>
  );
});

export interface BadgeVariantProps {
  value: string;
  sign: number;
  testId: string;
}

export const BadgeVariant = React.memo(function BadgeVariant({
  value,
  sign,
  testId,
}: BadgeVariantProps) {
  return (
    <Badge
      variant={getBadgeVariant(sign ?? 0)}
      size="small"
      className="whitespace-nowrap"
      id={testId}
    >
      {value ?? '-'}
    </Badge>
  );
});

export interface ImageRendererProps {
  id: string;
  chart_params: string;
  alt: string;
  chart_tooltip_id: number;
  testId: string;
}

export const ImageRenderer = React.memo(function ImageRenderer({
  id,
  chart_params,
  alt,
  chart_tooltip_id,
  testId,
}: ImageRendererProps) {
  if (!id) return null;

  return (
    <div className="relative w-full" aria-label={alt || 'Chart'}>
      <SvgRenderer
        svg_id={id}
        alt={alt}
        chart_params={chart_params}
        containerWidth={440}
        containerHeight={200}
        chart_tooltip_id={chart_tooltip_id}
        testId={testId}
      />
    </div>
  );
});

export const STYLE_CLASSES = {
  title: 'text-grey-900 text-lg font-semibold dark:text-white',
  subtitle: 'text-grey-900 text-base font-semibold dark:text-white',
  ticker: 'text-grey-600 dark:text-grey-400 text-[10px] font-medium uppercase',
  caption: 'text-grey-750 dark:text-grey-100 text-xs font-normal',
  card: 'border-grey-100 dark:border-grey-700 border p-0 shadow-none rounded-lg',
  cardClickable:
    'cursor-pointer p-5 transition-all hover:shadow-md dark:hover:shadow-md dark:hover:shadow-accent-1',
  heading: 'text-grey-800 text-sm font-semibold dark:text-white',
  tableCell: 'text-sm font-normal text-grey-800 dark:text-grey-50',
  cardContent: 'space-y-8 p-0 flex h-full flex-col',
  subCardContent: 'space-y-6 px-4 pt-4 pb-8',
  companyInfo: 'company-link-button max-w-[110px] truncate',
} as const;
