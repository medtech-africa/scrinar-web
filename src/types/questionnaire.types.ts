// Define the complete form types
export type ParentFormData = {
  // Demographics
  yearsInCommunity: 'less1' | '1-5' | '6-10' | 'more10'
  ethnicity: string[]
  otherEthnicity?: string
  languagesSpoken: string[]
  otherLanguage?: string
  religion: 'muslim' | 'christian' | 'traditionalist' | 'other'
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
    hasCondition: boolean
    condition?: string
  }
  healthStatus: 'very-good' | 'good' | 'fair' | 'poor'
  noOfChildren: number
  children: {
    age: number
    gender: 'male' | 'female'
    inSchool: boolean
  }[]
  isPregnant?: boolean

  // Knowledge
  nutrition: {
    balancedDiet: string
    sugarEffects: string[]
    saltFatRisks: string[]
    boysFood: string[]
    girlsFood: string[]
  }
  generalPhysicalActivity: {
    importance: string
    childDailyActivity: string
    adultDailyActivity: string
    suitableActivities: string[]
  }
  riskyBehavior: {
    smokingRisks: string[]
    secondhandSmoking: string
    checkupImportance: string
    stressFactors: string[]
    longTermStress: string[]
    stressSigns: string[]
    otherStressSigns: string
  }

  // Attitudes
  nutritionAttitudes: {
    balancedDietImportance: string
    healthyFoodDifficulty: string
    idealBoysSize: string
    idealGirlsSize: string
  }
  physicalActivityAttitudes: {
    genderImportance: string
    boysMoreActive: boolean
    girlsBarriers: string[]
    boysSuitableActivities: string[]
    girlsSuitableActivities: string[]
    mixedActivities: boolean
    timeComparison: string
  }
  riskyBehaviorAttitudes: {
    smokingDrinkingView: string
    genderExperimentation: string
    childrenStress: boolean
    mentalHealthImportance: string
    genderHealthResistance: boolean
  }

  // Practices
  nutritionPractices: {
    fruitsVegetables: string
    snacks: string
    sugaryBeverages: string
  }
  physicalActivityPractices: {
    frequency: string
    duration: string
    activities: string[]
    choreFrequency: string
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
    checkups: string
    copingMethods: string[]
    stressors: string[]
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
    frequency: string
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
