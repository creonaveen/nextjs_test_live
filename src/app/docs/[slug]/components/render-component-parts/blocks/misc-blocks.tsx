'use client';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'investtech/external-components';
import { Card } from 'investtech/external-components';
import { ResearchPageBlock } from '@/lib/types/research-page';
import { RenderHTML } from '@/utils/create-mark-up';
import { renderIframeBlock, renderLinkBlock } from '../shared-link-iframe';
import type { BlockRendererFn } from '../block-types';

export const renderAccordionBlock: BlockRendererFn = (block, index, platform, renderBlock) => {
  return (
    <div
      key={index}
      className="border-grey-300 my-6 border-t"
      id={`research-page-accordion-${index + 1}`}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger
            className="font-headline cursor-pointer text-left text-lg font-semibold"
            id={`research-page-accordion-trigger-${index + 1}`}
          >
            <RenderHTML html={block.text || `Section ${index + 1}`} />
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <Card className="space-y-3">
              {block.blocks?.map((contentBlock: ResearchPageBlock, contentIndex: number) => {
                return renderBlock(contentBlock, contentIndex, platform);
              })}
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export const renderIframeBlockHandler: BlockRendererFn = (block, index) => {
  return renderIframeBlock(block, index);
};

export const renderMetricBlock: BlockRendererFn = (block, index) => {
  return (
    <div key={index} className="px-3" id={`research-page-metric-${index + 1}`}>
      <div className="flex flex-col gap-4">
        <div key={index} className="bg-card rounded-lg border p-4 text-center shadow-sm">
          <div className="text-primary mb-2 text-2xl font-bold">
            <RenderHTML html={block.metric?.value || ''} />
          </div>
          <div className="text-muted-foreground text-sm font-medium">{block.title}</div>
        </div>
        {block.text && (
          <div className="mt-1 text-sm font-light">
            <RenderHTML html={block.metric?.label || ''} />
          </div>
        )}
      </div>
    </div>
  );
};

export const renderHyperlinkBlock: BlockRendererFn = (block, index) => {
  return (
    <div key={index} className="px-3" id={`research-page-hyperlink-${index + 1}`}>
      {block.title && <h1 className="dark:text-grey-200 font-medium text-black">{block.title}</h1>}
      <NextLink href={block.src || ''} className="text-primary mb-2 text-sm font-bold">
        <RenderHTML html={block.text || ''} />
      </NextLink>
    </div>
  );
};

export const renderHyperlinksBlock: BlockRendererFn = (block, index) => {
  return (
    <div key={index} className="px-3" id={`research-page-hyperlinks-${index + 1}`}>
      {block.title && <h1 className="dark:text-grey-200 font-medium text-black">{block.title}</h1>}
      <ul>
        {block.links?.map((link, linkIndex: number) => (
          <li key={linkIndex}>
            <NextLink href={link.url} className="text-primary mb-2 text-sm font-bold">
              <RenderHTML html={link.text} />
            </NextLink>{' '}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const renderLinkBlockHandler: BlockRendererFn = (block, index) => {
  return renderLinkBlock(block, index);
};

export const renderSvgBlock: BlockRendererFn = (block, index) => {
  return (
    <div key={index} className="px-3" id={`research-page-svg-${index + 1}`}>
      svg:
      <RenderHTML html={block.svg || ''} />
    </div>
  );
};

function renderHorizontalTextImageGroupsBlocksCol(
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

function renderHorizontalTextImageGroupsCaption(caption: string) {
  if (caption.length === 0) return null;
  return (
    <p className="dark:text-grey-200 mt-2 text-start text-sm font-semibold text-black">
      <RenderHTML html={caption} />
    </p>
  );
}

function getHorizontalTextImageGroupsImageProps(block: ResearchPageBlock) {
  return {
    imgTitle: block?.img_title ?? '',
    caption: block?.caption ?? '',
    width: block?.width ?? 300,
    height: block?.height ?? 200,
  };
}

function renderHorizontalTextImageGroupsImageCol(block: ResearchPageBlock) {
  const src = block?.img_src;
  if (!src) return null;
  const { imgTitle, caption, width, height } = getHorizontalTextImageGroupsImageProps(block);
  return (
    <div className="flex flex-col space-y-3">
      <div className="relative">
        <NextImage src={src} alt={imgTitle} title={imgTitle} width={width} height={height} />
        {renderHorizontalTextImageGroupsCaption(caption)}
      </div>
    </div>
  );
}

export const renderHorizontalTextImageGroupsBlock: BlockRendererFn = (
  block,
  index,
  platform,
  renderBlock
) => {
  return (
    <div
      key={index}
      className="my-6"
      id={`research-page-horizontal_text_image_groups-${index + 1}`}
    >
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
        {renderHorizontalTextImageGroupsBlocksCol(block, platform, renderBlock)}
        {renderHorizontalTextImageGroupsImageCol(block)}
      </div>
    </div>
  );
};

export const MISC_BLOCKS: Record<string, BlockRendererFn> = {
  accordion: renderAccordionBlock,
  iframe: renderIframeBlockHandler,
  metric: renderMetricBlock,
  hyperlink: renderHyperlinkBlock,
  hyperlinks: renderHyperlinksBlock,
  link: renderLinkBlockHandler,
  svg: renderSvgBlock,
  horizontal_text_image_groups: renderHorizontalTextImageGroupsBlock,
};
