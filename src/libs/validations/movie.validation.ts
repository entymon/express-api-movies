import ValidationError from "@/errors/validation.error";
import { IValidation } from "./validation.interface";

const createMovieRules: TRules = {
  genres: {
    required: true,
    dataType: 'array',
    predefinedValues: ['Comedy', 'Fantasy', 'Crime']
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
}

export default class MovieValidation implements IValidation {
  constructor (
    private rules: TRules = createMovieRules
  ) {}

  /**
   * validate
   */
  public validate(requestBody: any): boolean {
    let validationErrors = {}

    // check for allowed params
    for (let [field] of Object.entries(requestBody)) {
      if (!createMovieRules[field]) {
        validationErrors = { 
          ...validationErrors,
          ... {[field]: {message: 'The parameter is not allowed. Allowed list: title, genres, year, runtime, director, plot, actors, posterUrl!'}}
        }
      }
    }


    for (let [field, rules] of Object.entries(this.rules)) {
      if (requestBody[field]) {
        console.log(field, rules, 'VALUE: ', requestBody[field])
      } else if (rules.required) {
        validationErrors = { 
          ...validationErrors, 
          ... {[field]: {message: 'The field is required'}}
        }
      }
    }



    console.log(validationErrors)

    return true
  }

  public assignRule (): void { return }
}