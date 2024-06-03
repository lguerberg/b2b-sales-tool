import { HttpStatus } from '@nestjs/common'

export enum ErrorCodes {
  AUTH_NO_TOKEN = 2000,
  AUTH_USER_UNAUTHORIZED = 2001,
  AUTH_USER_FORBIDDEN = 2002,
  INVALID_API_KEY = 9000,
  SCHEMA_VALIDATION_ERROR = 9001,
  DOMAIN_VALIDATION_ERROR = 9002,
  ENTITY_NOT_FOUND_ERROR = 9003,
  ENTITY_NOT_BELONG_ERROR = 9004,
  ROUTE_NOT_FOUND_ERROR = 9998,
  INTERNAL_SERVER_ERROR = 9999,
}

export const getErrorMessageByInternalCode = {
  [ErrorCodes.AUTH_NO_TOKEN]: 'No token provided',
  [ErrorCodes.AUTH_USER_UNAUTHORIZED]: 'User unauthorized',
  [ErrorCodes.AUTH_USER_FORBIDDEN]: 'User forbidden',
  [ErrorCodes.INVALID_API_KEY]: 'Invalid API key',
  [ErrorCodes.SCHEMA_VALIDATION_ERROR]: 'Schema validation error',
  [ErrorCodes.DOMAIN_VALIDATION_ERROR]: 'Domain validation error',
  [ErrorCodes.INTERNAL_SERVER_ERROR]: 'Internal server error',
  [ErrorCodes.ENTITY_NOT_FOUND_ERROR]: 'Entity not found',
  [ErrorCodes.ENTITY_NOT_BELONG_ERROR]: 'Entity does not belong to user',
  [ErrorCodes.ROUTE_NOT_FOUND_ERROR]: 'Route not found',
} satisfies {
  [key in ErrorCodes]: string
}

export const getStatusCodeByInternalCode = {
  [ErrorCodes.AUTH_NO_TOKEN]: HttpStatus.UNAUTHORIZED,
  [ErrorCodes.AUTH_USER_UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
  [ErrorCodes.AUTH_USER_FORBIDDEN]: HttpStatus.FORBIDDEN,
  [ErrorCodes.INVALID_API_KEY]: HttpStatus.UNAUTHORIZED,
  [ErrorCodes.SCHEMA_VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
  [ErrorCodes.DOMAIN_VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
  [ErrorCodes.ENTITY_NOT_BELONG_ERROR]: HttpStatus.BAD_REQUEST,
  [ErrorCodes.ENTITY_NOT_FOUND_ERROR]: HttpStatus.NOT_FOUND,
  [ErrorCodes.ROUTE_NOT_FOUND_ERROR]: HttpStatus.NOT_FOUND,
  [ErrorCodes.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
} satisfies {
  [key in ErrorCodes]: number
}

export const DOMAIN_ERROR_MESSAGES = {
  es: {
    USER_UNAUTHORIZED: 'Credenciales incorrectas',
    FILE_EXTENSION: 'Extensión de archivo no permitida',
    USER_EMAIL_ALREADY_EXISTS: 'El email ya está en uso',
  },
  en: {
    USER_UNAUTHORIZED: 'Unauthorized credentials',
    FILE_EXTENSION: 'File extension not allowed',
    USER_EMAIL_ALREADY_EXISTS: 'Email already in use',
  },
}
