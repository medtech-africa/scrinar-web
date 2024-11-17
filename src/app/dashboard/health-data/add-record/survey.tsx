import { useForm, FormProvider } from 'react-hook-form'
// import { ToastField } from '@/components/ui/toast'
// import toast from 'react-hot-toast'
import DemographicData from '@/components/student-survey/demographicData'

import * as Tabs from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import KAPSurvey from '@/components/student-survey/kapSurvey'
import {
  useMutateStudentsPostSurvey,
  useStudentsSurvey,
} from '@/hooks/queries/useStudentSurvey'
import { cleanObject } from '@/utils/checkIfValueExist'
import { errorMessage } from '@/utils/errorMessage'
import toast from 'react-hot-toast'
import { RiskyBehaviourStress } from '@/components/student-survey/RiskyBehaviourStress'
import { HealthServicesHealthMaintenance } from '@/components/student-survey/HealthServicesHealthMaintenance'
import { useStudent } from '@/hooks/queries/useStudents'
import { HealthAndHygiene } from '@/components/student-survey/HealthAndHygiene'
import { NonCommunicableDiseaseQuestions } from '@/components/student-survey/NCD'
import { PhysicalActivity } from '@/components/student-survey/PhysicalActivity'
import { IdealBody } from '@/components/student-survey/IdealBody'
import { StudentNutritionSurvey } from '@/components/student-survey/Nutrition'
import ContentLoader from '@/components/content-loader'
import { useEffect } from 'react'
import { useLocalStudentSurvey } from '@/hooks/useLocalParentSurvey'

const triggerClassName = cn(
  'text-sm text-grey-700 py-2.2 px-4 transition-all cursor-pointer',
  'data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-grey-900'
)

export const Survey = ({
  // onClose,
  studentId,
}: {
  onClose?: () => void
  studentId: string
}) => {
  const { data: studentSurvey, isPending: isStudentSurveyLoading } =
    useStudentsSurvey(studentId, {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    })

  const { getStudentSurvey, storeStudentSurvey } = useLocalStudentSurvey()

  useEffect(() => {
    if (studentSurvey) {
      if (!getStudentSurvey(studentId)) {
        storeStudentSurvey(studentId, studentSurvey)
      } else {
        storeStudentSurvey(studentId, studentSurvey)
      }
    }
  }, [studentSurvey, studentId])

  const formData = getStudentSurvey(studentId, studentSurvey)

  if (isStudentSurveyLoading || !formData) {
    return (
      <>
        <p className="my-4 text-center">Loading..</p>
        <ContentLoader loading />
      </>
    )
  }

  const isLocalFormNotEmpty = formData && Object.keys(formData).length > 0

  return (
    <SurveyForm
      key={isLocalFormNotEmpty ? 'child-survey-present' : 'child-survey-absent'}
      studentSurvey={formData}
      studentId={studentId}
    />
  )
}

export const SurveyForm = ({
  studentSurvey,
  studentId,
}: {
  studentId: string
  studentSurvey: any
}) => {
  const { refetch } = useStudentsSurvey(studentId)
  const { data } = useStudent(studentId)

  const { mutate } = useMutateStudentsPostSurvey(studentId)

  const { getStudentSurvey, storeStudentSurvey } = useLocalStudentSurvey()

  // const formData = getStudentSurvey(studentId, studentSurvey)

  const methods = useForm({
    defaultValues: studentSurvey,
  })

  const onSubmit = (data: any) => {
    storeStudentSurvey(studentId, cleanObject(data))
    const dataToSend = getStudentSurvey(studentId, cleanObject(data))

    mutate(dataToSend, {
      onSuccess: () => {
        refetch()
        toast.success('Survey saved successfully')
      },
      onError: errorMessage,
    })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Tabs.Root className="mt-10" defaultValue="demographics">
          <Tabs.List className="mb-4" aria-label="Student Questionnaire">
            <Tabs.Trigger
              className={triggerClassName}
              value="demographics"
              onClick={() => refetch()}
            >
              Demographics
            </Tabs.Trigger>
            <Tabs.Trigger
              className={triggerClassName}
              value="ncd-knowledge"
              onClick={() => refetch()}
            >
              NCD Knowledge
            </Tabs.Trigger>
            <Tabs.Trigger
              className={triggerClassName}
              value="nutrition"
              onClick={() => refetch()}
            >
              Nutrition
            </Tabs.Trigger>
            <Tabs.Trigger
              className={triggerClassName}
              value="physical-activity"
              onClick={() => refetch()}
            >
              Physical activity
            </Tabs.Trigger>
            <Tabs.Trigger
              className={triggerClassName}
              value="ideal-body"
              onClick={() => refetch()}
            >
              Ideal body
            </Tabs.Trigger>
            <Tabs.Trigger
              className={triggerClassName}
              value="risky-behavior-stress"
              onClick={() => refetch()}
            >
              Risky Behavior / Stress
            </Tabs.Trigger>
            <Tabs.Trigger
              className={triggerClassName}
              value="health-sanitation-maintenance"
              onClick={() => refetch()}
            >
              Health serv. & maintenance
            </Tabs.Trigger>
            <Tabs.Trigger
              className={triggerClassName}
              value="health-hygiene"
              onClick={() => refetch()}
            >
              Health & Hygiene
            </Tabs.Trigger>
            {/* <Tabs.Trigger
              className={triggerClassName}
              value="ncd-risks-family"
              onClick={() => refetch()}
            >
              NCD Risks in honest Family
            </Tabs.Trigger>
            <Tabs.Trigger
              className={triggerClassName}
              value="gender-household-roles"
              onClick={() => refetch()}
            >
              Gender & Household Roles
            </Tabs.Trigger> */}
          </Tabs.List>

          <Tabs.Content value="demographics">
            <DemographicData
              studentId={studentId}
              studentSurvey={studentSurvey}
            />
          </Tabs.Content>
          <Tabs.Content value="ncd-knowledge">
            <NonCommunicableDiseaseQuestions studentId={studentId} />
          </Tabs.Content>
          <Tabs.Content value="nutrition">
            <StudentNutritionSurvey studentId={studentId} />
          </Tabs.Content>
          <Tabs.Content value="physical-activity">
            <PhysicalActivity studentId={studentId} />
          </Tabs.Content>
          <Tabs.Content value="ideal-body">
            <IdealBody studentId={studentId} />
          </Tabs.Content>
          <Tabs.Content value="risky-behavior-stress">
            <RiskyBehaviourStress
              studentId={studentId}
              studentSurvey={studentSurvey}
            />
          </Tabs.Content>
          <Tabs.Content value="health-sanitation-maintenance">
            <HealthServicesHealthMaintenance
              studentId={studentId}
              isFemale={data?.gender === 'female'}
            />
          </Tabs.Content>
          <Tabs.Content value="health-hygiene">
            <HealthAndHygiene studentId={studentId} />
          </Tabs.Content>
          <Tabs.Content value="ncd-risks-family">
            <KAPSurvey studentId={studentId} studentSurvey={studentSurvey} />
          </Tabs.Content>
          <Tabs.Content value="gender-household-roles">
            <KAPSurvey studentId={studentId} studentSurvey={studentSurvey} />
          </Tabs.Content>
        </Tabs.Root>
        <div className="grid gap-6 py-7 mt-2">
          <div>
            <Button
              variant={'primary'}
              value="Save"
              type="submit"
              leadingIcon={<IconPicker icon="saveAdd" />}
              className="mt-6"
            />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
