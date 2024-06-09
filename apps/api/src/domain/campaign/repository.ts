import { CampaingStatus } from '@prisma/client'

import { Campaign, CampaignEmailData } from '.'
import { Lead } from '../lead'

export abstract class CampaignRepository {
  abstract findById(id: string): Promise<Campaign | null>

  abstract changeStatus(campaignId: string, status: CampaingStatus): Promise<void>

  abstract findWithEmailsById(id: string): Promise<Campaign | null>

  abstract create(
    leads: Lead[],
    emailData: CampaignEmailData,
    groupId: string,
    name: string,
    description: string,
  ): Promise<Campaign>

  abstract editMessage(campaignId: string, leadId: string, message: string): Promise<void>
}
