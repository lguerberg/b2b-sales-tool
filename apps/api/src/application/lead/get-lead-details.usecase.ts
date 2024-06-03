import { Injectable } from '@nestjs/common'

import { LeadRepository } from '@/domain/lead/repository'

import { EntityNotFoundError } from '../../infrastructure/errors/common/entityNotFound.error'

@Injectable()
export class GetLeadDetails {
  constructor(private leadRepository: LeadRepository) {}

  async execute(id: string) {
    // TODO Implement redis cache
    const lead = await this.leadRepository.findById(id)
    if (!lead) {
      throw new EntityNotFoundError('Lead', id)
    }
    return lead
  }
}
