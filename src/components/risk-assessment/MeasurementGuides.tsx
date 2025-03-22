import React, { useState } from 'react'
import { Text } from '../ui/text'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const PlayIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 5.14V19.14L19 12.14L8 5.14Z" fill="currentColor" />
  </svg>
)

const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

const MeasurementGuides = ({
  guides = [
    {
      id: 'height',
      title: 'How to measure height',
      videoUrl: 'https://www.youtube.com/watch?v=VONs9Lpjq_E',
    },
    {
      id: 'weight',
      title: 'How to measure weight',
      videoUrl: 'https://www.youtube.com/watch?v=3ZSfY87v6pM',
    },
    {
      id: 'bp',
      title: 'How to measure blood pressure and pulse #1',
      videoUrl: 'https://www.youtube.com/watch?v=dKEr_Q3N2wc',
    },
    {
      id: 'bp-alternative',
      title: 'How to measure blood pressure and pulse #2',
      videoUrl: 'https://www.youtube.com/watch?v=VLXDOSRk69I',
    },
  ],
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  // Initialize with the first video in the guides array
  const [currentVideoId, setCurrentVideoId] = useState(
    getYouTubeVideoId(guides[0]?.videoUrl) || ''
  )

  const playVideo = (videoUrl: string) => {
    const videoId = getYouTubeVideoId(videoUrl)
    if (videoId) {
      setCurrentVideoId(videoId)
      setIsPlaying(true)
    }
  }

  return (
    <div className="w-full">
      {/* Featured video area */}
      <div className="relative aspect-square w-full overflow-hidden">
        {isPlaying && currentVideoId ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${currentVideoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <Image
              src={`https://img.youtube.com/vi/${currentVideoId}/hqdefault.jpg`}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
              height={300}
              width={300}
            />
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center"
              aria-label="Play video"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white">
                <PlayIcon />
              </div>
            </button>
          </>
        )}
      </div>

      {/* List of video guides */}
      <div className="py-4">
        {guides.map((guide) => (
          <button
            key={guide.id}
            type="button"
            onClick={() => playVideo(guide.videoUrl)}
            className={cn(
              'w-full flex items-center justify-between py-3 px-2 hover:bg-gray-100 rounded-md transition-colors text-left',
              guide.videoUrl.includes(currentVideoId) && 'text-blue-900'
            )}
          >
            <Text
              className={cn(
                guide.videoUrl.includes(currentVideoId) && 'text-blue-600'
              )}
            >
              {guide.title}
            </Text>

            <div>
              <PlayIcon />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MeasurementGuides
