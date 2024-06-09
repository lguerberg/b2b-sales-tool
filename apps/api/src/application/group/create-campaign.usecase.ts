import { Injectable } from '@nestjs/common'
import { batchedPromiseAll } from 'batched-promise-all'

import { Campaign } from '@/domain/campaign'
import { CampaignRepository } from '@/domain/campaign/repository'
import { Lead } from '@/domain/lead'
import { User } from '@/domain/user'

import { OpenAiService } from '../../infrastructure/services/openai.service'
import { GetGroupLeads } from './get-group-leads.usecase'

@Injectable()
export class CreateCampaign {
  constructor(
    private campaignRepository: CampaignRepository,
    private getGroupLeads: GetGroupLeads,
    private openAiService: OpenAiService,
  ) {}

  async execute(user: User, subject: string, groupId: string, name: string, description: string) {
    const leads = await this.getGroupLeads.execute(user, groupId)
    const campaign = await this.campaignRepository.create(
      leads,
      {
        subject,
        calendlyUrl: user.company?.onboardData?.calendlyUrl || '',
      },
      groupId,
      name,
      description,
    )
    this.createEmails(campaign, leads, user, subject)
    return campaign
  }

  async createEmails(campaing: Campaign, leads: Lead[], user: User, subject: string) {
    await batchedPromiseAll(
      leads,
      async lead =>
        this.campaignRepository.editMessage(
          campaing.id,
          lead.id,
          await this.openAiService.generateLeadMessage(lead, user, subject),
        ),
      10,
    )
    await this.campaignRepository.changeStatus(campaing.id, 'PENDING')
  }
}
