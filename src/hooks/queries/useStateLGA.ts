import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

export interface State {
  name: string
  id: number
  capital: string
  locals: Local[]
  slug: string
}

export interface Local {
  name: string
  id: number
}

const getState = () =>
  baseAxios.get<State[]>(API.getState).then((res) => res.data)

const useStateLGA = () => {
  return useQuery({
    queryKey: ['state'],
    queryFn: () => getState(),
    placeholderData: keepPreviousData
  });
}

export default useStateLGA
