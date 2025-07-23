'use client'

import { useFormContext } from 'react-hook-form'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { useNcdFilter } from './NcdFilterContext'
import { NCD } from '@/types/riskAssessment.types'
import CardiacAssessmentForm from './CardiacAssessmentForm'
import { COPDAssessmentForm } from './COPDAssessmentForm'
import { BreastCancerAssessmentForm } from './BreastCancerAssessmentForm'
import { ProstateCancerAssessmentForm } from './ProstateCancerAssessmentForm'
import { ColorectalCancerAssessmentForm } from './ColorectalCancerAssessmentForm'
import { CKDAssessmentForm } from './CKDAssessmentForm'
import { Separator } from '@/components/ui/separator'

interface Props {
  onNext: () => void
}

export const NCDQuestionnaireForm = ({ onNext }: Props) => {
  const { selectedNcd, selectedSpecificNcds } = useNcdFilter()

  // Determine which assessments to show based on selected NCDs
  const showCardiac =
    selectedNcd === 'all'
      ? selectedSpecificNcds.includes('cvd') ||
        selectedSpecificNcds.includes('diabetes')
      : selectedNcd !== NCD.DIABETES

  const showCOPD =
    selectedNcd === 'all'
      ? selectedSpecificNcds.includes('copd')
      : selectedNcd === NCD.COPD

  const showBreastCancer =
    selectedNcd === 'all'
      ? selectedSpecificNcds.includes('breastCancer')
      : selectedNcd === NCD.BREAST_CANCER

  const showProstateCancer =
    selectedNcd === 'all'
      ? selectedSpecificNcds.includes('prostateCancer')
      : selectedNcd === NCD.PROSTATE_CANCER

  const showColorectalCancer =
    selectedNcd === 'all'
      ? selectedSpecificNcds.includes('colorectalCancer')
      : selectedNcd === NCD.COLORECTAL_CANCER

  const showCKD =
    selectedNcd === 'all'
      ? selectedSpecificNcds.includes('ckd')
      : selectedNcd === NCD.CKD

  // Count how many assessments are shown
  const assessmentCount = [
    showCardiac,
    showCOPD,
    showBreastCancer,
    showProstateCancer,
    showColorectalCancer,
    showCKD,
  ].filter(Boolean).length

  if (assessmentCount === 0) {
    return (
      <div>
        <Text as="h2" className="font-medium mb-6 md:mb-8">
          NCD Questionnaire
        </Text>
        <Text variant="text/sm" className="text-gray-500 mb-6">
          No specific NCD assessments selected. Please select assessment types
          above.
        </Text>
        <div className="flex justify-end mt-6">
          <Button className="px-8" onClick={onNext} type="button">
            Next
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Text as="h2" className="font-medium mb-6 md:mb-8">
        NCD Questionnaire
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-6">
        Complete the following assessments based on your selected NCD types
      </Text>

      <div className="space-y-8">
        {/* Cardiovascular/Cardiac Assessment */}
        {showCardiac && (
          <div>
            <div className="[&_button]:hidden">
              <CardiacAssessmentForm onNext={() => {}} />
            </div>
            <Separator className="my-6" />
          </div>
        )}

        {/* COPD Assessment */}
        {showCOPD && (
          <div>
            <div className="[&_button]:hidden">
              <COPDAssessmentForm onNext={() => {}} />
            </div>
            <Separator className="my-6" />
          </div>
        )}

        {/* Breast Cancer Assessment */}
        {showBreastCancer && (
          <div>
            <div className="[&_button]:hidden">
              <BreastCancerAssessmentForm onNext={() => {}} />
            </div>
            <Separator className="my-6" />
          </div>
        )}

        {/* Prostate Cancer Assessment */}
        {showProstateCancer && (
          <div>
            <div className="[&_button]:hidden">
              <ProstateCancerAssessmentForm onNext={() => {}} />
            </div>
            <Separator className="my-6" />
          </div>
        )}

        {/* Colorectal Cancer Assessment */}
        {showColorectalCancer && (
          <div>
            <div className="[&_button]:hidden">
              <ColorectalCancerAssessmentForm onNext={() => {}} />
            </div>
            <Separator className="my-6" />
          </div>
        )}

        {/* CKD Assessment */}
        {showCKD && (
          <div>
            <div className="[&_button]:hidden">
              <CKDAssessmentForm onNext={() => {}} />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-8">
        <Button className="px-8" onClick={onNext} type="button">
          Next
        </Button>
      </div>
    </div>
  )
}
