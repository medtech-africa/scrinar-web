import { ApiResponse } from './../../types/paginatedResponse.types'
import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import {
  ITrainer,
  TrainingCourse,
  TrainingCourseProgress,
  TrainingModule,
} from '@/types/trainingModules.types'
import { PaginatedResponse } from '@/types/paginatedResponse.types'

export const fetchModules = async (courseId: string) => {
  const { data } = await baseAxios.get<PaginatedResponse<TrainingModule[]>>(
    API.trainingModules(courseId)
  )
  return data?.data?.data ?? []
}

const fetchCourses = async () => {
  const { data } = await baseAxios.get<PaginatedResponse<TrainingCourse[]>>(
    API.trainingCourses
  )
  return data
}

const fetchUserProgress = async (courseId: string) => {
  const data = await baseAxios
    .get<TrainingCourseProgress>(API.trainingModuleProgress(courseId))
    .then((res) => res.data)
  return data
}

export const markAsComplete = async (courseId: string, moduleId: string) => {
  return baseAxios.patch(API.trainingModuleComplete(courseId, moduleId))
}

export const submitQuiz = async (moduleId: string, score: number) => {
  return baseAxios.post(API.trainingModuleQuizComplete(moduleId), { score })
}

export const useTrainingModules = ({
  courseId,
  initialData,
}: {
  courseId: string
  initialData?: TrainingModule[]
}) => {
  return useQuery({
    queryKey: ['training-modules', courseId],
    queryFn: () => fetchModules(courseId),
    initialData,
  })
}

export const useTrainingCourses = () => {
  return useQuery({
    queryKey: ['training-courses'],
    queryFn: fetchCourses,
  })
}

export const useTrainingCourse = ({
  courseId,
  initialCourse,
}: {
  courseId: string
  initialCourse?: TrainingCourse
}) => {
  return useQuery({
    queryKey: ['training-course', courseId],

    queryFn: () =>
      baseAxios
        .get<ApiResponse<TrainingCourse>>(API.trainingCourse(courseId))
        .then((res) => res.data?.data),
    initialData: initialCourse,
  })
}

export const useUserTrainingProgress = ({
  courseId,
  initialData,
}: {
  courseId: string
  initialData?: TrainingCourseProgress
}) => {
  return useQuery({
    queryKey: ['training-course-progress', courseId],

    queryFn: () => fetchUserProgress(courseId),
    initialData: initialData,
  })
}

const fetchTrainers = async ({ search, page }: {
  search?: string
  page?: number
}) => {
  const { data } = await baseAxios.get<PaginatedResponse<{
  _id: string
  email: string
  isSuspended: boolean
  leaderBoardScore: number
  totalScore: number
  roles: string[]
  loginDevices: any[]
  userId: string
  createdAt: string
  updatedAt: string
  completedModulesCount: number
  id: string
}[]>>(
    API.trainers({search, page})
  )
  return data?.data
}
export const useTrainers = ({ search, page }: {
  search?: string
  page?: number
}) => {
  return useQuery({
    queryKey: ['trainers', search, page],

    queryFn: () => fetchTrainers({search, page}),
  })
}

const fetchTrainer = async (id: string) => {
  const { data } = await baseAxios.get<ApiResponse<ITrainer>>(
    API.trainer(id)
  )
  return data?.data
}
export const useTrainer = ({ id, placeholderData }: {
  id?: string
  placeholderData?: Partial<ITrainer>
}) => {
  return useQuery({
    queryKey: ['trainer', id],
    queryFn: () => id ? fetchTrainer(id) : undefined,
    enabled: !!id,
    // @ts-expect-error types missing
    placeholderData: placeholderData
  })
}

export default useTrainingModules
