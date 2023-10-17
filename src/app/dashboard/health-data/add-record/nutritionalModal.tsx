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

interface IProps {
  setNutritionalData: (val: IDataToSend) => void
  onClose: () => void
}
interface IFormValue {
  school_transport_question: { value: string; label: string }
  sport_question: { value: string; label: string }
  hours_on_sleep: number
  hours_on_tv: number
  hours_on_computer: number
  school_transport_question_alt?: string
}
interface IDataToSend
  extends Omit<IFormValue, 'sport_question' | 'school_transport_question'> {
  sport_question: string
  school_transport_question: string | undefined
}
export const NutritionalModal = ({ setNutritionalData, onClose }: IProps) => {
  const [specify, setSpecify] = useState('')
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValue>({
    resolver: validation.nutritional,
    defaultValues: {},
  })

  const onSubmit = async (data: IFormValue) => {
    const { school_transport_question_alt: _, ...filteredData } =
      filterObject(data)

    const dataToSend = {
      ...filteredData,
      school_transport_question:
        specify === 'others'
          ? data?.school_transport_question_alt
          : data?.school_transport_question?.value,
      sport_question: data?.sport_question?.value,
    }
    if (dataToSend) {
      setNutritionalData(dataToSend)
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
                      errors?.school_transport_question
                        ? 'destructive'
                        : 'default'
                    }
                    message={
                      errors.school_transport_question &&
                      errors.school_transport_question?.message
                    }
                  />
                )}
                name="school_transport_question"
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
                          errors?.school_transport_question_alt
                            ? 'destructive'
                            : 'default'
                        }
                        message={
                          errors.school_transport_question_alt &&
                          errors.school_transport_question_alt.message
                        }
                      />
                    )}
                    name="school_transport_question_alt"
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
                    variant={errors?.sport_question ? 'destructive' : 'default'}
                    message={errors.sport_question?.message}
                  />
                )}
                name="sport_question"
              />
              <Controller
                control={control}
                render={({ field: { ...field } }) => (
                  <Input
                    {...field}
                    label="Average hours of sleep per day"
                    type="number"
                    labelStyle="lg:text-sm text-xs"
                    variant={errors?.hours_on_sleep ? 'destructive' : 'default'}
                    message={
                      errors.hours_on_sleep && errors.hours_on_sleep.message
                    }
                  />
                )}
                name="hours_on_sleep"
              />
              <Controller
                control={control}
                render={({ field: { ...field } }) => (
                  <Input
                    {...field}
                    label="Average hours spent watching TV/Video/Satellite in a day"
                    labelStyle="lg:text-sm text-xs"
                    type="number"
                    variant={errors?.hours_on_tv ? 'destructive' : 'default'}
                    message={errors.hours_on_tv && errors.hours_on_tv.message}
                  />
                )}
                name="hours_on_tv"
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
                      errors?.hours_on_computer ? 'destructive' : 'default'
                    }
                    message={
                      errors.hours_on_computer &&
                      errors.hours_on_computer.message
                    }
                  />
                )}
                name="hours_on_computer"
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
