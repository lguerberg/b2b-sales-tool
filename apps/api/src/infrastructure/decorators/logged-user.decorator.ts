import { ExecutionContext, createParamDecorator } from '@nestjs/common'

import { User } from '@/domain/user'

export const LoggedUser = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  return request.loggedUser as User
})
