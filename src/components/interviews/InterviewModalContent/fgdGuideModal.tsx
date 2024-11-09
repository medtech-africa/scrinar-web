import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'

const FgdGuideModal = ({
  fileInputRef,
  fileName,
  setFileName,
  setUploadedFile,
  isLoading = false,
}: {
  fileInputRef: React.RefObject<HTMLInputElement>
  fileName: string
  setFileName: React.Dispatch<React.SetStateAction<string>>
  setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>
  isLoading?: boolean
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
    <div className="flex flex-col gap-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.xls,.xlsx"
        className="hidden"
        title="FGD guide"
      />

      <Button onClick={handleClick} variant={'secondary'} type="button">
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
      <Button loading={isLoading} type="submit">
        Save Audio
      </Button>
    </div>
  )
}

export default FgdGuideModal
