import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import React from 'react'

const AudioModal = ({
  fileInputRef,
  fileName,
  setFileName,
  handleFileChange,
  hasFile = false,
  isLoading = false,
}: {
  fileInputRef: React.RefObject<HTMLInputElement>
  fileName: string
  setFileName: React.Dispatch<React.SetStateAction<string>>
  handleFileChange: React.ChangeEventHandler<HTMLInputElement>
  hasFile?: boolean
  isLoading?: boolean
}) => {
  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col gap-y-6 justify-center items-start">
      <div className="space-y-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="audio/*"
          className="hidden"
          title="audio upload"
        />
        <div className="">
          <p>File:</p>
          <Button
            onClick={handleClick}
            variant={'tertiary'}
            className="gap-x-2 w-full border"
            type="button"
          >
            <IconPicker icon="documentText" />
            {hasFile ? 'Click to change Audio' : 'Click to upload Audio'}
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
      </div>

      {/* Save button */}
      <Button type="submit" className="w-full" loading={isLoading}>
        Save Audio
      </Button>
    </div>
  )
}

export default AudioModal
