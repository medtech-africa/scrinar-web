import { useState } from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'

export const useAudioRecorder = () => {
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      audio: true,
    }
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

  return {
    isRecording,
    toggleRecording,
    audioUrl: mediaBlobUrl,
  }
}
