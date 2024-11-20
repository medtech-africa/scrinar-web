enum VitalType {
  glucoseLevel = 'Glucose Levels',
  bmi = 'BMI',
  pulse = 'Pulse',
}
export function getColorForValue(
  value: number,
  type: string
): { color: string; name: string } | undefined {
  if (type === VitalType.pulse) {
    if (value < 40) {
      return { color: '#FF5F6D', name: 'low pulse' } // Red for low danger
    } else if (value >= 40 && value < 60) {
      return { color: '#FFC371', name: 'low caution' } // Yellow for low caution
    } else if (value >= 60 && value <= 100) {
      return { color: '#96FF72', name: 'healthy' } // Green for healthy
    } else if (value > 100 && value <= 120) {
      return { color: '#FFC371', name: 'high caution' } // Yellow for high caution
    } else {
      return { color: '#FF5F6D', name: 'high pulse' } // Red for high danger
    }
  } else if (type === VitalType.bmi) {
    if (value < 18.5) {
      return { color: '#FF5F6D', name: 'underweight' } // Red for low danger
    } else if (value >= 18.5 && value < 24.9) {
      return { color: '#96FF72', name: 'normal weight' } // Green for healthy
    } else if (value >= 25.0 && value <= 29.9) {
      return { color: '#FFC371', name: 'overweight' } // Yellow for caution
    } else if (value >= 30.0 && value <= 34.9) {
      return { color: '#FFA500', name: 'obesity class I' } // Orange for high caution
    } else if (value >= 35.0 && value <= 39.9) {
      return { color: '#FF5F6D', name: 'obesity class II' } // Red for high caution
    } else {
      return { color: '#8B0000', name: 'obesity class III' } // Dark Red for high danger
    }
  } else if (type === VitalType.glucoseLevel) {
    if (value < 70) {
      return { color: '#FF5F6D', name: 'hypoglycemia' } // Red for low danger (hypoglycemia)
    } else if (value >= 70 && value < 100) {
      return { color: '#96FF72', name: 'normal fasting glucose' } // Green for healthy (normal fasting glucose)
    } else if (value >= 100 && value < 126) {
      return { color: '#FFC371', name: 'prediabetes' } // Yellow for healthy (prediabetes)
    } else if (value >= 126 && value < 200) {
      return { color: '#FFA500', name: 'diabetes' } // Orange for high caution (diabetes)
    } else {
      return { color: '#8B0000', name: 'severe diabetes' } // Dark Red for high danger (severe diabetes)
    }
  }
}
