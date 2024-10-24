import { PageCard } from '@/components/ui/page-card'
import { ParentFormData } from '@/types/questionnaire.types'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormWatch,
  FieldArrayWithId,
} from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import {
  communityYears,
  defaultOptions,
  educations,
  ethnicities,
  householdIncomeRange,
  languages,
  religions,
  workStatuses,
} from '@/constants/parent'
import { genderOptions } from '@/constants/selectOptions'
import { Checkbox } from '@/components/ui/checkbox'
import { Text } from '@/components/ui/text'

interface Props {
  control: Control<ParentFormData, any, ParentFormData>
  errors: FieldErrors<ParentFormData>
  watch: UseFormWatch<ParentFormData>
  fields: FieldArrayWithId<ParentFormData, 'children', 'id'>[]
}
export const DemographicsSection = ({
  control,
  errors,
  watch,
  fields,
}: Props) => {
  return (
    <PageCard title="Section A: Demographics" bodyStyle="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Controller
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Select
              placeholder="Select an option"
              label="How many years have you lived in this community?"
              labelStyle="lg:text-sm text-xs"
              onBlur={onBlur}
              value={value}
              onChange={(val) => {
                onChange(val)
              }}
              options={communityYears}
              variant={errors?.yearsInCommunity ? 'destructive' : 'default'}
              message={errors.yearsInCommunity && 'Please select an option'}
            />
          )}
          name="yearsInCommunity"
        />
        <div className="space-y-2">
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Select
                placeholder="Select an option"
                label="Ethnicity"
                labelStyle="lg:text-sm text-xs"
                onBlur={onBlur}
                value={value}
                onChange={(val) => {
                  onChange(val)
                }}
                options={ethnicities}
                variant={errors?.yearsInCommunity ? 'destructive' : 'default'}
                message={errors.yearsInCommunity && 'Please select an option'}
              />
            )}
            name="ethnicity"
          />
          {watch('ethnicity')?.includes('other') && (
            <Controller
              control={control}
              render={({ field: { value, ...field } }) => (
                <Input
                  {...field}
                  value={value ?? ''}
                  label="Specify other ethnicity"
                  placeholder="Enter other ethnicity"
                  labelStyle="lg:text-sm text-xs"
                  variant={errors?.otherEthnicity ? 'destructive' : 'default'}
                />
              )}
              name="otherEthnicity"
            />
          )}
        </div>

        <div className="space-y-2">
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Select
                placeholder="Select an option"
                label="Language(s) spoken at home"
                labelStyle="lg:text-sm text-xs"
                onBlur={onBlur}
                value={value}
                onChange={(val) => {
                  onChange(val)
                }}
                options={languages}
                variant={errors?.languagesSpoken ? 'destructive' : 'default'}
              />
            )}
            name="religion"
          />
          {watch('languagesSpoken')?.includes('other') && (
            <Controller
              control={control}
              render={({ field: { value, ...field } }) => (
                <Input
                  {...field}
                  value={value ?? ''}
                  label="Specify other ethnicity"
                  placeholder="Enter other ethnicity"
                  labelStyle="lg:text-sm text-xs"
                  variant={errors?.otherLanguage ? 'destructive' : 'default'}
                />
              )}
              name="otherLanguage"
            />
          )}
        </div>

        <div className="space-y-2">
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Select
                placeholder="Select an option"
                label="Religion"
                labelStyle="lg:text-sm text-xs"
                onBlur={onBlur}
                value={value}
                onChange={(val) => {
                  onChange(val)
                }}
                options={religions}
                variant={errors?.religion ? 'destructive' : 'default'}
                message={errors.religion && 'Please select an option'}
              />
            )}
            name="religion"
          />
          {watch('religion')?.includes('other') && (
            <Controller
              control={control}
              render={({ field: { value, ...field } }) => (
                <Input
                  {...field}
                  value={value ?? ''}
                  label="Specify other ethnicity"
                  placeholder="Enter other ethnicity"
                  labelStyle="lg:text-sm text-xs"
                  variant={errors?.otherReligion ? 'destructive' : 'default'}
                />
              )}
              name="otherReligion"
            />
          )}
        </div>

        <div className="space-y-2">
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Select
                placeholder="Select an option"
                label="Religion"
                labelStyle="lg:text-sm text-xs"
                onBlur={onBlur}
                value={value}
                onChange={(val) => {
                  onChange(val)
                }}
                options={religions}
                variant={errors?.religion ? 'destructive' : 'default'}
                message={errors.religion && 'Please select an option'}
              />
            )}
            name="religion"
          />
          {watch('religion')?.includes('other') && (
            <Controller
              control={control}
              render={({ field: { value, ...field } }) => (
                <Input
                  {...field}
                  value={value ?? ''}
                  label="Specify other ethnicity"
                  placeholder="Enter other ethnicity"
                  labelStyle="lg:text-sm text-xs"
                  variant={errors?.otherReligion ? 'destructive' : 'default'}
                />
              )}
              name="otherReligion"
            />
          )}
        </div>

        <Controller
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Select
              placeholder="Select an option"
              label="Highest level of education:"
              labelStyle="lg:text-sm text-xs"
              onBlur={onBlur}
              value={value}
              onChange={(val) => {
                onChange(val)
              }}
              options={educations}
              variant={errors?.education ? 'destructive' : 'default'}
              message={errors.education && 'Please select an option'}
            />
          )}
          name="education"
        />

        <Controller
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <Select
              placeholder="Select an option"
              label="Work status"
              labelStyle="lg:text-sm text-xs"
              onBlur={onBlur}
              value={value}
              onChange={(val) => {
                onChange(val)
              }}
              options={workStatuses}
              variant={errors?.workStatus ? 'destructive' : 'default'}
              message={errors.workStatus && 'Please select an option'}
            />
          )}
          name="workStatus"
        />

        <Controller
          control={control}
          render={({ field: { value, ...field } }) => (
            <Input
              {...field}
              value={value ?? ''}
              label="Occupation"
              labelStyle="lg:text-sm text-xs"
              variant={errors?.occupation ? 'destructive' : 'default'}
            />
          )}
          name="occupation"
        />

        <PageCard
          title="Number of people living in your household"
          bodyStyle="p-4"
        >
          <div className="flex">
            <Controller
              control={control}
              render={({ field: { ...field } }) => (
                <Input
                  {...field}
                  label="Number of children"
                  labelStyle="lg:text-sm text-xs"
                  type="number"
                  variant={
                    errors?.householdMembers?.children
                      ? 'destructive'
                      : 'default'
                  }
                  message={
                    errors?.householdMembers?.children &&
                    errors.householdMembers?.children.message
                  }
                />
              )}
              name="householdMembers.children"
            />

            <Controller
              control={control}
              render={({ field: { ...field } }) => (
                <Input
                  {...field}
                  label="Number of adult (older than 18 years)"
                  labelStyle="lg:text-sm text-xs"
                  type="number"
                  variant={
                    errors?.householdMembers?.adults ? 'destructive' : 'default'
                  }
                  message={
                    errors.householdMembers?.adults &&
                    errors.householdMembers?.adults.message
                  }
                />
              )}
              name="householdMembers.adults"
            />
          </div>
        </PageCard>

        <Controller
          control={control}
          render={({ field: { onChange, ...rest } }) => (
            <Select
              placeholder="Select an option"
              label="Average total household income in the last one  year"
              labelStyle="lg:text-sm text-xs"
              {...rest}
              onChange={(val) => {
                onChange(val)
              }}
              options={householdIncomeRange}
              variant={errors?.householdIncome ? 'destructive' : 'default'}
              message={errors.householdIncome && 'Please select an option'}
            />
          )}
          name="householdIncome"
        />

        <div className="space-y-2">
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <Select
                placeholder="Select an option"
                label="Do you or any family member have a chronic health condition?"
                labelStyle="lg:text-sm text-xs"
                onBlur={onBlur}
                value={value}
                onChange={(val) => {
                  onChange(val)
                }}
                options={defaultOptions}
                variant={
                  errors?.chronicHealth?.hasCondition
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors.chronicHealth?.hasCondition &&
                  'Please select an option'
                }
              />
            )}
            name="chronicHealth.hasCondition"
          />
          {watch('chronicHealth.hasCondition') && (
            <Controller
              control={control}
              render={({ field: { value, ...field } }) => (
                <Input
                  {...field}
                  value={value ?? ''}
                  label="Specify other ethnicity"
                  placeholder="Enter other ethnicity"
                  labelStyle="lg:text-sm text-xs"
                  variant={
                    errors?.chronicHealth?.condition ? 'destructive' : 'default'
                  }
                />
              )}
              name="chronicHealth.condition"
            />
          )}
        </div>

        <div>
          <Controller
            control={control}
            render={({ field: { ...field } }) => (
              <Input
                {...field}
                label="How many children do you have?"
                labelStyle="lg:text-sm text-xs"
                type="number"
                variant={errors?.noOfChildren ? 'destructive' : 'default'}
                message={errors?.noOfChildren && errors.noOfChildren.message}
              />
            )}
            name="noOfChildren"
          />
          <PageCard title="Children's Details" bodyStyle="p-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex space-x-4 items-start p-4 border rounded-lg"
              >
                <Controller
                  control={control}
                  render={({ field: { ...field } }) => (
                    <Input
                      {...field}
                      label="Age"
                      labelStyle="lg:text-sm text-xs"
                      type="number"
                    />
                  )}
                  name={`children.${index}.age`}
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, ...rest } }) => (
                    <Select
                      placeholder="Select an option"
                      label="Gender"
                      labelStyle="lg:text-sm text-xs"
                      {...rest}
                      onChange={(val) => {
                        onChange(val)
                      }}
                      options={genderOptions}
                    />
                  )}
                  name={`children.${index}.gender`}
                />

                <div className="flex items-center">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Checkbox
                        onBlur={onBlur}
                        checked={Boolean(value)}
                        onCheckedChange={(val) => onChange(val)}
                      />
                    )}
                    name={`children.${index}.inSchool`}
                  />
                  <Text className="ml-2 text-grey-500">In School</Text>
                </div>
              </div>
            ))}
          </PageCard>
        </div>
      </div>
    </PageCard>
  )
}
