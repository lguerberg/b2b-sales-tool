import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

import { AuthGuard } from '../guards/auth.guard'
import { AuthModule } from './auth.module'

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class CoreModule {}
