import { Text } from '@/components/ui/text'
import { motion } from 'framer-motion'

const LoadingAnalysis = ({ progress }: { progress: number }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold mb-2">Analyzing Data</h3>
          <p className="text-gray-600">
            Please wait while we process your information
          </p>
        </div>

        <div className="relative pt-1">
          <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
            />
          </div>
          <Text
            variant="text/lg"
            className="text-center text-lust-200 font-semibold"
          >
            {progress}% Complete
          </Text>
        </div>
      </div>
    </div>
  )
}

export { LoadingAnalysis }
