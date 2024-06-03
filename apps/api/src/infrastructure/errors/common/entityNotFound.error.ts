import { ErrorCodes } from '../constants'
import RequestError from '../request.error'

export class EntityNotFoundError extends RequestError {
  constructor(entity: string, identifier: string) {
    super({
      internalCode: ErrorCodes.ENTITY_NOT_FOUND_ERROR,
      data: { errors: [`${entity} with identifier ${identifier} not found`] },
    })
  }
}
