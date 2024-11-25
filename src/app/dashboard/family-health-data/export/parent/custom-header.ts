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

  { label: 'BMI', key: 'bmi' },
  { label: 'Height', key: 'height' },
  { label: 'Weight', key: 'weight' },
  { label: 'Pulse', key: 'pulse' },
  { label: 'Waist', key: 'waist' },
  { label: 'Blood pressure', key: 'bloodPressure' },
  { label: 'Glucose level', key: 'glucoseLevel' },

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
    parentId: 'genderHouseholdRole',
  },
  {
    label: 'Who is primarily responsible for providing the family income',
    key: 'genderHouseholdRole.income_responsibility',
    parentId: 'genderHouseholdRole',
  },
  {
    label: 'Who is primarily responsible for cooking meals in your household?',
    key: 'genderHouseholdRole.cooking_responsibility',
    parentId: 'genderHouseholdRole',
  },
  {
    label: 'Who is responsible for washing dishes and cleaning up after meals?',
    key: 'genderHouseholdRole.cleaning_responsibility',
    parentId: 'genderHouseholdRole',
  },
  {
    label:
      'Who is primarily responsible for childcare (e.g., feeding, bathing, helping with schoolwork)?',
    key: 'genderHouseholdRole.childcare_responsibility',
    parentId: 'genderHouseholdRole',
  },
  {
    label:
      'Who is primarily responsible for collecting water for the household?',
    key: 'genderHouseholdRole.water_collection_responsibility',
    parentId: 'genderHouseholdRole',
  },
  {
    label:
      'Who is responsible for collecting firewood or other fuels for cooking?',
    key: 'genderHouseholdRole.fuel_collection_responsibility',
    parentId: 'genderHouseholdRole',
  },
  {
    label:
      'Who is responsible for purchasing household items (e.g., food stuffs, clothes, other supplies)?',
    key: 'genderHouseholdRole.purchasing_responsibility',
    parentId: 'genderHouseholdRole',
  },
  {
    label:
      'Who is responsible for selling items (e.g., goods, food, produce) for the household?',
    key: 'genderHouseholdRole.selling_responsibility',
    parentId: 'genderHouseholdRole',
  },
  {
    label: 'Who typically handles household budgeting and managing finances?',
    key: 'genderHouseholdRole.budgeting_responsibility',
    parentId: 'genderHouseholdRole',
  },
  {
    label:
      'Who takes the lead in making decisions about the children’s education (e.g., school choice, extracurricular activities)?',
    key: 'genderHouseholdRole.education_decision_responsibility',
    parentId: 'genderHouseholdRole',
  },
  {
    label:
      'Who is responsible for taking care of the family’s health (e.g., deciding what health facility, ensuring family members take medication)?',
    key: 'genderHouseholdRole.healthcare_responsibility',
    parentId: 'genderHouseholdRole',
  },

  //NCD
  {
    label:
      "Do you know what the term 'Non-Communicable diseases' means? (select all that you agree with)",
    key: 'ncd.doYouKnowNCD',
    parentId: 'ncd',
  },
  {
    label:
      'In your opinion, which age group is most at risk for developing non-communicable diseases (NCDs) such as diabetes, heart disease, or hypertension?',
    key: 'ncd.ageGroupAtRiskOfNcd',
    parentId: 'ncd',
  },
  {
    label: 'Do you know what high blood pressure (hypertension) is?',
    key: 'ncd.doYouKnowHighBloodPressure',
    parentId: 'ncd',
  },
  {
    label: 'Do you know what diabetes is?',
    key: 'ncd.doYouKnowDiabetes',
    parentId: 'ncd',
  },
  {
    label: 'Do you know what obesity is?',
    key: 'ncd.doYouKnowObesity',
    parentId: 'ncd',
  },
  {
    label:
      'How can someone prevent getting diseases like high blood pressure or diabetes?',
    key: 'ncd.howPreventGettingNcd',
    parentId: 'ncd',
  },
  {
    label:
      'Do you have any family members who have any of these conditions (DM, hypertension, etc)',
    key: 'ncd.anyFamilyMemberWithNcd',
    parentId: 'ncd',
  },
  {
    label:
      'If someone has high blood pressure (hypertension), what should they do to help manage it and stay healthy?',
    key: 'ncd.howHighBpIsManaged',
    parentId: 'ncd',
  },

  // Nutrition Knowledge

  {
    label:
      'Do you know that taking a diet with a variety of foods from different food groups is important for your health?',
    key: 'nutrition.awareImportanceOfFoodVariety',
    parentId: 'nutrition',
  },
  {
    label: 'Do you know that food has 3 different nutritional benefits?',
    key: 'nutrition.awareFoodHasDiffBenefits',
    parentId: 'nutrition',
  },
  {
    label: 'Can you mention any of them?',
    key: 'nutrition.foodBenefits',
    parentId: 'nutrition',
  },
  {
    label:
      'What do you think can happen if your child eats a lot of sweets and candies?',
    key: 'nutrition.effectsOfTooMuchSweets',
    parentId: 'nutrition',
  },
  {
    label:
      'What do you think can happen if your child eat a lot of salty food or food with a lot of oil?',
    key: 'nutrition.effectsOfTooMuchSaltAndOil',
    parentId: 'nutrition',
  },
  {
    label: "Do you think it is necessary to make your child's diet healthier?",
    key: 'nutrition.necessityForHealthChildDiet',
    parentId: 'nutrition',
  },
  {
    label:
      "What do you think you could change in your child's diet to make it healthier?",
    key: 'nutrition.changeInDietToBeHealthy',
    parentId: 'nutrition',
  },
  {
    label: "If you answered no, why do you think it's not necessary?",
    key: 'nutrition.whyNotNecessityForHealthChildDiet',
    parentId: 'nutrition',
  },
  {
    label: 'How many meals do you eat daily?',
    key: 'nutrition.numberDailyMeals',
    parentId: 'nutrition',
  },
  {
    label: 'Why do you feel that change would help you stay healthy?',
    key: 'nutrition.reasonChangeImpactHealth',
    parentId: 'nutrition',
  },
  {
    label: 'Who provides money for family meals?',
    key: 'nutrition.providesMoneyForMeals',
    parentId: 'nutrition',
  },
  {
    label:
      'Who in the household decides how much is spent on fruits and vegetables?',
    key: 'nutrition.decidesMoneyOnFruits',
    parentId: 'nutrition',
  },
  {
    label: 'Who decides daily meals for the family?',
    key: 'nutrition.decidesMealsForFamily',
    parentId: 'nutrition',
  },
  {
    label: 'How many meals do you make for your family daily?',
    key: 'riskyBehavior.noOfDailyMeals',
  },
  {
    label: 'How do you determine the Quantity of salt to use when cooking?',
    key: 'nutrition.saltQuantityDetermination',
    parentId: 'nutrition',
  },
  {
    label: 'Which of these do you use when cooking',
    key: 'nutrition.thingsUsedWhenCooking',
    parentId: 'nutrition',
  },
  {
    label: 'How often does your family eat fried foods or oily foods?',
    key: 'nutrition.friedFood',
    parentId: 'nutrition',
  },
  {
    label: 'What source of fuel do you most often use for cooking?',
    key: 'nutrition.sourceOfFuel',
    parentId: 'nutrition',
  },
  {
    label: 'What do you consider when making meals for your family?',
    key: 'nutrition.considerationBeforeMeals',
    parentId: 'nutrition',
  },
  {
    label: 'How often do you give your child breakfast in the morning?',
    key: 'nutrition.childBreakfast',
    parentId: 'nutrition',
  },
  {
    label: "If you don't give them breakfast every morning, why?",
    key: 'nutrition.noChildBreakfast',
    parentId: 'nutrition',
  },
  {
    label: 'How do you provide lunch to your JSS children?',
    key: 'nutrition.childLunch',
    parentId: 'nutrition',
  },
  // Food Knowledge Section
  {
    label: 'Cereals nutritional knowledge',
    key: 'nutrition.foodKnowledge.cereals',
    parentId: 'nutrition',
  },
  {
    label: 'Roots nutritional knowledge',
    key: 'nutrition.foodKnowledge.roots',
    parentId: 'nutrition',
  },
  {
    label: 'Beans & nuts nutritional knowledge',
    key: 'nutrition.foodKnowledge.beans_nuts',
    parentId: 'nutrition',
  },
  {
    label: 'Meat, fish, egg & milk products nutritional knowledge',
    key: 'nutrition.foodKnowledge.meat_fish',
    parentId: 'nutrition',
  },
  {
    label: 'Vegetables nutritional knowledge',
    key: 'nutrition.foodKnowledge.vegetables',
    parentId: 'nutrition',
  },
  {
    label: 'Fruits nutritional knowledge',
    key: 'nutrition.foodKnowledge.fruits',
    parentId: 'nutrition',
  },
  // Food Group Frequency Section
  {
    label: 'Protein sources frequency',
    key: 'nutrition.foodGroupFrequency.protein_sources_frequency',
    parentId: 'nutrition',
  },
  {
    label: 'Varied diet frequency',
    key: 'nutrition.foodGroupFrequency.varied_diet_frequency',
    parentId: 'nutrition',
  },
  {
    label: 'Green leafy vegetables frequency',
    key: 'nutrition.foodGroupFrequency.green_leafy_vegetables_frequency',
    parentId: 'nutrition',
  },
  {
    label: 'Unhealthy snacks frequency',
    key: 'nutrition.foodGroupFrequency.unhealthy_snacks_frequency',
    parentId: 'nutrition',
  },
  {
    label: 'Sugary drinks frequency',
    key: 'nutrition.foodGroupFrequency.sugary_drinks_frequency',
    parentId: 'nutrition',
  },
  {
    label: 'Vegetable portion size',
    key: 'nutrition.foodGroupFrequency.vegetable_portion_size',
    parentId: 'nutrition',
  },

  // Risky Behavior
  {
    label:
      'What do you do when child feels worried/upset to help them feel better',
    key: 'riskyBehavior.thingsDoneToChildToEaseWorryUpset',
    parentId: 'riskyBehavior',
  },

  {
    label: "What can happen when you're stressed for a long time?",
    key: 'riskyBehavior.feelingsOfstress',
  },
  {
    label: 'What can happen if adolescents are exposed to smoking at home?',
    key: 'riskyBehavior.whenAdolescentsExposedToSmoking',
    parentId: 'riskyBehavior',
  },

  // { label: 'Smoking Risks', key: 'riskyBehavior.smokingRisks' },
  // { label: 'Smoking Risks', key: 'riskyBehavior.smokingRisks' },
  // { label: 'Secondhand Smoking', key: 'riskyBehavior.secondhandSmoking' },
  // { label: 'Checkup Importance', key: 'riskyBehavior.checkupImportance' },
  // { label: 'Stress Factors', key: 'riskyBehavior.stressFactors' },
  // { label: 'Long Term Stress', key: 'riskyBehavior.longTermStress' },
  // { label: 'Stress Signs', key: 'riskyBehavior.stressSigns' },
  // { label: 'Other Stress Signs', key: 'riskyBehavior.otherStressSigns' },
  {
    label:
      'How important do you think it is to take care of your mental health?',
    key: 'riskyBehavior.mentalHealthImportance',
    parentId: 'riskyBehavior',
  },
  {
    label: 'Which of the following can cause stress at your age?',
    key: 'riskyBehavior.stressCauses',
    parentId: 'riskyBehavior',
  },
  {
    label: 'Which others can cause stress at your age?',
    key: 'riskyBehavior.stressOther',
    parentId: 'riskyBehavior',
  },

  //Health Maintenance

  {
    label: 'What do you think is the importance of regular health screening?',
    key: 'healthMaintenance.importanceOfRegularScreening',
    parentId: 'healthMaintenance',
  },
  {
    label: 'How often do you visit the health facility for health check-ups?',
    key: 'healthMaintenance.healthFacility',
    parentId: 'healthMaintenance',
  },
  {
    label:
      'How often do you take your child (the one attending JSS) to visit the health facility for health check-ups?',
    key: 'healthMaintenance.childHealth.frequencyOfVisits',
    parentId: 'healthMaintenance',
  },
  {
    label:
      "How interested are you in knowing about your child's health status?",
    key: 'healthMaintenance.childHealth.interestInStatus',
    parentId: 'healthMaintenance',
  },
  {
    label:
      'How important is it for you to know whether your child has any health problems or risks?',
    key: 'healthMaintenance.childHealth.importanceOfKnowingProblems',
    parentId: 'healthMaintenance',
  },
  {
    label:
      "How often would you like to receive updates on your child's health (e.g., physical checkups or health screenings)?",
    key: 'healthMaintenance.childHealth.frequencyOfUpdates',
    parentId: 'healthMaintenance',
  },
  {
    label:
      "Do you believe knowing about your child's health will help you support their well-being better?",
    key: 'healthMaintenance.childHealth.supportBelief',
    parentId: 'healthMaintenance',
  },
  {
    label:
      "How likely are you to participate in health-related programs or workshops aimed at improving adolescents' health?",
    key: 'healthMaintenance.healthPrograms.participationLikelihood',
    parentId: 'healthMaintenance',
  },
  {
    label:
      "What information about your child's health would you find most useful?",
    key: 'healthMaintenance.childHealthUsefulInformation',
    parentId: 'healthMaintenance',
  },
  {
    label: 'Have you used the services at the PHC for your health complaints?',
    key: 'healthMaintenance.phcHealthUsage',
    parentId: 'healthMaintenance',
  },
  {
    label:
      'Who or what are your sources of information about NCDs and their prevention?',
    key: 'healthMaintenance.ncdInfoSources',
    parentId: 'healthMaintenance',
  },
  {
    label:
      'How do you as a father contribute to the health of your child and make them less likely to have these NCD risk factors?',
    key: 'healthMaintenance.ncdFatherPreventiveContribution',
    parentId: 'healthMaintenance',
  },

  //Ideal Body

  {
    label: 'Body Shape - What do you think is the ideal body size for women?',
    key: 'idealBody.womenShape',
    parentId: 'idealBody',
  },
  {
    label: 'Weight - What do you think is the ideal body size for women?',
    key: 'idealBody.womenWeight',
    parentId: 'idealBody',
  },
  {
    label:
      'Body Shape - What do you think is an ideal body size for adolescent girls?',
    key: 'idealBody.adolescentWomenShape',
    parentId: 'idealBody',
  },
  {
    label:
      'Weight - What do you think is an ideal body size for adolescent girls?',
    key: 'idealBody.adolescentWomenWeight',
    parentId: 'idealBody',
  },
  {
    label: 'Body Shape - What do you think is the ideal body size for men?',
    key: 'idealBody.menShape',
    parentId: 'idealBody',
  },
  {
    label: 'Weight - What do you think is the ideal body size for men?',
    key: 'idealBody.menWeight',
    parentId: 'idealBody',
  },
  {
    label:
      'Body Shape - What do you think is the ideal body size for adolescent boys?',
    key: 'idealBody.adolescentMenShape',
    parentId: 'idealBody',
  },
  {
    label:
      'Weight - What do you think is the ideal body size for adolescent boys?',
    key: 'idealBody.adolescentMenWeight',
    parentId: 'idealBody',
  },
  {
    label: "If yes, do you think it's a healthy weight?",
    key: 'idealBody.isYourHeightHealthy',
    parentId: 'idealBody',
  },

  //NCD Risk factor
  // - Work Section
  {
    label:
      'Does your work involve vigorous-intensity activity that causes large increases in breathing or heart rate like carrying or lifting heavy loads, digging or construction work?',
    key: 'ncdRiskFactor.work.vigorousActivity',
    parentId: 'ncdRiskFactor',
  },
  {
    label:
      'In a typical week, on how many days do you do vigorous-intensity activities as part of your work?',
    key: 'ncdRiskFactor.work.vigorousActivityDays',
    parentId: 'ncdRiskFactor',
  },
  {
    label:
      'How much time do you spend doing vigorous-intensity activities at work on a typical day?',
    key: 'ncdRiskFactor.work.vigorousActivityTimeDuration',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'What types of house chores do you regularly do at home?',
    key: 'ncdRiskFactor.home.houseChores',
    parentId: 'ncdRiskFactor',
  },
  {
    label:
      'How often do you participate in house chores that require physical effort and make you sweat?',
    key: 'ncdRiskFactor.home.physicalChoresFrequency',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'How long do you usually engage in it for?',
    key: 'ncdRiskFactor.home.houseChoresDuration',
    parentId: 'ncdRiskFactor',
  },

  // -Travel Section
  {
    label:
      'Do you walk or use a bicycle (pedal cycle) to get to and from places?',
    key: 'ncdRiskFactor.travel.walkOrBicycle',
    parentId: 'ncdRiskFactor',
  },
  {
    label:
      'In a typical week, on how many days do you walk or bicycle to get to and from places?',
    key: 'ncdRiskFactor.travel.walkOrBicycleDays',
    parentId: 'ncdRiskFactor',
  },
  {
    label:
      'How much time do you spend walking or bicycling for travel on a typical day?',
    key: 'ncdRiskFactor.travel.walkOrBicycleTime',
    parentId: 'ncdRiskFactor',
  },

  // -Recreational Activities
  {
    label:
      'Do you do any vigorous-intensity sports, fitness, or recreational (leisure) activities that cause large increases in breathing or heart rate like running or football?',
    key: 'ncdRiskFactor.activities.vigorousSports',
    parentId: 'ncdRiskFactor',
  },
  {
    label:
      'In a typical week, on how many days do you do vigorous-intensity sports, fitness, or recreational (leisure) activities?',
    key: 'ncdRiskFactor.activities.vigorousSportsDays',
    parentId: 'ncdRiskFactor',
  },
  {
    label:
      'How much time do you spend doing vigorous-intensity sports, fitness, or recreational activities on a typical day?',
    key: 'ncdRiskFactor.activities.vigorousSportsTime',
    parentId: 'ncdRiskFactor',
  },

  //- Sedentary Behavior
  {
    label:
      'How much time do you usually spend sitting or reclining on a typical day?',
    key: 'ncdRiskFactor.sittingTime',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'What time do you go to bed at night?',
    key: 'ncdRiskFactor.timeYouSleep',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'What time do you wake up in the morning?',
    key: 'ncdRiskFactor.timeYouWake',
    parentId: 'ncdRiskFactor',
  },

  //- Smoking Section
  {
    label:
      'Do you currently smoke any tobacco products, such as cigarettes, cigars, or pipes?',
    key: 'ncdRiskFactor.currentlySmokingTobacco',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'How old were you when you first started smoking?',
    key: 'ncdRiskFactor.smoking.ageStarted',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'During the past 12 months, have you tried to stop smoking?',
    key: 'ncdRiskFactor.smoking.triedToStop',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'Do you currently smoke tobacco products every day?',
    key: 'ncdRiskFactor.smoking.currentlySmoking',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'In the past, did you ever smoke any tobacco products?',
    key: 'ncdRiskFactor.smoking.pastTobaccoUse',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'In the past, did you ever smoke daily?',
    key: 'ncdRiskFactor.smoking.pastDailySmoking',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'During the past 30 days, did someone smoke inside your home?',
    key: 'ncdRiskFactor.smoking.insideHome',
    parentId: 'ncdRiskFactor',
  },
  {
    label:
      'During the past 30 days, did someone smoke in closed areas in your workplace?',
    key: 'ncdRiskFactor.smoking.workplace',
    parentId: 'ncdRiskFactor',
  },
  {
    label:
      'Do you currently use any smokeless tobacco products such as snuff, chewing tobacco, betel?',
    key: 'ncdRiskFactor.smoking.smokelessTobacco',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'Do you currently use smokeless tobacco products daily?',
    key: 'ncdRiskFactor.smoking.dailySmokelessTobacco',
    parentId: 'ncdRiskFactor',
  },

  //- Alcohol Section
  {
    label:
      "Have you ever consumed any alcohol such as beer, wine, spirits, sachet alcohol, bitters, etc even if it's a few sips?",
    key: 'ncdRiskFactor.alcohol.everConsumed',
    parentId: 'ncdRiskFactor',
  },
  {
    label:
      "Have you consumed any alcohol within the past 12 months even if it's a few sips?",
    key: 'ncdRiskFactor.alcohol.consumedPast12Months',
    parentId: 'ncdRiskFactor',
  },
  {
    label:
      'During the past 30 days, how many times have you had at least one standard alcoholic drink?',
    key: 'ncdRiskFactor.alcohol.past30DaysFrequency',
    parentId: 'ncdRiskFactor',
  },
  {
    label:
      'During the past 7 days, did you consume any homebrewed alcohol, ogogoro, palm wine, or any alcohol not intended for drinking?',
    key: 'ncdRiskFactor.alcohol.past7DaysHomebrewed',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'Homebrewed spirits consumption',
    key: 'ncdRiskFactor.alcohol.drinks.homebrewedSpirits',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'Homebrewed beer or wine consumption',
    key: 'ncdRiskFactor.alcohol.drinks.homebrewedBeerWine',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'Non-drinkable alcohol consumption',
    key: 'ncdRiskFactor.alcohol.drinks.nonDrinkableAlcohol',
    parentId: 'ncdRiskFactor',
  },
  {
    label: 'Unknown alcohol consumption',
    key: 'ncdRiskFactor.alcohol.drinks.unknown',
    parentId: 'ncdRiskFactor',
  },

  // Physical Activities

  {
    label:
      'How much physical activity should a person do everyday to be healthy?',
    key: 'physicalActivity.amountOfPhysicalActivityDaily',
    parentId: 'physicalActivity',
  },
  {
    label:
      "How important do you think physical exercise is for your child's health?",
    key: 'physicalActivity.importanceOfChildPhysicalExerciseOnHealth',
    parentId: 'physicalActivity',
  },
  {
    label: 'Do you think your child gets enough physical exercise?',
    key: 'physicalActivity.childGetsEnoughExercise',
    parentId: 'physicalActivity',
  },
  {
    label:
      'How important do you think physical exercise is for your own health?',
    key: 'physicalActivity.importancePhysicalExerciseOnYourHealth',
    parentId: 'physicalActivity',
  },
  {
    label:
      'What is the long-term effect of performing physical activity regularly?',
    key: 'physicalActivity.longTermEffectOfPerformingPhysicalActivityRegularly',
    parentId: 'physicalActivity',
  },
  {
    label: 'What kinds of activities are good forms of exercise?',
    key: 'physicalActivity.goodFormsOfExercise',
    parentId: 'physicalActivity',
  },
  {
    label: 'What types of house chores do you regularly do at home?',
    key: 'physicalActivity.typesOfHouseChoresRegularly',
    parentId: 'physicalActivity',
  },
  {
    label: 'Should boys and girls do the same types of sports and activities?',
    key: 'physicalActivity.shouldBoysGirlsDoSameSports',
    parentId: 'physicalActivity',
  },
  {
    label:
      'What are some challenges that you think prevent children your age from being physically active?',
    key: 'physicalActivity.challengesFromBeingPhysicallyActive',
    parentId: 'physicalActivity',
  },
  {
    label: 'Is it important for both boys and girls to be physically active?',
    key: 'physicalActivity.importanceOfBeingPhysicallyActive',
    parentId: 'physicalActivity',
  },
  {
    label:
      'Which types of physical activities do you think are most suitable for boys?',
    key: 'physicalActivity.suitableActivitiesForBoys',
    parentId: 'physicalActivity',
  },
  {
    label:
      'Which types of physical activities do you think are most suitable for girls?',
    key: 'physicalActivity.suitableActivitiesForGirls',
    parentId: 'physicalActivity',
  },
  {
    label:
      'Do you think the amount of physical activity needed is different for men and women?',
    key: 'physicalActivity.amountOfPhysicalActivityNeededIsDifferentForBoth',
    parentId: 'physicalActivity',
  },
  {
    label:
      'What common beliefs or practices in your community discourage girls from engaging in physical activities?',
    key: 'physicalActivity.beliefsThatDiscourageGirlFromPhysical',
    parentId: 'physicalActivity',
  },
  {
    label:
      'In your community, do you think girls have more, less, or the same amount of time for physical activities compared to boys?',
    key: 'physicalActivity.amountOfTimeGirlsHaveForPhysicalThanBoys',
    parentId: 'physicalActivity',
  },
  {
    label: 'Why do you think so?',
    key: 'physicalActivity.whyAmountOfTimeGirlsHaveForPhysicalThanBoys',
    parentId: 'physicalActivity',
  },
  {
    label:
      'In your community, do you think girls have more, less, or the same opportunities for physical activities compared to boys?',
    key: 'physicalActivity.amountOfOpportunitiesGirlsHaveForPhysicalThanBoys',
    parentId: 'physicalActivity',
  },
  {
    label: 'Why do you think so?',
    key: 'physicalActivity.whyAmountOfOpportunitiesGirlsHaveForPhysicalThanBoys',
    parentId: 'physicalActivity',
  },
  // Health Hygiene
  {
    label: 'Water Sources',
    key: 'healthHygiene.sourcesOfWaterAtHome',
    parentId: 'healthHygiene',
  },
  {
    label: 'Water Treatment Methods',
    key: 'healthHygiene.waterTreatmentMethodAtHome',
    parentId: 'healthHygiene',
  },
  {
    label: 'Hand Washing After Toilet',
    key: 'healthHygiene.didYouCleanHandAfterLastToiletUsage',
    parentId: 'healthHygiene',
  },
  {
    label: 'Hand Washing Facility',
    key: 'healthHygiene.facilityUsedToWashHand',
    parentId: 'healthHygiene',
  },
  {
    label: 'Toilet Facility',
    key: 'healthHygiene.toiletFacility',
    parentId: 'healthHygiene',
  },
  {
    label: 'What Was Used to Wash Hand',
    key: 'healthHygiene.whatWasUsedToWashHand',
    parentId: 'healthHygiene',
  },
]

export const excelHeaders = csvHeaders.map((header) => ({
  header: header.label,
  parentId: header.parentId,
  key: header.key,
  width: 30, // Default width, adjust as needed for specific columns
}))
