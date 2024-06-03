import { ZodIssue } from 'zod'

import { ErrorCodes } from '../constants'
import RequestError from '../request.error'

export class SchemaValidationError extends RequestError {
  constructor(validationErrors: ZodIssue[]) {
    super({
      internalCode: ErrorCodes.SCHEMA_VALIDATION_ERROR,
      data: { errors: validationErrors.map(error => error.message) },
    })
  }
}
