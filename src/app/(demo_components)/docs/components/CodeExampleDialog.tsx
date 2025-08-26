'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface CodeExampleDialogProps {
  title: string;
  description: string;
  code: string;
  triggerText?: string;
}

export function CodeExampleDialog({
  title,
  description,
  code,
  triggerText = 'View Example Code',
}: CodeExampleDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="bg-muted h-[500px] w-full overflow-scroll rounded-md p-4">
          <pre className="text-sm">{code}</pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}
