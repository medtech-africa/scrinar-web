import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React from 'react'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import { OptionsWithOthersField } from '../OptionWithOthersField'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'
import { Input } from '@/components/ui/input'

export const IdealBody = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

  return (
    <div className="space-y-4">
      <PageCard title="" bodyStyle="px-4">
        <div className="grid md:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid-cols-1 gap-6">
          <PageCard
            title="What do you think is the ideal body size for women?"
            bodyStyle="px-4"
          >
            <OptionsWithOthersField
              label="Body Shape"
              options={[
                'Thin',
                'Curvy',
                'Muscular',
                'Chubby',
                "I don't know",
                'Other (please specify)',
              ]}
              studentId={studentId}
              form={{
                id: 'idealBody.womenShape',
              }}
            />
            <OptionsWithOthersField
              label="Weight"
              options={[
                'Thin',
                'Curvy',
                'Muscular',
                'Chubby',
                "I don't know",
                'Other (please specify)',
              ]}
              studentId={studentId}
              form={{
                id: 'idealBody.womenWeight',
              }}
            />
          </PageCard>
          <PageCard
            title="What do you think is an ideal body size for adolescent girls?"
            bodyStyle="px-4"
          >
            <OptionsWithOthersField
              label="Body Shape"
              options={[
                'Thin',
                'Curvy',
                'Muscular',
                'Chubby',
                "I don't know",
                'Other (please specify)',
              ]}
              studentId={studentId}
              form={{
                id: 'idealBody.adolescentWomenShape',
              }}
            />
            <OptionsWithOthersField
              label="Weight"
              options={[
                'Thin',
                'Curvy',
                'Muscular',
                'Chubby',
                "I don't know",
                'Other (please specify)',
              ]}
              studentId={studentId}
              form={{
                id: 'idealBody.adolescentWomenWeight',
              }}
            />
          </PageCard>
          <PageCard
            title="What do you think is the ideal body size for men?"
            bodyStyle="px-4"
          >
            <OptionsWithOthersField
              label="Body Shape"
              options={[
                'Thin',
                'Curvy',
                'Muscular',
                'Chubby',
                "I don't know",
                'Other (please specify)',
              ]}
              studentId={studentId}
              form={{
                id: 'idealBody.menShape',
              }}
            />
            <OptionsWithOthersField
              label="Weight"
              options={[
                'Thin',
                'Curvy',
                'Muscular',
                'Chubby',
                "I don't know",
                'Other (please specify)',
              ]}
              studentId={studentId}
              form={{
                id: 'idealBody.menWeight',
              }}
            />
          </PageCard>
          <PageCard
            title="What do you think is the ideal body size for adolescent boys?"
            bodyStyle="px-4"
          >
            <OptionsWithOthersField
              label="Body Shape"
              options={[
                'Thin',
                'Curvy',
                'Muscular',
                'Chubby',
                "I don't know",
                'Other (please specify)',
              ]}
              studentId={studentId}
              form={{
                id: 'idealBody.adolescentMenShape',
              }}
            />
            <OptionsWithOthersField
              label="Weight"
              options={[
                'Thin',
                'Curvy',
                'Muscular',
                'Chubby',
                "I don't know",
                'Other (please specify)',
              ]}
              studentId={studentId}
              form={{
                id: 'idealBody.adolescentMenWeight',
              }}
            />
          </PageCard>

          <Select
            {...customRegister('idealBody.knowYourWeight')}
            label="Do you know your weight?"
            options={convertStringsToOptionArray(['Yes', 'No'])}
            value={{
              value: watch('idealBody.knowYourWeight'),
              label: watch('idealBody.knowYourWeight'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('idealBody.knowYourWeight', value)
            }}
          />

          {watch('idealBody.knowYourWeight') === 'Yes' && (
            <>
              <Input
                {...customRegister('idealBody.yourWeight')}
                label="What is your weight?"
                type="number"
              />
              <Select
                {...customRegister('idealBody.isYourWeightHealthy')}
                label="If yes, do you think it's a healthy weight?"
                options={convertStringsToOptionArray([
                  'Yes',
                  'No, I think I weigh too little',
                  'No, I think I weigh too much',
                  "I don't know",
                ])}
                value={{
                  value: watch('idealBody.isYourWeightHealthy'),
                  label: watch('idealBody.isYourWeightHealthy'),
                }}
                onChange={(selectedOption: any) => {
                  const value = selectedOption.value
                  setValue('idealBody.isYourWeightHealthy', value)
                }}
              />
            </>
          )}

          <Select
            {...customRegister('idealBody.knowYourHeight')}
            label="Do you know your height?"
            options={convertStringsToOptionArray(['Yes', 'No'])}
            value={{
              value: watch('idealBody.knowYourHeight'),
              label: watch('idealBody.knowYourHeight'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('idealBody.knowYourHeight', value)
            }}
          />

          {watch('idealBody.knowYourHeight') === 'Yes' && (
            <>
              <Input
                {...customRegister('idealBody.yourHeight')}
                label="What is your height?"
                type="number"
              />
              <Select
                {...customRegister('idealBody.isYourHeightHealthy')}
                label="If yes, do you think it's a healthy weight?"
                options={convertStringsToOptionArray([
                  'Yes',
                  'No, I think I am too tall',
                  'No, I think I am too short',
                  "I don't know",
                ])}
                value={{
                  value: watch('idealBody.isYourHeightHealthy'),
                  label: watch('idealBody.isYourHeightHealthy'),
                }}
                onChange={(selectedOption: any) => {
                  const value = selectedOption.value
                  setValue('idealBody.isYourHeightHealthy', value)
                }}
              />
            </>
          )}
        </div>
      </PageCard>
    </div>
  )
}
