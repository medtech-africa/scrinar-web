import React from 'react'
import { Progress } from '../ui/progress'

export const UploadProgress = ({ progress = 0 }) => {
  if (!progress || progress === 0) return null
  return (
    <div className="flex flex-row gap-x-2 items-center justify-center mt-4">
      <Progress value={progress} className="h-2 bg-grey-200" />
      <span className="text-sm">{progress}%</span>
    </div>
  )
}
