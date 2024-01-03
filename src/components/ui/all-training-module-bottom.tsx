import React from 'react'
import { TrainingCard } from './training-card'
import { TrainingCourse } from '@/types/trainingModules.types'

const AllTrainingModuleBottom = ({
  courses,
}: {
  courses: TrainingCourse[]
}) => {
  return (
    <div className="py-8 grid lg:grid-cols-2 grid-cols-1 gap-6">
      <TrainingCard data={courses} />
    </div>
  )
}

export default AllTrainingModuleBottom
