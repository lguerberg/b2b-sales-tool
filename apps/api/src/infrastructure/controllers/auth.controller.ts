import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common'

import { User } from '@/domain/user'

import { LoginUser } from '../../application/auth/login-user.usecase'
import { LoggedUser } from '../decorators/logged-user.decorator'
import { Public } from '../decorators/public.decorator'
import { mapToMeResponse } from '../mappers/user.mapper'
import { ValidationPipe } from '../pipes/validation.pipe'
import { LoginBody, loginBody } from '../schemas/auth/login.schema'
import { GetUserMetricsResponse } from '../schemas/user/get-user-metrics.schema'

@Controller('auth')
export class AuthController {
  constructor(private loginService: LoginUser) {}

  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe(loginBody))
  async login(@Body() body: LoginBody) {
    return {
      token: await this.loginService.execute(body.email, body.password),
    }
  }

  @Get('me')
  async me(@LoggedUser() user: User) {
    return mapToMeResponse(user)
  }

  @Get('me/metrics')
  async metrics(@LoggedUser() user: User) {
    return {
      campaigns: 45,
      emailsSent: 100,
      emailsOpened: 50,
      scheduledCalls: 10,
      targetIndustry: 'Software',
      callsPerMonthByIndustry: {
        january: 14,
        february: 26,
        march: 38,
        april: 42,
        may: 57,
        june: 3,
        july: 665,
        august: 12,
        september: 95,
        october: 107,
        november: 119,
        december: 136,
      },
    } satisfies GetUserMetricsResponse
  }
}
