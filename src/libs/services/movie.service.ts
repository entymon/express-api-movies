/* eslint-disable @typescript-eslint/return-await */
import { TMovieData } from '@/types/movies.type'

type TMovieDataWithGenreCounter = TMovieData & {
  counter?: number
}

interface IMovieService {
  getOrderedMoviesByMatchOfGenres: (movies: TMovieData[], genres: string[]) => TMovieData[]
  getMoviesForSelectedDuration: (movies: TMovieData[], duration: number) => TMovieData[]
  getRandomMovie: (movies: TMovieData[]) => TMovieData
}

class MovieService implements IMovieService {
  /**
   * getOrderedMoviesByMatchOfGenres
   *
   * @param movies
   * @param genres
   * @returns TMovieData[]
   */
  public getOrderedMoviesByMatchOfGenres (movies: TMovieData[], genres: string[]): TMovieData[] {
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
    return final.map((movie: TMovieDataWithGenreCounter) => {
      if (movie.counter) {
        delete movie.counter
      }
      return movie
    })
  }

  /**
   * getMoviesForSelectedDuration
   *
   * @param movies
   * @param duration
   * @returns TMovieData[]
  */
  public getMoviesForSelectedDuration (movies: TMovieData[], duration: number): TMovieData[] {
    const minRuntime = (duration - 10) < 0 ? 0 : (duration - 10)
    const maxRuntime = duration + 10
    const response: TMovieData[] = movies.filter((movie: TMovieData) =>
      (minRuntime < movie.runtime && movie.runtime < maxRuntime)
    )
    return response
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
