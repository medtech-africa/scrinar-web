'use client'
import React, { useEffect, useState, useRef } from 'react'
import { RiskAssessmentForm } from '../RiskAssessmentForm'
import { useSearchParams, useRouter } from 'next/navigation'
import { useRiskAssessmentStorage } from '@/hooks/useRiskAssessmentStorage'
import { RiskAssessmentModelRequestData } from '@/hooks/queries/useRiskAssessment'
import { usePatient } from '@/hooks/queries/usePatients'
import { useRiskAssessment } from '@/hooks/queries/useRiskAssessment'
import { useMutation } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import toast from 'react-hot-toast'

import ContentLoader from '@/components/content-loader'
import { Text } from '@/components/ui/text'

const RiskAssessment = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const patientId = searchParams.get('patientId')
  const storageId = searchParams.get('storageId')
  const urlAssessmentId = searchParams.get('assessmentId')

  const [formData, setFormData] =
    useState<RiskAssessmentModelRequestData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [assessmentId, setAssessmentId] = useState<string | null>(
    urlAssessmentId
  )
  const [currentPatientId, setCurrentPatientId] = useState<string | null>(
    patientId
  )

  // Ref to track if assessment creation has been triggered
  const assessmentCreationTriggered = useRef(false)

  const getStorageData = useRiskAssessmentStorage((store) => store.get)

  // Fetch patient data if patientId is provided
  const {
    data: patient,
    isPending: isPatientLoading,
    error: patientError,
  } = usePatient(patientId || '')

  // Fetch existing assessment data if urlAssessmentId is provided
  const { data: existingAssessment, isPending: isAssessmentLoading } =
    useRiskAssessment(urlAssessmentId || '')

  // Create assessment mutation
  const { mutate: createAssessment, isPending: isCreatingAssessment } =
    useMutation({
      mutationFn: async (data: any) => {
        const response = await baseAxios.post(
          API.createRiskAssessment(data.userId),
          data
        )
        return response.data.data
      },
      onSuccess: (data) => {
        setAssessmentId(data.id)
        // Update URL to include the assessment ID
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.set('assessmentId', data.id)
        router.replace(newUrl.pathname + newUrl.search)
        toast.success('Assessment created successfully')
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || 'Failed to create assessment'
        )
      },
    })

  // Handle patient creation success
  const handlePatientCreated = (newPatientId: string) => {
    setCurrentPatientId(newPatientId)
    // Update URL to include the new patient ID
    const newUrl = new URL(window.location.href)
    newUrl.searchParams.set('patientId', newPatientId)
    router.replace(newUrl.pathname + newUrl.search)
  }

  useEffect(() => {
    const initializeFormData = async () => {
      setIsLoading(true)

      try {
        let initialData: RiskAssessmentModelRequestData | null = null

        // If we have an existing assessment, use its data
        if (existingAssessment?.user?.id) {
          initialData = existingAssessment
        }
        // If we have a storageId, get from local storage (only if no existing assessment)
        else if (storageId) {
          const storedData = getStorageData(
            storageId
          ) as unknown as RiskAssessmentModelRequestData | null
          if (storedData) {
            initialData = storedData
          }
        }

        // If we have patient data, create or update initial data with patient info
        if (patient) {
          // If no initial data exists, create new data structure
          if (!initialData) {
            initialData = {
              ncdType: 'all',
              personalInfo: {
                firstName: patient.firstName || '',
                middleName: patient.middleName || '',
                lastName: patient.lastName || '',
                age: patient.age || 18,
                gender: patient.gender || '',
                ethnicity: patient.ethnicity || '',
                country: patient.country || '',
                occupation: patient.occupation || '',
                phoneNumber: patient.phoneNumber || '',
                address: patient.address || '',
                nationalId: patient.nationalId || '',
                emergencyContact: patient.emergencyContact || '',
              },
            }
          } else {
            // If initial data exists, update the personal info with patient data
            initialData = {
              ...initialData,
              personalInfo: {
                firstName: patient.firstName || '',
                middleName: patient.middleName || '',
                lastName: patient.lastName || '',
                age: patient.age || 18,
                gender: patient.gender || '',
                ethnicity: patient.ethnicity || '',
                country: patient.country || '',
                occupation: patient.occupation || '',
                phoneNumber: patient.phoneNumber || '',
                address: patient.address || '',
                nationalId: patient.nationalId || '',
                emergencyContact: patient.emergencyContact || '',
              },
            }
          }

          // Create assessment when patient data is available and no assessment ID exists
          // and assessment creation hasn't been triggered yet
          if (
            patient.id &&
            !urlAssessmentId &&
            !assessmentId &&
            !assessmentCreationTriggered.current
          ) {
            assessmentCreationTriggered.current = true
            createAssessment({
              userId: patient.id,
              ncdType: 'all',
            })
          }
        }

        setFormData(initialData)
      } catch (error) {
        console.error('Error initializing form data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeFormData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    storageId,
    patient,
    getStorageData,
    createAssessment,
    urlAssessmentId,
    existingAssessment,
  ])

  // Show loading state while fetching data
  if (
    isLoading ||
    isPatientLoading ||
    isAssessmentLoading ||
    (isCreatingAssessment && !urlAssessmentId && !assessmentId)
  ) {
    return <ContentLoader loading />
  }

  // Handle case where patientId is provided but patient not found
  if (patientId && patientError && !isPatientLoading) {
    return (
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">NCD Risk Assessment</h1>
          <p>
            Non communicable Diseases (NCDs) are chronic conditions that are not
            transmitted from person to person, such as diabetes, cardiovascular
            disease, cancer, and chronic respiratory diseases.
          </p>
          <p>
            This screening page is designed for use in pharmacies and hospitals
            to assess a patient&apos;s risk of developing NCDs over a 2 year
            period, using vital signs, family history, personal lifestyle and
            screening responses to provide a comprehensive risk assessment.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
            <Text variant="text/sm" className="font-medium text-red-900 mb-2">
              ⚠️ Patient Not Found
            </Text>
            <Text variant="text/sm" className="text-red-800 mb-4">
              The patient with ID &quot;{patientId}&quot; could not be found.
              You can proceed with creating a new patient assessment.
            </Text>
            <button
              onClick={() => {
                const newUrl = new URL(window.location.href)
                newUrl.searchParams.delete('patientId')
                router.replace(newUrl.pathname + newUrl.search)
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Create New Patient Assessment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">NCD Risk Assessment</h1>
        <p>
          Non communicable Diseases (NCDs) are chronic conditions that are not
          transmitted from person to person, such as diabetes, cardiovascular
          disease, cancer, and chronic respiratory diseases.
        </p>
        <p>
          This screening page is designed for use in pharmacies and hospitals to
          assess a patient&apos;s risk of developing NCDs over a 2 year period,
          using vital signs, family history, personal lifestyle and screening
          responses to provide a comprehensive risk assessment.
        </p>

        {/* Show patient info if available */}
        {patient && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <Text variant="text/sm" className="font-medium text-blue-900 mb-2">
              Patient Information
            </Text>
            <Text variant="text/sm" className="text-blue-800 capitalize">
              {[patient.firstName, patient.middleName, patient.lastName]
                .filter(Boolean)
                .join(' ')}
              {patient.nationalId && ` (ID: ${patient.nationalId})`}
            </Text>
          </div>
        )}

        {/* Show status message for existing patient flow */}
        {patientId &&
          !urlAssessmentId &&
          !assessmentId &&
          isCreatingAssessment && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <Text
                variant="text/sm"
                className="font-medium text-yellow-900 mb-2"
              >
                ⚠️ Creating Assessment
              </Text>
              <Text variant="text/sm" className="text-yellow-800">
                Please wait while we create your assessment...
              </Text>
            </div>
          )}

        {/* Show status message for new patient flow */}
        {!patientId && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
            <Text variant="text/sm" className="font-medium text-green-900 mb-2">
              📝 New Patient Assessment
            </Text>
            <Text variant="text/sm" className="text-green-800">
              Please fill in the patient information below to create a new
              patient profile and start the assessment.
            </Text>
          </div>
        )}
      </div>
      <div className="">
        <div className="grid">
          <RiskAssessmentForm
            data={
              formData
                ? {
                    requestData: formData as RiskAssessmentModelRequestData,
                  }
                : undefined
            }
            patientId={currentPatientId}
            assessmentId={assessmentId}
            isPatientDataPrefilled={!!patient}
            onPatientCreated={handlePatientCreated}
          />
        </div>
      </div>
    </div>
  )
}

export default RiskAssessment
