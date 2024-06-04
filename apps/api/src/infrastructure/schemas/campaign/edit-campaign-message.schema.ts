import { z } from 'zod'

export const editCampaignMessageBody = z.object({
  message: z.string(),
})

export type EditCampaignMessageBody = z.infer<typeof editCampaignMessageBody>
