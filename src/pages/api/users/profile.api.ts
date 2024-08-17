import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { prisma } from '@/lib/prisma'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const { data, success } = updateProfileBodySchema.safeParse(req.body)

  if (!success) {
    return res.status(400).json({ message: 'Invalid request data format!' })
  }

  await prisma.user.update({
    data: {
      bio: data.bio,
    },
    where: {
      id: session.user.id,
    },
  })

  return res.status(204).end()
}
