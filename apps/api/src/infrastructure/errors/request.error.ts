import { ErrorCodes } from './constants'

export default class RequestError {
  level?: string

  internalCode: ErrorCodes

  data: {
    errors: string[]
  }

  constructor(obj: {
    level?: string
    code?: number
    internalCode: ErrorCodes
    data?: {
      errors: string[]
    }
  }) {
    this.level = obj.level
    this.internalCode = obj.internalCode
    this.data = obj.data || { errors: [] }
  }
}
