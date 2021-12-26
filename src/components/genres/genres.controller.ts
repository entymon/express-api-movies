import MovieRepository from '@/libs/repositories/movie.repository'
import { Application, NextFunction, Request, Response } from 'express'
import BaseApi from '../base-api'

export default class GenresController extends BaseApi {
  constructor (express: Application) {
    super()
    this.register(express)
  }

  public register (express: Application): void {
    express.use('/api/genres', this.router)
    this.router.get('/', this.returnGenres)
  }

  public async returnGenres (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const movieRepository = MovieRepository.getInstance()
      const genres = await movieRepository.getMovieGenres()
      res.send(genres)
    } catch (error) {
      next(error)
    }
  }
}
