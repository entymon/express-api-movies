type TRule = {
  required: boolean
  dataType: string
  predefinedValues?: string[]
  maxChars?: number 
}

type TRules = {
  [key: string]: TRule
}