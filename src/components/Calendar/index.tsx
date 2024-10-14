import dayjs from 'dayjs'

import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getWeekDays } from '@/utils/get-week-days'
import { api } from '@/lib/axios'

import {
  ArrowCounterClockwise,
  CaretLeft,
  CaretRight,
  SpinnerGap,
  X,
} from 'phosphor-react'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

interface CalendarProps {
  selectedDate: Date | null
  onDateSelect: (date: Date | null) => void
}

type CalendarWeeks = Array<{
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}>

interface BlockedDatesAPIRes {
  blockedWeekDays: number[]
  blockedDates: number[]
}

export function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const router = useRouter()
  const username = String(router.query.username)

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarLoadingStateArray = Array.from(
    { length: 35 },
    (_, i) => i + 1,
  ).reduce<number[][]>((lastArray, _, i, originalArray) => {
    if (i % 7 === 0) {
      lastArray.push(originalArray.slice(i, i + 7))
    }

    return lastArray
  }, [])

  const { data: blockedDates } = useQuery<BlockedDatesAPIRes>({
    queryKey: ['blockedDates', currentDate.format('YYYY-MM').toString()],
    queryFn: async () => {
      const { data } = await api.get(`/users/${username}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.format('MM'),
        },
      })

      return data
    },
  })

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) {
      return []
    }

    const lastMonthDay = currentDate.set('date', currentDate.daysInMonth())
    const firstWeekDay = currentDate.get('day')
    const lastWeekDay = lastMonthDay.get('day')

    const previousMonthFillArray = Array.from(
      {
        length: firstWeekDay,
      },
      (_, i) => currentDate.subtract(i + 1, 'day'),
    ).reverse()

    const daysInMonthArray = Array.from(
      {
        length: currentDate.daysInMonth(),
      },
      (_, i) => currentDate.set('date', i + 1),
    )

    const nextMonthFillArray = Array.from(
      {
        length: 7 - (lastWeekDay + 1),
      },
      (_, i) => lastMonthDay.add(i + 1, 'day'),
    )

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),

      ...daysInMonthArray.map((date) => {
        const isDateUnavailable =
          date.endOf('day').isBefore(new Date()) ||
          blockedDates.blockedWeekDays.includes(date.get('day')) ||
          blockedDates.blockedDates.includes(date.get('date'))

        return {
          date,
          disabled: isDateUnavailable,
        }
      }),

      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate, blockedDates])

  function handlePreviousMonth() {
    setCurrentDate((currentDateState) => currentDateState.subtract(1, 'month'))
  }

  function handleNextMonth() {
    setCurrentDate((currentDateState) => currentDateState.add(1, 'month'))
  }

  function handleResetDate() {
    setCurrentDate(() => dayjs().set('date', 1))
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          {selectedDate && (
            <button onClick={() => onDateSelect(null)} title="Fechar horários">
              <X />
            </button>
          )}

          <button onClick={handleResetDate} title="Data atual">
            <ArrowCounterClockwise />
          </button>

          <button onClick={handlePreviousMonth} title="Mês anterior">
            <CaretLeft />
          </button>

          <button onClick={handleNextMonth} title="Próximo mês">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.length > 0
            ? calendarWeeks.map(({ week, days }) => {
                return (
                  <tr key={week}>
                    {days.map(({ date, disabled }) => {
                      return (
                        <td key={date.toString()}>
                          <CalendarDay
                            onClick={() => onDateSelect(date.toDate())}
                            disabled={disabled}
                          >
                            {date.get('date')}
                          </CalendarDay>
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            : calendarLoadingStateArray.map((v, i) => {
                return (
                  <tr key={i}>
                    {v.map((_, i) => {
                      return (
                        <td key={`calendar day ${i}`}>
                          <CalendarDay disabled>
                            <SpinnerGap size={24} fill="bold" />
                          </CalendarDay>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
