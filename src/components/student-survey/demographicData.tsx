import React, { useEffect } from 'react'
import { Select } from '../ui/select'
import { Input } from '../ui/input'
import { PageCard } from '../ui/page-card'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import { genderOptions } from '@/constants/selectOptions'
import {
  YesorNoOptions,
  YesorNoOptionsOther,
  classLevelOptions,
  distanceToSchoolOptions,
  ethnicityOptions,
  healthStatusOptions,
  livingSituationOptions,
  religionOptions,
  siblingPositionOptions,
  yearsAtSchoolOptions,
} from '@/types/studentsSurvey.types'

const DemographicData = ({
  studentId,
  studentSurvey,
}: {
  studentId: string
  studentSurvey: any
}) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)
  useEffect(() => {
    setValue('gender', studentSurvey?.gender)
    setValue('age', studentSurvey?.age)
    setValue('ethnicity', studentSurvey?.ethnicity)
    setValue('ethnicityOther', studentSurvey?.ethnicityOther)
    setValue('religion', studentSurvey?.religion)
    setValue('religionOther', studentSurvey?.religionOther)
    setValue('classLevel', studentSurvey?.classLevel)
    setValue('distanceToSchool', studentSurvey?.distanceToSchool)
    setValue('fatherOccupation', studentSurvey?.fatherOccupation)
    setValue('healthStatus', studentSurvey?.healthStatus)
    setValue('healthStatusOther', studentSurvey?.healthStatusOther)
    setValue('livingSituation', studentSurvey?.livingSituation)
    setValue('livingSituationOther', studentSurvey?.livingSituationOther)
    setValue('siblingPosition', studentSurvey?.siblingPosition)
    setValue('yearsAtSchool', studentSurvey?.yearsAtSchool)
  }, [
    setValue,
    studentSurvey?.age,
    studentSurvey?.classLevel,
    studentSurvey?.distanceToSchool,
    studentSurvey?.ethnicity,
    studentSurvey?.ethnicityOther,
    studentSurvey?.fatherOccupation,
    studentSurvey?.gender,
    studentSurvey?.healthStatus,
    studentSurvey?.healthStatusOther,
    studentSurvey?.livingSituation,
    studentSurvey?.livingSituationOther,
    studentSurvey?.religion,
    studentSurvey?.religionOther,
    studentSurvey?.siblingPosition,
    studentSurvey?.yearsAtSchool,
  ])

  return (
    <PageCard title="Demographic Data" bodyStyle="p-4">
      {/* Section A: Demographics */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        <Select
          {...customRegister('gender')}
          label="Gender"
          value={{ value: watch('gender'), label: watch('gender') }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('gender', value)
          }}
          options={genderOptions}
        />

        <Input {...customRegister('age')} label="Age" type="number" />

        <Select
          {...customRegister('ethnicity')}
          label="Ethnicity"
          value={{ value: watch('ethnicity'), label: watch('ethnicity') }}
          options={ethnicityOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('ethnicity', value)
          }}
        />

        {watch('ethnicity') === 'Other' && (
          <Input
            {...customRegister('ethnicityOther')}
            label="Specify Ethnicity"
          />
        )}

        <Select
          {...customRegister('religion')}
          label="Religion"
          value={{ value: watch('religion'), label: watch('religion') }}
          options={religionOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('religion', value)
          }}
        />

        {watch('religion') === 'Other' && (
          <Input
            {...customRegister('religionOther')}
            label="Specify Religion"
          />
        )}

        <Select
          {...customRegister('classLevel')}
          label="Class Level"
          value={{ value: watch('classLevel'), label: watch('classLevel') }}
          options={classLevelOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('classLevel', value)
          }}
        />

        {/* Distance to School */}

        <Select
          {...customRegister('distanceToSchool')}
          value={{
            value: watch('distanceToSchool'),
            label: watch('distanceToSchool'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('distanceToSchool', value)
          }}
          label="How far is your home from school?"
          options={distanceToSchoolOptions}
        />

        {/* Years at School */}

        <Select
          {...customRegister('yearsAtSchool')}
          value={{
            value: watch('yearsAtSchool'),
            label: watch('yearsAtSchool'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('yearsAtSchool', value)
          }}
          label="How long have you been attending this school?"
          options={yearsAtSchoolOptions}
        />

        {/* Community Name */}

        <Input {...customRegister('communityName')} label="Name of Community" />

        {/* Number of Children */}

        <Input
          {...customRegister('numberOfChildren')}
          label="Number of Children in Family"
          type="number"
        />

        {/* Sibling Position */}

        <Select
          {...customRegister('siblingPosition')}
          label="Your Sibling Position"
          value={{
            value: watch('siblingPosition'),
            label: watch('siblingPosition'),
          }}
          options={siblingPositionOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('siblingPosition', value)
          }}
        />

        {/* Father’s Occupation */}

        <Input
          label="Father's Occupation"
          {...customRegister('fatherOccupation')}
        />

        {/* Mother’s Occupation */}

        <Input
          {...customRegister('motherOccupation')}
          label="Mother's Occupation"
        />

        {/* Living Situation */}

        <Select
          {...customRegister('livingSituation')}
          value={{
            value: watch('livingSituation'),
            label: watch('livingSituation'),
          }}
          label="Who do you live with most of the time?"
          options={livingSituationOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('livingSituation', value)
          }}
        />

        {/* Health Problems */}

        <Select
          {...customRegister('healthProblems')}
          value={{
            value: watch('healthProblems'),
            label: watch('healthProblems'),
          }}
          label="Do you have any health problems that you see a doctor for regularly?"
          options={YesorNoOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('healthProblems', value)
          }}
        />

        {watch('healthProblems') === 'Yes, I have' && (
          <Input
            {...customRegister('healthProblemsOther')}
            label="Specify if Yes (Health Problems)"
            placeholder="Specify if Yes"
          />
        )}

        {/* Health Status */}

        <Select
          {...customRegister('healthStatus')}
          value={{ value: watch('healthStatus'), label: watch('healthStatus') }}
          label="How do you feel your health is compared to your mates?"
          options={healthStatusOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('healthStatus', value)
          }}
        />

        <Select
          {...customRegister('hpvVaccine')}
          value={{ value: watch('hpvVaccine'), label: watch('hpvVaccine') }}
          label="*For girls only: Have you had the HPV vaccine?"
          options={YesorNoOptionsOther}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('hpvVaccine', value)
          }}
        />
      </div>
    </PageCard>
  )
}

export default DemographicData
