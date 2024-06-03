import { DOMAIN_ERROR_MESSAGES, ErrorCodes } from '../constants'
import RequestError from '../request.error'

export class UserUnauthorizedError extends RequestError {
  constructor(lang: 'en' | 'es' = 'en') {
    super({
      internalCode: ErrorCodes.AUTH_USER_UNAUTHORIZED,
      data: { errors: [DOMAIN_ERROR_MESSAGES[lang].USER_UNAUTHORIZED] },
    })
  }
}
