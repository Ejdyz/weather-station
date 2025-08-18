import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import 'keen-slider/keen-slider.min.css'
import { cookies } from 'next/headers';
import { DEFAULT_LOCALE, isSupportedLocale } from '@/hooks/context/i18n';
import { LanguageSwitcher } from '@/components/footer/LanguageSwitcher';
import { I18nProvider } from '@/hooks/context/i18n-context';
import { getDictionary } from '@/dictionaries/dictionaries';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value as string | undefined;
  const locale = isSupportedLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
  const dict = await getDictionary(locale === 'cs' ? 'cz' : 'en');

  
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider initialLocale={locale} initialDictionary={dict}>
          <div className="p-2 flex justify-end"><LanguageSwitcher currentLocale={locale} /></div>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
