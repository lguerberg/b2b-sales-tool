import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common'

import { User } from '@/domain/user'

import { GetUserMetrics } from '../../application/auth/get-user-metrics.usecase'
import { LoginUser } from '../../application/auth/login-user.usecase'
import { LoggedUser } from '../decorators/logged-user.decorator'
import { Public } from '../decorators/public.decorator'
import { mapToMeResponse } from '../mappers/user.mapper'
import { ValidationPipe } from '../pipes/validation.pipe'
import { LoginBody, loginBody } from '../schemas/auth/login.schema'

@Controller('auth')
export class AuthController {
  constructor(
    private loginService: LoginUser,
    private getUserMetrics: GetUserMetrics,
  ) {}

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
    return this.getUserMetrics.execute(user)
  }
}
