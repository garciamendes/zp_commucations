import { fastify } from '@/app'
import { env } from '@/env'

fastify.listen({
  host: '0.0.0.0',
  port: env.PORT
}).then(() => console.log('HTTP Server Running!'))
