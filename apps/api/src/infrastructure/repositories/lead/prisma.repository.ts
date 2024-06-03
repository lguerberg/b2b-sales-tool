import { Injectable } from '@nestjs/common'

import { LeadRepository } from '@/domain/lead/repository'

import { mapPrismaLeadToDomain } from '../../mappers/lead.mapper'
import { PrismaService } from '../../services/prisma.service'

@Injectable()
export class PrismaLeadRepository implements LeadRepository {
  constructor(private prisma: PrismaService) {}

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
