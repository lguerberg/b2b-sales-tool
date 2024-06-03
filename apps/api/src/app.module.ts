import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'

import { AllExceptionsFilter } from './infrastructure/errors/filters/global.filter'
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
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
