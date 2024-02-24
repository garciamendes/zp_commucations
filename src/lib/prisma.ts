import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

// {
//   log: env.NODE_ENV === 'dev' ? ['query'] : []
// }
export const prisma = new PrismaClient()