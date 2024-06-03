import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common'
import { Request, Response } from 'express'

import { ErrorCodes, getErrorMessageByInternalCode } from '../constants'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor() {}
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    let status = exception.status
    let internalCode = ErrorCodes.ROUTE_NOT_FOUND_ERROR
    const logger = new Logger(AllExceptionsFilter.name)

    if (exception.status !== HttpStatus.NOT_FOUND) {
      logger.error(`Error: ${exception.stack || exception}`)
      status = HttpStatus.INTERNAL_SERVER_ERROR
      internalCode = ErrorCodes.INTERNAL_SERVER_ERROR
    }

    const errorMessage = getErrorMessageByInternalCode[internalCode]

    response.status(status).json({
      internalCode,
      timestamp: new Date().toISOString(),
      errorMessage,
      data: {},
      path: request.url,
    })
  }
}
