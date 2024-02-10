import { prisma } from "@/lib/prisma";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { hash } from 'bcryptjs'

export const definePasswordAccount = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBody = z.object({
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string()
  })

  const { email, password, confirmPassword } = createBody.parse(request.body)


  const accountExist = await prisma.account.findFirst({ where: { email: email } })
  if (!accountExist) {
    return reply.status(404).send({ message: 'Email Not found' })
  }

  try {
    if (password !== confirmPassword) {
      return reply.status(403).send({ message: 'Password and ConfirmPassword not match' })
    }

    const passwordhash = await hash(password, 6)
    await prisma.account.update({
      where: { email },
      data: {
        password_hash: passwordhash,
        is_finish_auth: true
      }
    })

    return reply.status(200).send()
  } catch (error) {
    return reply.status(400).send({ message: error })
  }
}