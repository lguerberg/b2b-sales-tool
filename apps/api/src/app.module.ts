import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TrpcModule } from './infrastructure/trpc/trpc.module'

@Module({
  imports: [TrpcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
