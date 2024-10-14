import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/lib/axios'
import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@munhoz-tech-ui/react'

import { Container, Form, FormError, Header } from './styles'
import { ArrowRight } from 'phosphor-react'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 caractéres' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode conter somente letras, "-" e números',
    })
    .transform((username) => username.toLowerCase()),

  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 caractéres' })
    .regex(/^([a-z\s]+)$/i, {
      message: 'O nome pode conter somente letras',
    }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const { query, push } = useRouter()
  const username = query?.username ? String(query.username) : ''

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  useEffect(() => {
    setValue('username', username)
  }, [username, setValue])

  async function handleRegister({ name, username }: RegisterFormData) {
    try {
      await api.post('/users', {
        name,
        username,
      })

      await push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
      } else {
        console.log(err)
      }
    }
  }

  return (
    <>
      <NextSeo title="Crie uma conta | Sleek Calendar" />

      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>

          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={1} />
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome de usuário</Text>

            <TextInput
              prefix="munhoz-tech/"
              placeholder="seu-usuario"
              {...register('username')}
            />

            {errors.username && (
              <FormError size="sm">{errors.username.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Nome Completo</Text>

            <TextInput placeholder="John Doe" {...register('name')} />

            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  )
}
