interface SelectOption {
  label: string
  value: string
}

export interface IStudentsSurveyData {
  gender: SelectOption
  age: number
  birthday: string
  ethnicity: SelectOption
  ethnicityOther?: string
  religion: SelectOption
  religionOther?: string
  classLevel: SelectOption
  distanceToSchool: SelectOption
  yearsAtSchool: SelectOption
  communityName: string
  numberOfChildren: number
  siblingPosition: SelectOption
  fatherOccupation: string
  motherOccupation: string
  livingSituation: SelectOption
  healthProblems: SelectOption
  healthProblemsOther?: string
  healthStatus: SelectOption
  hpvVaccine: SelectOption
  //Effects of smoking and drinking alcohol
  //Risky Behavior 2
  smokingDrinkingEffects: [
    [
      {
        value: 'Health problems and diseases'
        label: 'Health problems and diseases'
      },
      {
        value: 'It makes you look cool and fit in with friends'
        label: 'It makes you look cool and fit in with friends'
      },
      { value: 'No effect'; label: 'It doesn’t have any effect' },
      { value: 'I don’t know'; label: 'I don’t know' },
      { value: 'Other'; label: 'Other' },
    ],
  ]
  healthCheckupsImportance: [
    {
      value: 'To make sure you are healthy and catch problems early'
      label: 'To make sure you are healthy and catch problems early'
    },
    { value: 'To avoid school'; label: 'To avoid school' },
    {
      value: 'It is not important if you are not sick'
      label: 'It is not important if you are not sick'
    },
    { value: 'I don’t know'; label: 'I don’t know' },
    { value: 'Other'; label: 'Other' },
  ]
  stressCauses: string[]
  feelingsOfstress: [
    {
      value: 'It can make you feel sick and tired'
      label: 'It can make you feel sick and tired'
    },
    { value: 'It makes you stronger'; label: 'It makes you stronger' },
    {
      value: 'It helps you focus better'
      label: 'It helps you focus better'
    },
    { value: 'Other'; label: 'Other' },
  ]
  stressSigns: [
    { value: 'Happiness'; label: 'Happiness' },
    { value: 'Excitement'; label: 'Excitement' },
    { value: 'Anger or sadness'; label: 'Anger or sadness' },
    { value: 'Relaxation'; label: 'Relaxation' },
    { value: 'Other'; label: 'Other' },
  ]
  //
  stressEffects: string
  bodySizeBoys: string
  bodySizeGirls: string

  //Physical Activity 3

  physicalActivityFrequency: [
    [
      { value: 'Every day'; label: 'Every day' },
      { value: 'A few times a week'; label: 'A few times a week' },
      { value: 'Rarely'; label: 'Rarely' },
      { value: 'Never'; label: 'Never' },
    ],
  ]
  engagementDuration: [
    { value: 'Less than 30 minutes'; label: 'Less than 30 minutes' },
    { value: '30 minutes to 1 hour'; label: '30 minutes to 1 hour' },
    { value: 'More than 1 hour'; label: 'More than 1 hour' },
    { value: 'Not applicable'; label: 'Not applicable' },
  ]
  favoriteActivities: [
    { value: 'Running'; label: 'Running' },
    { value: 'Playing sports'; label: 'Playing sports' },
    { value: 'Skipping'; label: 'Skipping' },
    { value: 'Dancing'; label: 'Dancing' },
    { value: 'Other'; label: 'Other (please specify)' },
  ]
  houseChoresFrequencyParticipation: [
    { value: 'Every day'; label: 'Every day' },
    { value: 'Several times a week'; label: 'Several times a week' },
    { value: 'Once a week'; label: 'Once a week' },
    { value: 'Less than once a week'; label: 'Less than once a week' },
    { value: 'Never'; label: 'Never' },
  ]
  physicalChores: [
    { value: 'Fetching water'; label: 'Fetching water' },
    {
      value: 'Cooking and preparing meals'
      label: 'Cooking and preparing meals'
    },
    { value: 'Cleaning the house'; label: 'Cleaning the house' },
    { value: 'Gardening or farming'; label: 'Gardening or farming' },
    {
      value: 'Carrying heavy items (e.g., firewood, water)'
      label: 'Carrying heavy items (e.g., firewood, water)'
    },
    {
      value: 'Caring for younger siblings'
      label: 'Caring for younger siblings'
    },
    { value: 'Other'; label: 'Other (please specify)' },
  ]
  outdoorActivitiesFrequency: [
    { value: 'Every day'; label: 'Every day' },
    { value: 'Several times a week'; label: 'Several times a week' },
    { value: 'Once a week'; label: 'Once a week' },
    { value: 'Less than once a week'; label: 'Less than once a week' },
    { value: 'Never'; label: 'Never' },
  ]
  averageMobileGames: string
  averageTVHours: string
  bedtimeAtNight: string
  wakeUpTime: string

