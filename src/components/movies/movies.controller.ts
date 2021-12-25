import { Application, NextFunction, Request, Response } from 'express'
import BaseApi from '../base-api'
import ValidationError from '@/errors/validation.error'

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
    if (req.body.title) {
      res.status(201).json({ 
        genres: ['Comedy'],
        title: 'Saw',
        year: 1876,
        runtime: 14000,
        director: 'Freddy Smith'
      })
    } else {
      throw new ValidationError('Body Error', { title: {message: 'required' }})
    }
  }

  public returnMovies (req: Request, res: Response, next: NextFunction): void {
    res.send('Hello Get')
  }
}
