'use client'
import ContentLoader from '@/components/content-loader'
import { PageHeader } from '@/components/page-header'
import DashboardProgress from '@/components/svg/dashboard-progess'
import DashboardProgressPattern from '@/components/svg/dashboard-progress-pattern'
import { Avatar } from '@/components/ui/avatar'
import { BadgeField } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import ChartComp from '@/components/ui/chart'
import { Divider } from '@/components/ui/divider'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { PageCard } from '@/components/ui/page-card'
import { Text } from '@/components/ui/text'
import { useSingleHealthData } from '@/hooks/queries/useHealthData'
import { returnJoinedFirstCharacter } from '@/utils/returnJoinedFirstCharacter'
import { calculateBmiRisk } from '@/utils/vitalCalculations'
import { format } from 'date-fns'

const navigationItems = [
  { label: 'Health Data', icon: IconNames.arrowRight },
  { label: 'Data Details' },
]

export default function ViewRecord({ params }: { params: { id: string } }) {
  const { data: healthData, isLoading } = useSingleHealthData(params?.id)
  const data = healthData?.data
  const glucoseLevelData = data?.chartData?.glucoseLevel
  const bmiData = data?.chartData?.bmi
  const dataItems = [
    {
      id: '1',
      title:
        data?.student?.firstName && data?.student?.lastName
          ? data?.student.firstName + ' ' + data?.student.lastName
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
      title: data?.student?.gender ? data?.student.gender : '-',
      description: 'Gender',
      icon: <IconPicker icon="gender" size={40} className="text-white" />,
    },
    {
      id: '4',
      title: data?.weight ? data?.weight + 'KG' : '-',
      description: 'Weight',
      icon: <IconPicker icon="weight" size={40} className="text-white" />,
    },
    {
      id: '5',
      title: data?.student?.age ? data?.student.age + ' years' : '-',
      description: 'Age',
      icon: <IconPicker icon="ageIcon" size={40} className="text-white" />,
    },
    {
      id: '6',
      title: data?.waist ? data?.waist + 'CM' : '-',
      description: 'Waist',
      icon: <IconPicker icon="waist" size={40} className="text-white" />,
    },
    {
      id: '7',
      title: 'Good',
      description: 'Nutritional Health',
      icon: <IconPicker icon="healthIcon2" size={40} className="text-white" />,
    },
    {
      id: '8',
      title: 'Moderatively Active',
      description: 'Exercise Habit',
      icon: <IconPicker icon="habit" size={40} className="text-black" />,
    },
    {
      id: '9',
      title: data?.bmi ? data?.bmi + ' mmoI/L' : '-',
      description: 'Blood Sugar level',
      icon: <IconPicker icon="blood" size={40} className="text-white" />,
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
          data?.student?.firstName && data?.student?.lastName
            ? data?.student.firstName + ' ' + data?.student.lastName
            : '-'
        }
        subtitle={`Last updated: ${formattedDate || '-'}`}
        user={
          <Avatar
            src={data?.student?.avatarUrl}
            fallback={returnJoinedFirstCharacter(
              data?.student.firstName,
              data?.student.lastName
            )}
          />
        }
        navigation={navigationItems}
      />
      <div className="grid grid-cols-2 gap-x-3">
        <div>
          {glucoseLevelData ? (
            <ChartComp healthData={glucoseLevelData} name="Glucose Level" />
          ) : (
            <Text>No Data </Text>
          )}
        </div>
        <div>
          {glucoseLevelData ? (
            <ChartComp healthData={bmiData} name="BMI" />
          ) : (
            <Text>No Data </Text>
          )}
        </div>
      </div>
      <div className="grid xl:grid-rows-1 xl:grid-cols-2  gap-6 mt-9">
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
                  variant={calculateBmiRisk(data?.bmi)?.variant}
                />
              </div>
              <BadgeField
                variant={calculateBmiRisk(data?.bmi)?.variant}
                value={calculateBmiRisk(data?.bmi)?.message}
              />
            </div>
            <div className="grid md:grid-rows-3 md:grid-cols-1 gap-x-6 gap-y-2 ">
              {dataItems.slice(6, 9).map((item) => (
                <Card key={item.id} {...item} className="w-full" />
              ))}
            </div>
          </div>
        </PageCard>
        <PageCard
          title="Data History & Update"
          className="flex flex-col gap-y-4"
        >
          <div className="p-4">
            <div className="flex gap-x-3 mb-4">
              <div className="flex relative">
                <div className="bg-grey-200 w-3 h-3 rounded-full z-30"></div>
                <Divider className="h-full bg-grey-100 w-[1px] absolute right-[5.7px] z-0" />
              </div>
              <div>
                <Text variant="text/sm" weight="bold">
                  Blood Sugar Level
                </Text>
                <div className="mt-[5px]">
                  <Text variant="text/xs" className="text-grey-500">
                    Blood sugar level has been updated. You can find the revised
                    data in the student entry history. Please review the
                    historical records for accuracy.
                  </Text>
                  <Text weight="medium" variant="text/xs" className="italic">
                    From: 5.2 mmol/L - To 5.6mmol/L
                  </Text>
                  <div className="flex gap-x-2">
                    <IconPicker icon="clock" />
                    <Text variant="text/xs">Aug 10</Text>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-x-3">
              <div className="flex relative">
                <div className="bg-grey-200 w-3 h-3 rounded-full z-30"></div>
                <Divider className="h-full bg-grey-100 w-[1px] absolute right-[5.7px] z-0" />
              </div>
              <div>
                <Text variant="text/sm" weight="bold">
                  Blood Sugar Level
                </Text>
                <div className="mt-[5px]">
                  <Text variant="text/xs" className="text-grey-500">
                    Blood sugar level has been updated. You can find the revised
                    data in the student entry history. Please review the
                    historical records for accuracy.
                  </Text>
                  <Text weight="medium" variant="text/xs" className="italic">
                    From: 5.2 mmol/L - To 5.6mmol/L
                  </Text>
                  <div className="flex gap-x-2">
                    <IconPicker icon="clock" />
                    <Text variant="text/xs">Aug 10</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageCard>
      </div>
    </div>
  )
}
