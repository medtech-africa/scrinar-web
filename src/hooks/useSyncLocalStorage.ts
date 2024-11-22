import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { useLocalParentSurveyStore } from './useLocalParentSurvey'
import { useEffect } from 'react'

export const useSyncLocalStorage = () => {
  const allSurvey = useLocalParentSurveyStore((state) => state.data)

  const syncForm = (data: { id: string; formData: object }) => {
    //   @ts-expect-error createdAt
    delete data?.formData?.createdAt
    //   @ts-expect-error updatedAt
    delete data?.formData?.updatedAt
    //   @ts-expect-error parent
    delete data?.formData?.parent
    //   @ts-expect-error id for the parent
    delete data?.formData?.id

    return baseAxios.patch(API.parentQuestionnaire(data.id), data.formData)
  }

  useEffect(() => {
    if (allSurvey.length > 0) {
      const allSurveyArray = Object.values(allSurvey)
      //   allSurveyArray.forEach((survey) => {
      //     syncForm(survey)
      //   })
      // use promise.all settled instead
      Promise.allSettled(allSurveyArray.map((survey) => syncForm(survey))).then(
        (results) => {
          console.log('results', results)
        }
      )
    }
  }, [])
}
