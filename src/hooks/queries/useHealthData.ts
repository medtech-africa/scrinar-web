import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getHealthData = (
  page = 1,
  searchVal = '',
  limit = 10,
  type = '',
  isFamily = false,
  sort = ''
) =>
  baseAxios
    .get(isFamily ? API.getFamilyHealthData : API.getHealthData, {
      params: {
        page,
        limit,
        per_page: limit,
        ...(type ? { type } : {}),
        search: searchVal,
        sort,
      },
    })
    .then((res) => res.data)

const useHealthData = (
  pageNumber = 1,
  searchVal?: string,
  type = '',
  limit = 10
) => {
  return useQuery({
    queryKey: ['health-data', pageNumber, searchVal, type, limit],
    queryFn: () => getHealthData(pageNumber, searchVal, limit, type),
    placeholderData: keepPreviousData,
  })
}

const useSingleHealthData = (id: string) => {
  return useQuery({
    queryKey: ['single-health-data', id],

    queryFn: () =>
      baseAxios.get(API.singleHealthData(id)).then((res) => res.data),
  })
}

const useHealthRiskData = () => {
  return useQuery({
    queryKey: ['health-risk-data'],

    queryFn: () => baseAxios.get(API.highRisk).then((res) => res.data),
  })
}

const useFamilyHealthData = (
  pageNumber = 1,
  searchVal?: string,
  type = '',
  limit = 10,
  sort = ''
) => {
  return useQuery({
    queryKey: ['family-health-data', pageNumber, searchVal, type, limit, sort],
    queryFn: () =>
      getHealthData(pageNumber, searchVal, limit, type, true, sort),
    placeholderData: keepPreviousData,
    retry: (failureCount) => failureCount < 1,
  })
}

const useExportParentQuestionnaire = () => {
  return useQuery({
    queryKey: ['exportParentQuestionnaire'],
    queryFn: () =>
      baseAxios
        .get(API.exportParentQuestionnaire)
        .then((res) => res.data?.data),
  })
}

const useExportStudentQuestionnaire = () => {
  return useQuery({
    queryKey: ['exportStudentQuestionnaire'],
    queryFn: () =>
      baseAxios
        .get(API.exportStudentQuestionnaire)
        .then((res) => res.data?.data),
  })
}

export {
  useSingleHealthData,
  useHealthRiskData,
  useFamilyHealthData,
  useExportParentQuestionnaire,
  useExportStudentQuestionnaire,
}

export default useHealthData
