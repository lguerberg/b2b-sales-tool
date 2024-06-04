import { Injectable } from '@nestjs/common'

import { CampaignRepository } from '@/domain/campaign/repository'
import { User } from '@/domain/user'

import { EntityNotBelongError } from '../../infrastructure/errors/common/entityNotBelong.error'
import { EntityNotFoundError } from '../../infrastructure/errors/common/entityNotFound.error'

@Injectable()
export class GetCampaignDetails {
  constructor(private campaignRepository: CampaignRepository) {}

  async execute(userRequesting: User, campaingId: string) {
    const campaign = await this.campaignRepository.findWithEmailsById(campaingId)
    if (!campaign) {
      throw new EntityNotFoundError('Campaign', campaingId)
    }
    if (campaign.group.ownerId !== userRequesting.id) {
      throw new EntityNotBelongError('Campaign', userRequesting.id)
    }
    return campaign
  }
}
