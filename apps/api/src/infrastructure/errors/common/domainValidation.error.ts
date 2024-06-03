import { ErrorCodes } from '../constants'
import RequestError from '../request.error'

export class DomainValidationError extends RequestError {
  constructor(errors: string[]) {
    super({
      internalCode: ErrorCodes.DOMAIN_VALIDATION_ERROR,
      data: { errors },
    })
  }
}
