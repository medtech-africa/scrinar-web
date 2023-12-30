// First we need to import axios.js
import axios, { AxiosError, AxiosHeaders } from 'axios'

import { cookies } from 'next/headers'

const handleError = (error: AxiosError) => {
  if (error.response) {
    return error.response.data
  }
  return error
}

const baseServerAxios = axios.create({})

// baseAxios.defaults.headers.common.Authorization = 'AUTH TOKEN FROM baseAxios';

baseServerAxios.interceptors.request.use(
  async (config) => {
    if (!config.headers?.Authorization) {
      const cookiesStore = cookies()
      const credentials = cookiesStore.get('token')
      if (credentials) {
        // config.headers = {
        //   ...config.headers,
        //   Authorization: `Bearer ${credentials}`,
        // };
        if (!config.headers) {
          config.headers = {} as AxiosHeaders
        }
        config.headers.Authorization = `Bearer ${credentials.value}`
      }
    }

    return config
  },
  (error) => Promise.reject(handleError(error))
)

baseServerAxios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error?.response?.status === 401) {
      // Handle 401 error
      // redirectToLoginAndDeleteToken()
    }

    return Promise.reject(handleError(error))
  }
)

// function redirectToLoginAndDeleteToken() {
//   const cookiesStore = cookies()
//   cookiesStore.delete('token') // Delete the token from cookies
//   window.location.href = '/login' // Redirect to the login page
// }

export default baseServerAxios
