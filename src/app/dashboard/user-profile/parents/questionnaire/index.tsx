import React, { useEffect, useMemo, useRef } from 'react'

import * as Tabs from '@radix-ui/react-tabs'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

import { ParentFormData } from '@/types/questionnaire.types'

import { DemographicsSection } from './demographics-section'
import KAPSurvey from './kap-survey'
import { cn } from '@/lib/utils'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import { UseMutateFunction, useMutation } from '@tanstack/react-query'
import { errorMessage } from '@/utils/errorMessage'
import toast from 'react-hot-toast'
import { cleanFormData } from '@/utils/parentQuestionnaire'
import _ from 'lodash'
import { AxiosResponse } from 'axios'
import { Button } from '@/components/ui/button'
import {
  NonCommunicableDiseaseQuestions,
  ParentNutritionSurvey,
  ParentSurveyHealthAndHygiene,
  ParentSurveyHealthServicesHealthMaintenance,
  ParentSurveyIdealBody,
  ParentSurveyPhysicalActivity,
  ParentSurveyRiskyBehaviourStress,
  ParentGenderHouseHoldRoles,
  ParentSurveyNcdRiskFactors,
} from '@/components/parent-survey'
import { useParentQuestionnaire } from '@/hooks/queries/useParents'
import ContentLoader from '@/components/content-loader'
import {
  // useLocalParentSurvey,
  useLocalParentSurveyStore,
} from '@/hooks/useLocalParentSurvey'

type FormAutoSaveProps = {
  parentId: string
  mutateQuestionnaire: UseMutateFunction<
    AxiosResponse<any, any>,
    Error,
    {
      id: string
      data: any
    },
    unknown
  >
  defaultValues?: { [x: string]: any }
  debounceMs: number
}

const triggerClassName = cn(
  'text-sm text-grey-700 py-2.2 px-4 transition-all cursor-pointer',
  'data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-grey-900'
)

// Function to get changed fields between two objects
const getChangedFields = (
  oldData: any,
  newData: any,
  path: string[] = []
): Record<string, any> => {
  const changes: Record<string, any> = {}

  // Helper to check if a value has actually changed
  const hasValueChanged = (oldVal: any, newVal: any) =>
    JSON.stringify(oldVal) !== JSON.stringify(newVal)

  for (const key in newData) {
    const newPath = [...path, key]
    const newValue = newData[key]
    const oldValue = oldData?.[key]

    if (
      typeof newValue === 'object' &&
      newValue !== null &&
      !Array.isArray(newValue)
    ) {
      // Handle nested objects
      const nestedChanges = getChangedFields(oldValue || {}, newValue, newPath)
      if (Object.keys(nestedChanges).length > 0) {
        changes[key] = nestedChanges
      }
    } else if (hasValueChanged(oldValue, newValue)) {
      // Handle primitive values and arrays
      changes[key] = newValue
    }
  }

  return changes
}

