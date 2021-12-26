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
   * Remove all movies data
   */
  public clearMovies() {
    this.db.push('/movies', []);
  }

  public getMovieGenres() {
    return this.db.getData('/genres')
  }

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

  public getMovies(duration: number | null = null) {
    const movies = this.db.getData('/movies')
    if (duration === 0) {
      return [movies[Math.floor(Math.random() * movies.length)]];
    } else {
      const response: TMovieData[] = movies.filter((movie: TMovieData) => {
        //
      })
      return response
    }
  }
}

export default MovieRepository