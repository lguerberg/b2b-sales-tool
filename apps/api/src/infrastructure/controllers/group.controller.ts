import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UsePipes } from '@nestjs/common'

import { User } from '@/domain/user'

import { CreateCampaign } from '../../application/group/create-campaign.usecase'
import { CreateGroup } from '../../application/group/create-group.usecase'
import { GetGroupLeads } from '../../application/group/get-group-leads.usecase'
import { GetUserGroups } from '../../application/group/get-user-groups.usecase'
import { LoggedUser } from '../decorators/logged-user.decorator'
import { mapToGroupResponse } from '../mappers/group.mapper'
import { mapToLeadDetailsResponse } from '../mappers/lead.mapper'
import { ValidationPipe } from '../pipes/validation.pipe'
import { CreateCampaignBody, createCampaignBody } from '../schemas/group/create-group-campaign.schema'
import { CreateGroupBody, createGroupBody } from '../schemas/group/create-group.schema'

@Controller('')
export class GroupController {
  constructor(
    private createGroup: CreateGroup,
    private getGroupLeads: GetGroupLeads,
    private createGroupCampaign: CreateCampaign,
    private getUserGroups: GetUserGroups,
  ) {}

  @Get('me/groups')
  async getMyGroups(
    @LoggedUser() user: User,
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('offset', new ParseIntPipe()) offset: number,
  ) {
    const paginatedResponse = await this.getUserGroups.execute(user.id, limit, offset)
    return {
      ...paginatedResponse,
      data: paginatedResponse.data.map(mapToGroupResponse),
    }
  }

  @Post('groups')
  // @UsePipes(new ValidationPipe(createGroupBody))
  async create(@Body() body: CreateGroupBody, @LoggedUser() user: User) {
    const group = await this.createGroup.execute(user.id, body.leadsIds, {
      name: body.name,
      description: body.description,
    })
    return mapToGroupResponse(group)
  }

  @Get('groups/:groupId/leads')
  async getLeads(@Param('groupId') groupId: string, @LoggedUser() user: User) {
    const groupLeads = await this.getGroupLeads.execute(user, groupId)
    return groupLeads.map(mapToLeadDetailsResponse)
  }

  // @UsePipes(new ValidationPipe(createCampaignBody))
  @Post('groups/:groupId/campaign')
  async createCampaign(@Body() body: CreateCampaignBody, @Param('groupId') groupId: string, @LoggedUser() user: User) {
    const campaign = await this.createGroupCampaign.execute(user, body.subject, groupId, body.name, body.description)
    return {
      created: campaign.id,
    }
  }
}