  //Nutrition 2
  balancedDiet: [
    {
      value: 'Only fruits and vegetables'
      label: 'Only fruits and vegetables'
    },
    {
      value: 'All food groups'
      label: 'All food groups'
    },
    { value: 'I don’t know'; label: 'I don’t know' },
  ]
  dietConsequence: [
    {
      value: 'I can become sick more often'
      label: 'I can become sick more often'
    },
    { value: 'I will have more energy'; label: 'I will have more energy' },
    { value: 'I will become taller'; label: 'I will become taller' },
    { value: 'I don’t know'; label: 'I don’t know' },
    { value: 'Other'; label: 'Other' },
  ]
  carbExamples: string[]
  proteinExamples: string[]
  fatExamples: string[]
  vitaminExamples: string[]
  sweetsEffect: [
    {
      value: 'Tooth decay and weight gain'
      label: 'Tooth decay and weight gain'
    },
    {
      value: 'It makes you grow taller'
      label: 'It makes you grow taller'
    },
    {
      value: 'It gives you more energy for school'
      label: 'It gives you more energy for school'
    },
    { value: 'I don’t know'; label: 'I don’t know' },
    { value: 'Other'; label: 'Other' },
  ]
  saltyFoodEffect: [
    {
      value: 'It can make your heart unhealthy'
      label: 'It can make your heart unhealthy'
    },
    {
      value: 'It helps you run faster'
      label: 'It helps you run faster'
    },
    {
      value: 'It gives you stronger bones'
      label: 'It gives you stronger bones'
    },
    { value: 'I don’t know'; label: 'I don’t know' },
    { value: 'Other'; label: 'Other' },
  ]
  physicalActivity: [
    { value: '30 minutes'; label: '30 minutes' },
    { value: '1 hour'; label: '1 hour' },
    { value: '2 hours'; label: '2 hours' },
    { value: 'I don’t know'; label: 'I don’t know' },
  ]
  activityBenefits: [
    {
      value: 'Better health and stronger muscles'
      label: 'Better health and stronger muscles'
    },
    { value: 'It makes you tired'; label: 'It makes you tired' },
    {
      value: 'It doesn’t have any benefit'
      label: 'It doesn’t have any benefit'
    },
    { value: 'I don’t know'; label: 'I don’t know' },
    { value: 'Other'; label: 'Other' },
  ]
  exerciseActivities: string[]

  //Nutrition 1
  balancedDietImportance: SelectOption
  eatingHealthyFoods: SelectOption
  snackPreference: SelectOption
  idealBodySizeBoys: SelectOption
  idealBodySizeGirls: SelectOption

  //Physical Activity 1
  regularPhysicalActivity: SelectOption
  barriersToPhysicalActivity: string[]
  importanceOfPhysicalActivity: SelectOption
  suitableActivitiesBoys: string
  suitableActivitiesGirls: string
  sameTypesOfSportsAndActivities: SelectOption
  timeForPhysicalActivities: SelectOption
  moreOpportunitiesOutsideHouseChores: SelectOption

