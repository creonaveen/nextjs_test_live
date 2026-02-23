'use client';
import Image from 'next/image';
import React from 'react';
import SvgRenderer from '@/components/custom-components/svg-renderer';
import { ChartMaximizeWithTrigger } from '@/components/custom-components/chart/chart-maximize-with-trigger';
import { ResearchPageBlock } from '@/lib/types/research-page';
import { ImageWidth } from '@/lib/types/research-page';
import { getGridColumnsClass } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';

function renderHorizontalImageBlockSvgPlain(
  imageBlock: ResearchPageBlock,
  index: number
): React.ReactNode {
  const title = imageBlock.title || imageBlock.caption || '';
  const chartParam = imageBlock?.chart_param || '';
  const chartTooltipId = imageBlock?.chart_tooltip_id ?? -1;
  return (
    <SvgRenderer
      testId={`research-page-horizontal-image-svg-renderer-${index + 1}`}
      alt={title}
      className="mt-2 max-w-[500px] md:max-w-full"
      chart_params={chartParam}
      chart_tooltip_id={chartTooltipId}
    />
  );
}

function renderHorizontalImageBlockSvgMaximized(
  imageBlock: ResearchPageBlock,
  index: number
): React.ReactNode {
  const title = imageBlock.title || imageBlock.caption || '';
  const chartParam = imageBlock?.chart_param || '';
  return (
    <ChartMaximizeWithTrigger
      id={`research-page-horizontal-image-chart-maximize-${index + 1}`}
      title={title}
      apiProps={{ chart_param: chartParam }}
    >
      {renderHorizontalImageBlockSvgPlain(imageBlock, index)}
    </ChartMaximizeWithTrigger>
  );
}

function renderHorizontalImageBlockSvg(
  imageBlock: ResearchPageBlock,
  index: number,
  platform: string
) {
  const useMaximized = Boolean(imageBlock.chart_maximize && platform === 'desktop');
  return useMaximized
    ? renderHorizontalImageBlockSvgMaximized(imageBlock, index)
    : renderHorizontalImageBlockSvgPlain(imageBlock, index);
}

function renderHorizontalImageBlockContent(
  imageBlock: ResearchPageBlock,
  index: number,
  isFullWidth: boolean,
  platform: string
) {
  if (imageBlock.type === 'image_dynamic') {
    return renderHorizontalImageBlockSvg(imageBlock, index, platform);
  }
  return (
    <Image
      src={imageBlock.src || ''}
      alt={imageBlock.alt || ''}
      title={imageBlock.title || ''}
      width={isFullWidth ? 1200 : 600}
      height={imageBlock.height || 100}
      className={`h-auto ${isFullWidth ? 'w-full' : 'w-[200px] md:w-[500px]'} object-contain`}
    />
  );
}

export function renderHorizontalImageBlockItem(opts: {
  block: ResearchPageBlock;
  imageBlock: ResearchPageBlock;
  imageIndex: number;
  index: number;
  platform: string;
}) {
  const { block, imageBlock, imageIndex, index, platform } = opts;
  const isFullWidth = block.colspan === 2;
  const colSpanClass =
    typeof imageBlock.width === 'string' && imageBlock.width === 'lg'
      ? 'md:col-span-2'
      : 'md:col-span-1';
  const alignClass =
    imageBlock.class === 'alignleft'
      ? 'md:items-start'
      : imageBlock.class === 'alignright'
        ? 'md:items-end'
        : 'items-start';
  return (
    <div key={imageIndex} className={`flex flex-col ${alignClass} ${colSpanClass}`}>
      <div
        className={`w-full justify-center lg:justify-start ${
          isFullWidth ? 'md:col-span-2 md:w-full md:max-w-none' : ''
        }`}
      >
        {renderHorizontalImageBlockContent(imageBlock, index, isFullWidth, platform)}
      </div>
      {imageBlock.caption && (
        <p className="dark:text-grey-200 mt-2 text-start text-sm font-semibold text-black">
          <RenderHTML html={imageBlock.caption || ''} />
        </p>
      )}
    </div>
  );
}

export function renderHorizontalImageBlockGrid(
  block: ResearchPageBlock,
  index: number,
  platform: string
) {
  const gridClass = getGridColumnsClass(block?.blocks?.[0]?.width as unknown as ImageWidth);
  const colspanClass = block.colspan === 2 ? 'md:grid-cols-1' : '';
  return (
    <div className={`grid max-w-3/4 grid-cols-1 gap-6 ${gridClass} ${colspanClass}`}>
      {block.blocks?.map((imageBlock: ResearchPageBlock, imageIndex: number) =>
        renderHorizontalImageBlockItem({ block, imageBlock, imageIndex, index, platform })
      )}
    </div>
  );
}
