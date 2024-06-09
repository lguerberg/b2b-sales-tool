import { z } from 'zod'

export const meResponse = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  avatarUrl: z.string().optional(),
})

export type MeResponse = z.infer<typeof meResponse>
