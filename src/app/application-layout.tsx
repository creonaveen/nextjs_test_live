'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'investtech/external-components';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { PlatformType } from '@/lib/server-platform';

/**
 * Creates a new QueryClient instance with default options
 * This function ensures each component tree gets a fresh instance
 * when using lazy initialization in useState
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
}

/**
 * Gets or creates a QueryClient instance using lazy initialization
 * This ensures proper isolation in client-side rendering
 */
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: reuse singleton instance to preserve data across renders
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

/**
 * Props for ApplicationLayoutContent component
 */
interface ApplicationLayoutContentProps {
  /** Child components to render */
  children: React.ReactNode;
  /** Server platform type for header rendering */
  platform: PlatformType;
}

/**
 * ApplicationLayoutContent - Internal component that handles layout structure
 *
 * Manages header/footer visibility based on route and applies container styling.
 * Container wrapper is applied here to avoid duplication with parent layout.
 *
 * @param children - Child components to render
 * @param platform - Server platform type
 */
function ApplicationLayoutContent({ children, platform }: ApplicationLayoutContentProps) {
  const pathname = usePathname();

  // Check if we're on special pages that shouldn't show header/footer
  const isSessionExpiryPage = pathname?.includes('/session_expiry');
  const isCompanyPage = pathname?.includes('/company');
  const isHealthcheckPage = pathname?.includes('/healthcheck');

  const shouldHideHeaderFooter = isSessionExpiryPage;

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // ---- Detect iPad (portrait or landscape) ----
  const [isIpad, setIsIpad] = React.useState(false);
  React.useEffect(() => {
    const isiPad = /iPad|Macintosh/.test(navigator.userAgent) && 'ontouchstart' in window;

    setIsIpad(isiPad);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {!shouldHideHeaderFooter && <Header serverPlatform={platform} />}
      <main className="grow">
        <div
          className={`${
            !shouldHideHeaderFooter
              ? `container mx-auto ${
                  isIpad ? 'py-24 md:py-24 lg:py-24' : 'py-16 md:py-24 lg:py-16'
                } ${isCompanyPage || isHealthcheckPage ? 'px-0' : 'px-4 sm:px-6 lg:px-6'}`
              : ''
          }`}
        >
          {children}
        </div>
      </main>
      {!shouldHideHeaderFooter && <Footer />}
      <Toaster />
    </div>
  );
}

/**
 * Props for ApplicationLayout component
 */
interface ApplicationLayoutProps {
  /** Child components to render */
  children: React.ReactNode;
  /** Server platform type for header rendering */
  platform: PlatformType;
}

/**
 * ApplicationLayout - Root layout wrapper for routes
 *
 * Provides QueryClient context and application structure (header, footer, container)
 * This component is client-side only and handles client-side state management.
 *
 * @example
 * ```tsx
 * <ApplicationLayout platform="web">
 *   <PageContent />
 * </ApplicationLayout>
 * ```
 */
export function ApplicationLayout({ children, platform }: ApplicationLayoutProps) {
  // Use lazy initialization to ensure QueryClient is only created once per client
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationLayoutContent platform={platform}>{children}</ApplicationLayoutContent>
    </QueryClientProvider>
  );
}
