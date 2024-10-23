import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import validation from '@/constants/validation'
import { ToastField } from '@/components/ui/toast'
import toast from 'react-hot-toast'
import { IStudentsSurveyData } from '@/types/studentsSurvey.types'
import DemographicData from '@/components/student-survey/demographicData'
import KAPSurvey from '@/components/student-survey/kapSurvey'
import RiskyBehavior from '@/components/student-survey/riskyBehavior'
import Attitude from '@/components/student-survey/attitude'
import Nutrition from '@/components/student-survey/nutrition'
import { IconPicker } from '@/components/ui/icon-picker'

// const SelectedOption = {
//   value: '',
//   label: '',
// }
export const Survey = ({ onClose }: { onClose: () => void }) => {
  const [ethnicitySpecify, setEthnicitySpecify] = useState('')
  const [religionSpecify, setReligionSpecify] = useState('')
  const [healthProblemSpecify, setHealthProblemSpecify] = useState('')
  const [dietConsequenceSpecify, setDietConsequenceSpecify] = useState('')
  const [sweetsEffectSpecify, setSweetsEffectSpecify] = useState('')
  const [saltyFoodEffectSpecify, setSaltyFoodEffectSpecify] = useState('')
  const [activityBenefitsSpecify, setActivityBenefitsSpecify] = useState('')
  const [smokingDrinkingSpecify, setSmokingDrinkingSpecify] = useState('')
  const [healthCheckupsSpecify, setHealthCheckupsSpecify] = useState('')
  const [feelingsOfStressSpecify, setFeelingsOfStressSpecify] = useState('')
  const [stressSignsSpecify, setStressSignsSpecify] = useState('')
  const [idealBodySizeBoysSpecify, setIdealBodySizeBoysSpecify] = useState('')
  const [idealBodySizeGirlsSpecify, setIdealBodySizeGirlsSpecify] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IStudentsSurveyData>({
    resolver: validation.survey,
    defaultValues: {
      gender: { value: '', label: '' },
      age: undefined,
      birthday: '',
      ethnicity: { value: '', label: '' },
      religion: { value: '', label: '' },
      classLevel: { value: '', label: '' },
      distanceToSchool: { value: '', label: '' },
      yearsAtSchool: { value: '', label: '' },
      communityName: '',
      numberOfChildren: undefined,
      siblingPosition: { value: '', label: '' },
      livingSituation: { value: '', label: '' },
      healthStatus: { value: '', label: '' },
      healthProblems: { value: '', label: '' },
      hpvVaccine: { value: '', label: '' },
      fatherOccupation: '',
      motherOccupation: '',
      balancedDiet: '',
      physicalActivity: '',
      smokingDrinkingEffects: { value: '', label: '' },
      feelingsOfstress: {
        value: '',
        label: '',
      },
      healthCheckupsImportance: {
        value: '',
        label: '',
      },
      stressCauses: [],
      stressSigns: {
        value: '',
        label: '',
      },
      stressEffects: '',
      bodySizeBoys: '',
      bodySizeGirls: '',
      physicalActivityFrequency: '',
      doctorVisits: '',
      dietConsequence: '',
      carbExamples: '',
      proteinExamples: '',
      fatExamples: '',
      vitaminExamples: '',
      sweetsEffect: '',
      saltyFoodEffect: '',
      dietConsequenceSpecify: '',
      activityBenefits: '',
      exerciseActivities: [],
      sweetsEffectSpecify: '',
      saltyFoodEffectSpecify: '',
      activityBenefitsSpecify: '',
      smokingDrinkingEffectsSpecify: '',
      healthCheckupsImportanceSpecify: '',
      feelingsOfstressSpecify: '',
      stressSignsSpecify: '',
      balancedDietImportance: {
        value: '',
        label: '',
      },
      eatingHealthyFoods: {
        value: '',
        label: '',
      },
      snackPreference: {
        value: '',
        label: '',
      },
      idealBodySizeBoys: {
        value: '',
        label: '',
      },
      idealBodySizeBoysSpecify: '',
      idealBodySizeGirls: {
        value: '',
        label: '',
      },
      idealBodySizeGirlsSpecify: '',
      regularPhysicalActivity: {
        value: '',
        label: '',
      },
      barriersToPhysicalActivity: '',
      importanceOfPhysicalActivity: {
        value: '',
        label: '',
      },
      suitableActivitiesBoys: '',
      suitableActivitiesGirls: '',
      fruitsVegetables: {
        value: '',
        label: '',
      },
      snacksConsumption: {
        value: '',
        label: '',
      },
      sugaryBeverages: {
        value: '',
        label: '',
      },
      physicalActivityDuration: {
        value: '',
        label: '',
      },
      physicalActivityTypes: [],
      houseChoresFrequency: {
        value: '',
        label: '',
      },
      houseChoresTypes: [],
      outsidePhysicalActivitiesFrequency: {
        value: '',
        label: '',
      },
      mobileGamesHours: '',
      tvGamesHours: '',
      bedtime: '',
      wakeupTime: '',
      doctorVisitsFrequency: {
        value: '',
        label: '',
      },
      copingMechanisms: [],
      stressFactors: [],
      smokingHistory: {
        value: '',
        label: '',
      },
      currentSmoking: {
        value: '',
        label: '',
      },
      alcoholHistory: {
        value: '',
        label: '',
      },
      currentAlcohol: {
        value: '',
        label: '',
      },
    },
  })

  const onSubmit = (data: IStudentsSurveyData) => {
    if (
      !data.gender ||
      !data.age ||
      !data.birthday ||
      !data.ethnicity ||
      !data.religion ||
      !data.classLevel ||
      !data.distanceToSchool ||
      !data.yearsAtSchool
    ) {
      return toast.custom(
        <ToastField
          variant="warning2"
          label="Please fill all the required fields"
          action1={() => toast.remove()}
        />
      )
    }

    toast.success('Form successfully submitted!')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 py-7 mt-2">
        <DemographicData
          control={control}
          errors={errors}
          setEthnicitySpecify={setEthnicitySpecify}
          setReligionSpecify={setReligionSpecify}
          setHealthProblemSpecify={setHealthProblemSpecify}
          ethnicitySpecify={ethnicitySpecify}
          religionSpecify={religionSpecify}
          healthProblemSpecify={healthProblemSpecify}
        />
        <KAPSurvey
          control={control}
          errors={errors}
          setDietConsequenceSpecify={setDietConsequenceSpecify}
          setSweetsEffectSpecify={setSweetsEffectSpecify}
          setSaltyFoodEffectSpecify={setSaltyFoodEffectSpecify}
          setActivityBenefitsSpecify={setActivityBenefitsSpecify}
          dietConsequenceSpecify={dietConsequenceSpecify}
          sweetsEffectSpecify={sweetsEffectSpecify}
          saltyFoodEffectSpecify={saltyFoodEffectSpecify}
          activityBenefitsSpecify={activityBenefitsSpecify}
        />
        <RiskyBehavior
          control={control}
          errors={errors}
          setSmokingDrinkingSpecify={setSmokingDrinkingSpecify}
          smokingDrinkingSpecify={smokingDrinkingSpecify}
          setStressSignsSpecify={setStressSignsSpecify}
          stressSignsSpecify={stressSignsSpecify}
          healthCheckupsSpecify={healthCheckupsSpecify}
          setHealthCheckupsSpecify={setHealthCheckupsSpecify}
          setFeelingsOfStressSpecify={setFeelingsOfStressSpecify}
          feelingsOfStressSpecify={feelingsOfStressSpecify}
        />
        <Attitude
          control={control}
          errors={errors}
          setIdealBodySizeBoysSpecify={setIdealBodySizeBoysSpecify}
          setIdealBodySizeGirlsSpecify={setIdealBodySizeGirlsSpecify}
          idealBodySizeBoysSpecify={idealBodySizeBoysSpecify}
          idealBodySizeGirlsSpecify={idealBodySizeGirlsSpecify}
        />
        <Nutrition control={control} errors={errors} />
        <div>
          <Button
            variant={'primary'}
            value="Save"
            type="submit"
            leadingIcon={<IconPicker icon="saveAdd" />}
            className="mt-6"
          />
        </div>
      </div>
    </form>
  )
}
