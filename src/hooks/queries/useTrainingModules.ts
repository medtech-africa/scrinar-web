import { ApiResponse } from './../../types/paginatedResponse.types';
import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { TrainingCourse, TrainingCourseProgress, TrainingModule } from '@/types/trainingModules.types'
import { PaginatedResponse } from "@/types/paginatedResponse.types"

const fetchModules = async (courseId: string) => {
  const { data } = await baseAxios.get<PaginatedResponse<TrainingModule[]>>(API.trainingModules(courseId))
  return data?.data?.data ?? []
}

const fetchCourses = async () => {
  const { data } = await baseAxios.get<PaginatedResponse<TrainingCourse[]>>(API.trainingCourses)
  return data
}

export const markAsComplete = async (courseId: string, moduleId: string) => {
 return baseAxios.patch(API.trainingModuleComplete(courseId, moduleId))
}

export const useTrainingModules = ({ courseId, initialData }: {
  courseId: string;
  initialData?: TrainingModule[];
}) => {
  return useQuery({
    queryKey: ['training-modules'],
    queryFn: () => fetchModules(courseId),
    initialData
  });
}

export const useTrainingCourses = () => {
  return useQuery({
    queryKey: ['training-courses'],
    queryFn: fetchCourses
  });
}

export const useTrainingCourse = ({ courseId, initialCourse }: { courseId: string; initialCourse?: TrainingCourse}) => {
  return useQuery({
    queryKey: ['training-course', courseId],

    queryFn: () =>
      baseAxios.get<ApiResponse<TrainingCourse>>(API.trainingCourse(courseId)).then((res) => res.data?.data),
    initialData: initialCourse
  });
}

export const useUserTrainingProgress = ({ courseId, initialData }: { courseId: string; initialData?: TrainingCourseProgress}) => {
  return useQuery({
    queryKey: ['training-course-progress', courseId],

    queryFn: () =>
      baseAxios.get<TrainingCourseProgress>(API.trainingModuleProgress(courseId)).then((res) => res.data),
    initialData: initialData
  });
}

export default useTrainingModules
