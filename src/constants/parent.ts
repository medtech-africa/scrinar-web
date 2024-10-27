const communityYears = [
  { value: 'less1', label: 'Less than 1 year' },
  { value: '1-5', label: '1-5 years' },
  { value: '6-10', label: '6-10 years' },
  { value: 'more10', label: 'More than 10 years' },
]

const ethnicities = [
  { label: 'Hausa', value: 'hausa' },
  { label: 'Igbo', value: 'igbo' },
  { label: 'Yoruba', value: 'yoruba' },
  { label: 'Tiv', value: 'tiv' },
  { label: 'Gbayi', value: 'gbayi' },
  { label: 'Fulani', value: 'fulani' },
  { label: 'Other', value: 'other' },
]

const languages = [
  { label: 'English', value: 'english' },
  { label: 'Hausa', value: 'hausa' },
  { label: 'Igbo', value: 'igbo' },
  { label: 'Yoruba', value: 'yoruba' },
  { label: 'Tiv', value: 'tiv' },
  { label: 'Gbayi', value: 'gbayi' },
  { label: 'Fulani', value: 'fulani' },
  { label: 'Other', value: 'other' },
]

const religions = [
  { label: 'Muslim', value: 'muslim' },
  { label: 'Christian', value: 'christian' },
  { label: 'Traditionalist', value: 'traditionalist' },
  { label: 'Other', value: 'other' },
]

const educations = [
  { label: 'No formal education', value: 'none' },
  { label: 'Primary School', value: 'primary' },
  { label: 'Secondary School', value: 'secondary' },
  { label: 'Tertiary education', value: 'tertiary' },
]

const workStatuses = [
  { label: 'Employed', value: 'employed' },
  { label: 'Self-employed', value: 'self-employed' },
  { label: 'Unemployed', value: 'unemployed' },
  { label: 'Retired', value: 'retired' },
]

const householdIncomeRange = [
  { label: 'Less than ₦100,000', value: 'less100' },
  { label: '₦100,000-₦500,000', value: '100k-499k' },
  { label: '₦500,001-₦1,000,000', value: '500k-1m' },
  { label: 'Above ₦1,000,000', value: 'above1m' },
]

const defaultOptions = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
]

const questionnaireOptions = [
  { label: 'Very Good', value: 'very-good' },
  { label: 'Good', value: 'good' },
  { label: 'Fair', value: 'fair' },
  { label: 'Poor', value: 'poor' },
]

//Section B

const balancedDietOptions = [
  {
    value: 'variety',
    label: 'A diet with a variety of foods from all food groups',
  },
  { value: 'carbs', label: 'A diet with mostly carbohydrates' },
  { value: 'protein', label: 'A diet with mainly meat and proteins' },
  { value: 'vegetables', label: 'A diet with fruit and vegetables only' },
  { value: 'unknown', label: "I don't know" },
]

const sugarEffectsOptions = [
  { value: 'weight-decay', label: 'It can cause weight gain and tooth decay' },
  { value: 'no-effect', label: "It doesn't affect health much" },
  { value: 'energetic', label: 'It can make children too energetic' },
  { value: 'unknown', label: "I don't know" },
]

const saltFatRisksOptions = [
  {
    value: 'health-issues',
    label: 'They can lead to high blood pressure and heart problems',
  },
  {
    value: 'no-effect',
    label: "They don't have significant effects on health",
  },
  { value: 'adults-only', label: 'They only affect adults, not children' },
]

const foodOptions = [
  { value: 'fruits-vegetables', label: 'Fruits and vegetables' },
  { value: 'meat-fish', label: 'Meat or fish' },
  { value: 'grains', label: 'Grains (e.g., rice, bread)' },
  { value: 'sugary', label: 'Sugary snacks or drinks' },
  { value: 'unknown', label: "I don't know" },
]

const physicalActivityImportanceOptions = [
  { value: 'strong-muscles', label: 'To build strong muscles and bones' },
  { value: 'not-necessary', label: "It's not really necessary for children" },
  { value: 'sports-only', label: 'Only for those who want to play sports' },
  { value: 'unknown', label: "I don't know" },
]

const activityDurationOptions = [
  { value: 'less30', label: 'Less than 30 minutes' },
  { value: '30-60', label: '30-60 minutes' },
  { value: 'more60', label: 'More than 60 minutes' },
  { value: 'unknown', label: "I don't know" },
]

const suitableActivitiesOptions = [
  { value: 'sports', label: 'Running and playing sports' },
  { value: 'water', label: 'Fetching water' },
  { value: 'reading', label: 'Reading a book' },
  { value: 'tv', label: 'Watching TV' },
]

const smokingRisksOptions = [
  {
    value: 'heart-lung',
    label: 'Increased risk of heart disease and lung problems',
  },
  { value: 'moderate-ok', label: 'No risk to health if taken in moderation' },
  { value: 'no-effect', label: "They don't affect health" },
  { value: 'unknown', label: "I don't know" },
]

const secondhandSmokingOptions = [
  { value: 'harmful', label: 'It can harm their lungs and overall health' },
  { value: 'adults-only', label: 'Nothing, it only affects adults' },
  { value: 'unsure', label: "I'm not sure" },
]

const checkupImportanceOptions = [
  {
    value: 'early-detection',
    label: 'To make sure they are healthy and catch problems early',
  },
  { value: 'when-sick', label: 'It is not important if they are not sick' },
  { value: 'unknown', label: "I don't know" },
]

const stressFactorsOptions = [
  { value: 'healthy-food', label: 'Eating healthy food' },
  { value: 'homework', label: 'Too much homework or tests' },
  { value: 'friends', label: 'Playing with friends' },
  { value: 'cartoons', label: 'Watching cartoons' },
  { value: 'unknown', label: "I don't know" },
]

const longTermStressOptions = [
  { value: 'sick-tired', label: 'It can make them feel sick and tired' },
  { value: 'stronger', label: 'It makes them stronger' },
  { value: 'focus', label: 'It helps them focus better' },
]

const stressSignsOptions = [
  { value: 'happiness', label: 'Happiness' },
  { value: 'excitement', label: 'Excitement' },
  { value: 'anger-sadness', label: 'Anger or sadness' },
  { value: 'relaxation', label: 'Relaxation' },
  { value: 'other', label: 'Other' },
]

export {
  communityYears,
  ethnicities,
  languages,
  religions,
  educations,
  workStatuses,
  householdIncomeRange,
  defaultOptions,
  questionnaireOptions,
  //section B
  balancedDietOptions,
  suitableActivitiesOptions,
  activityDurationOptions,
  physicalActivityImportanceOptions,
  foodOptions,
  saltFatRisksOptions,
  sugarEffectsOptions,
  stressSignsOptions,
  longTermStressOptions,
  stressFactorsOptions,
  checkupImportanceOptions,
  secondhandSmokingOptions,
  smokingRisksOptions,
}
