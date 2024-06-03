import { Injectable } from '@nestjs/common'
import { batchedPromiseAll } from 'batched-promise-all'

import { CampaignEmailData } from '@/domain/campaign'
import { CampaignRepository } from '@/domain/campaign/repository'
import { LeadWithMessage } from '@/domain/lead'
import { User } from '@/domain/user'

import { GetGroupLeads } from './get-group-leads.usecase'

@Injectable()
export class CreateCampaign {
  constructor(
    private campaignRepository: CampaignRepository,
    private getGroupLeads: GetGroupLeads,
  ) {}

  async execute(
    user: User,
    emailData: Omit<CampaignEmailData, 'calendlyUrl'>,
    groupId: string,
    name: string,
    description: string,
  ) {
    const leads = await this.getGroupLeads.execute(user, groupId)
    const leadsWithMessage = (await batchedPromiseAll(
      leads,
      async lead =>
        ({
          ...lead,
          message: 'This should be integrated with OpenAI',
        }) satisfies LeadWithMessage,
      10,
    )) as LeadWithMessage[]

    return this.campaignRepository.create(
      leadsWithMessage,
      {
        ...emailData,
        calendlyUrl: 'https://google.com',
      },
      groupId,
      name,
      description,
    )
  }
}
