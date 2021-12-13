import * as express from 'express'
import {
  StatusCodes
} from 'http-status-codes'
import ApiError from '../components/api-error'
const addErrorHandler = (
  err: ApiError, req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (err) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const status: number = err.status || StatusCodes.INTERNAL_SERVER_ERROR
    const body: unknown = {
      fields: err.fields,
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      message: err.message || 'An error occurred during the request.',
      name: err.name,
      status,
      stack: err.stack
    }
    res.status(status).json(body)
  }
  next()
}

export default addErrorHandler
