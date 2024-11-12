import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React from 'react'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import { OptionsWithOthersField } from './OptionWithOthersField'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'
import { Input } from '@/components/ui/input'
import { TextArea } from '@/components/ui/textarea'

export const PhysicalActivity = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

  return (
    <div className="space-y-4">
      <PageCard title="Importance of physical activity" bodyStyle="px-4">
        <div className="grid md:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid-cols-1 gap-6">
          <Select
            {...customRegister('amountOfPhysicalActivityDaily')}
            label="How much physical activity should a person do everyday to be healthy?"
            options={convertStringsToOptionArray([
              '30 minutes a day',
              '1 hour a day',
              '2 hours a day',
              'I don’t know',
            ])}
            value={{
              value: watch('amountOfPhysicalActivityDaily'),
              label: watch('amountOfPhysicalActivityDaily'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('amountOfPhysicalActivityDaily', value)
            }}
          />

          <OptionsWithOthersField
            label="What is the long-term effect of performing physical activity regularly?"
            options={[
              'It only helps you while you are young',
              'It is beneficial for a long time and can help you stay healthy as you grow older.',
              'It doesn’t have any long-term benefits',
              'Not sure',
              'Other (please specify)',
            ]}
            studentId={studentId}
            form={{
              id: 'longTermEffectOfPerformingPhysicalActivityRegularly',
            }}
          />

          <Select
            {...customRegister('goodFormsOfExercise')}
            label="What kinds of activities are good forms of exercise? (select all you think are correct)"
            options={convertStringsToOptionArray([
              'Running and playing sports',
              'Fetching water',
              'Reading a book',
              'Watching TV',
            ])}
            isMulti
            isCreatable
            value={convertStringsToOptionArray(watch('goodFormsOfExercise'))}
            onChange={(selectedOption: any) => {
              const value = selectedOption?.map(
                (option: { value: string }) => option.value
              )
              setValue('goodFormsOfExercise', value)
            }}
          />
        </div>
      </PageCard>
      <PageCard title="Adolescent Physical Activity patterns" bodyStyle="px-4">
        <div className="grid md:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid-cols-1 gap-6">
          <Select
            {...customRegister('amountOfSportsParticipation')}
            label="In a typical week, how many times do you participate in  sports at school?"
            options={convertStringsToOptionArray([
              'Everyday',
              'Almost every day',
              '4 or 5 days a week',
              '2 or 3 days a week',
              'Occasionally',
              'Not at all',
            ])}
            value={{
              value: watch('amountOfSportsParticipation'),
              label: watch('amountOfSportsParticipation'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('amountOfSportsParticipation', value)
            }}
          />
          <Select
            {...customRegister('amountOfPhysicalActivityEngagement')}
            label="On one of those days, how long do you usually engage in it for?"
            options={convertStringsToOptionArray([
              'Everyday',
              'Almost every day',
              '4 or 5 days a week',
              '2 or 3 days a week',
              'Occasionally',
              'Not at all',
            ])}
            value={{
              value: watch('amountOfPhysicalActivityEngagement'),
              label: watch('amountOfPhysicalActivityEngagement'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('amountOfPhysicalActivityEngagement', value)
            }}
          />
          <Select
            {...customRegister('amountOfPhysicalActivityEngagement')}
            label="How often do you participate in house chores that require physical effort and make you sweat?"
            options={convertStringsToOptionArray([
              'Everyday',
              'Almost every day',
              '4 or 5 days a week',
              '2 or 3 days a week',
              'Occasionally',
              'Not at all',
            ])}
            value={{
              value: watch('amountOfPhysicalActivityEngagement'),
              label: watch('amountOfPhysicalActivityEngagement'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('amountOfPhysicalActivityEngagement', value)
            }}
          />

          {/* <OptionsWithOthersField
            label="What is the long-term effect of performing physical activity regularly?"
            options={[
              'It only helps you while you are young',
              'It is beneficial for a long time and can help you stay healthy as you grow older.',
              'It doesn’t have any long-term benefits',
              'Not sure',
              'Other (please specify)',
            ]}
            studentId={studentId}
            form={{
              id: 'longTermEffectOfPerformingPhysicalActivityRegularly',
            }}
          /> */}

          <Select
            {...customRegister('typesOfHouseChoresRegularly')}
            label="What types of house chores do you regularly do at home? (Select all that apply)"
            options={convertStringsToOptionArray([
              'Fetching water',
              'Cooking and preparing meals',
              'Sweeping and mopping the house',
              'Gardening or farming',
              'Washing clothes',
              'Cutting grass',
              'Carrying heavy items (e.g., firewood, water)',
              'Caring for younger siblings',
              "I don't do any house chores",
            ])}
            isMulti
            isCreatable
            value={convertStringsToOptionArray(
              watch('typesOfHouseChoresRegularly')
            )}
            onChange={(selectedOption: any) => {
              const value = selectedOption?.map(
                (option: { value: string }) => option.value
              )
              setValue('typesOfHouseChoresRegularly', value)
            }}
          />

          <Input
            {...customRegister(
              'averageHoursOnMobileGamesComputerInternetDaily'
            )}
            label="Average hours spent with mobile games, computer/internet daily"
            endingIcon={'hrs'}
          />
          <Input
            {...customRegister('averageHoursOnTelevisionDaily')}
            label="Average hours spent watching TV/Playing video games daily"
            endingIcon={'hrs'}
          />
          <Input
            {...customRegister('timeYouSleep')}
            label="What time do you go to bed at night?"
            endingIcon={'PM'}
          />
          <Input
            {...customRegister('timeYouWake')}
            label="What time do you wake up in the morning?"
            endingIcon={'AM'}
          />
        </div>
      </PageCard>
      <PageCard title="Gender and Physical Activity" bodyStyle="px-4">
        <div className="grid md:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid-cols-1 gap-6">
          <OptionsWithOthersField
            label="Should boys and girls do the same types of sports and activities?"
            options={[
              'Yes, all children should get the same chances, whether they’re boys or girls.',
              'It depends on the activity; some sports might fit one gender more than the other',
              'Boys and girls should only do activities that are usually for their gender.',
              'I don’t know',
              'Other (please specify)',
            ]}
            studentId={studentId}
            form={{
              id: 'shouldBoysGirlsDoSameSports',
            }}
          />

          <Select
            {...customRegister('challengesFromBeingPhysicallyActive')}
            label="What are some challenges that you think prevent children your age (Refer to adolescents when asking adults) from being physically active? (Select all that apply)"
            options={convertStringsToOptionArray([
              'Lack of time due to schoolwork or other responsibilities like house chores, etc',
              'Lack of access to sports facilities or equipment',
              'Feeling self-conscious or embarrassed',
              'Lack of encouragement from family or friends',
              'Health issues or physical limitations',
              'I don’t know',
            ])}
            isMulti
            isCreatable
            value={convertStringsToOptionArray(
              watch('challengesFromBeingPhysicallyActive')
            )}
            onChange={(selectedOption: any) => {
              const value = selectedOption?.map(
                (option: { value: string }) => option.value
              )
              setValue('challengesFromBeingPhysicallyActive', value)
            }}
          />
          <Select
            {...customRegister('importanceOfBeingPhysicallyActive')}
            label="Is it important for both boys and girls to be physically active? (Select all that apply)"
            options={convertStringsToOptionArray([
              "Yes, it's important for both boys and girls",
              "It's only important for boys",
              "It's only important for girls",
              'I don’t know',
            ])}
            isMulti
            isCreatable
            value={convertStringsToOptionArray(
              watch('importanceOfBeingPhysicallyActive')
            )}
            onChange={(selectedOption: any) => {
              const value = selectedOption?.map(
                (option: { value: string }) => option.value
              )
              setValue('importanceOfBeingPhysicallyActive', value)
            }}
          />

          <TextArea
            rows={4}
            {...customRegister('suitableActivitiesForBoys')}
            label="Which types of physical activities do you think are most suitable for boys? (List all that you can think of)"
          />
          <TextArea
            rows={4}
            {...customRegister('suitableActivitiesForGirls')}
            label="Which types of physical activities do you think are most suitable for girls? (List all that you can think of)"
          />
        </div>
      </PageCard>
    </div>
  )
}
