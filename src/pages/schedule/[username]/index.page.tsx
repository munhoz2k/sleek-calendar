import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { prisma } from '@/lib/prisma'
import { capitalize } from '@/utils/capitalize'

import ScheduleForm from './ScheduleForm'
import { Avatar, Heading, Text } from '@munhoz-tech-ui/react'
import { Container, UserHeader } from './styles'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <>
      <NextSeo
        title={`Agendar com ${capitalize(user.name)} | Sleek Calendar`}
      />

      <Container>
        <UserHeader>
          <Avatar src={user.avatarUrl} />
          <Heading>{capitalize(user.name)}</Heading>
          <Text>{user.bio}</Text>
        </UserHeader>

        <ScheduleForm />
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 6, // 6 Hours
  }
}
