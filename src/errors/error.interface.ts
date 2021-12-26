export interface IError {
  status: number
  message: string
  name: string
  fields?: TValidationErrorFields
  stack?: unknown
}
