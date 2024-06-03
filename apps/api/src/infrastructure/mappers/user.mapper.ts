import { Company as PrismaCompany, User as PrismaUser } from '@prisma/client'

import { User } from '@/domain/user'

export const mapPrismaUserToDomain = (prismaUser: PrismaUser, prismaCompany?: PrismaCompany) =>
  ({
    id: prismaUser.id,
    email: prismaUser.email,
    firstName: prismaUser.firstName,
    lastName: prismaUser.lastName,
    password: prismaUser.password,
    avatarUrl: prismaUser.avatarUrl || undefined,
    company: prismaCompany
      ? {
          id: prismaCompany.id,
          name: prismaCompany.name,
          logoUrl: prismaCompany.logoUrl || undefined,
          size: prismaCompany.size,
          industry: prismaCompany.industry,
          type: prismaCompany.type,
        }
      : undefined,
  }) satisfies User
