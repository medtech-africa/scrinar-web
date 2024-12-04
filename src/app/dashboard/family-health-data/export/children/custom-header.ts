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

  //healthData
  { label: 'BMI', key: 'bmi' },
  { label: 'Height', key: 'height' },
  { label: 'Weight', key: 'weight' },
  { label: 'Pulse', key: 'pulse' },
  { label: 'Waist', key: 'waist' },
  { label: 'Blood pressure', key: 'bloodPressure' },
  { label: 'Glucose level', key: 'glucoseLevel' },

  // Diet and Nutrition
  // {
  //   label: 'Balanced Diet Importance',
  //   key: 'nutrition.balancedDietImportance',
  //   studentId: 'nutrition',
  // },
  // {
  //   label: 'Eating Healthy Foods',
  //   key: 'nutrition.eatingHealthyFoods',
  //   studentId: 'nutrition',
  // },
  // {
  //   label: 'Snack Preference',
  //   key: 'nutrition.snackPreference',
  //   studentId: 'nutrition',
  // },
  /* The above code appears to be defining a series of objects with properties related to nutrition.
  Each object represents a specific aspect of nutrition, such as fruits and vegetables, snacks
  consumption, sugary beverages, diet consequences, examples of different types of nutrients (carbs,
  protein, fat, vitamins), and the effects of sweets and salty foods. Each object has a label, key,
  and studentId property associated with it. */
  // {
  //   label: 'Fruits and Vegetables',
  //   key: 'nutrition.fruitsVegetables',
  //   studentId: 'nutrition',
  // },
  // {
  //   label: 'Snacks Consumption',
  //   key: 'nutrition.snacksConsumption',
  //   studentId: 'nutrition',
  // },
  // {
  //   label: 'Sugary Beverages',
  //   key: 'nutrition.sugaryBeverages',
  //   studentId: 'nutrition',
  // },
  // {
  //   label: 'Diet Consequence',
  //   key: 'nutrition.dietConsequence',
  //   studentId: 'nutrition',
  // },
  // {
  //   label: 'Carb Examples',
  //   key: 'nutrition.carbExamples',
  //   studentId: 'nutrition',
  // },
  // {
  //   label: 'Protein Examples',
  //   key: 'nutrition.proteinExamples',
  //   studentId: 'nutrition',
  // },
  // {
  //   label: 'Fat Examples',
  //   key: 'nutrition.fatExamples',
  //   studentId: 'nutrition',
  // },
  // {
  //   label: 'Vitamin Examples',
  //   key: 'nutrition.vitaminExamples',
  //   studentId: 'nutrition',
  // },
  // {
  //   label: 'Sweets Effect',
  //   key: 'nutrition.sweetsEffect',
  //   studentId: 'nutrition',
  // },
  // {
  //   label: 'Salty Food Effect',
  //   key: 'nutrition.saltyFoodEffect',
  //   studentId: 'nutrition',
  // },

  {
    label:
      'Do you know that taking a diet with a variety of foods from different food groups is important for your health?',
    key: 'nutrition.awareImportanceOfFoodVariety',
    studentId: 'nutrition',
  },
  {
    label: 'Do you know that food has 3 different nutritional benefits?',
    key: 'nutrition.awareFoodHasDiffBenefits',
    studentId: 'nutrition',
  },
  {
    label: 'Can you mention any of them?',
    key: 'nutrition.foodBenefits',
    studentId: 'nutrition',
  },
  {
    label:
      'What do you think can happen if your child eats a lot of sweets and candies?',
    key: 'nutrition.effectsOfTooMuchSweets',
    studentId: 'nutrition',
  },
  {
    label:
      'What do you think can happen if your child eat a lot of salty food or food with a lot of oil?',
    key: 'nutrition.effectsOfTooMuchSaltAndOil',
    studentId: 'nutrition',
  },
  {
    label:
      "What do you think you could change in your diet to make it healthier?",
    key: 'nutrition.changeInDietToBeHealthy',
    studentId: 'nutrition',
  },
  {
    label: 'How many meals do you eat daily?',
    key: 'nutrition.numberDailyMeals',
    studentId: 'nutrition',
  },
  {
    label: 'Why do you feel that change would help you stay healthy?',
    key: 'nutrition.reasonChangeImpactHealth',
    studentId: 'nutrition',
  },
  {
      label:
        'In a typical week, how often do you eat breakfast in the morning?',
      key: 'nutrition.mealFrequency.breakfast_frequency',studentId: 'nutrition',
    },
    {
      label: 'When you eat breakfast, what time do you usually eat it?',
      key: 'nutrition.mealFrequency.breakfast_time',
      studentId: 'nutrition',
    },
    {
      label: 'If you do not eat breakfast every morning, why?',
      key: 'nutrition.mealFrequency.breakfast_skipped_reason',
      studentId: 'nutrition',
    },
    {
      label: 'In a typical week, how often do you eat lunch?',
      key: 'nutrition.mealFrequency.lunch_frequency',
      studentId: 'nutrition',
    },
    {
      label: 'In a typical week, how often do you eat dinner?',
      key: 'nutrition.mealFrequency.dinner_frequency',
      studentId: 'nutrition',
  },
    {
      label:
        'In a typical week, on how many days do you eat “beans, nuts, meat, fish or milk products”?',
      key: 'nutrition.foodGroupFrequency.protein_sources_frequency',
       studentId: 'nutrition',
    },
    {
      label:
        'In a typical week, on how many days do you eat “a variety of foods from different food groups” (e.g. 4-star diet, 3 food groups)”?',
      key: 'nutrition.foodGroupFrequency.varied_diet_frequency',
       studentId: 'nutrition',
    },
    {
      label:
        'In a typical week, on how many days do you eat “green leafy vegetables”?',
      key: 'nutrition.foodGroupFrequency.green_leafy_vegetables_frequency',
       studentId: 'nutrition',
    },
    {
      label:
        'In a typical week, on how many days do you consume snacks like buns, doughnut, sausage, biscuits, etc?',
      key: 'nutrition.foodGroupFrequency.unhealthy_snacks_frequency',
       studentId: 'nutrition',
    },
    {
      label:
        'In a typical week, on how many days do you drink sugary beverages like coke, fanta etc?',
      key: 'nutrition.foodGroupFrequency.sugary_drinks_frequency',
       studentId: 'nutrition',
    },

  // mealFrequncy: {
  //             breakfast_frequency:
  //               studentData?.nutrition?.foodKnowledge?.breakfast_frequency,
  //             breakfast_time:
  //               studentData?.nutrition?.foodKnowledge?.breakfast_time,
  //             breakfast_skipped_reason:
  //               studentData?.nutrition?.foodKnowledge?.breakfast_skipped_reason,
  //             lunch_frequency:
  //               studentData?.nutrition?.foodKnowledge?.lunch_frequency,
  //             dinner_frequency:
  //               studentData?.nutrition?.foodKnowledge?.dinner_frequency,
  //           },
  //           numberDailyMeals: studentData?.nutrition?.numberDailyMeals,
  //           reasonChangeImpactHealth:
  //             studentData?.nutrition?.reasonChangeImpactHealth,
  //         }

  
  // Physical Activity
  {
    label: 'Physical Activity',
    key: 'physicalActivity.physicalActivity',
    studentId: 'physicalActivity',
  },
  {
    label: 'Physical Activity Duration',
    key: 'physicalActivity.physicalActivityDuration',
    studentId: 'physicalActivity',
  },
  {
    label: 'Physical Activity Types',
    key: 'physicalActivity.physicalActivityTypes',
    studentId: 'physicalActivity',
  },
  {
    label: 'Regular Physical Activity',
    key: 'physicalActivity.regularPhysicalActivity',
    studentId: 'physicalActivity',
  },
  {
    label: 'Barriers to Physical Activity',
    key: 'physicalActivity.barriersToPhysicalActivity',
    studentId: 'physicalActivity',
  },
  {
    label: 'Importance of Physical Activity',
    key: 'physicalActivity.importanceOfPhysicalActivity',
    studentId: 'physicalActivity',
  },
  {
    label: 'Activity Benefits',
    key: 'physicalActivity.activityBenefits',
    studentId: 'physicalActivity',
  },
  {
    label: 'Exercise Activities',
    key: 'physicalActivity.exerciseActivities',
    studentId: 'physicalActivity',
  },
  {
    label: 'House Chores Frequency',
    key: 'physicalActivity.houseChoresFrequency',
    studentId: 'physicalActivity',
  },
  {
    label: 'House Chores Types',
    key: 'physicalActivity.houseChoresTypes',
    studentId: 'physicalActivity',
  },
  {
    label: 'Outside Physical Activities Frequency',
    key: 'physicalActivity.outsidePhysicalActivitiesFrequency',
    studentId: 'physicalActivity',
  },
  {
    label: 'Average Mobile Games Hours',
    key: 'physicalActivity.averageHoursOnMobileGamesComputerInternetDaily',
    studentId: 'physicalActivity',
  },
  {
    label: 'Average TV Hours',
    key: 'physicalActivity.averageHoursOnTelevisionDaily',
    studentId: 'physicalActivity',
  },
  {
    label: 'Time You Sleep',
    key: 'physicalActivity.timeYouSleep',
    studentId: 'physicalActivity',
  },
  {
    label: 'Time You Wake',
    key: 'physicalActivity.timeYouWake',
    studentId: 'physicalActivity',
  },

  // Gender and Activities
  {
    label: 'Should Boys Girls Do Same Sports',
    key: 'physicalActivity.shouldBoysGirlsDoSameSports',
    studentId: 'physicalActivity',
  },
  {
    label: 'Suitable Activities for Boys',
    key: 'physicalActivity.suitableActivitiesForBoys',
    studentId: 'physicalActivity',
  },
  {
    label: 'Suitable Activities for Girls',
    key: 'physicalActivity.suitableActivitiesForGirls',
    studentId: 'physicalActivity',
  },
  {
    label: 'Same Types of Sports Activities',
    key: 'physicalActivity.sameTypesOfSportsAndActivities',
    studentId: 'physicalActivity',
  },
  {
    label: 'Time for Physical Activities',
    key: 'physicalActivity.timeForPhysicalActivities',
    studentId: 'physicalActivity',
  },
  {
    label: 'More Opportunities Outside House Chores',
    key: 'physicalActivity.moreOpportunitiesOutsideHouseChores',
    studentId: 'physicalActivity',
  },

  // Health Knowledge
  {
    label: 'Do You Know NCD',
    key: 'ncd.doYouKnowNCD',
    studentId: 'ncd',
  },
  {
    label: 'Age Group at Risk of NCD',
    key: 'ncd.ageGroupAtRiskOfNcd',
    studentId: 'ncd',
  },
  {
    label: 'Do You Know High Blood Pressure',
    key: 'ncd.doYouKnowHighBloodPressure',
    studentId: 'ncd',
  },
  {
    label: 'Do You Know Diabetes',
    key: 'ncd.doYouKnowDiabetes',
    studentId: 'ncd',
  },
  {
    label: 'Do You Know Obesity',
    key: 'ncd.doYouKnowObesity',
    studentId: 'ncd',
  },
  {
    label: 'How Prevent Getting NCD',
    key: 'ncd.howPreventGettingNcd',
    studentId: 'ncd',
  },
  {
    label: 'Any Family Member with NCD',
    key: 'ncd.anyFamilyMemberWithNcd',
    studentId: 'ncd',
  },

  // Mental Health and Stress
  {
    label: 'Mental Health Importance',
    key: 'ncdRiskFactor.mentalHealthImportance',
    studentId: 'ncdRiskFactor',
  },
  {
    label: 'Stress Causes',
    key: 'ncdRiskFactor.stressCauses',
    studentId: 'ncdRiskFactor',
  },
  {
    label: 'Feelings of Stress',
    key: 'ncdRiskFactor.feelingsOfstress',
    studentId: 'ncdRiskFactor',
  },
  {
    label: 'Stress Signs',
    key: 'ncdRiskFactor.stressSigns',
    studentId: 'ncdRiskFactor',
  },
  {
    label: 'Makes Feel Better',
    key: 'ncdRiskFactor.makesFeelBetter',
    studentId: 'ncdRiskFactor',
  },
  {
    label: 'Stressors',
    key: 'ncdRiskFactor.stressors',
    studentId: 'ncdRiskFactor',
  },

  // Risk Behaviors
  {
    label: 'Ever Smoked',
    key: 'ncdRiskFactor.everSmoked',
    studentId: 'ncdRiskFactor',
  },
  {
    label: 'Current Smoking',
    key: 'ncdRiskFactor.currentSmoking',
    studentId: 'ncdRiskFactor',
  },
  {
    label: 'Ever Taken Alcohol',
    key: 'ncdRiskFactor.everTakenAlcohol',
    studentId: 'ncdRiskFactor',
  },
  {
    label: 'Current Alcohol',
    key: 'ncdRiskFactor.currentAlcohol',
    studentId: 'ncdRiskFactor',
  },
  {
    label: 'Smoking Risks',
    key: 'ncdRiskFactor.smokingRisks',
    studentId: 'ncdRiskFactor',
  },
  {
    label: 'Alcohol Risks',
    key: 'ncdRiskFactor.alcoholRisks',
    studentId: 'ncdRiskFactor',
  },
  {
    label: 'Thoughts on Substances',
    key: 'ncdRiskFactor.thoughtsOnSubstances',
    studentId: 'ncdRiskFactor',
  },

  // HPV and Health Services
  {
    label: 'HPV Vaccine',
    key: 'healthServices.hpvVaccine',
    studentId: 'healthServices',
  },
  {
    label: 'Idea of HPV Vaccine',
    key: 'healthServices.ideaOfHpvVaccine',
    studentId: 'healthServices',
  },
  {
    label: 'Idea of HPV Vaccine Source',
    key: 'healthServices.ideaOfHpvVaccineSource',
    studentId: 'healthServices',
  },
  {
    label: 'Had HPV Vaccine',
    key: 'healthServices.hadHpvVaccine',
    studentId: 'healthServices',
  },
  {
    label: 'Willing to Receive HPV Vaccine',
    key: 'healthServices.willingToReceiveHpvVaccine',
    studentId: 'healthServices',
  },
  {
    label: 'Health Checkups Importance',
    key: 'healthServices.healthCheckupsImportance',
    studentId: 'healthServices',
  },
  {
    label: 'Benefits of Regular Health Checkups',
    key: 'healthServices.benefitsOfRegularHealthCheckups',
    studentId: 'healthServices',
  },
  {
    label: 'Doctor Visit Frequency',
    key: 'healthServices.doctorVisitFrequency',
    studentId: 'healthServices',
  },
  {
    label: 'Someone to Talk to About Health',
    key: 'healthServices.someoneToTalkToAboutHealth',
    studentId: 'healthServices',
  },

  // Water and Hygiene
  {
    label: 'Sources of Water at Home',
    key: 'healthHygiene.sourcesOfWaterAtHome',
    studentId: 'healthHygiene',
  },
  {
    label: 'Water Treatment Method at Home',
    key: 'healthHygiene.waterTreatmentMethodAtHome',
    studentId: 'healthHygiene',
  },
  {
    label: 'Toilet Facility',
    key: 'healthHygiene.toiletFacility',
    studentId: 'healthHygiene',
  },
  {
    label: 'Facility Used to Wash Hand',
    key: 'healthHygiene.facilityUsedToWashHand',
    studentId: 'healthHygiene',
  },
  {
    label: 'Did You Clean Hand After Last Toilet Usage',
    key: 'healthHygiene.didYouCleanHandAfterLastToiletUsage',
    studentId: 'healthHygiene',
  },
  {
    label: 'What Was Used to Wash Hand',
    key: 'healthHygiene.whatWasUsedToWashHand',
    studentId: 'healthHygiene',
  },

  //Ideal Body

  {
    label: 'Body Shape - What do you think is the ideal body size for women?',
    key: 'idealBody.womenShape',
    studentId: 'idealBody',
  },
  {
    label: 'Weight - What do you think is the ideal body size for women?',
    key: 'idealBody.womenWeight',
    studentId: 'idealBody',
  },
  {
    label:
      'Body Shape - What do you think is an ideal body size for adolescent girls?',
    key: 'idealBody.adolescentWomenShape',
    studentId: 'idealBody',
  },
  {
    label:
      'Weight - What do you think is an ideal body size for adolescent girls?',
    key: 'idealBody.adolescentWomenWeight',
    studentId: 'idealBody',
  },
  {
    label: 'Body Shape - What do you think is the ideal body size for men?',
    key: 'idealBody.menShape',
    studentId: 'idealBody',
  },
  {
    label: 'Weight - What do you think is the ideal body size for men?',
    key: 'idealBody.menWeight',
    studentId: 'idealBody',
  },
  {
    label:
      'Body Shape - What do you think is the ideal body size for adolescent boys?',
    key: 'idealBody.adolescentMenShape',
    studentId: 'idealBody',
  },
  {
    label:
      'Weight - What do you think is the ideal body size for adolescent boys?',
    key: 'idealBody.adolescentMenWeight',
    studentId: 'idealBody',
  },

  {
    label: 'Do you know your weight?',
    key: 'idealBody.knowYourWeight',
    studentId: 'idealBody',
  },
  {
    label: 'What is your weight?',
    key: 'idealBody.yourWeight',
    studentId: 'idealBody',
  },
  {
    label: "If yes, do you think it's a healthy weight?",
    key: 'idealBody.isYourWeightHealthy',
    studentId: 'idealBody',
  },

  {
    label: 'Do you know your height?',
    key: 'idealBody.knowYourHeight',
    studentId: 'idealBody',
  },
  {
    label: 'What is your height?',
    key: 'idealBody.yourHeight',
    studentId: 'idealBody',
  },
  {
    label: "If yes, do you think it's a healthy height?",
    key: 'idealBody.isYourHeightHealthy',
    studentId: 'idealBody',
  },
]

export const excelHeaders = csvHeaders.map((header) => ({
  header: header.label,
  key: header.key,
  studentId: header.studentId,
  width: 30, // Default width, adjust as needed for specific columns
}))
