import { CampaingStatus, MessageStatus } from '@prisma/client'

import { Group } from '../group'

export interface Campaign {
  id: string
  name: string
  description: string
  status: CampaingStatus
  emails: CampaignEmail[]
  group: Group
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

export interface CampaignEmailData {
  subject: string
  calendlyUrl: string
}
