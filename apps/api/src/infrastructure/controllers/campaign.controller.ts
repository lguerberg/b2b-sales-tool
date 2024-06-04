import { Body, Controller, Param, Put, UsePipes } from '@nestjs/common'

import { User } from '@/domain/user'

import { EditCampaignMessage } from '../../application/group/edit-campaign-message'
import { LoggedUser } from '../decorators/logged-user.decorator'
import { ValidationPipe } from '../pipes/validation.pipe'
import { EditCampaignMessageBody, editCampaignMessageBody } from '../schemas/campaign/edit-campaign-message.schema'

@Controller('campaigns')
export class CampaignController {
  constructor(private editCampaignMessage: EditCampaignMessage) {}

  @Put(':campaignId/leads/:leadId/message')
  @UsePipes(new ValidationPipe(editCampaignMessageBody))
  async editMessage(
    @Param('campaignId') campaignId: string,
    @Param('leadId') leadId: string,
    @Body() body: EditCampaignMessageBody,
    @LoggedUser() user: User,
  ) {
    await this.editCampaignMessage.execute(user, campaignId, leadId, body.message)
  }
}
