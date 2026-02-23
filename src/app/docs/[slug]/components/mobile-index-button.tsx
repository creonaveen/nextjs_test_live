'use client';

import { Button } from 'investtech/external-components';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from 'investtech/external-components';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import RelatedPosts from '@/components/custom-components/related-posts';
import { useScrollDirection } from '@/lib/hooks/use-scroll-direction';
import { RelatedPost } from '@/lib/types/research-page';
import TableOfContents from '@/components/custom-components/table-of-contents';

interface MobileIndexButtonProps {
  sections?: { id?: string | number; title: string }[];
  relatedPosts?: RelatedPost[];
}

export default function MobileIndexButton({ sections, relatedPosts }: MobileIndexButtonProps) {
  const { isVisible } = useScrollDirection();
  const [open, setOpen] = useState(false);
  const t = useTranslations('common');

  return (
    <div
      className={`transition-transform duration-300 md:hidden ${
        isVisible ? 'translate-y-0' : 'translate-y-24'
      }`}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            className="bg-accent rounded-full px-7 py-3 text-sm font-medium text-white shadow-lg"
            id="mobile-index-button-trigger"
          >
            {sections && sections.length > 0 ? t('index') : t('moreReports')}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-full rounded-none p-4">
          <SheetTitle className="uppercase">
            {sections && sections.length > 0 ? t('index') : t('moreReports')}
          </SheetTitle>
          <div className="overflow-y-auto">
            {sections && sections.length > 0 ? (
              <TableOfContents
                sections={sections}
                beforeScroll={() => {
                  return new Promise<void>((resolve) => {
                    setOpen(false);
                    window.setTimeout(() => resolve(), 350);
                  });
                }}
              />
            ) : (
              <RelatedPosts relatedPosts={relatedPosts || []} />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
