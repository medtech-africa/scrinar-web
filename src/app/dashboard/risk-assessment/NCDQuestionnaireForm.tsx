'use client'

import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { useNcdFilter } from './NcdFilterContext'
import CardiacAssessmentForm from './CardiacAssessmentForm'
import { COPDAssessmentForm } from './COPDAssessmentForm'
import { BreastCancerAssessmentForm } from './BreastCancerAssessmentForm'
import { ProstateCancerAssessmentForm } from './ProstateCancerAssessmentForm'
import { ColorectalCancerAssessmentForm } from './ColorectalCancerAssessmentForm'
import { CKDAssessmentForm } from './CKDAssessmentForm'
import { DiabetesAssessmentForm } from './DiabetesAssessmentForm'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { NCD } from '@/types/riskAssessment.types'

interface Props {
  onNext: () => void
  disabled?: boolean
}

export const NCDQuestionnaireForm = ({ onNext, disabled }: Props) => {
  const { hasNcdSelected } = useNcdFilter()
  const [activeNcdTab, setActiveNcdTab] = useState<string>('')

  // Determine which assessments to show based on selected NCDs
  const showCardiac = hasNcdSelected(NCD.CVD) || hasNcdSelected(NCD.DIABETES)

  const showCOPD = hasNcdSelected(NCD.COPD)

  const showBreastCancer = hasNcdSelected(NCD.BREAST_CANCER)

  const showProstateCancer = hasNcdSelected(NCD.PROSTATE_CANCER)

  const showColorectalCancer = hasNcdSelected(NCD.COLORECTAL_CANCER)

  const showCKD = hasNcdSelected(NCD.CKD)
  const showDiabetes = hasNcdSelected(NCD.DIABETES)

  // Create available tabs based on what's selected
  const availableTabs: { id: string; label: string }[] = []
  if (showCardiac) availableTabs.push({ id: NCD.CVD, label: 'CVD' })
  if (showCOPD) availableTabs.push({ id: NCD.COPD, label: 'COPD' })
  if (showBreastCancer)
    availableTabs.push({ id: NCD.BREAST_CANCER, label: 'Breast Cancer' })
  if (showProstateCancer)
    availableTabs.push({ id: NCD.PROSTATE_CANCER, label: 'Prostate Cancer' })
  if (showColorectalCancer)
    availableTabs.push({
      id: NCD.COLORECTAL_CANCER,
      label: 'Colorectal Cancer',
    })
  if (showCKD) availableTabs.push({ id: NCD.CKD, label: 'CKD' })
  if (showDiabetes) availableTabs.push({ id: NCD.DIABETES, label: 'Diabetes' })

  // Set default active tab if none is set
  if (!activeNcdTab && availableTabs.length > 0) {
    setActiveNcdTab(availableTabs[0].id)
  }

  // Count how many assessments are shown
  const assessmentCount = [
    showCardiac,
    showCOPD,
    showBreastCancer,
    showProstateCancer,
    showColorectalCancer,
    showCKD,
    showDiabetes,
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
        {!disabled && (
          <div className="flex justify-end mt-6">
            <Button
              className="px-8"
              onClick={onNext}
              type="button"
              disabled={disabled}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <Text as="h2" className="font-medium mb-6 md:mb-8">
        NCD Questionnaire Section
      </Text>

      {/* NCD Type Tabs */}
      <div className="mb-6">
        <div className="grid grid-cols-4 gap-2">
          {availableTabs.slice(0, 4).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveNcdTab(tab.id)}
              className={cn(
                'px-3 py-2 text-sm rounded-md border transition-all font-medium',
                activeNcdTab === tab.id
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {availableTabs.length > 4 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {availableTabs.slice(4).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveNcdTab(tab.id)}
                className={cn(
                  'px-3 py-2 text-sm rounded-md border transition-all font-medium',
                  activeNcdTab === tab.id
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Assessment Content based on active tab */}
      <div className="space-y-8">
        {/* Cardiovascular/Cardiac Assessment */}
        {showCardiac && activeNcdTab === NCD.CVD && (
          <div>
            <div className="[&_button]:hidden">
              <CardiacAssessmentForm onNext={() => {}} disabled={disabled} />
            </div>
          </div>
        )}

        {/* COPD Assessment */}
        {showCOPD && activeNcdTab === NCD.COPD && (
          <div>
            <div className="[&_button]:hidden">
              <COPDAssessmentForm onNext={() => {}} disabled={disabled} />
            </div>
          </div>
        )}

        {/* Breast Cancer Assessment */}
        {showBreastCancer && activeNcdTab === NCD.BREAST_CANCER && (
          <div>
            <div className="[&_button]:hidden">
              <BreastCancerAssessmentForm
                onNext={() => {}}
                disabled={disabled}
              />
            </div>
          </div>
        )}

        {/* Prostate Cancer Assessment */}
        {showProstateCancer && activeNcdTab === NCD.PROSTATE_CANCER && (
          <div>
            <div className="[&_button]:hidden">
              <ProstateCancerAssessmentForm
                onNext={() => {}}
                disabled={disabled}
              />
            </div>
          </div>
        )}

        {/* Colorectal Cancer Assessment */}
        {showColorectalCancer && activeNcdTab === NCD.COLORECTAL_CANCER && (
          <div>
            <div className="[&_button]:hidden">
              <ColorectalCancerAssessmentForm
                onNext={() => {}}
                disabled={disabled}
              />
            </div>
          </div>
        )}

        {/* CKD Assessment */}
        {showCKD && activeNcdTab === NCD.CKD && (
          <div>
            <div className="[&_button]:hidden">
              <CKDAssessmentForm onNext={() => {}} disabled={disabled} />
            </div>
          </div>
        )}

        {/* Diabetes Assessment */}
        {showDiabetes && activeNcdTab === NCD.DIABETES && (
          <div>
            <div className="[&_button]:hidden">
              <DiabetesAssessmentForm onNext={() => {}} disabled={disabled} />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-8">
        {!disabled && (
          <Button
            className="px-8"
            onClick={() => {
              const currentIndex = availableTabs.findIndex(
                (tab) => tab.id === activeNcdTab
              )
              const isLastTab = currentIndex === availableTabs.length - 1

              if (isLastTab) {
                onNext()
              } else {
                setActiveNcdTab(availableTabs[currentIndex + 1].id)
              }
            }}
            type="button"
          >
            {availableTabs.findIndex((tab) => tab.id === activeNcdTab) ===
            availableTabs.length - 1
              ? 'Next'
              : 'Next Tab'}
          </Button>
        )}
      </div>
    </div>
  )
}
