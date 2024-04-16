import { Inter } from 'next/font/google'
import './globals.css'
import Providers from "@/app/providers";
import { SpeedInsights } from "@vercel/speed-insights/next"


export const viewport = {
  themeColor: 'white',
}
export const metadata = {
  title: 'Weather App',
  description: 'Weather App built with Next.js and Tailwind CSS',
  manifest: "/manifest.json",
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
    <Providers>
      {children}
    </Providers>
    </body>
    </html>
  )
}
