import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
import { prisma } from '@/lib/prisma'

type RequestBody = {
  name: string
  username: string
}

type ResponseData =
  | {
      id: string
      name: string
      username: string
      created_at: Date
    }
  | {
      message: string
    }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, username }: RequestBody = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return res.status(400).json({
      message: 'Username already taken!',
    })
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  setCookie({ res }, '@sleekcalendar:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return res.status(201).json({
    id: user.id,
    name,
    username,
    created_at: user.created_at,
  })
}
