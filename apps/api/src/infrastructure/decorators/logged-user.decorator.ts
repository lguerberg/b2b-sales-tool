import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const LoggedUser = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  return request.loggedUser?.id
})
