// First we need to import axios.js
import axios, { AxiosError, AxiosHeaders } from 'axios'
// import axiosRetry from 'axios-retry';
import { Cookies } from 'react-cookie'

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
      const cookies = new Cookies()
      const credentials = cookies.get('token')
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
  (error) => Promise.reject(handleError(error))
)

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
