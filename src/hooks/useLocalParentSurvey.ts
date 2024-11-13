'use client'
import { deepMerge } from '@/utils/deepMerge'
import { useLocalStorage } from 'usehooks-ts'

export const useLocalParentSurvey = () => {
  const [survey, setSurvey] = useLocalStorage<
    {
      id: string
      formData: object
    }[]
  >(`parent_survey`, [])

  const getParentSurvey = (parentId: string) => {
    const parentData = survey.find((surveyData) => surveyData.id === parentId)

    return parentData?.formData
  }

  const storeParentSurvey = (parentId: string, data: any) => {
    const parentData = survey.find((surveyData) => surveyData.id === parentId)

    if (parentData) {
      parentData.formData = deepMerge(parentData.formData, data)
      // udpate the array with the updated element
      setSurvey((prevData) => {
        const index = prevData.findIndex(
          (surveyData) => surveyData.id === parentId
        )
        prevData[index] = parentData
        return prevData
      })
    } else {
      setSurvey((prevData) => {
        return [...prevData, { id: parentId, formData: data }]
      })
    }

    return parentData
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
