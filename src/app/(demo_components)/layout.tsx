import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { configuration } from '../../environment/configuration';
import { getServerPlatform } from '../../lib/server-platform';

import { DemoQueryProvider } from './query-provider';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Component Demos | investtech',
  description: 'Interactive component demos and examples for investtech UI components',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const serverPlatform = await getServerPlatform();
  const baseHref = process.env.NODE_ENV === 'production' ? configuration.BASE_PATH + '/' : '/';
  return (
    <html lang={locale} suppressHydrationWarning data-platform={serverPlatform}>
      <head>
        <base href={baseHref} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body className="w-full antialiased">
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider locale={locale} messages={messages}>
              <DemoQueryProvider>{children}</DemoQueryProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
