import { PageCard } from '@/components/ui/page-card'
import { TextArea } from '@/components/ui/textarea'
import { Controller, useFormContext } from 'react-hook-form'

export const ProviderNotesForm = () => {
  const { control } = useFormContext()

  return (
    <PageCard
      title="Healthcare Provider Notes"
      bodyStyle="px-4 pb-4 gap-4 flex flex-col"
    >
      <Controller
        name="providerNotes.notes"
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
