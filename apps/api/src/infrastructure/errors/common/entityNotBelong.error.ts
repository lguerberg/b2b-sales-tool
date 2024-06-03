import { ErrorCodes } from '../constants'
import RequestError from '../request.error'

export class EntityNotBelongError extends RequestError {
  constructor(entity: string, userId: string) {
    super({
      internalCode: ErrorCodes.ENTITY_NOT_BELONG_ERROR,
      data: { errors: [`${entity} does not belong to user ${userId}`] },
    })
  }
}
