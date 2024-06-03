import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { LeadRepository } from '@/domain/lead/repository'

import { GetLeadDetails } from '../../application/lead/get-lead-details.usecase'
import { LeadController } from '../controllers/lead.controller'
import { AuthGuard } from '../guards/auth.guard'
import { PrismaLeadRepository } from '../repositories/lead/prisma.repository'
import { PrismaService } from '../services/prisma.service'
import { AuthModule } from './auth.module'

const USE_CASES = [GetLeadDetails]

@Module({
  imports: [AuthModule],
  controllers: [LeadController],
  providers: [
    PrismaService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: LeadRepository,
      useClass: PrismaLeadRepository,
    },
    ...USE_CASES,
  ],
})
export class CoreModule {}
