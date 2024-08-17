import { useRouter } from 'next/router'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { getWeekDays } from '@/utils/get-week-days'
import { convertStringTimeToMinutes } from '@/utils/convert-string-time-to-minutes'
import { api } from '@/lib/axios'

import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@munhoz-tech-ui/react'

import { ArrowRight } from 'phosphor-react'
import { Container, FormError, Header } from '../styles'
import {
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsBox,
  IntervalsContainer,
} from './styles'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) =>
      intervals.filter((interval) => interval.enabled === true),
    )
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana!',
    })
    .transform((intervals) => {
      return intervals.map(({ weekDay, startTime, endTime }) => {
        return {
          weekDay,
          startTimeInMinutes: convertStringTimeToMinutes(startTime),
          endTimeInMinutes: convertStringTimeToMinutes(endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every((interval) => {
          return interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes
        })
      },
      {
        message: 'Os horários devem ter pelo menos 1 hora de duração!',
      },
    ),
})

type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const router = useRouter()

  const weekDays = getWeekDays()
  const intervals = watch('intervals')

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  async function handleSubmitTimeIntervals(data: unknown) {
    const { intervals } = data as TimeIntervalsFormOutput

    await api.post('/users/intervals', { intervals })

    await router.push('/register/update-profile')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>

        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalsBox
        as="form"
        onSubmit={handleSubmit(handleSubmitTimeIntervals)}
      >
        <IntervalsContainer>
          {fields.map((field, i) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${i}.enabled`}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            onChange(checked === true)
                          }}
                          checked={value}
                        />
                      )
                    }}
                  />
                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>

                <IntervalInputs>
                  <TextInput
                    type="time"
                    step={60}
                    disabled={intervals[i].enabled === false}
                    {...register(`intervals.${i}.startTime`)}
                  />
                  <TextInput
                    type="time"
                    step={60}
                    disabled={intervals[i].enabled === false}
                    {...register(`intervals.${i}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}
        </IntervalsContainer>

        {errors.intervals && (
          <FormError size="sm">{errors.intervals?.root?.message}</FormError>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalsBox>
    </Container>
  )
}
