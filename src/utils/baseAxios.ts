// First we need to import axios.js
import axios, { AxiosError, AxiosHeaders } from 'axios'
// import axiosRetry from 'axios-retry';
import { getCookie, deleteCookie } from 'cookies-next'
import toast from 'react-hot-toast'

const handleError = (error: AxiosError) => {
  if (error.response) {
    return error.response.data
  }
  return error
}

const baseAxios = axios.create({})

// baseAxios.defaults.headers.common.Authorization = 'AUTH TOKEN FROM baseAxios';

baseAxios.interceptors.request.use(
  async (config) => {
    if (!config.headers?.Authorization) {
      const credentials = getCookie('token')
      if (credentials) {
        // config.headers = {
        //   ...config.headers,
        //   Authorization: `Bearer ${credentials}`,
        // };
        if (!config.headers) {
          config.headers = {} as AxiosHeaders
        }
        config.headers.Authorization = `Bearer ${credentials}`
      }
    }

    return config
  },
  (error) => Promise.reject(handleError(error))
)

baseAxios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error?.response?.status === 401) {
      // Handle 401 error
      redirectToLoginAndDeleteToken()
    }

    return Promise.reject(handleError(error))
  }
)

function redirectToLoginAndDeleteToken() {
  toast.error('Token expired! Please login')
  deleteCookie('token') // Delete the token from cookies
  window.location.href = '/login' // Redirect to the login page
}

// https://github.com/softonic/axios-retry/issues/87
// const retryDelay = (retryNumber = 0) => {
//   const seconds = Math.pow(2, retryNumber) * 1000;
//   const randomMs = 1000 * Math.random();
//   return seconds + randomMs;
// };

// axiosRetry(axios, {
//   retries: 2,
//   retryDelay,
//   // retry on Network Error & 5xx responses
//   retryCondition: axiosRetry.isRetryableError,
// });

export default baseAxios
