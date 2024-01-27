import { Inter } from 'next/font/google'
import './globals.css'
import Providers from "@/app/providers";
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Weather App',
  description: 'Weather App built with Next.js and Tailwind CSS',
  manifest: "/manifest.json",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SpeedInsights/>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
