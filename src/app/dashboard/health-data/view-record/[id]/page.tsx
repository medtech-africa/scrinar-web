import { PageHeader } from '@/components/page-header'
import DashboardProgress from '@/components/svg/dashboard-progess'
import DashboardProgressPattern from '@/components/svg/dashboard-progress-pattern'
import { BadgeField } from '@/components/ui/Badge'
import { Card } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { PageCard } from '@/components/ui/page-card'
import { Text } from '@/components/ui/text'
import Image from 'next/image'

const navigationItems = [
  { label: 'Health Data', icon: IconNames.arrowRight },
  { label: 'Data Details' },
]
const dataItems = [
  {
    title: 'Primary 1',
    description: 'level',
    icon: <IconPicker icon="primary" size={40} className="text-white" />,
  },
  {
    title: '180IN',
    description: 'Height',
    icon: <IconPicker icon="measurement" size={40} className="text-white" />,
  },
  {
    title: 'Male',
    description: 'Gender',
    icon: <IconPicker icon="gender" size={40} className="text-white" />,
  },
  {
    title: '50KG',
    description: 'Weight',
    icon: <IconPicker icon="weight" size={40} className="text-white" />,
  },
  {
    title: '12 years',
    description: 'Age',
    icon: <IconPicker icon="ageIcon" size={40} className="text-white" />,
  },
  {
    title: '30CM',
    description: 'Waist',
    icon: <IconPicker icon="waist" size={40} className="text-white" />,
  },
  {
    title: 'Good',
    description: 'Nutritional Health',
    icon: <IconPicker icon="healthIcon2" size={40} className="text-white" />,
  },
  {
    title: 'Moderatively Active',
    description: 'Exercise Habit',
    icon: <IconPicker icon="habit" size={40} className="text-black" />,
  },
  {
    title: '5.6 mmoI/L',
    description: 'Blood Sugar levek',
    icon: <IconPicker icon="blood" size={40} className="text-white" />,
  },
]
export default function ViewRecord() {
  return (
    <div>
      <PageHeader
        title="Robert Johnson"
        subtitle="Last updated: Aug 10, 2023"
        avatar="avatar"
        navigation={navigationItems}
        user
      />
      <div className="grid md:grid-rows-1 md:grid-cols-2  gap-6  mt-9">
        <Image
          src="/Frame.png"
          alt="Vercel Logo"
          className="dark:invert"
          width={500}
          height={100}
          priority
        />
        <Image
          src="/Frame2.png"
          alt="Vercel Logo"
          className="dark:invert"
          width={500}
          height={100}
          priority
        />
      </div>
      <div className="grid xl:grid-rows-1 xl:grid-cols-2  gap-6 mt-9">
        <PageCard title="Data Summary" bodyStyle="p-4">
          <div className="grid md:grid-rows-3 md:grid-cols-2 gap-x-6 gap-y-2 mb-4">
            {dataItems.slice(0, 6).map((item) => (
              <Card key={item.title} {...item} className="w-full" />
            ))}
          </div>
          <div className="grid md:grid-rows-1 md:grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col gap-y-4">
              <div className="relative justify-center items-center flex">
                <DashboardProgressPattern className="absolute right-0 left-0 hidden md:block" />
                <DashboardProgress progress={40} />
              </div>
              <BadgeField variant="danger" value="Extremely Obese" />
            </div>
            <div className="grid md:grid-rows-3 md:grid-cols-1 gap-x-6 gap-y-2 ">
              {dataItems.slice(6, 9).map((item) => (
                <Card key={item.title} {...item} className="w-full" />
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
