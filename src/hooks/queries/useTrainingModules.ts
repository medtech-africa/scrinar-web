import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const fetchModules = async () => {
  const { data } = await baseAxios.get(API.trainingModules)
  return data
}

const useTrainingModules = () => {
  return useQuery(['training-modules'], fetchModules)
}

export const useTrainingModule = (id: string) => {
  return useQuery(['training-module', id], () =>
    baseAxios.get(API.trainingModule(id)).then((res) => res.data)
  )
}

export default useTrainingModules
