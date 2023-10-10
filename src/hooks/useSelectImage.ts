import { useState } from 'react'

const useSelectImage = () => {
  const [selectedImg, setSelectedImg] = useState<File | null>(null)

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
  }
}

export default useSelectImage
