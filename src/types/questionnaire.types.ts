export interface Parent {
  id: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
  fullname?: string
  gender: string
  email?: string
  mobile?: string
}

// Define the complete form types
export type ParentFormData = {
  // Demographics
  yearsInCommunity: {
    label: string
    value: 'less1' | '1-5' | '6-10' | 'more10'
  }
  ethnicity: {
    label: string
    value: string
  }
  howManyWives: string
  otherEthnicity?: string
  languagesSpoken: string[]
  otherLanguage?: string
  religion: {
    label: string
    value: 'muslim' | 'christian' | 'traditionalist' | 'other'
  }
  otherReligion?: string
  education: 'none' | 'primary' | 'secondary' | 'tertiary'
  workStatus: 'employed' | 'self-employed' | 'unemployed' | 'retired'
  occupation: string
  householdMembers: {
    children: number
    adults: number
  }
  householdIncome: 'less100k' | '100k-500k' | '500k-1m' | 'above1m'
  chronicHealth: {
    hasCondition: {
      label: string
      value: boolean
    }
    condition?: string
  }
  healthStatus: 'very-good' | 'good' | 'fair' | 'poor'
  noOfChildren: number
  children: {
    age: number
    gender: {
      label: string
      value: 'male' | 'female'
    }
    inSchool: boolean
  }[]
  isPregnant?: boolean

  // Knowledge
  nutrition: {
    balancedDiet?: {
      label: string
      value: string
    }
    sugarEffects?: {
      label: string
      value: string
    }
    saltFatRisks?: {
      label: string
      value: string
    }
    boysFood: string[]
    girlsFood: string[]
  }
  generalPhysicalActivity: {
    importance?: {
      label: string
      value: string
    }
    childDailyActivity?: {
      label: string
      value: string
    }
    adultDailyActivity?: {
      label: string
      value: string
    }
    suitableActivities: string[]
  }
  riskyBehavior: {
    
    mentalHealthImportance?: {
      label: string
      value: string
    }
    stressCauses?: {
      label: string
      value: string
    }
    thingsDoneToChildToEaseWorryUpset?: string[]
    feelingsOfstress?: {
      label: string
      value: string
    }
    whenAdolescentsExposedToSmoking?: {
      label: string
      value: string
    }

    // TODO: old data. remove
    smokingRisks: string[]
    secondhandSmoking?: {
      label: string
      value: string
    }
    checkupImportance?: {
      label: string
      value: string
    }

    stressFactors: string[]
    longTermStress: string[]
    stressSigns: string[]
    otherStressSigns: string
  }

  // Attitudes
  nutritionAttitudes: {
    balancedDietImportance?: {
      label: string
      value: string
    }
    healthyFoodDifficulty?: {
      label: string
      value: string
    }
    idealBoysSize?: {
      label: string
      value: string
    }
    idealGirlsSize?: {
      label: string
      value: string
    }
  }
  physicalActivityAttitudes: {
    genderImportance?: {
      label: string
      value: string
    }
    boysMoreActive: boolean
    girlsBarriers: string[]
    boysSuitableActivities: string
    girlsSuitableActivities: string
    mixedActivities: boolean
    timeComparison?: {
      label: string
      value: string
    }
  }
  riskyBehaviorAttitudes: {
    smokingDrinkingView: {
      label: string
      value: string
    }
    genderExperimentation: {
      label: string
      value: string
    }
    childrenStress: boolean
    mentalHealthImportance: {
      label: string
      value: string
    }
    genderHealthResistance: boolean
  }

  // Practices
  nutritionPractices: {
    fruitsVegetables?: {
      label: string
      value: string
    }
    snacks?: {
      label: string
      value: string
    }
    sugaryBeverages?: {
      label: string
      value: string
    }
  }
  physicalActivityPractices: {
    frequency?: {
      label: string
      value: string
    }
    duration?: {
      label: string
      value: string
    }
    activities: string[]
    choreFrequency?: string
    choreTypes: string[]
    nonChoreActivity: string
    screenTime: {
      mobile: number
      tv: number
    }
    sleep: {
      bedtime: string
      wakeTime: string
    }
  }
  riskyBehaviorPractices: {
    checkups?: {
      label: string
      value: string
    }
    copingMethods: string[]
    copingMethodsOther: string
    stressors: string[]
    stressorsOther: string
  }

  // Health History
  healthHistory: {
    bloodPressure: {
      measured: boolean
      diagnosed: boolean
      diagnosedLast12Months: boolean
      medication: boolean
      traditionalHealer: boolean
      traditionalRemedy: boolean
    }
    diabetes: {
      measured: boolean
      diagnosed: boolean
      diagnosedLast12Months: boolean
      medication: boolean
      insulin: boolean
      traditionalHealer: boolean
      traditionalRemedy: boolean
    }
    cholesterol: {
      measured: boolean
      diagnosed: boolean
      diagnosedLast12Months: boolean
      medication: boolean
      traditionalHealer: boolean
      traditionalRemedy: boolean
    }
    cardiovascular: {
      hadEvent: boolean
      aspirin: boolean
      statins: boolean
    }
  }

  // Health Habits
  smoking: {
    currentSmoker: boolean
    dailySmoker?: boolean
    startAge?: number
    triedToStop?: boolean
    doctorAdvice?: boolean
    consumption?: {
      manufactured: number
      handRolled: number
      pipes: number
      shisha: number
      other?: string
    }
    pastSmoker?: boolean
    pastDailySmoker?: boolean
    secondhandHome: boolean
    secondhandWork: boolean
    smokelessTobacco: boolean
    dailySmokelessTobacco: boolean
  }
  alcohol: {
    everConsumed: boolean
    last12Months: boolean
    stoppedHealth?: boolean
    frequency: {
      label: string
      value: string
    }
    last30Days: boolean
    monthlyOccasions?: number
    averageDrinks?: number
    maxDrinks?: number
    sixPlusOccasions?: number
    weeklyConsumption: {
      monday: number
      tuesday: number
      wednesday: number
      thursday: number
      friday: number
      saturday: number
      sunday: number
    }
    homebrewed: {
      consumed: boolean
      spirits: number
      beerWine: number
      other: number
    }
  }
  diet: {
    fruits: {
      daysPerWeek: number
      servingsPerDay: number
    }
    vegetables: {
      daysPerWeek: number
      servingsPerDay: number
    }
    salt: {
      addingSalt: string
      cookingSalt: string
      processedFood: string
      perception: string
    }
  }
  physicalActivity: {
    work: {
      vigorous: {
        does: string
        daysPerWeek?: number
        hoursPerDay?: number
      }
      moderate: {
        does: string
        daysPerWeek?: number
        hoursPerDay?: number
      }
    }
    travel: {
      walking: string
      daysPerWeek?: number
      hoursPerDay?: number
    }
    recreation: {
      vigorous: {
        does: string
        daysPerWeek?: number
        hoursPerDay?: number
      }
      moderate: {
        does: string
        daysPerWeek?: number
        hoursPerDay?: number
      }
    }
    sedentary: {
      hoursPerDay: number
    }
  }
}
