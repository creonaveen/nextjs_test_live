'use client';
import { Link as NextLink } from '@/components/link';
import React from 'react';
import { ResearchPageBlock } from '@/lib/types/research-page';
import { RenderHTML } from '@/utils/create-mark-up';

function renderParagraphUrlTitle(text: string): React.ReactNode | null {
  if (!text.includes(' - ')) return null;
  const [url, title] = text.split(' - ');
  if (!url.trim().startsWith('http')) return null;
  return (
    <NextLink
      href={url.trim()}
      rel="noopener noreferrer"
      className="text-primary font-normal break-words underline"
    >
      {title.trim()}
    </NextLink>
  );
}

function renderParagraphWithLinkTags(text: string): React.ReactNode {
  const regex = /<link\s+href="([^"]+)">(.*?)<\/link>/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const [, href, linkText] = match;
    if (match.index > lastIndex) {
      parts.push(<RenderHTML key={lastIndex} html={text.slice(lastIndex, match.index)} />);
    }
    parts.push(
      <NextLink key={href + match.index} href={href} className="text-primary underline">
        {linkText}
      </NextLink>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(<RenderHTML key={lastIndex + '_end'} html={text.slice(lastIndex)} />);
  }
  return <>{parts}</>;
}

export function renderParagraphBlockContent(block: ResearchPageBlock): React.ReactNode {
  const urlTitle = block.text ? renderParagraphUrlTitle(block.text) : null;
  if (urlTitle) return urlTitle;
  if (block.text?.includes('\n')) {
    const lines = block.text.split(/\r?\n/);
    return lines.map((line, i) => (
      <React.Fragment key={i}>
        <RenderHTML html={line.trim()} />
        {i < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  }
  if (block.subs && block.subs.length > 0) {
    return block.subs.map((sub, subIndex: number) => {
      if (sub.type === 'text') return <RenderHTML key={subIndex} html={sub.text} />;
      if (sub.type === 'link' && sub.link) {
        return (
          <NextLink key={subIndex} href={sub.link} className="text-primary underline">
            {sub.link_title || sub.link}
          </NextLink>
        );
      }
      return null;
    });
  }
  if (block.text?.includes('<link')) return renderParagraphWithLinkTags(block.text);
  return <RenderHTML html={block.text || ''} />;
}
