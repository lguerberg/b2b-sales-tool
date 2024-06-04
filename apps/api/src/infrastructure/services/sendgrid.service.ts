import { Injectable } from '@nestjs/common'
import * as SendGridClient from '@sendgrid/client'
import * as SendGridMailer from '@sendgrid/mail'

import { CampaignEmailData } from '@/domain/campaign'
import { LeadWithMessage } from '@/domain/lead'

const API_KEY = process.env.SENDGRID_API_KEY || ''

@Injectable()
export class SendgridService {
  constructor() {
    SendGridMailer.setApiKey(API_KEY)
    SendGridClient.setApiKey(API_KEY)
  }

  async sendLeadEmail(lead: LeadWithMessage, data: CampaignEmailData) {}
}
