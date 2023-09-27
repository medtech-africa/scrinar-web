import { PageHeader } from '@/components/page-header'
import { BadgeField } from '@/components/ui/Badge'
import { PageCard } from '@/components/ui/page-card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Select } from '@/components/ui/select'

const navigationItems = [
  { label: 'Health Data', icon: IconNames.arrowRight },
  { label: 'Add New Record' },
]
const allOptions = Array.from({ length: 11 }, (_, index) => {
  const age = index + 7
  return { value: age.toString(), label: age.toString() }
})
const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

export default function AddRecord() {
  return (
    <div>
      <PageHeader
        title="Add New Record"
        subtitle="Add new Health Data: track student health progress"
        navigation={navigationItems}
        avatar="avatar"
      />
      <div className="flex lg:flex-row flex-col w-full mt-9 gap-y-4">
        <div className="w-full h-full">
          <PageCard title="Add Basic Information" bodyStyle="p-4">
            <div className="flex gap-x-4">
              <div className="flex items-center">
                <div className="p-4 rounded-full border border-lust-100 border-dashed ">
                  <IconPicker icon="add" className="text-lust-900" />
                </div>
                <Text
                  className="ml-2 text-gray-900"
                  variant="text/md"
                  weight="medium"
                >
                  Add Avatar
                </Text>
              </div>
              <div className="flex items-center">
                <Checkbox />
                <Text className="ml-2 text-grey-500">
                  Use System Generated Avatar
                </Text>
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <Input
                placeholder="Enter Name"
                label="Student Name"
                full
                labelStyle="lg:text-sm text-xs"
              />
              <Input
                placeholder="Primary 1"
                label="Class"
                full
                labelStyle="lg:text-sm text-xs"
                endingIcon={
                  <IconPicker icon="helpCircle" className="text-grey-400" />
                }
              />
              <Select
                label="Age"
                full
                labelStyle="lg:text-sm text-xs"
                placeholder="Select Age"
                options={allOptions}
              />
              <Input
                placeholder="DD/MM/YYYY"
                label="Date Of Birth"
                full
                labelStyle="lg:text-sm text-xs"
                leadingIcon={<IconPicker icon="calendar2" />}
              />
              <Select
                placeholder="Select Nutritional Health"
                label="Nutritional Health"
                full
                labelStyle="lg:text-sm text-xs"
              />
              <Select
                placeholder="Yes"
                label="Does the Student Partake In Sport?"
                full
                labelStyle="lg:text-sm text-xs"
              />
              <Select
                labelStyle="lg:text-sm text-xs"
                placeholder="Select Sport"
                label="Sport"
                full
              />
              <Select
                labelStyle="lg:text-sm text-xs"
                placeholder="Select Exercise Habit"
                label="How Frequent?"
                full
              />
              <Select
                labelStyle="lg:text-sm text-xs"
                placeholder="5.6"
                label="Blood Sugar Level"
                full
              />
              <Select
                labelStyle="lg:text-sm text-xs"
                placeholder="Select Gender"
                label="Gender"
                full
                options={genderOptions}
              />
              <Input
                labelStyle="lg:text-sm text-xs"
                placeholder="0909889877"
                label="Guardians or Parent’s Mobile Number"
                full
              />
              <Input
                labelStyle="lg:text-sm text-xs"
                placeholder="Add Family History"
                label="Family History"
                full
              />
            </div>
            <Button
              variant={'primary'}
              value="Save Data"
              leadingIcon={<IconPicker icon="saveAdd" />}
              className="mt-6"
            />
          </PageCard>
        </div>
        <div className="lg:ml-[24px] h-full">
          <PageCard title="Add BMI Details">
            <div className="flex flex-col gap-y-6 w-full p-4">
              <Input
                placeholder="180 IN"
                label="Height"
                labelStyle="flex justify-center items-center"
              />
              <Input
                placeholder="50 KG"
                label="Weight"
                labelStyle="flex justify-center items-center"
              />
              <Input
                placeholder="30 CM"
                label="Waist"
                labelStyle="flex justify-center items-center"
              />
            </div>
            <div className="mt-4">
              <div className="bg-grey-50 w-full p-4 flex justify-center">
                <Text>BMI Result</Text>
              </div>
              <div className="flex flex-col justify-center items-center gap-y-4 p-4">
                <Text
                  variant="display/sm"
                  weight="bold"
                  className="text-grey-700"
                >
                  23.4
                </Text>
                <BadgeField variant="danger" value="overweight" />
              </div>
            </div>
          </PageCard>
        </div>
      </div>
    </div>
  )
}
