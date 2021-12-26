import { TMovieData, TMovieRequest } from '@/types/movies.type';
import ApiError from '@/errors/api.error';
import BaseRepository from './base.repository';

// TODO: add functionality to retrieve a movie

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
   * @returns Array<TMovieData>
   */
  public getMovies(duration: number = 0): Array<TMovieData> {
    const movies = this.db.getData('/movies')
    if (duration === 0) {
      return [];
    } else {
      const response = this.getMoviesForSelectedDuration(movies, duration)
      if (response.length > 0) {
        return [this.getRandomMovie(response)]
      }
    }
    return []
  }

  public getMoviesForSelectedDuration(movies: Array<TMovieData>, duration: number): Array<TMovieData> {
    const minRuntime = (duration - 10) < 0 ? 0 : (duration - 10)
    const maxRuntime = duration + 10
    const response: TMovieData[] = movies.filter((movie: TMovieData) => 
      minRuntime < movie.runtime && movie.runtime < maxRuntime)
    return response
  }

  public getRandomMovie(movies: Array<TMovieData>): TMovieData {
    return movies[Math.floor(Math.random() * movies.length)]
  }
}

export default MovieRepository