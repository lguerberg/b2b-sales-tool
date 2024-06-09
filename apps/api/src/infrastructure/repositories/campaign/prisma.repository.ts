import { Injectable } from '@nestjs/common'
import { $Enums, CampaingStatus } from '@prisma/client'

import { Campaign, CampaignEmailData } from '@/domain/campaign'
import { CampaignRepository } from '@/domain/campaign/repository'
import { Lead } from '@/domain/lead'
import { UserMetrics } from '@/domain/user'

import { mapPrismaCampaignToDomain } from '../../mappers/campaign.mapper'
import { PrismaService } from '../../services/prisma.service'
import { filterByMonthIndex } from '../../utils/campaign.utils'
import { hasMoreRecords } from '../../utils/paginate.utils'

@Injectable()
export class PrismaCampaignRepository implements CampaignRepository {
  constructor(private prisma: PrismaService) {}

  async findWithEmailsById(id: string): Promise<Campaign | null> {
    const prismaCampaign = await this.prisma.campaign.findUnique({
      where: {
        id,
      },
      include: {
        emails: {
          include: {
            lead: true,
          },
        },
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

  async create(leads: Lead[], emailData: CampaignEmailData, groupId: string, name: string, description: string) {
    const prismaCampaign = await this.prisma.campaign.create({
      data: {
        name,
        description,
        groupId,
        status: CampaingStatus.CREATING,
        emails: {
          createMany: {
            data: leads.map(lead => ({
              leadId: lead.id,
              subject: emailData.subject,
              content: '',
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

  async changeStatus(campaignId: string, status: $Enums.CampaingStatus): Promise<void> {
    await this.prisma.campaign.update({
      where: {
        id: campaignId,
      },
      data: {
        status,
      },
    })
  }

  async findByUserId(userId: string, limit?: number, offset?: number) {
    const where = {
      group: {
        userCreatedId: userId,
      },
    }
    const [prismaCampaigns, total] = await Promise.all([
      this.prisma.campaign.findMany({
        where,
        include: {
          group: true,
        },
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.campaign.count({
        where,
      }),
    ])
    return {
      total,
      data: prismaCampaigns.map(prismaCampaign =>
        mapPrismaCampaignToDomain(prismaCampaign, {
          group: prismaCampaign.group,
        }),
      ),
      hasMore: limit && offset ? hasMoreRecords(total, limit, offset) : false,
    }
  }

  async findMonthlyMetrics() {
    const campaigns = await this.prisma.campaign.findMany({
      select: {
        createdAt: true,
      },
    })
    return {
      january: filterByMonthIndex(campaigns, 0).length,
      february: filterByMonthIndex(campaigns, 1).length,
      march: filterByMonthIndex(campaigns, 2).length,
      april: filterByMonthIndex(campaigns, 3).length,
      may: filterByMonthIndex(campaigns, 4).length,
      june: filterByMonthIndex(campaigns, 5).length,
      july: filterByMonthIndex(campaigns, 6).length,
      august: filterByMonthIndex(campaigns, 7).length,
      september: filterByMonthIndex(campaigns, 8).length,
      october: filterByMonthIndex(campaigns, 9).length,
      november: filterByMonthIndex(campaigns, 10).length,
      december: filterByMonthIndex(campaigns, 11).length,
    } satisfies UserMetrics['callsPerMonthByIndustry']
  }
}
