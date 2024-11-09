import { errorMessage } from './errorMessage'
import baseAxios from './baseAxios'
import { API } from './api'

const uploadImage = async (imageString: File, throwError = false) => {
  if (!throwError) {
    try {
      const formData = new FormData()
      formData.append('file', imageString)
      const response = await baseAxios.post(API.upload, formData)
      return response.data as {
        key: string
        url: string
      }
    } catch (error) {
      return errorMessage(error)
    }
  }
  
  const formData = new FormData()
  formData.append('file', imageString)
  const response = await baseAxios.post(API.upload, formData)
  return response.data as {
    key: string
    url: string
  }
}

export default uploadImage
