import { prisma } from "@/lib/prisma";
import { exclude } from "@/utils/excludeFields";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export const acceptOrNotInvite = async (request: FastifyRequest, reply: FastifyReply) => {
  const acceptInviteBody = z.object({
    emailToConfirmAccept: z.string().email(),
    accept: z.boolean()
  })

  const { emailToConfirmAccept, accept } = acceptInviteBody.parse(request.body)

  try {
    const { sub: user_id } = request.user

    const invite = await prisma.invite.findUnique({ where: { accountId: user_id } })

    if (!invite)
      return reply.status(404).send({ message: 'Account not found!' })

    if (!invite?.invitations.includes(emailToConfirmAccept))
      return reply.status(400).send('Email not foun in your invites')

    const invitesWithoutEmailAccept = invite.invitations.filter(email => email !== emailToConfirmAccept)
    if (!accept) {
      const inviteUpdated = await prisma.invite.update({
        where: { accountId: user_id },
        data: {
          invitations: {
            set: invitesWithoutEmailAccept
          }
        }
      })

      return reply.status(200).send(inviteUpdated)
    }

    const accountFriend = await prisma.account.findUnique({ where: { email: emailToConfirmAccept } })

    if (!accountFriend)
      return reply.status(404).send({ message: 'Account not found!' })

    const myAccount = await prisma.account.update({
      where: { id: user_id },
      data: {
        friends: {
          connect: { email: accountFriend.email }
        }
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
      }
    })

    await prisma.account.update({
      where: { email: emailToConfirmAccept },
      data: {
        friends: {
          connect: { email: myAccount.email }
        }
      },
    })

    const inviteUpdated = await prisma.invite.update({
      where: { accountId: user_id },
      data: {
        invitations: {
          set: invitesWithoutEmailAccept
        }
      }
    })

    const accountResults = exclude(myAccount, ['password_hash', 'selfAccountId'])
    return reply.status(200).send({ 'account': accountResults, 'invite': inviteUpdated })
  } catch (error) {
    return reply.status(400).send({ message: error })
  }
}