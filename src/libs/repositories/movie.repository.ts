import { TMovieData, TMovieRequest } from '@/types/movies.type';
import ApiError from '@/errors/api.error';
import BaseRepository from './base.repository';

type TMovieDataWithGenreCounter = TMovieData & {
  counter?: number
}

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
    const movies = this.db.getData('/movies')
    if (duration === 0 && genres.length === 0) {
      return [this.getRandomMovie(movies)];
    }
    
    if (duration !== 0 && genres.length === 0) {
      const response = this.getMoviesForSelectedDuration(movies, duration)
      if (response.length > 0) {
        return [this.getRandomMovie(response)]
      }
    }

    if (duration === 0 && genres.length > 0) {
      return this.getOrderedMoviesByMatchOfGenres(movies, genres)
    }

    if (duration !== 0 && genres.length > 0) {
      const response = this.getMoviesForSelectedDuration(movies, duration)
      if (response.length > 0) {
        
      }
    }
    return []
  }

  public getOrderedMoviesByMatchOfGenres(movies: Array<TMovieData>, genres: Array<string>): Array<TMovieData> {
    const response = movies.filter((movie: TMovieDataWithGenreCounter) => {
      const intersection = genres.filter(element => movie.genres.includes(element))
      if (intersection.length !== 0) {
        movie.counter = intersection.length
        return movie
      }
    })

    const final = response.filter(movie => !!movie)
    final.sort((a: TMovieDataWithGenreCounter ,b: TMovieDataWithGenreCounter) => {
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