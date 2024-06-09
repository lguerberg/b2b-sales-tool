import { CampaingStatus } from '@prisma/client'

import { Campaign, CampaignEmailData } from '.'
import { Paginated } from '../../infrastructure/types/paginate'
import { Lead } from '../lead'
import { UserMetrics } from '../user'

export abstract class CampaignRepository {
  abstract findMonthlyMetrics(): Promise<UserMetrics['callsPerMonthByIndustry']>

  abstract findById(id: string): Promise<Campaign | null>

  abstract findByUserId(userId: string, limit?: number, offset?: number): Promise<Paginated<Campaign>>

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
