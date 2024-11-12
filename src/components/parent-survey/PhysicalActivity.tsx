import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React from 'react'
import { OptionsWithOthersField } from './OptionWithOthersField'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'
import { Input } from '@/components/ui/input'
import { TextArea } from '@/components/ui/textarea'
import { useFormContext } from 'react-hook-form'

export const ParentSurveyPhysicalActivity = () => {
  const { register: customRegister, setValue, watch } = useFormContext()

  return (
    <div className="space-y-4">
      <PageCard title="Importance of physical activity" bodyStyle="px-4">
        <div className="grid md:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid-cols-1 gap-6">
          <Select
            {...customRegister(
              'physicalActivity.amountOfPhysicalActivityDaily'
            )}
            label="How much physical activity should a person do everyday to be healthy?"
            options={convertStringsToOptionArray([
              '30 minutes a day',
              '1 hour a day',
              '2 hours a day',
              'I don’t know',
            ])}
            value={{
              value: watch('physicalActivity.amountOfPhysicalActivityDaily'),
              label: watch('physicalActivity.amountOfPhysicalActivityDaily'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('physicalActivity.amountOfPhysicalActivityDaily', value)
            }}
          />
          <Select
            {...customRegister(
              'physicalActivity.importanceOfChildPhysicalExerciseOnHealth'
            )}
            label="How important do you think physical exercise is for your child’s health?"
            options={convertStringsToOptionArray([
              'Extremely important',
              'Very important',
              'Somewhat important',
              'Not very important',
              'Not important at all',
            ])}
            value={{
              value: watch(
                'physicalActivity.importanceOfChildPhysicalExerciseOnHealth'
              ),
              label: watch(
                'physicalActivity.importanceOfChildPhysicalExerciseOnHealth'
              ),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue(
                'physicalActivity.importanceOfChildPhysicalExerciseOnHealth',
                value
              )
            }}
          />
          <Select
            {...customRegister('physicalActivity.childGetsEnoughExercise')}
            label="Do you think your child gets enough physical exercise?"
            options={convertStringsToOptionArray(['Yes', 'No', 'I don’t know'])}
            value={{
              value: watch('physicalActivity.childGetsEnoughExercise'),
              label: watch('physicalActivity.childGetsEnoughExercise'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('physicalActivity.childGetsEnoughExercise', value)
            }}
          />
          <Select
            {...customRegister(
              'physicalActivity.importancePhysicalExerciseOnYourHealth'
            )}
            label="How important do you think physical exercise is for your own health?"
            options={convertStringsToOptionArray([
              'Extremely important',
              'Very important',
              'Somewhat important',
              'Not very important',
              'Not important at all',
            ])}
            value={{
              value: watch(
                'physicalActivity.importancePhysicalExerciseOnYourHealth'
              ),
              label: watch(
                'physicalActivity.importancePhysicalExerciseOnYourHealth'
              ),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue(
                'physicalActivity.importancePhysicalExerciseOnYourHealth',
                value
              )
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
            form={{
              id: 'physicalActivity.longTermEffectOfPerformingPhysicalActivityRegularly',
            }}
          />

          <Select
            {...customRegister('physicalActivity.goodFormsOfExercise')}
            label="What kinds of activities are good forms of exercise? (select all you think are correct)"
            options={convertStringsToOptionArray([
              'Running and playing sports',
              'Fetching water',
              'Reading a book',
              'Watching TV',
            ])}
            isMulti
            isCreatable
            value={convertStringsToOptionArray(
              watch('physicalActivity.goodFormsOfExercise')
            )}
            onChange={(selectedOption: any) => {
              const value = selectedOption?.map(
                (option: { value: string }) => option.value
              )
              setValue('physicalActivity.goodFormsOfExercise', value)
            }}
          />
        </div>
      </PageCard>
      <PageCard title="Adolescent Physical Activity patterns" bodyStyle="px-4">
        <div className="grid md:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid-cols-1 gap-6">
          <Select
            {...customRegister('physicalActivity.typesOfHouseChoresRegularly')}
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
              watch('physicalActivity.typesOfHouseChoresRegularly')
            )}
            onChange={(selectedOption: any) => {
              const value = selectedOption?.map(
                (option: { value: string }) => option.value
              )
              setValue('physicalActivity.typesOfHouseChoresRegularly', value)
            }}
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
            form={{
              id: 'physicalActivity.shouldBoysGirlsDoSameSports',
            }}
          />

          <Select
            {...customRegister(
              'physicalActivity.challengesFromBeingPhysicallyActive'
            )}
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
              watch('physicalActivity.challengesFromBeingPhysicallyActive')
            )}
            onChange={(selectedOption: any) => {
              const value = selectedOption?.map(
                (option: { value: string }) => option.value
              )
              setValue(
                'physicalActivity.challengesFromBeingPhysicallyActive',
                value
              )
            }}
          />
          <Select
            {...customRegister(
              'physicalActivity.importanceOfBeingPhysicallyActive'
            )}
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
              watch('physicalActivity.importanceOfBeingPhysicallyActive')
            )}
            onChange={(selectedOption: any) => {
              const value = selectedOption?.map(
                (option: { value: string }) => option.value
              )
              setValue(
                'physicalActivity.importanceOfBeingPhysicallyActive',
                value
              )
            }}
          />

          <TextArea
            rows={4}
            {...customRegister('physicalActivity.suitableActivitiesForBoys')}
            label="Which types of physical activities do you think are most suitable for boys? (List all that you can think of)"
          />
          <TextArea
            rows={4}
            {...customRegister('physicalActivity.suitableActivitiesForGirls')}
            label="Which types of physical activities do you think are most suitable for girls? (List all that you can think of)"
          />

          <OptionsWithOthersField
            label="Do you think the amount of physical activity needed is different for men and women?"
            options={[
              'Yes, men need more physical activity than women',
              'Yes, women need more physical activity than men',
              'No, men and women need the same amount of physical activity',
              'I don’t know',
              'Other (please specify)',
            ]}
            form={{
              id: 'physicalActivity.amountOfPhysicalActivityNeededIsDifferentForBoth',
            }}
          />

          <OptionsWithOthersField
            label="What common beliefs or practices in your community discourage girls from engaging in physical activities?"
            options={[
              'Physical differences between boys and girls',
              'Some sports are traditionally meant for either boys or girls',
              'Boys and girls have different interests when it comes to sports',
              'Concerns about injury or safety',
              'Cultural or religious beliefs',
              "I don't know",
              'Other (please specify)',
            ]}
            form={{
              id: 'physicalActivity.beliefsThatDiscourageGirlFromPhysical',
            }}
          />

          <Select
            {...customRegister(
              'physicalActivity.amountOfTimeGirlsHaveForPhysicalThanBoys'
            )}
            label="In your community, do you think girls have more, less, or the same amount of time for physical activities compared to boys?"
            options={convertStringsToOptionArray([
              'Girls have more time than boys',
              'Girls have less time than boys',
              'Girls and boys have about the same amount of time',
              'Unsure',
            ])}
            value={{
              value: watch(
                'physicalActivity.amountOfTimeGirlsHaveForPhysicalThanBoys'
              ),
              label: watch(
                'physicalActivity.amountOfTimeGirlsHaveForPhysicalThanBoys'
              ),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue(
                'physicalActivity.amountOfTimeGirlsHaveForPhysicalThanBoys',
                value
              )
            }}
          />

          {[
            'Girls have more time than boys',
            'Girls have less time than boys',
          ].includes(
            watch('physicalActivity.amountOfTimeGirlsHaveForPhysicalThanBoys')
          ) && (
            <Input
              {...customRegister(
                'physicalActivity.whyAmountOfTimeGirlsHaveForPhysicalThanBoys'
              )}
              label="why do you think so?"
            />
          )}

          <Select
            {...customRegister(
              'physicalActivity.amountOfOpportunitiesGirlsHaveForPhysicalThanBoys'
            )}
            label="In your community, do you think girls have more, less, or the same opportunities for physical activities compared to boys?"
            options={convertStringsToOptionArray([
              'Girls have more opportunities than boys',
              'Girls have less opportunities than boys',
              'Girls and boys have about the same opportunities',
              'Unsure',
            ])}
            value={{
              value: watch(
                'physicalActivity.amountOfOpportunitiesGirlsHaveForPhysicalThanBoys'
              ),
              label: watch(
                'physicalActivity.amountOfOpportunitiesGirlsHaveForPhysicalThanBoys'
              ),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue(
                'physicalActivity.amountOfOpportunitiesGirlsHaveForPhysicalThanBoys',
                value
              )
            }}
          />

          {[
            'Girls have more opportunities than boys',
            'Girls have less opportunities than boys',
          ].includes(
            watch(
              'physicalActivity.amountOfOpportunitiesGirlsHaveForPhysicalThanBoys'
            )
          ) && (
            <Input
              {...customRegister(
                'physicalActivity.whyAmountOfOpportunitiesGirlsHaveForPhysicalThanBoys'
              )}
              label="why do you think so?"
            />
          )}
        </div>
      </PageCard>
    </div>
  )
}
