import 'server-only';
import { cookies, headers } from 'next/headers';
import { cache } from 'react';
import { getDictionary } from '@/dictionaries/dictionaries';
import { DEFAULT_LOCALE, isSupportedLocale, mapToSupportedLocale } from '@/hooks/context/i18n';

type Dict = Awaited<ReturnType<typeof getDictionary>>;

function drill(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

// Determine the active locale on the server (cookie > Accept-Language > default)
export const resolveServerLocale = cache(async (): Promise<string> => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value;
  if (isSupportedLocale(cookieLocale)) return cookieLocale as string;
  const accept = (await headers()).get('accept-language');
  const detected = mapToSupportedLocale(accept);
  return detected || DEFAULT_LOCALE;
});

// Load the dictionary for the current request locale (server side only).
export const getServerDictionary = cache(async (): Promise<{ locale: string; dictionary: Dict }> => {
  const locale = await resolveServerLocale();
  // map 'cs' to 'cz' file alias; support 'en'
  const dict = await getDictionary(locale === 'cs' ? 'cs' : (locale as 'en' | 'cz' | 'cs'));
  return { locale, dictionary: dict };
});

// Convenience helper returning a translator function.
export async function getTranslator() {
  const { locale, dictionary } = await getServerDictionary();
  function t(path: string, fallback?: any) {
    const val = drill(dictionary, path);
    return val === undefined ? (fallback !== undefined ? fallback : path) : val;
  }
  return { locale, dictionary, t };
}

// Example usage in a server component:
// const { t } = await getTranslator();
// return <h1>{t('landing.title')}</h1>
