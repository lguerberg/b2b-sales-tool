import { JwtService } from '@nestjs/jwt'

import { UserRepository } from '@/domain/user/repository'

import { UserUnauthorizedError } from '../../infrastructure/errors/auth/userUnauthorized.error'

export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new UserUnauthorizedError()
    }

    // TODO Hash passwords
    if (user.password !== password) {
      throw new UserUnauthorizedError()
    }

    return this.jwtService.signAsync({ id: user.id, email: user.email })
  }
}
