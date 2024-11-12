import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React from 'react'
import { doctorVisitFrequencyOptions } from '@/types/studentsSurvey.types'
import { OptionsWithOthersField } from './OptionWithOthersField'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'
import { useFormContext } from 'react-hook-form'

export const ParentSurveyHealthServicesHealthMaintenance = ({
  isFemale = false,
}: {
  isFemale?: boolean
}) => {
  const { register, setValue, watch } = useFormContext()

  return (
    <PageCard title="Nutrition" bodyStyle="px-4">
      <div className="grid md:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid-cols-1 gap-6">
        {/* Balanced diet importance */}

        <Select
          {...register('healthMaintenance.doctorVisitFrequency')}
          label="How often do you visit the doctor for health check-ups?"
          options={doctorVisitFrequencyOptions}
          value={{
            value: watch('healthMaintenance.doctorVisitFrequency'),
            label: watch('healthMaintenance.doctorVisitFrequency'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('healthMaintenance.doctorVisitFrequency', value)
          }}
        />

        <OptionsWithOthersField
          options={[
            'To make sure you are healthy and catch problems early',
            'To avoid school',
            'It is not necessary if you are not sick',
            'I don’t know',
            'Other',
          ]}
          form={{
            id: 'healthMaintenance.benefitsOfRegularHealthCheckups',
            otherId: 'healthMaintenance.benefitsOfRegularHealthCheckups',
          }}
          label="What do you think are the benefits of regular health check-ups? "
        />

        <OptionsWithOthersField
          options={[
            'Yes, a parent or family member',
            'Yes, an older sibling',
            'Yes, a friend',
            'Yes, a teacher or school counsellor',
            'Yes, a healthcare worker',
            'Yes, another adult I trust',
            'No, I don’t have someone to talk to about this',
            'Other (please specify)',
          ]}
          form={{
            id: 'healthMaintenance.someoneToTalkToAboutHealth',
          }}
          label="Do you have someone you can talk to about your body and health? If so, who is that person?"
        />

        {isFemale && (
          <>
            <PageCard
              title="HPV"
              bodyStyle="px-4 py-2 space-y-4"
              textContainerClassName="mb-2"
            >
              <Select
                {...register('healthMaintenance.ideaOfHpvVaccine')}
                label="Do you know what the HPV vaccine is?"
                options={convertStringsToOptionArray([
                  'Yes, I know',
                  "I’ve heard about it but I don't know what it is",
                  'No, I don’t know',
                ])}
                value={{
                  value: watch('healthMaintenance.ideaOfHpvVaccine'),
                  label: watch('healthMaintenance.ideaOfHpvVaccine'),
                }}
                onChange={(selectedOption: any) => {
                  const value = selectedOption.value
                  setValue('healthMaintenance.ideaOfHpvVaccine', value)
                }}
              />

              <OptionsWithOthersField
                options={[
                  'From a health facility',
                  'From my mother',
                  'From my father',
                  'Other Family member',
                  'Friends',
                  'Schools or educational institutions',
                  'Social media (e.g., Facebook, Instagram, Twitter)',
                  'Television or radio programs',
                  'Newspapers or magazines',
                  'Other (please specify)',
                ]}
                form={{
                  id: 'healthMaintenance.ideaOfHpvVaccineSource',
                }}
                label="If  yes, how did you learn about it?"
              />
            </PageCard>

            <Select
              {...register('healthMaintenance.hadHpvVaccine')}
              label="Have you had the HPV vaccine?"
              options={convertStringsToOptionArray([
                'Yes',
                'No',
                'I don’t know',
              ])}
              value={{
                value: watch('healthMaintenance.hadHpvVaccine'),
                label: watch('healthMaintenance.hadHpvVaccine'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('healthMaintenance.hadHpvVaccine', value)
              }}
            />
            <Select
              {...register(
                'healthMaintenance.willingToReceiveHpvVaccineIfNotReceived'
              )}
              label="If you have not received the vaccine, would you be willing to receive it?"
              options={convertStringsToOptionArray([
                'Yes',
                'No',
                "I'm not sure",
              ])}
              value={{
                value: watch(
                  'healthMaintenance.willingToReceiveHpvVaccineIfNotReceived'
                ),
                label: watch(
                  'healthMaintenance.willingToReceiveHpvVaccineIfNotReceived'
                ),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue(
                  'healthMaintenance.willingToReceiveHpvVaccineIfNotReceived',
                  value
                )
              }}
            />
            <Select
              {...register(
                'healthMaintenance.willingToReceiveHpvVaccineIfOffered'
              )}
              label="Are you willing to receive the HPV vaccine if it is offered to you?"
              options={convertStringsToOptionArray([
                'Yes, I would like to receive the vaccine.',
                'No, I don’t want to receive the vaccine.',
                'I’m not sure.',
              ])}
              value={{
                value: watch(
                  'healthMaintenance.willingToReceiveHpvVaccineIfOffered'
                ),
                label: watch(
                  'healthMaintenance.willingToReceiveHpvVaccineIfOffered'
                ),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue(
                  'healthMaintenance.willingToReceiveHpvVaccineIfOffered',
                  value
                )
              }}
            />
            <Select
              {...register('healthMaintenance.reasonForHpvVaccineUncertainty')}
              label="If you’re not sure, can you tell us why? (Choose all that apply)"
              options={convertStringsToOptionArray([
                'I need to ask permission from my parents or guardians.',
                'I need more information about the vaccine.',
                'I’m concerned about side effects.',
                'I don’t know anyone who has received it.',
              ])}
              isMulti
              isCreatable
              value={convertStringsToOptionArray(
                watch('healthMaintenance.reasonForHpvVaccineUncertainty')
              )}
              onChange={(selectedOption: any) => {
                const value = selectedOption?.map(
                  (option: { value: string }) => option.value
                )
                setValue(
                  'healthMaintenance.reasonForHpvVaccineUncertainty',
                  value
                )
              }}
            />
          </>
        )}
      </div>
    </PageCard>
  )
}
