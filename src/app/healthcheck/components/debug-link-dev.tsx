// Debug: Health check test links - only for debugging & testing purposes -- use for development only

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
import { Link } from '@/components/link';

import { TestLinks, TestLinkSection } from '@/lib/types/health-check';
import { TestLink } from '@/lib/types/health-check';

function DebugLinks({
  link,
  setIsDebugDialogOpen,
}: {
  link: TestLinkSection;
  setIsDebugDialogOpen: (open: boolean) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {link?.links?.map((testLink: TestLink) => (
        <Link
          key={testLink.label}
          href={testLink.url}
          onClick={() => setIsDebugDialogOpen(false)}
          className="border-border/60 bg-background text-foreground hover:bg-muted hover:text-primary inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:underline"
        >
          {testLink.label}
        </Link>
      ))}
    </div>
  );
}

export function DebugLinkDev({
  data,
  isDebugDialogOpen,
  setIsDebugDialogOpen,
}: {
  data: TestLinks;
  isDebugDialogOpen: boolean;
  setIsDebugDialogOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={isDebugDialogOpen} onOpenChange={setIsDebugDialogOpen}>
      <DialogTrigger asChild>
        <Button id="healthcheck-debug-info" variant="link" className="px-0 pl-0 text-sm">
          Debug: Health check test links
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-hidden sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Debug: Health check test links</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-muted-foreground max-h-[calc(80vh-6rem)] space-y-4 overflow-y-auto pr-1 text-sm">
          {data && data.length > 0 ? (
            data.map((link) => (
              <div
                key={link.section_title}
                className="border-border/60 bg-muted/30 rounded-md border p-3"
              >
                <div className="text-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
                  {link.section_title}
                </div>
                <DebugLinks link={link} setIsDebugDialogOpen={setIsDebugDialogOpen} />
              </div>
            ))
          ) : (
            <div className="border-border/60 bg-muted/20 rounded-md border border-dashed p-4 text-center">
              No test links available.
            </div>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
