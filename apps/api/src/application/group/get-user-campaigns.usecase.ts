import { Injectable } from '@nestjs/common'

import { CampaignRepository } from '@/domain/campaign/repository'

@Injectable()
export class GetUserCampaigns {
  constructor(private campaignRepository: CampaignRepository) {}

  async execute(userId: string, limit: number, offset: number) {
    return this.campaignRepository.findByUserId(userId, limit, offset)
  }
}
