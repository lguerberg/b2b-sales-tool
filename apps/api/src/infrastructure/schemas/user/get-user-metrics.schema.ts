import { z } from 'zod'

export const getUserMetricsResponse = z.object({
  campaigns: z.number(),
  emailsSent: z.number(),
  emailsOpened: z.number(),
  scheduledCalls: z.number(),
  targetIndustry: z.string(),
  callsPerMonthByIndustry: z.object({
    january: z.number(),
    february: z.number(),
    march: z.number(),
    april: z.number(),
    may: z.number(),
    june: z.number(),
    july: z.number(),
    august: z.number(),
    september: z.number(),
    october: z.number(),
    november: z.number(),
    december: z.number(),
  }),
})

export type GetUserMetricsResponse = z.infer<typeof getUserMetricsResponse>
