import Image from 'next/image'
import { Heading, Text } from '@munhoz-tech-ui/react'

import gridBg from '@/assets/grid-bg.png'
import previewImage from '@/assets/app-preview.png'
import { Container, Hero, Preview } from './styles'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export function Home() {
  return (
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
  )
}
