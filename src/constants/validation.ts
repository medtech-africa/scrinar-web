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
    email: yup
      .string()
      .required('Please enter email address')
      .typeError('Please enter email address')
      .email(),
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
    middleName: yup
      .string()
      .required('Please enter last name')
      .typeError('Please enter last name')
      .lowercase(),
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
      .required('Phone number is required')
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

const validation = {
  createPatient,
  createInstructor,
  login,
}

export default validation
