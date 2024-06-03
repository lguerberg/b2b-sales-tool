import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'

import { RequestErrorFilter } from './infrastructure/errors/filters/request.filter'
import { AnalyticsModule } from './infrastructure/modules/analytics.module'
import { CoreModule } from './infrastructure/modules/core.module'
import { NotificationsModule } from './infrastructure/modules/notifications.module'

@Module({
  imports: [ConfigModule.forRoot(), CoreModule, AnalyticsModule, NotificationsModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: RequestErrorFilter,
    },
  ],
})
export class AppModule {}
