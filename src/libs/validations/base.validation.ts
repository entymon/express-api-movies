class BaseValidation {

  constructor (protected rules: TRules) {}

  /**
   * Checks if parameters are allowed
   * @param requestBody 
   * @param errors 
   * @returns TValidationErrorFields
   */
   public checkIfAllowed(requestBody: any, errors: TValidationErrorFields): TValidationErrorFields {
    for (let [field] of Object.entries(requestBody)) {
      if (!this.rules[field]) {
        errors.push({[field]: {message: 'The parameter is not allowed. Allowed list: title, genres, year, runtime, director, plot, actors, posterUrl!'}})
      }
    }
    return errors
  }

  public ruleValidator (field: string, data: any, rules: TRule, errors: TValidationErrorFields): TValidationErrorFields {
    switch (rules.dataType) {
      case 'array':
        if (!Array.isArray(data)) {
          errors.push({[field]: {message: 'invalid data type'}})
        }
        data.map((element: string) => {
          element = element.toString()
          if (rules.predefinedValues && rules.predefinedValues.indexOf(element.toLowerCase()) === -1) {
            errors.push({[field]: {message: `value: ${element} does not match allowed: ${rules.predefinedValues.toString()}`}})
          }
        })
        return errors
      case 'string':
        if (typeof data !== rules.dataType) {
          errors.push({[field]: {message: 'invalid data type'}})
        }
        if (rules.maxChars && data.length > rules.maxChars) {
          errors.push({[field]: {message: `number of characters increased allowed: ${rules.maxChars}`}})
        }
        return errors
      case 'number':
        if (typeof data !== rules.dataType) {
          errors.push({[field]: {message: 'invalid data type'}})  
        }
        if (data < 0) {
          errors.push({[field]: {message: 'negative value are not allowed'}})
        }
        return errors
      default:
        return errors 
    }
  }
}

export default BaseValidation