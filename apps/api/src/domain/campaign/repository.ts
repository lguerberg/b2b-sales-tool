import { Campaign, CampaignEmailData } from '.'
import { LeadWithMessage } from '../lead'

export abstract class CampaignRepository {
  abstract findById(id: string): Promise<Campaign | null>

  abstract findWithEmailsById(id: string): Promise<Campaign | null>

  abstract create(
    leads: LeadWithMessage[],
    emailData: CampaignEmailData,
    groupId: string,
    name: string,
    description: string,
  ): Promise<Campaign>

  abstract editMessage(campaignId: string, leadId: string, message: string): Promise<void>
}
