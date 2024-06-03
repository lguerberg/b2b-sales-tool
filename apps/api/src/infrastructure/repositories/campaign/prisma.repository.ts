import { Injectable } from '@nestjs/common'

import { CampaignEmailData } from '@/domain/campaign'
import { CampaignRepository } from '@/domain/campaign/repository'
import { LeadWithMessage } from '@/domain/lead'

import { mapPrismaCampaignToDomain } from '../../mappers/campaign.mapper'
import { PrismaService } from '../../services/prisma.service'

@Injectable()
export class PrismaCampaignRepository implements CampaignRepository {
  constructor(private prisma: PrismaService) {}

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
              content: emailData.body,
              calendlyUrl: emailData.calendlyUrl,
            })),
          },
        },
      },
      include: {
        group: true,
      },
    })
    return mapPrismaCampaignToDomain(prismaCampaign)
  }
}
