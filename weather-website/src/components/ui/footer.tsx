import React from 'react'
import { LanguageSwitcher } from '@/components/main/LanguageSwitcher'
import { getTranslator } from '@/lib/server-dictionary'
import { formatWeatherData } from '@/lib/utils'

export default async function Footer({lastUpdate}: {lastUpdate: Date | undefined}) {
  const { t, locale } = await getTranslator()
  return (
    <div className='w-full text-center text-white/75 p-3'>
      <div className='flex gap-2 w-full justify-center'><p>{t('footer.language')}</p><LanguageSwitcher currentLocale={locale === "en"? "en" : "cs"} /></div>
      <p>{t("footer.lastRecord")}: {formatWeatherData("date_full_numeric",lastUpdate)}</p>
      <p>© 2025 <a href="https://ejdy.cz">Jan Adam</a> {t('footer.allRightsReserved')}.</p>
    </div>
  )
}
