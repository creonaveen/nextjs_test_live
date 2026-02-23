'use client';
import NextLink from 'next/link';
import React from 'react';
import { ResearchPageBlock } from '@/lib/types/research-page';
import { RenderHTML } from '@/utils/create-mark-up';
import { renderParagraphBlockContent } from '../shared-paragraph';
import { renderListContent } from '../shared-list';
import type { ListContentItem } from '../shared-tooltip';
import type { BlockRendererFn } from '../block-types';

function filterListItems(items: unknown[]) {
  return (items ?? []).filter(
    (item): item is { type: string; text?: string; content?: unknown } =>
      typeof item === 'object' &&
      item !== null &&
      'type' in item &&
      (item as { type: string }).type === 'list_item'
  );
}

export const renderParagraphBlock: BlockRendererFn = (block, index) => {
  return (
    <p
      id={`research-page-paragraph-${index + 1}`}
      key={index}
      className={`mb-4 block w-fit items-center space-x-2 text-left text-sm font-normal ${
        block.text_color ? block.text_color : ''
      } ${
        block.background_color ? block.background_color + ' rounded-lg px-2 py-1' : ''
      } ${block?.align ? 'text-' + block.align : ''}`}
    >
      {renderParagraphBlockContent(block)}
    </p>
  );
};

export const renderH3Block: BlockRendererFn = (block, index) => {
  return (
    <h3 key={index} className="mb-3 text-lg font-medium" id={`research-page-heading3-${index + 1}`}>
      <RenderHTML html={block.text || ''} />
    </h3>
  );
};

export const renderH2Block: BlockRendererFn = (block, index) => {
  return (
    <h2 key={index} className="mb-3 text-lg font-medium" id={`research-page-heading2-${index + 1}`}>
      <RenderHTML html={block.text || ''} />
    </h2>
  );
};

export const renderBoldBlock: BlockRendererFn = (block, index) => {
  return (
    <b key={index} className="mt-6 mb-3 text-lg font-bold" id={`research-page-bold-${index + 1}`}>
      <span className="text-primary">
        <RenderHTML html={block.text || ''} />
      </span>
    </b>
  );
};

export const renderDivBlock: BlockRendererFn = (block, index) => {
  return (
    <p key={index} className="px-3 text-sm font-normal" id={`research-page-division-${index + 1}`}>
      <RenderHTML html={block.text || ''} />
    </p>
  );
};

export const renderSpanBlock: BlockRendererFn = (block, index) => {
  return (
    <div key={index} className="my-3 text-sm font-normal" id={`research-page-span-${index + 1}`}>
      {block.content?.blocks ? (
        block.content.blocks.map((child: ResearchPageBlock, idx: number) => {
          if (child.type === 'text') {
            return (
              <p key={idx} className="text-sm font-normal">
                {child.text || ''}
              </p>
            );
          }
          if (child.type === 'link') {
            return (
              <NextLink
                id={`research-page-link-${index + 1}-${idx + 1}`}
                key={idx}
                href={child.href || '#'}
                className="text-primary text-sm font-normal underline"
              >
                {child.text || ''}
              </NextLink>
            );
          }
          return null;
        })
      ) : (
        <span key={index} className="text-sm font-normal">
          <RenderHTML html={block.text || ''} />
        </span>
      )}
    </div>
  );
};

export const renderListBlock: BlockRendererFn = (block, index) => {
  const items = filterListItems((block.items as unknown[]) ?? []);
  return (
    <div className="space-y-2" key={index} id={`research-page-list-${index + 1}`}>
      {block.listCaption && <p className="text-sm font-semibold">{block.listCaption}</p>}
      <div className="mb-4">
        {block.ordered ? (
          <ol
            className="list-inside list-decimal space-y-2 text-sm font-normal"
            id={`research-page-ordered-list-${index + 1}`}
          >
            {items.map((item, idx: number) => (
              <li key={idx} id={`research-page-list-item-${index + 1}-${idx + 1}`}>
                {item.text ? (
                  <RenderHTML html={item.text} />
                ) : (
                  renderListContent(item.content as ListContentItem[] | undefined)
                )}
              </li>
            ))}
          </ol>
        ) : (
          <ul
            className="list-inside list-disc space-y-2 text-sm font-normal"
            id={`research-page-unordered-list-${index + 1}`}
          >
            {items.map((item, idx: number) => (
              <li key={idx} id={`research-page-list-item-${index + 1}-${idx + 1}`}>
                {item.text ? (
                  <RenderHTML html={item.text} />
                ) : (
                  renderListContent(item.content as ListContentItem[] | undefined)
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const TEXT_BLOCKS: Record<string, BlockRendererFn> = {
  paragraph: renderParagraphBlock,
  h3: renderH3Block,
  h2: renderH2Block,
  bold: renderBoldBlock,
  div: renderDivBlock,
  span: renderSpanBlock,
  list: renderListBlock,
};
