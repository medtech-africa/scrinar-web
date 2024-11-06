import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'

const AudioModal = ({
  fileInputRef,
  fileName,
  setFileName,
  setUploadedFile,
  handleSave,
}: {
  fileInputRef: React.RefObject<HTMLInputElement>
  fileName: string
  setFileName: React.Dispatch<React.SetStateAction<string>>
  setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>
  handleSave: () => void
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setUploadedFile(selectedFile)
      setFileName(selectedFile.name)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col mt-10 gap-y-6 justify-center items-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="audio/*"
        style={{ display: 'none' }}
      />

      <Button onClick={handleClick} variant={'secondary'}>
        <IconPicker icon="documentText" className={cn`mr-2`} />
        Upload Audio
      </Button>

      <Input
        label="File Name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        labelStyle="lg:text-sm text-xs"
        className=""
      />

      {/* Save button */}
      <Button onClick={handleSave}>Save Audio</Button>
    </div>
  )
}

export default AudioModal
