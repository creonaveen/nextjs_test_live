import { Accordion } from 'investtech/external-components';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useMarketId } from '@/lib/hooks/use-market-id';
import { usePlatform } from '@/lib/platform';

import {
  groupedPages,
  renderDesktopFooterBottom,
  renderMobileAccordion,
  renderMobileFooterBottom,
  renderMobileSocialIcons,
  renderPageGroup,
} from './footer-utils';

const renderDesktopFooter = ({
  t,
  n,
  copyRight,
  disclaimerHref1,
  disclaimerHref2,
  facebookHref,
}: {
  t: (key: string) => string;
  n: (key: string) => string;
  copyRight: string;
  disclaimerHref1: string;
  disclaimerHref2: string;
  facebookHref: string;
}) => (
  <div className="flex flex-col">
    <div className="flex flex-col gap-8 px-6 md:flex-row">
      <div className="grid w-full grid-cols-5 gap-2">
        <div className="col-span-1 flex items-start justify-start" id="investtech-logo">
          <Image
            className="w-auto"
            alt="Investtech Logo"
            src="dark_logo.svg"
            width={32}
            height={32}
          />
        </div>
        <div className="col-span-4 grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-10">
          {groupedPages.map((group, groupIndex) =>
            renderPageGroup({ group, groupIndex, isDesktop: true, t, n, facebookHref })
          )}
        </div>
      </div>
    </div>

    {renderDesktopFooterBottom({ copyRight, t, disclaimerHref1, disclaimerHref2 })}
  </div>
);

interface MobileFooterProps {
  t: (key: string) => string;
  n: (key: string) => string;
  copyRight: string;
  disclaimerHref1: string;
  disclaimerHref2: string;
  facebookHref: string;
  isAccordionOpen: string;
  setIsAccordionOpen: (value: string) => void;
}

const renderMobileFooter = ({
  t,
  n,
  copyRight,
  disclaimerHref1,
  disclaimerHref2,
  facebookHref,
  isAccordionOpen,
  setIsAccordionOpen,
}: MobileFooterProps) => (
  <div>
    <div className="flex flex-col gap-2 space-y-4 px-4 pb-10 sm:px-6">
      <div className="flex justify-start pb-4">
        <Image
          className="w-auto"
          alt="Investtech Logo"
          src="dark_logo.svg"
          width={40}
          height={40}
        />
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-2"
        value={isAccordionOpen}
        onValueChange={setIsAccordionOpen}
        id="footer-accordion"
      >
        {renderMobileAccordion({ t, n })}
      </Accordion>

      <div className="bg-grey-750 relative h-px w-full self-stretch" />

      {renderMobileSocialIcons({ facebookHref })}

      {renderMobileFooterBottom({ copyRight, t, disclaimerHref1, disclaimerHref2 })}
    </div>
  </div>
);

const Footer = () => {
  const t = useTranslations('footer');
  const n = useTranslations('navigation');
  const platform = usePlatform();
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const [facebookHref, setFacebookHref] = useState('');
  const [isAccordionOpen, setIsAccordionOpen] = useState<string>('');
  const marketId = useMarketId();
  useEffect(() => {
    if (marketId === '461') {
      setFacebookHref('https://www.facebook.com/InvesttechSE/');
    } else if (marketId === '451') {
      setFacebookHref('https://www.facebook.com/InvesttechDK/');
    } else {
      setFacebookHref('https://www.facebook.com/InvesttechNO/');
    }
  }, [marketId]);

  // Reset accordion when navigating to a new page
  useEffect(() => {
    setIsAccordionOpen('');
  }, [pathname]);
  const copyRight = `${t('copyRight.section1')}${currentYear} ${t('copyRight.section2')}`;
  const disclaimerHref1 = '/docs/disclaimer';
  const disclaimerHref2 = '/docs/h2_aboutAnalyses';

  return (
    <footer className="bg-grey-900 dark:bg-card z-0 w-full py-6 text-white md:py-12">
      <div className="container mx-auto">
        {platform === 'desktop'
          ? renderDesktopFooter({ t, n, copyRight, disclaimerHref1, disclaimerHref2, facebookHref })
          : renderMobileFooter({
              t,
              n,
              copyRight,
              disclaimerHref1,
              disclaimerHref2,
              facebookHref,
              isAccordionOpen,
              setIsAccordionOpen,
            })}
      </div>
    </footer>
  );
};

export default Footer;
