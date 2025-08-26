'use client';

import { useParams } from 'next/navigation';
import React from 'react';

import { usePlatform } from '@/lib/platform';
import { PlatformType } from '@/lib/server-platform';

import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

const Header: React.FC<{ serverPlatform: PlatformType }> = ({ serverPlatform }) => {
  const platform = usePlatform(serverPlatform);
  const params = useParams();
  const partner_slug = params.partner_slug as string;

  return (
    <>
      {platform === 'desktop' ? (
        <HeaderDesktop partner_slug={partner_slug} />
      ) : (
        <HeaderMobile partner_slug={partner_slug} />
      )}
      <div className="h-[80px] lg:h-[120px]" />
    </>
  );
};

export default Header;
