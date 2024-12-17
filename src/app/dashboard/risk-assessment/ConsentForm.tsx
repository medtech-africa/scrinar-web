import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { TextArea } from '@/components/ui/textarea'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import SignatureCanvas from 'react-signature-canvas'

const updateConsent = async (data: any, assessmentId: string) =>
  await baseAxios.patch(`${API.riskAssessment}/${assessmentId}`, data)

export const ConsentForm = ({ assessmentId = '' }) => {
  const { control, setValue, watch } = useFormContext()
  const [signatureRef, setSignatureRef] = useState<any>(null)

  const { mutate } = useMutation({
    mutationFn: (data: any) => updateConsent(data, assessmentId),
  })

  const consentSignature = watch('consentSignature')
  const reportEmail = watch('reportEmail')
  const providerNotes = watch('providerNotes')

  useEffect(() => {
    const data = {
      consentSignature,
      reportEmail,
      providerNotes,
    }

    const timeoutId = setTimeout(() => {
      mutate(data)
    }, 1000)

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consentSignature, reportEmail, providerNotes])

  return (
    <PageCard
      title="Consent & Data Use"
      bodyStyle="px-4 pb-4 gap-4 flex flex-col"
    >
      <div className="bg-yellow-50 p-4 rounded-lg text-sm">
        <p className="font-semibold mb-2">Disclaimer:</p>
        <p>
          This report is not a substitute for a physical exam like mammography
          and X-ray but a screening test. Please consult with your healthcare
          provider for comprehensive medical advice.
        </p>
      </div>

      <div className="border rounded-lg p-4">
        <label className="block text-sm font-medium mb-2">
          Digital Signature
        </label>
        <div className="border rounded-lg bg-white">
          <SignatureCanvas
            ref={(ref: any) => setSignatureRef(ref)}
            onEnd={() => {
              setValue('consentSignature', signatureRef?.toDataURL())
            }}
            canvasProps={{
              className: 'w-full h-32',
            }}
          />
        </div>
        <div className="flex justify-end mt-2">
          <Button
            type="button"
            onClick={() => {
              signatureRef?.clear()
              setValue('consentSignature', null)
            }}
            variant="secondary"
          >
            Clear
          </Button>
        </div>
      </div>

      <Controller
        name="reportEmail"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="email"
            placeholder="Enter email for report delivery"
            label="Email for Report"
          />
        )}
      />

      <Controller
        name="providerNotes"
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            placeholder="Enter additional observations or comments..."
            label="Additional Notes"
            rows={4}
          />
        )}
      />
    </PageCard>
  )
}