  //Risk Behavior 2
  smokingRisks: string[]
  alcoholRisks: string[]
  thoughtsOnSubstances: [
    [
      {
        value: 'They are harmful and should be avoided'
        label: 'They are harmful and should be avoided'
      },
      {
        value: 'They are harmful and should be avoided'
        label: 'They are harmful and should be avoided'
      },
      { value: 'They are not harmful'; label: 'They are not harmful' },
      { value: "I don't know"; label: 'I don’t know' },
    ],
  ]
  importanceOfMentalHealth: [
    { value: 'Very important'; label: 'Very important' },
    { value: 'Somewhat important'; label: 'Somewhat important' },
    { value: 'Not very important'; label: 'Not very important' },
    { value: 'Not important at all'; label: 'Not important at all' },
  ]
  //Physical Activity 2

  fruitsVegetables: [
    { value: 'Every day'; label: 'Every day' },
    { value: 'A few times a week'; label: 'A few times a week' },
    { value: 'Rarely'; label: 'Rarely' },
    { value: 'Never'; label: 'Never' },
  ]
  snacksConsumption: [
    { value: 'Every day'; label: 'Every day' },
    { value: 'A few times a week'; label: 'A few times a week' },
    { value: 'Rarely'; label: 'Rarely' },
    { value: 'Never'; label: 'Never' },
  ]
  sugaryBeverages: [
    { value: 'Every day'; label: 'Every day' },
    { value: 'A few times a week'; label: 'A few times a week' },
    { value: 'Rarely'; label: 'Rarely' },
    { value: 'Never'; label: 'Never' },
  ]
  physicalActivityDuration: [
    { value: 'Less than 30 minutes'; label: 'Less than 30 minutes' },
    { value: '30 minutes to 1 hour'; label: '30 minutes to 1 hour' },
    { value: 'More than 1 hour'; label: 'More than 1 hour' },
    { value: 'Not applicable'; label: 'Not applicable' },
  ]
  physicalActivityTypes: string[]
  houseChoresFrequency: [
    { value: 'Every day'; label: 'Every day' },
    { value: 'Several times a week'; label: 'Several times a week' },
    { value: 'Once a week'; label: 'Once a week' },
    { value: 'Less than once a week'; label: 'Less than once a week' },
    { value: 'Never'; label: 'Never' },
  ]
  houseChoresTypes: string[]
  outsidePhysicalActivitiesFrequency: [
    { value: 'Every day'; label: 'Every day' },
    { value: 'Several times a week'; label: 'Several times a week' },
    { value: 'Once a week'; label: 'Once a week' },
    { value: 'Less than once a week'; label: 'Less than once a week' },
    { value: 'Never'; label: 'Never' },
  ]
  mobileGamesHours: string
  tvGamesHours: string
  bedtime: string
  wakeupTime: string
  doctorVisitsFrequency: [
    {
      value: 'Regularly (e.g., once a year)'
      label: 'Regularly (e.g., once a year)'
    },
    {
      value: 'Occasionally (e.g., when sick)'
      label: 'Occasionally (e.g., when sick)'
    },
    { value: 'Rarely'; label: 'Rarely' },
    { value: 'Never'; label: 'Never' },
  ]
  copingMechanisms: string[]
  stressFactors: string[]
  // Nutrition 3
  fruitsAndVegetablesFrequency: [
    { value: 'Every day'; label: 'Every day' },
    { value: 'A few times a week'; label: 'A few times a week' },
    { value: 'Rarely'; label: 'Rarely' },
    { value: 'Never'; label: 'Never' },
  ]
  snackConsumptionFrequency: [
    { value: 'Every day'; label: 'Every day' },
    { value: 'A few times a week'; label: 'A few times a week' },
    { value: 'Rarely'; label: 'Rarely' },
    { value: 'Never'; label: 'Never' },
  ]
  sugarySnacksBeveragesFrequency: [
    { value: 'Every day'; label: 'Every day' },
    { value: 'A few times a week'; label: 'A few times a week' },
    { value: 'Rarely'; label: 'Rarely' },
    { value: 'Never'; label: 'Never' },
  ]

