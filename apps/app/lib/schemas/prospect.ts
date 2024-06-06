'use client'

import { z } from 'zod'

export const prospectSchema = z.object({
  name: z.string(),
  email: z.string(),
  jobTitle: z.string(),
  seniority: z.string(),
  language: z.string(),
  industry: z.string(),
  hqLocation: z.string(),
  companyType: z.string(),
  companySize: z.string(),
  isDecisionMaker: z.boolean(),
})

export type ProspectSchema = z.infer<typeof prospectSchema>
