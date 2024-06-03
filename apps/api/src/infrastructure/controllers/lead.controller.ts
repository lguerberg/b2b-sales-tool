import { Controller, Get, Param } from '@nestjs/common'

import { GetLeadDetails } from '../../application/lead/get-lead-details.usecase'
import { mapToLeadDetailsResponse } from '../mappers/lead.mapper'

@Controller('leads')
export class LeadController {
  constructor(private getLeadDetails: GetLeadDetails) {}

  @Get(':id')
  async getLead(@Param('id') id: string) {
    const lead = await this.getLeadDetails.execute(id)
    return mapToLeadDetailsResponse(lead)
  }
}
