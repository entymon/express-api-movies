import supertest from 'supertest'
import { Express } from 'express'
import App from '@/app'

let server: Express
describe('GenresController', () => {

  beforeEach(() => {
    const app = new App()
    server = app.getServer()
  })

  describe('createMovie', () => {

    it ('makes a success call', async () => {
      await supertest(server).get('/api/genres')
        .expect(200)
        .then((response) => {
          expect(response.body).toStrictEqual([
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
})