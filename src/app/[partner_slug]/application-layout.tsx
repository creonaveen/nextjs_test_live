'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/header/Header';
import { PlatformType } from '@/lib/server-platform';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export function ApplicationLayout({
  children,
  platform,
}: {
  children: React.ReactNode;
  platform: PlatformType;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header serverPlatform={platform} />
      {children}
      <Footer />
    </QueryClientProvider>
  );
}
