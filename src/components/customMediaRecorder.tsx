// CustomMediaRecorder.tsx
import React from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'
import toast from 'react-hot-toast'
import { IconPicker } from './ui/icon-picker'
import Modal from './ui/modal'
import { Button } from './ui/button'
import Lottie from 'lottie-react'
import waveAnimation from '@/assets/wave.json'
import { useMutation } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import uploadImage from '@/utils/uploadImage'
import { Input } from './ui/input'

const CustomMediaRecorder = () => {
  const { startRecording, stopRecording, mediaBlobUrl, status, clearBlobUrl } =
    useReactMediaRecorder({ audio: true })
  const [openModal, setOpenModal] = React.useState(false)

  const [fileName, setFileName] = React.useState('Audio 1')

  const { isPending: isUploading, mutate: uploadFile } = useMutation({
    mutationFn: (file: File | Blob) => uploadImage(file as File, true),
  })

  const { isPending: isSubmitting, mutate: submitFile } = useMutation({
    mutationFn: (data: {
      fileURL: string
      fileName: string
      type: string
      fileType: string
    }) => baseAxios.post(API.schoolUpload, data),
    onSuccess: () => {
      clearBlobUrl()
      setOpenModal(false)
      setFileName('')
      toast.success('File uploaded successfully')
    },
    onError: (error) => {
      console.error('Error uploading file:', error)
      toast.error('Error uploading file')
    },
  })

  const onSave = (audioFile: Blob | null) => {
    if (audioFile) {
      uploadFile(audioFile, {
        onSuccess: (res) => {
          if (res) {
            submitFile({
              fileURL: res.url,
              fileName: fileName,
              fileType: 'audio',
              type: 'interview',
            })
          }
        },
        onError: (error) => {
          console.error('Error uploading file:', error)
          toast.error('Error uploading file')
        },
      })
    }
  }

  const isRecording = status === 'recording'

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
          <button
            onClick={() => setOpenModal(true)}
            className="outline-none border-none bg-transparent"
          >
            {isRecording ? (
              <IconPicker icon="pause" size={24} className="text-primary" />
            ) : (
              <IconPicker icon="play" size={24} className="text-primary" />
            )}
          </button>
        </div>
      </div>

      <Modal
        className="sm:w-1/2 sm:h-1/2 flex items-center justify-center"
        open={openModal}
        closeModal={() => setOpenModal(false)}
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
              <Button type="submit" loading={isSubmitting || isUploading}>
                Upload
              </Button>
            )}
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default CustomMediaRecorder
