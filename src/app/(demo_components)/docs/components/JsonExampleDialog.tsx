'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'investtech/external-components';
import { Braces } from 'lucide-react';

/**
 * Props for the CodeExampleDialog component
 */
interface JsonExampleDialogProps {
  /** The title of the dialog */
  title: string;
  /** The description shown in the dialog header */
  description: string;
  /** The JSON example to display */
  json: string;
}

/**
 * A dialog component that displays code examples in a scrollable container.
 * Used throughout the demo components page to show usage examples.
 *
 * @param props - The component props
 * @returns A dialog with code example display
 */
export function JsonExampleDialog({ title, description, json }: JsonExampleDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center justify-center rounded-full border border-gray-200 p-1">
          <Braces className="h-5 w-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div
          className="bg-muted h-[500px] w-full overflow-auto rounded-md p-4"
          role="region"
          aria-label="Code example"
        >
          <pre className="text-sm">
            <code>{json}</code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}
