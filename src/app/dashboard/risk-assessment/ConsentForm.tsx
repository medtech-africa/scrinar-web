import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import SignatureCanvas from 'react-signature-canvas'

export const ConsentForm = () => {
  const { control } = useFormContext()
  const [signatureRef, setSignatureRef] = useState<any>(null)

  return (
    <PageCard
      title="Consent & Data Use"
      bodyStyle="px-4 pb-4 gap-4 flex flex-col"
    >
      <div className="flex items-start space-x-2">
        <Controller
          name="consent.agreed"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="consent"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <label htmlFor="consent" className="text-sm">
          I consent to the collection and use of my health information for
          screening purposes.
        </label>
      </div>

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
            canvasProps={{
              className: 'w-full h-32',
            }}
          />
        </div>
        <div className="flex justify-end mt-2">
          <Button
            type="button"
            onClick={() => signatureRef?.clear()}
            variant="secondary"
          >
            Clear
          </Button>
        </div>
      </div>

      <Controller
        name="consent.email"
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
    </PageCard>
  )
}
