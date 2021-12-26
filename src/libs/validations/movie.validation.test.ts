import each from 'jest-each'
import ValidationError from '@/errors/validation.error'
import MovieValidation from './movie.validation'

let validator: MovieValidation
const payload = {
  genres: ['Comedy'],
  title: 'Saw',
  year: 1876,
  runtime: 14000,
  director: 'Freddy Smith'
}

describe('MovieValidation', () => {

  beforeAll(() => {
    validator = new MovieValidation()
  })

  describe('validate', () => {
    it('validates without errors', () => {
      expect(validator.validate(payload)).toBeTruthy()
    })

    each([
      [{ test: ['Comedy'], title: 'Rene', year: 1111, runtime: 1111, director: 'Freddy Smith' }],
      [{ genres: ['Comedy'], title: 'Rene', year: 1111, runtime: 1111 }],
      [{ genres: ['Comedy'], title: 'Rene'}],
      [{ genres: ['Comedy'], title: 'Rene', year: 1111, director: 'Freddy Smith' }],
      [{ genres: ['Comedy'], title: 'Rene', runtime: 1111, director: 'Freddy Smith' }],
      [{ genres: ['Comedy'], year: 1111, runtime: 1111, director: 'Freddy Smith' }],
      [{ title: 'Rene', year: 1111, runtime: 1111, director: 'Freddy Smith' }],
      [{ genres: ['Test'], title: 'Rene', year: 1999, runtime: 1111, director: 'Freddy Smith' }],
      [{ genres: ['Comedy', 'Test'], title: 'Rene', year: 1999, runtime: 1111, director: 'Freddy Smith' }],
      [{ genres: ['Comedy', 1111], title: 'Rene', year: 1999, runtime: 1111, director: 'Freddy Smith' }],
      [{ genres: ['Comedy'], title: 1111, year: 1999, runtime: 1111, director: 'Freddy Smith' }],
      [{ genres: ['Comedy'], title: 'Rene', year: 'test', runtime: 1111, director: 'Freddy Smith' }],
      [{ genres: ['Comedy'], title: 'Rene', year: 12312312312, runtime: 1111, director: 'Freddy Smith' }],
      [{ genres: ['Comedy'], title: 'Rene', year: 1999, runtime: 52560000, director: 'Freddy Smith' }],
      [{ genres: ['Comedy'], title: 'Rene', year: 1894, runtime: 52560000, director: 'Freddy Smith' }],
      [{ genres: ['Comedy'], title: 'Rene', year: 1894, runtime: -1234, director: 'Freddy Smith' }],
    ]).it('throws an exception for required data', (given) => {
      try {
        validator.validate(given)
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError)
      }
    })
  })

  describe('yearValidators', () => {
    it('returns error for five and more digits year', () => {
      const error = validator.yearValidators({ year: 99999 }, [])
      expect(error).toStrictEqual([{ year: { message: '99999? We guess the moview wasn\'t produced yet!' } }])
    })

    it('returns error for a year lower than 1805', () => {
      const error = validator.yearValidators({ year: 1804 }, [])
      expect(error).toStrictEqual([{ year: { message: '1804? The cinematography wasn\'t invented yet!' } }])
    })
  })

  describe('runtimeValidators', () => {
    it('returns error for runtime longer than 52560000 minutes', () => {
      const error = validator.runtimeValidators({ runtime: 52560001 }, [])
      expect(error).toStrictEqual([{ runtime: { message: '52560001? Hey dude, if you finish watch the movie you gonna to be dead!' } }])
    })
  })
})



      