import { prisma } from "@/lib/prisma";
import { Conversations } from "@prisma/client";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export interface IMessage {
  email: string
  created: string
  message: string
}

export const getConversation = async (request: FastifyRequest, reply: FastifyReply) => {
  const paramsRequest = z.object({
    friendEmail: z.string().email()
  })

  try {
    const { friendEmail } = paramsRequest.parse(request.params)
    const { sub: user_id } = request.user

    const account = await prisma.account.findUnique({
      where: { id: user_id },
      select: {
        id: true
      }
    })
    const accountFriend = await prisma.account.findUnique({
      where: { email: friendEmail },
      select: {
        email: true
      }
    })

    const conversation = await prisma.conversations.findUnique({
      where: {
        accountOwnerId: account?.id,
        friendEmail: accountFriend?.email
      },
      select: {
        id: true,
        friendEmail: true,
        owner: true,
        secretChatKey: true,
        messages: {
          select: {
            email: true,
            created: true,
            message: true
          },
          orderBy: {
            created: 'asc'
          }
        }
      }
    })

    return reply.status(200).send(conversation)
  } catch (error) {
    return reply.status(400).send({ message: error })
  }
}