type TRule = {
  [key: string]: {
    required: boolean
    dataType: string
    predefinedValues?: string[]
    maxChars?: number 
  }
}