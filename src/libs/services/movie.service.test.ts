import MovieService from './movie.service'

const movies = [
  { title: 'The Big Short', year: 2015, runtime: 130, genres: ['Biography', 'Comedy', 'Drama'], director: 'Adam McKay', actors: 'Ryan Gosling, Rudy Eisenzopf, Casey Groves, Charlie Talbert', plot: 'Four denizens in the world of high-finance predict the credit and housing bubble collapse of the mid-2000s, and decide to take on the big banks for their greed and lack of foresight.', posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg' },
  { title: 'The Hateful Eight', year: 2015, runtime: 187, genres: ['Crime', 'Drama', 'Mystery'], director: 'Quentin Tarantino', actors: 'Samuel L. Jackson, Kurt Russell, Jennifer Jason Leigh, Walton Goggins', plot: 'In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters.', posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA1MTc1NTg5NV5BMl5BanBnXkFtZTgwOTM2MDEzNzE@._V1_SX300.jpg' },
  { title: 'To Kill a Mockingbird', year: 1962, runtime: 129, genres: ['Crime', 'Drama'], director: 'Robert Mulligan', actors: 'Gregory Peck, John Megna, Frank Overton, Rosemary Murphy', plot: 'Atticus Finch, a lawyer in the Depression-era South, defends a black man against an undeserved rape charge, and his kids against prejudice.', posterUrl: 'http://ia.media-imdb.com/images/M/MV5BMjA4MzI1NDY2Nl5BMl5BanBnXkFtZTcwMTcyODc5Mw@@._V1_SX300.jpg' },
  { title: 'The Martian', year: 2015, runtime: 144, genres: ['Adventure', 'Drama', 'Sci-Fi'], director: 'Ridley Scott', actors: 'Matt Damon, Jessica Chastain, Kristen Wiig, Jeff Daniels', plot: 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.', posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg' },
  { title: 'Hotel Rwanda', year: 2004, runtime: 121, genres: ['Drama', 'History', 'War'], director: 'Terry George', actors: 'Xolani Mali, Don Cheadle, Desmond Dube, Hakeem Kae-Kazim', plot: 'Paul Rusesabagina was a hotel manager who housed over a thousand Tutsi refugees during their struggle against the Hutu militia in Rwanda.', posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI2MzQyNTc1M15BMl5BanBnXkFtZTYwMjExNjc3._V1_SX300.jpg' },
  { title: 'The Lives of Others', year: 2006, runtime: 137, genres: ['Drama', 'Thriller'], director: 'Florian Henckel von Donnersmarck', actors: 'Martina Gedeck, Ulrich M??he, Sebastian Koch, Ulrich Tukur', plot: 'In 1984 East Berlin, an agent of the secret police, conducting surveillance on a writer and his lover, finds himself becoming increasingly absorbed by their lives.', posterUrl: 'http://ia.media-imdb.com/images/M/MV5BNDUzNjYwNDYyNl5BMl5BanBnXkFtZTcwNjU3ODQ0MQ@@._V1_SX300.jpg' },
  { title: 'Vertigo', year: 1958, runtime: 128, genres: ['Mystery', 'Romance', 'Thriller'], director: 'Alfred Hitchcock', actors: 'James Stewart, Kim Novak, Barbara Bel Geddes, Tom Helmore', plot: "A San Francisco detective suffering from acrophobia investigates the strange activities of an old friend's wife, all the while becoming dangerously obsessed with her.", posterUrl: 'http://ia.media-imdb.com/images/M/MV5BNzY0NzQyNzQzOF5BMl5BanBnXkFtZTcwMTgwNTk4OQ@@._V1_SX300.jpg' },
  { title: 'Spotlight', year: 2015, runtime: 128, genres: ['Biography', 'Crime', 'Drama'], director: 'Tom McCarthy', actors: 'Mark Ruffalo, Michael Keaton, Rachel McAdams, Liev Schreiber', plot: 'The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.', posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjIyOTM5OTIzNV5BMl5BanBnXkFtZTgwMDkzODE2NjE@._V1_SX300.jpg' },
  { title: 'Shogun', year: 1980, runtime: 60, genres: ['Adventure', 'Drama', 'History'], director: 'N/A', actors: 'Richard Chamberlain, Toshir?? Mifune, Y??ko Shimada, Furank?? Sakai', plot: 'A English navigator becomes both a player and pawn in the complex political games in feudal Japan.', posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY1ODI4NzYxMl5BMl5BanBnXkFtZTcwNDA4MzUxMQ@@._V1_SX300.jpg' },
  { title: 'The Theory of Everything', year: 2014, runtime: 123, genres: ['Biography', 'Drama', 'Romance'], director: 'James Marsh', actors: 'Eddie Redmayne, Felicity Jones, Tom Prior, Sophie Perry', plot: 'A look at the relationship between the famous physicist Stephen Hawking and his wife.', posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTAwMTU4MDA3NDNeQTJeQWpwZ15BbWU4MDk4NTMxNTIx._V1_SX300.jpg' },
  { title: 'Ex Machina', year: 2015, runtime: 108, genres: ['Drama', 'Mystery', 'Sci-Fi'], director: 'Alex Garland', actors: 'Domhnall Gleeson, Corey Johnson, Oscar Isaac, Alicia Vikander', plot: 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a breath-taking humanoid A.I.', posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg' },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002, runtime: 179, genres: ['Action', 'Adventure', 'Drama'], director: 'Peter Jackson', actors: 'Bruce Allpress, Sean Astin, John Bach, Sala Baker', plot: "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.", posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTAyNDU0NjY4NTheQTJeQWpwZ15BbWU2MDk4MTY2Nw@@._V1_SX300.jpg' }
]

let service: MovieService

describe('MovieService', () => {
  beforeAll(() => {
    service = new MovieService()
  })

  describe('getOrderedMoviesByMatchOfGenres', () => {
    it('returns ordered movies by gender maches', async () => {
      const response = service.getOrderedMoviesByMatchOfGenres(movies, ['Biography', 'Crime', 'Drama'])
      expect(response.length).toEqual(11)
      expect(response[0].genres.length).toEqual(3)
      expect(response).toStrictEqual([
        {
          title: 'Spotlight',
          year: 2015,
          runtime: 128,
          genres: ['Biography', 'Crime', 'Drama'],
          director: 'Tom McCarthy',
          actors: 'Mark Ruffalo, Michael Keaton, Rachel McAdams, Liev Schreiber',
          plot: 'The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.',
          posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjIyOTM5OTIzNV5BMl5BanBnXkFtZTgwMDkzODE2NjE@._V1_SX300.jpg'
        },
        {
          title: 'The Big Short',
          year: 2015,
          runtime: 130,
          genres: ['Biography', 'Comedy', 'Drama'],
          director: 'Adam McKay',
          actors: 'Ryan Gosling, Rudy Eisenzopf, Casey Groves, Charlie Talbert',
          plot: 'Four denizens in the world of high-finance predict the credit and housing bubble collapse of the mid-2000s, and decide to take on the big banks for their greed and lack of foresight.',
          posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg'
        },
        {
          title: 'The Hateful Eight',
          year: 2015,
          runtime: 187,
          genres: ['Crime', 'Drama', 'Mystery'],
          director: 'Quentin Tarantino',
          actors: 'Samuel L. Jackson, Kurt Russell, Jennifer Jason Leigh, Walton Goggins',
          plot: 'In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters.',
          posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA1MTc1NTg5NV5BMl5BanBnXkFtZTgwOTM2MDEzNzE@._V1_SX300.jpg'
        },
        {
          title: 'To Kill a Mockingbird',
          year: 1962,
          runtime: 129,
          genres: ['Crime', 'Drama'],
          director: 'Robert Mulligan',
          actors: 'Gregory Peck, John Megna, Frank Overton, Rosemary Murphy',
          plot: 'Atticus Finch, a lawyer in the Depression-era South, defends a black man against an undeserved rape charge, and his kids against prejudice.',
          posterUrl: 'http://ia.media-imdb.com/images/M/MV5BMjA4MzI1NDY2Nl5BMl5BanBnXkFtZTcwMTcyODc5Mw@@._V1_SX300.jpg'
        },
        {
          title: 'The Theory of Everything',
          year: 2014,
          runtime: 123,
          genres: ['Biography', 'Drama', 'Romance'],
          director: 'James Marsh',
          actors: 'Eddie Redmayne, Felicity Jones, Tom Prior, Sophie Perry',
          plot: 'A look at the relationship between the famous physicist Stephen Hawking and his wife.',
          posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTAwMTU4MDA3NDNeQTJeQWpwZ15BbWU4MDk4NTMxNTIx._V1_SX300.jpg'
        },
        {
          title: 'The Martian',
          year: 2015,
          runtime: 144,
          genres: ['Adventure', 'Drama', 'Sci-Fi'],
          director: 'Ridley Scott',
          actors: 'Matt Damon, Jessica Chastain, Kristen Wiig, Jeff Daniels',
          plot: 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.',
          posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg'
        },
        {
          title: 'Hotel Rwanda',
          year: 2004,
          runtime: 121,
          genres: ['Drama', 'History', 'War'],
          director: 'Terry George',
          actors: 'Xolani Mali, Don Cheadle, Desmond Dube, Hakeem Kae-Kazim',
          plot: 'Paul Rusesabagina was a hotel manager who housed over a thousand Tutsi refugees during their struggle against the Hutu militia in Rwanda.',
          posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI2MzQyNTc1M15BMl5BanBnXkFtZTYwMjExNjc3._V1_SX300.jpg'
        },
        {
          title: 'The Lives of Others',
          year: 2006,
          runtime: 137,
          genres: ['Drama', 'Thriller'],
          director: 'Florian Henckel von Donnersmarck',
          actors: 'Martina Gedeck, Ulrich M??he, Sebastian Koch, Ulrich Tukur',
          plot: 'In 1984 East Berlin, an agent of the secret police, conducting surveillance on a writer and his lover, finds himself becoming increasingly absorbed by their lives.',
          posterUrl: 'http://ia.media-imdb.com/images/M/MV5BNDUzNjYwNDYyNl5BMl5BanBnXkFtZTcwNjU3ODQ0MQ@@._V1_SX300.jpg'
        },
        {
          title: 'Shogun',
          year: 1980,
          runtime: 60,
          genres: ['Adventure', 'Drama', 'History'],
          director: 'N/A',
          actors: 'Richard Chamberlain, Toshir?? Mifune, Y??ko Shimada, Furank?? Sakai',
          plot: 'A English navigator becomes both a player and pawn in the complex political games in feudal Japan.',
          posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY1ODI4NzYxMl5BMl5BanBnXkFtZTcwNDA4MzUxMQ@@._V1_SX300.jpg'
        },
        {
          title: 'Ex Machina',
          year: 2015,
          runtime: 108,
          genres: ['Drama', 'Mystery', 'Sci-Fi'],
          director: 'Alex Garland',
          actors: 'Domhnall Gleeson, Corey Johnson, Oscar Isaac, Alicia Vikander',
          plot: 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a breath-taking humanoid A.I.',
          posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg'
        },
        {
          title: 'The Lord of the Rings: The Two Towers',
          year: 2002,
          runtime: 179,
          genres: ['Action', 'Adventure', 'Drama'],
          director: 'Peter Jackson',
          actors: 'Bruce Allpress, Sean Astin, John Bach, Sala Baker',
          plot: "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
          posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTAyNDU0NjY4NTheQTJeQWpwZ15BbWU2MDk4MTY2Nw@@._V1_SX300.jpg'
        }
      ])
    })
  })

  describe('getMoviesForSelectedDuration', () => {
    it('returns ordered movies by gender maches', async () => {
      const response = service.getMoviesForSelectedDuration(movies, 120)
      expect(response.length).toEqual(5)
      expect(response).toStrictEqual([
        {
          title: 'To Kill a Mockingbird',
          year: 1962,
          runtime: 129,
          genres: ['Crime', 'Drama'],
          director: 'Robert Mulligan',
          actors: 'Gregory Peck, John Megna, Frank Overton, Rosemary Murphy',
          plot: 'Atticus Finch, a lawyer in the Depression-era South, defends a black man against an undeserved rape charge, and his kids against prejudice.',
          posterUrl: 'http://ia.media-imdb.com/images/M/MV5BMjA4MzI1NDY2Nl5BMl5BanBnXkFtZTcwMTcyODc5Mw@@._V1_SX300.jpg'
        },
        {
          title: 'Hotel Rwanda',
          year: 2004,
          runtime: 121,
          genres: ['Drama', 'History', 'War'],
          director: 'Terry George',
          actors: 'Xolani Mali, Don Cheadle, Desmond Dube, Hakeem Kae-Kazim',
          plot: 'Paul Rusesabagina was a hotel manager who housed over a thousand Tutsi refugees during their struggle against the Hutu militia in Rwanda.',
          posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTI2MzQyNTc1M15BMl5BanBnXkFtZTYwMjExNjc3._V1_SX300.jpg'
        },
        {
          title: 'Vertigo',
          year: 1958,
          runtime: 128,
          genres: ['Mystery', 'Romance', 'Thriller'],
          director: 'Alfred Hitchcock',
          actors: 'James Stewart, Kim Novak, Barbara Bel Geddes, Tom Helmore',
          plot: "A San Francisco detective suffering from acrophobia investigates the strange activities of an old friend's wife, all the while becoming dangerously obsessed with her.",
          posterUrl: 'http://ia.media-imdb.com/images/M/MV5BNzY0NzQyNzQzOF5BMl5BanBnXkFtZTcwMTgwNTk4OQ@@._V1_SX300.jpg'
        },
        {
          title: 'Spotlight',
          year: 2015,
          runtime: 128,
          genres: ['Biography', 'Crime', 'Drama'],
          director: 'Tom McCarthy',
          actors: 'Mark Ruffalo, Michael Keaton, Rachel McAdams, Liev Schreiber',
          plot: 'The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.',
          posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjIyOTM5OTIzNV5BMl5BanBnXkFtZTgwMDkzODE2NjE@._V1_SX300.jpg'
        },
        {
          title: 'The Theory of Everything',
          year: 2014,
          runtime: 123,
          genres: ['Biography', 'Drama', 'Romance'],
          director: 'James Marsh',
          actors: 'Eddie Redmayne, Felicity Jones, Tom Prior, Sophie Perry',
          plot: 'A look at the relationship between the famous physicist Stephen Hawking and his wife.',
          posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTAwMTU4MDA3NDNeQTJeQWpwZ15BbWU4MDk4NTMxNTIx._V1_SX300.jpg'
        }
      ])
    })
  })

  describe('getRandomMovie', () => {
    it('returns ordered movies by gender maches', () => {
      const response = service.getRandomMovie([
        { title: 'The Big Short', year: 2015, runtime: 130, genres: ['Biography', 'Comedy', 'Drama'], director: 'Adam McKay', actors: 'Ryan Gosling, Rudy Eisenzopf, Casey Groves, Charlie Talbert', plot: 'Four denizens in the world of high-finance predict the credit and housing bubble collapse of the mid-2000s, and decide to take on the big banks for their greed and lack of foresight.', posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg' }
      ])
      expect(response.title).toBe('The Big Short')
    })
  })
})
