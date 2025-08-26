'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { Image } from '../ui/image';
import { Link } from '../ui/link';

import CompanySearchBar from './companySearchBar';
import { LanguageSelector } from './LanguageSelector';
import { LightDarkSwitch } from './LightDarkSwitch';
import { MarketCombobox } from './MarketCombobox';
import { NavbarMobile } from './NavbarMobile';

interface HeaderDesktopProps {
  partner_slug: string;
}

const HeaderMobile: React.FC<HeaderDesktopProps> = ({ partner_slug }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('common');

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setIsScrolled(position > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 flex flex-col items-center bg-[#F5F6F8] transition-all duration-200 dark:bg-[#18192A] ${
          isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm' : ''
        }`}
      >
        <div className="container mx-auto my-2 px-4">
          {/* Mobile Header */}
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/light_logo.svg"
                alt="Investtech Logo"
                className="mr-2 block h-6 w-auto dark:hidden"
                width={24}
                height={24}
              />
              <Image
                src="/dark_logo.svg"
                alt="Investtech Logo"
                className="mr-2 hidden h-6 w-auto dark:block"
                width={24}
                height={24}
              />
            </Link>

            {/* Search Bar */}
            <div className="relative mx-2">
              <CompanySearchBar partner_slug={partner_slug} search_icon={'search-icon-mobile'} />
            </div>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="ml-2 text-[#1C1A39] hover:text-blue-600 focus:outline-none dark:text-white"
              aria-label="Open menu"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {/* Mobile Fullscreen Menu */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F6F8] dark:bg-[#18192A]">
              {/* Header: Logo + Close */}
              <div className="bg-[#F5F6F8] px-6 dark:bg-[#18192A]">
                <div className="mb-8 flex h-16 items-center justify-between">
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/light_logo.svg"
                      alt="Investtech Logo"
                      className="block h-6 w-auto dark:hidden"
                      width={24}
                      height={24}
                    />
                    <Image
                      src="/dark_logo.svg"
                      alt="Investtech Logo"
                      className="hidden h-6 w-auto dark:block"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#1C1A39] hover:text-blue-600 focus:outline-none dark:text-white"
                    aria-label="Close menu"
                  >
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="h-[100dvh] overflow-y-auto">
                  {/* Navigation Links */}

                  <div className="mb-3 flex flex-col gap-6 overflow-y-auto">
                    <NavbarMobile />
                  </div>
                  <hr className="my-3 border-[#E2E3EA]" />
                  {/* Country Combobox */}
                  <div className="mt-auto grid w-full grid-cols-2 gap-4 py-5">
                    <MarketCombobox />
                    <LanguageSelector />
                  </div>
                  {/* Buttons at the bottom */}
                  <div className="mt-auto w-full">
                    <div className="flex flex-col items-center space-y-6">
                      {/* Theme Row */}
                      <div className="bg-card flex w-full max-w-md items-center justify-between rounded-2xl px-4 py-3">
                        <span className="text-card-foreground text-sm font-medium">
                          {t('theme')}
                        </span>
                        <div className="flex items-center space-x-2">
                          <LightDarkSwitch />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="bg-border relative h-px w-full self-stretch" />
      </header>
    </>
  );
};

export default HeaderMobile;
