/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { BadgeField } from '@/components/ui/badge'
import { PageCard } from '@/components/ui/page-card'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ToastField } from '@/components/ui/toast'
import isValidNumber from '@/utils/isValidNumber'
import {
  calculateBloodPressureRisk,
  categorizeBMIWHO2007,
  categorizeBloodSugarLevel,
  categorizeHDLC,
  categorizeLDLC,
  categorizeTG,
  categorizeTotalCholesterol,
} from '@/utils/vitalCalculations'

import Modal from '@/components/ui/modal'
import { useHealthValue } from '@/context/health-data-context'
import { HealthDataPayload } from '@/types/healthData.types'
import { NutritionalModal } from '@/app/dashboard/health-data/add-record/nutritionalModal'
import { ExerciseModal } from '@/app/dashboard/health-data/add-record/exerciseModal'
import { Survey } from '@/app/dashboard/health-data/add-record/survey'

type HealthDataPayloadEx = Omit<HealthDataPayload, 'userId'>
export const AddHealthDataRecord = ({
  onSubmit,
  addLoading = false,
  resetFields = false,
  student,
  studentAddedId,
  modalType,
  openModal,
  setModalType,
  setOpenModal,
}: {
  onSubmit: (healthData: HealthDataPayloadEx, showSurveys?: boolean) => void
  addLoading: boolean
  resetFields: boolean
  student: {
    gender: string
    age: number
  }
  studentAddedId: string
  modalType: string
  openModal: boolean
  setOpenModal: (value: boolean) => void
  setModalType: (value: string) => void
}) => {
  const { exerciseData, nutritionalData, setExerciseData, setNutritionalData } =
    useHealthValue()

  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [waist, setWaist] = useState('')
  const [bmi, setBmi] = useState(0)
  const [totalCholesterol, setTotalCholesterol] = useState('')
  const [ldlc, setLdlc] = useState('')
  const [hdlc, setHdlc] = useState('')
  const [tg, setTg] = useState('')
  const [pulse, setPulse] = useState('')

  const [sys, setSys] = useState('')
  const [dys, setDys] = useState('')

  const [bloodSugar, setBloodSugar] = useState('')

  const variantValidityCheck = (val: string) =>
    val && !isValidNumber(val) ? 'destructive' : 'default'
  const messageCheck = (val: string) =>
    val && !isValidNumber(val) ? 'Please enter a valid health value' : ''

  //bmi calculation
  useEffect(() => {
    if (isValidNumber(height) && isValidNumber(weight)) {
      const val = Number(
        (Number(weight) / Math.pow(Number(height) / 100, 2)).toFixed(1)
      )
      setBmi(val)
    } else {
      setBmi(0)
    }
  }, [height, weight])
  const handleSubmit = async (e: any, showSurveys = false) => {
    e.preventDefault()

    if (
      !height &&
      !weight &&
      !waist &&
      !pulse &&
      !sys &&
      !dys &&
      !bloodSugar &&
      !nutritionalData &&
      !exerciseData
    ) {
      return toast.custom(
        <ToastField
          variant={'warning2'}
          label={'Please provide a health value'}
          action1={() => toast.remove()}
        />
      )
    }

    const dataToSend = {
      bmi: bmi.toString(),
      ...(height && { height }),
      ...(weight && { weight }),
      ...(waist && { waist }),
      ...(sys && dys && { bloodPressure: `${sys}/${dys}` }),
      ...(pulse && { pulse }),
      ...(bloodSugar && { glucoseLevel: bloodSugar }),
      ...(bloodSugar && { glucoseLevel: bloodSugar }),
      ...(totalCholesterol && {
        cholesterol: {
          totalCholesterol: totalCholesterol,
          ldl: ldlc,
          hdl: hdlc,
          triglycerides: tg,
        },
      }),
      dietaryDiversity: nutritionalData,
      physicalActivity: exerciseData,
    }

    onSubmit(dataToSend as HealthDataPayloadEx, showSurveys)
  }

  useEffect(() => {
    let mounted = true
    if (resetFields || mounted) {
      setHeight('')
      setWeight('')
      setWaist('')
      setBmi(0)
      setDys('')
      setSys('')
      setBloodSugar('')
      setTotalCholesterol('')
      setLdlc('')
      setHdlc('')
      setTg('')
      setPulse('')
      setNutritionalData(null)
      setExerciseData(null)
      mounted = false
    }
  }, [resetFields])

  return (
    <div className="w-full h-full">
      <Text
        variant="display/xs"
        weight="medium"
        className="text-grey-900 capitalize my-6"
      >
        Health Data
      </Text>
      <div className="grid md:grid-cols-2 gap-6 pb-7 mt-2">
        <PageCard title="Antropometry">
          <div className="flex gap-3 w-full p-4">
            <Input
              placeholder="0"
              label="Height(cm)"
              labelStyle="flex justify-center items-center"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              variant={variantValidityCheck(height)}
              message={messageCheck(height)}
            />
            <Input
              placeholder="0"
              label="Weight(kg)"
              labelStyle="flex justify-center items-center"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              variant={variantValidityCheck(weight)}
              message={messageCheck(weight)}
            />
            <Input
              placeholder="0"
              label="Waist(cm)"
              labelStyle="flex justify-center items-center"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              variant={variantValidityCheck(waist)}
              message={messageCheck(waist)}
            />
          </div>
          <div className="mt-4">
            <div className="bg-grey-50 w-full p-4 flex justify-center">
              <Text>BMI Result</Text>
            </div>
            <div className="flex flex-col justify-center items-center gap-y-4 p-4">
              <Text
                variant="display/sm"
                weight="bold"
                className="text-grey-700"
              >
                {!!bmi ? bmi : '-'}
              </Text>
              {!!bmi && (
                <BadgeField
                  variant={
                    student?.gender
                      ? categorizeBMIWHO2007(
                          Number(student?.age),
                          student?.gender,
                          bmi
                        )?.variant
                      : undefined
                  }
                  value={
                    student?.gender
                      ? categorizeBMIWHO2007(
                          Number(student?.age),
                          student?.gender,
                          bmi
                        )?.message
                      : undefined
                  }
                />
              )}
            </div>
            <Label className="px-4 flex justify-center">
              * BMI automatically generated
            </Label>
          </div>
        </PageCard>

        <div className="h-full">
          <PageCard title="Blood Pressure" bodyStyle="p-4">
            <div className="grid grid-cols-[2fr_1fr] items-center">
              <div className="flex">
                <Input
                  placeholder="000"
                  label="Sys"
                  labelStyle="lg:text-sm text-xs"
                  value={sys}
                  onChange={(e) => setSys(e.target.value)}
                  variant={variantValidityCheck(sys)}
                  message={messageCheck(sys)}
                />
                <Text className="mt-6 mx-2" variant="display/sm">
                  /
                </Text>
                <Input
                  placeholder="00"
                  label="Dys"
                  labelStyle="lg:text-sm text-xs"
                  value={dys}
                  onChange={(e) => setDys(e.target.value)}
                  variant={variantValidityCheck(dys)}
                  message={messageCheck(dys)}
                />
              </div>
              {sys && dys && (
                <BadgeField
                  variant={
                    calculateBloodPressureRisk(Number(sys), Number(dys)).variant
                  }
                  value={
                    calculateBloodPressureRisk(Number(sys), Number(dys)).message
                  }
                  className="ml-2 mt-6"
                />
              )}
            </div>
            <div>
              <div className="flex mt-4">
                <Input
                  placeholder="00"
                  label="Pulse"
                  labelStyle="lg:text-sm text-xs"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  variant={variantValidityCheck(pulse)}
                  message={messageCheck(pulse)}
                />
              </div>
            </div>
          </PageCard>

          <PageCard title="Blood Sugar" bodyStyle="p-4 mt-4">
            <div className="grid grid-cols-[2fr_1fr]  items-center">
              <Input
                placeholder="170"
                label="RBS (mg/dL)"
                value={bloodSugar}
                labelStyle="lg:text-sm text-xs"
                onChange={(e) => setBloodSugar(e.target.value)}
                variant={variantValidityCheck(bloodSugar)}
                message={messageCheck(bloodSugar)}
              />
              {bloodSugar && (
                <BadgeField
                  variant={
                    categorizeBloodSugarLevel(Number(bloodSugar)).variant
                  }
                  value={categorizeBloodSugarLevel(Number(bloodSugar)).message}
                  className="ml-2 mt-6"
                />
              )}
            </div>
          </PageCard>
          <PageCard title="Cholesterol (mg/dL)" bodyStyle="p-4 mt-4">
            <div className="grid grid-cols-[2fr_2fr] gap-2 items-baseline">
              <div className="flex flex-col">
                <Input
                  placeholder="170"
                  label="TC"
                  value={totalCholesterol}
                  labelStyle="lg:text-sm text-xs"
                  onChange={(e) => setTotalCholesterol(e.target.value)}
                  variant={variantValidityCheck(totalCholesterol)}
                  message={messageCheck(totalCholesterol)}
                />

                {totalCholesterol && (
                  <BadgeField
                    variant={
                      categorizeTotalCholesterol(Number(totalCholesterol))
                        .variant
                    }
                    value={
                      categorizeTotalCholesterol(Number(totalCholesterol))
                        .message
                    }
                    className="ml-2 mt-6"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Input
                  placeholder="170"
                  label="LDLC"
                  value={ldlc}
                  labelStyle="lg:text-sm text-xs"
                  onChange={(e) => setLdlc(e.target.value)}
                  variant={variantValidityCheck(ldlc)}
                  message={messageCheck(ldlc)}
                />
                {ldlc && (
                  <BadgeField
                    variant={categorizeLDLC(Number(ldlc)).variant}
                    value={categorizeLDLC(Number(ldlc)).message}
                    className="ml-2 mt-6"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Input
                  placeholder="170"
                  label="HDLC"
                  value={hdlc}
                  labelStyle="lg:text-sm text-xs"
                  onChange={(e) => setHdlc(e.target.value)}
                  variant={variantValidityCheck(hdlc)}
                  message={messageCheck(hdlc)}
                />
                {hdlc && (
                  <BadgeField
                    variant={categorizeHDLC(Number(hdlc)).variant}
                    value={categorizeHDLC(Number(hdlc)).message}
                    className="ml-2 mt-6"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Input
                  placeholder="170"
                  label="TG"
                  value={tg}
                  labelStyle="lg:text-sm text-xs"
                  onChange={(e) => setTg(e.target.value)}
                  variant={variantValidityCheck(tg)}
                  message={messageCheck(tg)}
                />

                {tg && (
                  <BadgeField
                    variant={categorizeTG(Number(tg)).variant}
                    value={categorizeTG(Number(tg)).message}
                    className="ml-2 mt-6"
                  />
                )}
              </div>
            </div>
          </PageCard>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-7 mt-2">
        <PageCard title="Nutritional Assess" bodyStyle="p-4">
          <div className="flex gap-3 items-center">
            <Label>Dietary Diversity Score </Label>
            {/* <BadgeField variant="error" value="Poor" />*/}
            <Text
              variant="text/sm"
              className="text-primary cursor-pointer underline"
              as="span"
              onClick={() => {
                setModalType('Nutritional')
                setOpenModal(true)
              }}
            >
              Open Questionnaire
            </Text>
            {nutritionalData && (
              <BadgeField variant="success" value="Changes Saved" />
            )}
          </div>
        </PageCard>
        <PageCard title="Exercise/Activity" bodyStyle="p-4">
          <div className="flex gap-3 items-center">
            <Label>Physical Activity Score </Label>
            {/* <BadgeField variant="error" value="Poor" />*/}
            <Text
              variant="text/sm"
              className="text-primary cursor-pointer underline"
              as="span"
              onClick={() => {
                setModalType('Exercise')
                setOpenModal(true)
              }}
            >
              Open Questionnaire
            </Text>
            {exerciseData && (
              <BadgeField variant="success" value="Changes Saved" />
            )}
          </div>
        </PageCard>
        <PageCard title="Survey" bodyStyle="p-4">
          <div className="flex gap-3 items-center">
            <Label>Survey</Label>
            {/* <BadgeField variant="error" value="Poor" />*/}
            <Text
              variant="text/sm"
              className="text-primary cursor-pointer underline"
              as="span"
              onClick={(e) =>
                studentAddedId
                  ? (setModalType('Survey'), setOpenModal(true))
                  : handleSubmit(e, true)
              }
            >
              Start Survey
            </Text>

            <BadgeField variant="success" value="Saves Automatically" />
          </div>
        </PageCard>
      </div>
      <Button
        variant={'primary'}
        value="Create and Save Data"
        leadingIcon={<IconPicker icon="saveAdd" />}
        className="mt-6"
        type="submit"
        onClick={handleSubmit}
        loading={addLoading}
      />

      <Modal
        open={openModal}
        closeModal={() => setOpenModal(false)}
        title={`Add new ${modalType}`}
      >
        {modalType === 'Nutritional' && (
          <NutritionalModal onClose={() => setOpenModal(false)} />
        )}
        {modalType === 'Exercise' && (
          <ExerciseModal onClose={() => setOpenModal(false)} />
        )}
        {modalType === 'Survey' && (
          <Survey
            onClose={() => setOpenModal(false)}
            studentId={studentAddedId ?? ''}
          />
        )}
      </Modal>
    </div>
  )
}
