export const SUPPORTED_LOCALES = ['en', 'cs'] as const;
export type AppLocale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: AppLocale = 'en';

// Map incoming Accept-Language values to our supported locales
export function mapToSupportedLocale(raw: string | null | undefined): AppLocale {
  if (!raw) return DEFAULT_LOCALE;
  const parts = raw.split(',').map(p => p.trim().split(';')[0]);
  for (const part of parts) {
    const primary = part.toLowerCase().split('-')[0];
    if (SUPPORTED_LOCALES.includes(primary as AppLocale)) return primary as AppLocale;
    // legacy alias "cz" -> "cs"
    if (primary === 'cz') return 'cs';
  }
  return DEFAULT_LOCALE;
}

export function isSupportedLocale(locale: string | undefined | null): locale is AppLocale {
  return !!locale && SUPPORTED_LOCALES.includes(locale as AppLocale);
}
