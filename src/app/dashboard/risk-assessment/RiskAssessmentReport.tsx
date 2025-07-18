'use client'
import { ConsentForm } from './ConsentForm'
import { RiskAssessmentResult } from '@/components/risk-assessment/RiskAssessmentResult'
import { ReportActions } from '@/components/risk-assessment/PDFReport'
import {
  RiskAssessmentModel,
  RiskData,
} from '@/hooks/queries/useRiskAssessment'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'

// Helper function to validate and transform the data
const validateAndTransformData = (data?: Partial<RiskAssessmentModel>) => {
  if (!data?.responseData) return data

  const transformedResponseData = { ...data.responseData }

  // Ensure criticalAlerts exists and has correct structure
  if (!transformedResponseData.criticalAlerts) {
    transformedResponseData.criticalAlerts = []
  } else {
    // Validate each alert has the required structure
    transformedResponseData.criticalAlerts =
      transformedResponseData.criticalAlerts.map((alert: any) => ({
        severity: alert.severity || 'warning',
        title: alert.title || 'Alert',
        description:
          alert.description || 'Please consult with your healthcare provider.',
      }))
  }

  // Validate and fix WHO data
  if (transformedResponseData.who) {
    const who = transformedResponseData.who
    if (!who.diseaseBreakdown) {
      who.diseaseBreakdown = {}
    }
    if (!who.status) {
      who.status = true
    }
    if (!who.breakdown) {
      who.breakdown = {
        age: 0,
        bmi: 0,
        bloodPressure: 0,
        smoking: 0,
        diabetes: 0,
        cholesterol: 0,
      }
    }
    if (!who.predictions) {
      who.predictions = []
    } else {
      // Validate predictions structure
      who.predictions = who.predictions.map((pred: any) => ({
        month: pred.month || 0,
        low: pred.low || 0,
        moderate: pred.moderate || 0,
        high: pred.high || 0,
      }))
    }
  }

  // Validate and fix FINDRISC data
  if (transformedResponseData.findrisc) {
    const findrisc = transformedResponseData.findrisc
    if (!findrisc.diseaseBreakdown) {
      findrisc.diseaseBreakdown = {}
    }
    if (!findrisc.status) {
      findrisc.status = true
    }
    if (!findrisc.breakdown) {
      findrisc.breakdown = {
        age: 0,
        bmi: 0,
        waist: 0,
        physicalActivity: 0,
        familyHistory: 0,
        diet: 0,
      }
    }
    if (!findrisc.predictions) {
      findrisc.predictions = []
    } else {
      // Validate predictions structure
      findrisc.predictions = findrisc.predictions.map((pred: any) => ({
        month: pred.month || 0,
        low: pred.low || 0,
        moderate: pred.moderate || 0,
        high: pred.high || 0,
      }))
    }
  }

  // Validate and fix COPD data
  if (transformedResponseData.copd) {
    const copd = transformedResponseData.copd as any // Type assertion for the raw data
    // Transform COPD data to match expected interface
    const transformedCopd = {
      followUpAction:
        copd.recommendations?.join('. ') ||
        'Please consult with your healthcare provider.',
      lifestyleModification:
        'Consider smoking cessation and avoid dust exposure.',
      personalizedAdvice: `Your COPD risk score is ${copd.riskScore || 0}. ${copd.copdRisk ? `COPD risk: ${copd.copdRisk}%` : ''} ${copd.lungCancerRisk ? `Lung cancer risk: ${copd.lungCancerRisk}%` : ''}`,
      score: copd.riskScore?.toString() || '0',
      riskLevel: copd.riskCategory?.toLowerCase() || 'low',
      breakdown: {
        coughDuration: 0,
        shortnessOfBreath: 0,
        activityLimitations: 0,
        exposureToDust: 0,
        smokingHistory: 0,
      },
      status: true,
      diseaseBreakdown: {},
      predictions: [],
    }
    transformedResponseData.copd = transformedCopd
  }

  // Validate and fix Breast Cancer data
  if (transformedResponseData.breastCancer) {
    const breastCancer = transformedResponseData.breastCancer
    if (!breastCancer.diseaseBreakdown) {
      breastCancer.diseaseBreakdown = {}
    }
    if (!breastCancer.breakdown) {
      breastCancer.breakdown = {
        age: 0,
        ageAtMenarche: 0,
        ageAtFirstBirth: 0,
        ageAtMenopause: 0,
        hormoneReplacementTherapy: 0,
        benignBreastDisease: 0,
        familyHistory: 0,
        brcaMutationStatus: 0,
        breastDensity: 0,
      }
    }
    if (!breastCancer.predictions) {
      breastCancer.predictions = []
    }
  }

  // Add missing models with default values if they don't exist
  const requiredModels = ['prostateCancer', 'colorectalCancer', 'ckd'] as const
  requiredModels.forEach((model) => {
    if (!transformedResponseData[model]) {
      ;(transformedResponseData as any)[model] = {
        followUpAction: 'Please consult with your healthcare provider.',
        lifestyleModification:
          'Maintain a healthy lifestyle with regular exercise and balanced diet.',
        personalizedAdvice: 'Regular health check-ups are recommended.',
        score: '0',
        riskLevel: 'low',
        breakdown: {},
        status: true,
        diseaseBreakdown: {},
        predictions: [],
      }
    }
  })

  return {
    ...data,
    responseData: transformedResponseData,
  }
}

export const RiskAssessmentReport = ({
  data,
  action,
  assessmentId,
  personalInfo,
  className,
  // TODO whether to hide the buttons
  // showActionButton = true,
}: {
  data?: Partial<RiskAssessmentModel>
  action?: React.ReactElement
  assessmentId?: string
  className?: string
  personalInfo?: any
  showActionButton?: boolean
}) => {
  // Validate and transform the data
  const validatedData = useMemo(() => validateAndTransformData(data), [data])

  const riskData = useMemo(
    () =>
      validatedData?.responseData
        ? Object.assign(
            {},
            validatedData?.responseData,
            validatedData?.requestData
          )
        : {},
    [validatedData]
  ) as RiskData

  return (
    <div className={cn('w-full', className)}>
      {validatedData?.responseData && (
        <RiskAssessmentResult
          data={riskData}
          ncdType={validatedData?.requestData?.ncdType}
        />
      )}
      <ConsentForm assessmentId={assessmentId} />

      {validatedData?.responseData && (
        <ReportActions
          assessmentData={riskData}
          personalInfo={personalInfo}
          assessmentId={assessmentId}
        />
      )}
      {action}
    </div>
  )
}
