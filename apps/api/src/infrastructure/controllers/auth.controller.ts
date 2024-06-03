import { Body, Controller, Post, UsePipes } from '@nestjs/common'

import { LoginUser } from '../../application/auth/login-user.usecase'
import { Public } from '../decorators/public.decorator'
import { ValidationPipe } from '../pipes/validation.pipe'
import { LoginBody, loginBody } from '../schemas/auth/login.schema'

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
}
