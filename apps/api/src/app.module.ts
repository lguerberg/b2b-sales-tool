import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AnalyticsModule } from './infrastructure/modules/analytics.module'
import { CoreModule } from './infrastructure/modules/core.module'
import { NotificationsModule } from './infrastructure/modules/notifications.module'
import { TrpcModule } from './infrastructure/trpc/trpc.module'

@Module({
  imports: [ConfigModule.forRoot(), TrpcModule, CoreModule, AnalyticsModule, NotificationsModule],
})
export class AppModule {}
