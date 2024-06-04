import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UserRepository } from '@/domain/user/repository'

import { LoginUser } from '../../application/auth/login-user.usecase'
import { AuthController } from '../controllers/auth.controller'
import { PrismaUserRepository } from '../repositories/user/prisma.repository'
import { PrismaService } from '../services/prisma.service'

const USE_CASES = [LoginUser]

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1w' },
    }),
  ],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    ...USE_CASES,
  ],
  controllers: [AuthController],
  exports: [LoginUser],
})
export class AuthModule {}