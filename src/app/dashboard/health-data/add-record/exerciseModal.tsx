'use client'
import { PageCard } from '@/components/ui/page-card'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Controller, useForm } from 'react-hook-form'
import validation from '@/constants/validation'
import {
  schoolTransportQuestionOptions,
  sportQuestionOptions,
} from '@/constants/selectOptions'
import { useState } from 'react'
import filterObject from '@/utils/filterObject'
import toast from 'react-hot-toast'
import { errorMessage } from '@/utils/errorMessage'
import { useHealthValue } from '@/context/health-data-context'
import { PhysicalActivity } from '@/types/healthData.types'
import { ToastField } from '@/components/ui/toast'

interface IProps {
  onClose: () => void
}
interface IFormData
  extends Omit<PhysicalActivity, 'schoolTransportQuestion' | 'sportQuestion'> {
  schoolTransportQuestion?: { value?: string; label?: string }
  sportQuestion?: { value?: string; label?: string }
  schoolTransportQuestionAlt?: string
}
export interface IExerciseValue
  extends Omit<IFormData, 'sportQuestion' | 'schoolTransportQuestion'> {
  sportQuestion?: string
  schoolTransportQuestion?: string | undefined
}

export const ExerciseModal = ({ onClose }: IProps) => {
  const [specify, setSpecify] = useState('')
  const { setExerciseData, exerciseData } = useHealthValue()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: validation.exercise,
    defaultValues: {
      schoolTransportQuestion: {
        value: exerciseData?.schoolTransportQuestion,
        label: exerciseData?.schoolTransportQuestion,
      },
      sportQuestion: {
        value: exerciseData?.sportQuestion,
        label: exerciseData?.sportQuestion,
      },
      hoursOnSleep: exerciseData?.hoursOnSleep,
      hoursOnTv: exerciseData?.hoursOnTv,
      hoursOnComputer: exerciseData?.hoursOnComputer,
      schoolTransportQuestionAlt: exerciseData?.schoolTransportQuestionAlt,
    },
  })
  const onSubmit = async (data: IFormData) => {
    const { schoolTransportQuestionAlt: _, ...filteredData } =
      filterObject(data)

    const dataToSend = {
      ...filteredData,
      schoolTransportQuestion:
        specify === 'others'
          ? data?.schoolTransportQuestionAlt
          : data?.schoolTransportQuestion?.value,
      sportQuestion: data?.sportQuestion?.value,
    }

    if (
      !dataToSend?.schoolTransportQuestion &&
      !dataToSend?.sportQuestion &&
      !dataToSend?.hoursOnComputer &&
      !dataToSend?.hoursOnSleep &&
      !dataToSend?.hoursOnTv
    ) {
      return toast.custom(
        <ToastField
          variant={'warning2'}
          label={'Please provide a value'}
          action1={() => toast.remove()}
        />
      )
    }
    if (dataToSend) {
      setExerciseData(dataToSend)
      toast.success('Successfully saved')
      onClose()
    } else {
      errorMessage('Failed to save')
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 py-7 mt-2">
        <div className="w-full h-full order-last md:order-first">
          <PageCard title="Add Basic Information" bodyStyle="p-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 [&>div]:flex [&>div]:flex-col [&>div]:justify-between">
              <Controller
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <Select
                    onChange={(val: any) => {
                      onChange(val)
                      setSpecify(val?.value)
                    }}
                    placeholder="Select one"
                    label="How do you go to school?"
                    labelStyle="lg:text-sm text-xs"
                    {...field}
                    options={schoolTransportQuestionOptions}
                    variant={
                      errors?.schoolTransportQuestion
                        ? 'destructive'
                        : 'default'
                    }
                    message={errors.schoolTransportQuestion?.message ?? ''}
                  />
                )}
                name="schoolTransportQuestion"
              />
              <div>
                {specify === 'others' && (
                  <Controller
                    control={control}
                    render={({ field: { ...field } }) => (
                      <Input
                        {...field}
                        label="Specify here"
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.schoolTransportQuestionAlt
                            ? 'destructive'
                            : 'default'
                        }
                        message={
                          errors.schoolTransportQuestionAlt?.message ?? ''
                        }
                      />
                    )}
                    name="schoolTransportQuestionAlt"
                  />
                )}
              </div>
              <Controller
                control={control}
                render={({ field: { ...field } }: any) => (
                  <Select
                    placeholder="Select one"
                    label="In the last week were you involved in vigorous sports/activity in a way that made you sweat?"
                    labelStyle="lg:text-sm text-xs"
                    {...field}
                    options={sportQuestionOptions}
                    variant={errors?.sportQuestion ? 'destructive' : 'default'}
                    message={errors.sportQuestion?.message}
                  />
                )}
                name="sportQuestion"
              />
              <Controller
                control={control}
                render={({ field: { ...field } }) => (
                  <Input
                    {...field}
                    label="Average hours of sleep per day"
                    type="number"
                    labelStyle="lg:text-sm text-xs"
                    variant={errors?.hoursOnSleep ? 'destructive' : 'default'}
                    message={errors.hoursOnSleep && errors.hoursOnSleep.message}
                  />
                )}
                name="hoursOnSleep"
              />
              <Controller
                control={control}
                render={({ field: { ...field } }) => (
                  <Input
                    {...field}
                    label="Average hours spent watching TV/Video/Satellite in a day"
                    labelStyle="lg:text-sm text-xs"
                    type="number"
                    variant={errors?.hoursOnTv ? 'destructive' : 'default'}
                    message={errors.hoursOnTv && errors.hoursOnTv.message}
                  />
                )}
                name="hoursOnTv"
              />
              <Controller
                control={control}
                render={({ field: { ...field } }) => (
                  <Input
                    {...field}
                    label="Average hours spent with video games, computer/internet daily."
                    labelStyle="lg:text-sm text-xs"
                    type="number"
                    variant={
                      errors?.hoursOnComputer ? 'destructive' : 'default'
                    }
                    message={
                      errors.hoursOnComputer && errors.hoursOnComputer.message
                    }
                  />
                )}
                name="hoursOnComputer"
              />
            </div>
            <Button
              variant={'primary'}
              value="Save"
              type="submit"
              leadingIcon={<IconPicker icon="saveAdd" />}
              className="mt-6"
            />
          </PageCard>
        </div>
      </div>
    </form>
  )
}
