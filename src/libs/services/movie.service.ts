import { TMovieData } from '@/types/movies.type'
import { IService } from './base.service'

type TMovieDataWithGenreCounter = TMovieData & {
  counter?: number
}

interface IMovieService extends IService {
  getOrderedMoviesByMatchOfGenres: (movies: TMovieData[], genres: string[]) => Promise<TMovieData[]>
  getMoviesForSelectedDuration: (movies: TMovieData[], duration: number) => Promise<TMovieData[]>
  getRandomMovie: (movies: TMovieData[]) => TMovieData
}

class MovieService implements IMovieService {
  /**
   * getOrderedMoviesByMatchOfGenres
   *
   * @param movies
   * @param genres
   * @returns Promise<Array<TMovieData>>
   */
  public getOrderedMoviesByMatchOfGenres (movies: TMovieData[], genres: string[]): Promise<TMovieData[]> {
    return new Promise((resolve) => {
      const response = movies.filter((movie: TMovieDataWithGenreCounter) => {
        const intersection = genres.filter(element => movie.genres.includes(element))
        if (intersection.length !== 0) {
          movie.counter = intersection.length
          return movie
        }
      })

      const final = response.filter(movie => !!movie)
      final.sort((a: TMovieDataWithGenreCounter, b: TMovieDataWithGenreCounter) => {
        if (a.counter && b.counter && a.counter > b.counter) { return -1 }
        if (a.counter && b.counter && a.counter < b.counter) { return 1 }
        return 0
      })
      resolve(final.map((movie: TMovieDataWithGenreCounter) => {
        if (movie.counter) {
          delete movie.counter
        }
        return movie
      }))
    })
  }

  /**
   * getMoviesForSelectedDuration
   *
   * @param movies
   * @param duration
   * @returns Promise<Array<TMovieData>>
   */
  public getMoviesForSelectedDuration (movies: TMovieData[], duration: number): Promise<TMovieData[]> {
    return new Promise((resolve) => {
      const minRuntime = (duration - 10) < 0 ? 0 : (duration - 10)
      const maxRuntime = duration + 10
      const response: TMovieData[] = movies.filter((movie: TMovieData) =>
        minRuntime < movie.runtime && movie.runtime < maxRuntime)
      resolve(response)
    })
  }

  /**
   * getRandomMovie
   *
   * @param movies
   * @returns TMovieData
   */
  public getRandomMovie (movies: TMovieData[]): TMovieData {
    return movies[Math.floor(Math.random() * movies.length)]
  }
}

export default MovieService
