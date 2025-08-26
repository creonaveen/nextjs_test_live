import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="z-0 mt-12 w-full bg-[#1C1A39] py-12 text-white">
      <div className="container mx-auto flex flex-col gap-8 px-4 md:flex-row md:justify-between">
        {/* Newsletter */}
        <div className="flex flex-col items-start md:w-1/2 lg:w-2/5">
          <h2 className="mb-2 text-3xl font-bold">{t('newsletter.title')}</h2>
          <p className="mb-4 text-xs text-gray-200">{t('newsletter.description')}</p>
          <form className="flex w-full flex-col gap-3">
            <div className="flex w-full max-w-md items-center gap-2">
              <div className="relative flex w-full max-w-[487px] items-center justify-between">
                <div className="relative flex w-full items-center">
                  <Input
                    className="text-foreground font-text-styles-body-body bg-muted rounded-[20px] py-2 ps-10 pe-3"
                    placeholder={t('newsletter.placeholder')}
                  />
                  <Mail className="text-muted-foreground absolute left-4 h-4 w-4 md:right-5 md:h-5 md:w-5" />
                </div>
              </div>
              <Button variant={'default'} type="submit" className="cursor-pointer rounded-full">
                {t('newsletter.button')}
              </Button>
            </div>
          </form>
        </div>
        {/* Info Columns */}
        <div className="grid grid-cols-1 justify-between gap-8 md:w-1/2 md:grid-cols-2 md:flex-row lg:w-3/5">
          <div className="col-span-1">
            <h3 className="mb-2 text-xs font-medium text-gray-200">{t('headOffice.title')}</h3>
            <p className="text-sm whitespace-pre-line">{t('headOffice.address')}</p>
          </div>
          <div className="col-span-1">
            <h3 className="mb-2 text-xs font-medium text-gray-200">
              {t('researchDepartment.title')}
            </h3>
            <p className="text-sm whitespace-pre-line">{t('researchDepartment.address')}</p>
          </div>
          <div className="col-span-1">
            <h3 className="mb-2 text-xs font-medium text-gray-200">{t('contactUs.title')}</h3>
            <p className="mb-1 text-sm">
              <a href="tel:+4721555888" className="text-white underline">
                {t('contactUs.phone')}
              </a>
            </p>
            <p className="text-sm">
              <a href="mailto:info@investtech.com" className="text-white underline">
                {t('contactUs.email')}
              </a>
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="mb-2 text-xs font-medium text-gray-200">{t('followUs.title')}</h3>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="text-sm text-white underline">
                  {t('followUs.youtube')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-white underline">
                  {t('followUs.twitter')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-white underline">
                  {t('followUs.linkedin')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-white underline">
                  {t('followUs.facebook')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
