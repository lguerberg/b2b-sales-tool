import { Company } from '../company'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  password: string
  avatarUrl?: string
  company?: Company
}
export interface UserMetrics {
  campaigns: number
  emailsSent: number
  emailsOpened: number
  scheduledCalls: number
  targetIndustry: string
  callsPerMonthByIndustry: {
    january: number
    february: number
    march: number
    april: number
    may: number
    june: number
    july: number
    august: number
    september: number
    october: number
    november: number
    december: number
  }
}
