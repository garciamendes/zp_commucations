import { prisma } from "@/lib/prisma";
import { invitationAddUser } from "@/utils/invitation-add-user-pub-sub";
import { randomUUID } from "node:crypto";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const addFriend = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBody = z.object({
    email: z.string().email(),
    emailFriend: z.string().email()
  })

  const { email, emailFriend } = createBody.parse(request.body)

  if (emailFriend === email)
    return reply.status(400).send({ message: "Não pode se auto convidar" })

  const accountExist = await prisma.account.findFirst({
    where: { email: email },
    include: {
      friends: {
        select: {
          email: true
        }
      },
      invite: true
    }
  })
  const accountFriendExist = await prisma.account.findFirst({
    where: { email: emailFriend },
    include: {
      friends: {
        select: { email: true }
      },
      invite: true
    }
  })

  if (!accountExist || !accountFriendExist) {
    return reply.status(404).send({ message: 'Email não encontrado' })
  }

  const listInvitationsAccountFriend = await prisma.invite.findUnique({
    where: { accountId: accountFriendExist.id }
  })

  if (listInvitationsAccountFriend?.invitations.includes(accountExist.email))
    return reply.status(400).send({ message: 'Convite já foi enviado' })

  if (
    accountFriendExist?.friends.includes({ email: accountExist.email }) ||
    accountExist?.friends.includes({ email: accountFriendExist.email })
  )
    return reply.status(400).send({ message: 'Já se encontra na sua lista de amizade' })

  try {
    await prisma.invite.update({
      where: { accountId: accountFriendExist.id },
      data: {
        invitations: {
          push: accountExist.email
        }
      }
    })

    invitationAddUser.public(accountFriendExist.email, {
      email: accountExist.email
    })

    const secretKey = randomUUID()
    await prisma.conversations.create({
      data: {
        friendEmail: accountFriendExist.email,
        accountOwnerId: accountExist.id,
        secretChatKey: secretKey
      }
    })
    await prisma.conversations.create({
      data: {
        friendEmail: accountExist.email,
        accountOwnerId: accountFriendExist.id,
        secretChatKey: secretKey
      }
    })

    return reply.status(200).send({ message: 'Convite enviado com sucesso' })
  } catch (error) {
    return reply.status(400).send({ message: error })
  }
}