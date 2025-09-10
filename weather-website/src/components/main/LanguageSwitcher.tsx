"use client";
import { useEffect, useState } from 'react';
import { SUPPORTED_LOCALES, AppLocale } from '@/hooks/context/i18n';
import { useI18n } from '@/hooks/context/i18n-context';
import { useRouter } from 'next/navigation';

// Fallback simple select components if you don't have a UI select yet
// We'll attempt to use existing shadcn-like components else basic <select>

export function LanguageSwitcher({ currentLocale }: { currentLocale: AppLocale }) {
  const { setLocale } = useI18n();
  const [value, setValue] = useState<AppLocale>(currentLocale);
  const router = useRouter();
  useEffect(() => {
    setValue(currentLocale);
  }, [currentLocale]);

  async function updateLocale(next: AppLocale) {
    if (next === value) return;
    await setLocale(next);
    router.refresh();
  }

  return (
    <select
      value={value}
      onChange={(e) => updateLocale(e.target.value as AppLocale)}
      className="border border-gray-400 rounded p-1 text-xs bg-background text-foreground"
    >
      {SUPPORTED_LOCALES.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
    </select>
  );
}
