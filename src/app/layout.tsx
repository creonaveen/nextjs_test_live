import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { ScrollbarGutterProvider } from '@/components/scrollbar-gutter-provider';
import { configuration } from '@/environment/configuration';
import { getServerPlatform } from '@/lib/server-platform';

import { ApplicationLayout } from './application-layout';
import './globals.css';

const baseHref = process.env.NODE_ENV === 'production' ? configuration.BASE_PATH + '/' : '/';

export const metadata: Metadata = {
  title: 'investtech',
  description: 'investtech',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const serverPlatform = await getServerPlatform();
  return (
    <html lang={locale} suppressHydrationWarning data-platform={serverPlatform}>
      <head>
        <base href={baseHref} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body className="w-full antialiased">
        <NuqsAdapter>
          <ScrollbarGutterProvider />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider locale={locale} messages={messages}>
              <ApplicationLayout platform={serverPlatform}>{children}</ApplicationLayout>
            </NextIntlClientProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
