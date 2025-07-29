import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useNcdFilter } from './NcdFilterContext'
import calculateAge from '@/utils/calculateAge'

type Props = {
  onNext: () => void
}

export const CKDAssessmentForm = ({ onNext }: Props) => {
  const { watch } = useFormContext()
  const { hasNcdSelected } = useNcdFilter()

  // Only show this form for CKD
  if (!hasNcdSelected('ckd')) {
    return null
  }

  // Get values from other sections
  const formData = watch()
  const dateOfBirth = formData?.personalInfo?.dateOfBirth
  const age = dateOfBirth ? calculateAge(dateOfBirth) : null
  const gender = formData?.personalInfo?.gender
  const serumCreatinine = formData?.bloodTest?.serumCreatinine

  return (
    <div>
      <Text as="h2" className="font-medium mb-2">
        Chronic Kidney Disease (CKD) Assessment
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
        Estimates glomerular filtration rate (eGFR) to assess kidney function
      </Text>

      <div className="space-y-6">
        {/* Required Information Display */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Required Information for CKD Assessment
          </Text>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <Text variant="text/sm" className="text-gray-600">
                Age:
              </Text>
              <Text variant="text/sm" className="font-medium">
                {age ? `${age} years` : 'Not provided'}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text variant="text/sm" className="text-gray-600">
                Sex:
              </Text>
              <Text variant="text/sm" className="font-medium">
                {gender ? gender : 'Not provided'}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text variant="text/sm" className="text-gray-600">
                Serum Creatinine:
              </Text>
              <Text variant="text/sm" className="font-medium">
                {serumCreatinine ? `${serumCreatinine} mg/dL` : 'Not provided'}
              </Text>
            </div>
          </div>
          {(!age || !gender || !serumCreatinine) && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Text variant="text/sm" className="text-yellow-800">
                ⚠️ Please complete the Personal Information and Laboratory Tests
                sections to enable CKD assessment.
              </Text>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button className="px-8" onClick={onNext} type="button">
          Save & continue
        </Button>
      </div>
    </div>
  )
}
