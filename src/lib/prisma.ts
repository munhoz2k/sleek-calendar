import { PrismaClient, User } from '@prisma/client'

export type UsersTableProps = User

export const prisma = new PrismaClient({
  log: ['query'],
})
