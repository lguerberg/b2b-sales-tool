import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common'
import { Request, Response } from 'express'

import { ErrorCodes, getErrorMessageByInternalCode, getStatusCodeByInternalCode } from '../constants'
import RequestError from '../request.error'

@Catch(RequestError)
export class RequestErrorFilter implements ExceptionFilter {
  catch(error: RequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let httpStatus = getStatusCodeByInternalCode[error.internalCode]
    let errorMessage = getErrorMessageByInternalCode[error.internalCode]
    let internalCode = error.internalCode

    if (!httpStatus) {
      const logger = new Logger(RequestErrorFilter.name)
      logger.error(`Error: ${error}`)
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
      internalCode = ErrorCodes.INTERNAL_SERVER_ERROR
      errorMessage = 'There was an error in the server'
    }

    response.status(httpStatus).json({
      internalCode,
      timestamp: new Date().toISOString(),
      errorMessage,
      data: error.data,
      path: request.url,
    })
  }
}
