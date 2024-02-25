import { prisma } from "@/lib/prisma";
import { exclude } from "@/utils/excludeFields";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const createAccount = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBody = z.object({
    email: z.string().email()
  })

  const { email } = createBody.parse(request.body)


  const accountExist = await prisma.account.findFirst({ where: { email: email } })
  if (accountExist) {
    return reply.status(403).send({ message: 'Email Already exists' })
  }

  try {
    const account = await prisma.$transaction(async (p) => {
      const account = await prisma.account.create({
        data: {
          email,
        },
        include: {
          friends: {
            select: {
              avatar: true,
              email: true,
              id: true,
              name: true,
            }
          },
          invite: {
            select: {
              invitations: true
            }
          }
        },
      })

      await p.invite.create({
        data: {
          accountId: account.id
        }
      })

      return account
    })
    const replyAccountData = exclude(account, ["password_hash", "selfAccountId"])

    return reply.status(201).send(replyAccountData)
  } catch (error) {
    return reply.status(400).send({ message: error })
  }
}