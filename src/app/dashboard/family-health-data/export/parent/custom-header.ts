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

  // Nutrition Knowledge
  { label: 'Balanced Diet Knowledge', key: 'nutrition.balancedDiet' },
  { label: 'Sugar Effects Knowledge', key: 'nutrition.sugarEffects' },
  { label: 'Salt Fat Risks Knowledge', key: 'nutrition.saltFatRisks' },
  { label: 'Boys Food Knowledge', key: 'nutrition.boysFood' },
  { label: 'Girls Food Knowledge', key: 'nutrition.girlsFood' },
  { label: 'NCD Knowledge', key: 'nutrition.doYouKnowNCD' },
  {
    label: 'High Blood Pressure Knowledge',
    key: 'nutrition.doYouKnowHighBloodPressure',
  },
  { label: 'Diabetes Knowledge', key: 'nutrition.doYouKnowDiabetes' },
  { label: 'Obesity Knowledge', key: 'nutrition.doYouKnowObesity' },
  { label: 'NCD Prevention Knowledge', key: 'nutrition.howPreventGettingNcd' },
  { label: 'Family NCD History', key: 'nutrition.anyFamilyMemberWithNcd' },

  // Risky Behavior
  { label: 'Smoking Risks', key: 'riskyBehavior.smokingRisks' },
  { label: 'Secondhand Smoking', key: 'riskyBehavior.secondhandSmoking' },
  { label: 'Checkup Importance', key: 'riskyBehavior.checkupImportance' },
  { label: 'Stress Factors', key: 'riskyBehavior.stressFactors' },
  { label: 'Long Term Stress', key: 'riskyBehavior.longTermStress' },
  { label: 'Stress Signs', key: 'riskyBehavior.stressSigns' },
  { label: 'Other Stress Signs', key: 'riskyBehavior.otherStressSigns' },

  // Nutrition Practices
  {
    label: 'Fruits Vegetables Intake',
    key: 'nutritionPractices.fruitsVegetables',
  },
  { label: 'Snacks Intake', key: 'nutritionPractices.snacks' },
  {
    label: 'Sugary Beverages Intake',
    key: 'nutritionPractices.sugaryBeverages',
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

  // NCD Risk Factor
  {
    label: 'Vigorous Activity Duration',
    key: 'ncdRiskFactor.work.vigorousActivityTimeDuration',
  },
  { label: 'House Chores', key: 'ncdRiskFactor.home.houseChores' },
  {
    label: 'House Chores Duration',
    key: 'ncdRiskFactor.home.houseChoresDuration',
  },
  {
    label: 'Walk Bicycle Hours',
    key: 'ncdRiskFactor.travel.walkOrBicycleTime.hours',
  },
  {
    label: 'Walk Bicycle Minutes',
    key: 'ncdRiskFactor.travel.walkOrBicycleTime.minutes',
  },

  // // Physical Activity (placeholder since it's empty in the original schema)
  // { label: 'Physical Activity', key: 'physicalActivity' },

  // // Health Maintenance (placeholder since it's empty in the original schema)
  // { label: 'Health Maintenance', key: 'healthMaintenance' },

  // // NCD (placeholder since it's empty in the original schema)
  // { label: 'NCD', key: 'ncd' },

  // // Gender Household Role (placeholder since it's empty in the original schema)
  // { label: 'Gender Household Role', key: 'genderHouseholdRole' },
]

