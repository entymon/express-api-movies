import supertest from 'supertest'
import { Express } from 'express'
import App from '@/app'
import MovieRepository from '@/libs/repositories/movie.repository'

let server: Express
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
describe('MoviesController', () => {

  beforeEach(() => {
    const app = new App()
    server = app.getServer()
  })

  describe('createMovie', () => {

    it ('makes a success call', async () => {
      const repo = MovieRepository.getInstance('dbTest')
      repo.clearMovies()

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
      const givenPayload = {
        genres: [
          'Comedy'
        ],
        runtime: 9999,
        year: '1801',
        title: 'Lolek',
        director: 'Freddy Smith'
      }
      await supertest(server).post('/api/movie')
        .send(givenPayload)
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
})