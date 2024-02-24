import { prisma } from "@/lib/prisma";
import { exclude } from "@/utils/excludeFields";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const getCurrentAccount = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { sub: user_id } = request.user

    const account = await prisma.account.findUnique({
      where: { id: user_id },
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
      }
    })

    if (!account)
      return reply.status(404).send({ message: 'Account not found!' })

    const accountResults = exclude(account, ['password_hash', 'selfAccountId'])
    return reply.status(200).send(accountResults)
  } catch (error) {
    return reply.status(400).send({ message: error })
  }
}