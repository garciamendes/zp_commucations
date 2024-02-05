import 'dotenv-safe/config'
import { z as zod } from 'zod'

const envSchema = zod.object({
  NODE_ENV: zod.enum(['dev', 'production', 'test']).default('dev'),
  PORT: zod.coerce.number().default(3333),
  JWT_SECRET: zod.string(),
  CORS_ORIGIN: zod.string()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables: ', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data