'use client';
import NextImage from 'next/image';
import Image from 'next/image';
import SvgRenderer from '@/components/custom-components/svg-renderer';
import { ChartMaximizeWithTrigger } from '@/components/custom-components/chart/chart-maximize-with-trigger';
import { ResearchPageBlock } from '@/lib/types/research-page';
import { RenderHTML } from '@/utils/create-mark-up';
import { renderHorizontalImageBlockGrid } from '../shared-horizontal-image';
import type { BlockRendererFn } from '../block-types';

function renderImageBlockContent(
  block: ResearchPageBlock,
  index: number,
  justifyClass: string,
  width: number
) {
  const alt = block.alt || 'image';
  const title = block.title || '';
  return (
    <div key={index} className="my-6" id={`research-page-image-${index + 1}`}>
      <div
        className={`relative flex flex-col items-center lg:flex-row lg:space-x-4 ${justifyClass}`}
      >
        <Image
          src={block.src as string}
          alt={alt}
          title={title}
          width={width}
          height={block.height || 100}
          loading="lazy"
        />
        {title ? <span className="mb-3 text-end text-sm font-medium">{title}</span> : null}
      </div>
      {block.caption ? (
        <p className="dark:text-grey-200 mt-2 text-sm font-semibold text-black md:text-start">
          <RenderHTML html={block.caption} />
        </p>
      ) : null}
    </div>
  );
}

export const renderImageBlock: BlockRendererFn = (block, index, platform) => {
  if (!block?.src) return null;
  const justifyClass = block?.title ? 'justify-start' : 'justify-center';
  const width = platform === 'desktop' ? block.width || 400 : 285;
  return renderImageBlockContent(block, index, justifyClass, width as number);
};

function renderImageDynamicBlockMaximized(opts: {
  index: number;
  title: string;
  chartParam: string;
  svg: React.ReactNode;
}) {
  const { index, title, chartParam, svg } = opts;
  return (
    <ChartMaximizeWithTrigger
      id={`research-page-dynamic-image-chart-maximize-${index + 1}`}
      title={title}
      apiProps={{ chart_param: chartParam }}
    >
      {svg}
    </ChartMaximizeWithTrigger>
  );
}

function buildImageDynamicSvg(opts: {
  index: number;
  chartParam: string;
  chartTooltipId: number;
  alt: string;
}) {
  const { index, chartParam, chartTooltipId, alt } = opts;
  return (
    <SvgRenderer
      testId={`research-page-dynamic-image-svg-renderer-${index + 1}`}
      alt={alt}
      className="mt-2 max-w-[500px] md:max-w-3/4"
      chart_params={chartParam}
      chart_tooltip_id={chartTooltipId}
    />
  );
}

function renderImageDynamicBlockInner(
  block: ResearchPageBlock,
  index: number,
  inner: React.ReactNode,
  caption: string | undefined
) {
  return (
    <div key={index} className="w-full" id={`research-page-dynamic-image-${index + 1}`}>
      <div className="mb-4 h-full w-full">{inner}</div>
      {caption ? <div className="mt-1 max-w-3/4 text-sm font-semibold">{caption}</div> : null}
    </div>
  );
}

function getImageDynamicBlockProps(block: ResearchPageBlock) {
  const title = block.title || block.caption || '';
  const chartParam = block?.chart_param || '';
  const chartTooltipId = block?.chart_tooltip_id ?? -1;
  const alt = block.title || block.text || '';
  return { title, chartParam, chartTooltipId, alt };
}

export const renderImageDynamicBlock: BlockRendererFn = (block, index, platform) => {
  const useMaximize = Boolean(block.chart_maximize && platform === 'desktop');
  const { title, chartParam, chartTooltipId, alt } = getImageDynamicBlockProps(block);
  const svg = buildImageDynamicSvg({ index, chartParam, chartTooltipId, alt });
  const inner = useMaximize
    ? renderImageDynamicBlockMaximized({ index, title, chartParam, svg })
    : svg;
  return renderImageDynamicBlockInner(block, index, inner, block.caption);
};

export const renderHorizontalImageBlock: BlockRendererFn = (block, index, platform) => {
  return (
    <div key={index} className="my-6" id={`research-page-horizontal-image-${index + 1}`}>
      {renderHorizontalImageBlockGrid(block, index, platform)}
    </div>
  );
};

export const renderImageWithTextBlock: BlockRendererFn = (block, index) => {
  return (
    <div key={index} className="my-6" id={`research-page-image-with-text-${index + 1}`}>
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
        <div className="flex justify-center">
          <Image
            src={block.src || ''}
            alt={block.alt || 'Image'}
            width={block.width || 300}
            height={block.height || 200}
          />
        </div>
        <div>
          {block.caption && (
            <p className="dark:text-grey-200 mt-2 text-start text-sm font-semibold text-black">
              {block.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

function renderHorizontalImageTextGroupsCaption(caption: string) {
  if (caption.length === 0) return null;
  return (
    <p className="dark:text-grey-200 mt-2 text-start text-sm font-semibold text-black">
      <RenderHTML html={caption} />
    </p>
  );
}

function getHorizontalImageTextGroupsImageProps(block: ResearchPageBlock) {
  return {
    imgTitle: block?.img_title ?? '',
    caption: block?.caption ?? '',
    width: block?.width ?? 300,
    height: block?.height ?? 200,
  };
}

function renderHorizontalImageTextGroupsImageSection(block: ResearchPageBlock) {
  const src = block?.img_src;
  if (!src) return null;
  const { imgTitle, caption, width, height } = getHorizontalImageTextGroupsImageProps(block);
  return (
    <div className="flex flex-col space-y-3">
      <div className="relative">
        <NextImage src={src} alt={imgTitle} title={imgTitle} width={width} height={height} />
        {renderHorizontalImageTextGroupsCaption(caption)}
      </div>
    </div>
  );
}

function renderHorizontalImageTextGroupsBlocksSection(
  block: ResearchPageBlock,
  platform: string,
  renderBlock: (b: ResearchPageBlock, i: number, p: string) => React.ReactNode | null
) {
  if (!block?.blocks) return null;
  return (
    <div className="flex flex-col space-y-3">
      {block.blocks.map((b: ResearchPageBlock, blockIndex: number) =>
        renderBlock(b, blockIndex, platform)
      )}
    </div>
  );
}

export const renderHorizontalImageTextGroupsBlock: BlockRendererFn = (
  block,
  index,
  platform,
  renderBlock
) => {
  return (
    <div
      key={index}
      className="my-6"
      id={`research-page-horizontal_image_text_groups-${index + 1}`}
    >
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
        {renderHorizontalImageTextGroupsImageSection(block)}
        {renderHorizontalImageTextGroupsBlocksSection(block, platform, renderBlock)}
      </div>
    </div>
  );
};

export const MEDIA_BLOCKS: Record<string, BlockRendererFn> = {
  image: renderImageBlock,
  image_dynamic: renderImageDynamicBlock,
  horizontal_image: renderHorizontalImageBlock,
  image_with_text: renderImageWithTextBlock,
  horizontal_image_text_groups: renderHorizontalImageTextGroupsBlock,
};
