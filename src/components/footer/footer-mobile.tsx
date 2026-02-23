import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'investtech/external-components';
import Image from 'next/image';
import { Link } from '@/components/link';

import { Pages, socialIcons, dividerClass } from './footer-constants';
import { renderFooterDescriptions, renderPageItem } from './footer-renderers';

/* ------------------------------ Mobile only ------------------------------ */

export const renderMobileAccordion = ({
  t,
  n,
}: {
  t: (k: string) => string;
  n: (k: string) => string;
}) => (
  <Accordion type="single" collapsible className="w-full space-y-2">
    {Pages.filter((p) => p.title !== 'followUs').map((page) => (
      <AccordionItem
        key={page.title}
        value={page.title}
        className="border-grey-750 border-b last:border-b-0"
      >
        <AccordionTrigger className="text-grey-500 text-xs font-medium uppercase">
          {['headOffice', 'analysisDepartment', 'contactUs', 'followUs'].includes(page.title)
            ? t(`${page.title}.title`)
            : n(page.title)}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col space-y-2 pl-2">
          {page.items.map((item) =>
            renderPageItem({ item, pageTitle: page.title, isDesktop: false, t, n })
          )}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export const renderMobileSocialIcons = ({ facebookHref }: { facebookHref: string }) => (
  <div className="flex gap-2">
    {Pages.find((p) => p.title === 'followUs')?.items.map(({ title, href }) => (
      <Link
        key={title}
        href={title === 'Facebook' ? facebookHref : href!}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit our ${title} page`}
      >
        <Image src={socialIcons[title]} alt={title} width={30} height={30} />
      </Link>
    ))}
  </div>
);

export const renderDesktopFooterBottom = ({
  copyRight,
  t,
  disclaimerHref1,
  disclaimerHref2,
}: {
  copyRight: string;
  t: (key: string) => string;
  disclaimerHref1: string;
  disclaimerHref2: string;
}) => (
  <div className="flex flex-col gap-8 px-6">
    <div className={dividerClass} />
    <div className="flex flex-col gap-6">
      {renderFooterDescriptions({ t, disclaimerHref1, disclaimerHref2 })}
      <p className="text-xs font-semibold">{copyRight}</p>
    </div>
  </div>
);

export const renderMobileFooterBottom = ({
  copyRight,
  t,
  disclaimerHref1,
  disclaimerHref2,
}: {
  copyRight: string;
  t: (key: string) => string;
  disclaimerHref1: string;
  disclaimerHref2: string;
}) => (
  <div className="flex flex-col gap-6 px-4">
    <div className={dividerClass} />
    {renderFooterDescriptions({ t, disclaimerHref1, disclaimerHref2 })}
    <p className="text-xs font-semibold">{copyRight}</p>
  </div>
);
