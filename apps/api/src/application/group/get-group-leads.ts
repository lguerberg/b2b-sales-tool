import { Injectable } from '@nestjs/common'

import { GroupRepository } from '@/domain/group/repository'
import { LeadRepository } from '@/domain/lead/repository'
import { User } from '@/domain/user'

import { EntityNotBelongError } from '../../infrastructure/errors/common/entityNotBelong.error'
import { EntityNotFoundError } from '../../infrastructure/errors/common/entityNotFound.error'

@Injectable()
export class GetGroupLeads {
  constructor(
    private groupRepository: GroupRepository,
    private leadRepository: LeadRepository,
  ) {}

  async execute(userRequesting: User, groupId: string) {
    const group = await this.groupRepository.findById(groupId)
    if (!group) {
      throw new EntityNotFoundError('Group', groupId)
    }

    if (group.ownerId !== userRequesting.id) {
      throw new EntityNotBelongError('Group', userRequesting.id)
    }

    return this.leadRepository.findByGroupId(groupId)
  }
}
