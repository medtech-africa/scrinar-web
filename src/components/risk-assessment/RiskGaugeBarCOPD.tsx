import { cn } from '@/lib/utils'
import RiskSummary from './RiskSummary'

const RiskGaugeBarCOPD = ({
  score,
  riskLevel,
}: {
  score: number
  riskLevel: string
}) => {
  // COPD range: 1-6
  // 0-1 → Low likelihood
  // 2-4 → Intermediate risk
  // 5-6 → High risk
  const maxScore = 6

  // Calculate score percentage (capped at 100%)
  const scorePercent = Math.min((score / maxScore) * 100, 100)

  // Determine risk level based on COPD ranges
  const getRiskLevel = (score: number) => {
    if (score <= 1) return 'low'
    if (score <= 4) return 'moderate'
    return 'high'
  }

  const getRiskLevelLikelihood = (score: number) => {
    if (score <= 1) return 'weak'
    if (score <= 4) return 'moderate'
    return 'strong'
  }

  const risk = getRiskLevel(score)
  const likelihood = getRiskLevelLikelihood(score)

  return (
    <div className="w-full" data-testid="risk-gauge-copd">
      {/* Percentage indicators */}
      <div className="mb-1 flex justify-between">
        {['0', '1', '2', '3', '4', '5', '6'].map((item) => (
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
        <div className="w-1/3 text-center">Low likelihood</div>
        <div className="w-1/3 text-center">Intermediate risk</div>
        <div className="w-1/3 text-center">High risk</div>
      </div>

      {/* Risk level bubble */}
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
            <div className="font-bold">{riskLevel}!!!</div>
            <div className="text-sm">Your COPD risk score is {score}</div>
          </div>
        </div>
      </div>

      <RiskSummary
        message={`A ${score}% risk means a ${risk} chance of developing COPD and a ${likelihood} likelihood of respiratory complications.`}
      />
    </div>
  )
}

export { RiskGaugeBarCOPD }
