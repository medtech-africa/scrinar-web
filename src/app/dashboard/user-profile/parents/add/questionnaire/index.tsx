import React, { useEffect } from 'react'

import * as Tabs from '@radix-ui/react-tabs'
import { useFieldArray, useForm } from 'react-hook-form'

import { ParentFormData } from '@/types/questionnaire.types'

import { DemographicsSection } from './demographics-section'
import KAPSurvey from './kap-survey'
import { cn } from '@/lib/utils'

const triggerClassName = cn(
  'text-sm text-grey-700 py-2.2 px-4 transition-all cursor-pointer',
  'data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-grey-900'
)
const Questionnaire = ({
  onSubmit: onSubmitt,
  addLoading = false,
  resetFields = false,
  parent,
}: {
  onSubmit: (healthData: any) => void
  addLoading: boolean
  resetFields: boolean
  parent: {
    gender: string
    age: number
  }
}) => {
  console.log(parent, onSubmitt, addLoading, resetFields)
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ParentFormData>({})

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'children',
  })

  //   useEffect(() => {
  //     const subscription = watch((data) => {
  //       localStorage.setItem('parentQuestionnaireData+id', JSON.stringify(data));
  //     });
  //     return () => subscription.unsubscribe();
  //   }, [watch]);

  const noOfChildren = watch('noOfChildren')

  useEffect(() => {
    let length = noOfChildren - fields.length
    if (length > 0) {
      Array.from({ length }, () =>
        append({
          age: 0,
          gender: { label: 'Male', value: 'male' },
          inSchool: false,
        })
      )
    } else if (length < 0) {
      length *= -1
      Array.from({ length }, () => remove(noOfChildren - 1))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noOfChildren, fields])

  const onSubmit = () => {}

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs.Root className="TabsRoot" defaultValue="demographics">
          <Tabs.List className="mb-4" aria-label="Parent Questionnaire">
            <Tabs.Trigger className={triggerClassName} value="demographics">
              Demographics
            </Tabs.Trigger>
            <Tabs.Trigger className={triggerClassName} value="kap-survey">
              KAP Survey
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="demographics">
            <DemographicsSection
              control={control}
              watch={watch}
              errors={errors}
              fields={fields}
            />
          </Tabs.Content>
          <Tabs.Content value="kap-survey">
            <KAPSurvey control={control} watch={watch} errors={errors} />
          </Tabs.Content>
        </Tabs.Root>
      </form>
    </div>
  )
}

export default Questionnaire
