import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common'

import { User } from '@/domain/user'

import { CreateCampaign } from '../../application/group/create-campaign.usecase'
import { CreateGroup } from '../../application/group/create-group.usecase'
import { GetGroupLeads } from '../../application/group/get-group-leads.usecase'
import { LoggedUser } from '../decorators/logged-user.decorator'
import { mapToGroupResponse } from '../mappers/group.mapper'
import { ValidationPipe } from '../pipes/validation.pipe'
import { CreateCampaignBody, createCampaignBody } from '../schemas/group/create-group-campaign.schema'
import { CreateGroupBody, createGroupBody } from '../schemas/group/create-group.schema'

@Controller('groups')
export class GroupController {
  constructor(
    private createGroup: CreateGroup,
    private getGroupLeads: GetGroupLeads,
    private createGroupCampaign: CreateCampaign,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe(createGroupBody))
  async create(@Body() body: CreateGroupBody, @LoggedUser() user: User) {
    const group = await this.createGroup.execute(user.id, body.leadsIds, {
      name: body.name,
      description: body.description,
    })
    return mapToGroupResponse(group)
  }

  @Get(':groupId/leads')
  async getLeads(@Param('groupId') groupId: string, @LoggedUser() user: User) {
    return this.getGroupLeads.execute(user, groupId)
  }

  @Post(':groupId/campaign')
  @UsePipes(new ValidationPipe(createCampaignBody))
  async createCampaign(@Body() body: CreateCampaignBody, @Param('groupId') groupId: string, @LoggedUser() user: User) {
    const campaign = await this.createGroupCampaign.execute(
      user,
      {
        subject: body.subject,
        body: body.body,
      },
      groupId,
      body.name,
      body.description,
    )
    return {
      created: campaign.id,
    }
  }
}
