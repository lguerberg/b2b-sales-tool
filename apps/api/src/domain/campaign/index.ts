import { CampaingStatus, MessageStatus } from '@prisma/client'

export interface Campaign {
  id: string
  name: string
  description: string
  status: CampaingStatus
  emails: CampaignEmail[]
  analytics: {
    emailsSentCount: number
    emailsOpenedCount: number
    emailsFailedCount: number
    emailsClickedCount: number
    meetingsScheduledCount: number
  }
}

export interface CampaignEmail {
  id: string
  campaignId: string
  subject: string
  body: string
  openedAt?: Date
  isClicked: boolean
  status: MessageStatus
}
