import React from 'react'
import { Text } from './text'
import { TrainingCard } from './training-card'

const OngoingLesson = () => {
  return (
    <div className="py-8">
      <div className="flex flex-col mb-8">
        <Text variant="text/lg" weight="medium">
          Ongoing Learning
        </Text>
        <Text variant="text/sm" className="text-grey-600 mt-2">
          Continue from where you stopped.
        </Text>
        <div className="pt-6 grid lg:grid-cols-2 grid-cols-1">
          <TrainingCard data={[]} type="ongoing" />
        </div>
      </div>
    </div>
  )
}

export default OngoingLesson
