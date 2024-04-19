import { prisma } from "@/lib/prisma";
import { conversation } from "@/utils/conversation-pub-sub";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const sendMessageConversation = async (request: FastifyRequest, reply: FastifyReply) => {
  const paramsRequest = z.object({
    secretKey: z.string()
  })

  const bodyRequest = z.object({
    email: z.string().email(),
    created: z.string(),
    message: z.string()
  })

  try {
    const { secretKey } = paramsRequest.parse(request.params)
    const data = bodyRequest.parse(request.body)

    await prisma.$transaction(async p => {
      const conversations = await prisma.conversations.findMany({
        where: {
          secretChatKey: secretKey
        }
      })

      if (!conversation) {
        return reply.status(404).send({ message: 'Conversa não encontrada' })
      }

      for (const conversation of conversations) {
        await p.messages.create({
          data: {
            conversationsId: conversation.id,
            email: data.email,
            created: data.created,
            message: data.message
          }
        })
      }
    })

    conversation.public(secretKey, data)
    return reply.status(200).send()
  } catch (error) {
    return reply.status(400).send({ message: error })
  }
}