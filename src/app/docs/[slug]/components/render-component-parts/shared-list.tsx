'use client';
import { Link } from '@/components/link';
import React from 'react';
import { Link as NextLink } from '@/components/link';
import { RenderHTML } from '@/utils/create-mark-up';
import type { ListContentItem } from './shared-tooltip';

function getListItems(items: unknown[]) {
  return (items ?? []).filter(
    (i): i is { type: string; text?: string; content?: unknown } =>
      typeof i === 'object' &&
      i !== null &&
      'type' in i &&
      (i as { type: string }).type === 'list_item'
  );
}

function renderListContentLink(content: ListContentItem, idx: number) {
  const href = typeof content.href === 'string' ? content.href : '';
  const isExternal = href.startsWith('http') || href.startsWith('https');
  if (isExternal) {
    return (
      <Link
        key={idx}
        href={href}
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 inline underline"
      >
        {content.text}
      </Link>
    );
  }
  return (
    <NextLink key={idx} href={href} className="text-primary hover:text-primary/80 inline underline">
      {content.text}
    </NextLink>
  );
}

function renderSingleContent(content: ListContentItem, key: number): React.ReactNode {
  if (!content) return null;

  if (content.type === 'paragraph' && content.text) {
    return <RenderHTML key={key} html={content.text} />;
  }

  if (content.type === 'span' && content.text) {
    return (
      <span key={key} className="inline">
        <RenderHTML html={content.text} />
      </span>
    );
  }

  if (content.type === 'link') {
    return renderListContentLink(content, key);
  }

  if (content.type === 'list') {
    return renderListBlock(content as Extract<ListContentItem, { type: 'list' }>, key);
  }

  return content.text ? <RenderHTML key={key} html={content.text} /> : null;
}

function renderListBlock(content: Extract<ListContentItem, { type: 'list' }>, key: number) {
  const ListTag = (content as { ordered?: boolean }).ordered ? 'ol' : 'ul';
  const listClass = (content as { ordered?: boolean }).ordered
    ? 'ml-4 list-inside list-decimal space-y-2 text-sm font-normal'
    : 'ml-4 list-inside list-disc space-y-2 text-sm font-normal';

  const items = getListItems((content as { items?: unknown[] }).items ?? []);

  return (
    <ListTag key={key} className={listClass}>
      {items.map((item, idx) => (
        <li key={idx}>
          {item.text ? (
            <RenderHTML html={item.text} />
          ) : (
            renderListContent(item.content as ListContentItem[] | undefined)
          )}
        </li>
      ))}
    </ListTag>
  );
}

export function renderListContent(contents?: ListContentItem[]): React.ReactNode {
  if (!contents) return null;

  return contents.map((content, idx) => {
    if (Array.isArray(content)) {
      return (
        <span key={idx} className="inline">
          {renderListContent(content)}
        </span>
      );
    }

    return renderSingleContent(content, idx);
  });
}
