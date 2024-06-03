import { Injectable } from '@nestjs/common'

import { Group } from '@/domain/group'
import { GroupRepository } from '@/domain/group/repository'

import { mapPrismaGroupToDomain } from '../../mappers/group.mapper'
import { PrismaService } from '../../services/prisma.service'

@Injectable()
export class PrismaGroupRepository implements GroupRepository {
  constructor(private prisma: PrismaService) {}

  async create(creatorId: string, leadIds: string[], data: Partial<Group>): Promise<Group> {
    const prismaGroup = await this.prisma.group.create({
      data: {
        userCreatedId: creatorId,
        name: data.name || '',
        description: data.description || '',
        leads: {
          createMany: {
            skipDuplicates: true,
            data: leadIds.map(leadId => ({
              leadId,
            })),
          },
        },
      },
    })
    return mapPrismaGroupToDomain(prismaGroup)
  }
}
