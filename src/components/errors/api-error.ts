export type TField = {
  [key: string] : { message: string }
}

export interface IError {
  status: number
  fields: TField
  message: string
  name: string
  stack?: unknown
}

class ApiError extends Error implements IError {
  public status = 500

  public success = false

  public fields: {
    name: {
      message: string
    }
  }

  constructor (msg: string, statusCode: number, name = 'ApiError') {
    super()
    this.message = msg
    this.status = statusCode
    this.name = name
    this.fields = {
      name: {
        message: ''
      }
    }
  }
}

export default ApiError
