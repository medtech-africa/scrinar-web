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
    if (!who.tenYearPredictions) {
      who.tenYearPredictions = []
    } else {
      // Validate ten year predictions structure
      who.tenYearPredictions = who.tenYearPredictions.map((pred: any) => ({
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
        waistCircumference: 0,
        physicalActivity: 0,
        familyHistory: 0,
        diet: 0,
        fruitVegetableIntake: 0,
        antihypertensiveMedication: 0,
        highBloodGlucoseHistory: 0,
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

  // Validate and fix COPD data - handle both old and new structure
  if (transformedResponseData.copd) {
    const copd = transformedResponseData.copd as any
    // Check if it's the new structure (with riskScore, riskCategory, etc.)
    if (copd.riskScore !== undefined && copd.riskCategory !== undefined) {
      // New COPD structure
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
        // Keep the new fields
        riskScore: copd.riskScore,
        riskCategory: copd.riskCategory,
        copdRisk: copd.copdRisk,
        lungCancerRisk: copd.lungCancerRisk,
        recommendations: copd.recommendations,
      }
      transformedResponseData.copd = transformedCopd
    } else {
      // Old COPD structure - ensure all required fields exist
      if (!copd.diseaseBreakdown) {
        copd.diseaseBreakdown = {}
      }
      if (!copd.status) {
        copd.status = true
      }
      if (!copd.breakdown) {
        copd.breakdown = {
          coughDuration: 0,
          shortnessOfBreath: 0,
          activityLimitations: 0,
          exposureToDust: 0,
          smokingHistory: 0,
        }
      }
      if (!copd.predictions) {
        copd.predictions = []
      } else {
        // Validate predictions structure
        copd.predictions = copd.predictions.map((pred: any) => ({
          month: pred.month || 0,
          low: pred.low || 0,
          moderate: pred.moderate || 0,
          high: pred.high || 0,
        }))
      }
    }
  }

  // Validate and fix Breast Cancer data
  if (transformedResponseData.breastCancer) {
    const breastCancer = transformedResponseData.breastCancer
    if (!breastCancer.diseaseBreakdown) {
      breastCancer.diseaseBreakdown = {}
    }
    if (!breastCancer.status) {
      breastCancer.status = true
    }
    if (!breastCancer.breakdown) {
      breastCancer.breakdown = {
        age: 0,
        ageAtMenarche: 0,
        ageAtFirstBirth: 0,
        ageAtMenopause: 0,
        hormoneReplacementTherapy: 0,
        breastBiopsy: 0,
        familyHistory: 0,
        brcaMutationStatus: 0,
        breastDensity: 0,
      }
    }
    if (!breastCancer.predictions) {
      breastCancer.predictions = []
    } else {
      // Validate predictions structure
      breastCancer.predictions = breastCancer.predictions.map((pred: any) => ({
        month: pred.month || 0,
        low: pred.low || 0,
        moderate: pred.moderate || 0,
        high: pred.high || 0,
      }))
    }
  }

  // Validate and fix Prostate Cancer data
  if (transformedResponseData.prostate) {
    const prostate = transformedResponseData.prostate
    if (!prostate.diseaseBreakdown) {
      prostate.diseaseBreakdown = {}
    }
    if (!prostate.status) {
      prostate.status = true
    }
    if (!prostate.breakdown) {
      prostate.breakdown = {
        age: 0,
        familyHistory: 0,
        psaLevel: 0,
        prostateVolume: 0,
        previousBiopsy: 0,
        freeToTotalPsaRatio: 0,
        ethnicity: 0,
        urinarySymptoms: 0,
      }
    }
    if (!prostate.predictions) {
      prostate.predictions = []
    } else {
      // Validate predictions structure
      prostate.predictions = prostate.predictions.map((pred: any) => ({
        month: pred.month || 0,
        low: pred.low || 0,
        moderate: pred.moderate || 0,
        high: pred.high || 0,
      }))
    }
  }

  // Validate and fix Colorectal Cancer data
  if (transformedResponseData.colorectal) {
    const colorectal = transformedResponseData.colorectal
    if (!colorectal.diseaseBreakdown) {
      colorectal.diseaseBreakdown = {}
    }
    if (!colorectal.status) {
      colorectal.status = true
    }
    if (!colorectal.breakdown) {
      colorectal.breakdown = {
        age: 0,
        personalHistory: 0,
        familyHistory: 0,
        smokingStatus: 0,
        diet: 0,
        physicalActivity: 0,
        medicalHistory: 0,
        medicationUse: 0,
      }
    }
    if (!colorectal.predictions) {
      colorectal.predictions = []
    } else {
      // Validate predictions structure
      colorectal.predictions = colorectal.predictions.map((pred: any) => ({
        month: pred.month || 0,
        low: pred.low || 0,
        moderate: pred.moderate || 0,
        high: pred.high || 0,
      }))
    }
  }

  // Validate and fix CKD data - handle both old and new structure
  if (transformedResponseData.ckd) {
    const ckd = transformedResponseData.ckd as any
    // Check if it's the new structure (with eGFR, stage, etc.)
    if (ckd.eGFR !== undefined && ckd.stage !== undefined) {
      // New CKD structure
      const transformedCkd = {
        followUpAction:
          ckd.recommendation || 'Please consult with your healthcare provider.',
        lifestyleModification:
          'Maintain a healthy lifestyle with regular exercise and balanced diet.',
        personalizedAdvice: `Your eGFR is ${ckd.eGFR || 0} and you are at ${ckd.stage || 'unknown'} stage. ${ckd.interpretation || ''}`,
        score: ckd.stage || '0',
        riskLevel: 'low',
        breakdown: {
          age: 0,
          serumCreatinine: 0,
          diabetes: 0,
          hypertension: 0,
          familyHistory: 0,
          cardiovascularDisease: 0,
          medications: 0,
          symptoms: 0,
          lifestyle: 0,
        },
        status: true,
        diseaseBreakdown: {},
        predictions: [],
        // Keep the new fields
        eGFR: ckd.eGFR,
        stage: ckd.stage,
        interpretation: ckd.interpretation,
        recommendation: ckd.recommendation,
      }
      transformedResponseData.ckd = transformedCkd
    } else {
      // Old CKD structure - ensure all required fields exist
      if (!ckd.diseaseBreakdown) {
        ckd.diseaseBreakdown = {}
      }
      if (!ckd.status) {
        ckd.status = true
      }
      if (!ckd.breakdown) {
        ckd.breakdown = {
          age: 0,
          serumCreatinine: 0,
          diabetes: 0,
          hypertension: 0,
          familyHistory: 0,
          cardiovascularDisease: 0,
          medications: 0,
          symptoms: 0,
          lifestyle: 0,
        }
      }
      if (!ckd.predictions) {
        ckd.predictions = []
      } else {
        // Validate predictions structure
        ckd.predictions = ckd.predictions.map((pred: any) => ({
          month: pred.month || 0,
          low: pred.low || 0,
          moderate: pred.moderate || 0,
          high: pred.high || 0,
        }))
      }
    }
  }

  // Handle ckdOutput if it exists
  if (transformedResponseData.ckdOutput) {
    const ckdOutput = transformedResponseData.ckdOutput
    if (!ckdOutput.status) {
      ckdOutput.status = true
    }
  }

  // Handle prostateOutput if it exists
  if (transformedResponseData.prostateOutput) {
    const prostateOutput = transformedResponseData.prostateOutput
    if (!prostateOutput.status) {
      prostateOutput.status = true
    }
  }

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

  const riskData = useMemo(() => {
    if (!validatedData?.responseData) return {}

    // Merge responseData and requestData
    const mergedData = Object.assign(
      {},
      validatedData?.responseData,
      validatedData?.requestData
    )

    // Handle ckdOutput if it exists - merge it with ckd data
    if (mergedData.ckdOutput && mergedData.ckd) {
      mergedData.ckd = {
        ...mergedData.ckd,
        ...mergedData.ckdOutput,
      }
    }

    return mergedData
  }, [validatedData]) as RiskData

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
