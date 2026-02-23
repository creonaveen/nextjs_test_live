'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'investtech/external-components';
import { Rows3 } from 'lucide-react';
import React from 'react';

import {
  BOTTOM_SHEET_CLASS,
  ICON_SHEET_CLASS,
  ICON_SHEET_CLASS_ACTIVE,
  ICON_SHEET_SIZE,
  useResponsiveSheet,
} from '../../utils/icon-sheet-shared';

export function PortfolioIconSheet({
  highlight,
  children,
}: {
  highlight?: boolean;
  children?: React.ReactNode;
} = {}): React.JSX.Element {
  const isDesktop = useResponsiveSheet();
  const iconClassName = highlight
    ? `${ICON_SHEET_CLASS} ${ICON_SHEET_CLASS_ACTIVE}`
    : ICON_SHEET_CLASS;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 rounded-full border-none bg-transparent p-0"
          aria-label="Open portfolio"
        >
          <Rows3 size={ICON_SHEET_SIZE} className={iconClassName} aria-hidden />
        </button>
      </SheetTrigger>
      <SheetContent
        side={isDesktop ? 'right' : 'bottom'}
        className={isDesktop ? undefined : BOTTOM_SHEET_CLASS}
      >
        <SheetHeader className="mb-4 py-0">
          <SheetTitle>Portfolio</SheetTitle>
        </SheetHeader>
        {children ?? (
          <p className="text-grey-600 dark:text-grey-300 text-sm">No portfolio content.</p>
        )}
      </SheetContent>
    </Sheet>
  );
}
