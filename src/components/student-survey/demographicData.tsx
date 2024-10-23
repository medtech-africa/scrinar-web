import React from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { Select } from '../ui/select'
import { Input } from '../ui/input'
import { IStudentsSurveyData } from '@/types/studentsSurvey.types'
import { PageCard } from '../ui/page-card'

const DemographicData = ({
  control,
  errors,
  ethnicitySpecify,
  setEthnicitySpecify,
  religionSpecify,
  setReligionSpecify,
  healthProblemSpecify,
  setHealthProblemSpecify,
}: {
  control: Control<IStudentsSurveyData>
  errors: FieldErrors<IStudentsSurveyData>
  ethnicitySpecify: string
  setEthnicitySpecify: (value: string) => void
  religionSpecify: string
  setReligionSpecify: (value: string) => void
  healthProblemSpecify: string
  setHealthProblemSpecify: (value: string) => void
}) => {
  return (
    <PageCard title="Demographic Data" bodyStyle="p-4">
      {/* Section A: Demographics */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        <Controller
          control={control}
          name="gender"
          render={({ field: { value, ...field } }) => (
            <Select
              {...field}
              value={value.value}
              label="Gender"
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
              message={errors.gender?.message}
              variant={errors.gender ? 'destructive' : 'default'}
            />
          )}
        />
        <Controller
          control={control}
          name="age"
          render={({ field }) => (
            <Input
              {...field}
              label="Age"
              type="number"
              message={errors.age?.message}
              variant={errors.age ? 'destructive' : 'default'}
            />
          )}
        />
        {/* Add other demographic fields from Section A */}
        <Controller
          control={control}
          name="ethnicity"
          render={({ field: { value, ...field } }) => (
            <Select
              {...field}
              label="Ethnicity"
              value={value?.value}
              options={[
                { value: 'Hausa', label: 'Hausa' },
                { value: 'Igbo', label: 'Igbo' },
                { value: 'Yoruba', label: 'Yoruba' },
                { value: 'Tiv', label: 'Tiv' },
                { value: 'Gbayi', label: 'Gbayi' },
                { value: 'Fulani', label: 'Fulani' },
                { value: 'Other', label: 'Other' },
              ]}
              onChange={(val: unknown) => {
                const selectedValue = val as {
                  value: string
                  label: string
                }
                setEthnicitySpecify(
                  selectedValue.value === 'Other' ? 'Other' : ''
                )
              }}
              message={errors.ethnicity?.message}
              variant={errors.ethnicity ? 'destructive' : 'default'}
            />
          )}
        />
        {ethnicitySpecify === 'Other' && (
          <Controller
            control={control}
            name="ethnicityOther"
            render={({ field }) => (
              <Input
                {...field}
                label="Specify Ethnicity"
                message={errors.ethnicityOther?.message}
                variant={errors.ethnicityOther ? 'destructive' : 'default'}
              />
            )}
          />
        )}
        <Controller
          control={control}
          name="religion"
          render={({ field: { onChange, value, ...field } }) => (
            <Select
              {...field}
              label="Religion"
              value={value?.value}
              options={[
                { value: 'Muslim', label: 'Muslim' },
                { value: 'Christian', label: 'Christian' },
                { value: 'Traditionalist', label: 'Traditionalist' },
                { value: 'Other', label: 'Other' },
              ]}
              onChange={(val: unknown) => {
                onChange(val)
                const selectedValue = val as {
                  value: string
                  label: string
                }
                setReligionSpecify(
                  selectedValue.value === 'Other' ? 'Other' : ''
                )
              }}
              message={errors.religion?.message}
              variant={errors.religion ? 'destructive' : 'default'}
            />
          )}
        />
        {religionSpecify === 'Other' && (
          <Controller
            control={control}
            name="religionOther"
            render={({ field }) => (
              <Input
                {...field}
                label="Specify Religion"
                message={errors.religionOther?.message}
                variant={errors.religionOther ? 'destructive' : 'default'}
              />
            )}
          />
        )}

        {/* Class Level */}
        <Controller
          control={control}
          name="classLevel"
          render={({ field: { value, ...field } }) => (
            <Select
              {...field}
              label="Class Level"
              value={value?.value}
              options={[
                { value: 'JSS 1', label: 'JSS 1' },
                { value: 'JSS 2', label: 'JSS 2' },
                { value: 'JSS 3', label: 'JSS 3' },
              ]}
              message={errors.classLevel?.message}
              variant={errors.classLevel ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Distance to School */}
        <Controller
          control={control}
          name="distanceToSchool"
          render={({ field: { value, ...field } }) => (
            <Select
              {...field}
              value={value?.value}
              label="How far is your home from school?"
              options={[
                { value: 'Very close', label: 'Very close' },
                { value: 'Close', label: 'Close' },
                { value: 'Far', label: 'Far' },
              ]}
              message={errors.distanceToSchool?.message}
              variant={errors.distanceToSchool ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Years at School */}
        <Controller
          control={control}
          name="yearsAtSchool"
          render={({ field: { value, ...field } }) => (
            <Select
              {...field}
              value={value?.value}
              label="How long have you been attending this school?"
              options={[
                { value: 'Less than 1 year', label: 'Less than 1 year' },
                { value: '1-2 years', label: '1-2 years' },
                { value: '3 years', label: '3 years' },
                { value: 'More than 3 years', label: 'More than 3 years' },
              ]}
              message={errors.yearsAtSchool?.message}
              variant={errors.yearsAtSchool ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Community Name */}
        <Controller
          control={control}
          name="communityName"
          render={({ field }) => (
            <Input
              {...field}
              label="Name of Community"
              message={errors.communityName?.message}
              variant={errors.communityName ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Number of Children */}
        <Controller
          control={control}
          name="numberOfChildren"
          render={({ field }) => (
            <Input
              {...field}
              label="Number of Children in Family"
              type="number"
              message={errors.numberOfChildren?.message}
              variant={errors.numberOfChildren ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Sibling Position */}
        <Controller
          control={control}
          name="siblingPosition"
          render={({ field: { value, ...field } }) => (
            <Select
              {...field}
              value={value?.value}
              label="Your Sibling Position"
              options={[
                { value: 'First', label: 'First' },
                { value: 'Second', label: 'Second' },
                { value: 'Third', label: 'Third' },
                { value: 'Fourth', label: 'Fourth' },
                { value: 'Greater than 4', label: 'Greater than 4' },
              ]}
              message={errors.siblingPosition?.message}
              variant={errors.siblingPosition ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Father’s Occupation */}
        <Controller
          control={control}
          name="fatherOccupation"
          render={({ field }) => (
            <Input
              {...field}
              label="Father's Occupation"
              message={errors.fatherOccupation?.message}
              variant={errors.fatherOccupation ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Mother’s Occupation */}
        <Controller
          control={control}
          name="motherOccupation"
          render={({ field }) => (
            <Input
              {...field}
              label="Mother's Occupation"
              message={errors.motherOccupation?.message}
              variant={errors.motherOccupation ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Living Situation */}
        <Controller
          control={control}
          name="livingSituation"
          render={({ field: { value, ...field } }) => (
            <Select
              {...field}
              value={value?.value}
              label="Who do you live with most of the time?"
              options={[
                { value: 'Both parents', label: 'Both parents' },
                {
                  value: 'One parent (Mother)',
                  label: 'One parent (Mother)',
                },
                {
                  value: 'One parent (Father)',
                  label: 'One parent (Father)',
                },
                { value: 'Other relatives', label: 'Other relatives' },
                { value: 'Non-relatives', label: 'Non-relatives' },
              ]}
              message={errors.livingSituation?.message}
              variant={errors.livingSituation ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Health Problems */}
        <Controller
          control={control}
          name="healthProblems"
          render={({ field: { onChange, value, ...field } }) => (
            <Select
              {...field}
              value={value?.value}
              label="Do you have any health problems that you see a doctor for regularly?"
              options={[
                { value: 'Yes', label: 'Yes' },
                {
                  value: 'No',
                  label: 'No',
                },
              ]}
              onChange={(val: any) => {
                onChange(val)
                setHealthProblemSpecify(val.value === 'Yes' ? 'Yes' : '')
              }}
              message={errors.healthProblems?.message}
              variant={errors.healthProblems ? 'destructive' : 'default'}
            />
          )}
        />

        {healthProblemSpecify === 'Yes' && (
          <Controller
            control={control}
            name="healthProblemsOther"
            render={({ field }) => (
              <Input
                {...field}
                label="Specify if Yes (Health Problems)"
                placeholder="Specify if Yes"
                message={errors.healthProblemsOther?.message}
                variant={errors.healthProblemsOther ? 'destructive' : 'default'}
              />
            )}
          />
        )}

        {/* Health Status */}
        <Controller
          control={control}
          name="healthStatus"
          render={({ field: { value, ...field } }) => (
            <Select
              {...field}
              value={value?.value}
              label="How do you feel your health is compared to your mates?"
              options={[
                { value: 'Very good', label: 'Very good' },
                { value: 'Good', label: 'Good' },
                { value: 'Okay', label: 'Okay' },
                { value: 'Not so good', label: 'Not so good' },
              ]}
              message={errors.healthStatus?.message}
              variant={errors.healthStatus ? 'destructive' : 'default'}
            />
          )}
        />
        <Controller
          control={control}
          name="hpvVaccine"
          render={({ field }) => (
            <Select
              {...field}
              label="*For girls only: Have you had the HPV vaccine?"
              options={[
                { value: 'Yes', label: 'Yes' },
                {
                  value: 'No',
                  label: 'No',
                },
              ]}
              message={errors.hpvVaccine?.message}
              variant={errors.hpvVaccine ? 'destructive' : 'default'}
            />
          )}
        />
      </div>
    </PageCard>
  )
}

export default DemographicData
