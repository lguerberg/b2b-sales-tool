import { CompanySize, IntegrationProvider } from '@prisma/client'

export interface Company {
  id: string
  name: string
  logoUrl?: string
  primaryColor?: string
  secondaryColor?: string
  size: CompanySize
  industry: string
  type: string
  onboardData?: CompanyOnboard
}

export interface CompanyIntegration {
  provider: IntegrationProvider
  key: string
}

export interface CompanyOnboard {
  conversionRate: number
  mediumTicketPrice: number
  targetIndustry: string[]
  salesSpeechContext: string
  calendlyUrl: string
}
