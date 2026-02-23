'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { useThrottle } from '@/lib/hooks/use-throttle';
import { getUrlWithParams } from '@/utils/navigation-utils';

import CompanySearchBar from './company-search-bar';
import { LanguageSelector } from './language-selector';
import { LightDarkSwitch } from './light-dark-switch';
import { MarketCombobox } from './market-combobox/market-combobox';
import { Navbar } from './navbar/Navbar';

function useHeaderScroll() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useThrottle(() => {
    setIsScrolled(window.scrollY > 0);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return isScrolled;
}

function useHomeNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMemo(
    () => () => {
      router.push(
        getUrlWithParams(
          `/`,
          `market_id=${searchParams.get('market_id') ?? ''}&language=${
            searchParams.get('language') ?? ''
          }`
        )
      );
    },
    [router, searchParams]
  );
}

function HeaderLogo({ onClick }: { onClick: () => void }) {
  return (
    <div className="relative flex w-[180px] items-start md:w-[295px]" id="investtech-logo">
      <div className="relative inline-flex items-center gap-2 md:gap-3">
        <Image
          id="header-logo-light"
          className="relative block w-8 cursor-pointer md:w-auto dark:hidden"
          alt="Investtech Logo"
          src={'light_logo.svg'}
          width={32}
          height={32}
          onClick={onClick}
          role="img"
          aria-label="Investtech Logo"
        />
        <Image
          id="header-logo-dark"
          className="relative hidden w-8 cursor-pointer md:w-auto dark:block"
          alt="Investtech Logo"
          src="dark_logo.svg"
          width={32}
          height={32}
          onClick={onClick}
          role="img"
          aria-label="Investtech Logo"
        />
      </div>
    </div>
  );
}

function HeaderSearch() {
  return (
    <div
      className="relative mx-4 hidden w-full max-w-[487px] items-center justify-between md:flex"
      id="company-search-input"
    >
      <div className="flex w-full items-center">
        <CompanySearchBar />
      </div>
    </div>
  );
}

function HeaderActions() {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <MarketCombobox />
      <LanguageSelector />
      <LightDarkSwitch />
    </div>
  );
}

const HeaderDesktop = () => {
  const isScrolled = useHeaderScroll();
  const navigateHome = useHomeNavigation();

  return (
    <header
      className={`bg-card top-0 right-0 left-0 z-50 flex flex-col items-center transition-all duration-200 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="w-full">
        <div className="container mx-auto mt-2 mb-3 px-6">
          <nav className="relative flex w-full items-center justify-between self-stretch bg-transparent py-4 md:py-5">
            <HeaderLogo onClick={navigateHome} />
            <HeaderSearch />
            <HeaderActions />
          </nav>
        </div>

        <div className="bg-divider dark:bg-grey-700 relative h-px w-full self-stretch" />

        <div className="container mx-auto my-2 px-6">
          <div className="relative z-10 flex w-full items-center justify-between self-stretch bg-transparent">
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDesktop;
