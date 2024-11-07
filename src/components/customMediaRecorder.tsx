// CustomMediaRecorder.tsx
import React, { useState } from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'
import toast from 'react-hot-toast'
import { IconPicker } from './ui/icon-picker'

const CustomMediaRecorder = ({
  onSave,
}: {
  onSave: (audioBlob: Blob | null) => void
}) => {
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { audio: true }
  )
  const [isRecording, setIsRecording] = useState(false)

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
    setIsRecording(!isRecording)
  }

  const handleSave = async () => {
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

  return (
    <div className="justify-items-center">
      <p className="text-grey-500">Record Audio</p>
      <div className="bg-primary inline-flex flex-row p-4 rounded-full text-white items-center">
        <div
          role="button"
          tabIndex={0}
          onKeyUp={toggleRecording}
          onClick={toggleRecording}
        >
          {isRecording ? (
            <IconPicker icon="pause" size={24} color="white" />
          ) : (
            <IconPicker icon="play" size={24} color="white" />
          )}
        </div>
        {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
        {mediaBlobUrl && (
          <div onClick={handleSave}>
            <IconPicker icon="saveAdd" size={24} color="red" />
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomMediaRecorder
