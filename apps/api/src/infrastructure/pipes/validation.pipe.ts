import { PipeTransform } from '@nestjs/common'
import { ZodError, ZodSchema } from 'zod'

import { SchemaValidationError } from '../errors/common/schemaValidation.error'

export class ValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (err) {
      const zodErrors: ZodError = err
      throw new SchemaValidationError(zodErrors.errors)
    }
  }
}
