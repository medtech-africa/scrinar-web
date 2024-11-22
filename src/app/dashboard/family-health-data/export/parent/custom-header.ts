// CSV Headers
export const csvHeaders = [
  { label: 'User Id', key: 'userId' },
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Middle Name', key: 'middleName' },
  { label: 'Age', key: 'age' },
  { label: 'Gender', key: 'gender' },
  { label: 'Mobile', key: 'mobile' },
  { label: 'Family Code', key: 'familyCode' },
  { label: 'Is Guardian', key: 'isGuardian' },
  { label: 'Years In Community', key: 'yearsInCommunity' },
  { label: 'Ethnicity', key: 'ethnicity' },
  { label: 'Other Ethnicity', key: 'otherEthnicity' },
  { label: 'Languages Spoken', key: 'languagesSpoken' },
  { label: 'Other Language', key: 'otherLanguage' },
  { label: 'Religion', key: 'religion' },
  { label: 'Other Religion', key: 'otherReligion' },
  { label: 'Education', key: 'education' },
  { label: 'Work Status', key: 'workStatus' },
  { label: 'Occupation', key: 'occupation' },
  { label: 'Household Members Children', key: 'householdMembers.children' },
  { label: 'Household Members Adults', key: 'householdMembers.adults' },
  { label: 'Household Income', key: 'householdIncome' },
  { label: 'Chronic Health Condition', key: 'chronicHealth.hasCondition' },
  { label: 'Chronic Health Details', key: 'chronicHealth.condition' },
  { label: 'Health Status', key: 'healthStatus' },
  { label: 'Number of Children', key: 'noOfChildren' },
  { label: 'Is Pregnant', key: 'isPregnant' },
  { label: 'How Many Wives', key: 'howManyWives' },

  {
    label: 'Who is primarily responsible for farming in your household',
    key: 'genderHouseholdRole.farming_responsibility',
  },
  {
    label: 'Who is primarily responsible for providing the family income',
    key: 'genderHouseholdRole.income_responsibility',
  },
  {
    label: 'Who is primarily responsible for cooking meals in your household?',
    key: 'genderHouseholdRole.cooking_responsibility',
  },
  {
    label: 'Who is responsible for washing dishes and cleaning up after meals?',
    key: 'genderHouseholdRole.cleaning_responsibility',
  },
  {
    label:
      'Who is primarily responsible for childcare (e.g., feeding, bathing, helping with schoolwork)?',
    key: 'genderHouseholdRole.childcare_responsibility',
  },
  {
    label:
      'Who is primarily responsible for collecting water for the household?',
    key: 'genderHouseholdRole.water_collection_responsibility',
  },
  {
    label:
      'Who is responsible for collecting firewood or other fuels for cooking?',
    key: 'genderHouseholdRole.fuel_collection_responsibility',
  },
  {
    label:
      'Who is responsible for purchasing household items (e.g., food stuffs, clothes, other supplies)?',
    key: 'genderHouseholdRole.purchasing_responsibility',
  },
  {
    label:
      'Who is responsible for selling items (e.g., goods, food, produce) for the household?',
    key: 'genderHouseholdRole.selling_responsibility',
  },
  {
    label: 'Who typically handles household budgeting and managing finances?',
    key: 'genderHouseholdRole.budgeting_responsibility',
  },
  {
    label:
      'Who takes the lead in making decisions about the children’s education (e.g., school choice, extracurricular activities)?',
    key: 'genderHouseholdRole.education_decision_responsibility',
  },
  {
    label:
      'Who is responsible for taking care of the family’s health (e.g., deciding what health facility, ensuring family members take medication)?',
    key: 'genderHouseholdRole.healthcare_responsibility',
  },

  //NCD
  {
    label:
      "Do you know what the term 'Non-Communicable diseases' means? (select all that you agree with)",
    key: 'ncd.doYouKnowNCD',
  },
  {
    label:
      'In your opinion, which age group is most at risk for developing non-communicable diseases (NCDs) such as diabetes, heart disease, or hypertension?',
    key: 'ncd.ageGroupAtRiskOfNcd',
  },
  {
    label: 'Do you know what high blood pressure (hypertension) is?',
    key: 'ncd.doYouKnowHighBloodPressure',
  },
  {
    label: 'Do you know what diabetes is?',
    key: 'ncd.doYouKnowDiabetes',
  },
  {
    label: 'Do you know what obesity is?',
    key: 'ncd.doYouKnowObesity',
  },
  {
    label:
      'How can someone prevent getting diseases like high blood pressure or diabetes?',
    key: 'ncd.howPreventGettingNcd',
  },
  {
    label:
      'Do you have any family members who have any of these conditions (DM, hypertension, etc)',
    key: 'ncd.anyFamilyMemberWithNcd',
  },
  {
    label:
      'If someone has high blood pressure (hypertension), what should they do to help manage it and stay healthy?',
    key: 'ncd.howHighBpIsManaged',
  },

  // Nutrition Knowledge

  {
    label:
      'Do you know that taking a diet with a variety of foods from different food groups is important for your health?',
    key: 'nutrition.awareImportanceOfFoodVariety',
  },
  {
    label: 'Do you know that food has 3 different nutritional benefits?',
    key: 'nutrition.awareFoodHasDiffBenefits',
  },
  {
    label: 'Can you mention any of them?',
    key: 'nutrition.foodBenefits',
  },
  {
    label:
      'What do you think can happen if your child eats a lot of sweets and candies?',
    key: 'nutrition.effectsOfTooMuchSweets',
  },
  {
    label:
      'What do you think can happen if your child eat a lot of salty food or food with a lot of oil?',
    key: 'nutrition.effectsOfTooMuchSaltAndOil',
  },
  {
    label: "Do you think it is necessary to make your child's diet healthier?",
    key: 'nutrition.necessityForHealthChildDiet',
  },
  {
    label:
      "What do you think you could change in your child's diet to make it healthier?",
    key: 'nutrition.changeInDietToBeHealthy',
  },
  {
    label: "If you answered no, why do you think it's not necessary?",
    key: 'nutrition.whyNotNecessityForHealthChildDiet',
  },
  {
    label: 'How many meals do you eat daily?',
    key: 'nutrition.numberDailyMeals',
  },
  {
    label: 'Why do you feel that change would help you stay healthy?',
    key: 'nutrition.reasonChangeImpactHealth',
  },
  {
    label: 'Who provides money for family meals?',
    key: 'nutrition.providesMoneyForMeals',
  },
  {
    label:
      'Who in the household decides how much is spent on fruits and vegetables?',
    key: 'nutrition.decidesMoneyOnFruits',
  },
  {
    label: 'Who decides daily meals for the family?',
    key: 'nutrition.decidesMealsForFamily',
  },
  {
    label: 'How many meals do you make for your family daily?',
    key: 'riskyBehavior.noOfDailyMeals',
  },
  {
    label: 'How do you determine the Quantity of salt to use when cooking?',
    key: 'nutrition.saltQuantityDetermination',
  },
  {
    label: 'Which of these do you use when cooking',
    key: 'nutrition.thingsUsedWhenCooking',
  },
  {
    label: 'How often does your family eat fried foods or oily foods?',
    key: 'nutrition.friedFood',
  },
  {
    label: 'What source of fuel do you most often use for cooking?',
    key: 'nutrition.sourceOfFuel',
  },
  {
    label: 'What do you consider when making meals for your family?',
    key: 'nutrition.considerationBeforeMeals',
  },
  {
    label: 'How often do you give your child breakfast in the morning?',
    key: 'nutrition.childBreakfast',
  },
  {
    label: "If you don't give them breakfast every morning, why?",
    key: 'nutrition.noChildBreakfast',
  },
  {
    label: 'How do you provide lunch to your JSS children?',
    key: 'nutrition.childLunch',
  },
  // Food Knowledge Section
  {
    label: 'Cereals nutritional knowledge',
    key: 'nutrition.foodKnowledge.cereals',
  },
  {
    label: 'Roots nutritional knowledge',
    key: 'nutrition.foodKnowledge.roots',
  },
  {
    label: 'Beans & nuts nutritional knowledge',
    key: 'nutrition.foodKnowledge.beans_nuts',
  },
  {
    label: 'Meat, fish, egg & milk products nutritional knowledge',
    key: 'nutrition.foodKnowledge.meat_fish',
  },
  {
    label: 'Vegetables nutritional knowledge',
    key: 'nutrition.foodKnowledge.vegetables',
  },
  {
    label: 'Fruits nutritional knowledge',
    key: 'nutrition.foodKnowledge.fruits',
  },
  // Food Group Frequency Section
  {
    label: 'Protein sources frequency',
    key: 'nutrition.foodGroupFrequency.protein_sources_frequency',
  },
  {
    label: 'Varied diet frequency',
    key: 'nutrition.foodGroupFrequency.varied_diet_frequency',
  },
  {
    label: 'Green leafy vegetables frequency',
    key: 'nutrition.foodGroupFrequency.green_leafy_vegetables_frequency',
  },
  {
    label: 'Unhealthy snacks frequency',
    key: 'nutrition.foodGroupFrequency.unhealthy_snacks_frequency',
  },
  {
    label: 'Sugary drinks frequency',
    key: 'nutrition.foodGroupFrequency.sugary_drinks_frequency',
  },
  {
    label: 'Vegetable portion size',
    key: 'nutrition.foodGroupFrequency.vegetable_portion_size',
  },

  // Risky Behavior
  { label: 'Smoking Risks', key: 'riskyBehavior.smokingRisks' },
  { label: 'Secondhand Smoking', key: 'riskyBehavior.secondhandSmoking' },
  { label: 'Checkup Importance', key: 'riskyBehavior.checkupImportance' },
  { label: 'Stress Factors', key: 'riskyBehavior.stressFactors' },
  { label: 'Long Term Stress', key: 'riskyBehavior.longTermStress' },
  { label: 'Stress Signs', key: 'riskyBehavior.stressSigns' },
  { label: 'Other Stress Signs', key: 'riskyBehavior.otherStressSigns' },
  {
    label:
      'How important do you think it is to take care of your mental health?',
    key: 'riskyBehavior.mentalHealthImportance',
  },
  {
    label: 'Which of the following can cause stress at your age?',
    key: 'riskyBehavior.stressCauses',
  },

  //Health Maintenance

  {
    label: 'What do you think is the importance of regular health screening?',
    key: 'healthMaintenance.importanceOfRegularScreening',
  },
  {
    label: 'How often do you visit the health facility for health check-ups?',
    key: 'healthMaintenance.healthFacility',
  },
  {
    label:
      'How often do you take your child (the one attending JSS) to visit the health facility for health check-ups?',
    key: 'healthMaintenance.childHealth.frequencyOfVisits',
  },
  {
    label:
      "How interested are you in knowing about your child's health status?",
    key: 'healthMaintenance.childHealth.interestInStatus',
  },
  {
    label:
      'How important is it for you to know whether your child has any health problems or risks?',
    key: 'healthMaintenance.childHealth.importanceOfKnowingProblems',
  },
  {
    label:
      "How often would you like to receive updates on your child's health (e.g., physical checkups or health screenings)?",
    key: 'healthMaintenance.childHealth.frequencyOfUpdates',
  },
  {
    label:
      "Do you believe knowing about your child's health will help you support their well-being better?",
    key: 'healthMaintenance.childHealth.supportBelief',
  },
  {
    label:
      "How likely are you to participate in health-related programs or workshops aimed at improving adolescents' health?",
    key: 'healthMaintenance.healthPrograms.participationLikelihood',
  },
  {
    label:
      "What information about your child's health would you find most useful?",
    key: 'healthMaintenance.childHealthUsefulInformation',
  },
  {
    label: 'Have you used the services at the PHC for your health complaints?',
    key: 'healthMaintenance.phcHealthUsage',
  },
  {
    label:
      'Who or what are your sources of information about NCDs and their prevention?',
    key: 'healthMaintenance.ncdInfoSources',
  },
  {
    label:
      'How do you as a father contribute to the health of your child and make them less likely to have these NCD risk factors?',
    key: 'healthMaintenance.ncdFatherPreventiveContribution',
  },

  //Ideal Body

  {
    label: 'Body Shape - What do you think is the ideal body size for women?',
    key: 'idealBody.womenShape',
  },
  {
    label: 'Weight - What do you think is the ideal body size for women?',
    key: 'idealBody.womenWeight',
  },
  {
    label:
      'Body Shape - What do you think is an ideal body size for adolescent girls?',
    key: 'idealBody.adolescentWomenShape',
  },
  {
    label:
      'Weight - What do you think is an ideal body size for adolescent girls?',
    key: 'idealBody.adolescentWomenWeight',
  },
  {
    label: 'Body Shape - What do you think is the ideal body size for men?',
    key: 'idealBody.menShape',
  },
  {
    label: 'Weight - What do you think is the ideal body size for men?',
    key: 'idealBody.menWeight',
  },
  {
    label:
      'Body Shape - What do you think is the ideal body size for adolescent boys?',
    key: 'idealBody.adolescentMenShape',
  },
  {
    label:
      'Weight - What do you think is the ideal body size for adolescent boys?',
    key: 'idealBody.adolescentMenWeight',
  },
  {
    label: "If yes, do you think it's a healthy weight?",
    key: 'idealBody.isYourHeightHealthy',
  },

  //NCD Risk factor
  // - Work Section
  {
    label:
      'Does your work involve vigorous-intensity activity that causes large increases in breathing or heart rate like carrying or lifting heavy loads, digging or construction work?',
    key: 'ncdRiskFactor.work.vigorousActivity',
  },
  {
    label:
      'In a typical week, on how many days do you do vigorous-intensity activities as part of your work?',
    key: 'ncdRiskFactor.work.vigorousActivityDays',
  },
  {
    label:
      'How much time do you spend doing vigorous-intensity activities at work on a typical day?',
    key: 'ncdRiskFactor.work.vigorousActivityTimeDuration',
  },
  {
    label: 'What types of house chores do you regularly do at home?',
    key: 'ncdRiskFactor.home.houseChores',
  },
  {
    label:
      'How often do you participate in house chores that require physical effort and make you sweat?',
    key: 'ncdRiskFactor.home.physicalChoresFrequency',
  },
  {
    label: 'How long do you usually engage in it for?',
    key: 'ncdRiskFactor.home.houseChoresDuration',
  },

  // -Travel Section
  {
    label:
      'Do you walk or use a bicycle (pedal cycle) to get to and from places?',
    key: 'ncdRiskFactor.travel.walkOrBicycle',
  },
  {
    label:
      'In a typical week, on how many days do you walk or bicycle to get to and from places?',
    key: 'ncdRiskFactor.travel.walkOrBicycleDays',
  },
  {
    label:
      'How much time do you spend walking or bicycling for travel on a typical day?',
    key: 'ncdRiskFactor.travel.walkOrBicycleTime',
  },

  // -Recreational Activities
  {
    label:
      'Do you do any vigorous-intensity sports, fitness, or recreational (leisure) activities that cause large increases in breathing or heart rate like running or football?',
    key: 'ncdRiskFactor.activities.vigorousSports',
  },
  {
    label:
      'In a typical week, on how many days do you do vigorous-intensity sports, fitness, or recreational (leisure) activities?',
    key: 'ncdRiskFactor.activities.vigorousSportsDays',
  },
  {
    label:
      'How much time do you spend doing vigorous-intensity sports, fitness, or recreational activities on a typical day?',
    key: 'ncdRiskFactor.activities.vigorousSportsTime',
  },

  //- Sedentary Behavior
  {
    label:
      'How much time do you usually spend sitting or reclining on a typical day?',
    key: 'ncdRiskFactor.sittingTime',
  },
  {
    label: 'What time do you go to bed at night?',
    key: 'ncdRiskFactor.timeYouSleep',
  },
  {
    label: 'What time do you wake up in the morning?',
    key: 'ncdRiskFactor.timeYouWake',
  },

  //- Smoking Section
  {
    label:
      'Do you currently smoke any tobacco products, such as cigarettes, cigars, or pipes?',
    key: 'ncdRiskFactor.currentlySmokingTobacco',
  },
  {
    label: 'How old were you when you first started smoking?',
    key: 'ncdRiskFactor.smoking.ageStarted',
  },
  {
    label: 'During the past 12 months, have you tried to stop smoking?',
    key: 'ncdRiskFactor.smoking.triedToStop',
  },
  {
    label: 'Do you currently smoke tobacco products every day?',
    key: 'ncdRiskFactor.smoking.currentlySmoking',
  },
  {
    label: 'In the past, did you ever smoke any tobacco products?',
    key: 'ncdRiskFactor.smoking.pastTobaccoUse',
  },
  {
    label: 'In the past, did you ever smoke daily?',
    key: 'ncdRiskFactor.smoking.pastDailySmoking',
  },
  {
    label: 'During the past 30 days, did someone smoke inside your home?',
    key: 'ncdRiskFactor.smoking.insideHome',
  },
  {
    label:
      'During the past 30 days, did someone smoke in closed areas in your workplace?',
    key: 'ncdRiskFactor.smoking.workplace',
  },
  {
    label:
      'Do you currently use any smokeless tobacco products such as snuff, chewing tobacco, betel?',
    key: 'ncdRiskFactor.smoking.smokelessTobacco',
  },
  {
    label: 'Do you currently use smokeless tobacco products daily?',
    key: 'ncdRiskFactor.smoking.dailySmokelessTobacco',
  },

  //- Alcohol Section
  {
    label:
      "Have you ever consumed any alcohol such as beer, wine, spirits, sachet alcohol, bitters, etc even if it's a few sips?",
    key: 'ncdRiskFactor.alcohol.everConsumed',
  },
  {
    label:
      "Have you consumed any alcohol within the past 12 months even if it's a few sips?",
    key: 'ncdRiskFactor.alcohol.consumedPast12Months',
  },
  {
    label:
      'During the past 30 days, how many times have you had at least one standard alcoholic drink?',
    key: 'ncdRiskFactor.alcohol.past30DaysFrequency',
  },
  {
    label:
      'During the past 7 days, did you consume any homebrewed alcohol, ogogoro, palm wine, or any alcohol not intended for drinking?',
    key: 'ncdRiskFactor.alcohol.past7DaysHomebrewed',
  },
  {
    label: 'Homebrewed spirits consumption',
    key: 'ncdRiskFactor.alcohol.drinks.homebrewedSpirits',
  },
  {
    label: 'Homebrewed beer or wine consumption',
    key: 'ncdRiskFactor.alcohol.drinks.homebrewedBeerWine',
  },
  {
    label: 'Non-drinkable alcohol consumption',
    key: 'ncdRiskFactor.alcohol.drinks.nonDrinkableAlcohol',
  },
  {
    label: 'Unknown alcohol consumption',
    key: 'ncdRiskFactor.alcohol.drinks.unknown',
  },

  // Physical Activities

  {
    label:
      'How much physical activity should a person do everyday to be healthy?',
    key: 'physicalActivity.amountOfPhysicalActivityDaily',
  },
  {
    label:
      "How important do you think physical exercise is for your child's health?",
    key: 'physicalActivity.importanceOfChildPhysicalExerciseOnHealth',
  },
  {
    label: 'Do you think your child gets enough physical exercise?',
    key: 'physicalActivity.childGetsEnoughExercise',
  },
  {
    label:
      'How important do you think physical exercise is for your own health?',
    key: 'physicalActivity.importancePhysicalExerciseOnYourHealth',
  },
  {
    label:
      'What is the long-term effect of performing physical activity regularly?',
    key: 'physicalActivity.longTermEffectOfPerformingPhysicalActivityRegularly',
  },
  {
    label: 'What kinds of activities are good forms of exercise?',
    key: 'physicalActivity.goodFormsOfExercise',
  },
  {
    label: 'What types of house chores do you regularly do at home?',
    key: 'physicalActivity.typesOfHouseChoresRegularly',
  },
  {
    label: 'Should boys and girls do the same types of sports and activities?',
    key: 'physicalActivity.shouldBoysGirlsDoSameSports',
  },
  {
    label:
      'What are some challenges that you think prevent children your age from being physically active?',
    key: 'physicalActivity.challengesFromBeingPhysicallyActive',
  },
  {
    label: 'Is it important for both boys and girls to be physically active?',
    key: 'physicalActivity.importanceOfBeingPhysicallyActive',
  },
  {
    label:
      'Which types of physical activities do you think are most suitable for boys?',
    key: 'physicalActivity.suitableActivitiesForBoys',
  },
  {
    label:
      'Which types of physical activities do you think are most suitable for girls?',
    key: 'physicalActivity.suitableActivitiesForGirls',
  },
  {
    label:
      'Do you think the amount of physical activity needed is different for men and women?',
    key: 'physicalActivity.amountOfPhysicalActivityNeededIsDifferentForBoth',
  },
  {
    label:
      'What common beliefs or practices in your community discourage girls from engaging in physical activities?',
    key: 'physicalActivity.beliefsThatDiscourageGirlFromPhysical',
  },
  {
    label:
      'In your community, do you think girls have more, less, or the same amount of time for physical activities compared to boys?',
    key: 'physicalActivity.amountOfTimeGirlsHaveForPhysicalThanBoys',
  },
  {
    label: 'Why do you think so?',
    key: 'physicalActivity.whyAmountOfTimeGirlsHaveForPhysicalThanBoys',
  },
  {
    label:
      'In your community, do you think girls have more, less, or the same opportunities for physical activities compared to boys?',
    key: 'physicalActivity.amountOfOpportunitiesGirlsHaveForPhysicalThanBoys',
  },
  {
    label: 'Why do you think so?',
    key: 'physicalActivity.whyAmountOfOpportunitiesGirlsHaveForPhysicalThanBoys',
  },
  // Health Hygiene
  { label: 'Water Sources', key: 'healthHygiene.sourcesOfWaterAtHome' },
  {
    label: 'Water Treatment Methods',
    key: 'healthHygiene.waterTreatmentMethodAtHome',
  },
  {
    label: 'Hand Washing After Toilet',
    key: 'healthHygiene.didYouCleanHandAfterLastToiletUsage',
  },
  {
    label: 'Hand Washing Facility',
    key: 'healthHygiene.facilityUsedToWashHand',
  },
  { label: 'Toilet Facility', key: 'healthHygiene.toiletFacility' },
  {
    label: 'What Was Used to Wash Hand',
    key: 'healthHygiene.whatWasUsedToWashHand',
  },
]

export const excelHeaders = csvHeaders.map((header) => ({
  header: header.label,
  key: header.key,
  width: 30, // Default width, adjust as needed for specific columns
}))
