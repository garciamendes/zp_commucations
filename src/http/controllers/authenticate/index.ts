import { prisma } from "@/lib/prisma";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { compare } from 'bcryptjs'

export const authenticateAccount = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBody = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = createBody.parse(request.body)

  try {
    const account = await prisma.account.findFirst({ where: { email: email } })
    if (!account) {
      return reply.status(404).send({ message: 'Email Not found' })
    }

    if (!account.is_finish_auth) {
      return reply.status(401).send({ message: 'Account not finalized' })
    }

    const doesPasswordMatch = await compare(password, account.password_hash as string)
    if (!doesPasswordMatch)
      return reply.status(400).send({ message: 'Error when trying to authenticate'})

    const token = await reply.jwtSign(
      {},
      {
        sign: { sub: account.id },
      },
    )
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: { sub: account.id, expiresIn: '7d' },
      },
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token: token })
  } catch (error) {
    return reply.status(400).send(error)
  }
}