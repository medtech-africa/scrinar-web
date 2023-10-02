import React from 'react'
import { IconPicker } from './ui/icon-picker'

const ContentLoader = ({ loading = false }) => {
  return (
    loading && (
      <div className="flex justify-center items-center absolute top-0 right-0 bottom-0 bg-gray-50 opacity-60 z-50 w-full">
        <IconPicker icon="loader2" size={'2rem'} />
      </div>
    )
  )
}

export default ContentLoader
