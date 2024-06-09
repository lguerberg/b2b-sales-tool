import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { CampaignRepository } from '@/domain/campaign/repository'
import { GroupRepository } from '@/domain/group/repository'
import { LeadRepository } from '@/domain/lead/repository'
import { UserRepository } from '@/domain/user/repository'

import { CreateCampaign } from '../../application/group/create-campaign.usecase'
import { CreateGroup } from '../../application/group/create-group.usecase'
import { EditCampaignMessage } from '../../application/group/edit-campaign-message'
import { GetCampaignDetails } from '../../application/group/get-campaign-details.usecase'
import { GetGroupLeads } from '../../application/group/get-group-leads.usecase'
import { GetUserCampaigns } from '../../application/group/get-user-campaigns.usecase'
import { GetUserGroups } from '../../application/group/get-user-groups.usecase'
import { GetLeadDetails } from '../../application/lead/get-lead-details.usecase'
import { CampaignController } from '../controllers/campaign.controller'
import { GroupController } from '../controllers/group.controller'
import { LeadController } from '../controllers/lead.controller'
import { AuthGuard } from '../guards/auth.guard'
import { PrismaCampaignRepository } from '../repositories/campaign/prisma.repository'
import { PrismaGroupRepository } from '../repositories/group/prisma.repository'
import { PrismaLeadRepository } from '../repositories/lead/prisma.repository'
import { PrismaUserRepository } from '../repositories/user/prisma.repository'
import { OpenAiService } from '../services/openai.service'
import { PrismaService } from '../services/prisma.service'
import { SendgridService } from '../services/sendgrid.service'
import { AuthModule } from './auth.module'

const USE_CASES = [
  GetLeadDetails,
  CreateGroup,
  GetGroupLeads,
  CreateCampaign,
  EditCampaignMessage,
  GetCampaignDetails,
  GetUserCampaigns,
  GetUserGroups,
]

@Module({
  imports: [AuthModule],
  controllers: [LeadController, GroupController, CampaignController],
  providers: [
    PrismaService,
    OpenAiService,
    SendgridService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: LeadRepository,
      useClass: PrismaLeadRepository,
    },
    {
      provide: GroupRepository,
      useClass: PrismaGroupRepository,
    },
    {
      provide: CampaignRepository,
      useClass: PrismaCampaignRepository,
    },
    ...USE_CASES,
  ],
})
export class CoreModule {}
