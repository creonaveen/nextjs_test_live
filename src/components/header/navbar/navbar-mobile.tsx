'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'investtech/external-components';
import { Link } from '@/components/link';
import { useTranslations } from 'next-intl';

import { useNavSections } from './navbar-menu';

type SubItem = { title: string; href: string };
type Item = { title: string; href: string; subItems?: SubItem[] };

function NavItem({
  item,
  t,
  onNavigate,
}: {
  item: Item;
  t: (key: string) => string;
  onNavigate: () => void;
}) {
  if (item.subItems && item.subItems.length > 0) {
    return (
      <AccordionItem value={item.title}>
        <AccordionTrigger
          className="text-grey-900 dark:text-grey-100 py-2 text-sm font-normal"
          id={item.title}
        >
          {t(item.title)}
        </AccordionTrigger>
        <AccordionContent className="pl-3">
          {item.subItems.map((sub) => (
            <Link
              key={sub.title}
              href={sub.href}
              className="text-grey-800 dark:text-grey-200 block py-1 text-sm"
              onClick={onNavigate}
              id={sub.title}
            >
              {t(sub.title)}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.href}
      className="text-grey-900 dark:text-grey-100 block w-full py-2 text-sm"
      onClick={onNavigate}
      id={item.title}
    >
      {t(item.title)}
    </Link>
  );
}

function NavSection({
  value,
  label,
  items,
  onNavigate,
}: {
  value: string;
  label: string;
  items: Item[];
  onNavigate: () => void;
}) {
  const t = useTranslations('navigation');

  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="py-4" id={label}>
        {t(label)}
      </AccordionTrigger>
      <AccordionContent className="px-3">
        <Accordion type="single" collapsible>
          {items.map((item) => (
            <NavItem key={item.title} item={item} t={t} onNavigate={onNavigate} />
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
}

export function NavbarMobile({ onNavigate }: { onNavigate: () => void }) {
  const navSections = useNavSections();

  return (
    <Accordion type="single" collapsible className="w-full">
      {navSections.map((section) => (
        <NavSection key={section.value} {...section} onNavigate={onNavigate} />
      ))}
    </Accordion>
  );
}
