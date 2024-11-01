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
import { checkIfValueExists } from '@/utils/checkIfValueExist'

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
    setValue(
      'ethnicity',
      checkIfValueExists(
        ethnicityOptions,
        studentSurvey?.ethnicity,
        'ethnicity',
        setValue
      )
    )
    setValue(
      'religion',
      checkIfValueExists(
        religionOptions,
        studentSurvey?.religion,
        'religion',
        setValue
      )
    )
    setValue('classLevel', studentSurvey?.classLevel)
    setValue('distanceToSchool', studentSurvey?.distanceToSchool)
    setValue('fatherOccupation', studentSurvey?.fatherOccupation)
    setValue('motherOccupation', studentSurvey?.motherOccupation)
    setValue('healthStatus', studentSurvey?.healthStatus)
    setValue('communityName', studentSurvey?.communityName)
    setValue('numberOfChildren', studentSurvey?.numberOfChildren)
    setValue('healthProblems', studentSurvey?.healthProblems)
    setValue('livingSituation', studentSurvey?.livingSituation)
    setValue('siblingPosition', studentSurvey?.siblingPosition)
    setValue('yearsAtSchool', studentSurvey?.yearsAtSchool)
    setValue('hpvVaccine', studentSurvey?.hpvVaccine)
  }, [
    studentSurvey?.age,
    studentSurvey?.classLevel,
    studentSurvey?.communityName,
    studentSurvey?.distanceToSchool,
    studentSurvey?.ethnicity,
    studentSurvey?.fatherOccupation,
    studentSurvey?.gender,
    studentSurvey?.healthProblems,
    studentSurvey?.healthStatus,
    studentSurvey?.livingSituation,
    studentSurvey?.motherOccupation,
    studentSurvey?.numberOfChildren,
    studentSurvey?.religion,
    studentSurvey?.siblingPosition,
    studentSurvey?.yearsAtSchool,
    studentSurvey?.hpvVaccine,
    setValue,
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
        <PageCard
          title="Ethnicity (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
          <Select
            {...customRegister('ethnicity')}
            label="Ethnicity"
            value={{ value: watch('ethnicity'), label: watch('ethnicity') }}
            options={ethnicityOptions}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('ethnicity', value)
              setValue('ethnicityOther', '')
            }}
          />

          {watch('ethnicity') === 'Other' && (
            <Input
              {...customRegister('ethnicityOther')}
              label="Specify Ethnicity"
              value={watch('ethnicityOther') || studentSurvey?.ethnicity}
            />
          )}
        </PageCard>

        <PageCard
          title="Religion (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
          <Select
            {...customRegister('religion')}
            label="Religion"
            value={{ value: watch('religion'), label: watch('religion') }}
            options={religionOptions}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('religion', value)
              setValue('religionOther', '')
            }}
          />

          {watch('religion') === 'Other' && (
            <Input
              {...customRegister('religionOther')}
              label="Specify Religion"
              value={watch('religionOther') || studentSurvey?.religion}
            />
          )}
        </PageCard>

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
        <PageCard
          title="Health Problems (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
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
              value={
                watch('healthProblemsOther') ||
                studentSurvey?.healthProblemsOther
              }
            />
          )}
        </PageCard>

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
