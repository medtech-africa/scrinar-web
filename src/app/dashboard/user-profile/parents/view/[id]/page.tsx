'use client'
import { PageHeader } from '@/components/page-header'
import { PageCard } from '@/components/ui/page-card'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import ContentLoader from '@/components/content-loader'
import { Avatar } from '@/components/ui/avatar'
import { useParent } from '@/hooks/queries/useParents'

const navigationItems = [
  { label: 'User Profile', icon: IconNames.arrowRight },
  { label: 'Parents', icon: IconNames.arrowRight },
  { label: 'View' },
]
export default function ViewRecord({ params }: { params: { id: string } }) {
  const { data, isPending } = useParent(params.id)

  if (isPending) {
    return (
      <div className="relative">
        <ContentLoader loading={isPending} />
        <PageHeader
          title="View"
          subtitle="View details about student."
          navigation={navigationItems}
        />
      </div>
    )
  }

  return (
    <div className="relative">
      <ContentLoader loading={isPending} />
      <PageHeader
        title="View"
        subtitle="View details about parent."
        navigation={navigationItems}
      />
      <div className="grid md:grid-cols-[2fr_1fr] gap-6 py-7 mt-2">
        <div className="w-full h-full order-last md:order-first">
          <PageCard title="Add Basic Information" bodyStyle="p-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <Input
                label="First Name"
                defaultValue={data?.firstName ?? ''}
                value={data?.firstName ?? ''}
                disabled
                className="capitalize"
                labelStyle="lg:text-sm text-xs"
              />
              <Input
                defaultValue={data?.lastName ?? ''}
                value={data?.lastName ?? ''}
                disabled
                label="Last Name"
                className="capitalize"
                labelStyle="lg:text-sm text-xs"
              />
              {data?.email && (
                <Input
                  defaultValue={data?.email ?? ''}
                  value={data?.email ?? ''}
                  disabled
                  label="Email"
                  labelStyle="lg:text-sm text-xs"
                />
              )}

              <Input
                defaultValue={data?.familyCode}
                value={data?.familyCode}
                disabled
                label="HouseHold Code"
                labelStyle="lg:text-sm text-xs"
              />

              <Input
                labelStyle="lg:text-sm text-xs"
                defaultValue={data?.mobile ?? ''}
                value={data?.mobile ?? ''}
                disabled
                label="Mobile Number"
              />

              <Input
                defaultValue={data?.gender}
                value={data?.gender}
                className="capitalize"
                disabled
                label="Gender"
                labelStyle="lg:text-sm text-xs"
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
