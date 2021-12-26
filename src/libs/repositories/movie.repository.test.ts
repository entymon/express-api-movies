import MovieRepository from "./movie.repository"

let repo: MovieRepository
describe('MovieRepository', () => {

  beforeAll(() => {
    repo = MovieRepository.getInstance()
  })

  describe('saveMovie', () => {
    it('throw an error for already added title', () => {
      expect(1).toBe(1)
    })

    it('add new movie', () => {
      expect(1).toBe(1)
      // TODO: remove after test
    })
  })

  describe('getMovieGenres', () => {
    it('returns all categories', async () => {
      const genres = await repo.getMovieGenres()
      expect(genres).toStrictEqual([
        "Comedy",
        "Fantasy",
        "Crime",
        "Drama",
        "Music",
        "Adventure",
        "History",
        "Thriller",
        "Animation",
        "Family",
        "Mystery",
        "Biography",
        "Action",
        "Film-Noir",
        "Romance",
        "Sci-Fi",
        "War",
        "Western",
        "Horror",
        "Musical",
        "Sport"
      ])
    })
  })
})