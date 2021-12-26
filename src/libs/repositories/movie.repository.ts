import BaseRepository from './base.repository';

// TODO: add functionality to add new movie
// TODO: add functionality to retrieve a movie

class MovieRepository extends BaseRepository {

  public static getInstance(): MovieRepository {
    if (!MovieRepository.instance) {
      MovieRepository.instance = new MovieRepository();
    }
    return MovieRepository.instance;
  }

  public getMovieGenres() {
      return this.db.getData('/genres')
  }
}

export default MovieRepository