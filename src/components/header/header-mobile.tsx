'use client';

import { Button } from 'investtech/external-components';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/components/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useScrollDirection } from '@/lib/hooks/use-scroll-direction';
import { useThrottle } from '@/lib/hooks/use-throttle';
import { getUrlWithParams } from '@/utils/navigation-utils';

import CompanySearchBar from './company-search-bar';
import { LanguageSelector } from './language-selector';
import { LightDarkSwitch } from './light-dark-switch';
import { MarketCombobox } from './market-combobox/market-combobox';
import { NavbarMobile } from './navbar/navbar-mobile';

interface LogoProps {
  marketId: string | null;
  language: string | null;
}

function useScrollState() {
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

function useLockBodyScroll(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;

    const originalBodyOverflow = body.style.overflow;
    const originalHtmlOverflow = html.style.overflow;
    const originalPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - html.clientWidth;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    body.classList.add('mobile-menu-open');
    body.style.setProperty('--scroll-y', `-${scrollY}px`);

    return () => {
      body.classList.remove('mobile-menu-open');
      body.style.overflow = originalBodyOverflow;
      body.style.paddingRight = originalPaddingRight;
      html.style.overflow = originalHtmlOverflow;
      body.style.removeProperty('--scroll-y');
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}

function Logo({ marketId, language }: LogoProps) {
  const router = useRouter();

  const navigateHome = () => {
    router.push(getUrlWithParams(`/`, `market_id=${marketId ?? ''}&language=${language ?? ''}`));
  };

  return (
    <div className="flex items-center gap-2">
      <Image
        src="light_logo.svg"
        alt="Investtech Logo"
        className="block h-6 w-auto dark:hidden"
        width={24}
        height={24}
        onClick={navigateHome}
      />
      <Image
        src="dark_logo.svg"
        alt="Investtech Logo"
        className="hidden h-6 w-auto dark:block"
        width={24}
        height={24}
        onClick={navigateHome}
      />
    </div>
  );
}

function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label="Open menu"
      className="text-grey-900 dark:text-white"
    >
      <svg className="size-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </Button>
  );
}

function MobileMenuHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="mb-8 flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center gap-2" id="investtech-logo">
        <Image
          src="light_logo.svg"
          alt="Investtech Logo"
          className="block h-6 w-auto dark:hidden"
          width={24}
          height={24}
          role="img"
          aria-label="Investtech Logo"
        />
        <Image
          src="dark_logo.svg"
          alt="Investtech Logo"
          className="hidden h-6 w-auto dark:block"
          width={24}
          height={24}
          role="img"
          aria-label="Investtech Logo"
        />
      </Link>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-gray-600"
        aria-label="Close menu"
        id="hamburger-menu-close-button"
      >
        <X className="h-10 w-10" />
      </Button>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="mobile-menu-overlay dark:bg-grey-800 fixed inset-0 z-50 flex flex-col bg-white">
      {/* Header: Logo + Close */}
      <div className="dark:bg-grey-800 bg-white px-6">
        <MobileMenuHeader onClose={onClose} />
        <div className="h-[100dvh]">
          {/* Scrollable section */}
          <div className="overflow-x-hidden overflow-y-auto overscroll-contain pb-20">
            {' '}
            {/* add padding to prevent overlap */}
            <div className="flex items-center justify-between gap-4 py-2">
              <div className="flex min-w-0 items-center justify-start gap-4">
                <MarketCombobox />
                <LanguageSelector />
              </div>
              <LightDarkSwitch />
            </div>
            <hr className="border-divider dark:border-grey-900 mt-3" />
            <div className="mb-3 flex max-h-[calc(100dvh-200px)] flex-col gap-6 overflow-x-hidden overflow-y-auto">
              <NavbarMobile onNavigate={onClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const HeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const { isVisible } = useScrollDirection();
  const isScrolled = useScrollState();

  useLockBodyScroll(isMenuOpen);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'shadow-md backdrop-blur-sm' : ''}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo marketId={searchParams.get('market_id')} language={searchParams.get('language')} />
          <HamburgerButton onClick={() => setIsMenuOpen(true)} />
        </div>

        <div className="pb-2">
          <CompanySearchBar />
        </div>

        {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
      </div>

      <div className="bg-border h-px w-full" />
    </header>
  );
};

export default HeaderMobile;
