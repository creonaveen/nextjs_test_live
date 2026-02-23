import Image from 'next/image';
import { Link } from '@/components/link';

import {
  LinkClass,
  Pages,
  descriptionClass,
  disclaimerLinkClass,
  isExternalHref,
  paragraphTextClass,
  socialIcons,
} from './footer-constants';

/* ------------------------------- Renderers ------------------------------- */

export const renderPageItem = ({
  item,
  pageTitle,
  isDesktop,
  t,
  n,
}: {
  item: { title: string; href?: string };
  pageTitle: string;
  isDesktop: boolean;
  t: (key: string) => string;
  n: (key: string) => string;
}) => {
  const isTextOnly =
    pageTitle === 'headOffice' ||
    pageTitle === 'analysisDepartment' ||
    (pageTitle === 'contactUs' && item.title === 'contactUs.phone');

  if (isTextOnly)
    return (
      <p key={item.title} className={isDesktop ? 'text-sm whitespace-pre-line' : LinkClass}>
        {t(item.title)}
      </p>
    );

  if (!item.href) return null;

  const label = ['headOffice', 'analysisDepartment', 'contactUs', 'followUs'].includes(pageTitle)
    ? t(item.title)
    : n(item.title);

  return (
    <Link
      key={item.title}
      href={item.href}
      className={isDesktop ? paragraphTextClass : LinkClass}
      {...(isExternalHref(item.href) && { target: '_blank' })}
    >
      {label}
    </Link>
  );
};

export const renderFooterDescriptions = ({
  t,
  disclaimerHref1,
  disclaimerHref2,
}: {
  t: (key: string) => string;
  disclaimerHref1: string;
  disclaimerHref2: string;
}) => (
  <div className="space-y-10">
    <p className={descriptionClass}>
      {t('description.largeDescription.paragraph1')}{' '}
      <Link href={disclaimerHref1} className={disclaimerLinkClass}>
        {t('description.largeDescription.link')}
      </Link>{' '}
      {t('description.largeDescription.paragraph2')}
    </p>
    <p className={descriptionClass}>
      {t('description.smallDescription.paragraph1')}{' '}
      <Link href={disclaimerHref2} className={disclaimerLinkClass}>
        {t('description.smallDescription.link')}
      </Link>
    </p>
  </div>
);

export const renderPageGroup = ({
  group,
  groupIndex,
  isDesktop,
  t,
  n,
  facebookHref,
}: {
  group: string[];
  groupIndex: number;
  isDesktop: boolean;
  t: (key: string) => string;
  n: (key: string) => string;
  facebookHref: string;
}) => (
  <div key={groupIndex} className="space-y-6">
    {Pages.filter((p) => group.includes(p.title)).map((page) => (
      <div key={page.title}>
        <h3 className="text-grey-500 mb-3 text-xs font-medium uppercase">
          {['headOffice', 'analysisDepartment', 'contactUs', 'followUs'].includes(page.title)
            ? t(`${page.title}.title`)
            : n(page.title)}
        </h3>
        <div
          className={`flex gap-2 ${page.title === 'followUs' ? 'flex-row items-center gap-4' : 'flex-col'}`}
        >
          {page.items.map(({ title, href }) =>
            page.title === 'followUs' ? (
              <Link
                key={title}
                href={title === 'Facebook' ? facebookHref : href!}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={socialIcons[title]} alt={title} width={30} height={30} />
              </Link>
            ) : (
              renderPageItem({ item: { title, href }, pageTitle: page.title, isDesktop, t, n })
            )
          )}
        </div>
      </div>
    ))}
  </div>
);
