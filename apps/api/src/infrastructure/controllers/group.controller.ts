import { Body, Controller, Get, Param, Post, Query, UsePipes } from '@nestjs/common'

import { User } from '@/domain/user'

import { CreateCampaign } from '../../application/group/create-campaign.usecase'
import { CreateGroup } from '../../application/group/create-group.usecase'
import { GetGroupLeads } from '../../application/group/get-group-leads.usecase'
import { GetUserGroups } from '../../application/group/get-user-groups.usecase'
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
    private getUserGroups: GetUserGroups,
  ) {}

  @Get('')
  async getMyGroups(@LoggedUser() user: User, @Query('limit') limit: number, @Query('offset') offset: number) {
    const paginatedResponse = await this.getUserGroups.execute(user.id, limit, offset)
    return {
      ...paginatedResponse,
      data: paginatedResponse.data.map(mapToGroupResponse),
    }
  }

  @Post('')
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

  @UsePipes(new ValidationPipe(createCampaignBody))
  @Post(':groupId/campaign')
  async createCampaign(@Body() body: CreateCampaignBody, @Param('groupId') groupId: string, @LoggedUser() user: User) {
    const campaign = await this.createGroupCampaign.execute(user, body.subject, groupId, body.name, body.description)
    return {
      created: campaign.id,
    }
  }
}
