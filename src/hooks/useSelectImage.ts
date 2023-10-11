import { useState } from 'react'

const useSelectImage = () => {
  const [selectedImg, setSelectedImg] = useState<File | null>(null)
  const [imageLoading, setImageLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile?.type?.startsWith('image/')) {
      setSelectedImg(selectedFile)
    }
  }

  return {
    handleFileChange,
    selectedImg,
    setSelectedImg,
    setImageLoading,
    imageLoading,
  }
}

export default useSelectImage
