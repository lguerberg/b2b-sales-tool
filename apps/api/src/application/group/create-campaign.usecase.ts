import { Injectable } from '@nestjs/common'
import { batchedPromiseAll } from 'batched-promise-all'

import { CampaignEmailData } from '@/domain/campaign'
import { CampaignRepository } from '@/domain/campaign/repository'
import { LeadWithMessage } from '@/domain/lead'
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
    const leadsWithMessage = (await batchedPromiseAll(
      leads,
      async lead =>
        ({
          ...lead,
          message: await this.openAiService.generateLeadMessage(lead, user.company?.onboardData?.salesSpeechContext),
        }) satisfies LeadWithMessage,
      10,
    )) as LeadWithMessage[]

    return this.campaignRepository.create(
      leadsWithMessage,
      {
        subject,
        calendlyUrl: user.company?.onboardData?.calendlyUrl || '',
      },
      groupId,
      name,
      description,
    )
  }
}
