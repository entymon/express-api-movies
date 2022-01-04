import ApiError from '@/errors/api.error'
import MovieRepository from './movie.repository'

let repo: MovieRepository
const payload = {
  genres: ['Comedy'],
  title: 'Saw',
  year: 1876,
  runtime: 14000,
  director: 'Freddy Smith'
}

describe('MovieRepository', () => {
  beforeAll(() => {
    repo = MovieRepository.getInstance('dbTest')
  })

  describe('addMovie', () => {
    it('throw an error for already added title', () => {
      try {
        repo.addMovie(payload)
        repo.addMovie(payload)
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError)
      }
    })
  })

  describe('getMovieGenres', () => {
    it('returns all categories', async () => {
      const genres = repo.getMovieGenres()
      expect(genres).toStrictEqual([
        'Comedy',
        'Fantasy',
        'Crime',
        'Drama',
        'Music',
        'Adventure',
        'History',
        'Thriller',
        'Animation',
        'Family',
        'Mystery',
        'Biography',
        'Action',
        'Film-Noir',
        'Romance',
        'Sci-Fi',
        'War',
        'Western',
        'Horror',
        'Musical',
        'Sport'
      ])
    })
  })
})
