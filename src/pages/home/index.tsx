import { NextSeo } from 'next-seo'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

import { Heading, Text } from '@munhoz-tech-ui/react'
import { Container, Hero, Preview } from './styles'
import previewImage from '@/assets/app-preview.png'
import gridBg from '@/assets/grid-bg.png'
import Image from 'next/image'

export function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Sleek Calendar"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre."
      />

      <Container>
        <Hero>
          <Heading size="4xl">Agendamento descomplicado</Heading>

          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>

          <ClaimUsernameForm />

          <Image src={gridBg} alt="Grade branca de fundo" priority />
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            alt="Pré-visualização do calendário"
            height={400}
            quality={100}
            priority
          />
        </Preview>
      </Container>
    </>
  )
}
