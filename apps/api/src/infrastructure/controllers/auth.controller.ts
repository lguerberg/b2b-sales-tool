import { Body, Controller, Post } from '@nestjs/common'

import { LoginUser } from '../../application/auth/login-user.usecase'
import { Public } from '../decorators/public'

@Controller('auth')
export class AuthController {
  constructor(private loginService: LoginUser) {}

  @Public()
  @Post('login')
  // TODO Move body to schema and use Zod validations
  async login(@Body() body: { email: string; password: string }) {
    const token = await this.loginService.execute(body.email, body.password)
    return {
      token,
    }
  }
}