// Excel Headers with all fields
export const excelHeaders = [
  // Demographics
  { header: 'User Id', key: 'userId', width: 20 },
  { header: 'First Name', key: 'firstName', width: 20 },
  { header: 'Last Name', key: 'lastName', width: 20 },
  { header: 'Middle Name', key: 'middleName', width: 20 },
  { header: 'Age', key: 'age', width: 10 },
  { header: 'Gender', key: 'gender', width: 15 },
  { header: 'Mobile', key: 'mobile', width: 20 },
  { header: 'Family Code', key: 'familyCode', width: 20 },
  { header: 'Is Guardian', key: 'isGuardian', width: 15 },
  { header: 'Years In Community', key: 'yearsInCommunity', width: 20 },
  { header: 'Ethnicity', key: 'ethnicity', width: 20 },
  { header: 'Other Ethnicity', key: 'otherEthnicity', width: 20 },
  { header: 'Languages Spoken', key: 'languagesSpoken', width: 30 },
  { header: 'Other Language', key: 'otherLanguage', width: 20 },
  { header: 'Religion', key: 'religion', width: 20 },
  { header: 'Other Religion', key: 'otherReligion', width: 20 },
  { header: 'Education', key: 'education', width: 25 },
  { header: 'Work Status', key: 'workStatus', width: 20 },
  { header: 'Occupation', key: 'occupation', width: 25 },
  {
    header: 'Household Members Children',
    key: 'householdMembers.children',
    width: 25,
  },
  {
    header: 'Household Members Adults',
    key: 'householdMembers.adults',
    width: 25,
  },
  { header: 'Household Income', key: 'householdIncome', width: 20 },
  {
    header: 'Chronic Health Condition',
    key: 'chronicHealth.hasCondition',
    width: 25,
  },
  {
    header: 'Chronic Health Details',
    key: 'chronicHealth.condition',
    width: 30,
  },
  { header: 'Health Status', key: 'healthStatus', width: 20 },
  { header: 'Number of Children', key: 'noOfChildren', width: 20 },
  { header: 'Is Pregnant', key: 'isPregnant', width: 15 },
  { header: 'How Many Wives', key: 'howManyWives', width: 20 },

  // Nutrition Knowledge
  {
    header: 'Balanced Diet Knowledge',
    key: 'nutrition.balancedDiet',
    width: 25,
  },
  {
    header: 'Sugar Effects Knowledge',
    key: 'nutrition.sugarEffects',
    width: 25,
  },
  {
    header: 'Salt Fat Risks Knowledge',
    key: 'nutrition.saltFatRisks',
    width: 25,
  },
  { header: 'Boys Food Knowledge', key: 'nutrition.boysFood', width: 30 },
  { header: 'Girls Food Knowledge', key: 'nutrition.girlsFood', width: 30 },
  { header: 'NCD Knowledge', key: 'nutrition.doYouKnowNCD', width: 30 },
  {
    header: 'High Blood Pressure Knowledge',
    key: 'nutrition.doYouKnowHighBloodPressure',
    width: 30,
  },
  {
    header: 'Diabetes Knowledge',
    key: 'nutrition.doYouKnowDiabetes',
    width: 25,
  },
  { header: 'Obesity Knowledge', key: 'nutrition.doYouKnowObesity', width: 25 },
  {
    header: 'NCD Prevention Knowledge',
    key: 'nutrition.howPreventGettingNcd',
    width: 30,
  },
  {
    header: 'Family NCD History',
    key: 'nutrition.anyFamilyMemberWithNcd',
    width: 25,
  },

  // Risky Behavior
  { header: 'Smoking Risks', key: 'riskyBehavior.smokingRisks', width: 30 },
  {
    header: 'Secondhand Smoking',
    key: 'riskyBehavior.secondhandSmoking',
    width: 25,
  },
  {
    header: 'Checkup Importance',
    key: 'riskyBehavior.checkupImportance',
    width: 25,
  },
  { header: 'Stress Factors', key: 'riskyBehavior.stressFactors', width: 30 },
  {
    header: 'Long Term Stress',
    key: 'riskyBehavior.longTermStress',
    width: 30,
  },
  { header: 'Stress Signs', key: 'riskyBehavior.stressSigns', width: 30 },
  {
    header: 'Other Stress Signs',
    key: 'riskyBehavior.otherStressSigns',
    width: 25,
  },

  // Nutrition Practices
  {
    header: 'Fruits Vegetables Intake',
    key: 'nutritionPractices.fruitsVegetables',
    width: 25,
  },
  { header: 'Snacks Intake', key: 'nutritionPractices.snacks', width: 20 },
  {
    header: 'Sugary Beverages Intake',
    key: 'nutritionPractices.sugaryBeverages',
    width: 25,
  },

  // Ideal Body
  { header: 'Women Shape', key: 'idealBody.womenShape', width: 20 },
  { header: 'Women Weight', key: 'idealBody.womenWeight', width: 20 },
  {
    header: 'Adolescent Women Shape',
    key: 'idealBody.adolescentWomenShape',
    width: 25,
  },
  {
    header: 'Adolescent Women Weight',
    key: 'idealBody.adolescentWomenWeight',
    width: 25,
  },
  { header: 'Men Shape', key: 'idealBody.menShape', width: 20 },
  { header: 'Men Weight', key: 'idealBody.menWeight', width: 20 },
  {
    header: 'Adolescent Men Shape',
    key: 'idealBody.adolescentMenShape',
    width: 25,
  },
  {
    header: 'Adolescent Men Weight',
    key: 'idealBody.adolescentMenWeight',
    width: 25,
  },
  { header: 'Your Weight', key: 'idealBody.yourWeight', width: 20 },
  { header: 'Your Height', key: 'idealBody.yourHeight', width: 20 },
  {
    header: 'Is Your Height Healthy',
    key: 'idealBody.isYourHeightHealthy',
    width: 25,
  },

  // Health Hygiene
  {
    header: 'Water Sources',
    key: 'healthHygiene.sourcesOfWaterAtHome',
    width: 30,
  },
  {
    header: 'Water Treatment Methods',
    key: 'healthHygiene.waterTreatmentMethodAtHome',
    width: 30,
  },
  {
    header: 'Hand Washing After Toilet',
    key: 'healthHygiene.didYouCleanHandAfterLastToiletUsage',
    width: 30,
  },
  {
    header: 'Hand Washing Facility',
    key: 'healthHygiene.facilityUsedToWashHand',
    width: 25,
  },
  { header: 'Toilet Facility', key: 'healthHygiene.toiletFacility', width: 25 },

  // NCD Risk Factor
  {
    header: 'Vigorous Activity Duration',
    key: 'ncdRiskFactor.work.vigorousActivityTimeDuration',
    width: 30,
  },
  { header: 'House Chores', key: 'ncdRiskFactor.home.houseChores', width: 30 },
  {
    header: 'House Chores Duration',
    key: 'ncdRiskFactor.home.houseChoresDuration',
    width: 25,
  },
  {
    header: 'Walk Bicycle Hours',
    key: 'ncdRiskFactor.travel.walkOrBicycleTime.hours',
    width: 25,
  },
  {
    header: 'Walk Bicycle Minutes',
    key: 'ncdRiskFactor.travel.walkOrBicycleTime.minutes',
    width: 25,
  },

  // // Physical Activity (placeholder since it's empty in the original schema)
  // { header: 'Physical Activity', key: 'physicalActivity', width: 25 },

  // // Health Maintenance (placeholder since it's empty in the original schema)
  // { header: 'Health Maintenance', key: 'healthMaintenance', width: 25 },

  // // NCD (placeholder since it's empty in the original schema)
  // { header: 'NCD', key: 'ncd', width: 25 },

  // // Gender Household Role (placeholder since it's empty in the original schema)
  // { header: 'Gender Household Role', key: 'genderHouseholdRole', width: 25 },
]
