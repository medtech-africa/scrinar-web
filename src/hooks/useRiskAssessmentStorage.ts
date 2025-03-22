'use client'
import { deepMerge } from '@/utils/deepMerge'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type ParentSurveyStoreType = {
  data: {
    id: string
    formData: Record<string, any>
  }[]
  store: (id: string, data: Record<string, any>) => void
  get: (id: string, data?: Record<string, any>) => Record<string, any> | null
}

export const useRiskAssessmentStorage = create(
  persist<ParentSurveyStoreType>(
    (set, get) => ({
      data: [],
      store: (parentId: string, newData) => {
        const survey = get().data
        const dataMap = new Map(survey.map((item) => [item.id, item]))

        const parentData = dataMap.get(parentId)

        if (parentData) {
          parentData.formData = deepMerge(parentData.formData, newData)
          dataMap.set(parentId, parentData)
          set({ data: Array.from(dataMap.values()) })
        } else {
          dataMap.set(parentId, { id: parentId, formData: newData })
          set({ data: Array.from(dataMap.values()) })
        }
      },
      get: (parentId: string, defaultValues) => {
        const survey = get().data
        const parentData = survey.find(
          (surveyData) => surveyData.id === parentId
        )

        if (!parentData) {
          get().store(parentId, defaultValues || {})
        }

        return parentData?.formData ?? null
      },
    }),
    {
      name: 'ra_store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState, currentState) =>
        deepMerge(currentState, persistedState as Record<string, any>) as unknown as ParentSurveyStoreType,
    }
  )
)