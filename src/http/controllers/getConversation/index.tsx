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
      }
    })

    let conversationResponse = {
      accountOwnerId: conversation?.accountOwnerId,
      friendEmail: conversation?.friendEmail,
      id: conversation?.id,
      secretChatKey: conversation?.secretChatKey,
      messages: [] as Array<IMessage>
    }
    const n: Array<IMessage> = insertionSort(conversation?.messages as Array<object>)
    conversationResponse.messages = n

    return reply.status(200).send(conversationResponse)
  } catch (error) {
    return reply.status(400).send({ message: error })
  }
}

function insertionSort(arr: Array<any>) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1

    const temp = arr[i]
    while (j >= 0 && new Date(arr[j].created) < new Date(temp.created)) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = temp
  }

  return arr
}