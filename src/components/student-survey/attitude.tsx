import React from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { IStudentsSurveyData } from '@/types/studentsSurvey.types'
import { Select } from '../ui/select'
import { Input } from '../ui/input'
import { PageCard } from '../ui/page-card'
const Attitude = ({
  control,
  errors,
  setIdealBodySizeBoysSpecify,
  setIdealBodySizeGirlsSpecify,
  idealBodySizeBoysSpecify,
  idealBodySizeGirlsSpecify,
}: {
  control: Control<IStudentsSurveyData>
  errors: FieldErrors<IStudentsSurveyData>
  setIdealBodySizeBoysSpecify: React.Dispatch<React.SetStateAction<string>>
  setIdealBodySizeGirlsSpecify: React.Dispatch<React.SetStateAction<string>>
  idealBodySizeBoysSpecify: string
  idealBodySizeGirlsSpecify: string
}) => {
  return (
    <PageCard title="Attitudes" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Balanced diet importance */}
        <Controller
          control={control}
          name="balancedDietImportance"
          render={({ field }) => (
            <Select
              {...field}
              label="Do you think it’s important to eat a balanced diet every day?"
              options={[
                {
                  value: 'Yes',
                  label: "Yes, it's important for staying healthy",
                },
                { value: 'Sick', label: 'Only when you are sick' },
                {
                  value: 'Lose weight',
                  label: 'Only when you want to lose weight',
                },
                {
                  value: 'Doesn’t matter',
                  label:
                    "It doesn't matter what you eat as long as you're not hungry",
                },
              ]}
              message={errors.balancedDietImportance?.message}
              variant={
                errors.balancedDietImportance ? 'destructive' : 'default'
              }
            />
          )}
        />

        {/* Eating healthy foods */}
        <Controller
          control={control}
          name="eatingHealthyFoods"
          render={({ field }) => (
            <Select
              {...field}
              label="How do you feel about eating healthy foods when your parents give them to you?"
              options={[
                { value: 'Like', label: 'I like eating them' },
                { value: 'Dislike', label: 'I don’t like eating them' },
                { value: 'Mind', label: 'I don’t mind' },
                { value: 'Dont know', label: "I don't know" },
              ]}
              message={errors.eatingHealthyFoods?.message}
              variant={errors.eatingHealthyFoods ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Snack preference */}
        <Controller
          control={control}
          name="snackPreference"
          render={({ field }) => (
            <Select
              {...field}
              label="Do you prefer eating healthier snacks or snacks like puff puff or biscuits?"
              options={[
                { value: 'Fruits', label: 'I will choose fruits' },
                {
                  value: 'Snacks',
                  label: 'I will choose snacks like puff puff',
                },
                { value: 'Any', label: 'Any one is okay' },
                { value: 'Dont know', label: "I don't know" },
              ]}
              message={errors.snackPreference?.message}
              variant={errors.snackPreference ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Ideal body size for boys */}
        <Controller
          control={control}
          name="idealBodySizeBoys"
          render={({ field: { onChange, ...field } }) => (
            <Select
              {...field}
              label="What do you think is the ideal body size for boys?"
              options={[
                { value: 'Slim', label: 'Boys should be slim' },
                { value: 'Fat', label: 'Boys should be fat' },
                { value: 'Muscles', label: 'Boys should have muscles' },
                {
                  value: 'Average',
                  label: 'Boys should not be too fat or slim',
                },
                { value: 'Other', label: 'Other (please specify)' },
              ]}
              onChange={(val) => {
                onChange(val)
                const selectedValue = val as {
                  value: string
                  label: string
                }
                setIdealBodySizeBoysSpecify(
                  selectedValue.value === 'Other' ? 'Other' : ''
                )
              }}
              message={errors.idealBodySizeBoys?.message}
              variant={errors.idealBodySizeBoys ? 'destructive' : 'default'}
            />
          )}
        />
        {idealBodySizeBoysSpecify === 'Other' && (
          <Controller
            control={control}
            name="idealBodySizeBoysSpecify"
            render={({ field }) => (
              <Input
                {...field}
                label="Specify if Others (Ideal Body Size for Boys)"
                placeholder="Specify if Others"
                message={errors.idealBodySizeBoysSpecify?.message}
                variant={
                  errors.idealBodySizeBoysSpecify ? 'destructive' : 'default'
                }
              />
            )}
          />
        )}

        {/* Ideal body size for girls */}
        <Controller
          control={control}
          name="idealBodySizeGirls"
          render={({ field: { onChange, ...field } }) => (
            <Select
              {...field}
              label="What do you think is the ideal body size for girls?"
              options={[
                { value: 'Slim', label: 'Girls should be slim' },
                { value: 'Fat', label: 'Girls should be fat' },
                { value: 'Muscles', label: 'Girls should have muscles' },
                {
                  value: 'Average',
                  label: 'Girls should not be too fat or slim',
                },
                { value: 'Other', label: 'Other (please specify)' },
              ]}
              onChange={(val) => {
                onChange(val)
                const selectedValue = val as {
                  value: string
                  label: string
                }
                setIdealBodySizeGirlsSpecify(
                  selectedValue.value === 'Other' ? 'Other' : ''
                )
              }}
              message={errors.idealBodySizeGirls?.message}
              variant={errors.idealBodySizeGirls ? 'destructive' : 'default'}
            />
          )}
        />
        {idealBodySizeGirlsSpecify === 'Other' && (
          <Controller
            control={control}
            name="idealBodySizeGirlsSpecify"
            render={({ field }) => (
              <Input
                {...field}
                label="Specify if Others (Ideal Body Size for Girls)"
                placeholder="Specify if Others"
                message={errors.idealBodySizeGirlsSpecify?.message}
                variant={
                  errors.idealBodySizeGirlsSpecify ? 'destructive' : 'default'
                }
              />
            )}
          />
        )}

        {/* Regular physical activity */}
        <Controller
          control={control}
          name="regularPhysicalActivity"
          render={({ field }) => (
            <Select
              {...field}
              label="How do you feel about regular physical activity?"
              options={[
                { value: 'Enjoy', label: 'I enjoy it' },
                { value: 'Dont mind', label: "I don't mind it" },
                { value: 'Difficult', label: 'I find it difficult' },
                { value: 'Dislike', label: "I don't like it" },
              ]}
              message={errors.regularPhysicalActivity?.message}
              variant={
                errors.regularPhysicalActivity ? 'destructive' : 'default'
              }
            />
          )}
        />

        {/* Barriers to physical activity */}
        <Controller
          control={control}
          name="barriersToPhysicalActivity"
          render={({ field }) => (
            <Select
              {...field}
              label="Why do you think can prevent children from being physically active? (Select all that apply)"
              isMulti
              options={[
                {
                  value: 'Time',
                  label:
                    'Lack of time due to schoolwork or other responsibilities',
                },
                {
                  value: 'Access',
                  label: 'Lack of access to sports facilities or equipment',
                },
                {
                  value: 'Self-conscious',
                  label: 'Feeling self-conscious or embarrassed',
                },
                {
                  value: 'Encouragement',
                  label: 'Lack of encouragement from family or friends',
                },
                {
                  value: 'Health issues',
                  label: 'Health issues or physical limitations',
                },
                { value: 'Dont know', label: "I don't know" },
                { value: 'Other', label: 'Other (please specify)' },
              ]}
              message={errors.barriersToPhysicalActivity?.message}
              variant={
                errors.barriersToPhysicalActivity ? 'destructive' : 'default'
              }
            />
          )}
        />

        {/* Importance of physical activity for boys and girls */}
        <Controller
          control={control}
          name="importanceOfPhysicalActivity"
          render={({ field }) => (
            <Select
              {...field}
              label="Is it important for both boys and girls to be physically active?"
              options={[
                {
                  value: 'Both',
                  label: "Yes, it's important for both boys and girls",
                },
                { value: 'Boys', label: "It's only important for boys" },
                { value: 'Girls', label: "It's only important for girls" },
                { value: 'Dont know', label: "I don't know" },
              ]}
              message={errors.importanceOfPhysicalActivity?.message}
              variant={
                errors.importanceOfPhysicalActivity ? 'destructive' : 'default'
              }
            />
          )}
        />

        {/* Suitable activities for boys */}
        <Controller
          control={control}
          name="suitableActivitiesBoys"
          render={({ field }) => (
            <Input
              {...field}
              label="Which types of physical activities do you think are most suitable for boys?"
              placeholder="Specify activities"
              message={errors.suitableActivitiesBoys?.message}
              variant={
                errors.suitableActivitiesBoys ? 'destructive' : 'default'
              }
            />
          )}
        />

        {/* Suitable activities for girls */}
        <Controller
          control={control}
          name="suitableActivitiesGirls"
          render={({ field }) => (
            <Input
              {...field}
              label="Which types of physical activities do you think are most suitable for girls?"
              placeholder="Specify activities"
              message={errors.suitableActivitiesGirls?.message}
              variant={
                errors.suitableActivitiesGirls ? 'destructive' : 'default'
              }
            />
          )}
        />
      </div>
    </PageCard>
  )
}

export default Attitude
