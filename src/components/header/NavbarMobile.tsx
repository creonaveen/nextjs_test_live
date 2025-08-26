'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Link } from '../ui/link';

import {
  marketComponents,
  myPagesComponents,
  recommendationsComponents,
  researchAndLearnComponents,
  stockPickingComponents,
} from './navbarMenu';

// Reusable NavSection component
function NavSection({
  value,
  label,
  items,
}: {
  value: string;
  label: string;
  items: { title: string; href: string }[];
}) {
  const params = useParams();
  const partner_slug = params.partner_slug as string;
  const t = useTranslations('navigation');

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={value}>
        <AccordionTrigger className="justify-start py-2">{t(label)}</AccordionTrigger>
        <AccordionContent className="px-3">
          {items.map((item) => {
            let href = item.href;
            if (href.includes('[partner_slug]')) {
              href = href.replace('[partner_slug]', partner_slug);
            }
            return (
              <Link
                className="block w-full py-2 text-sm text-[#1C1A39] dark:text-gray-200"
                key={t(item.title)}
                href={href}
              >
                {t(item.title)}
              </Link>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function NavbarMobile() {
  return (
    <>
      <NavSection value="myPages" label="myPages" items={myPagesComponents} />
      <NavSection value="market" label="market" items={marketComponents} />
      <NavSection
        value="recommendations"
        label="recommendations"
        items={recommendationsComponents}
      />
      <NavSection value="stockPicking" label="stockPicking" items={stockPickingComponents} />
      <NavSection value="stockPicking" label="stockPicking" items={researchAndLearnComponents} />
    </>
  );
}
