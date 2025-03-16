import React, { useState } from 'react'
import { Text } from '../ui/text'

const maxValue = 12
const DiseaseBreakdown = ({ data }: { data?: { [key: string]: number } }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  // Define risk thresholds
  const riskLevels = {
    low: { min: 0, max: 3, color: '#4ade80', label: 'Low risk (stable)' },
    moderate: {
      min: 4,
      max: 7,
      color: '#f97316',
      label: 'Moderate risk (growing concern)',
    },
    high: {
      min: 8,
      max: maxValue,
      color: '#dc2626',
      label: 'High risk (requiring immediate attention)',
    },
  }

  // Tooltip content for each disease
  const tooltipContent: any = {
    hypertension: {
      title: 'High Blood Pressure (≥140/90 mmHg) -',
      description: 'Persistent hypertension increases heart strain.',
    },
    stroke: {
      title: 'Stroke Risk -',
      description: 'Based on blood pressure, age, and other factors.',
    },
    cardiac_hypertension: {
      title: 'Cardiac Hypertension -',
      description: 'Enlargement of heart muscle due to high blood pressure.',
    },
    hypotension: {
      title: 'Low Blood Pressure -',
      description: 'May cause dizziness and fainting in severe cases.',
    },
  }

  // Determine risk level for a value
  const getRiskLevel = (value: number) => {
    if (value <= riskLevels.low.max) return 'low'
    if (value <= riskLevels.moderate.max) return 'moderate'
    return 'high'
  }

  // Format disease name for display
  const formatDiseaseName = (name: string) => {
    return name
      .split('_')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="w-full mb-6">
      <Text className="font-medium mb-2">Disease Breakdown</Text>
      <Text className="text-gray-500 mb-4">
        Visual risk indicators for CVDs, Cancer, Respiratory Diseases, and other
        NCDs
      </Text>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.values(riskLevels).map((level) => (
          <div key={level.label} className="flex items-center">
            <div
              className="w-3 h-2 rounded mr-2"
              style={{ backgroundColor: level.color }}
            ></div>
            <Text variant="text/xs" className="text-gray-600">
              {level.label}
            </Text>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-6 space-y-2">
        {Object.entries(data ?? {}).map(([disease, value]) => {
          const riskLevel = getRiskLevel(value)
          const barWidth = `${(value / maxValue) * 100}%`

          return (
            <div key={disease} className="relative">
              {/* Disease name */}
              <div className="flex justify-between mb-2">
                <Text variant="text/sm">{formatDiseaseName(disease)}</Text>
              </div>

              {/* Bar background */}
              <div className="h-12 bg-gray-100 rounded-md relative">
                {/* Active value bar */}
                <div
                  className="h-full rounded-md absolute left-0 top-0 transition-all duration-500"
                  style={{
                    width: barWidth,
                    backgroundColor: riskLevels[riskLevel].color,
                  }}
                  onMouseEnter={() => setActiveTooltip(disease)}
                  onMouseLeave={() => setActiveTooltip(null)}
                ></div>

                {/* Tooltip */}
                {activeTooltip === disease && tooltipContent[disease] && (
                  <div
                    className="absolute z-10 bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-64"
                    style={{
                      top: '0',
                      left: `calc(${barWidth} - 32px)`,
                      transform: 'translate(-50%, -110%)',
                    }}
                  >
                    <div className="absolute bottom-0 left-1/2 transform translate-x-[-50%] translate-y-[50%] rotate-45 w-4 h-4 bg-white border-r border-b border-gray-200"></div>
                    <Text
                      variant="text/xs"
                      className="font-medium text-gray-900"
                    >
                      {tooltipContent[disease]?.title}
                    </Text>
                    <Text
                      variant="text/xs"
                      className="text-sm text-gray-600 mt-1"
                    >
                      {tooltipContent[disease].description}
                    </Text>
                  </div>
                )}
              </div>
            </div>
          )
        })}
        {/* Scale markers */}
        <div className="flex justify-between mt-2 px-0">
          <Text className="text-xs text-gray-500">0</Text>
          <Text className="text-xs text-gray-500">
            {Math.floor(maxValue / 4) * 1}
          </Text>
          <Text className="text-xs text-gray-500">
            {Math.floor(maxValue / 4) * 2}
          </Text>
          <Text className="text-xs text-gray-500">
            {Math.floor(maxValue / 4) * 3}
          </Text>
          <Text className="text-xs text-gray-500">{maxValue}</Text>
        </div>
      </div>
    </div>
  )
}

export default DiseaseBreakdown