const useFormWithAutoSave = ({
  parentId,
  mutateQuestionnaire,
  defaultValues = {},
  debounceMs = 1000, // Default debounce time
}: FormAutoSaveProps) => {
  const form = useForm<ParentFormData>({
    defaultValues,
  })
  // const { storeParentSurvey, getParentSurvey } = useLocalParentSurvey()
  const storeSurvey = useLocalParentSurveyStore(
    (state) => state.storeParentSurvey
  )
  const getSurvey = useLocalParentSurveyStore((state) => state.getParentSurvey)

  // Store previous values to compare changes
  const previousValues = useRef<Record<string, any>>({})

  // Watch for changes
  useEffect(() => {
    const debouncedSave = _.debounce((changedData: Record<string, any>) => {
      const cleanedData = cleanFormData(changedData)

      if (Object.keys(cleanedData).length > 0) {
        storeSurvey(parentId, cleanedData)
        const dataToSend = getSurvey(parentId)

        mutateQuestionnaire(
          {
            id: parentId,
            data: dataToSend,
          },
          {
            onSuccess: () => {
              // Update previous values after successful save
              previousValues.current = {
                ...previousValues.current,
                ...changedData,
              }
            },
          }
        )
      }
    }, debounceMs)

    const subscription = form.watch((formData, { name }) => {
      if (!name || !formData || name === 'noOfChildren') return

      // Get only the changed fields
      const changedFields = getChangedFields(previousValues.current, formData)

      if (Object.keys(changedFields).length > 0) {
        debouncedSave(changedFields)
      }
    })

    return () => {
      subscription.unsubscribe()
      debouncedSave.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return form
}

const ParentQuestionnairePage = ({
  parentId,
  gender,
  hasDefault = false,
  questionnaireData = {},
}: {
  parentId: string
  gender: string
  hasDefault?: boolean
  questionnaireData: any
}) => {
  const { isPending, mutate: mutateQuestionnaire } = useMutation({
    mutationFn: (data: {
      id: string
      data: Record<string, string | object>
    }) => {
      delete data?.data?.createdAt
      delete data?.data?.updatedAt
      delete data?.data?.parent
      delete data?.data?.id
      return baseAxios.patch(API.parentQuestionnaire(data.id), data.data)
    },
  })

  const { isPending: qIsLoading } = useParentQuestionnaire(parentId)

  const formMethods = useFormWithAutoSave({
    parentId,
    mutateQuestionnaire,
    debounceMs: 2000, // Adjust as needed
    defaultValues: questionnaireData,
  })

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = formMethods

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'children',
  })

  const noOfChildren = watch('noOfChildren')

  const debouncedUpdate = useMemo(
    () =>
      _.debounce((length) => {
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
      }, 1000), // 1000ms delay
    [append, remove, noOfChildren]
  )

  useEffect(() => {
    const length = noOfChildren - fields.length
    debouncedUpdate(length)

    return () => {
      debouncedUpdate.cancel()
    }
  }, [noOfChildren, fields.length, debouncedUpdate])

  const onSubmit = (data: any) => {
    const questionnaire = cleanFormData(data)
    const dataToSend = {
      id: parentId,
      data: questionnaire,
    }
    mutateQuestionnaire(dataToSend, {
      onSuccess: () => {
        toast.success('Saved')
      },
      onError: (err) => {
        errorMessage(err)
      },
    })
  }

  if (qIsLoading && hasDefault) {
    return (
      <>
        <p className="my-4 text-center">Loading..</p>
        <ContentLoader loading />
      </>
    )
  }

  return (
    <div>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs.Root className="TabsRoot" defaultValue="demographics">
            <Tabs.List className="mb-4" aria-label="Parent Questionnaire">
              <Tabs.Trigger className={triggerClassName} value="demographics">
                Demographics
              </Tabs.Trigger>
              {/* <Tabs.Trigger className={triggerClassName} value="kap-survey">
                KAP Survey
              </Tabs.Trigger> */}
              <Tabs.Trigger className={triggerClassName} value="ncd-knowledge">
                NCD Knowledge
              </Tabs.Trigger>
              <Tabs.Trigger className={triggerClassName} value="nutrition">
                Nutrition
              </Tabs.Trigger>
              <Tabs.Trigger
                className={triggerClassName}
                value="physical-activity"
              >
                Physical activity
              </Tabs.Trigger>
              <Tabs.Trigger className={triggerClassName} value="ideal-body">
                Ideal body
              </Tabs.Trigger>
              <Tabs.Trigger
                className={triggerClassName}
                value="risky-behavior-stress"
              >
                Risky Behavior / Stress
              </Tabs.Trigger>
              <Tabs.Trigger
                className={triggerClassName}
                value="health-sanitation-maintenance"
              >
                Health serv. & maintenance
              </Tabs.Trigger>
              <Tabs.Trigger className={triggerClassName} value="health-hygiene">
                Health & Hygiene
              </Tabs.Trigger>
              <Tabs.Trigger
                className={triggerClassName}
                value="ncd-risks-family"
              >
                NCD Risks in honest Family
              </Tabs.Trigger>
              <Tabs.Trigger
                className={triggerClassName}
                value="gender-household-roles"
              >
                Gender & Household Roles
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="demographics">
              <DemographicsSection
                control={control}
                watch={watch}
                errors={errors}
                fields={fields}
                gender={gender}
              />
            </Tabs.Content>
            <Tabs.Content value="kap-survey">
              <KAPSurvey control={control} watch={watch} errors={errors} />
            </Tabs.Content>
            <Tabs.Content value="ncd-knowledge">
              <NonCommunicableDiseaseQuestions />
            </Tabs.Content>
            <Tabs.Content value="nutrition">
              <ParentNutritionSurvey isFemale={gender === 'female'} />
            </Tabs.Content>
            <Tabs.Content value="physical-activity">
              <ParentSurveyPhysicalActivity />
            </Tabs.Content>
            <Tabs.Content value="ideal-body">
              <ParentSurveyIdealBody />
            </Tabs.Content>
            <Tabs.Content value="risky-behavior-stress">
              <ParentSurveyRiskyBehaviourStress />
            </Tabs.Content>
            <Tabs.Content value="health-sanitation-maintenance">
              <ParentSurveyHealthServicesHealthMaintenance gender={gender} />
            </Tabs.Content>
            <Tabs.Content value="health-hygiene">
              <ParentSurveyHealthAndHygiene />
            </Tabs.Content>

            <Tabs.Content value="ncd-risks-family">
              <ParentSurveyNcdRiskFactors />
            </Tabs.Content>
            <Tabs.Content value="gender-household-roles">
              <ParentGenderHouseHoldRoles />
            </Tabs.Content>
          </Tabs.Root>
          <Button
            variant={'primary'}
            value="Done"
            type="submit"
            className="mt-6"
            disabled={isPending}
          />
        </form>
      </FormProvider>
    </div>
  )
}
const ParentQuestionnaire = ({
  parentId,
  gender,
  hasDefault = true,
}: {
  parentId: string
  gender: string
  hasDefault?: boolean
}) => {
  const { data: questionnaireData, isPending: qIsLoading } =
    useParentQuestionnaire(parentId, {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    })

  // const { storeParentSurvey, getParentSurvey } = useLocalParentSurvey()
  const storeSurvey = useLocalParentSurveyStore(
    (state) => state.storeParentSurvey
  )
  const getSurvey = useLocalParentSurveyStore((state) => state.getParentSurvey)

  const formData = getSurvey(parentId, questionnaireData)

  useEffect(() => {
    if (questionnaireData) {
      storeSurvey(parentId, questionnaireData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionnaireData, parentId])

  if (qIsLoading && hasDefault) {
    return (
      <>
        <p className="my-4 text-center">Loading..</p>
        <ContentLoader loading />
      </>
    )
  }

  const isLocalFormNotEmpty = formData && Object.keys(formData).length > 0

  return (
    <ParentQuestionnairePage
      key={
        isLocalFormNotEmpty ? 'parent-survey-present' : 'parent-survey-absent'
      }
      {...{ parentId, gender, hasDefault, questionnaireData: formData }}
    />
  )
}

export { ParentQuestionnaire }
