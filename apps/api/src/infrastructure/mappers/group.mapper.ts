import { Group as PrismaGroup } from '@prisma/client'

import { Group } from '@/domain/group'

import { GroupDTO } from '../schemas/group/dto'

export const mapPrismaGroupToDomain = (prismaGroup: PrismaGroup): Group =>
  ({
    id: prismaGroup.id,
    name: prismaGroup.name,
    description: prismaGroup.description || '',
    ownerId: prismaGroup.userCreatedId,
  }) satisfies Group

export const mapToGroupResponse = (group: Group) =>
  ({
    id: group.id,
    name: group.name,
    description: group.description,
  }) satisfies GroupDTO
