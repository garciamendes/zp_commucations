import { prisma } from "@/lib/prisma";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const addFriend = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBody = z.object({
    email: z.string().email(),
    emailFriend: z.string().email()
  })

  const { email, emailFriend } = createBody.parse(request.body)

  const accountExist = await prisma.account.findFirst({ where: { email: email } })
  const accountFriendExist = await prisma.account.findFirst({ where: { email: emailFriend } })
  if (!accountExist || !accountFriendExist) {
    return reply.status(404).send({ message: 'Email Not found' })
  }

  try {

    await prisma.account.update({
      where: { email },
      data: {
        friends: {
          connect: { email: emailFriend }
        }
      }
    })

    return reply.status(200).send()
  } catch (error) {
    return reply.status(400).send({ message: error })
  }
}