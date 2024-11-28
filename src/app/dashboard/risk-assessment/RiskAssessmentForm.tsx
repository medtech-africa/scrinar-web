'use client'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { PersonalInfoForm } from './PersonalInfoForm'
import { FormProvider, useForm } from 'react-hook-form'
import { VitalsMeasurement } from './VitalsMeasurement'
import { BloodTestsForm } from './BloodTestsForm'

export const RiskAssessmentForm = () => {
  //   const [modalType, setModalType] = useState('')
  //   const [openModal, setOpenModal] = useState(false)

  const formMethods = useForm()

  return (
    <FormProvider {...formMethods}>
      <div className="w-full h-full">
        <PersonalInfoForm />
        {/* Vitals Measurement */}
        <VitalsMeasurement />
        {/* Blood test */}
        <BloodTestsForm />

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
