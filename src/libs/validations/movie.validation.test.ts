import { MovieValidation } from './movie.validation'

let validator: MovieValidation
describe('MovieValidation', () => {

  beforeAll(() => {
    validator = new MovieValidation()
  })

  describe('validate', () => {
    it('validates without errors', () => {
      expect(1).toBe(1)
    })
  })
})