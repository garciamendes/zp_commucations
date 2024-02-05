import Fastify from 'fastify'
import FastifyJWT from '@fastify/jwt'
import FastifyCookie from '@fastify/cookie'
import FastifyCors from '@fastify/cors'
import { ZodError } from 'zod'
import { env } from '@/env'

export const fastify = Fastify()

fastify.register(FastifyCors, {
  origin: env.CORS_ORIGIN
})
fastify.register(FastifyJWT, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '1d'
  }
})
fastify.register(FastifyCookie)

fastify.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error: ', issue: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})