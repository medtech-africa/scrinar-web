'use client'
import { deepMerge } from '@/utils/deepMerge'
import { useLocalStorage } from 'usehooks-ts'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type ParentSurveyStoreType = {
  data: {
    id: string
    formData: object
  }[]
  storeParentSurvey: (id: string, data: object) => void
  getParentSurvey: (id: string, data: object) => object | null
}

export const useLocalParentSurveyStore = create(
  persist<ParentSurveyStoreType>(
    (set, get) => ({
      data: [],
      storeParentSurvey: (parentId: string, newData) => {
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
      getParentSurvey: (parentId: string) => {
        const survey = get().data
        const parentData = survey.find(
          (surveyData) => surveyData.id === parentId
        )

        return parentData?.formData ?? null
      },
    }),
    {
      name: 'parents_survey_store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
)

type StudentSurveyStoreType = {
  data: {
    id: string
    formData: object
  }[]
  storeStudentSurvey: (id: string, data: object) => void
  getStudentSurvey: (id: string, data: object) => object | null
}

export const useLocalStudentSurveyStore = create(
  persist<StudentSurveyStoreType>(
    (set, get) => ({
      data: [],
      storeStudentSurvey: (id: string, newData) => {
        const survey = get().data
        const dataMap = new Map(survey.map((item) => [item.id, item]))

        const parentData = dataMap.get(id)

        if (parentData) {
          parentData.formData = deepMerge(parentData.formData, newData)
          dataMap.set(id, parentData)
          set({ data: Array.from(dataMap.values()) })
        } else {
          dataMap.set(id, { id: id, formData: newData })
          set({ data: Array.from(dataMap.values()) })
        }
      },
      getStudentSurvey: (id: string) => {
        const survey = get().data
        const parentData = survey.find((surveyData) => surveyData.id === id)

        return parentData?.formData ?? null
      },
    }),
    {
      name: 'students_survey_store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useLocalParentSurvey = () => {
  const [survey, setSurvey] = useLocalStorage<
    {
      id: string
      formData: object
    }[]
  >(`parents_survey`, [])

  const getParentSurvey = (parentId: string) => {
    const parentData = survey.find((surveyData) => surveyData.id === parentId)

    return parentData?.formData
  }

  const storeParentSurvey = (parentId: string, data: any) => {
    const dataMap = new Map(survey.map((item) => [item.id, item]))

    const parentData = dataMap.get(parentId)
    // const parentData = survey.find((surveyData) => surveyData.id === parentId)

    // Add or update the Map with the new item
    // dataMap.set(newItem.id, newItem);

    if (parentData) {
      parentData.formData = deepMerge(parentData.formData, data)

      dataMap.set(parentId, parentData)

      setSurvey(Array.from(dataMap.values()))

      // udpate the array with the updated element
      // setSurvey((prevData) => {
      //   const index = prevData.findIndex(
      //     (surveyData) => surveyData.id === parentId
      //   )
      //   prevData[index] = parentData
      //   return prevData
      // })
    } else {
      dataMap.set(parentId, { id: parentId, formData: data })

      setSurvey(Array.from(dataMap.values()))

      // setSurvey((prevData) => {
      //   return [...prevData, { id: parentId, formData: data }]
      // })
    }

    return survey
  }

  return {
    getParentSurvey,
    storeParentSurvey,
  }
}

export const useLocalStudentSurvey = () => {
  const [survey, setSurvey] = useLocalStorage<
    {
      id: string
      formData: object
    }[]
  >(`student_survey`, [])

  const getStudentSurvey = (parentId: string, defaultData?: object) => {
    const parentData = survey.find((surveyData) => surveyData.id === parentId)

    if (!parentData && defaultData) {
      storeStudentSurvey(parentId, defaultData)
    }

    return parentData?.formData || defaultData
  }

  const storeStudentSurvey = (parentId: string, data: any) => {
    if (!parentId) return {}

    const parentData = survey.find((surveyData) => surveyData.id === parentId)

    if (!parentData) {
      setSurvey((prevData) => {
        return [...prevData, { id: parentId, formData: data }]
      })
      return
    }

    if (parentData) {
      parentData.formData = deepMerge(parentData.formData, data)
      // update the array with the updated element
      setSurvey((prevData) => {
        const index = prevData.findIndex(
          (surveyData) => surveyData.id === parentId
        )
        prevData[index] = parentData
        return prevData
      })
    }

    return parentData
  }

  return {
    getStudentSurvey,
    storeStudentSurvey,
  }
}
