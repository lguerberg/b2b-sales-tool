import { z } from 'zod'

export const groupDTO = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
})

export type GroupDTO = z.infer<typeof groupDTO>
