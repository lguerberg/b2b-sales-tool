import { Injectable } from '@nestjs/common'

import { Lead } from '@/domain/lead'
import { LeadRepository } from '@/domain/lead/repository'

import { mapPrismaLeadToDomain } from '../../mappers/lead.mapper'
import { PrismaService } from '../../services/prisma.service'

@Injectable()
export class PrismaLeadRepository implements LeadRepository {
  constructor(private prisma: PrismaService) {}

  async findByGroupId(groupId: string): Promise<Lead[]> {
    const prismaLeads = await this.prisma.groupLeads.findMany({
      where: {
        groupId,
      },
      include: {
        lead: true,
      },
    })
    return prismaLeads.map(groupLead => mapPrismaLeadToDomain(groupLead.lead))
  }

  async findManyByIds(leadIds: string[]): Promise<Lead[]> {
    const prismaLeads = await this.prisma.lead.findMany({
      where: {
        id: {
          in: leadIds,
        },
      },
    })
    return prismaLeads.map(lead => mapPrismaLeadToDomain(lead))
  }

  async findById(id: string) {
    const prismaLead = await this.prisma.lead.findUnique({
      where: {
        id,
      },
    })
    if (!prismaLead) {
      return null
    }
    return mapPrismaLeadToDomain(prismaLead)
  }
}
