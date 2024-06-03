import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { LoginUser } from '../../application/auth/login-user'
import { PrismaService } from '../services/prisma.service'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1w' },
    }),
  ],
  providers: [PrismaService],
  controllers: [],
  exports: [LoginUser],
})
export class AuthModule {}
