'use client';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'investtech/external-components';
import { Card, CardContent } from 'investtech/external-components';
import { Table, TableBody } from 'investtech/external-components';
import { getArrowTextColor, getCardColorClass } from '@/lib/utils';
import { RenderHTML } from '@/utils/create-mark-up';
import { renderResearchBoxTableRow } from '../shared-research-box-table';
import { renderResearchBoxRelatedStocksCard } from './research-box-related-stocks';
import type { BlockRendererFn } from '../block-types';
import { RelatedStock } from '@/lib/types/research-page';
function renderResearchBoxArrowCard(
  block: { content?: { arrow_image?: { src: string }; sign?: string; arrow_text?: string } },
  index: number
) {
  const src = block.content?.arrow_image?.src;
  if (!src) return null;
  const sign = block.content?.sign ?? 0;
  const cardClass = getCardColorClass(sign ?? 0);
  const textClass = getArrowTextColor(sign as unknown as number);
  return (
    <Card className={cardClass}>
      <CardContent>
        <div className="flex items-center justify-center gap-2">
          <Image
            src={src}
            width={70}
            height={70}
            alt="arrow"
            id={`research-page-research-box-arrow-image-${index + 1}`}
          />
          <span
            className={`text-4xl font-bold whitespace-nowrap ${textClass}`}
            id={`research-page-research-box-arrow-text-${index + 1}`}
          >
            {block.content?.arrow_text}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
function renderResearchBoxTableCard(
  block: { content?: { table?: { data: unknown[] } } },
  index: number
) {
  const table = block.content?.table;
  if (!table) return null;
  return (
    <Card>
      <CardContent>
        <Table className="table-auto" id={`research-page-research-box-table-${index + 1}`}>
          <TableBody>
            {table.data.map((row: unknown, i: number) => renderResearchBoxTableRow(row, i, index))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
function renderResearchBoxReadMore(
  readMore: { label?: string; href?: string; anchor_text?: string },
  index: number
) {
  return (
    <>
      <h3
        className="text-2xl font-medium"
        id={`research-page-research-box-read-more-label-${index + 1}`}
      >
        {readMore.label}
      </h3>
      <NextLink
        href={readMore.href ?? ''}
        className="text-primary text-sm font-normal underline"
        id={`research-page-research-box-read-more-anchor-text-${index + 1}`}
      >
        {readMore.anchor_text}
      </NextLink>
    </>
  );
}

function getResearchBoxCardContentFlags(block: {
  content?: {
    text?: string;
    summary?: string;
    read_more?: { label?: string; href?: string; anchor_text?: string };
  };
}) {
  const content = block.content;
  return {
    content,
    hasText: Boolean(content?.text),
    hasSummary: Boolean(content?.summary),
    hasReadMore: Boolean(content?.read_more),
  };
}

function renderResearchBoxTextAndSummary(
  content: { text?: string; summary?: string } | undefined,
  index: number,
  hasText: boolean,
  hasSummary: boolean
) {
  return (
    <>
      {hasText && (
        <span className="text-sm font-normal" id={`research-page-research-box-text-${index + 1}`}>
          {content?.text}{' '}
        </span>
      )}
      {hasSummary && (
        <p
          className="text-grey-800 dark:text-grey-200 text-sm font-normal italic"
          id={`research-page-research-box-summary-${index + 1}`}
        >
          {content?.summary}
        </p>
      )}
    </>
  );
}

function renderResearchBoxCardContent(
  block: {
    content?: {
      text?: string;
      summary?: string;
      read_more?: { label?: string; href?: string; anchor_text?: string };
    };
  },
  index: number
) {
  const { content, hasText, hasSummary, hasReadMore } = getResearchBoxCardContentFlags(block);
  const arrowBlock = {
    content: block.content as {
      arrow_image?: { src: string };
      sign?: string;
      arrow_text?: string;
    },
  };
  const tableBlock = { content: block.content as { table?: { data: unknown[] } } };
  const relatedBlock = {
    content: block.content as {
      related_stocks_title?: string;
      related_stocks_text?: string;
      related_stocks?: RelatedStock[];
    },
  };
  return (
    <>
      {renderResearchBoxArrowCard(arrowBlock, index)}
      {renderResearchBoxTextAndSummary(content, index, hasText, hasSummary)}
      {renderResearchBoxTableCard(tableBlock, index)}
      {hasReadMore && content?.read_more && renderResearchBoxReadMore(content.read_more, index)}
      {renderResearchBoxRelatedStocksCard(relatedBlock, index)}
    </>
  );
}

export const renderResearchBoxBlock: BlockRendererFn = (block, index) => {
  const content = block.content;
  const defaultValue = block.collapsed === false ? `item-${index}` : undefined;
  const title = content?.title || `Section ${index + 1}`;
  return (
    <div
      key={index}
      className="border-grey-300 my-6 border-t"
      id={`research-page-research-box-${index + 1}`}
    >
      <Accordion
        id={`research-page-research-box-accordion-${index + 1}`}
        type="single"
        collapsible
        className="w-full"
        defaultValue={defaultValue}
      >
        <AccordionItem value={`item-${index}`}>
          <div className="custom-accordion-trigger">
            <AccordionTrigger
              className="font-headline cursor-pointer text-left text-2xl font-medium"
              id={`research-page-research-box-accordion-trigger-${index + 1}`}
            >
              <RenderHTML html={title} />
            </AccordionTrigger>
          </div>
          <AccordionContent className="flex items-center justify-center pt-2">
            <Card
              className="bg-grey-50 dark:bg-grey-900 mb-3 w-[280px] space-y-3 p-6 sm:w-[500px] md:w-full"
              id={`research-page-research-box-card-${index + 1}`}
            >
              {renderResearchBoxCardContent(block, index)}
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export const RESEARCH_BOX_BLOCKS: Record<string, BlockRendererFn> = {
  research_box: renderResearchBoxBlock,
};
