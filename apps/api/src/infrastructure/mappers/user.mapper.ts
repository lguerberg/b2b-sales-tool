import { Company as PrismaCompany, CompanyOnboard as PrismaOnboard, User as PrismaUser } from '@prisma/client'

import { User } from '@/domain/user'

import { MeResponse } from '../schemas/auth/me.schema'

export const mapPrismaUserToDomain = (
  prismaUser: PrismaUser,
  extra?: {
    prismaCompany?: PrismaCompany & { onboard: PrismaOnboard }
  },
) =>
  ({
    id: prismaUser.id,
    email: prismaUser.email,
    firstName: prismaUser.firstName,
    lastName: prismaUser.lastName,
    password: prismaUser.password,
    avatarUrl: prismaUser.avatarUrl || undefined,
    company: extra?.prismaCompany
      ? {
          id: extra.prismaCompany.id,
          name: extra.prismaCompany.name,
          logoUrl: extra.prismaCompany.logoUrl || undefined,
          size: extra.prismaCompany.size,
          industry: extra.prismaCompany.industry,
          type: extra.prismaCompany.type,
          onboardData: {
            salesSpeechContext: extra.prismaCompany.onboard.salesSpeechContext,
            conversionRate: extra.prismaCompany.onboard.conversionRate,
            targetIndustry: extra.prismaCompany.onboard.targetIndustry,
            calendlyUrl: extra.prismaCompany.onboard.calendlyUrl || '',
            mediumTicketPrice: extra.prismaCompany.onboard.mediumTicketPrice,
          },
        }
      : undefined,
  }) satisfies User

export const mapToMeResponse = (user: User) =>
  ({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl,
  }) satisfies MeResponse
