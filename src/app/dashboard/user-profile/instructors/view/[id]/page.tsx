'use client'
import { PageHeader } from '@/components/page-header'
import { PageCard } from '@/components/ui/page-card'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useInstructor } from '@/hooks/queries/useInstructors'
import ContentLoader from '@/components/content-loader'
import { Avatar } from '@/components/ui/avatar'

const navigationItems = [
  { label: 'User Profile', icon: IconNames.arrowRight },
  { label: 'Instructors', icon: IconNames.arrowRight },
  { label: 'View New Instructor' },
]
export default function ViewRecord({ params }: { params: { id: string } }) {
  const { data, isLoading } = useInstructor(params.id)

  return (
    <div className="relative">
      <ContentLoader loading={isLoading} />
      <PageHeader
        title="View New Instructor"
        subtitle="View Instructor: View Teacher Details"
        navigation={navigationItems}
      />
      <div className="grid md:grid-cols-[2fr_1fr] gap-6 py-7 mt-2">
        <div className="w-full h-full">
          <PageCard title="View Basic Information" bodyStyle="p-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <Input
                defaultValue={data?.firstName ?? ''}
                label="First Name"
                disabled
                className="capitalize"
                labelStyle="lg:text-sm text-xs"
              />
              <Input
                defaultValue={data?.lastName ?? ''}
                label="Last Name"
                className="capitalize"
                disabled
                labelStyle="lg:text-sm text-xs"
              />
              <Input
                defaultValue={data?.middleName ?? ''}
                label="Middle Name"
                className="capitalize"
                disabled
                labelStyle="lg:text-sm text-xs"
              />
              <Input
                defaultValue={data?.gender ?? ''}
                label="Gender"
                className="capitalize"
                disabled
                labelStyle="lg:text-sm text-xs"
              />
              <Input
                defaultValue={data?.role ?? ''}
                disabled
                className="capitalize"
                label="Role"
                labelStyle="lg:text-sm text-xs"
              />

              <Input
                defaultValue={data?.email ?? ''}
                disabled
                label="Email"
                labelStyle="lg:text-sm text-xs"
              />
              <Input
                labelStyle="lg:text-sm text-xs"
                disabled
                defaultValue={data?.phoneNumber ?? ''}
                label="Mobile Number"
              />
            </div>
          </PageCard>
        </div>
        <div className="">
          <PageCard title="View User Picture">
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
