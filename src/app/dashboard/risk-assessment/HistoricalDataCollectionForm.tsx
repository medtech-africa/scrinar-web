import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Checkbox } from '@/components/ui/checkbox'
import { Text } from '@/components/ui/text'

export const HistoricalDataCollectionForm = () => {
  const { control, watch } = useFormContext()

  return (
    <>
      <div>
        <Text as="h2" className="font-medium mb-2">
          Historical Data Collection
        </Text>
        <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
          Family History of NCDs (History of NCDs in First Degree relatives eg
          mother, father, brother or sister.)
        </Text>
        <div className="space-y-4">
          {/* Date of Last Screening */}
          <Controller
            name="previousHealthScreening.date"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="date"
                placeholder="Select date of last screening"
                label="Date of Last Screening"
                labelStyle="lg:text-sm text-xs"
              />
            )}
          />

          {/* Previous Blood Pressure */}
          <OptionWithRadioField
            label="Do you have previous blood pressure data?"
            options={['Yes', 'No']}
            form={{ id: 'previousHealthScreening.bloodPressure.available' }}
          />
          {watch('previousHealthScreening.bloodPressure.available') ===
            'Yes' && (
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="previousHealthScreening.bloodPressure.systolic"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter systolic pressure"
                    label="Systolic (mmHg)"
                    labelStyle="lg:text-sm text-xs"
                  />
                )}
              />
              <Controller
                name="previousHealthScreening.bloodPressure.diastolic"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter diastolic pressure"
                    label="Diastolic (mmHg)"
                    labelStyle="lg:text-sm text-xs"
                  />
                )}
              />
            </div>
          )}

          {/* Previous Blood Sugar Level */}
          <OptionWithRadioField
            label="Do you have previous blood sugar level data?"
            options={['Yes', 'No']}
            form={{ id: 'previousHealthScreening.bloodSugar.available' }}
          />
          {watch('previousHealthScreening.bloodSugar.available') === 'Yes' && (
            <Controller
              name="previousHealthScreening.bloodSugar.level"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter blood sugar level (mg/dL)"
                  label="Previous Blood Sugar Level (mg/dL)"
                  labelStyle="lg:text-sm text-xs"
                />
              )}
            />
          )}

          {/* Previous BMI */}
          <OptionWithRadioField
            label="Do you have previous BMI data?"
            options={['Yes', 'No']}
            form={{ id: 'previousHealthScreening.bmi.available' }}
          />
          {watch('previousHealthScreening.bmi.available') === 'Yes' && (
            <Controller
              name="previousHealthScreening.bmi.level"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Enter BMI value"
                  label="Previous BMI"
                  labelStyle="lg:text-sm text-xs"
                />
              )}
            />
          )}
        </div>

        {/* Family History Timeline */}
        <div className="mt-4">
          <Controller
            name="previousHealthScreening.familyHistoryTimeline"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Enter records of family members diagnosed with NCDs and their age at diagnosis"
                className="w-full p-2 border rounded-lg text-sm"
                rows={4}
              ></textarea>
            )}
          />
          <label className="block text-sm mt-2">
            Family History Timeline (e.g., parents, siblings, grandparents, age
            at diagnosis)
          </label>
        </div>
      </div>
      <div className="flex items-start space-x-2 mt-6">
        <Controller
          name="consentAgreement"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="consent"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <label htmlFor="consent" className="text-sm">
          I accept that any data will be saved to analyze my risk assessment
        </label>
      </div>
    </>
  )
}
