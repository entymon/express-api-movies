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

      const repo = MovieRepository.getInstance()
      const newMovie: TMovieData = repo.addMovie(req.body)
  
      res.status(201).json(newMovie)
    } catch (error) {
      next(error)
    }
  }

  public returnMovies (req: Request, res: Response, next: NextFunction): void {
    let duration = 0
    let genres = []
    if (req.query.duration) {
      duration = parseInt(req.query.duration as string)
    }
        
    const repo = MovieRepository.getInstance()
    const movies = repo.getMovies(duration)
    
    res.send(movies)
  }
}
