import { useMutation, useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { AxiosError, AxiosResponse } from 'axios'

// GET
const getStudentsSurvey = (id: string) =>
  baseAxios.get(API.studentSurvey(id)).then((res) => res.data?.data)

const useStudentsSurvey = (id: string) => {
  return useQuery({
    queryKey: ['students_survey', id],
    queryFn: () => getStudentsSurvey(id),
  })
}

// PATCH
const useMutateStudentsSurvey = (id: string) => {
  return useMutation<AxiosResponse, AxiosError['response'], any>({
    mutationFn: (val: any) => baseAxios.patch(API.studentSurvey(id), val),
    mutationKey: ['mutate_students_survey', id],
  })
}
export { useMutateStudentsSurvey, useStudentsSurvey }
