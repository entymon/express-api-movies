import ValidationError from "@/errors/validation.error";
import BaseValidation from "./base.validation";
import { IValidation } from "./validation.interface";

export default class MovieValidation extends BaseValidation implements IValidation {

  constructor () {
    super({
      genres: {
        required: true,
        dataType: 'array',
        predefinedValues: ['comedy', 'fantasy', 'crime']
      },
      title: {
        required: true,
        dataType: 'string',
        maxChars: 255
      },
      year: {
        required: true,
        dataType: 'number',
        maxChars: 4
      },
      runtime: {
        required: true,
        dataType: 'number'
      },
      director: {
        required: true,
        dataType: 'string',
        maxChars: 255
      },
      actors: {
        required: false,
        dataType: 'string',
      },
      plot: {
        required: false,
        dataType: 'string',
      },
      posterUrl: {
        required: false,
        dataType: 'string',
      }
    })
  }

  /**
   * validate
   * 
   * @param requestBody 
   * @returns boolean
   */
  public validate(requestBody: any): boolean {
    let validationErrors: TValidationErrorFields = []

    validationErrors = this.checkIfAllowed(requestBody, validationErrors)    
    for (let [field, rules] of Object.entries(this.rules)) {
      if (requestBody[field]) {
        validationErrors = this.ruleValidator(field, requestBody[field], rules, validationErrors)
      } else if (rules.required) {
        validationErrors.push({[field]: {message: 'The field is required'}})
      }
    }

    validationErrors = this.yearValidators(requestBody, validationErrors)
    validationErrors = this.runtimeValidators(requestBody, validationErrors)

    if (validationErrors.length) {
      throw new ValidationError('Request containes errors', validationErrors)
    }

    return true
  }

  /**
   * yearValidators
   * 
   * @param requestBody 
   * @param validationErrors 
   * @returns TValidationErrorFields
   */
  public yearValidators (requestBody: any, validationErrors: TValidationErrorFields): TValidationErrorFields {
    const currentYear = new Date().getFullYear()
    const inventionYear = 1805
    if (requestBody.year && requestBody.year > currentYear ) {
      validationErrors.push({['year']: {message: `${requestBody.year}? We guess the moview wasn't produced yet!`}})
    }
    if (requestBody.year && requestBody.year < inventionYear ) {
      validationErrors.push({['year']: {message: `${requestBody.year}? The cinematography wasn't invented yet!`}})
    }
    return validationErrors
  }

  /**
   * runtimeValidators
   * 
   * @param requestBody 
   * @param validationErrors 
   * @returns 
   */
  public runtimeValidators (requestBody: any, validationErrors: TValidationErrorFields): TValidationErrorFields {
    if (requestBody.runtime && requestBody.runtime > 52560000) {
      validationErrors.push({['runtime']: {message: `${requestBody.runtime}? Hey dude, if you finish watch the movie you gonna to be dead!`}})
    }
    return validationErrors
  }
}