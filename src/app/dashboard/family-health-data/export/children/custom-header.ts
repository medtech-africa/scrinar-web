export const csvHeaders = [
  // Basic Information
  { label: 'User Id', key: 'userId' },
  { label: 'Full Name', key: 'fullName' },
  { label: 'Age', key: 'age' },
  { label: 'Gender', key: 'gender' },
  { label: 'Ethnicity', key: 'ethnicity' },
  { label: 'Religion', key: 'religion' },
  { label: 'Class Level', key: 'classLevel' },
  { label: 'Distance to School', key: 'distanceToSchool' },
  { label: 'Years at School', key: 'yearsAtSchool' },
  { label: 'Community Name', key: 'communityName' },
  { label: 'Number of Children', key: 'numberOfChildren' },
  { label: 'Sibling Position', key: 'siblingPosition' },
  { label: 'Father Occupation', key: 'fatherOccupation' },
  { label: 'Mother Occupation', key: 'motherOccupation' },
  { label: 'Living Situation', key: 'livingSituation' },
  { label: 'Health Problems', key: 'healthProblems' },
  { label: 'Health Status', key: 'healthStatus' },

  // Diet and Nutrition
  { label: 'Balanced Diet Importance', key: 'balancedDietImportance' },
  { label: 'Eating Healthy Foods', key: 'eatingHealthyFoods' },
  { label: 'Snack Preference', key: 'snackPreference' },
  { label: 'Fruits and Vegetables', key: 'fruitsVegetables' },
  { label: 'Snacks Consumption', key: 'snacksConsumption' },
  { label: 'Sugary Beverages', key: 'sugaryBeverages' },
  { label: 'Diet Consequence', key: 'dietConsequence' },
  { label: 'Carb Examples', key: 'carbExamples' },
  { label: 'Protein Examples', key: 'proteinExamples' },
  { label: 'Fat Examples', key: 'fatExamples' },
  { label: 'Vitamin Examples', key: 'vitaminExamples' },
  { label: 'Sweets Effect', key: 'sweetsEffect' },
  { label: 'Salty Food Effect', key: 'saltyFoodEffect' },

  // Physical Activity
  { label: 'Physical Activity', key: 'physicalActivity' },
  { label: 'Physical Activity Duration', key: 'physicalActivityDuration' },
  { label: 'Physical Activity Types', key: 'physicalActivityTypes' },
  { label: 'Regular Physical Activity', key: 'regularPhysicalActivity' },
  { label: 'Barriers to Physical Activity', key: 'barriersToPhysicalActivity' },
  {
    label: 'Importance of Physical Activity',
    key: 'importanceOfPhysicalActivity',
  },
  { label: 'Activity Benefits', key: 'activityBenefits' },
  { label: 'Exercise Activities', key: 'exerciseActivities' },
  { label: 'House Chores Frequency', key: 'houseChoresFrequency' },
  { label: 'House Chores Types', key: 'houseChoresTypes' },
  {
    label: 'Outside Physical Activities Frequency',
    key: 'outsidePhysicalActivitiesFrequency',
  },
  {
    label: 'Average Mobile Games Hours',
    key: 'averageHoursOnMobileGamesComputerInternetDaily',
  },
  { label: 'Average TV Hours', key: 'averageHoursOnTelevisionDaily' },
  { label: 'Time You Sleep', key: 'timeYouSleep' },
  { label: 'Time You Wake', key: 'timeYouWake' },

  // Gender and Activities
  {
    label: 'Should Boys Girls Do Same Sports',
    key: 'shouldBoysGirlsDoSameSports',
  },
  { label: 'Suitable Activities for Boys', key: 'suitableActivitiesForBoys' },
  { label: 'Suitable Activities for Girls', key: 'suitableActivitiesForGirls' },
  {
    label: 'Same Types of Sports Activities',
    key: 'sameTypesOfSportsAndActivities',
  },
  { label: 'Time for Physical Activities', key: 'timeForPhysicalActivities' },
  {
    label: 'More Opportunities Outside House Chores',
    key: 'moreOpportunitiesOutsideHouseChores',
  },

  // Health Knowledge
  { label: 'Do You Know NCD', key: 'doYouKnowNCD' },
  { label: 'Age Group at Risk of NCD', key: 'ageGroupAtRiskOfNcd' },
  {
    label: 'Do You Know High Blood Pressure',
    key: 'doYouKnowHighBloodPressure',
  },
  { label: 'Do You Know Diabetes', key: 'doYouKnowDiabetes' },
  { label: 'Do You Know Obesity', key: 'doYouKnowObesity' },
  { label: 'How Prevent Getting NCD', key: 'howPreventGettingNcd' },
  { label: 'Any Family Member with NCD', key: 'anyFamilyMemberWithNcd' },

  // Mental Health and Stress
  { label: 'Mental Health Importance', key: 'mentalHealthImportance' },
  { label: 'Stress Causes', key: 'stressCauses' },
  { label: 'Feelings of Stress', key: 'feelingsOfstress' },
  { label: 'Stress Signs', key: 'stressSigns' },
  { label: 'Makes Feel Better', key: 'makesFeelBetter' },
  { label: 'Stressors', key: 'stressors' },

  // Risk Behaviors
  { label: 'Ever Smoked', key: 'everSmoked' },
  { label: 'Current Smoking', key: 'currentSmoking' },
  { label: 'Ever Taken Alcohol', key: 'everTakenAlcohol' },
  { label: 'Current Alcohol', key: 'currentAlcohol' },
  { label: 'Smoking Risks', key: 'smokingRisks' },
  { label: 'Alcohol Risks', key: 'alcoholRisks' },
  { label: 'Thoughts on Substances', key: 'thoughtsOnSubstances' },

  // HPV and Health Services
  { label: 'HPV Vaccine', key: 'hpvVaccine' },
  { label: 'Idea of HPV Vaccine', key: 'ideaOfHpvVaccine' },
  { label: 'Idea of HPV Vaccine Source', key: 'ideaOfHpvVaccineSource' },
  { label: 'Had HPV Vaccine', key: 'hadHpvVaccine' },
  {
    label: 'Willing to Receive HPV Vaccine',
    key: 'willingToReceiveHpvVaccine',
  },
  { label: 'Health Checkups Importance', key: 'healthCheckupsImportance' },
  {
    label: 'Benefits of Regular Health Checkups',
    key: 'benefitsOfRegularHealthCheckups',
  },
  { label: 'Doctor Visit Frequency', key: 'doctorVisitFrequency' },
  {
    label: 'Someone to Talk to About Health',
    key: 'someoneToTalkToAboutHealth',
  },

  // Water and Hygiene
  { label: 'Sources of Water at Home', key: 'sourcesOfWaterAtHome' },
  {
    label: 'Water Treatment Method at Home',
    key: 'waterTreatmentMethodAtHome',
  },
  { label: 'Toilet Facility', key: 'toiletFacility' },
  { label: 'Facility Used to Wash Hand', key: 'facilityUsedToWashHand' },
  {
    label: 'Did You Clean Hand After Last Toilet Usage',
    key: 'didYouCleanHandAfterLastToiletUsage',
  },
  { label: 'What Was Used to Wash Hand', key: 'whatWasUsedToWashHand' },
]

export const excelHeaders = csvHeaders.map((header) => ({
  header: header.label,
  key: header.key,
  width: 30, // Default width, adjust as needed for specific columns
}))
