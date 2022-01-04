/* eslint-disable @typescript-eslint/no-explicit-any */
import supertest from 'supertest'
import { Express } from 'express'
import App from '@/app'

let server: Express
describe('GenresController', () => {
  beforeEach(() => {
    const app = new App()
    server = app.getServer()
  })

  describe('GET /api/genres', () => {
    it('makes a success call', async () => {
      await supertest(server).get('/api/genres')
        .expect(200)
        .then((response: any) => {
          expect(response.body).toStrictEqual([
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
})
