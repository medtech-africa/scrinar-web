// CustomMediaRecorder.tsx
'use client'
import React from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'
import toast from 'react-hot-toast'
import { IconPicker } from './ui/icon-picker'
import Modal from './ui/modal'
import { Button } from './ui/button'
import Lottie from 'lottie-react'
import waveAnimation from '@/assets/wave.json'
import { Input } from './ui/input'
import { useSchoolResourceUpload } from '@/hooks/useSchoolResource'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Select } from './ui/select'
import {
  convertStringsToOptionArray,
  convertStringToOption,
} from '@/lib/convertStringsToOptionArray'
import { UploadProgress } from './interviews/UploadProgress'

const CustomMediaRecorder = (props: { type: string; refetch: () => void }) => {
  const { startRecording, stopRecording, mediaBlobUrl, status, clearBlobUrl } =
    useReactMediaRecorder({ audio: true })
  const [openModal, setOpenModal] = React.useState(false)

  const [fileName, setFileName] = React.useState('Audio 1')
  const [language, setLanguage] = React.useState('english')

  const params = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const {
    handleSave: onSubmit,
    isSubmitting,
    isUploading,
    uploadProgress,
  } = useSchoolResourceUpload()

  const closeModal = () => {
    setOpenModal(false)
    clearBlobUrl()
    setFileName('Audio 1')
    router.push(pathname)
  }

  const onSave = (audioFile: Blob | null) => {
    if (audioFile) {
      onSubmit({
        uploadedFile: audioFile,
        fileName: fileName,
        fileType: 'audio',
        type: props.type,
        language,
        onSuccess: () => {
          props.refetch()
          closeModal()
        },
      })
    }
  }

  const isRecording = status === 'recording'

  const uploadType = params.get('uploadType')

  React.useEffect(() => {
    if (uploadType === 'record') {
      setOpenModal(true)
    }
  }, [uploadType])

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      clearBlobUrl()
      startRecording()
    }
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (mediaBlobUrl?.startsWith('blob:')) {
      try {
        const response = await fetch(mediaBlobUrl)
        const audioBlob = await response.blob()
        onSave(audioBlob)
      } catch (error) {
        console.error('Error fetching the audio blob:', error)
        toast.error('Error saving audio')
      }
    } else {
      toast.error('No audio recorded')
    }
  }

  const renderRecordButtonContent = () => {
    if (mediaBlobUrl)
      return isRecording ? 'Stop recording' : 'Start new recording'

    return isRecording ? 'Stop Recording' : 'Start Recording'
  }

  const showAudio = !isRecording && !!mediaBlobUrl

  return (
    <div className="justify-items-center">
      <p className="text-grey-500">Record Audio</p>
      <div className="inline-flex flex-col px-4 rounded-full text-white items-center gap-y-2">
        <div className="flex flex-row gap-4">
          <Link href={`?uploadType=record`}>
            <button className="outline-none border-none bg-transparent">
              {isRecording ? (
                <IconPicker icon="pause" size={24} className="text-primary" />
              ) : (
                <IconPicker icon="play" size={24} className="text-primary" />
              )}
            </button>
          </Link>
        </div>
      </div>

      <Modal
        className="sm:w-1/2 sm:h-1/2 flex items-center justify-center"
        open={openModal}
        closeModal={closeModal}
        title={'Record audio'}
      >
        <form onSubmit={handleSave} className="grid gap-y-2 min-w-56">
          <div>
            <Button onClick={toggleRecording} type="button" className="w-full">
              {renderRecordButtonContent()}
            </Button>

            {isRecording && (
              <Lottie
                animationData={waveAnimation}
                loop={true}
                height={100}
                className="h-24"
              />
            )}
          </div>

          {showAudio && <audio src={mediaBlobUrl} controls />}

          <Select
            onChange={(val) => {
              setLanguage((val as { value: string }).value)
            }}
            placeholder="Select language"
            label="Select language"
            labelStyle="lg:text-sm text-xs"
            options={convertStringsToOptionArray([
              'english',
              'hausa',
              'yoruba',
            ])}
            value={convertStringToOption(language)}
          />

          <Input
            label="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            labelStyle="lg:text-sm text-xs"
            className="w-full"
          />

          <div className="mt-5 justify-between flex">
            <Button
              type="button"
              variant="tertiary"
              className="border"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            {showAudio && (
              <Button
                type="submit"
                loading={isSubmitting || isUploading}
                disabled={!fileName}
              >
                Upload
              </Button>
            )}
          </div>
          <UploadProgress progress={uploadProgress} />
        </form>
      </Modal>
    </div>
  )
}

export default CustomMediaRecorder
