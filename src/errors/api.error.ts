import { IError } from "@/errors/error.interface"

class ApiError extends Error implements IError {
  public status = 500

  public success = false

  constructor (msg: string, statusCode: number, name = 'ApiError') {
    super()
    this.message = msg
    this.status = statusCode
    this.name = name
  }
}

export default ApiError
