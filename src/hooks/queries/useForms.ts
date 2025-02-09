import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const getForms = (page?: number, search?: string) =>
  baseAxios.get(API.getForms(page, search)).then((res) => res.data)

const useForms = (page?: number, search?: string) => {
  return useQuery({
    queryKey: ['forms', page, search],
    queryFn: () => getForms(page, search),
    placeholderData: keepPreviousData,
  })
}

type Form = {
  name: string
  user: string
  createdAt: string
  updatedAt: string
  id: string
}

const useSingleForm = (id: string) => {
  return useQuery({
    queryKey: ['single-form', id],
    queryFn: () => baseAxios.get(API.form(id)).then((res) => res.data as Form),
  })
}

export { useSingleForm }

export default useForms
