'use client';

import React, { useEffect, useState } from 'react';

import { Image } from '../ui/image';

import CompanySearchBar from './companySearchBar';
import { LanguageSelector } from './LanguageSelector';
import { LightDarkSwitch } from './LightDarkSwitch';
import { MarketCombobox } from './MarketCombobox';
import { Navbar } from './Navbar';

interface HeaderDesktopProps {
  partner_slug: string;
}

const HeaderDesktop: React.FC<HeaderDesktopProps> = ({ partner_slug }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setIsScrolled(position > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`bg-background fixed top-0 right-0 left-0 z-50 flex flex-col items-center transition-all duration-200 ${
          isScrolled ? 'shadow-md backdrop-blur-sm' : ''
        }`}
      >
        <div className="container mx-auto mt-2 mb-3 px-4">
          <nav className="relative flex w-full items-center justify-between self-stretch bg-transparent py-4 md:py-5">
            {/* Logo and Brand Name */}
            <div className="relative flex w-[180px] items-start md:w-[295px]">
              <div className="relative inline-flex items-center gap-2 md:gap-3">
                <Image
                  className="relative block w-8 md:w-auto dark:hidden"
                  alt="Investtech Logo"
                  src="/light_logo.svg"
                  width={32}
                  height={32}
                />
                <Image
                  className="relative hidden w-8 md:w-auto dark:block"
                  alt="Investtech Logo"
                  src="/dark_logo.svg"
                  width={32}
                  height={32}
                />
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mx-4 hidden w-full max-w-[487px] items-center justify-between md:flex">
              <div className="flex w-full items-center">
                <CompanySearchBar partner_slug={partner_slug} search_icon={'search-icon-desktop'} />
              </div>
            </div>

            {/* Right Section - Country Selector and User Menu */}
            <div className="flex items-center gap-2 md:gap-4">
              <MarketCombobox />
              <LanguageSelector />
              <LightDarkSwitch />
            </div>
          </nav>
          <div className="relative z-10 flex w-full items-center justify-between self-stretch bg-transparent">
            <Navbar />
          </div>
        </div>
        <div className="bg-border relative h-px w-full self-stretch" />
      </header>
    </>
  );
};

export default HeaderDesktop;
