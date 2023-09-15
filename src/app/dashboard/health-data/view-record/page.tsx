import { PageHeader } from '@/components/page-header'
import DashboardProgress from '@/components/svg/dashboard-progess'
import DashboardProgressPattern from '@/components/svg/dashboard-progress-pattern'
import { Card } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { PageCard } from '@/components/ui/page-card'
import { Text } from '@/components/ui/text'
import Image from 'next/image'
import { AstrologyManOutline, AstrologyWomanOutline } from 'react-icons-sax'

const navigationItems = [
  { label: 'Health Data', icon: IconNames.arrowRight },
  { label: 'Data Details' },
]
const dataItems = [
  {
    title: 'Primary 1',
    description: 'level',
    iconClassName: 'bg-[#1570EF]',
    icon: <AstrologyManOutline size={24} color="white" />,
  },
  {
    title: '180IN',
    description: 'Height',
    iconClassName: 'bg-yellow-orange-900',
    icon: <AstrologyWomanOutline size={24} color="white" />,
  },
  {
    title: 'Male',
    description: 'Gender',
    iconClassName: 'bg-gray-900',
    icon: <AstrologyManOutline size={24} color="white" />,
  },
  {
    title: '50KG',
    description: 'Weight',
    iconClassName: 'bg-gray-900',
    icon: <AstrologyManOutline size={24} color="white" />,
  },
  {
    title: '12 years',
    description: 'Age',
    iconClassName: 'bg-gray-900',
    icon: <AstrologyManOutline size={24} color="white" />,
  },
  {
    title: '30CM',
    description: 'Waist',
    iconClassName: 'bg-gray-900',
    icon: <AstrologyManOutline size={24} color="white" />,
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
      <div className="grid md:grid-rows-1 md:grid-cols-2  gap-6 mt-9">
        <PageCard title="Data Summary" bodyStyle="p-4">
          <div className="grid md:grid-rows-3 md:grid-cols-2 gap-x-6 gap-y-2 mb-4">
            {dataItems.map((item) => (
              <Card key={item.title} {...item} className="w-full" />
            ))}
          </div>
          <div className="grid md:grid-rows-1 md:grid-cols-2 gap-6 mt-4">
            <div className="relative justify-center items-center flex">
              <DashboardProgressPattern className="absolute right-0 left-0 hidden md:block" />
              <DashboardProgress progress={40} />
            </div>
            <div className="grid md:grid-rows-3 md:grid-cols-1 gap-x-6 gap-y-2 ">
              {dataItems.splice(0, 4).map((item) => (
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
                    {/* <IconPicker icon="clock" /> */}
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
                    {/* <IconPicker icon="clock" /> */}
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
