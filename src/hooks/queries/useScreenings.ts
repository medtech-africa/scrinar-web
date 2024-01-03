import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getScreenings = (page?: number) =>
  baseAxios.get(API.getScreenings(page)).then((res) => res.data)

const useScreenings = (page?: number) => {
  return useQuery({
    queryKey: ['screenings', page],
    queryFn: () => getScreenings(page),
    placeholderData: keepPreviousData
  });
}

const useScreening = (id: string) => {
  return useQuery({
    queryKey: ['single-screening', id],

    queryFn: () =>
      baseAxios.get(API.screening(id)).then((res) => res.data)
  });
}

const useAssessmentType = () => {
  return useQuery({
    queryKey: ['assessment-type'],

    queryFn: () =>
      baseAxios.get(API.getAssessmentType).then((res) => res.data)
  });
}

const useAssessmentStatus = () => {
  return useQuery({
    queryKey: ['assessment-status'],

    queryFn: () =>
      baseAxios.get(API.getAssessmentStatus).then((res) => res.data)
  });
}

export { useScreening, useAssessmentType, useAssessmentStatus }

export default useScreenings
