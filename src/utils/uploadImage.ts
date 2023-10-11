import { errorMessage } from './errorMessage'
import baseAxios from './baseAxios'
import { API } from './api'

const uploadImage = async (imageString: File) => {
  try {
    const formData = new FormData()
    formData.append('file', imageString)
    const response = await baseAxios.post(API.upload, formData)
    return response.data
  } catch (error) {
    return errorMessage(error)
  }
}

export default uploadImage
