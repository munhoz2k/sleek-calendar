import Head from 'next/head'
import { Home } from '@/pages/home'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Main() {
  return (
    <>
      <Head>
        <title>Sleek Calendar</title>
        <meta
          name="description"
          content="Organize seus horários e agende seus compromissos com o Sleek Calendar,
          uma plataforma web sofisticada e integrada com o Google Calendar. Simplifique sua
          rotina com nossa interface intuitiva e elegante."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={`${inter.className}`}>
        <Home />
      </main>
    </>
  )
}
