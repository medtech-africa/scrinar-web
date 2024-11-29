'use client'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { PersonalInfoForm } from './PersonalInfoForm'
import { FormProvider, useForm } from 'react-hook-form'
import { VitalsMeasurement } from './VitalsMeasurement'
import { BloodTestsForm } from './BloodTestsForm'
import { FamilyHistoryLifestyleForm } from './FamilyHistoryLifestyleForm'
import { ScreeningQuestionsForm } from './ScreeningQuestionsForm'
import { HistoricalDataCollectionForm } from './HistoricalDataCollectionForm'

export const RiskAssessmentForm = () => {
  //   const [modalType, setModalType] = useState('')
  //   const [openModal, setOpenModal] = useState(false)

  const formMethods = useForm()

  return (
    <FormProvider {...formMethods}>
      <div className="w-full h-full">
        <div className="flex flex-col gap-y-5">
          <PersonalInfoForm />
          {/* Vitals Measurement */}
          <VitalsMeasurement />
          {/* Blood test */}
          <BloodTestsForm />
          {/* family history */}
          <FamilyHistoryLifestyleForm />
          {/* Screening Questions*/}
          <ScreeningQuestionsForm />
          {/* Historical Data Collection */}
          <HistoricalDataCollectionForm />
        </div>
        {/*  */}
        <Button
          variant={'primary'}
          value="Generate"
          leadingIcon={<IconPicker icon="saveAdd" />}
          className="mt-6"
        />
        <form />
      </div>
    </FormProvider>
  )
}
