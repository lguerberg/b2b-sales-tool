import { Campaign as PrismaCampaign, Group as PrismaGroup } from '@prisma/client'

import { Campaign } from '@/domain/campaign'

import { mapPrismaGroupToDomain } from './group.mapper'

export const mapPrismaCampaignToDomain = (campaign: PrismaCampaign & { group: PrismaGroup }): Campaign =>
  ({
    id: campaign.id,
    name: campaign.name,
    description: campaign.description || '',
    status: campaign.status,
    analytics: {
      emailsClickedCount: campaign.emailsClickedCount,
      emailsFailedCount: campaign.emailsFailedCount,
      emailsOpenedCount: campaign.emailsOpenedCount,
      emailsSentCount: campaign.emailsSentCount,
      meetingsScheduledCount: campaign.meetingsScheduledCount,
    },
    emails: [],
    group: mapPrismaGroupToDomain(campaign.group),
  }) satisfies Campaign
