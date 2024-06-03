import { z } from 'zod'

export const getLeadDetailsResponse = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  currentPosition: z.object({
    company: z.object({
      name: z.string(),
    }),
    seniority: z.string(),
    yearsInCurrentPosition: z.number(),
    jobTitle: z.string(),
    jobDescription: z.string(),
    isDecisionMaker: z.boolean(),
  }),
})

export type GetLeadDetailsResponse = z.infer<typeof getLeadDetailsResponse>
