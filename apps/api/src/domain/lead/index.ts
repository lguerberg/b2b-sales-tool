import { Seniority } from '@prisma/client'

export type LeadLanguage = 'en' | 'es' | 'fr' | 'it'

export interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  enrichedSummary: string
  language: LeadLanguage
  currentPosition: {
    company: {
      name: string
      logoUrl?: string
    }
    seniority: Seniority
    yearsInCurrentPosition: number
    jobTitle: string
    jobDescription: string
    isDecisionMaker: boolean
  }
}

export interface LeadWithMessage extends Lead {
  message: string
}
