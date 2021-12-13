import * as express from 'express'
import MoviesController from './components/movies/movies.controller'

export default function registerRoutes (app: express.Application): void {
  // eslint-disable-next-line no-new
  new MoviesController(app)
}
