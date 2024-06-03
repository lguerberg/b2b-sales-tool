import { z } from 'zod'

export const loginBody = z.object({
  email: z.string(),
  password: z.string(),
})

export type LoginBody = z.infer<typeof loginBody>
