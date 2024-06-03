import { z } from 'zod'

export const createCampaignBody = z.object({
  name: z.string(),
  description: z.string(),
  subject: z.string(),
  body: z.string(),
})

export type CreateCampaignBody = z.infer<typeof createCampaignBody>
