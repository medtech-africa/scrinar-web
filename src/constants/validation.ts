/* eslint-disable import/no-unused-modules */
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

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
    dob: yup
      .string()
      .required('Please enter date of birth')
      .typeError('Please enter date of birth'),
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
    parentMobile: yup
      .string()
      .required('Parent phone number is required')
      .typeError('Please enter a number')
      .matches(
        /^([0]{1}|\+?234)([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/,
        'Enter a valid phone number'
      ),
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
    phoneNumber: yup
      .string()
      .typeError('Please enter a number')
      .matches(
        /^([0]{1}|\+?234)([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/,
        'Enter a valid phone number'
      ),
    email: yup.string().typeError('Please enter email address').email(),
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
    website: yup
      .string()
      .typeError('Please enter website')
      .matches(
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        'Enter a valid web address'
      )
      .required('Enter a valid web address')
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
const nutritional = yupResolver(
  yup.object().shape({
    schoolTransportQuestion: yup
      .object()
      .shape({ label: yup.string().required(), value: yup.string().required() })
      .required('Please fill this field')
      .typeError('Please fill this field'),
    sportQuestion: yup
      .object()
      .shape({ label: yup.string().required(), value: yup.string().required() })
      .required('Please fill this field')
      .typeError('Please fill this field'),
    hoursOnSleep: yup
      .number()
      .typeError('Please fill this field')
      .required('Please fill this field')
      .min(0, 'Number must be at least 0')
      .max(27, 'Number must not exceed 27'),
    hoursOnTv: yup
      .number()
      .required('Please fill this field')
      .typeError('Please fill this field')
      .min(0, 'Number must be at least 0')
      .max(27, 'Number must not exceed 27'),
    hoursOnComputer: yup
      .number()
      .required('Please fill this field')
      .typeError('Please fill this field')
      .min(0, 'Number must be at least 0')
      .max(27, 'Number must not exceed 27'),
    schoolTransportQuestionAlt: yup
      .string()
      .typeError('Please fill this field'),
  })
)
const exercise = yupResolver(
  yup.object().shape({
    foodAmount: yup
      .object()
      .shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
      .required('Food amount is required'),
    mealsPerDay: yup.number().required('Number of meals is required'),
    dietary: yup.string(),
    fruitsTimes: yup.object().shape({
      vegetable: yup.number().required('Food amount is required'),
      meat: yup.number().required('Food amount is required'),
      fruits: yup.number().required('Food amount is required'),
      egg: yup.number().required('Food amount is required'),
      carbonhydrates: yup.number().required('Food amount is required'),
      sweets: yup.number().required('Food amount is required'),
      pastries: yup.number().required('Food amount is required'),
      sugar: yup.number().required('Food amount is required'),
      friedFood: yup.number().required('Food amount is required'),
      fish: yup.number().required('Food amount is required'),
    }),
  })
)

// const updateHealhData = yup.object().shape({
//   studentName: yup.string(),
//   level: yup.string(),
//   age: yup.object().shape({
//     label: yup.string().required(),
//     value: yup.string().required(),
//   }),
//   dob: yup.string(),
//   nutritionalHealth: yup.string(),
//   exerciseHabit: yup.string(),
//   glucoseLevel: yup.string(),
//   gender: yup
//     .object()
//     .shape({ label: yup.string().required(), value: yup.string().required() }),
//   parentMobile: yup.string(),
//   familyHistory: yup.string(),
//   avatar: yup.boolean(),
// })

const validation = {
  createPatient,
  createInstructor,
  login,
  updatePasswordSchema,
  register,
  nutritional,
  exercise,
  // updateHealhData,
}

export default validation
