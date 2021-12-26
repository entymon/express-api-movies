import supertest from 'supertest'
import { Express } from 'express'
import App from '@/app'
import MovieRepository from '@/libs/repositories/movie.repository'

let server: Express
let repo: MovieRepository
const populateDbTest = (repository: MovieRepository) => {
  repository.addMovie({title: 'The Big Short', year: 2015, runtime: 130, genres: ['Biography', 'Comedy', 'Drama'], director: 'Adam McKay', actors: 'Ryan Gosling, Rudy Eisenzopf, Casey Groves, Charlie Talbert', plot: 'Four denizens in the world of high-finance predict the credit and housing bubble collapse of the mid-2000s, and decide to take on the big banks for their greed and lack of foresight.', posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg'})
  repository.addMovie({title: 'The Hateful Eight',year:2015,runtime:187,genres:['Crime','Drama','Mystery'],director:'Quentin Tarantino',actors:'Samuel L. Jackson, Kurt Russell, Jennifer Jason Leigh, Walton Goggins',plot:'In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters.',posterUrl:'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA1MTc1NTg5NV5BMl5BanBnXkFtZTgwOTM2MDEzNzE@._V1_SX300.jpg'})
  repository.addMovie({title:"To Kill a Mockingbird",year:1962,runtime:129,genres:["Crime","Drama"],director:"Robert Mulligan",actors:"Gregory Peck, John Megna, Frank Overton, Rosemary Murphy",plot:"Atticus Finch, a lawyer in the Depression-era South, defends a black man against an undeserved rape charge, and his kids against prejudice.",posterUrl:"http://ia.media-imdb.com/images/M/MV5BMjA4MzI1NDY2Nl5BMl5BanBnXkFtZTcwMTcyODc5Mw@@._V1_SX300.jpg"})
  repository.addMovie({title:"The Martian",year:2015,runtime:144,genres:["Adventure","Drama","Sci-Fi"],director:"Ridley Scott",actors:"Matt Damon, Jessica Chastain, Kristen Wiig, Jeff Daniels",plot:"An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.",posterUrl:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg"})
  repository.addMovie({title:"Hotel Rwanda",year:2004,runtime:121,genres:["Drama","History","War"],director:"Terry George",actors:"Xolani Mali, Don Cheadle, Desmond Dube, Hakeem Kae-Kazim",plot:"Paul Rusesabagina was a hotel manager who housed over a thousand Tutsi refugees during their struggle against the Hutu militia in Rwanda.",posterUrl:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTI2MzQyNTc1M15BMl5BanBnXkFtZTYwMjExNjc3._V1_SX300.jpg"})
  repository.addMovie({title:"The Lives of Others",year:2006,runtime:137,genres:["Drama","Thriller"],director:"Florian Henckel von Donnersmarck",actors:"Martina Gedeck, Ulrich Mühe, Sebastian Koch, Ulrich Tukur",plot:"In 1984 East Berlin, an agent of the secret police, conducting surveillance on a writer and his lover, finds himself becoming increasingly absorbed by their lives.",posterUrl:"http://ia.media-imdb.com/images/M/MV5BNDUzNjYwNDYyNl5BMl5BanBnXkFtZTcwNjU3ODQ0MQ@@._V1_SX300.jpg"})
  repository.addMovie({title:"Vertigo",year:1958,runtime:128,genres:["Mystery","Romance","Thriller"],director:"Alfred Hitchcock",actors:"James Stewart, Kim Novak, Barbara Bel Geddes, Tom Helmore",plot:"A San Francisco detective suffering from acrophobia investigates the strange activities of an old friend's wife, all the while becoming dangerously obsessed with her.",posterUrl:"http://ia.media-imdb.com/images/M/MV5BNzY0NzQyNzQzOF5BMl5BanBnXkFtZTcwMTgwNTk4OQ@@._V1_SX300.jpg"})
  repository.addMovie({title:"Spotlight",year:2015,runtime:128,genres:["Biography","Crime","Drama"],director:"Tom McCarthy",actors:"Mark Ruffalo, Michael Keaton, Rachel McAdams, Liev Schreiber",plot:"The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.",posterUrl:"https://images-na.ssl-images-amazon.com/images/M/MV5BMjIyOTM5OTIzNV5BMl5BanBnXkFtZTgwMDkzODE2NjE@._V1_SX300.jpg"})
  repository.addMovie({title:"Shogun",year:1980,runtime:60,genres:["Adventure","Drama","History"],director:"N/A",actors:"Richard Chamberlain, Toshirô Mifune, Yôko Shimada, Furankî Sakai",plot:"A English navigator becomes both a player and pawn in the complex political games in feudal Japan.",posterUrl:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTY1ODI4NzYxMl5BMl5BanBnXkFtZTcwNDA4MzUxMQ@@._V1_SX300.jpg"})
  repository.addMovie({title:"The Theory of Everything",year:2014,runtime:123,genres:["Biography","Drama","Romance"],director:"James Marsh",actors:"Eddie Redmayne, Felicity Jones, Tom Prior, Sophie Perry",plot:"A look at the relationship between the famous physicist Stephen Hawking and his wife.",posterUrl:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTAwMTU4MDA3NDNeQTJeQWpwZ15BbWU4MDk4NTMxNTIx._V1_SX300.jpg"})
  repository.addMovie({title:"Ex Machina",year:2015,runtime:108,genres:["Drama","Mystery","Sci-Fi"],director:"Alex Garland",actors:"Domhnall Gleeson, Corey Johnson, Oscar Isaac, Alicia Vikander",plot:"A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a breath-taking humanoid A.I.",posterUrl:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTUxNzc0OTIxMV5BMl5BanBnXkFtZTgwNDI3NzU2NDE@._V1_SX300.jpg"})
  repository.addMovie({title:"The Lord of the Rings: The Two Towers",year:2002,runtime:179,genres:["Action","Adventure","Drama"],director:"Peter Jackson",actors:"Bruce Allpress, Sean Astin, John Bach, Sala Baker",plot:"While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",posterUrl:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTAyNDU0NjY4NTheQTJeQWpwZ15BbWU2MDk4MTY2Nw@@._V1_SX300.jpg"})
}

describe('MoviesController', () => {

  beforeAll(() => {
    const app = new App()
    server = app.getServer()
  })

  describe('createMovie', () => {
    beforeEach(() => {
      repo = MovieRepository.getInstance('dbTest')
      repo.clearMovies()
    })

    it ('makes a success call', async () => {
      const payload = {
        genres: ['Comedy'],
        title: 'Saw',
        year: 1876,
        runtime: 14000,
        director: 'Freddy Smith'
      }
      const expectedData = {
        id: 1,
        genres: ['Comedy'],
        title: 'Saw',
        year: 1876,
        runtime: 14000,
        director: 'Freddy Smith'
      }

      await supertest(server).post('/api/movie')
        .send(payload)
        .expect(201)
        .then((response) => {
          expect(response.body).toStrictEqual(expectedData)
        })
    })
  
    it ('makes a unsuccess call for required params needed', async () => {
      await supertest(server).post('/api/movie')
        .send({})
        .expect(400)
        .then((response) => {
          expect(response.body.fields.length > 0).toBeTruthy
          expect(response.body.message).toBe('validation error')
          expect(response.body.name).toBe('ValidationError')
          expect(response.body.status).toEqual(400)
        })
    })

    it('returns multi error for same field', async () => {
      const payload = {
        genres: [
          'Comedy'
        ],
        runtime: 9999,
        year: '1801',
        title: 'Lolek',
        director: 'Freddy Smith'
      }
      await supertest(server).post('/api/movie')
        .send(payload)
        .expect(400)
        .then((response) => {
          expect(response.body.fields.length > 0).toBeTruthy
          expect(response.body.fields[0].year.message).toBe('invalid data type')
          expect(response.body.fields[1].year.message).toBe('1801? The cinematography wasn\'t invented yet!')
          expect(response.body.message).toBe('validation error')
          expect(response.body.name).toBe('ValidationError')
          expect(response.body.status).toEqual(400)
        }) 
    })
  })

  describe('returnMovies', () => {
    beforeAll(() => {
      repo = MovieRepository.getInstance('dbTest')
      repo.clearMovies()
      populateDbTest(repo)
    })

    it('returns random movie', async () => {
      await supertest(server).get('/api/movie')
        .send({})
        .expect(200)
        .then((response) => {
          expect(response.body.length).toEqual(1)
        })
    })

    it('return random movie with duration between -10 < duration < +10', async () => {
      await supertest(server).get('/api/movie?duration=120')
        .send({})
        .expect(200)
        .then((response) => {
          expect(response.body.length).toEqual(1)    
        })
    })

    it('does not return any movie for given duration between -10 < duration < +10', async () => {
      await supertest(server).get('/api/movie?duration=12000')
        .send({})
        .expect(200)
        .then((response) => {
          expect(response.body.length).toEqual(0)
        })
    })

    it('return ordered array of movies for categories', async () => {
      await supertest(server).get('/api/movie?genres[]=Biography&genres[]=Crime&genres[]=Drama')
        .send({})
        .expect(200)
        .then((response) => {
          expect(response.body.length).toEqual(11)
          expect(response.body[0].genres.length).toEqual(3)
          expect(response.body[0].genres.includes('Biography')).toBeTruthy()
          expect(response.body[0].genres.includes('Crime')).toBeTruthy()
          expect(response.body[0].genres.includes('Drama')).toBeTruthy()
        })
    })
  })
})