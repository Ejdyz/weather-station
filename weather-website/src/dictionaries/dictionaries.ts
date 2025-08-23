import 'server-only';
import en from './en';
import cz from './cz';

const staticDictionaries = { en, cz, cs: cz } as const;

export type SupportedDictionaryLocale = keyof typeof staticDictionaries;

export async function getDictionary<L extends SupportedDictionaryLocale>(locale: L): Promise<typeof staticDictionaries[L]> {
  return staticDictionaries[locale];
}