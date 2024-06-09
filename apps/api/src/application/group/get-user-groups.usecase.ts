import { Injectable } from '@nestjs/common'

import { GroupRepository } from '@/domain/group/repository'

@Injectable()
export class GetUserGroups {
  constructor(private groupRepository: GroupRepository) {}

  async execute(userId: string, limit: number, offset: number) {
    return this.groupRepository.findByUserId(userId, limit, offset)
  }
}
