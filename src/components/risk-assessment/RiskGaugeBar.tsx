const RiskGaugeBar = ({
  score,
  riskLevel,
  maxScore = 15,
}: {
  score: number
  riskLevel: string
  maxScore?: number
}) => {
  // Calculate score percentage (capped at 100%)
  const scorePercent = Math.min((score / maxScore) * 100, 100)

  return (
    <div className="w-full" data-testid="risk-gauge">
      {/* Percentage indicators */}
      <div className="mb-1 flex justify-between">
        <span className="text-sm">0%</span>
        <span className="text-sm">5%</span>
        <span className="text-sm">10%</span>
        <span className="text-sm">15%+</span>
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
      {riskLevel === 'high' && (
        <div
          className="relative mt-4"
          style={{
            left: `${scorePercent}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="absolute w-4 h-4 bg-red-500 rotate-45 -mt-2 mx-auto left-0 right-0"></div>
          <div className="bg-red-500 text-white px-4 py-2 rounded-md text-center">
            <div className="font-bold">High risk!!!</div>
            <div className="text-sm">Your risk of CVD is {score}%</div>
          </div>
        </div>
      )}
    </div>
  )
}

export { RiskGaugeBar }
