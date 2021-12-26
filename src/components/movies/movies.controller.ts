import { Application, NextFunction, Request, Response } from 'express'
import BaseApi from '../base-api'
import MovieValidation from '@/libs/validations/movie.validation'
import MovieRepository from '@/libs/repositories/movie.repository'
import { TMovieData } from '@/types/movies.type'

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
    try {
      const validator = new MovieValidation()
      validator.validate(req.body)
      console.log(1, 'TEREWRER')

      const repo = MovieRepository.getInstance()
      const newMovie: TMovieData = repo.addMovie(req.body)
  
      res.status(201).json(newMovie)
    } catch (error) {
      next(error)
    }
  }

  public returnMovies (req: Request, res: Response, next: NextFunction): void {
    res.send('Hello Get')
  }
}
