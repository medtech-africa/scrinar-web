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
      'What do you think you could change in your diet to make it healthier?',
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
    label: 'In a typical week, how often do you eat breakfast in the morning?',
    key: 'nutrition.mealFrequency.breakfast_frequency',
    studentId: 'nutrition',
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
  {
    label: 'Cereals (e.g., maize, rice, sorghums)',
    key: 'nutrition.foodKnowledge.cereals',
    studentId: 'nutrition',
  },
  {
    label: 'Roots (e.g., yam, cassava, potatoes)',
    key: 'nutrition.foodKnowledge.roots',
    studentId: 'nutrition',
  },
  { label: 'Beans & nuts', key: 'nutrition.foodKnowledge.beans_nuts', studentId: 'nutrition' },
  {
    label: 'Meat, fish, egg & milk products',
    key: 'nutrition.foodKnowledge.meat_fish',
    studentId: 'nutrition',
  },
  { label: 'Vegetables', key: 'nutrition.foodKnowledge.vegetables', studentId: 'nutrition' },
  { label: 'Fruits', key: 'nutrition.foodKnowledge.fruits', studentId: 'nutrition' },

  // Physical Activity
  
  {
    label:
      'How much physical activity should a person do everyday to be healthy?',
    key: 'physicalActivity.amountOfPhysicalActivityDaily',
    studentId: 'physicalActivity',
  },
  // {
  //   label:
  //     'How important do you think physical exercise is for your own health?',
  //   key: 'physicalActivity.importancePhysicalExerciseOnYourHealth',
  //   studentId: 'physicalActivity',
  // },
  {
    label:
      'What is the long-term effect of performing physical activity regularly?',
    key: 'physicalActivity.longTermEffectOfPerformingPhysicalActivityRegularly',
    studentId: 'physicalActivity',
  },
  {
    label: 'What kinds of activities are good forms of exercise?',
    key: 'physicalActivity.goodFormsOfExercise',
    studentId: 'physicalActivity',
  },
  {
    label: 'In a typical week, how many times do you participate in  sports at school?',
    key: 'physicalActivity.amountOfSportsParticipation',
    studentId: 'physicalActivity',
  },
  {
    label: 'On one of those days, how long do you usually engage in it for?',
    key: 'physicalActivity.amountOfPhysicalActivityEngagement',
    studentId: 'physicalActivity',
  },
  {
    label: 'How often do you participate in house chores that require physical effort and make you sweat?',
    key: 'physicalActivity.amountOfPhysicalActivityHouseChore',
    studentId: 'physicalActivity',
  },
  {
    label: 'What types of house chores do you regularly do at home?',
    key: 'physicalActivity.typesOfHouseChoresRegularly',
    studentId: 'physicalActivity',
  },
  {
    label: 'Average hours spent with mobile games, computer/internet daily',
    key: 'physicalActivity.averageHoursOnMobileGamesComputerInternetDaily',
    studentId: 'physicalActivity',
  },
  {
    label: 'Average hours spent watching TV/Playing video games daily',
    key: 'physicalActivity.averageHoursOnTelevisionDaily',
    studentId: 'physicalActivity',
  },
  {
    label: 'What time do you go to bed at night?',
    key: 'physicalActivity.timeYouSleep',
    studentId: 'physicalActivity',
  },
  {
    label: 'What time do you wake up in the morning?',
    key: 'physicalActivity.timeYouWake',
    studentId: 'physicalActivity',
  },
  {
    label: 'Should boys and girls do the same types of sports and activities?',
    key: 'physicalActivity.shouldBoysGirlsDoSameSports',
    studentId: 'physicalActivity',
  },



  {
    label:
      'What are some challenges that you think prevent children your age from being physically active?',
    key: 'physicalActivity.challengesFromBeingPhysicallyActive',
    studentId: 'physicalActivity',
  },
  {
    label: 'Is it important for both boys and girls to be physically active?',
    key: 'physicalActivity.importanceOfBeingPhysicallyActive',
    studentId: 'physicalActivity',
  },
  {
    label:
      'Which types of physical activities do you think are most suitable for boys?',
    key: 'physicalActivity.suitableActivitiesForBoys',
    studentId: 'physicalActivity',
  },
  {
    label:
      'Which types of physical activities do you think are most suitable for girls?',
    key: 'physicalActivity.suitableActivitiesForGirls',
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
    label: 'How often do you visit the doctor for health check-ups?',
    key: 'healthServices.doctorVisitFrequency',
    studentId: 'healthServices',
  },
  {
    label: 'Benefits of Regular Health Checkups',
    key: 'healthServices.benefitsOfRegularHealthCheckups',
    studentId: 'healthServices',
  },
{
    label: 'Someone to Talk to About Health',
    key: 'healthServices.someoneToTalkToAboutHealth',
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
    label: 'If you have not received the vaccine, would you be willing to receive it?',
    key: 'healthServices.willingToReceiveHpvVaccineIfNotReceived',
    studentId: 'healthServices',
  },
  {
    label: 'Are you willing to receive the HPV vaccine if it is offered to you?',
    key: 'healthServices.willingToReceiveHpvVaccineIfOffered',
    studentId: 'healthServices',
  },
  {
    label: "If you’re not sure, can you tell us why?",
    key: 'healthServices.reasonForHpvVaccineUncertainty',
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
