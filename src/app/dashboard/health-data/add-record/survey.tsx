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
import { RiskyBehaviourStress } from '@/components/student-survey/risky-behavior-stress/RiskyBehaviourStress'
import { HealthServicesHealthMaintenance } from '@/components/student-survey/risky-behavior-stress/HealthServicesHealthMaintenance'
import { useStudent } from '@/hooks/queries/useStudents'
import { HealthAndHygiene } from '@/components/student-survey/risky-behavior-stress/HealthAndHygiene'

const triggerClassName = cn(
  'text-sm text-grey-700 py-2.2 px-4 transition-all cursor-pointer',
  'data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-grey-900'
)

export const Survey = ({
  // onClose,
  studentId,
}: {
  onClose: () => void
  studentId: string
}) => {
  const { data: studentSurvey, isLoading: isStudentSurveyLoading } =
    useStudentsSurvey(studentId)

  if (isStudentSurveyLoading) {
    return <div>Loading</div>
  }

  return <SurveyForm studentSurvey={studentSurvey} studentId={studentId} />
}

export const SurveyForm = ({
  studentSurvey,
  studentId,
}: {
  studentId: string
  studentSurvey: any
}) => {
  const methods = useForm({
    defaultValues: studentSurvey,
  })

  const { refetch } = useStudentsSurvey(studentId)
  const { data } = useStudent(studentId)

  const { mutate } = useMutateStudentsPostSurvey(studentId)

  const onSubmit = (data: any) => {
    mutate(cleanObject(data), {
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
            <Tabs.Trigger
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
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="demographics">
            <DemographicData
              studentId={studentId}
              studentSurvey={studentSurvey}
            />
          </Tabs.Content>
          <Tabs.Content value="ncd-knowledge">
            <KAPSurvey studentId={studentId} studentSurvey={studentSurvey} />
          </Tabs.Content>
          <Tabs.Content value="nutrition">
            <KAPSurvey studentId={studentId} studentSurvey={studentSurvey} />
          </Tabs.Content>
          <Tabs.Content value="physical-activity">
            <KAPSurvey studentId={studentId} studentSurvey={studentSurvey} />
          </Tabs.Content>
          <Tabs.Content value="ideal-body">
            <KAPSurvey studentId={studentId} studentSurvey={studentSurvey} />
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
