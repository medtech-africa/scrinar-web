import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import uploadImage from '@/utils/uploadImage'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useSchoolResourceUpload = () => {
  const { isPending: isUploading, mutate: uploadFile } = useMutation({
    mutationFn: (file: File) => uploadImage(file, true),
  })

  const { isPending: isSubmitting, mutate: submitFile } = useMutation({
    mutationFn: (data: {
      fileURL: string
      fileName: string
      type: string
      fileType: string
      mimeType: string
      language: string
    }) => baseAxios.post(API.schoolUpload, data),
    onSuccess: () => {
      toast.success('File uploaded successfully')
    },
    onError: (error) => {
      console.error('Error uploading file:', error)
      toast.error('Error uploading file')
    },
  })

  const handleSave = async ({
    uploadedFile,
    fileName,
    fileType,
    onSuccess,
    type,
    language,
  }: {
    uploadedFile: File | Blob | null
    fileName: string
    fileType: string
    type: string
    language: string
    onSuccess?: () => void
  }) => {
    if (uploadedFile) {
      uploadFile(uploadedFile as File, {
        onSuccess: (res) => {
          if (res) {
            submitFile(
              {
                fileURL: res.url,
                fileName: fileName,
                fileType: fileType,
                type,
                language,
                mimeType: res.mimeType,
              },
              {
                onSuccess: () => {
                  onSuccess?.()
                },
              }
            )
          }
        },
        onError: (error) => {
          console.error('Error uploading file:', error)
          toast.error('Error uploading file')
        },
      })
    }
  }

  return {
    isUploading,
    isSubmitting,
    handleSave,
  }
}
