'use client'
import { PageHeader } from '@/components/page-header'
import { PageCard } from '@/components/ui/page-card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
// import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import { Label } from '@radix-ui/react-label'
import { Switch } from '@/components/ui/switch'

const navigationItems = [
  { label: 'App Settings', icon: IconNames.arrowRight },
  { label: 'Create New Role' },
]
export default function CreateNewRole() {
  return (
    <div>
      <PageHeader
        title="Create New Role"
        subtitle="Customize Access and Permissions"
        navigation={navigationItems}
      />
      <div className="grid md:grid-cols-[2fr_1fr] gap-6 py-7 mt-2">
        <div className="w-full h-full">
          <PageCard title="Add Role Details">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 px-4 mb-6">
              <Select
                placeholder="Select Instructor"
                label="Instructor"
                labelStyle="lg:text-sm text-xs"
              />
              <Select
                placeholder="Select Role"
                label="Role"
                labelStyle="lg:text-sm text-xs"
              />
            </div>

            <PageCard title="Permissions" bodyStyle="p-4">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch id="screening" />
                  <Label htmlFor="screening">Permission Title Here</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="training" />
                  <Label htmlFor="training">Permission Title Here</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="health" />
                  <Label htmlFor="health">Permission Title Here</Label>
                </div>
              </div>
              <Button
                variant={'primary'}
                value="Save Permission"
                className="mt-9 px-4 py-3"
              />
            </PageCard>
          </PageCard>
        </div>
        <div className="">
          <PageCard title="Add User Picture">
            <div className="flex flex-col justify-center items-center py-4">
              <div className="p-4 rounded-full border border-lust-100 border-dashed ">
                <IconPicker icon="add" className="text-lust-900" />
              </div>
              <Text
                className="mt-4 text-gray-900"
                variant="text/md"
                weight="medium"
              >
                Profile Picture
              </Text>
              <Text
                variant="text/sm"
                className="text-primary cursor-pointer underline my-1.1"
                as="span"
              >
                Upload
              </Text>
              <div className="flex items-center">
                <Checkbox />
                <Text className="ml-2 text-grey-500">
                  Use System Generated Avatar
                </Text>
              </div>
            </div>
          </PageCard>
        </div>
      </div>
    </div>
  )
}
