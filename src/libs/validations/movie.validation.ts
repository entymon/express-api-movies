import { IValidation } from "./interfaces/validation.interface";

const createMovieRules: TRule = {
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
    dataType: 'number'
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

export class MovieValidation implements IValidation {
  constructor (
    private rules: TRule = createMovieRules
  ) {}

  /**
   * validate
   */
  public validate(requestBody: TMovie) {
    
  }
}