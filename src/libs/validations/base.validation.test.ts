import BaseValidation from './base.validation'

let validator: BaseValidation

describe('BaseValidation', () => {

  beforeAll(() => {
    validator = new BaseValidation({})
  })

  describe('validate', () => {
    it ('show something', () => {
      expect(1).toBe(1)
    })
  })
})



      