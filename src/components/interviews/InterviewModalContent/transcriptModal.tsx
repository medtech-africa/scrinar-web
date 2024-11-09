import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'

const TranscriptModal = ({
  fileInputRef,
  fileName,
  setFileName,
  handleFileChange,
  isLoading = false,
}: {
  fileInputRef: React.RefObject<HTMLInputElement>
  fileName: string
  setFileName: React.Dispatch<React.SetStateAction<string>>
  handleFileChange: React.ChangeEventHandler<HTMLInputElement>
  isLoading?: boolean
}) => {
  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const hasFile = fileInputRef.current?.files?.[0]?.name

  return (
    <div className="grid mt-10 gap-y-6 justify-center items-start">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.xls,.xlsx"
        className="hidden"
        title="transcript upload"
      />

      <div className="w-full">
        <p>File:</p>
        <Button
          onClick={handleClick}
          variant={'tertiary'}
          className="border w-full"
        >
          <IconPicker icon="documentText" className={cn`mr-2`} />
          {hasFile
            ? 'Click to change Transcript'
            : 'Click to upload Transcript'}
        </Button>
        <div className="">
          {hasFile && (
            <p className="text-sm text-gray-600 mt-2">
              Selected file: {fileInputRef.current?.files?.[0].name}
            </p>
          )}
        </div>
      </div>

      <Input
        label="File Name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        labelStyle="lg:text-sm text-xs"
        className="w-full"
      />

      {/* Save button */}
      <Button type="submit" loading={isLoading} className="w-full">
        Save Transcript
      </Button>
    </div>
  )
}

export default TranscriptModal
