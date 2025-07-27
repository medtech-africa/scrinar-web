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
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  onNext: () => void
}

export const NCDQuestionnaireForm = ({ onNext }: Props) => {
  const { hasNcdSelected } = useNcdFilter()
  const [activeNcdTab, setActiveNcdTab] = useState<string>('')

  // Determine which assessments to show based on selected NCDs
  const showCardiac = hasNcdSelected('cvd') || hasNcdSelected('diabetes')

  const showCOPD = hasNcdSelected('copd')

  const showBreastCancer = hasNcdSelected('breastCancer')

  const showProstateCancer = hasNcdSelected('prostateCancer')

  const showColorectalCancer = hasNcdSelected('colorectalCancer')

  const showCKD = hasNcdSelected('ckd')

  // Create available tabs based on what's selected
  const availableTabs = []
  if (showCardiac) availableTabs.push({ id: 'cvd', label: 'CVD' })
  if (showCOPD) availableTabs.push({ id: 'copd', label: 'COPD' })
  if (showBreastCancer)
    availableTabs.push({ id: 'breastCancer', label: 'Breast Cancer' })
  if (showProstateCancer)
    availableTabs.push({ id: 'prostateCancer', label: 'Prostate Cancer' })
  if (showColorectalCancer)
    availableTabs.push({ id: 'colorectalCancer', label: 'Colorectal Cancer' })
  if (showCKD) availableTabs.push({ id: 'ckd', label: 'CKD' })

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
        {showCardiac && activeNcdTab === 'cvd' && (
          <div>
            <div className="[&_button]:hidden">
              <CardiacAssessmentForm onNext={() => {}} />
            </div>
          </div>
        )}

        {/* COPD Assessment */}
        {showCOPD && activeNcdTab === 'copd' && (
          <div>
            <div className="[&_button]:hidden">
              <COPDAssessmentForm onNext={() => {}} />
            </div>
          </div>
        )}

        {/* Breast Cancer Assessment */}
        {showBreastCancer && activeNcdTab === 'breastCancer' && (
          <div>
            <div className="[&_button]:hidden">
              <BreastCancerAssessmentForm onNext={() => {}} />
            </div>
          </div>
        )}

        {/* Prostate Cancer Assessment */}
        {showProstateCancer && activeNcdTab === 'prostateCancer' && (
          <div>
            <div className="[&_button]:hidden">
              <ProstateCancerAssessmentForm onNext={() => {}} />
            </div>
          </div>
        )}

        {/* Colorectal Cancer Assessment */}
        {showColorectalCancer && activeNcdTab === 'colorectalCancer' && (
          <div>
            <div className="[&_button]:hidden">
              <ColorectalCancerAssessmentForm onNext={() => {}} />
            </div>
          </div>
        )}

        {/* CKD Assessment */}
        {showCKD && activeNcdTab === 'ckd' && (
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
