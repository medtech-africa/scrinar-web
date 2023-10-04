import { PageHeader } from '@/components/page-header'
import { BadgeField } from '@/components/ui/Badge'
import { PageCard } from '@/components/ui/page-card'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Select } from '@/components/ui/select'
import schoolLevels from '@/constants/school-levels'
import { Label } from '@/components/ui/label'

const navigationItems = [
  { label: 'Health Data', icon: IconNames.arrowRight },
  { label: 'Add New Record' },
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
      <div className="w-full h-full">
        <PageCard title="Student Bio Data" bodyStyle="p-4">
          <div className="flex items-end">
            <div className="flex items-center">
              <div className="p-4 rounded-full border border-lust-100 border-dashed ">
                <IconPicker icon="add" className="text-lust-900" />
              </div>
              <Text
                className="ml-2 text-gray-900"
                variant="text/md"
                weight="medium"
              >
                Student Avatar
              </Text>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            <Select
              label="Class"
              full
              labelStyle="lg:text-sm text-xs"
              placeholder="Select Class"
              options={schoolLevels}
            />

            <Select
              label="Student"
              full
              labelStyle="lg:text-sm text-xs"
              placeholder="Select Student"
              // disabled={!level}
              // options={students}
            />

            <Input
              label="Student Age"
              disabled
              defaultValue="14"
              labelStyle="lg:text-sm text-xs"
            />
            <Input
              label="Student Gender"
              disabled
              defaultValue="Male"
              labelStyle="lg:text-sm text-xs"
            />
          </div>
        </PageCard>

        <div className="grid md:grid-cols-2 gap-6 py-7 mt-2">
          <PageCard title="Antropometry">
            <div className="flex gap-3 w-full p-4">
              <Input
                placeholder="180"
                label="Height(m)"
                labelStyle="flex justify-center items-center"
              />
              <Input
                placeholder="50"
                label="Weight(kg)"
                labelStyle="flex justify-center items-center"
              />
              <Input
                placeholder="30"
                label="Waist(cm)"
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
              <Label className="px-4 flex justify-center">
                * BMI automatically generated
              </Label>
            </div>
          </PageCard>

          <div className="h-full">
            <PageCard title="Blood Pressure" bodyStyle="p-4">
              <div className="flex items-center">
                <Input
                  placeholder="170"
                  label="Dys"
                  labelStyle="lg:text-sm text-xs"
                />
                <Text className="mt-6 mx-2" variant="display/sm">
                  /
                </Text>
                <Input
                  placeholder="10"
                  label="Sys"
                  labelStyle="lg:text-sm text-xs"
                />
                <BadgeField
                  variant="danger"
                  className="ml-2 mt-6"
                  value="overweight"
                />
              </div>
            </PageCard>

            <PageCard title="Blood Sugar" bodyStyle="p-4 mt-4">
              <div className="flex items-center">
                <Input
                  placeholder="170"
                  label="RBS (mg/dL)"
                  labelStyle="lg:text-sm text-xs"
                />
                <BadgeField
                  variant="danger"
                  className="ml-2 mt-6"
                  value="overweight"
                />
              </div>
            </PageCard>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 py-7 mt-2">
          <PageCard title="Nutritional Assess" bodyStyle="p-4">
            <div className="flex gap-3 items-center">
              <Label>Dietary Diversity Score - 0/15</Label>
              <BadgeField variant="error" value="Poor" />
              <Text
                variant="text/sm"
                className="text-primary cursor-pointer underline"
                as="span"
              >
                Open Questionaire
              </Text>
            </div>
          </PageCard>
          <PageCard title="Exercise/Activity" bodyStyle="p-4">
            <div className="flex gap-3 items-center">
              <Label>Phyical Activity Score - 0/15</Label>
              <BadgeField variant="error" value="Poor" />
              <Text
                variant="text/sm"
                className="text-primary cursor-pointer underline"
                as="span"
              >
                Open Questionaire
              </Text>
            </div>
          </PageCard>
        </div>
        <Button
          variant={'primary'}
          value="Save Data"
          leadingIcon={<IconPicker icon="saveAdd" />}
          className="mt-6"
        />
      </div>
    </div>
  )
}
