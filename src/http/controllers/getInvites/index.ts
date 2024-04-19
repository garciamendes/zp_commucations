import { prisma } from "@/lib/prisma";
import type { FastifyReply, FastifyRequest } from "fastify";

export const getInvites = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { sub: user_id } = request.user

    const invite = await prisma.invite.findUnique({ where: { accountId: user_id } })

    if (!invite)
      return reply.status(404).send({ message: 'Conta não encontrada!' })

    return reply.status(200).send(invite)
  } catch (error) {
    return reply.status(400).send({ message: error })
  }
}