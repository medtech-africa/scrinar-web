'use client'
import { BadgeField } from '@/components/ui/badge'
import { PageCard } from '@/components/ui/page-card'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Select } from '@/components/ui/select'
import schoolLevels from '@/constants/school-levels'
import { Label } from '@/components/ui/label'
import useStudents from '@/hooks/queries/useStudents'
import { useEffect, useMemo, useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { returnJoinedFirstCharacter } from '@/utils/returnJoinedFirstCharacter'
import toast from 'react-hot-toast'
import { ToastField } from '@/components/ui/toast'
import isValidNumber from '@/utils/isValidNumber'
import {
  calculateBloodPressureRisk,
  calculateBmiRisk,
  categorizeBloodSugarLevel,
  categorizeTotalCholesterol,
} from '@/utils/vitalCalculations'
import baseAxios from '@/utils/baseAxios'
import { useMutation } from '@tanstack/react-query'
import { API } from '@/utils/api'
import { errorMessage } from '@/utils/errorMessage'
import Modal from '@/components/ui/modal'
import { NutritionalModal } from './nutritionalModal'
import { ExerciseModal } from './exerciseModal'
import { useHealthValue } from '@/context/health-data-context'
import { Student } from '@/types/student.types'
import { HealthDataPayload, SelectVal } from '@/types/healthData.types'

export const AddHealthDataRecordContent = () => {
  const [level, setLevel] = useState<SelectVal | null>()

  const { data: studentsData, isFetching: studentsLoading } = useStudents(
    0,
    level?.value
  )
  const [student, setStudent] = useState<Student | null>()
  const [modalType, setModalType] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const { exerciseData, nutritionalData, setExerciseData, setNutritionalData } =
    useHealthValue()

  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [waist, setWaist] = useState('')
  const [bmi, setBmi] = useState(0)
  const [totalCholesterol, setTotalCholesterol] = useState('')

  const [sys, setSys] = useState('')
  const [dys, setDys] = useState('')

  const [bloodSugar, setBloodSugar] = useState('')

  const { isLoading, mutate } = useMutation((data: HealthDataPayload) =>
    baseAxios.post(API.healthData, data)
  )

  const students = useMemo(
    () =>
      studentsData?.data?.map((st: Omit<Student, 'value' | 'label'>) => ({
        label: `${st?.firstName} ${st?.lastName}`,
        value: st?.id,
        ...st,
      })) ?? [],
    [studentsData]
  )
  const formattedDia = student?.latestHealthData?.bloodPressure?.split('/')[0]
  const formattedSys = student?.latestHealthData?.bloodPressure?.split('/')[1]

  useEffect(() => {
    setHeight(student?.latestHealthData?.height ?? '')
    setWeight(student?.latestHealthData?.weight ?? '')
    setWaist(student?.latestHealthData?.waist ?? '')
    setBmi(Number(student?.latestHealthData?.bmi) ?? '')
    setDys(formattedDia ?? '')
    setSys(formattedSys ?? '')
    setBloodSugar(student?.latestHealthData?.glucoseLevel ?? '')
    setTotalCholesterol(student?.latestHealthData?.cholesterol ?? '')
    student?.latestHealthData?.dietaryDiversity &&
      setNutritionalData(student?.latestHealthData?.dietaryDiversity)
    student?.latestHealthData?.physicalActivity &&
      setExerciseData(student?.latestHealthData?.physicalActivity)
  }, [
    formattedDia,
    formattedSys,
    setExerciseData,
    setNutritionalData,
    student?.latestHealthData?.bmi,
    student?.latestHealthData?.cholesterol,
    student?.latestHealthData?.dietaryDiversity,
    student?.latestHealthData?.glucoseLevel,
    student?.latestHealthData?.height,
    student?.latestHealthData?.physicalActivity,
    student?.latestHealthData?.waist,
    student?.latestHealthData?.weight,
  ])

  const variantValidityCheck = (val: string) =>
    val && !isValidNumber(val) ? 'destructive' : 'default'
  const messageCheck = (val: string) =>
    val && !isValidNumber(val) ? 'Please enter a valid value' : ''

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
  const handleSubmit = () => {
    if (!student)
      return toast.custom(
        <ToastField
          variant={'warning2'}
          label={'Please select a student'}
          action1={() => toast.remove()}
        />
      )
    if (!height && !weight && !waist && !sys && !dys && !bloodSugar) {
      return toast.custom(
        <ToastField
          variant={'warning2'}
          label={'Please provide a value'}
          action1={() => toast.remove()}
        />
      )
    }

    const dataToSend = {
      userId: student?.id,
      bmi: bmi.toString(),
      ...(height && { height }),
      ...(weight && { weight }),
      ...(waist && { waist }),
      ...(sys && dys && { bloodPressure: `${sys}/${dys}` }),
      ...(bloodSugar && { glucoseLevel: bloodSugar }),
      ...(bloodSugar && { glucoseLevel: bloodSugar }),
      ...(totalCholesterol && { cholesterol: totalCholesterol }),
      dietaryDiversity: nutritionalData,
      physicalActivity: exerciseData,
    }
    mutate(dataToSend, {
      onSuccess: () => {
        setHeight('')
        setWeight('')
        setWaist('')
        setBmi(0)
        setDys('')
        setSys('')
        setStudent(null)
        setBloodSugar('')
        setTotalCholesterol('')
        setLevel(null)
        setNutritionalData(null)
        setExerciseData(null)
        toast.success('Successfully added health data')
      },
      onError: (err) => {
        errorMessage(err)
      },
    })
  }

  return (
    <div className="w-full h-full">
      <PageCard title="Student Bio Data" bodyStyle="p-4">
        <div className="flex items-end">
          <div className="flex items-center">
            {student ? (
              <Avatar
                src={student?.avatarUrl}
                fallback={returnJoinedFirstCharacter(
                  student?.firstName,
                  student?.lastName
                )}
              />
            ) : (
              <div className="p-4 rounded-full border border-lust-100 border-dashed ">
                <IconPicker icon="add" className="text-lust-900" />
              </div>
            )}
            <Text
              className="ml-2 text-gray-900"
              variant="text/md"
              weight="medium"
            >
              Student Avatar
            </Text>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <Select
            label="Class"
            full
            labelStyle="lg:text-sm text-xs"
            placeholder="Select Class"
            options={schoolLevels}
            onChange={(val) => {
              setLevel(val as SelectVal)
              setStudent(null)
            }}
            value={level}
          />

          <Select
            label="Student"
            full
            labelStyle="lg:text-sm text-xs"
            placeholder="Select Student"
            isLoading={studentsLoading}
            isDisabled={!level || studentsLoading}
            options={students}
            onChange={(val) => setStudent(val as Student)}
            value={student}
          />
          {student && (
            <>
              <Input
                label="Student Age"
                disabled
                defaultValue={student?.age}
                labelStyle="lg:text-sm text-xs"
              />
              <Input
                label="Student Gender"
                disabled
                defaultValue={student?.gender}
                labelStyle="lg:text-sm text-xs"
                className="capitalize"
              />
            </>
          )}
        </div>
      </PageCard>

      <div className="grid md:grid-cols-2 gap-6 py-7 mt-2">
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
                {bmi}
              </Text>
              {!!bmi && (
                <BadgeField
                  variant={calculateBmiRisk(bmi)?.variant}
                  value={calculateBmiRisk(bmi)?.message}
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
          <PageCard title="Total Cholesterol" bodyStyle="p-4 mt-4">
            <div className="grid grid-cols-[2fr_1fr]  items-center">
              <Input
                placeholder="170"
                label="(mg/dL)"
                value={totalCholesterol}
                labelStyle="lg:text-sm text-xs"
                onChange={(e) => setTotalCholesterol(e.target.value)}
                variant={variantValidityCheck(totalCholesterol)}
                message={messageCheck(totalCholesterol)}
              />
              {totalCholesterol && (
                <BadgeField
                  variant={
                    categorizeTotalCholesterol(Number(totalCholesterol)).variant
                  }
                  value={
                    categorizeTotalCholesterol(Number(totalCholesterol)).message
                  }
                  className="ml-2 mt-6"
                />
              )}
            </div>
          </PageCard>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-7 mt-2">
        <PageCard title="Nutritional Assess" bodyStyle="p-4">
          <div className="flex gap-3 items-center">
            <Label>Dietary Diversity Score - 0/15</Label>
            <BadgeField variant="error" value="Poor" />
            <Text
              variant="text/sm"
              className="text-primary cursor-pointer underline"
              as="span"
              onClick={() => {
                setModalType('Nutritional')
                setOpenModal(true)
              }}
            >
              Open Questionaire
            </Text>
            {nutritionalData && (
              <BadgeField variant="success" value="Changes Saved" />
            )}
          </div>
        </PageCard>
        <PageCard title="Exercise/Activity" bodyStyle="p-4">
          <div className="flex gap-3 items-center">
            <Label>Phyical Activity Score - 0/15</Label>
            <BadgeField variant="error" value="Poor" />
            <Text
              variant="text/sm"
              className="text-primary cursor-pointer underline"
              as="span"
              onClick={() => {
                setModalType('Exercise')
                setOpenModal(true)
              }}
            >
              Open Questionaire
            </Text>
            {exerciseData && (
              <BadgeField variant="success" value="Changes Saved" />
            )}
          </div>
        </PageCard>
      </div>
      <Button
        variant={'primary'}
        value="Save Data"
        leadingIcon={<IconPicker icon="saveAdd" />}
        className="mt-6"
        onClick={handleSubmit}
        loading={isLoading}
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
      </Modal>
      <form />
    </div>
  )
}
