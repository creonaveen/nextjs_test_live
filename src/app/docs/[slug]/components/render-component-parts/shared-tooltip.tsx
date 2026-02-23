'use client';
import NextImage from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from 'investtech/external-components';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'investtech/external-components';
import { RenderHTML } from '@/utils/create-mark-up';
import { usePlatform } from '@/lib/platform';

export interface TooltipItem {
  img?: string;
  text?: string;
}

export interface TooltipContentObject {
  text?: string;
  [key: string]: unknown;
}

export interface ListContentItem {
  type?: string;
  text?: string;
  content?: ListContentItem[];
  [key: string]: unknown;
}

function isTooltipItem(item: unknown): item is TooltipItem {
  return typeof item === 'object' && item !== null && ('img' in item || 'text' in item);
}

function hasTextProperty(obj: unknown): obj is TooltipContentObject {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'text' in obj &&
    typeof (obj as TooltipContentObject).text === 'string'
  );
}

export const renderTooltipContent = (content: unknown): React.ReactNode => {
  if (content === null || content === undefined) return '';

  if (typeof content === 'string' || typeof content === 'number') {
    return <RenderHTML html={String(content)} />;
  }

  if (Array.isArray(content)) {
    return (
      <div className="flex flex-col gap-1">
        {content.map((item, i) => {
          if (isTooltipItem(item)) {
            return (
              <div key={i} className="flex items-center gap-2">
                {item.img && (
                  <NextImage
                    src={item.img}
                    alt={item.text || 'image'}
                    width={50}
                    height={50}
                    className="rounded-sm"
                  />
                )}
                {item.text && <RenderHTML html={item.text} />}
              </div>
            );
          }
          return (
            <span key={i} className="truncate">
              {String(item)}
            </span>
          );
        })}
      </div>
    );
  }

  if (typeof content === 'object') {
    if (hasTextProperty(content) && content.text) {
      return <RenderHTML html={content.text} />;
    }
    try {
      return <span>{JSON.stringify(content)}</span>;
    } catch {
      return <span />;
    }
  }

  return <span>{String(content)}</span>;
};

function useOverflowRef(children: React.ReactNode, content: unknown) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const el = textRef.current;
        setIsOverflowing(el.scrollWidth > el.clientWidth);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [content]);

  const childrenWithRef = React.cloneElement(
    children as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>,
    { ref: textRef }
  );
  return { isOverflowing, childrenWithRef };
}

function OverflowTooltipDesktop({
  content,
  children,
}: {
  content: unknown;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={10}
        align="start"
        className="tooltip-content-scrollbar-hide max-w-[400px] overflow-x-hidden overflow-y-auto text-left leading-relaxed break-words whitespace-pre-line"
      >
        {renderTooltipContent(content)}
      </TooltipContent>
    </Tooltip>
  );
}

function OverflowSheetMobile({
  content,
  children,
}: {
  content: unknown;
  children: React.ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </SheetTrigger>
      <SheetContent
        className="mt-4 px-5 pt-5 pb-[48px]"
        onClick={(e) => e.stopPropagation()}
        side="bottom"
      >
        <SheetHeader className="mb-4 py-0">
          <SheetTitle>Details</SheetTitle>
        </SheetHeader>
        <SheetDescription className="space-y-2">{renderTooltipContent(content)}</SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

export function ConditionalTooltip({
  children,
  content,
}: {
  children: React.ReactNode;
  content: unknown;
}) {
  const { isOverflowing, childrenWithRef } = useOverflowRef(children, content);
  const platform = usePlatform();

  if (!isOverflowing) return childrenWithRef;
  if (platform === 'desktop') {
    return <OverflowTooltipDesktop content={content}>{childrenWithRef}</OverflowTooltipDesktop>;
  }
  return <OverflowSheetMobile content={content}>{childrenWithRef}</OverflowSheetMobile>;
}
