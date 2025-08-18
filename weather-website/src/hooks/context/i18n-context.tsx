"use client";
import React, { createContext, useCallback, useContext, useState } from 'react';
import { AppLocale, SUPPORTED_LOCALES } from './i18n';
import type { DictionaryShape } from '@/dictionaries/types';

export type Dictionary = DictionaryShape;

interface I18nContextValue {
  locale: AppLocale;
  dictionary: Dictionary;
  setLocale: (l: AppLocale) => Promise<void>;
  t: (path: string) => any; // simple path accessor e.g. landing.title
}

const I18nContext = createContext<I18nContextValue | null>(null);

async function loadDictionary(locale: AppLocale): Promise<any> {
  switch (locale) {
    case 'cs':
      return (await import('@/dictionaries/cz')).default;
    case 'en':
    default:
      return (await import('@/dictionaries/en')).default;
  }
}

function get(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export const I18nProvider: React.FC<{ initialLocale: AppLocale; initialDictionary: Dictionary; children: React.ReactNode; }> = ({ initialLocale, initialDictionary, children }) => {
  const [locale, setLocaleState] = useState<AppLocale>(initialLocale);
  const [dictionary, setDictionary] = useState<Dictionary>(initialDictionary);
  const [loading, setLoading] = useState(false);

  const setLocale = useCallback(async (next: AppLocale) => {
    if (next === locale || !SUPPORTED_LOCALES.includes(next)) return;
    setLoading(true);
    try {
      // persist
      localStorage.setItem('locale', next);
      document.cookie = `locale=${next}; path=/; max-age=31536000`;
      const dict = await loadDictionary(next);
      setDictionary(dict);
      setLocaleState(next);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  const t = useCallback((path: string) => get(dictionary, path), [dictionary]);

  return (
    <I18nContext.Provider value={{ locale, dictionary, setLocale, t }}>
      <div data-locale={locale} className={loading ? 'opacity-70 transition-opacity' : undefined}>
        {children}
      </div>
    </I18nContext.Provider>
  );
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
