import { useForm, FormProvider } from 'react-hook-form'
// import { ToastField } from '@/components/ui/toast'
// import toast from 'react-hot-toast'
import { IStudentsSurveyData } from '@/types/studentsSurvey.types'
import DemographicData from '@/components/student-survey/demographicData'

import * as Tabs from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import KAPSurvey from '@/components/student-survey/kapSurvey'
import { useStudentsSurvey } from '@/hooks/queries/useStudentSurvey'

// const SelectedOption = {
//   value: '',
//   label: '',
// }
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
  const methods = useForm<IStudentsSurveyData>({
    // resolver: validation.survey,
  })
  const {
    data: studentSurvey,
    isLoading: isStudentSurveyLoading,
    refetch,
  } = useStudentsSurvey(studentId)
  const onSubmit = (data: IStudentsSurveyData) => {
    console.log(data)
    // if (
    //   !data.gender ||
    //   !data.age ||
    //   !data.birthday ||
    //   !data.ethnicity ||
    //   !data.religion ||
    //   !data.classLevel ||
    //   !data.distanceToSchool ||
    //   !data.yearsAtSchool
    // ) {
    //   return toast.custom(
    //     <ToastField
    //       variant="warning2"
    //       label="Please fill all the required fields"
    //       action1={() => toast.remove()}
    //     />
    //   )
    // }

    // toast.success('Form successfully submitted!')
    // onClose()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {isStudentSurveyLoading ? (
          <div>Loading</div>
        ) : (
          <>
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
                  value="kap-survey"
                  onClick={() => refetch()}
                >
                  KAP Survey
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="demographics">
                <DemographicData
                  studentId={studentId}
                  studentSurvey={studentSurvey}
                />
              </Tabs.Content>
              <Tabs.Content value="kap-survey">
                <KAPSurvey
                  studentId={studentId}
                  studentSurvey={studentSurvey}
                />
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
          </>
        )}
      </form>
    </FormProvider>
  )
}
