import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import 'keen-slider/keen-slider.min.css'
import { I18nProvider } from '@/hooks/context/i18n-context';
import { getServerDictionary } from '@/lib/server-dictionary';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Keep server and client i18n in sync: resolve via cookie -> Accept-Language -> default
  const { locale, dictionary } = await getServerDictionary();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider initialLocale={locale as any} initialDictionary={dictionary as any}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
