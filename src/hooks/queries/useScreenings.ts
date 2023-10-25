import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getScreenings = (page?: number) =>
  baseAxios.get(API.getScreenings(page)).then((res) => res.data)

const useScreenings = (page?: number) => {
  return useQuery(['screenings', page], () => getScreenings(page), {
    keepPreviousData: true,
  })
}

const useScreening = (id: string) => {
  return useQuery(['single-screening', id], () =>
    baseAxios.get(API.screening(id)).then((res) => res.data)
  )
}

const useAssessmentType = () => {
  return useQuery(['assessment-type'], () =>
    baseAxios.get(API.getAssessmentType).then((res) => res.data)
  )
}

const useAssessmentStatus = () => {
  return useQuery(['assessment-status'], () =>
    baseAxios.get(API.getAssessmentStatus).then((res) => res.data)
  )
}

export { useScreening, useAssessmentType, useAssessmentStatus }

export default useScreenings
