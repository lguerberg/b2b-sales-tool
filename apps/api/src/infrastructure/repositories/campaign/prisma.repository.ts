import { Injectable } from '@nestjs/common'

import { Campaign, CampaignEmailData } from '@/domain/campaign'
import { CampaignRepository } from '@/domain/campaign/repository'
import { LeadWithMessage } from '@/domain/lead'

import { mapPrismaCampaignToDomain } from '../../mappers/campaign.mapper'
import { PrismaService } from '../../services/prisma.service'

@Injectable()
export class PrismaCampaignRepository implements CampaignRepository {
  constructor(private prisma: PrismaService) {}

  async findWithEmailsById(id: string): Promise<Campaign | null> {
    const prismaCampaign = await this.prisma.campaign.findUnique({
      where: {
        id,
      },
      include: {
        emails: true,
        group: true,
      },
    })
    if (!prismaCampaign) {
      return null
    }
    return mapPrismaCampaignToDomain(prismaCampaign, {
      emails: prismaCampaign.emails,
      group: prismaCampaign.group,
    })
  }

  async findById(id: string) {
    const prismaCampaign = await this.prisma.campaign.findUnique({
      where: {
        id,
      },
      include: {
        group: true,
      },
    })
    if (!prismaCampaign) {
      return null
    }
    return mapPrismaCampaignToDomain(prismaCampaign, {
      group: prismaCampaign.group,
    })
  }

  async create(
    leads: LeadWithMessage[],
    emailData: CampaignEmailData,
    groupId: string,
    name: string,
    description: string,
  ) {
    const prismaCampaign = await this.prisma.campaign.create({
      data: {
        name,
        description,
        groupId,
        emails: {
          createMany: {
            data: leads.map(lead => ({
              leadId: lead.id,
              subject: emailData.subject,
              content: lead.message,
              calendlyUrl: emailData.calendlyUrl,
            })),
          },
        },
      },
      include: {
        group: true,
      },
    })
    return mapPrismaCampaignToDomain(prismaCampaign, {
      group: prismaCampaign.group,
    })
  }

  async editMessage(campaignId: string, leadId: string, message: string): Promise<void> {
    await this.prisma.campaignEmail.updateMany({
      where: {
        campaignId,
        leadId,
      },
      data: {
        content: message,
      },
    })
  }
}
