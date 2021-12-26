import { TMovieData, TMovieRequest } from '@/types/movies.type'
import ApiError from '@/errors/api.error'
import BaseRepository from './base.repository'
import MovieService from '../services/movie.service'

class MovieRepository extends BaseRepository {

  public static getInstance(fileName: string | null = null): MovieRepository {
    if (!MovieRepository.instance) {
      if (fileName) {
        MovieRepository.instance = new MovieRepository(fileName)
      } else {
        MovieRepository.instance = new MovieRepository()
      }
    }
    return MovieRepository.instance
  }

  /**
   * clearMovies
   * Remove all movies data
   */
  public clearMovies() {
    this.db.push('/movies', []);
  }

  /**
   * getMovieGenres
   * 
   * @returns string[]
   */
  public getMovieGenres() {
    return this.db.getData('/genres')
  }

  /**
   * addMovie
   * 
   * @param moviePayload 
   * @returns TMovieData
   */
  public addMovie(moviePayload: TMovieRequest): TMovieData {
    const movies = this.db.getData('/movies')

    const duplication = movies.filter((movie: TMovieData) => movie.title === moviePayload.title)
    if (duplication.length) {
      throw new ApiError('Given title is already added', 400)
    }

    const movieData: TMovieData = moviePayload
    movieData.id = movies.length + 1

    this.db.push('/movies[]', movieData, true);
    return movieData
  }

  /**
   * getMovies
   * 
   * @param duration 
   * @param genres 
   * @returns Array<TMovieData>
   */
  public getMovies(duration: number = 0, genres: Array<string> = []): Array<TMovieData> {
    const service = new MovieService()
    const movies = this.db.getData('/movies')
    if (duration === 0 && genres.length === 0) {
      return [service.getRandomMovie(movies)];
    }
    
    if (duration !== 0 && genres.length === 0) {
      const response = service.getMoviesForSelectedDuration(movies, duration)
      if (response.length > 0) {
        return [service.getRandomMovie(response)]
      }
    }

    if (duration === 0 && genres.length > 0) {
      return service.getOrderedMoviesByMatchOfGenres(movies, genres)
    }

    if (duration !== 0 && genres.length > 0) {
      const response = service.getMoviesForSelectedDuration(movies, duration)
      if (response.length > 0) {
        return service.getOrderedMoviesByMatchOfGenres(response, genres)
      }
    }
    return []
  }
}

export default MovieRepository