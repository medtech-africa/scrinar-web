import { useQuery, keepPreviousData, useMutation } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { AxiosError, AxiosResponse } from 'axios'
import {
  FormModel,
  FormFieldModel,
  SortFormModel,
  ICreateForm,
} from '@/types/forms.types'

const getForms = (page?: number, search?: string) =>
  baseAxios.get(API.getForms(page, search)).then((res) => res.data)

const useForms = (page?: number, search?: string) => {
  return useQuery({
    queryKey: ['forms', page, search],
    queryFn: () => getForms(page, search),
    placeholderData: keepPreviousData,
  })
}

const useSingleForm = (id: string) => {
  return useQuery({
    queryKey: ['single-form', id],
    queryFn: () =>
      baseAxios.get(API.form(id)).then((res) => res.data as FormModel),
    enabled: !!id,
  })
}
const useMutateFormQuestions = (id: string) => {
  return useMutation({
    mutationFn: (data: FormFieldModel) =>
      baseAxios.post<{
        data: FormFieldModel
      }, { data: FormFieldModel }>(API.formQuestions(id), data),
    mutationKey: ['mutate_form_questions', id],
    retry: 2,
  })
}
const useMutateSortForm = (id: string) => {
  return useMutation({
    mutationFn: (data: SortFormModel) =>
      baseAxios.post<SortFormModel>(API.sortForm(id), data),
  })
}
const useCreateForm = () => {
  return useMutation<AxiosResponse, AxiosError['response'], ICreateForm>({
    mutationFn: (data: ICreateForm) => baseAxios.post(API.createForm, data),
    mutationKey: ['mutate_create_form'],
  })
}
const useUpdateForm = (id: string) => {
  return useMutation<AxiosResponse, AxiosError['response'], ICreateForm>({
    mutationFn: (data: ICreateForm) => baseAxios.patch(API.form(id), data),
    mutationKey: ['mutate_update_form', id],
  })
}

const useFormQuestions = (id: string) => {
  return useQuery({
    queryKey: ['single-form-questions', id],
    queryFn: () =>
      baseAxios
        .get(API.formQuestions(id))
        .then((res) => res.data as { data: FormFieldModel[] }),
  })
}

export {
  useSingleForm,
  useCreateForm,
  useFormQuestions,
  useUpdateForm,
  useMutateFormQuestions,
  useMutateSortForm,
}

export default useForms
