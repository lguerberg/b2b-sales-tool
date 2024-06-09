import {
  Campaign as PrismaCampaign,
  CampaignEmail as PrismaCampaignEmail,
  Group as PrismaGroup,
  Lead as PrismaLead,
} from '@prisma/client'

import { Campaign } from '@/domain/campaign'

import { GetCampaignDetailsResponse } from '../schemas/campaign/get-campaign-details.schema'
import { mapPrismaGroupToDomain } from './group.mapper'

export const mapPrismaCampaignToDomain = (
  campaign: PrismaCampaign,
  extra: {
    group: PrismaGroup
    emails?: (PrismaCampaignEmail & { lead: PrismaLead })[]
  },
): Campaign =>
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
    emails: extra?.emails
      ? extra.emails.map(email => ({
          id: email.id,
          campaignId: email.campaignId,
          subject: email.subject,
          body: email.content,
          openedAt: email.openedAt || undefined,
          isClicked: email.isClicked,
          status: email.status,
          lead: {
            id: email.lead.id,
            name: `${email.lead.firstName} ${email.lead.lastName}`,
            email: email.lead.email,
          },
        }))
      : [],
    group: mapPrismaGroupToDomain(extra.group),
  }) satisfies Campaign

export const mapToGetCampaignDetailsResponse = (campaign: Campaign) =>
  ({
    id: campaign.id,
    name: campaign.name,
    description: campaign.description,
    status: campaign.status,
    group: {
      name: campaign.group.name,
      description: campaign.group.description,
    },
    emails: campaign.emails.map(email => ({
      id: email.id,
      subject: email.subject,
      message: email.body,
      status: email.status,
      lead: {
        id: email.lead.id,
        email: email.lead.email,
        name: `${email.lead.name}`,
      },
    })),
    analytics: {
      emailsSentCount: campaign.analytics.emailsSentCount,
      emailsOpenedCount: campaign.analytics.emailsOpenedCount,
      emailsFailedCount: campaign.analytics.emailsFailedCount,
      emailsClickedCount: campaign.analytics.emailsClickedCount,
      meetingsScheduledCount: campaign.analytics.meetingsScheduledCount,
    },
  }) satisfies GetCampaignDetailsResponse
