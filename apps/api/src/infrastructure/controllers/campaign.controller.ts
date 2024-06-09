import { Body, Controller, Get, Param, ParseIntPipe, Put, Query, UsePipes } from '@nestjs/common'

import { User } from '@/domain/user'

import { EditCampaignMessage } from '../../application/group/edit-campaign-message'
import { GetCampaignDetails } from '../../application/group/get-campaign-details.usecase'
import { GetUserCampaigns } from '../../application/group/get-user-campaigns.usecase'
import { LoggedUser } from '../decorators/logged-user.decorator'
import { mapToGetCampaignDetailsResponse } from '../mappers/campaign.mapper'
import { ValidationPipe } from '../pipes/validation.pipe'
import { EditCampaignMessageBody, editCampaignMessageBody } from '../schemas/campaign/edit-campaign-message.schema'

@Controller('')
export class CampaignController {
  constructor(
    private editCampaignMessage: EditCampaignMessage,
    private getCampaignDetails: GetCampaignDetails,
    private getUserCampaigns: GetUserCampaigns,
  ) {}

  @Get('me/campaigns')
  async getMyCampaigns(
    @LoggedUser() user: User,
    @Query('limit', new ParseIntPipe()) limit: number,
    @Query('offset', new ParseIntPipe()) offset: number,
  ) {
    const paginateResult = await this.getUserCampaigns.execute(user.id, limit, offset)
    return {
      ...paginateResult,
      data: paginateResult.data.map(mapToGetCampaignDetailsResponse),
    }
  }

  @Get('campaigns/:campaignId')
  async getDetails(@Param('campaignId') campaignId: string, @LoggedUser() user: User) {
    const campaign = await this.getCampaignDetails.execute(user, campaignId)
    return mapToGetCampaignDetailsResponse(campaign)
  }

  @Put('campaigns/:campaignId/leads/:leadId/message')
  //   @UsePipes(new ValidationPipe(editCampaignMessageBody))
  async editMessage(
    @Param('campaignId') campaignId: string,
    @Param('leadId') leadId: string,
    @Body() body: EditCampaignMessageBody,
    @LoggedUser() user: User,
  ) {
    await this.editCampaignMessage.execute(user, campaignId, leadId, body.message)
    return { updated: true }
  }
}
