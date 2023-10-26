export interface SelectVal {
  label: string
  value: string
}

export interface DietaryDiversity {
  hoursOnComputer: number
  hoursOnTv: number
  hoursOnSleep: number
  sportQuestion: string
  schoolTransportQuestion: string
}

export interface PhysicalActivity {
  fruitsTimes: FruitsTimes
  mealsPerDay: number
  foodAmount: string
  dietary: string[]
}

export interface FruitsTimes {
  fish: number
  friedFood: number
  sugar: number
  pastries: number
  sweets: number
  carbohydrates: number
  egg: number
  fruits: number
  meat: number
  vegetable: number
}

export type HealthDataPayload = {
  userId: string
  glucoseLevel?: string
  bloodPressure?: string
  waist?: string
  weight?: string
  height?: string
  bmi?: string
  dietaryDiversityScore?: string
  physicalActivityScore?: string
}