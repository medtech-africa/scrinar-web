import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { motion } from 'framer-motion'

// Risk Gauge Component
const RiskGauge = ({ manualRiskScore = 0, title = 'Risk Score' }) => {
  const COLORS = ['#22c55e', '#eab308', '#ef4444']
  const data = [
    { name: 'Risk', value: manualRiskScore },
    { name: 'Remaining', value: 100 - manualRiskScore },
  ]

  return (
    <div className="w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index === 0
                    ? manualRiskScore <= 33
                      ? COLORS[0]
                      : manualRiskScore <= 66
                        ? COLORS[1]
                        : COLORS[2]
                    : '#f3f4f6'
                }
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-4">
        <span className="text-2xl font-bold">{manualRiskScore}%</span>
        <p className="text-gray-600">{title}</p>
      </div>
    </div>
  )
}

// Risk Breakdown Chart
const RiskBreakdown = ({ data }: { data: any }) => {
  return (
    <div className="w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const RiskAssessmentResult = ({
  data,
}: {
  data: {
    manualRiskScore: number
    riskLevel: any
    ncdScore: string
    lifestyleModification: string
    followUpAction: string
  }
}) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <h2 className="text-2xl font-bold mb-6">Risk Assessment Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">NCD Score</h3>
          <RiskGauge manualRiskScore={Number(data.ncdScore)} title="score" />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Overall Risk Score</h3>
          <RiskGauge manualRiskScore={50} />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Risk Level</h3>
          <p>{data?.riskLevel}</p>
        </div>

        {/* <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Risk Breakdown</h3>
          <RiskBreakdown data={data.riskBreakdown} />
        </div> */}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
        <div className="bg-lust-100 p-6 rounded-lg">
          <ul className="space-y-3">
            {[data.followUpAction, data.lifestyleModification].map(
              (rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{rec}</span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export { RiskAssessmentResult, RiskBreakdown }
