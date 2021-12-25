import supertest from 'supertest'
import { Express } from 'express'
import App from '@/app'

let server: Express
const payload = {
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
      await supertest(server).post('/api/movie')
        .send(payload)
        .expect(201)
        .then((response) => {
          expect(response.body).toStrictEqual(payload)
        })  
    })
  
    it ('makes a unsuccess call for required params needed', async () => {
      await supertest(server).post('/api/movie')
        .send({})
        .expect(400)
        .then((response) => {
          expect(response.body.fields.title.message).toBe('required')
          expect(response.body.message).toBe('validation error')
          expect(response.body.name).toBe('ValidationError')
          expect(response.body.status).toEqual(400)
        })
    })
  })
})