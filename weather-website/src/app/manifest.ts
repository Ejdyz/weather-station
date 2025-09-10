import type { MetadataRoute } from 'next'
import { getTranslator } from '@/lib/server-dictionary'

export const dynamic = 'force-dynamic';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { t, locale } = await getTranslator();

  return {
    name: t("metadata.title"),
    short_name: t("metadata.short_name"),
    description: t("metadata.description"),
    theme_color: "#8936FF",
    background_color: "#2EC6FE",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "icons/icon512_maskable.png",
        type: "image/png"
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "icons/icon512_rounded.png",
        type: "image/png"
      }
    ],
    orientation: "any",
    display: "standalone",
    dir: "auto",
    lang: locale,
    start_url: '/',
    screenshots: [
      {
        src: "screenshots/wide.png",
        type: "image/png",
        form_factor: "wide",
        sizes: "1897x987"
      },
      {
        src: "screenshots/narrow.png",
        type: "image/png",
        form_factor: "narrow",
        sizes: "469x926"
      }
    ]
  }
}
