import { Button, Text, TextInput } from '@munhoz-tech-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useRouter } from 'next/router'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 caractéres' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode conter somente letras, "-" e números',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername({ username }: ClaimUsernameFormData) {
    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          prefix="munhoz.tech/"
          placeholder="seu-usuario"
          {...register('username')}
        />

        <Button size="md" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>

        <Text>
          {errors.username
            ? errors.username.message
            : 'Digite o nome de usuário desejado'}
        </Text>
      </Form>

      <FormAnnotation>
        <Text>
          Já possui uma conta? <a href="/login">Fazer Login</a>
        </Text>
      </FormAnnotation>
    </>
  )
}
