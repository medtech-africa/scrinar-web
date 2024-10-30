import React from 'react'
import Nutrition from './nutrition'
import PhysicalActivity from './physicalActivity'
import RiskyBehavior from './riskyBehaviour'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import { checkIfValueExists } from '@/utils/checkIfValueExist'
import {
  idealBodySizeBoysOptions,
  idealBodySizeGirlsOptions,
} from '@/types/studentsSurvey.types'

const Attitude = ({
  studentId,
  studentSurvey,
}: {
  studentId: string
  studentSurvey: any
}) => {
  const { setValue } = useCustomRegister(studentId)

  React.useEffect(() => {
    setValue('balancedDietImportance', studentSurvey?.balancedDietImportance)
    setValue('eatingHealthyFoods', studentSurvey?.eatingHealthyFoods)
    setValue('snackPreference', studentSurvey?.snackPreference)
    setValue(
      'idealBodySizeBoys',
      checkIfValueExists(
        idealBodySizeBoysOptions,
        studentSurvey?.idealBodySizeBoys,
        'idealBodySizeBoys',
        setValue
      )
    )
    setValue(
      'idealBodySizeGirls',
      checkIfValueExists(
        idealBodySizeGirlsOptions,
        studentSurvey?.idealBodySizeGirls,
        'idealBodySizeGirls',
        setValue
      )
    )
    //PhysicalActivity
    setValue('regularPhysicalActivity', studentSurvey?.regularPhysicalActivity)
    setValue(
      'barriersToPhysicalActivity',
      studentSurvey?.barriersToPhysicalActivity
    )
    setValue(
      'importanceOfPhysicalActivity',
      studentSurvey?.importanceOfPhysicalActivity
    )
    setValue('suitableActivitiesBoys', studentSurvey?.suitableActivitiesBoys)
    setValue('suitableActivitiesGirls', studentSurvey?.suitableActivitiesGirls)
    setValue(
      'sameTypesOfSportsAndActivities',
      studentSurvey?.sameTypesOfSportsAndActivities
    )
    setValue(
      'timeForPhysicalActivities',
      studentSurvey?.timeForPhysicalActivities
    )
    setValue(
      'moreOpportunitiesOutsideHouseChores',
      studentSurvey?.moreOpportunitiesOutsideHouseChores
    )
    //Risky Behaviour and Stress
    setValue('smokingRisks', studentSurvey?.smokingRisks)
    setValue('alcoholRisks', studentSurvey?.alcoholRisks)
    setValue('thoughtsOnSubstances', studentSurvey?.thoughtsOnSubstances)
    setValue(
      'importanceOfMentalHealth',
      studentSurvey?.importanceOfMentalHealth
    )
  }, [])
  return (
    <div className="flex flex-col gap-2">
      <Nutrition studentId={studentId} studentSurvey={studentSurvey} />

      <PhysicalActivity studentId={studentId} />

      <RiskyBehavior studentId={studentId} />
    </div>
  )
}

export default Attitude
