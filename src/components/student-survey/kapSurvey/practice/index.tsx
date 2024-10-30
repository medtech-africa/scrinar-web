import React from 'react'
import Nutrition from './nutrition'
import PhysicalActivity from './physicalActivity'
import RiskyBehavior from './riskyBehavior'
import { useCustomRegister } from '@/hooks/useCustomRegister'

const Practice = ({
  studentId,
  studentSurvey,
}: {
  studentId: string
  studentSurvey: any
}) => {
  const { setValue } = useCustomRegister(studentId)

  React.useEffect(() => {
    setValue(
      'fruitsAndVegetablesFrequency',
      studentSurvey?.fruitsAndVegetablesFrequency
    )
    setValue(
      'snackConsumptionFrequency',
      studentSurvey?.snackConsumptionFrequency
    )
    setValue(
      'sugarySnacksBeveragesFrequency',
      studentSurvey?.sugarySnacksBeveragesFrequency
    )

    //PhysicalActivity
    setValue(
      'physicalActivityFrequency',
      studentSurvey?.physicalActivityFrequency
    )
    setValue('engagementDuration', studentSurvey?.engagementDuration)
    setValue('favoriteActivities', studentSurvey?.favoriteActivities)

    setValue(
      'houseChoresFrequencyParticipation',
      studentSurvey?.houseChoresFrequencyParticipation
    )
    setValue('physicalChores', studentSurvey?.physicalChores)
    setValue(
      'outdoorActivitiesFrequency',
      studentSurvey?.outdoorActivitiesFrequency
    )
    setValue('averageMobileGames', studentSurvey?.averageMobileGames)
    setValue('averageTVHours', studentSurvey?.averageTVHours)
    setValue('bedtimeAtNight', studentSurvey?.bedtimeAtNight)
    setValue('wakeUpTime', studentSurvey?.wakeUpTime)
    //Risky Behaviour and Stress
    setValue('doctorVisitFrequency', studentSurvey?.doctorVisitFrequency)
    setValue('makesFeelBetter', studentSurvey?.makesFeelBetter)
    setValue('stressors', studentSurvey?.stressors)
    setValue('everSmoked', studentSurvey?.everSmoked)
    setValue('currentSmoking', studentSurvey?.currentSmoking)
    setValue('everTakenAlcohol', studentSurvey?.everTakenAlcohol)
    setValue('currentAlcohol', studentSurvey?.currentAlcohol)
  }, [])
  return (
    <div className="flex flex-col gap-2">
      <Nutrition studentId={studentId} />

      <PhysicalActivity studentId={studentId} />

      <RiskyBehavior studentId={studentId} />
    </div>
  )
}

export default Practice
