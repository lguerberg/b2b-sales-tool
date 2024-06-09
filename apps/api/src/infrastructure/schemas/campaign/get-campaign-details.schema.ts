import { z } from 'zod'

export const getCampaignDetailsResponse = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.string(),
  group: z.object({
    name: z.string(),
    description: z.string(),
  }),
  emails: z.array(
    z.object({
      lead: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
      }),
      id: z.string(),
      subject: z.string(),
      message: z.string(),
      status: z.string(),
    }),
  ),
  analytics: z.object({
    emailsSentCount: z.number(),
    emailsOpenedCount: z.number(),
    emailsFailedCount: z.number(),
    emailsClickedCount: z.number(),
    meetingsScheduledCount: z.number(),
  }),
})

export type GetCampaignDetailsResponse = z.infer<typeof getCampaignDetailsResponse>
