import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Checkbox } from '@/components/ui/checkbox'
import { Text } from '@/components/ui/text'
import { TooltipProvider } from '@/components/ui/tooltip'

export const HistoricalDataCollectionForm = () => {
  const { control, watch } = useFormContext()

  return (
    <TooltipProvider>
      <div>
        <Text as="h2" className="font-medium mb-2">
          Historical Data Collection
        </Text>

        <Text variant="text/sm" className="text-gray-500 mb-4">
          Please provide the following information about the patient&apos;s
          health history.
        </Text>

        <div className="space-y-6">
          {/* Previous Health Screening Section */}
          <div>
            <Text as="h3" variant="text/md" className="font-medium mb-3">
              Previous Health Screening Data
            </Text>

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
                  helperText="Optional - helps track screening intervals"
                />
              )}
            />

            {/* Previous Blood Pressure */}
            <div className="mt-4">
              <OptionWithRadioField
                label="Do you have previous blood pressure data?"
                options={['Yes', 'No', "Don't Know"]}
                form={{ id: 'previousHealthScreening.bloodPressureAvailable' }}
              />
              {watch('previousHealthScreening.bloodPressureAvailable') ===
                'Yes' && (
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <Controller
                    name="previousHealthScreening.bloodPressureSystolic"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter systolic pressure"
                        label="Systolic (mmHg)"
                        labelStyle="lg:text-sm text-xs"
                        min="70"
                        max="250"
                      />
                    )}
                  />
                  <Controller
                    name="previousHealthScreening.bloodPressureDiastolic"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter diastolic pressure"
                        label="Diastolic (mmHg)"
                        labelStyle="lg:text-sm text-xs"
                        min="40"
                        max="150"
                      />
                    )}
                  />
                </div>
              )}
            </div>

            {/* Previous Blood Sugar Level */}
            <div className="mt-4">
              <OptionWithRadioField
                label="Do you have previous blood sugar level data?"
                options={['Yes', 'No', "Don't Know"]}
                form={{ id: 'previousHealthScreening.bloodSugarAvailable' }}
              />
              {watch('previousHealthScreening.bloodSugarAvailable') ===
                'Yes' && (
                <Controller
                  name="previousHealthScreening.bloodSugarLevel"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter blood sugar level (mg/dL)"
                      label="Previous Blood Sugar Level (mg/dL)"
                      labelStyle="lg:text-sm text-xs"
                      min="50"
                      max="500"
                    />
                  )}
                />
              )}
            </div>

            {/* Previous BMI */}
            <div className="mt-4">
              <OptionWithRadioField
                label="Do you have previous BMI data?"
                options={['Yes', 'No', "Don't Know"]}
                form={{ id: 'previousHealthScreening.bmiAvailable' }}
              />
              {watch('previousHealthScreening.bmiAvailable') === 'Yes' && (
                <Controller
                  name="previousHealthScreening.bmiLevel"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter BMI value"
                      label="Previous BMI"
                      labelStyle="lg:text-sm text-xs"
                      min="10"
                      max="60"
                      step="0.1"
                    />
                  )}
                />
              )}
            </div>
          </div>

          {/* Trap Field for Data Quality */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="mb-3">
              <OptionWithRadioField
                label="Have you ever experienced complete memory loss while awake?"
                options={['Yes', 'No', "Don't Know"]}
                form={{ id: 'trapFieldMemoryLoss' }}
              />
            </div>
            <Text variant="text/sm" className="text-yellow-700">
              <span className="font-medium">Note:</span> This question helps
              ensure accurate data collection. Most people should answer
              &quot;No&quot; to this question.
            </Text>
          </div>
        </div>

        {/* Consent Agreement */}
        <div className="flex items-start space-x-3 mt-8 p-4 bg-gray-50 rounded-lg">
          <Controller
            name="consentAgreement"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="consent"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-1"
              />
            )}
          />
          <label
            htmlFor="consent"
            className="text-sm text-gray-700 leading-relaxed"
          >
            I accept that any data will be saved to analyze my risk assessment.
            I understand that this information will be used for health screening
            purposes only.
          </label>
        </div>
      </div>
    </TooltipProvider>
  )
}
