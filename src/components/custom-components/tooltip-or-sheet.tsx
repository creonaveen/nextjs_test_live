import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'investtech/external-components';
import { Tooltip, TooltipContent, TooltipTrigger } from 'investtech/external-components';
import * as React from 'react';

import { usePlatform } from '@/lib/platform';
import { RenderHTML } from '@/utils/create-mark-up';

/**
 * Props for TooltipOrSheet component
 */
interface TooltipOrSheetProps {
  id?: string;
  /** Optional title to display */
  title?: string | React.ReactNode;
  /** Text content to display (can be HTML string or React node) */
  text: string | React.ReactNode;
  /** Element that triggers the tooltip/sheet */
  triggerElement: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether to render text as HTML (requires text to be string) */
  useHtml?: boolean;
}

/**
 * TooltipOrSheet - Platform-aware tooltip/sheet component
 *
 * Automatically switches between Tooltip (desktop) and Sheet (mobile) based on platform.
 * Provides consistent UX across different device types.
 *
 * @example
 * ```tsx
 * <TooltipOrSheet
 *   title="Help"
 *   text="This is helpful information"
 *   triggerElement={<Button>?</Button>}
 *   useHtml={false}
 * />
 * ```
 */
function DesktopTooltip({
  id,
  title,
  text,
  triggerElement,
  className,
  useHtml,
}: TooltipOrSheetProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild id={`tooltip-trigger-${id}`}>
        {triggerElement}
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={8}
        align="center"
        className={`tooltip-content-scrollbar-hide z-10002 max-w-[400px] overflow-y-auto p-4 text-left leading-relaxed font-medium whitespace-pre-line ${className}`}
        id={`tooltip-content-${id}`}
      >
        <div className={`flex flex-col ${title && 'gap-2'}`}>
          <span className="text-sm font-semibold">{title}</span>
          {useHtml ? <RenderHTML html={text as string} /> : text}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function MobileSheet({ id, title, text, triggerElement, useHtml }: TooltipOrSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild onClick={(e) => e.stopPropagation()} id={`sheet-trigger-${id}`}>
        {triggerElement}
      </SheetTrigger>
      <SheetContent
        className="mt-4 px-5 pt-5 pb-[48px]"
        onClick={(e) => e.stopPropagation()}
        side="bottom"
        id={`sheet-content-${id}`}
      >
        <SheetHeader className="mb-4 py-0">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <SheetDescription className="space-y-2">
          {useHtml ? <RenderHTML html={text as string} /> : text}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

export const TooltipOrSheet = React.memo(function TooltipOrSheet(props: TooltipOrSheetProps) {
  const platform = usePlatform();
  return (
    <div>{platform === 'desktop' ? <DesktopTooltip {...props} /> : <MobileSheet {...props} />}</div>
  );
});
