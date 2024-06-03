import { Campaign, CampaignEmailData } from '.'
import { LeadWithMessage } from '../lead'

export abstract class CampaignRepository {
  abstract create(
    leads: LeadWithMessage[],
    emailData: CampaignEmailData,
    groupId: string,
    name: string,
    description: string,
  ): Promise<Campaign>
}
