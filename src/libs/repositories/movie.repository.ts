import BaseRepository from './base.repository';

// TODO: add functionality to add new movie
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

  public getMovieGenres() {
      return this.db.getData('/genres')
  }

  public addMovie(movieData: TMovieRequest): boolean {
    return true
  }
}

export default MovieRepository