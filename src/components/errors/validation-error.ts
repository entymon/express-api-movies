import { TField, IError } from "./api-error"

class ValidationError extends Error implements IError {
  public status = 400

  public success = false

  public fields: TField

  constructor (msg: string, fields: TField  = {name: {message: ''}}, name = 'ValidationError') {
    super()
    this.message = msg
    this.name = name
    this.fields = fields
  }
}

export default ValidationError
