import { Seniority } from '@prisma/client'

import { Company } from '../company'

export interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  enrichedSummary: string
  currentPosition?: {
    company: Company
    seniority: Seniority
    yearsInCurrentPosition: number
    jobTitle: string
    jobDescription: string
    isDecisionMaker: boolean
  }
}
