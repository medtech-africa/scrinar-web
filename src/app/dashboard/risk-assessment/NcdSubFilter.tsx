import React, { useState } from 'react'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { SpecificNcdType } from './NcdFilterContext'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { IconPicker } from '@/components/ui/icon-picker'

interface NcdSubFilterProps {
  selectedSpecificNcds: SpecificNcdType[]
  toggleSpecificNcd: (ncd: SpecificNcdType) => void
  selectAllSpecificNcds: () => void
  deselectAllSpecificNcds: () => void
}

const ncdLabels: Record<SpecificNcdType, string> = {
  cvd: 'CVD',
  diabetes: 'Diabetes',
  copd: 'COPD',
  breastCancer: 'Breast Cancer',
  prostateCancer: 'Prostate Cancer',
  colorectalCancer: 'Colorectal Cancer',
  ckd: 'CKD',
}

export const NcdSubFilter: React.FC<NcdSubFilterProps> = ({
  selectedSpecificNcds,
  toggleSpecificNcd,
  selectAllSpecificNcds,
  deselectAllSpecificNcds,
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const allNcdTypes: SpecificNcdType[] = [
    'cvd',
    'diabetes',
    'copd',
    'breastCancer',
    'prostateCancer',
    'colorectalCancer',
    'ckd',
  ]

  const handleSelectAll = () => {
    selectAllSpecificNcds()
  }

  const handleDeselectAll = () => {
    deselectAllSpecificNcds()
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
          <Text variant="text/sm" className="font-medium text-blue-900">
            Select Assessment Types (Minimum 2)
          </Text>
          <div className="flex items-center gap-2">
            <IconPicker
              icon="arrowDown"
              className={cn(
                'transition-transform duration-200',
                isOpen ? 'rotate-180' : ''
              )}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="flex items-center justify-between mb-3">
            <Text variant="text/xs" className="text-blue-700">
              Choose which assessment types to include
            </Text>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={handleDeselectAll}
                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                Deselect All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {allNcdTypes.map((ncdType) => {
              const isSelected = selectedSpecificNcds.includes(ncdType)
              // Only disable if not selected AND we have exactly 2 selected (minimum)
              const isDisabled = isSelected && selectedSpecificNcds.length === 2

              return (
                <button
                  key={ncdType}
                  type="button"
                  onClick={() => toggleSpecificNcd(ncdType)}
                  disabled={isDisabled}
                  className={cn(
                    'px-3 py-2 text-sm rounded-md border transition-all font-medium',
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : isDisabled
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  )}
                >
                  {ncdLabels[ncdType]}
                </button>
              )
            })}
          </div>

          <Text variant="text/xs" className="text-blue-700 mt-2">
            Selected: {selectedSpecificNcds.length} of {allNcdTypes.length}{' '}
            assessment types
          </Text>
          {selectedSpecificNcds.length === 2 && (
            <Text variant="text/xs" className="text-orange-600 mt-1">
              ⚠️ Minimum 2 assessment types selected. Deselect one to select
              another.
            </Text>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
