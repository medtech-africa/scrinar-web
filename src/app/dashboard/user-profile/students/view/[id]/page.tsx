'use client'
import { PageHeader } from '@/components/page-header'
import { PageCard } from '@/components/ui/page-card'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useStudent } from '@/hooks/queries/useStudents'
import ContentLoader from '@/components/content-loader'
import { Avatar } from '@/components/ui/avatar'

const navigationItems = [
  { label: 'User Profile', icon: IconNames.arrowRight },
  { label: 'Students', icon: IconNames.arrowRight },
  { label: 'View' },
]
export default function ViewRecord({ params }: { params: { id: string } }) {
  const { data, isLoading } = useStudent(params.id)
  return (
    <div className="relative">
      <ContentLoader loading={isLoading} />
      <PageHeader
        title="View"
        subtitle="View details about student."
        navigation={navigationItems}
      />
      <div className="grid md:grid-cols-[2fr_1fr] gap-6 py-7 mt-2">
        <div className="w-full h-full order-last md:order-first">
          <PageCard title="Add Basic Information" bodyStyle="p-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <Input
                label="First Name"
                defaultValue={data?.firstName ?? ''}
                disabled
                className="capitalize"
                labelStyle="lg:text-sm text-xs"
              />
              <Input
                defaultValue={data?.lastName ?? ''}
                disabled
                label="Last Name"
                className="capitalize"
                labelStyle="lg:text-sm text-xs"
              />
              {data?.email && (
                <Input
                  defaultValue={data?.email ?? ''}
                  disabled
                  label="Email"
                  labelStyle="lg:text-sm text-xs"
                />
              )}
              <Input
                defaultValue={
                  data?.dob && new Date(data?.dob)?.toLocaleDateString()
                }
                disabled
                leadingIcon={
                  <IconPicker icon="calendar" className="text-grey-500" />
                }
                label="Date of Birth"
                labelStyle="lg:text-sm text-xs"
              />
              <Input
                defaultValue={data?.familyCode ?? ''}
                disabled
                label="Household Code"
                labelStyle="lg:text-sm text-xs"
              />
              <Input
                defaultValue={data?.age && `${data?.age} Years`}
                disabled
                label="Age"
                labelStyle="lg:text-sm text-xs"
              />

              <Input
                labelStyle="lg:text-sm text-xs"
                defaultValue={data?.parentMobile ?? ''}
                disabled
                label="Parent Mobile Number 1"
              />
              <Input
                labelStyle="lg:text-sm text-xs"
                defaultValue={data?.parentMobileAlt ?? ''}
                disabled
                label="Parent Mobile Number 2"
              />
              <Input
                defaultValue={data?.gender}
                className="capitalize"
                disabled
                label="Gender"
                labelStyle="lg:text-sm text-xs"
              />

              <Input
                labelStyle="lg:text-sm text-xs"
                defaultValue={data?.level}
                className="capitalize"
                disabled
                label="Class"
              />
            </div>
          </PageCard>
        </div>
        <div className="">
          <PageCard title="Add User Picture">
            <div className="flex flex-col justify-center items-center py-4">
              {data?.avatarUrl ? (
                <Avatar size="sm" src={data?.avatarUrl} />
              ) : (
                <div className="p-4 rounded-full border border-lust-100 border-dashed ">
                  <IconPicker icon="add" className="text-lust-900" />
                </div>
              )}
              <Text
                className="mt-4 text-gray-900"
                variant="text/md"
                weight="medium"
              >
                Profile Picture
              </Text>
            </div>
          </PageCard>
        </div>
      </div>
    </div>
  )
}
