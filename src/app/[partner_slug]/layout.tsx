import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import '../globals.css';

import { getBasePath } from '@/lib/hooks/useBasePath';
import { getServerPlatform } from '@/lib/server-platform';

import { ApplicationLayout } from './application-layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'investtech',
  description: 'investtech',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ partner_slug?: string }>;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const serverPlatform = await getServerPlatform();
  const resolvedParams = await params;
  const partnerSlug = resolvedParams?.partner_slug || '';

  return (
    <html lang={locale} suppressHydrationWarning data-platform={serverPlatform}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {getBasePath() ? (
          <base href={`${getBasePath()}/${partnerSlug}/`} />
        ) : (
          <base href={`/${partnerSlug}/`} />
        )}
      </head>
      <body className={`${inter.variable} w-full antialiased`}>
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider locale={locale} messages={messages}>
              <ApplicationLayout platform={serverPlatform}>
                <div className="container mx-auto px-4 py-0 lg:py-8">{children}</div>
              </ApplicationLayout>
            </NextIntlClientProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
