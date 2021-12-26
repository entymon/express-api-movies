import { IError } from "./error.interface"

class ValidationError extends Error implements IError {
  public status = 400

  public success = false

  public fields: TValidationErrorFields

  constructor (msg: string, fields: TValidationErrorFields  = [{name: {message: ''}}], name = 'ValidationError') {
    super()
    this.message = msg
    this.name = name
    this.fields = fields
  }
}

export default ValidationError
