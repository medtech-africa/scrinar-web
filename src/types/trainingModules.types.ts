export type TrainingCourse = {
  categories?: string[]
  description?: string
  id: string
  imageUrl?: string
  title: string
  totalModules: number
}

export interface TrainingModule {
  title: string
  content: string
  moduleNumber: number
  thumbnail: string
  quiz: string
  video: TrainingVideo
  resources: TrainingResource[]
  course: string
  createdAt: string
  updatedAt: string
  id: string
  isCompleted?: boolean;
}

export interface TrainingVideo {
  _id: string
  title: string
  url: string
  duration: number
}

export interface TrainingResource {
  _id: string
  title: string
  type: string
  url: string
}

export interface TrainingCourseProgress {
  trainingCourse: Pick<TrainingCourse, 'title'|'id'>
  user: string
  completedTrainingModule: CompletedTrainingModule[]
  createdAt: string
  updatedAt: string
  id: string
}

export interface CompletedTrainingModule {
  title: string
  moduleNumber: number
  id: string
}