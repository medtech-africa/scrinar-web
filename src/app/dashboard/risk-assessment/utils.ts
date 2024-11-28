import isValidNumber from "@/utils/isValidNumber"

export const variantValidityCheck = (val: string) =>
    val && !isValidNumber(val) ? 'destructive' : 'default'
  export const messageCheck = (val: string) =>
    val && !isValidNumber(val) ? 'Please enter a valid value' : ''