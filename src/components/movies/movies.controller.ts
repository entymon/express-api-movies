import { Application, NextFunction, Request, Response } from 'express'
import BaseApi from '../base-api'
// import * as responseHandler from '../../lib/response-handler';
// import * from './movies.types';

export default class MoviesController extends BaseApi {
  constructor (express: Application) {
    super()
    this.register(express)
  }

  public register (express: Application): void {
    express.use('/api/movie', this.router)
    this.router.get('/', this.returnMovies)
    this.router.post('/', this.createMovie)
  }

  public createMovie (req: Request, res: Response, next: NextFunction): void {
    res.send('Hello POST')
  }

  public returnMovies (req: Request, res: Response, next: NextFunction): void {
    res.send('Hello Get')
  }
}
