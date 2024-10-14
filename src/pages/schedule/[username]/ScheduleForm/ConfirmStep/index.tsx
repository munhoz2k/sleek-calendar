import dayjs from 'dayjs'

import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/lib/axios'

import { CalendarBlank, Clock } from 'phosphor-react'
import { Button, Text, TextArea, TextInput } from '@munhoz-tech-ui/react'
import { ConfirmStepForm, FormActions, FormError, FormHeader } from './styles'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa de no mínimo 3 caracteres!' }),
  email: z.string().email({ message: 'Digite um e-mail válido!' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onExitScheduling: () => void
}

export default function ConfirmStep({
  schedulingDate,
  onExitScheduling,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedtime = dayjs(schedulingDate).format('HH:mm[h]')

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmScheduling(data: ConfirmFormData) {
    const { name, email, observations } = data

    try {
      await api.post(`/users/${username}/schedule`, {
        name,
        email,
        observations,
        date: schedulingDate,
      })
    } catch (err) {
      console.log(err)
    }

    onExitScheduling()
  }

  return (
    <ConfirmStepForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>

        <Text>
          <Clock />
          {describedtime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="John Doe" {...register('name')} />
        {errors.name && <FormError size="xs">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput placeholder="johndoe@example.com" {...register('email')} />
        {errors.email && (
          <FormError size="xs">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button
          type="button"
          variant="tertiary"
          disabled={isSubmitting}
          onClick={() => onExitScheduling()}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmStepForm>
  )
}