  //Risk Behavior 3
  doctorVisitFrequency: [
    {
      value: 'Regularly (e.g., once a year)'
      label: 'Regularly (e.g., once a year)'
    },
    {
      value: 'Occasionally (e.g., when sick)'
      label: 'Occasionally (e.g., when sick)'
    },
    { value: 'Rarely'; label: 'Rarely' },
    { value: 'Never'; label: 'Never' },
  ]
  makesFeelBetter: string[]
  stressors: string[]
  everSmoked: [{ value: 'Yes'; label: 'Yes' }, { value: 'No'; label: 'No' }]
  currentSmoking: [{ value: 'Yes'; label: 'Yes' }, { value: 'No'; label: 'No' }]
  everTakenAlcohol: [
    { value: 'Yes'; label: 'Yes' },
    { value: 'No'; label: 'No' },
  ]
  currentAlcohol: [{ value: 'Yes'; label: 'Yes' }, { value: 'No'; label: 'No' }]
}
export const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
]
export const ethnicityOptions = [
  { value: 'Hausa', label: 'Hausa' },
  { value: 'Igbo', label: 'Igbo' },
  { value: 'Yoruba', label: 'Yoruba' },
  { value: 'Tiv', label: 'Tiv' },
  { value: 'Gbayi', label: 'Gbayi' },
  { value: 'Fulani', label: 'Fulani' },
  { value: 'Other', label: 'Other' },
]
export const religionOptions = [
  { value: 'muslim', label: 'Muslim' },
  { value: 'christian', label: 'Christian' },
  { value: 'traditionalist', label: 'Traditionalist' },
  { value: 'Other', label: 'Other' },
]

export const classLevelOptions = [
  { value: 'JSS 1', label: 'JSS 1' },
  { value: 'JSS 2', label: 'JSS 2' },
  { value: 'JSS 3', label: 'JSS 3' },
]

export const distanceToSchoolOptions = [
  { value: 'Very close', label: 'Very close' },
  { value: 'Close', label: 'Close' },
  { value: 'Far', label: 'Far' },
]

export const yearsAtSchoolOptions = [
  { value: 'Less than 1 year', label: 'Less than 1 year' },
  { value: '1-2 years', label: '1-2 years' },
  { value: '3 years', label: '3 years' },
  { value: 'More than 3 years', label: 'More than 3 years' },
]

export const siblingPositionOptions = [
  { value: 'First', label: 'First' },
  { value: 'Second', label: 'Second' },
  { value: 'Third', label: 'Third' },
  { value: 'Fourth', label: 'Fourth' },
  { value: 'Greater than 4', label: 'Greater than 4' },
]
export const livingSituationOptions = [
  { value: 'Both parents', label: 'Both parents' },
  {
    value: 'One parent (Mother)',
    label: 'One parent (Mother)',
  },
  {
    value: 'One parent (Father)',
    label: 'One parent (Father)',
  },
  { value: 'Other relatives', label: 'Other relatives' },
  { value: 'Non-relatives', label: 'Non-relatives' },
]
export const YesorNoOptions = [
  { value: 'Yes, I have', label: 'Yes, I have' },
  {
    value: 'No',
    label: 'No',
  },
]
export const YesorNoOptionsOther = [
  { value: 'Yes', label: 'Yes' },
  {
    value: 'No',
    label: 'No',
  },
]

export const healthStatusOptions = [
  { value: 'Very good', label: 'Very good' },
  { value: 'Good', label: 'Good' },
  { value: 'Okay', label: 'Okay' },
  { value: 'Not so good', label: 'Not so good' },
]
