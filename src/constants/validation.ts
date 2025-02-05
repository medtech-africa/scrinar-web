/* eslint-disable import/no-unused-modules */
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
const selectOption = yup
  .object()
  .shape({ label: yup.string().required(), value: yup.string().required() })
const createPatient = yupResolver(
  yup.object().shape({
    email: yup.string().optional().email(),
    firstName: yup
      .string()
      .required('Please enter first name')
      .typeError('Please enter first name')
      .lowercase(),
    lastName: yup
      .string()
      .required('Please enter last name')
      .typeError('Please enter last name')
      .lowercase(),
    // dob: yup
    //   .string()
    //   .required('Please enter date of birth')
    //   .typeError('Please enter date of birth'),
    age: yup
      .number()
      .required('Please enter age')
      .typeError('Please enter a valid age'),
    gender: yup
      .object()
      .shape({ label: yup.string().required(), value: yup.string().required() })
      .required('Please select a gender')
      .typeError('Please select a gender'),
    level: yup
      .object()
      .shape({ label: yup.string().required(), value: yup.string().required() })
      .required('Please select a level')
      .typeError('Please select a level'),
    password: yup.string(),
    parentMobile: yup.string().optional(),
    // .matches(
    //   /^([0]{1}|\+?234)([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/,
    //   'Enter a valid phone number'
    // ),
    parentMobileAlt: yup.string().optional(),
    familyCode: yup
      .string()
      .matches(
        /^[0-9]{1,5}$/,
        'Must not contain any special character or M or F or S (e.g 12 or 123)'
      )
      .optional(),
    avatar: yup.boolean(),
  })
)
const registerStudent = yupResolver(
  yup.object().shape({
    email: yup.string().optional().email(),
    firstName: yup
      .string()
      .required('Please enter first name')
      .typeError('Please enter first name')
      .lowercase(),
    lastName: yup
      .string()
      .required('Please enter last name')
      .typeError('Please enter last name')
      .lowercase(),
    // dob: yup
    //   .string()
    //   .required('Please enter date of birth')
    //   .typeError('Please enter date of birth'),
    age: yup
      .number()
      .required('Please enter age')
      .typeError('Please enter a valid age'),
    gender: yup
      .object()
      .shape({ label: yup.string().required(), value: yup.string().required() })
      .required('Please select a gender')
      .typeError('Please select a gender'),
    level: yup
      .object()
      .shape({ label: yup.string().required(), value: yup.string().required() })
      .required('Please select a level')
      .typeError('Please select a level'),
    school: yup
      .object()
      .shape({
        label: yup
          .object()
          .shape({
            name: yup.string().required(),
            address: yup.string().required(),
          })
          .required(),
        value: yup.string().required(),
      })
      .required('Please select a school')
      .typeError('Please select a school'),
    password: yup.string(),
    parentMobile: yup.string().optional(),
    parentMobileAlt: yup.string().optional(),
    avatar: yup.boolean(),
  })
)
const createInstructor = yupResolver(
  yup.object().shape({
    email: yup.string().typeError('Please enter email address').email(),
    firstName: yup
      .string()
      .required('Please enter first name')
      .typeError('Please enter first name')
      .lowercase(),
    lastName: yup
      .string()
      .required('Please enter last name')
      .typeError('Please enter last name')
      .lowercase(),
    middleName: yup.string().lowercase(),
    role: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .required('Please select a role')
      .typeError('Please select a role'),
    password: yup.string().optional(),
    gender: yup
      .object()
      .shape({ label: yup.string().required(), value: yup.string().required() })
      .required('Please select a gender')
      .typeError('Please select a gender'),
    dob: yup
      .string()
      .required('Please enter date of birth')
      .typeError('Please enter date of birth'),
    phoneNumber: yup
      .string()
      .typeError('Please enter a number')
      .matches(
        /^([0]{1}|\+?234)([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/,
        'Enter a valid phone number'
      ),
    avatar: yup.boolean(),
  })
)
const login = yupResolver(
  yup.object().shape({
    loginId: yup
      .string()
      .test('is-email-or-phone', 'Invalid email or phone number', (value) => {
        // Regular expression for a valid email address
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,40}$/

        // Regular expression for a valid phone number
        const phoneRegex = /^(?:\+234|0)[789]\d{9}$/
        if (value) {
          if (emailRegex.test(value)) {
            return true // It's a valid email
          } else if (phoneRegex.test(value)) {
            return true // It's a valid phone number
          } else {
            return false // It's invalid
          }
        }
      }),
    password: yup
      .string()
      .required('Password is required')
      .typeError('Please enter your password'),
  })
)

const createMasterLogin = yupResolver(
  yup.object().shape({
    email: yup
      .string()
      .required()
      .typeError('Please enter email address')
      .email(),
    name: yup.string().required().typeError('Please enter your name'),
    password: yup
      .string()
      .required('Password is required')
      .typeError('Please enter your password'),
  })
)

const updatePasswordSchema = yupResolver(
  yup.object().shape({
    currentPassword: yup
      .string()
      .required('Old password is required')
      .matches(
        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
        // 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
        /^(?=.{3,})/,
        'Must Contain 3 Characters'
      ),
    newPassword: yup
      .string()
      .required('New password is required')
      .matches(
        /^(?=.{3,})/,
        'Must Contain 3 Characters'
        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
        // "Must contain 8 characters, one uppercase, one lowercase, one number and one special case Character"
      ),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
      .required('Please confirm your Password'),
  })
)

const register = yupResolver(
  yup.object().shape({
    phoneNumber: yup
      .string()
      .typeError('Please enter a number')
      .trim()
      .matches(
        /^([0]{1}|\+?234)([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/,
        'Enter a valid phone number'
      ),

    email: yup.string().typeError('Please enter email address').email(),
    name: yup
      .string()
      .required('Please enter school name')
      .typeError('Please enter school name')
      .lowercase(),
    template: yup.string().optional(),
    website: yup
      .string()
      .typeError('Please enter website')
      .matches(
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        'Enter a valid web address'
      )
      .typeError('Enter a valid web address'),
    state: yup
      .object()
      .shape({ label: yup.string().required(), value: yup.string().required() })
      .required('Please select a state')
      .typeError('Please select a state'),
    lga: yup
      .object()
      .shape({ label: yup.string().required(), value: yup.string().required() })
      .required('Please select a lga')
      .typeError('Please select a lga'),

    address: yup
      .string()
      .required('Address is required')
      .typeError('Please enter an address'),
    zipCode: yup.string().typeError('Please enter a zipCode'),

    schoolType: yup
      .object()
      .shape({ label: yup.string().required(), value: yup.string().required() })
      .required('Please select a school type')
      .typeError('Please select a school type'),
    educationalInstitution: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
      )
      .required('Educational Institution is required')
      .min(1, 'Select at least one educational institution'),
  })
)

const organizationValidation = yupResolver(
  yup.object().shape({
    name: yup
      .string()
      .required('Please enter organization name')
      .typeError('Please enter organization name')
      .lowercase(),

    website: yup
      .string()
      .typeError('Enter a valid web address')
      .matches(
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        'Enter a valid web address'
      ),

    email: yup
      .string()
      .required('Please enter email address')
      .email('Please enter a valid email address')
      .typeError('Please enter email address'),

    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .typeError('Please enter a password'),

    state: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .required('Please select a state')
      .typeError('Please select a state'),

    lga: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .required('Please select a local government area')
      .typeError('Please select a local government area'),

    address: yup
      .string()
      .required('Address is required')
      .typeError('Please enter an address'),

    zipCode: yup.string().required('ZIP code is required'),

    type: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .required('Please select an organization type')
      .typeError('Please select an organization type'),
  })
)

const exercise = yupResolver(
  yup.object().shape({
    schoolTransportQuestion: yup
      .object()
      .shape({ label: yup.string(), value: yup.string() })
      .optional(),
    sportQuestion: yup
      .object()
      .shape({ label: yup.string(), value: yup.string() })
      .optional(),
    hoursOnSleep: yup
      .number()
      .min(0, 'Number must be at least 0')
      .max(27, 'Number must not exceed 27')
      .optional(),
    hoursOnTv: yup
      .number()
      .min(0, 'Number must be at least 0')
      .max(27, 'Number must not exceed 27')
      .optional(),
    hoursOnComputer: yup
      .number()
      .min(0, 'Number must be at least 0')
      .max(27, 'Number must not exceed 27')
      .optional(),
    schoolTransportQuestionAlt: yup.string(),
  })
)

const survey = yupResolver(
  yup.object().shape({
    gender: selectOption.required('Gender is required'),
    age: yup
      .number()
      .required('Age is required')
      .positive('Age must be a positive number')
      .integer('Age must be an integer')
      .min(10, 'Age must be at least 10'),
    birthday: yup.string().required('Birthday is required'),
    ethnicity: selectOption.required('Ethnicity is required'),
    ethnicityOther: yup.string().when('ethnicity', {
      is: 'Other',
      then: yup.string().required('Please specify your ethnicity'),
    } as any),
    religion: selectOption.required('Religion is required'),
    religionOther: yup.string().when('religion', {
      is: 'Other',
      then: yup.string().required('Please specify your religion'),
    } as any),
    classLevel: selectOption.required('Class level is required'),
    distanceToSchool: selectOption.required('Distance to school is required'),
    communityName: yup.string().required('Community name is required'),
    yearsAtSchool: selectOption.required('Years at school is required'),
    numberOfChildren: yup
      .number()
      .required('Number of children is required')
      .positive('Number of children must be positive')
      .integer('Must be an integer'),
    siblingPosition: selectOption.required('Sibling position is required'),
    fatherOccupation: yup.string().required('Father’s occupation is required'),
    motherOccupation: yup.string().required('Mother’s occupation is required'),
    livingSituation: selectOption.required('Living situation is required'),
    healthProblems: selectOption.required('Health problems is required'),
    healthProblemsOther: yup.string().when('healthProblems', {
      is: 'Yes',
      then: yup.string().required('Please specify your health problems'),
    } as any),
    healthStatus: selectOption.required('Health status is required'),
    hpvVaccine: selectOption.required('HPV Vaccine is required'),
    // .nullable(true as any)
    // .oneOf(['Yes', 'No'], 'Please select Yes or No'),

    // Section B: KAP Survey Validation
    healthCheckupsImportance: selectOption.required(
      'Please select why health check-ups are important'
    ),
    smokingDrinkingEffects: yup
      .string()
      .required(
        'Please select an option for the effects of smoking and drinking'
      ),
    feelingsOfstress: selectOption.required(
      'Please select the effects of long-term stress'
    ),

    stressSigns: selectOption.required(
      'Please select which feelings can be a sign of stress'
    ),
    balancedDiet: selectOption.required('Balanced diet is required'),
    physicalActivity: selectOption.required('Physical activity is required'),
    stressEffects: yup.string().required('Stress effect is required'),
    bodySizeBoys: yup.string().required('Body size for boys is required'),
    bodySizeGirls: yup.string().required('Body size for girls is required'),
    physicalActivityFrequency: yup
      .string()
      .required('Physical activity frequency is required'),
    doctorVisits: yup.string().required('Doctor visits frequency is required'),
    dietConsequenceSpecify: yup
      .string()
      .required('Please specify the consequence of not eating a balanced diet'),
    sweetsEffectSpecify: yup
      .string()
      .required('Please specify why eating too many sweets is bad'),
    saltyFoodEffectSpecify: yup
      .string()
      .required(
        'Please specify what happens if you eat too much salty or oily food'
      ),
    smokingDrinkingEffectsSpecify: yup
      .string()
      .required(
        'Please specify what happens if you smoke or drink alcohol regularly'
      ),
    healthCheckupsImportanceSpecify: yup
      .string()
      .required('Please specify the importance of regular health checkups'),
    feelingsOfstressSpecify: yup
      .string()
      .required('Please specify the causes of stress'),
    activityBenefitsSpecify: yup
      .string()
      .required('Please specify the benefits of regular physical activity'),
    stressSignsSpecify: yup
      .string()
      .required('Please specify the signs of stress'),

    dietConsequence: selectOption.required(
      'Please select a consequence of not eating a balanced diet'
    ),

    carbExamples: yup
      .array()
      .min(1, 'Please provide at least one example of carbohydrates')
      .required('Please provide examples of carbohydrates'),

    proteinExamples: yup
      .array()
      .min(1, 'Please provide at least one example of proteins')
      .required('Please provide examples of proteins'),

    fatExamples: yup
      .array()
      .min(1, 'Please provide at least one example of fats and oils')
      .required('Please provide examples of fats and oils'),

    vitaminExamples: yup
      .array()
      .min(1, 'Please provide at least one example of vitamins and minerals')
      .required('Please provide examples of vitamins and minerals'),

    sweetsEffect: selectOption.required(
      'Please select why eating too many sweets is bad'
    ),

    saltyFoodEffect: selectOption.required(
      'Please select what happens if you eat too much salty or oily food'
    ),

    activityBenefits: selectOption.required(
      'Please select the benefits of regular physical activity'
    ),

    exerciseActivities: yup
      .array()
      .min(1, 'Please select at least one activity that is good for exercise')
      .required('Please select activities that are good for exercise'),

    stressCauses: yup
      .array()
      .min(1, 'Please select at least one cause of stress')
      .required('This field is required'),

    balancedDietImportance: selectOption.required(
      'Please select the importance of balanced diet'
    ),
    eatingHealthyFoods: selectOption.required(
      'Please select the importance of eating healthy foods'
    ),
    snackPreference: selectOption.required(
      'Please select the preference for snacks'
    ),
    idealBodySizeBoys: selectOption.required(
      'Please select the ideal body size for boys'
    ),
    idealBodySizeBoysSpecify: yup
      .string()
      .required('Please specify the ideal body size for boys'),
    idealBodySizeGirls: selectOption.required(
      'Please select the ideal body size for girls'
    ),
    idealBodySizeGirlsSpecify: yup
      .string()
      .required('Please specify the ideal body size for girls'),
    regularPhysicalActivity: selectOption.required(
      'Please select the importance of regular physical activity'
    ),
    barriersToPhysicalActivity: yup
      .array()
      .min(1, 'Please select at least one barrier to regular physical activity')
      .required(
        'Please select at least one barrier to regular physical activity'
      ),
    importanceOfPhysicalActivity: selectOption.required(
      'Please select the importance of regular physical activity'
    ),
    suitableActivitiesBoys: yup
      .string()
      .required('Please select suitable activities for boys'),
    suitableActivitiesGirls: yup
      .string()
      .required('Please select suitable activities for girls'),
    // Diet Questions
    fruitsVegetables: selectOption.required(
      'Please select how often you eat fruits and vegetables'
    ),
    snacksConsumption: selectOption.required(
      'Please select how often you consume snacks like buns, doughnuts, etc.'
    ),
    sugaryBeverages: selectOption.required(
      'Please select how often you drink sugary beverages or eat sugary snacks'
    ),

    // Physical Activity Questions
    physicalActivityDuration: selectOption.required(
      'Please select how long you usually engage in physical activity'
    ),
    physicalActivityTypes: yup
      .array()
      .min(1, 'Please select at least one physical activity you enjoy')
      .required('Please select at least one physical activity you enjoy'),
    houseChoresFrequency: selectOption.required(
      'Please select how often you participate in house chores that require physical effort'
    ),
    houseChoresTypes: yup
      .array()
      .min(
        1,
        'Please select at least one house chore that involves physical activity'
      )
      .required(
        'Please select at least one house chore that involves physical activity'
      ),
    outsidePhysicalActivitiesFrequency: selectOption.required(
      'Please select how often you perform physical activities outside of house chores'
    ),
    mobileGamesHours: yup
      .string()
      .required('Please enter the average hours spent on mobile games daily'),
    tvGamesHours: yup
      .string()
      .required(
        'Please enter the average hours spent watching TV or playing video games daily'
      ),
    bedtime: yup.string().required('Please enter your bedtime'),
    wakeupTime: yup.string().required('Please enter your wake-up time'),

    // Risky Behavior and Stress Questions
    doctorVisitsFrequency: selectOption.required(
      'Please select how often you visit the doctor for health check-ups'
    ),
    copingMechanisms: yup
      .array()
      .min(
        1,
        'Please select at least one method that helps you feel better when worried or upset'
      )
      .required(
        'Please select at least one method that helps you feel better when worried or upset'
      ),
    stressFactors: yup
      .array()
      .min(1, 'Please select at least one thing that makes you feel stressed')
      .required(
        'Please select at least one thing that makes you feel stressed'
      ),
    smokingHistory: selectOption.required(
      'Please select if you have ever smoked in any form'
    ),
    currentSmoking: selectOption.required(
      'Please select if you currently smoke'
    ),
    alcoholHistory: selectOption.required(
      'Please select if you have ever taken alcohol'
    ),
    currentAlcohol: selectOption.required(
      'Please select if you currently take alcohol'
    ),

    // '24hourRecall': yup.array().min(1, 'You must recall at least one meal'),
  })
)
const nutritional = yupResolver(
  yup.object().shape({
    foodAmount: yup
      .object()
      .shape({
        label: yup.string(),
        value: yup.string(),
      })
      .optional(),
    mealsPerDay: yup.number(),
    dietary: yup.string(),
    fruitsTimes: yup
      .object()
      .shape({
        vegetable: yup.number(),
        meat: yup.number(),
        fruits: yup.number(),
        egg: yup.number(),
        carbohydrates: yup.number(),
        sweets: yup.number(),
        pastries: yup.number(),
        sugar: yup.number(),
        friedFood: yup.number(),
        fish: yup.number(),
      })
      .optional(),
  })
)

const createScreening = yupResolver(
  yup.object().shape({
    title: yup.string().required('Please enter a title'),
    location: yup.string().required('Please enter a location'),
    type: yup
      .object()
      .shape({ label: yup.string().required(), value: yup.string().required() })
      .required('Please select an assessment type'),
    status: yup
      .object()
      .shape({ label: yup.string().required(), value: yup.string().required() })
      .required('Please select an assessment status'),
    date: yup
      .string()
      .required('Please pick a date')
      .typeError('Please pick a date'),
    time: yup
      .string()
      .required('Please pick a time')
      .typeError('Please pick a date'),
    note: yup.string().optional(),
  })
)

const createParent = yupResolver(
  yup.object().shape({
    email: yup.string().optional().email(),
    firstName: yup
      .string()
      .required('Please enter first name')
      .typeError('Please enter first name')
      .lowercase(),
    lastName: yup
      .string()
      .required('Please enter last name')
      .typeError('Please enter last name')
      .lowercase(),
    gender: yup
      .object()
      .shape({ label: yup.string().required(), value: yup.string().required() })
      .required('Please select a gender')
      .typeError('Please select a gender'),
    mobile: yup.string().optional(),
    familyCode: yup
      .string()
      .matches(
        /^[0-9]{1,5}$/,
        'Must not contain any special character or M or F or S (e.g 12 or 123)'
      )
      .optional(),
    avatar: yup.boolean(),
    isGuardian: yup.boolean(),
  })
)

const validation = {
  createPatient,
  createInstructor,
  login,
  createMasterLogin,
  updatePasswordSchema,
  register,
  organizationValidation,
  nutritional,
  exercise,
  survey,
  createScreening,
  registerStudent,
  createParent,
}

export default validation
