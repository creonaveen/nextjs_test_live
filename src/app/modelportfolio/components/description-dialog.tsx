'use client';

import { Button } from 'investtech/external-components';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'investtech/external-components';
import React from 'react';

interface PopupData {
  title?: string;
  text?: string;
  trigger_text?: string;
  popup_text?: string;
}

interface DescriptionDialogProps {
  popup?: PopupData;
  children?: React.ReactNode;
  title?: string;
}

/**
 * Dialog component for displaying description popups
 *
 * @param popup - Popup data containing title, text, and trigger information
 * @param children - Optional custom trigger element
 * @param title - Fallback title if popup title is not provided
 */
export default function DescriptionDialog({ popup, children, title }: DescriptionDialogProps) {
  if (!popup) return null;

  return (
    <Dialog>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()} id="description-dialog-trigger">
        {children || (
          <Button variant="ghost" className="px-0 pl-0 text-sm font-light">
            {popup.trigger_text}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        id="description-dialog-content"
        onClick={(e) => e.stopPropagation()}
        className="gap-6 sm:max-w-md"
        aria-describedby={undefined}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-normal">
            {popup?.title ? popup.title : title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="font-light">
          {popup?.popup_text ? popup.popup_text : popup.text}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
