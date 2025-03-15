import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getProjects = (page?: number, search?: string) =>
  baseAxios.get(API.getProjects(page, search)).then((res) => res.data)

const useProjects = (page?: number, search?: string) => {
  return useQuery({
    queryKey: ['projects', page, search],
    queryFn: () => getProjects(page, search),
    placeholderData: keepPreviousData,
  })
}

const useSingleProject = (id: string) => {
  return useQuery({
    queryKey: ['single-project', id],
    queryFn: () => baseAxios.get(API.project(id)).then((res) => res.data),
    enabled: !!id,
  })
}
export { useProjects, useSingleProject }
