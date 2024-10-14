import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const { date, timeZoneOffSet } = req.query
  const username = String(req.query.username)

  if (!date) {
    return res.status(400).json({ message: 'Date not provided!' })
  } else if (!timeZoneOffSet) {
    return res.status(400).json({ message: 'Timezone not provided!' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User not found!' })
  }

  const referenceDate = dayjs(String(date))
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return res.json({ possibleTimes: [], availableTimes: [] })
  }

  const timeZoneOffSetInHours =
    typeof timeZoneOffSet === 'string'
      ? Number(timeZoneOffSet) / 60
      : Number(timeZoneOffSet[0]) / 60

  const referenceDateTimeZoneOffSetInHours =
    referenceDate.toDate().getTimezoneOffset() / 60

  const userAvailability = await prisma.usersTimeIntervals.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  })

  if (!userAvailability) {
    return res.json({ possibleTimes: [], availableTimes: [] })
  }

  const {
    time_start_in_minutes: timeStartInMinutes,
    time_end_in_minutes: timeEndInMinutes,
  } = userAvailability

  const startHour = timeStartInMinutes / 60
  const endHour = timeEndInMinutes / 60

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i
    },
  )

  const scheduledTimes = await prisma.schedules.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate
          .set('hour', startHour)
          .add(timeZoneOffSetInHours, 'hours')
          .toDate(),
        lte: referenceDate
          .set('hour', endHour)
          .add(timeZoneOffSetInHours, 'hours')
          .toDate(),
      },
    },
  })

  const availableTimes = possibleTimes.filter((time) => {
    const isScheduled = scheduledTimes.some(
      (scheduledTime) =>
        scheduledTime.date.getUTCHours() - timeZoneOffSetInHours === time,
    )

    const isTimeInPast = referenceDate
      .set('hour', time)
      .subtract(referenceDateTimeZoneOffSetInHours, 'hours')
      .isBefore(new Date())

    return !isScheduled && !isTimeInPast
  })

  return res.json({ possibleTimes, availableTimes })
}
