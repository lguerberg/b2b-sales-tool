import { Injectable } from '@nestjs/common'

import { CampaignRepository } from '@/domain/campaign/repository'
import { User } from '@/domain/user'

import { EntityNotBelongError } from '../../infrastructure/errors/common/entityNotBelong.error'
import { EntityNotFoundError } from '../../infrastructure/errors/common/entityNotFound.error'

@Injectable()
export class EditCampaignMessage {
  constructor(private campaignRepository: CampaignRepository) {}

  async execute(userRequesting: User, campaignId: string, leadId: string, newMessage: string) {
    const campaign = await this.campaignRepository.findById(campaignId)
    if (!campaign) {
      throw new EntityNotFoundError('Campaign', campaignId)
    }
    if (campaign.group.ownerId !== userRequesting.id) {
      throw new EntityNotBelongError('Campaign', userRequesting.id)
    }
    await this.campaignRepository.editMessage(campaignId, leadId, newMessage)
  }
}
