import { PageCard } from '@/components/ui/page-card'
import React from 'react'
import { OptionsWithOthersField } from './OptionWithOthersField'

export const ParentSurveyIdealBody = () => {
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
              form={{
                id: 'idealBody.adolescentMenWeight',
              }}
            />
          </PageCard>
        </div>
      </PageCard>
    </div>
  )
}
