import React from 'react'
import Nutrition from './nutrition'
import PhysicalActivity from './physicalActivity'
import RiskyBehavior from './riskyBehavior'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import { checkIfValueExists } from '@/utils/checkIfValueExist'
import {
  activityBenefitsOptions,
  dietConsequenceOptions,
  feelingsOfstressOptions,
  healthCheckupsImportanceOptions,
  smokingDrinkingEffectsOptions,
  stressSignsOptions,
  sweetsEffectOptions,
} from '@/types/studentsSurvey.types'

const Knowledge = ({
  studentId,
  studentSurvey,
}: {
  studentId: string
  studentSurvey: any
}) => {
  const { setValue } = useCustomRegister(studentId)

  React.useEffect(() => {
    setValue('balancedDiet', studentSurvey?.balancedDiet)
    setValue(
      'dietConsequence',
      checkIfValueExists(
        dietConsequenceOptions,
        studentSurvey?.dietConsequence,
        'dietConsequence',
        setValue
      )
    )
    setValue('carbExamples', studentSurvey?.carbExamples)
    setValue('proteinExamples', studentSurvey?.proteinExamples)
    setValue('fatExamples', studentSurvey?.fatExamples)
    setValue('vitaminExamples', studentSurvey?.vitaminExamples)
    setValue(
      'sweetsEffect',
      checkIfValueExists(
        sweetsEffectOptions,
        studentSurvey?.sweetsEffect,
        'sweetsEffect',
        setValue
      )
    )
    setValue('saltyFoodEffect', studentSurvey?.saltyFoodEffect)
    setValue('physicalActivity', studentSurvey?.physicalActivity)
    setValue(
      'activityBenefits',
      checkIfValueExists(
        activityBenefitsOptions,
        studentSurvey?.activityBenefits,
        'activityBenefits',
        setValue
      )
    )
    setValue('exerciseActivities', studentSurvey?.exerciseActivities)
    //PhysicalActivity
    setValue('fruitsVegetables', studentSurvey?.fruitsVegetables)
    setValue('snacksConsumption', studentSurvey?.snacksConsumption)
    setValue('sugaryBeverages', studentSurvey?.sugaryBeverages)
    setValue(
      'physicalActivityDuration',
      studentSurvey?.physicalActivityDuration
    )
    setValue('physicalActivityTypes', studentSurvey?.physicalActivityTypes)
    setValue('houseChoresFrequency', studentSurvey?.houseChoresFrequency)
    setValue('houseChoresTypes', studentSurvey?.houseChoresTypes)
    setValue(
      'outsidePhysicalActivitiesFrequency',
      studentSurvey?.outsidePhysicalActivitiesFrequency
    )
    setValue('mobileGamesHours', studentSurvey?.mobileGamesHours)
    setValue('tvGamesHours', studentSurvey?.tvGamesHours)
    setValue('bedtime', studentSurvey?.bedtime)
    setValue('wakeupTime', studentSurvey?.wakeupTime)
    setValue('doctorVisitsFrequency', studentSurvey?.doctorVisitsFrequency)
    setValue('copingMechanisms', studentSurvey?.copingMechanisms)
    setValue('stressFactors', studentSurvey?.stressFactors)
    //Risky Behaviour and Stress
    setValue(
      'smokingDrinkingEffects',
      checkIfValueExists(
        smokingDrinkingEffectsOptions,
        studentSurvey?.smokingDrinkingEffects,
        'smokingDrinkingEffects',
        setValue
      )
    )
    setValue(
      'healthCheckupsImportance',
      checkIfValueExists(
        healthCheckupsImportanceOptions,
        studentSurvey?.healthCheckupsImportance,
        'healthCheckupsImportance',
        setValue
      )
    )
    setValue('stressCauses', studentSurvey?.stressCauses)
    setValue(
      'feelingsOfstress',
      checkIfValueExists(
        feelingsOfstressOptions,
        studentSurvey?.feelingsOfstress,
        'feelingsOfstress',
        setValue
      )
    )
    setValue(
      'stressSigns',
      checkIfValueExists(
        stressSignsOptions,
        studentSurvey?.stressSigns,
        'stressSigns',
        setValue
      )
    )
  }, [
    setValue,
    studentSurvey?.balancedDiet,
    studentSurvey?.dietConsequence,
    studentSurvey?.carbExamples,
    studentSurvey?.proteinExamples,
    studentSurvey?.fatExamples,
    studentSurvey?.vitaminExamples,
    studentSurvey?.sweetsEffect,
    studentSurvey?.saltyFoodEffect,
    studentSurvey?.physicalActivity,
    studentSurvey?.activityBenefits,
    studentSurvey?.exerciseActivities,
    //PhysicalActivity
    studentSurvey?.fruitsVegetables,
    studentSurvey?.snacksConsumption,
    studentSurvey?.sugaryBeverages,
    studentSurvey?.physicalActivityDuration,
    studentSurvey?.physicalActivityTypes,
    studentSurvey?.houseChoresFrequency,
    studentSurvey?.houseChoresTypes,
    studentSurvey?.outsidePhysicalActivitiesFrequency,
    studentSurvey?.mobileGamesHours,
    studentSurvey?.tvGamesHours,
    studentSurvey?.bedtime,
    studentSurvey?.wakeupTime,
    studentSurvey?.doctorVisitsFrequency,
    studentSurvey?.copingMechanisms,
    studentSurvey?.stressFactors,
    //Risky Behaviour and Stress
    studentSurvey?.smokingDrinkingEffects,
    studentSurvey?.healthCheckupsImportance,
    studentSurvey?.stressCauses,
    studentSurvey?.feelingsOfstress,
    studentSurvey?.stressSigns,
  ])
  return (
    <div className="flex flex-col gap-2">
      <Nutrition studentId={studentId} studentSurvey={studentSurvey} />

      <PhysicalActivity studentId={studentId} />

      <RiskyBehavior studentId={studentId} />
    </div>
  )
}

export default Knowledge
