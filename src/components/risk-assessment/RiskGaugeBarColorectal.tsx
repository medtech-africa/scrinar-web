import { cn } from '@/lib/utils'
import RiskSummary from './RiskSummary'

interface ColorectalCancerData {
  shortHorizonRisk?: number
  longHorizonRisk?: number
  riskLevel?: string
}

const RiskGaugeBarColorectal = ({ data }: { data: ColorectalCancerData }) => {
  const { shortHorizonRisk = 0, longHorizonRisk = 0, riskLevel = '' } = data

  // Colorectal Cancer ranges:
  // Low Risk → < 1.0% (short), < 5% (long)
  // Average Risk → 1.0% – 2.5% (short), 5% – 10% (long)
  // Moderate Risk → 2.6% – 5.0% (short), 10% – 20% (long)
  // High Risk → > 5.0% (short), > 20% (long)

  const getLikelihood = (risk: string) => {
    if (risk === 'low') return 'weak'
    if (risk === 'moderate') return 'moderate'
    return 'strong'
  }

  const getRiskLevel = (short: number, long: number) => {
    if ((short < 1.0 || short === 0) && (long < 5 || long === 0)) return 'low'
    if ((short <= 2.5 || short === 0) && (long <= 10 || long === 0))
      return 'average'
    if ((short <= 5.0 || short === 0) && (long <= 20 || long === 0))
      return 'moderate'
    return 'high'
  }

  const risk = getRiskLevel(shortHorizonRisk, longHorizonRisk)
  const shortRiskLevel = getRiskLevel(shortHorizonRisk, 0)
  const longRiskLevel = getRiskLevel(0, longHorizonRisk)
  const shortLikelihood = getLikelihood(shortRiskLevel)
  const longLikelihood = getLikelihood(longRiskLevel)

  // Calculate position for short horizon risk (0-6% range)
  const shortPercent = Math.min((shortHorizonRisk / 6) * 100, 100)

  // Calculate position for long horizon risk (0-25% range)
  const longPercent = Math.min((longHorizonRisk / 25) * 100, 100)

  return (
    <div>
      <div className="w-full space-y-6" data-testid="risk-gauge-colorectal">
        {/* Short Horizon Risk Gauge */}
        <div>
          <div className="mb-2">
            <h4 className="font-medium text-sm">Short Horizon Risk</h4>
            <p className="text-xs text-gray-600">
              Risk of developing colorectal cancer in shorter timeframe
            </p>
          </div>

          {/* Percentage indicators */}
          <div className="mb-1 flex justify-between">
            {['0%', '1%', '2%', '3%', '4%', '5%', '6%+'].map((item) => (
              <span key={item} className="text-sm">
                {item}
              </span>
            ))}
          </div>

          {/* Gradient bar */}
          <div className="w-full h-8 rounded-full overflow-hidden bg-gradient-to-r from-green-500 via-yellow-400 to-red-500">
            <div className="relative w-full h-full flex items-center">
              {/* Score indicator line */}
              <div
                className="absolute h-full w-1 bg-white"
                style={{
                  left: `${shortPercent}%`,
                  transform: 'translateX(-50%)',
                }}
              />
            </div>
          </div>

          {/* Risk level labels */}
          <div className="mt-2 flex justify-between text-gray-600 text-xs">
            <div className="w-1/4 text-center">Low (&lt;1%)</div>
            <div className="w-1/4 text-center">Avg (1-2.5%)</div>
            <div className="w-1/4 text-center">Mod (2.6-5%)</div>
            <div className="w-1/4 text-center">High (&gt;5%)</div>
          </div>
        </div>

        {/* Long Horizon Risk Gauge */}
        <div>
          <div className="mb-2">
            <h4 className="font-medium text-sm">Long Horizon Risk</h4>
            <p className="text-xs text-gray-600">
              Risk of developing colorectal cancer in longer timeframe
            </p>
          </div>

          {/* Percentage indicators */}
          <div className="mb-1 flex justify-between">
            {['0%', '5%', '10%', '15%', '20%', '25%+'].map((item) => (
              <span key={item} className="text-sm">
                {item}
              </span>
            ))}
          </div>

          {/* Gradient bar */}
          <div className="w-full h-8 rounded-full overflow-hidden bg-gradient-to-r from-green-500 via-yellow-400 to-red-500">
            <div className="relative w-full h-full flex items-center">
              {/* Score indicator line */}
              <div
                className="absolute h-full w-1 bg-white"
                style={{
                  left: `${longPercent}%`,
                  transform: 'translateX(-50%)',
                }}
              />
            </div>
          </div>

          {/* Risk level labels */}
          <div className="mt-2 flex justify-between text-gray-600 text-xs">
            <div className="w-1/4 text-center">Low (&lt;5%)</div>
            <div className="w-1/4 text-center">Avg (5-10%)</div>
            <div className="w-1/4 text-center">Mod (10-20%)</div>
            <div className="w-1/4 text-center">High (&gt;20%)</div>
          </div>
        </div>

        {/* Combined Risk Level Display */}
        <div
          className="relative mt-4"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            className={cn(
              'absolute w-4 h-4 bg-red-500 rotate-45 -mt-2 mx-auto left-0 right-0',
              {
                'bg-green-800': risk === 'low',
                'bg-blue-600': risk === 'average',
                'bg-yellow-600': risk === 'moderate',
              }
            )}
          ></div>
          <div className="flex justify-center">
            <div
              className={cn(
                'bg-red-500 text-white px-4 py-2 rounded-md text-center w-fit',
                {
                  'bg-green-800': risk === 'low',
                  'bg-blue-600': risk === 'average',
                  'bg-yellow-600': risk === 'moderate',
                }
              )}
            >
              <div className="font-bold">
                {riskLevel ||
                  `${risk.charAt(0).toUpperCase() + risk.slice(1)} Risk`}
                !!!
              </div>
              <div className="text-sm">
                Short: {shortHorizonRisk.toFixed(1)}% | Long:{' '}
                {longHorizonRisk.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <RiskSummary
        message={`A ${shortHorizonRisk.toFixed(1)}% risk means a ${shortRiskLevel} chance of developing colorectal cancer in shorter timeframe and a ${shortLikelihood} likelihood and a ${longHorizonRisk.toFixed(1)}% risk means a ${longRiskLevel} chance of developing colorectal cancer in longer timeframe and a ${longLikelihood} likelihood.`}
      />
    </div>
  )
}

export { RiskGaugeBarColorectal }
