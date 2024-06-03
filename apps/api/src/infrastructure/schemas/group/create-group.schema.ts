import { z } from 'zod'

export const createGroupBody = z.object({
  leadsIds: z.array(z.string()),
  name: z.string(),
  description: z.string(),
})

export type CreateGroupBody = z.infer<typeof createGroupBody>
