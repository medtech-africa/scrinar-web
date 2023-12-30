"use server"
/**
 * The above code defines two functions, `fetchModules` and `fetchCourses`, that make API calls to
 * fetch training modules and training courses respectively.
 * @param {string} courseId - The `courseId` parameter is a string that represents the ID of a training
 * course. It is used in the `fetchModules` function to fetch the training modules associated with a
 * specific course.
 * @returns The `fetchModules` function is returning an array of `TrainingModule` objects. If the
 * response from the API is successful, it will return the `data` property from the response, which is
 * an array of `TrainingModule` objects. If the response is not successful or the `data` property is
 * not available, it will return an empty array.
 */
import { ApiResponse, PaginatedResponse } from "@/types/paginatedResponse.types"
import { TrainingModule, TrainingCourse } from "@/types/trainingModules.types"
import { API } from "@/utils/api"
import baseServerAxios from "@/utils/baseAxios.server"

export const fetchModules = async (courseId: string) => {
  const { data } = await baseServerAxios.get<PaginatedResponse<TrainingModule[]>>(API.trainingModules(courseId))
  return data?.data?.data ?? []
}

export const fetchCourses = async () => {
  const { data } = await baseServerAxios.get<PaginatedResponse<TrainingCourse[]>>(API.trainingCourses)
  return data
}

export const fetchCourse = async (id: string) => {
  const { data } = await baseServerAxios.get<ApiResponse<TrainingCourse>>(API.trainingCourse(id)).then((res) => res.data)
  return data
}