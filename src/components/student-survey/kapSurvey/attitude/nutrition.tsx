import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React from 'react'
import { useCustomRegister } from '@/hooks/useCustomRegister'

const Nutrition = ({
  studentId,
  // studentSurvey,
}: {
  studentId: string
  // studentSurvey: any
}) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)
  // useEffect(() => {
  //   setValue('gender', studentSurvey?.gender)
  //   setValue('age', studentSurvey?.age)
  //   setValue('ethnicity', studentSurvey?.ethnicity)
  //   setValue('ethnicityOther', studentSurvey?.ethnicityOther)
  //   setValue('religion', studentSurvey?.religion)
  //   setValue('religionOther', studentSurvey?.religionOther)
  //   setValue('classLevel', studentSurvey?.classLevel)
  //   setValue('distanceToSchool', studentSurvey?.distanceToSchool)
  //   setValue('fatherOccupation', studentSurvey?.fatherOccupation)
  //   setValue('healthStatus', studentSurvey?.healthStatus)
  //   setValue('healthStatusOther', studentSurvey?.healthStatusOther)
  //   setValue('livingSituation', studentSurvey?.livingSituation)
  //   setValue('livingSituationOther', studentSurvey?.livingSituationOther)
  //   setValue('siblingPosition', studentSurvey?.siblingPosition)
  //   setValue('yearsAtSchool', studentSurvey?.yearsAtSchool)
  // }, [
  //   setValue,
  //   studentSurvey?.age,
  //   studentSurvey?.classLevel,
  //   studentSurvey?.distanceToSchool,
  //   studentSurvey?.ethnicity,
  //   studentSurvey?.ethnicityOther,
  //   studentSurvey?.fatherOccupation,
  //   studentSurvey?.gender,
  //   studentSurvey?.healthStatus,
  //   studentSurvey?.healthStatusOther,
  //   studentSurvey?.livingSituation,
  //   studentSurvey?.livingSituationOther,
  //   studentSurvey?.religion,
  //   studentSurvey?.religionOther,
  //   studentSurvey?.siblingPosition,
  //   studentSurvey?.yearsAtSchool,
  // ])
  return (
    <PageCard title="Nutrition" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Balanced diet importance */}
        <Select
          {...customRegister('balancedDietImportance')}
          value={{
            value: watch('balancedDietImportance'),
            label: watch('balancedDietImportance'),
          }}
          label="Do you think it’s important to eat a balanced diet every day?"
          options={[
            {
              value: "Yes, it's important for staying healthy",
              label: "Yes, it's important for staying healthy",
            },
            {
              value: 'Only when you are sick',
              label: 'Only when you are sick',
            },
            {
              value: 'Only when you want to lose weight',
              label: 'Only when you want to lose weight',
            },
            {
              value:
                "It doesn't matter what you eat as long as you're not hungry",
              label:
                "It doesn't matter what you eat as long as you're not hungry",
            },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('balancedDietImportance', value)
          }}
        />

        {/* Eating healthy foods */}
        <Select
          {...customRegister('eatingHealthyFoods')}
          label="How do you feel about eating healthy foods when your parents give them to you?"
          options={[
            { value: 'I like eating them', label: 'I like eating them' },
            {
              value: 'I don’t like eating them',
              label: 'I don’t like eating them',
            },
            { value: 'I don’t mind', label: 'I don’t mind' },
            { value: 'I don’t know', label: "I don't know" },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('eatingHealthyFoods', value)
          }}
        />

        {/* Snack preference */}
        <Select
          {...customRegister('snackPreference')}
          label="Do you prefer eating healthier snacks or snacks like puff puff or biscuits?"
          options={[
            { value: 'I will choose fruits', label: 'I will choose fruits' },
            {
              value: 'I will choose snacks like puff puff',
              label: 'I will choose snacks like puff puff',
            },
            { value: 'Any one is okay', label: 'Any one is okay' },
            { value: "I don't know", label: "I don't know" },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('snackPreference', value)
          }}
        />

        {/* Ideal body size for boys */}
        <Select
          {...customRegister('idealBodySizeBoys')}
          label="What do you think is the ideal body size for boys?"
          options={[
            { value: 'Boys should be slim', label: 'Boys should be slim' },
            { value: 'Boys should be fat', label: 'Boys should be fat' },
            {
              value: 'Boys should have muscles',
              label: 'Boys should have muscles',
            },
            {
              value: 'Boys should not be too fat or slim',
              label: 'Boys should not be too fat or slim',
            },
            { value: 'Other', label: 'Other' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('idealBodySizeBoys', value)
          }}
        />
        {watch('idealBodySizeBoys') === 'Other' && (
          <Input
            {...customRegister('idealBodySizeBoysOther')}
            label="Specify if Others (Ideal Body Size for Boys)"
            placeholder="Specify if Others"
          />
        )}

        {/* Ideal body size for girls */}
        <Select
          {...customRegister('idealBodySizeGirls')}
          label="What do you think is the ideal body size for girls?"
          options={[
            { value: 'Girls should be slim', label: 'Girls should be slim' },
            { value: 'Girls should be fat', label: 'Girls should be fat' },
            {
              value: 'Girls should have muscles',
              label: 'Girls should have muscles',
            },
            {
              value: 'Girls should not be too fat or slim',
              label: 'Girls should not be too fat or slim',
            },
            { value: 'Other', label: 'Other' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('idealBodySizeGirls', value)
          }}
        />
        {watch('idealBodySizeGirls') === 'Other' && (
          <Input
            {...customRegister('idealBodySizeGirlsOther')}
            label="Specify if Others (Ideal Body Size for Girls)"
            placeholder="Specify if Others"
          />
        )}
      </div>
    </PageCard>
  )
}

export default Nutrition
