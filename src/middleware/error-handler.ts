import * as express from 'express'
import {
  StatusCodes
} from 'http-status-codes'
import { IError } from '@/components/errors/api-error'

const addErrorHandler = (
  err: IError, req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  if (err) {
    const status: number = err.status || StatusCodes.INTERNAL_SERVER_ERROR
    let body: unknown

    switch(err.name) {        
      case 'ValidationError':
        body = {
          fields: err.fields,
          message: 'validation error',
          name: err.name,
          status
        }
        res.status(status).json(body)
        break;
      case 'ApiError':
      default:
        body = {
          fields: err.fields,
          message: err.message || 'An error occurred during the request.',
          name: err.name,
          status,
          stack: err.stack
        }
        res.status(status).json(body)
        break;
    }
  }
  next()
}

export default addErrorHandler
