// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'

export default function Providers({children}) {
  return (
    <NextUIProvider  locale="cs-CZ">
      {children}
    </NextUIProvider>
  )
}