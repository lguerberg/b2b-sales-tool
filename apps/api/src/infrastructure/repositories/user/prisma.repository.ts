import { Injectable } from '@nestjs/common'

import { User } from '@/domain/user'
import { UserRepository } from '@/domain/user/repository'

import { mapPrismaUserToDomain } from '../../mappers/user.mapper'
import { PrismaService } from '../../services/prisma.service'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!prismaUser) {
      return null
    }
    return mapPrismaUserToDomain(prismaUser)
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!prismaUser) {
      return null
    }
    return mapPrismaUserToDomain(prismaUser)
  }
}
