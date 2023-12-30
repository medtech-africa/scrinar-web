import { useQuery } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'

const fetchModules = async () => {
  const { data } = await baseAxios.get(API.trainingModules)
  return data
}

const useTrainingModules = () => {
  return useQuery({
    queryKey: ['training-modules'],
    queryFn: fetchModules
  });
}

export const useTrainingModule = (id: string) => {
  return useQuery({
    queryKey: ['training-module', id],

    queryFn: () =>
      baseAxios.get(API.trainingModule(id)).then((res) => res.data)
  });
}

export default useTrainingModules
