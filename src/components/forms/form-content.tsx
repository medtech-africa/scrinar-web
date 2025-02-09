import validation from '@/constants/validation'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { ICreateForm } from '@/types/form.types'
import { useCreateForm, useUpdateForm } from '@/hooks/queries/useForms'
import { errorMessage } from '@/utils/errorMessage'
import { useRouter } from 'next/navigation'
import { FormModel } from '@/types/forms'
import { AxiosError, AxiosResponse } from 'axios'
import { Label } from '../ui/label'

const FormContent = ({ singleFormData }: { singleFormData?: FormModel }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<ICreateForm>({
    resolver: validation.formContentSchema,
    defaultValues: {
      title: singleFormData?.title || '',
      description: singleFormData?.description || '',
      locationEnabled: singleFormData?.locationEnabled || false,
    },
  })
  const router = useRouter()
  const { mutate, isPending } = useCreateForm()
  const { mutate: updateForm, isPending: updateFormLoading } = useUpdateForm(
    singleFormData?.id ?? ''
  )
  const onSubmit = (data: ICreateForm) => {
    const mutationOptions: any = {
      onSuccess: (res: AxiosResponse) => {
        router.push(`/dashboard/forms/${res.data.id}/new`)
      },
      onError: (err: AxiosError) => {
        errorMessage(err)
      },
    }
    if (singleFormData?.id) {
      console.log('i am updating')
      updateForm(data, mutationOptions)
    } else {
      console.log('i am creating')

      mutate(data, mutationOptions)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 flex flex-col px-4"
    >
      <div>
        <Label htmlFor="title" className="lg:text-sm text-xs">
          Title
        </Label>
        <Input
          {...register('title', {
            onChange: (e) => setValue('title', e.target.value),
          })}
          id="title"
          className="input-class"
          defaultValue={singleFormData?.title}
          variant={errors?.title ? 'destructive' : 'default'}
          message={errors.title?.message}
        />
      </div>

      <div>
        <Label htmlFor="description" className="lg:text-sm text-xs">
          Description
        </Label>
        <Input
          {...register('description', {
            onChange: (e) => setValue('description', e.target.value),
          })}
          id="description"
          className="input-class capitalize"
          defaultValue={singleFormData?.description}
          variant={errors?.description ? 'destructive' : 'default'}
          message={errors.description?.message}
        />
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="locationEnabled">Enable Location</Label>
        <Controller
          name="locationEnabled"
          control={control}
          defaultValue={singleFormData?.locationEnabled || false}
          render={({ field }) => (
            <Checkbox
              id="locationEnabled"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
            />
          )}
        />
      </div>

      <Button type="submit" loading={isPending || updateFormLoading}>
        Proceed to questions
      </Button>
    </form>
  )
}

export { FormContent }
