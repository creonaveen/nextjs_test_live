'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'investtech/external-components';
import { StarIcon } from 'lucide-react';
import React from 'react';

const ICON_SIZE = 28;
const ICON_CLASS =
  'text-grey-500 dark:text-grey-400 hover:text-primary dark:hover:text-primary-text-hover dark:active:text-primary-text-active active:text-primary-text-active hover:bg-grey-100 dark:hover:bg-accent-1/50 ml-auto shrink-0 cursor-pointer rounded-full p-1.25';
const ICON_CLASS_ACTIVE = 'text-primary dark:text-primary';

export function RatingIconDialog({
  rating,
  className,
  children,
}: {
  rating: number;
  className?: string;
  children?: React.ReactNode;
}): React.JSX.Element {
  const iconClassName = rating > 0 ? `${ICON_CLASS} ${ICON_CLASS_ACTIVE}` : ICON_CLASS;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`flex cursor-pointer items-center gap-1 rounded-full border-none bg-transparent p-0 ${className ?? ''}`}
          aria-label={`Rating: ${rating}. Open rating details`}
        >
          <StarIcon size={ICON_SIZE} className={iconClassName} aria-hidden />
          {rating}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rating</DialogTitle>
        </DialogHeader>
        {children ?? (
          <p className="text-grey-600 dark:text-grey-300 text-sm">
            Rating: {rating}. Add custom content via the children prop.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
