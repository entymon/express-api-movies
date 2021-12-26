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
   * @returns 
   */
  public validate(requestBody: any): void {
    let validationErrors: TValidationErrorFields = []

    validationErrors = this.checkIfAllowed(requestBody, validationErrors)    
    for (let [field, rules] of Object.entries(this.rules)) {
      if (requestBody[field]) {
        validationErrors = this.ruleValidator(field, requestBody[field], rules, validationErrors)
      } else if (rules.required) {
        validationErrors.push({[field]: {message: 'The field is required'}})
      }
    }

    if (validationErrors.length) {
      throw new ValidationError('Request containes errors', validationErrors)
    }
  }

  public assignRule (): void { return }
}