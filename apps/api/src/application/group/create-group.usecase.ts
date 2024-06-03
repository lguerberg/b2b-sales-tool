import { Injectable } from '@nestjs/common'

import { Group } from '@/domain/group'
import { GroupRepository } from '@/domain/group/repository'
import { LeadRepository } from '@/domain/lead/repository'

import { DomainValidationError } from '../../infrastructure/errors/common/domainValidation.error'

@Injectable()
export class CreateGroup {
  constructor(
    private groupRepository: GroupRepository,
    private leadRepository: LeadRepository,
  ) {}

  async execute(creatorId: string, leadIds: string[], data: Partial<Group>) {
    const leadsToInclude = await this.leadRepository.findManyByIds(leadIds)
    if (leadsToInclude.length !== leadIds.length) {
      throw new DomainValidationError(['Some leads do not exist'])
    }
    return this.groupRepository.create(creatorId, leadIds, data)
  }
}
