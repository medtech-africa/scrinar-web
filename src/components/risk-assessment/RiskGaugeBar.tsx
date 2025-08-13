import { cn } from '@/lib/utils'
import { ResultRiskType } from '@/types/riskAssessment.types'

// Helper function to get risk type label
const getRiskTypeLabel = (activeTab: ResultRiskType): string => {
  switch (activeTab) {
    case 'who':
      return 'CVD'
    case 'findrisc':
      return 'Diabetes'
    case 'copd':
      return 'COPD'
    case 'breastCancer':
      return 'Breast Cancer'
    case 'prostate':
      return 'Prostate Cancer'
    case 'colorectal':
      return 'Colorectal Cancer'
    case 'ckd':
      return 'CKD'
    default:
      return 'CVD'
  }
}

const RiskGaugeBar = ({
  score,
  activeTab,
  maxScore = 15,
  riskLevel,
}: {
  score: number
  maxScore?: number
  activeTab: ResultRiskType
  riskLevel: string
}) => {
  // Calculate score percentage (capped at 100%)

  const newMaxScore = activeTab === 'ckd' ? 5 : maxScore

  const scorePercent = Math.min((score / newMaxScore) * 100, 100)

  const type = getRiskTypeLabel(activeTab)

  const risk =
    riskLevel.toLowerCase().includes('low') ||
    (activeTab === 'ckd' && score <= 1)
      ? 'low'
      : riskLevel.toLowerCase().includes('moderate') ||
          (activeTab === 'ckd' && score <= 3)
        ? 'moderate'
        : riskLevel.toLowerCase().includes('high') ||
            (activeTab === 'ckd' && score >= 4)
          ? 'high'
          : 'low'

  return (
    <div className="w-full" data-testid="risk-gauge">
      {/* Percentage indicators */}
      <div className="mb-1 flex justify-between">
        {(activeTab === 'ckd'
          ? ['0', '1', '2', '3', '4', '5']
          : ['0%', '5%', '10%', '15%+']
        ).map((item) => (
          <span key={item} className="text-sm">
            {item}
          </span>
        ))}
      </div>

      {/* Gradient bar */}
      <div className="w-full h-12 rounded-full overflow-hidden bg-gradient-to-r from-green-500 via-yellow-400 to-red-500">
        <div className="relative w-full h-full flex items-center">
          {/* Score indicator line */}
          <div
            className="absolute h-full w-1 bg-white"
            style={{
              left: `${scorePercent}%`,
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      </div>

      {/* Risk level labels */}
      <div className="mt-2 flex justify-between text-gray-600">
        <div className="w-1/3 text-center">Low risk</div>
        <div className="w-1/3 text-center">Moderate risk</div>
        <div className="w-1/3 text-center">High risk</div>
      </div>

      {/* High risk alert bubble */}
      {/* {riskLevel === 'high' && ( */}
      <div
        className="relative mt-4"
        style={{
          left: `${scorePercent}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <div
          className={cn(
            'absolute w-4 h-4 bg-red-500 rotate-45 -mt-2 mx-auto left-0 right-0',
            {
              'bg-green-800': risk === 'low',
              'bg-yellow-600': risk === 'moderate',
            }
          )}
        ></div>
        <div
          className={cn({
            'pl-[150px] md:pl-[100px] xl:pl-0': risk === 'low',
            'pr-[150px] md:pr-[100px] xl:pr-0': risk === 'high',
          })}
        >
          <div
            className={cn(
              'bg-red-500 text-white px-4 py-2 rounded-md text-center w-fit mx-auto',
              {
                'bg-green-800': risk === 'low',
                'bg-yellow-600': risk === 'moderate',
              }
            )}
          >
            <div className="font-bold">
              {activeTab === 'ckd'
                ? 'Your risk of CKD is in Stage ' + score
                : riskLevel}
              !!!
            </div>
            {activeTab !== 'ckd' && (
              <div className="text-sm">
                Your risk of {type} is {score}%
              </div>
            )}
          </div>
        </div>
      </div>

      {/* )} */}
    </div>
  )
}

export { RiskGaugeBar }
