import { Injectable } from '@nestjs/common'

import { Group } from '@/domain/group'
import { GroupRepository } from '@/domain/group/repository'

import { mapPrismaGroupToDomain } from '../../mappers/group.mapper'
import { PrismaService } from '../../services/prisma.service'
import { hasMoreRecords } from '../../utils/paginate.utils'

@Injectable()
export class PrismaGroupRepository implements GroupRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Group | null> {
    const prismaGroup = await this.prisma.group.findUnique({
      where: {
        id,
      },
    })
    if (!prismaGroup) {
      return null
    }
    return mapPrismaGroupToDomain(prismaGroup)
  }

  async findByUserId(id: string, limit: number, offset: number) {
    const [prismaGroups, total] = await Promise.all([
      this.prisma.group.findMany({
        where: {
          userCreatedId: id,
        },
        take: limit,
        skip: offset,
      }),
      this.prisma.group.count({
        where: {
          userCreatedId: id,
        },
      }),
    ])
    return {
      data: prismaGroups.map(mapPrismaGroupToDomain),
      total,
      hasMore: hasMoreRecords(total, limit, offset),
    }
  }

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
