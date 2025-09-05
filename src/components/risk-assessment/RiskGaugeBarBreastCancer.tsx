import { cn } from '@/lib/utils'

interface BreastCancerData {
  tenYearRisk?: number
  lifetimeRisk?: number
  riskLevel?: string
}

const RiskGaugeBarBreastCancer = ({ data }: { data: BreastCancerData }) => {
  const { tenYearRisk = 0, lifetimeRisk = 0, riskLevel = '' } = data

  // Breast Cancer ranges:
  // Low Risk → (a) < 3%, (b) < 17%
  // Moderate Risk → (a) 3% – 5.99%, (b) 17% – 29.99%
  // High Risk → (a) ≥ 6%, (b) ≥ 30%

  const getRiskLevel = (tenYear: number, lifetime: number) => {
    if (tenYear < 3 && lifetime < 17) return 'low'
    if (tenYear < 6 && lifetime < 30) return 'moderate'
    return 'high'
  }

  const risk = getRiskLevel(tenYearRisk, lifetimeRisk)

  // Calculate position for 10-year risk (0-10% range)
  const tenYearPercent = Math.min((tenYearRisk / 10) * 100, 100)

  // Calculate position for lifetime risk (0-40% range)
  const lifetimePercent = Math.min((lifetimeRisk / 40) * 100, 100)

  return (
    <div className="w-full space-y-6" data-testid="risk-gauge-breast-cancer">
      {/* 10-Year Risk Gauge */}
      <div>
        <div className="mb-2">
          <h4 className="font-medium text-sm">10-Year Risk</h4>
          <p className="text-xs text-gray-600">
            Risk of developing breast cancer in the next 10 years
          </p>
        </div>

        {/* Percentage indicators */}
        <div className="mb-1 flex justify-between">
          {['0%', '2%', '4%', '6%', '8%', '10%+'].map((item) => (
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
                left: `${tenYearPercent}%`,
                transform: 'translateX(-50%)',
              }}
            />
          </div>
        </div>

        {/* Risk level labels */}
        <div className="mt-2 flex justify-between text-gray-600">
          <div className="w-1/3 text-center">Low (&lt;3%)</div>
          <div className="w-1/3 text-center">Moderate (3-6%)</div>
          <div className="w-1/3 text-center">High (≥6%)</div>
        </div>

        {/* 10-Year Risk Level Display */}
        <div
          className="relative mt-4"
          style={{
            left: `${tenYearPercent}%`,
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
          <div className="flex justify-center">
            <div
              className={cn(
                'bg-red-500 text-white px-4 py-2 rounded-md text-center w-fit',
                {
                  'bg-green-800': risk === 'low',
                  'bg-yellow-600': risk === 'moderate',
                }
              )}
            >
              <div className="font-bold">
                {riskLevel ||
                  `${risk.charAt(0).toUpperCase() + risk.slice(1)} Risk`}
                !!!
              </div>
              <div className="text-sm">10-Year: {tenYearRisk.toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lifetime Risk Gauge */}
      <div>
        <div className="mb-2">
          <h4 className="font-medium text-sm">Lifetime Risk</h4>
          <p className="text-xs text-gray-600">
            Risk of developing breast cancer over lifetime
          </p>
        </div>

        {/* Percentage indicators */}
        <div className="mb-1 flex justify-between">
          {['0%', '10%', '20%', '30%', '40%+'].map((item) => (
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
                left: `${lifetimePercent}%`,
                transform: 'translateX(-50%)',
              }}
            />
          </div>
        </div>

        {/* Risk level labels */}
        <div className="mt-2 flex justify-between text-gray-600">
          <div className="w-1/3 text-center">Low (&lt;17%)</div>
          <div className="w-1/3 text-center">Moderate (17-30%)</div>
          <div className="w-1/3 text-center">High (≥30%)</div>
        </div>
      </div>

      {/* Lifetime Risk Level Display */}
      <div
        className="relative mt-4"
        style={{
          left: `${lifetimePercent}%`,
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
        <div className="flex justify-center">
          <div
            className={cn(
              'bg-red-500 text-white px-4 py-2 rounded-md text-center w-fit',
              {
                'bg-green-800': risk === 'low',
                'bg-yellow-600': risk === 'moderate',
              }
            )}
          >
            <div className="font-bold">
              {riskLevel ||
                `${risk.charAt(0).toUpperCase() + risk.slice(1)} Risk`}
              !!!
            </div>
            <div className="text-sm">Lifetime: {lifetimeRisk.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { RiskGaugeBarBreastCancer }
