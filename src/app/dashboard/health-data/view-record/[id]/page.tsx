'use client'
import { ParentQuestionnaire } from '@/app/dashboard/user-profile/parents/questionnaire'
import ContentLoader from '@/components/content-loader'
import { PageHeader } from '@/components/page-header'
import DashboardProgress from '@/components/svg/dashboard-progess'
import DashboardProgressPattern from '@/components/svg/dashboard-progress-pattern'
import { Avatar } from '@/components/ui/avatar'
import { BadgeField } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { PageCard } from '@/components/ui/page-card'
import { Text } from '@/components/ui/text'
import { useSingleHealthData } from '@/hooks/queries/useHealthData'
import { returnJoinedFirstCharacter } from '@/utils/returnJoinedFirstCharacter'
import { categorizeBMIWHO2007 } from '@/utils/vitalCalculations'
import { format } from 'date-fns'
import { Survey } from '../../add-record/survey'
import { TVariantEnum } from '@/types/variants.types'
import ThresholdChart from '@/components/ui/chart'

const navigationItems = [
  { label: 'Health Data', icon: IconNames.arrowRight },
  { label: 'Data Details' },
]

export default function ViewRecord({ params }: { params: { id: string } }) {
  const { data: healthData, isPending: isLoading } = useSingleHealthData(
    params?.id
  )
  const data = healthData?.data
  const userData = data?.student || data?.parent
  const isStudent = !!data?.student

  const dataItems = [
    {
      id: '1',
      title:
        userData?.firstName && userData?.lastName
          ? userData?.firstName + ' ' + userData?.lastName
          : '-',
      description: 'Name',
      icon: <IconPicker icon="primary" size={40} className="text-white" />,
    },
    {
      id: '2',
      title: data?.height ? data?.height + 'CM' : '-',
      description: 'Height',
      icon: <IconPicker icon="measurement" size={40} className="text-white" />,
    },
    {
      id: '3',
      title: userData?.gender ?? '-',
      description: 'Gender',
      icon: <IconPicker icon="gender" size={40} className="text-white" />,
    },
    {
      id: '4',
      title: data?.weight + 'KG' ?? '-',
      description: 'Weight',
      icon: <IconPicker icon="weight" size={40} className="text-white" />,
    },
    {
      id: '5',
      title: userData?.age + ' years' ?? '-',
      description: 'Age',
      icon: <IconPicker icon="ageIcon" size={40} className="text-white" />,
    },
    {
      id: '6',
      title: data?.waist + 'CM' ?? '-',
      description: 'Waist',
      icon: <IconPicker icon="waist" size={40} className="text-white" />,
    },
  ]
  const formattedDate =
    data?.createdAt && format(new Date(data?.createdAt), 'PPP')
  return (
    <div>
      <ContentLoader loading={isLoading} />

      <PageHeader
        isAvatar
        title={
          userData?.firstName && userData?.lastName
            ? userData?.firstName + ' ' + userData?.lastName
            : '-'
        }
        subtitle={`Last updated: ${formattedDate || '-'}`}
        user={
          <Avatar
            src={userData?.avatarUrl}
            fallback={returnJoinedFirstCharacter(
              userData?.firstName,
              userData?.lastName
            )}
          />
        }
        navigation={navigationItems}
      />
      <div className="grid grid-cols-3 gap-x-3">
        <div>
          <ThresholdChart
            name="Glucose Levels"
            healthData={data?.glucoseLevel}
            units="mg/dL"
          />
        </div>
        <div>
          <ThresholdChart name="BMI" healthData={data?.bmi} units="kg/m2" />
        </div>
        <div>
          <ThresholdChart name="Pulse" healthData={data?.pulse} units="BPM" />
        </div>
      </div>
      <div className="space-y-6 mt-9">
        <PageCard title="Data Summary" bodyStyle="p-4">
          <div className="grid md:grid-rows-3 md:grid-cols-2 gap-x-6 gap-y-2 mb-4">
            {dataItems.slice(0, 6).map((item) => (
              <Card key={item.id} {...item} className="w-full capitalize" />
            ))}
          </div>
          <div className="grid md:grid-rows-1 md:grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col gap-y-4">
              <div className="relative justify-center items-center flex">
                <DashboardProgressPattern className="absolute right-0 left-0 hidden md:block" />
                <DashboardProgress
                  progress={data?.bmi}
                  variant={
                    categorizeBMIWHO2007(
                      userData?.age,
                      userData?.gender,
                      data?.bmi
                    )?.variant
                  }
                />
              </div>
              <BadgeField
                variant={
                  categorizeBMIWHO2007(
                    userData?.age,
                    userData?.gender,
                    data?.bmi
                  )?.variant
                }
                value={
                  categorizeBMIWHO2007(
                    userData?.age,
                    userData?.gender,
                    data?.bmi
                  )?.message
                }
              />
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="relative justify-center items-center flex">
                <DashboardProgressPattern className="absolute right-0 left-0 hidden md:block" />
                <DashboardProgress
                  progress={data?.percentageCompletion}
                  variant={
                    (data?.percentageCompletion || 0) >= 75
                      ? TVariantEnum.Success
                      : TVariantEnum.Danger
                  }
                />
              </div>
              <Text variant="text/lg" className="text-center">
                Questionnaire Progress
              </Text>
            </div>
          </div>
        </PageCard>
        <PageCard title="Questionnaire" className="">
          {userData?.id &&
            (isStudent ? (
              <Survey studentId={userData.id} />
            ) : (
              <ParentQuestionnaire
                gender={userData?.gender}
                parentId={userData.id}
                hasDefault
              />
            ))}
        </PageCard>
      </div>
    </div>
  )
}
