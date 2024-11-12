import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React from 'react'
import { OptionsWithOthersField } from './OptionWithOthersField'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'
import { useFormContext } from 'react-hook-form'

export const ParentSurveyHealthAndHygiene = () => {
  const { register, setValue, watch } = useFormContext()

  return (
    <PageCard title="Physical" bodyStyle="px-4">
      <div className="grid md:flex grid-cols-1 gap-6 parent [&>*]:w-[calc(50%-1.5rem)] flex-wrap">
        {/* <div className="grid md:grid-cols-2 grid-cols-1 gap-6"> */}
        <Select
          {...register('healthHygiene.sourcesOfWaterAtHome')}
          label="Which sources of water do you and your family use at home for drinking and cooking? (multiple choice allowed)"
          options={convertStringsToOptionArray([
            'Tap water',
            'Public tap or Standpipe',
            'Tube-well or borehole (& pump)',
            'Protected dug well',
            'Rainwater collection',
            'Unprotected dug Well',
            'Small water vendor/Tanker Truck',
            'Bottled water/Sachet Water',
            'Surface water (e.g. river, pond)',
            'Other',
            'Not sure',
          ])}
          isMulti
          isCreatable
          value={convertStringsToOptionArray(
            watch('healthHygiene.sourcesOfWaterAtHome')
          )}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map(
              (option: { value: string }) => option.value
            )
            setValue('healthHygiene.sourcesOfWaterAtHome', value)
          }}
        />
        <Select
          {...register('healthHygiene.waterTreatmentMethodAtHome')}
          label="Which water treatment methods do you use at your house? (multiple answers allowed)"
          options={convertStringsToOptionArray([
            'Do not use any water Treatment',
            'Boiling',
            'Adding Alum',
            'Adding Aqua Tab',
            'Adding Water Guard or Chlorine',
            'Using a water Filter',
            'Solar disinfection',
            'Letting it stand and settle',
            'Others',
            'Don’t know',
          ])}
          isMulti
          isCreatable
          value={convertStringsToOptionArray(
            watch('healthHygiene.waterTreatmentMethodAtHome')
          )}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map(
              (option: { value: string }) => option.value
            )
            setValue('healthHygiene.waterTreatmentMethodAtHome', value)
          }}
        />

        <OptionsWithOthersField
          options={[
            'Latrine or toilet Bucket',
            'No Facility (Bush/Field)',
            'Others (specify)',
          ]}
          form={{
            id: 'toiletFacility',
          }}
          label="What kind of toilet facility do you and your family members usually use at home?"
        />

        <OptionsWithOthersField
          options={[
            'Watering can or kettle',
            'Watering container',
            'Tippy tap',
            'Do not remember',
            'Other (specify)',
          ]}
          form={{
            id: 'healthHygiene.facilityUsedToWashHand',
          }}
          label="What tool or facility did you use for washing your hands?"
        />

        <PageCard
          title="Toilet usage"
          bodyStyle="px-4 py-2 space-y-4"
          textContainerClassName="mb-2"
        >
          <Select
            {...register('healthHygiene.didYouCleanHandAfterLastToiletUsage')}
            label="When you used the toilet last time, did you clean your hands?"
            options={convertStringsToOptionArray([
              'Yes',
              'No',
              'Do not remember',
            ])}
            value={{
              value: watch('healthHygiene.didYouCleanHandAfterLastToiletUsage'),
              label: watch('healthHygiene.didYouCleanHandAfterLastToiletUsage'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue(
                'healthHygiene.didYouCleanHandAfterLastToiletUsage',
                value
              )
            }}
          />
          <OptionsWithOthersField
            options={[
              'Water only',
              'Soap and water',
              'Ash',
              'Do not remember',
              'Other (specify)',
            ]}
            form={{
              id: 'healthHygiene.whatWasUsedToWashHand',
            }}
            label="If yes, what did you use to wash your hands? "
          />
        </PageCard>
      </div>
    </PageCard>
  )
}
