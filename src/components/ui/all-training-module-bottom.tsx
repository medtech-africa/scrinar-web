import React from 'react'
import { TrainingCard } from './training-card'
export const CardData = [
  {
    id: 1,
    image: '/feat_image1.png',
    topic: '3 Topics',
    time: '1H:30',
    title: ' Age-Appropriate Exercises for Students',
    subtile:
      " Discover suitable exercises tailored to students' age and development.",
    category: ['Health Assessment', 'Exercise'],
  },
  {
    id: 2,
    image: '/feat_image2.png',
    topic: '3 Topics',
    time: '1H:30',
    title: ' Age-Appropriate Exercises for Students',
    subtile:
      " Discover suitable exercises tailored to students' age and development.",
    category: ['Health Assessment', 'Exercise'],
  },
  {
    id: 3,
    image: '/feat_image3.png',
    topic: '3 Topics',
    time: '1H:30',
    title: ' Age-Appropriate Exercises for Students',
    subtile:
      " Discover suitable exercises tailored to students' age and development.",
    category: ['Health Assessment', 'Exercise'],
  },
  {
    id: 4,
    image: '/feat_image4.png',
    topic: '3 Topics',
    time: '1H:30',
    title: ' Age-Appropriate Exercises for Students',
    subtile:
      " Discover suitable exercises tailored to students' age and development.",
    category: ['Health Assessment', 'Exercise', 'dancing'],
  },
]
export type CardDataProps = {
  id: number
  image: string
  topic: string
  time: string
  title: string
  subtile: string
  category: string[]
}
const AllTrainingModuleBottom = () => {
  return (
    <div className="py-8 grid lg:grid-cols-2 grid-cols-1">
      <TrainingCard data={CardData} />
    </div>
  )
}

export default AllTrainingModuleBottom
