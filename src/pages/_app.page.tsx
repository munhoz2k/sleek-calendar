import '@/lib/dayjs'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'

import { globalStyles } from '@/styles/globals'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'pt-BR',
          url: 'https://www.sleekcalendar.com',
          siteName: 'Sleek Calendar',
        }}
      />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}
