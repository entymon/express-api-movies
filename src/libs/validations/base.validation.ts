class BaseValidation {
  constructor (protected rules: TRules) {}

  /**
   * Checks if parameters are allowed
   * @param requestBody
   * @param errors
   * @returns TValidationErrorFields
   */
  protected checkIfAllowed (requestBody: any, errors: TValidationErrorFields): TValidationErrorFields {
    for (const [field] of Object.entries(requestBody)) {
      if (!this.rules[field]) {
        errors.push({ [field]: { message: 'The parameter is not allowed. Allowed list: title, genres, year, runtime, director, plot, actors, posterUrl!' } })
      }
    }
    return errors
  }

  /**
   *
   * @param field
   * @param data
   * @param rules
   * @param errors
   * @returns TValidationErrorFields
   */
  protected ruleValidator (field: string, data: any, rules: TRule, errors: TValidationErrorFields): TValidationErrorFields {
    switch (rules.dataType) {
      case 'array':
        return this.arrayRuleType(field, data, rules, errors)
      case 'string':
        return this.stringRuleType(field, data, rules, errors)
      case 'number':
        return this.numberRuleType(field, data, rules, errors)
      default:
        return errors
    }
  }

  /**
   *
   * @param field
   * @param data
   * @param rules
   * @param errors
   * @returns TValidationErrorFields
   */
  private arrayRuleType (field: string, data: any, rules: TRule, errors: TValidationErrorFields): TValidationErrorFields {
    if (!Array.isArray(data)) {
      errors.push({ [field]: { message: 'invalid data type' } })
    }
    data.map((element: string) => {
      element = element.toString()
      if (rules.predefinedValues && !rules.predefinedValues.includes(element.toLowerCase())) {
        errors.push({ [field]: { message: `value: ${element} does not match allowed: ${rules.predefinedValues.toString()}` } })
      }
    })
    return errors
  }

  /**
   *
   * @param field
   * @param data
   * @param rules
   * @param errors
   * @returns TValidationErrorFields
   */
  private stringRuleType (field: string, data: any, rules: TRule, errors: TValidationErrorFields): TValidationErrorFields {
    if (typeof data !== rules.dataType) {
      errors.push({ [field]: { message: 'invalid data type' } })
    }
    if (rules.maxChars && data.length > rules.maxChars) {
      errors.push({ [field]: { message: `number of characters increased allowed: ${rules.maxChars}` } })
    }
    return errors
  }

  /**
   *
   * @param field
   * @param data
   * @param rules
   * @param errors
   * @returns TValidationErrorFields
   */
  private numberRuleType (field: string, data: any, rules: TRule, errors: TValidationErrorFields): TValidationErrorFields {
    if (typeof data !== rules.dataType) {
      errors.push({ [field]: { message: 'invalid data type' } })
    }
    if (data < 0) {
      errors.push({ [field]: { message: 'negative value are not allowed' } })
    }
    return errors
  }
}

export default BaseValidation
