import { Injectable } from '@nestjs/common'

import { CampaignRepository } from '@/domain/campaign/repository'
import { User, UserMetrics } from '@/domain/user'

@Injectable()
export class GetUserMetrics {
  constructor(private campaignRepository: CampaignRepository) {}

  async execute(user: User) {
    const userCampaigns = await this.campaignRepository.findByUserId(user.id)

    return {
      campaigns: userCampaigns.total,
      emailsOpened: userCampaigns.data.map(c => c.analytics.emailsOpenedCount).reduce((acc, curr) => acc + curr, 0),
      emailsSent: userCampaigns.data.map(c => c.analytics.emailsSentCount).reduce((acc, curr) => acc + curr, 0),
      scheduledCalls: userCampaigns.data
        .map(c => c.analytics.meetingsScheduledCount)
        .reduce((acc, curr) => acc + curr, 0),
      targetIndustry: user.company?.onboardData?.targetIndustry[0] || '',
      callsPerMonthByIndustry: await this.campaignRepository.findMonthlyMetrics(),
    } satisfies UserMetrics
  }
}
