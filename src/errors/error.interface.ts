export interface IError {
  status: number
  fields: TValidationErrorFields
  message: string
  name: string
  stack?: unknown
}