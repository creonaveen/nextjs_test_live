'use client';
import NextLink from 'next/link';
import Image from 'next/image';
import React from 'react';
import { ResearchPageBlock, FlexibleImageBlock } from '@/lib/types/research-page';
import { RenderHTML } from '@/utils/create-mark-up';
import SvgRenderer from '@/components/custom-components/svg-renderer';

function getLinkBlockHref(block: ResearchPageBlock): string {
  return (block.href ?? block.src ?? block.links ?? '') as string;
}

function getLinkBlockText(block: ResearchPageBlock): string {
  return (block.text ?? block.links ?? '') as string;
}

function getLinkBlockImageChild(
  block: ResearchPageBlock,
  children: ResearchPageBlock[]
): FlexibleImageBlock | ResearchPageBlock | undefined {
  if (block.image) return block.image;
  return children.find((c): c is ResearchPageBlock => c?.type === 'image');
}

function getLinkBlockDynamicImageChild(
  block: ResearchPageBlock,
  children: ResearchPageBlock[]
): FlexibleImageBlock | ResearchPageBlock | undefined {
  if (block.image_dynamic) return block.image_dynamic;
  return children.find((c): c is ResearchPageBlock => c?.type === 'image_dynamic');
}

type LinkBlockImageChild = FlexibleImageBlock | ResearchPageBlock;

function renderLinkBlockImageContent(imageChild: LinkBlockImageChild, imageSrc: string) {
  return (
    <div className="flex items-center justify-start">
      <Image
        src={imageSrc}
        alt={imageChild.alt ?? 'image'}
        width={Number(imageChild.width) || 1000}
        height={Number(imageChild.height) || 1000}
      />
    </div>
  );
}

function renderLinkBlockSvgContent(
  block: ResearchPageBlock,
  index: number,
  dynamicImageChild: LinkBlockImageChild
) {
  return (
    <div className="flex items-center justify-start">
      <SvgRenderer
        testId={`research-page-link-${index + 1}`}
        alt={dynamicImageChild?.alt ?? 'image'}
        className="mt-2 max-w-[500px] md:max-w-full"
        chart_params={dynamicImageChild.chart_param ?? ''}
        chart_tooltip_id={block?.chart_tooltip_id ?? -1}
      />
    </div>
  );
}

function shouldShowLinkBlockImage(
  imageChild: LinkBlockImageChild | undefined,
  imageSrc: string,
  dynamicImageChild: LinkBlockImageChild | undefined
): boolean {
  return Boolean(imageChild && imageSrc && !dynamicImageChild);
}

function renderLinkBlockContent(
  block: ResearchPageBlock,
  index: number,
  data: {
    href: string;
    text: string;
    imageChild: LinkBlockImageChild | undefined;
    dynamicImageChild: LinkBlockImageChild | undefined;
    imageSrc: string;
  }
) {
  const { imageChild, dynamicImageChild, imageSrc, text } = data;
  if (shouldShowLinkBlockImage(imageChild, imageSrc, dynamicImageChild)) {
    return renderLinkBlockImageContent(imageChild!, imageSrc);
  }
  if (dynamicImageChild) {
    return renderLinkBlockSvgContent(block, index, dynamicImageChild);
  }
  return <RenderHTML html={text} />;
}

export function renderIframeBlock(block: ResearchPageBlock, index: number) {
  const { width, height, src, allowfullscreen } = block.attributes || {};
  const widthStr = typeof width === 'string' ? width : '';
  const heightStr = typeof height === 'string' ? height : '';
  const srcStr = typeof src === 'string' ? src : '';
  const allowfullscreenStr = typeof allowfullscreen === 'string' ? allowfullscreen : '';
  const aspectRatio =
    widthStr && heightStr ? (parseInt(heightStr) / parseInt(widthStr)) * 100 : 56.25;
  return (
    <div
      key={index}
      className="iframe-aspect-ratio relative w-full"
      id={`research-page-iframe-${index + 1}`}
      style={{ '--iframe-padding-top': `${aspectRatio}%` } as React.CSSProperties}
    >
      <iframe
        src={srcStr || ''}
        title={block.title || 'iframe'}
        frameBorder="0"
        allowFullScreen={allowfullscreenStr === 'allowfullscreen'}
        className="absolute top-0 left-0 h-full w-full"
      />
    </div>
  );
}

export function renderLinkBlock(block: ResearchPageBlock, index: number) {
  const href = getLinkBlockHref(block);
  const text = getLinkBlockText(block);
  const children = Array.isArray(block.children) ? block.children.flat(Infinity) : [];
  const imageChild = getLinkBlockImageChild(block, children);
  const dynamicImageChild = getLinkBlockDynamicImageChild(block, children);
  const imageSrc = (imageChild?.src ?? href ?? '') as string;
  const linkClassName = `text-primary text-sm font-normal ${block?.attributes?.class ?? ''}`;

  return (
    <div key={index} id={`research-page-link-${index + 1}`}>
      {block.title && (
        <h1 className="dark:text-grey-200 text-primary mb-2 font-medium">{block.title}</h1>
      )}
      <NextLink href={href} className={linkClassName}>
        {renderLinkBlockContent(block, index, {
          href,
          text,
          imageChild,
          dynamicImageChild,
          imageSrc,
        })}
      </NextLink>
    </div>
  );
}
