import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React from 'react'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import { OptionsWithOthersField } from '../OptionWithOthersField'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'

export const NonCommunicableDiseaseQuestions = ({
  studentId,
}: {
  studentId: string
}) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

  return (
    <PageCard title="Nutrition" bodyStyle="px-4">
      <div className="grid md:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid-cols-1 gap-6">
        {/* Balanced diet importance */}
        <Select
          {...customRegister('doYouKnowNCD')}
          label="Do you know what the term ‘Non-Communicable diseases’ means? (select all that you agree with)"
          options={convertStringsToOptionArray([
            'Health issues that only affect older adults',
            'Diseases that can’t be spread from one person to another and last a long time',
            'Diseases that mainly affect the heart',
            'Health problems caused by things like diet, exercise, or smoking.',
            'Yes, I’ve heard of it, but I don’t know exactly what it means.',
            'No, I haven’t heard of it before.',
          ])}
          isMulti
          isCreatable
          value={convertStringsToOptionArray(watch('doYouKnowNCD'))}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map(
              (option: { value: string }) => option.value
            )
            setValue('doYouKnowNCD', value)
          }}
        />

        <Select
          {...customRegister('ageGroupAtRiskOfNcd')}
          label="In your opinion, which age group is most at risk for developing non-communicable diseases (NCDs) such as diabetes, heart disease, or hypertension?"
          options={convertStringsToOptionArray([
            'Children (0-12 years)',
            'Adolescents (13-18 years)',
            'Young Adults (19-35 years)',
            'Middle-aged Adults (36-59 years)',
            'Adults (60+ years)',
            'All age groups are equally at risk',
          ])}
          value={{
            value: watch('ageGroupAtRiskOfNcd'),
            label: watch('ageGroupAtRiskOfNcd'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('ageGroupAtRiskOfNcd', value)
          }}
        />

        <OptionsWithOthersField
          label="Do you know what high blood pressure (hypertension) is?"
          options={[
            'It is when your heart has to work harder to pump blood.',
            'It is when you have a lot of energy.',
            'It is when your blood is very thick.',
            'I don’t know',
            'Other (please specify)',
          ]}
          studentId={studentId}
          form={{
            id: 'doYouKnowHighBloodPressure',
          }}
        />

        <OptionsWithOthersField
          label="Do you know what diabetes is?"
          options={[
            'It is when your heart has to work harder to pump blood.',
            'It is when you have a lot of energy.',
            'It is when your blood is very thick.',
            'I don’t know',
            'Other (please specify)',
          ]}
          studentId={studentId}
          form={{
            id: 'doYouKnowDiabetes',
          }}
        />
        <OptionsWithOthersField
          label="Do you know what obesity is?"
          options={[
            'It is when a person has too much body fat, which can cause health problems.',
            'It is when a person is very tall.',
            "It is when someone doesn't eat enough food.",
            'I don’t know',
            'Other (please specify)',
          ]}
          studentId={studentId}
          form={{
            id: 'doYouKnowObesity',
          }}
        />
        <OptionsWithOthersField
          label="How can someone prevent getting  diseases like high blood pressure or diabetes?"
          options={[
            'Eating junk food every day',
            'Being active most days and choosing healthy foods',
            'Avoiding physical activities because they are tiring',
            'Only taking medicine without changing any habits',
            'I don’t know',
            'Other (please specify)',
          ]}
          studentId={studentId}
          form={{
            id: 'howPreventGettingNcd',
          }}
        />
        <OptionsWithOthersField
          label="Do you have any family members who have any of these conditions (DM, hypertension, etc)"
          options={[
            'Mother',
            'Father',
            'Both mother and father',
            'Other family member',
          ]}
          studentId={studentId}
          form={{
            id: 'anyFamilyMemberWithNcd',
          }}
        />
      </div>
    </PageCard>
  )
}
