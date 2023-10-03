import { PageHeader } from '@/components/page-header'
import { PageCard } from '@/components/ui/page-card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'

const navigationItems = [
  { label: 'User Profile', icon: IconNames.arrowRight },
  { label: 'Instructors', icon: IconNames.arrowRight },
  { label: 'Edit Instructor' },
]
export default function EditRecord() {
  return (
    <div>
      <PageHeader
        title="Edit Instructor"
        subtitle="Edit Instructor: Update Teacher Profile"
        navigation={navigationItems}
      />
      <div className="grid md:grid-cols-[2fr_1fr] gap-6 py-7 mt-2">
        <div className="w-full h-full">
          <PageCard title="Edit Basic Information" bodyStyle="p-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <Input
                placeholder="e.g John"
                label="First Name"
                labelStyle="lg:text-sm text-xs"
              />
              <Input
                placeholder="e.g Doe"
                label="Last Name"
                labelStyle="lg:text-sm text-xs"
              />
              <Select
                placeholder="Select Role"
                label="Role"
                labelStyle="lg:text-sm text-xs"
              />

              <Input
                placeholder="e.g teacher@yourschool.com"
                label="Email"
                labelStyle="lg:text-sm text-xs"
              />
              <Input
                labelStyle="lg:text-sm text-xs"
                placeholder="0811234567890"
                label="Mobile Number (Optional)"
              />
            </div>
            <Button
              variant={'primary'}
              value="Save User"
              leadingIcon={<IconPicker icon="saveAdd" />}
              className="mt-6"
            />
          </PageCard>
        </div>
        <div className="">
          <PageCard title="Edit User Picture">
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
