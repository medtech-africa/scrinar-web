import { errorMessage } from './errorMessage'
import baseAxios from './baseAxios'
import { API } from './api'

const uploadImage = async({
  file: imageString,
  throwError = false,
  onProgress,
}:{
  file: File
  throwError?: boolean
  onProgress?: (progress: number) => void
}) => {
// const uploadImage = async (imageString: File, throwError = false, onProgress?: (progress: number) => void) => {
  if (!throwError) {
    try {
      const formData = new FormData()
      formData.append('file', imageString)
      const response = await baseAxios.post(API.upload, formData)
      return response.data as {
        key: string
        url: string
        mimeType: string
      }
    } catch (error) {
      return errorMessage(error)
    }
  }
  
  const formData = new FormData()
  formData.append('file', imageString)
  const response = await baseAxios.post(API.upload, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      console.log("🚀 ~ //uploadImage ~ progressEvent:", progressEvent)
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total)
        );
        onProgress(percentCompleted);
      }
    },
  })
  return response.data as {
    key: string
    url: string
    mimeType: string
  }
}

export default uploadImage
