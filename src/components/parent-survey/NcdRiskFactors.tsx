import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React from 'react'
import { OptionsWithOthersField } from './OptionWithOthersField'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'
import { useFormContext } from 'react-hook-form'
import { Input } from '../ui/input'

export const ParentSurveyNcdRiskFactors = () => {
  const {
    register,
    register: customRegister,
    setValue,
    watch,
  } = useFormContext()

  return (
    <>
      <PageCard
        title="F.	Work, Travel, Recreation, and Sedentary Behavior"
        bodyStyle="px-4"
      >
        <div className="grid grid-cols-1 gap-6">
          <PageCard
            title="Work"
            bodyStyle="px-4 py-2 space-y-4 grid md:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid-cols-1 "
            textContainerClassName="mb-2"
          >
            <Select
              {...register('ncdRiskFactor.work.vigorousActivity')}
              label="Does your work involve vigorous-intensity activity that causes large increases in breathing or heart rate like carrying or lifting heavy loads, digging or construction work?"
              options={convertStringsToOptionArray(['Yes', 'No'])}
              value={{
                value: watch('ncdRiskFactor.work.vigorousActivity'),
                label: watch('ncdRiskFactor.work.vigorousActivity'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('ncdRiskFactor.work.vigorousActivity', value)
              }}
            />

            <Select
              {...register('ncdRiskFactor.work.vigorousActivityDays')}
              label="In a typical week, on how many days do you do vigorous-intensity activities as part of your work?"
              options={convertStringsToOptionArray([
                'Everyday',
                'Almost every day',
                '4 or 5 days a week',
                '2 or 3 days a week',
                'Occasionally',
                'Not at all',
              ])}
              value={{
                value: watch('ncdRiskFactor.work.vigorousActivityDays'),
                label: watch('ncdRiskFactor.work.vigorousActivityDays'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('ncdRiskFactor.work.vigorousActivityDays', value)
              }}
            />

            <Input
              label="How much time do you spend doing vigorous-intensity activities at work on a typical day? (Think of a typical day that you can remember easily in which you engaged in vigorous-intensity activities continuously at your work.)"
              {...register('ncdRiskFactor.work.vigorousActivityTimeDuration')}
            />

            <Select
              {...register('ncdRiskFactor.home.houseChores')}
              label="What types of house chores do you regularly do at home? (Select all that apply)"
              options={convertStringsToOptionArray([
                'Fetching water',
                'Cooking and preparing meals',
                'Sweeping and mopping the house',
                'Gardening or farming',
                'Washing clothes',
                'Cutting grass',
                'Carrying heavy items (e.g., firewood, water)',
                'Child care',
                'I don’t do any house chores',
                'Other (please specify)',
              ])}
              isMulti
              isCreatable
              value={convertStringsToOptionArray(
                watch('ncdRiskFactor.home.houseChores')
              )}
              onChange={(selectedOption: any) => {
                const value = selectedOption?.map(
                  (option: { value: string }) => option.value
                )
                setValue('ncdRiskFactor.home.houseChores', value)
              }}
            />

            <Select
              {...register('ncdRiskFactor.home.physicalChoresFrequency')}
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
                value: watch('ncdRiskFactor.home.physicalChoresFrequency'),
                label: watch('ncdRiskFactor.home.physicalChoresFrequency'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('ncdRiskFactor.home.physicalChoresFrequency', value)
              }}
            />

            <Select
              {...register('ncdRiskFactor.home.houseChoresDuration')}
              label="How long do you usually engage in it for?"
              options={convertStringsToOptionArray([
                'Less than 30 minutes',
                '30 minutes to 1 hour',
                'More than 1 hour',
                'Not sure',
              ])}
              value={{
                value: watch('ncdRiskFactor.home.houseChoresDuration'),
                label: watch('ncdRiskFactor.home.houseChoresDuration'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('ncdRiskFactor.home.houseChoresDuration', value)
              }}
            />

            <OptionsWithOthersField
              options={[
                'Water only',
                'Soap and water',
                'Ash',
                'Do not remember',
                'Other (specify)',
              ]}
              form={{
                id: 'healthHygiene.whatWasUsedToWashHand',
              }}
              label="If yes, what did you use to wash your hands? "
            />
          </PageCard>

          <PageCard
            title="Travel To and From Places"
            bodyStyle="px-4 py-2 space-y-4"
            textContainerClassName="mb-2"
          >
            <Select
              {...register('ncdRiskFactor.travel.walkOrBicycle')}
              label="Do you walk or use a bicycle (pedal cycle) to get to and from places?"
              options={convertStringsToOptionArray(['Yes', 'No'])}
              value={{
                value: watch('ncdRiskFactor.travel.walkOrBicycle'),
                label: watch('ncdRiskFactor.travel.walkOrBicycle'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('ncdRiskFactor.travel.walkOrBicycle', value)
              }}
            />

            <Select
              {...register('ncdRiskFactor.travel.walkOrBicycleDays')}
              label="In a typical week, on how many days do you walk or bicycle to get to and from places?"
              options={convertStringsToOptionArray([
                'Everyday',
                'Almost every day',
                '4 or 5 days a week',
                '2 or 3 days a week',
                'Occasionally',
                'Not at all',
              ])}
              value={{
                value: watch('ncdRiskFactor.travel.walkOrBicycleDays'),
                label: watch('ncdRiskFactor.travel.walkOrBicycleDays'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('ncdRiskFactor.travel.walkOrBicycleDays', value)
              }}
            />

            <div>
              <label>
                How much time do you spend walking or bicycling for travel on a
                typical day? (Think of a typical day you can recall easily in
                which you engaged in transport-related activities)
              </label>
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Hours"
                  {...register('ncdRiskFactor.travel.walkOrBicycleTime.hours')}
                />
                <Input
                  type="number"
                  placeholder="Minutes"
                  {...register(
                    'ncdRiskFactor.travel.walkOrBicycleTime.minutes'
                  )}
                />
              </div>
            </div>

            <Input
              label="How much time do you spend doing vigorous-intensity activities at work on a typical day? (Think of a typical day that you can remember easily in which you engaged in vigorous-intensity activities continuously at your work.)"
              {...register('ncdRiskFactor.work.vigorousActivityTimeDuration')}
            />
          </PageCard>

          <PageCard
            title="Recreational activities"
            bodyStyle="px-4 py-2 space-y-4"
            textContainerClassName="mb-2"
          >
            <Select
              {...register('ncdRiskFactor.activities.vigorousSports')}
              label="Do you do any vigorous-intensity sports, fitness, or recreational (leisure) activities that cause large increases in breathing or heart rate like running or football?"
              options={convertStringsToOptionArray(['Yes', 'No'])}
              value={{
                value: watch('ncdRiskFactor.activities.vigorousSports'),
                label: watch('ncdRiskFactor.activities.vigorousSports'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('ncdRiskFactor.activities.vigorousSports', value)
              }}
            />

            <Select
              {...register('ncdRiskFactor.activities.vigorousSportsDays')}
              label="In a typical week, on how many days do you do vigorous-intensity sports, fitness, or recreational (leisure) activities?"
              options={convertStringsToOptionArray([
                'Everyday',
                'Almost every day',
                '4 or 5 days a week',
                '2 or 3 days a week',
                'Occasionally',
                'Not at all',
              ])}
              value={{
                value: watch('ncdRiskFactor.activities.vigorousSportsDays'),
                label: watch('ncdRiskFactor.activities.vigorousSportsDays'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('ncdRiskFactor.activities.vigorousSportsDays', value)
              }}
            />

            <div>
              <label>
                How much time do you spend doing vigorous-intensity sports,
                fitness, or recreational activities on a typical day? (Think of
                a typical day you can recall easily)
              </label>
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Hours"
                  {...register(
                    'ncdRiskFactor.activities.vigorousSportsTime.hours'
                  )}
                />
                <Input
                  type="number"
                  placeholder="Minutes"
                  {...register(
                    'ncdRiskFactor.activities.vigorousSportsTime.minutes'
                  )}
                />
              </div>
            </div>
          </PageCard>

          <PageCard
            title="Sedentary behavior"
            bodyStyle="px-4 py-2 space-y-4"
            textContainerClassName="mb-2"
          >
            <div>
              <label>
                How much time do you usually spend sitting or reclining on a
                typical day? total time spent sitting at work, in an office,
                reading, watching television, using a computer, doing hand craft
                like knitting, resting, excluding time spent sleeping.
              </label>
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="Hours"
                  {...register('ncdRiskFactor.sittingTime.hours')}
                />
                <Input
                  type="number"
                  placeholder="Minutes"
                  {...register('ncdRiskFactor.sittingTime.minutes')}
                />
              </div>
            </div>

            <Input
              {...register('ncdRiskFactor.timeYouSleep')}
              label="What time do you go to bed at night?"
              endingIcon={'PM'}
            />
            <Input
              {...register('ncdRiskFactor.timeYouWake')}
              label="What time do you wake up in the morning?"
              endingIcon={'AM'}
            />
          </PageCard>
        </div>
      </PageCard>

      <PageCard title="Alcohol Use and Smoking" bodyStyle="px-4">
        <div className="grid md:flex grid-cols-1 gap-6 parent lg:[&>*]:w-[calc(50%-1.5rem)] flex-wrap">
          <PageCard
            title="Smoking"
            bodyStyle="px-4 py-2 space-y-4"
            textContainerClassName="mb-2"
          >
            <Select
              {...customRegister('ncdRiskFactor.currentlySmokingTobacco')}
              label="Do you currently smoke any tobacco products, such as cigarettes, cigars, or pipes?"
              options={convertStringsToOptionArray(['Yes', 'No'])}
              value={{
                value: watch('ncdRiskFactor.currentlySmokingTobacco'),
                label: watch('ncdRiskFactor.currentlySmokingTobacco'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('ncdRiskFactor.currentlySmokingTobacco', value)
              }}
            />

            {watch('ncdRiskFactor.currentlySmokingTobacco') === 'Yes' && (
              <>
                <div>
                  <label>
                    How old were you when you first started smoking?
                  </label>
                  <div className="flex gap-4 mt-1">
                    <Input
                      type="number"
                      placeholder="Years"
                      {...register('ncdRiskFactor.smoking.ageStarted')}
                      className="w-24"
                    />
                    <Select
                      {...customRegister(
                        'ncdRiskFactor.smoking.ageStartedOption'
                      )}
                      options={convertStringsToOptionArray([
                        'I don’t remember',
                      ])}
                      value={{
                        value: watch('ncdRiskFactor.smoking.ageStartedOption'),
                        label: watch('ncdRiskFactor.smoking.ageStartedOption'),
                      }}
                      onChange={(selectedOption: any) => {
                        const value = selectedOption.value
                        setValue(
                          'ncdRiskFactor.smoking.ageStartedOption',
                          value
                        )
                      }}
                    />
                  </div>
                </div>

                <Select
                  {...customRegister('ncdRiskFactor.smoking.triedToStop')}
                  label="During the past 12 months, have you tried to stop smoking?"
                  options={convertStringsToOptionArray(['Yes', 'No'])}
                  value={{
                    value: watch('ncdRiskFactor.smoking.triedToStop'),
                    label: watch('ncdRiskFactor.smoking.triedToStop'),
                  }}
                  onChange={(selectedOption: any) => {
                    setValue(
                      'ncdRiskFactor.smoking.triedToStop',
                      selectedOption.value
                    )
                  }}
                />

                <Select
                  {...customRegister('ncdRiskFactor.smoking.currentlySmoking')}
                  label="Do you currently smoke tobacco products every day?"
                  options={convertStringsToOptionArray(['Yes', 'No'])}
                  value={{
                    value: watch('ncdRiskFactor.smoking.currentlySmoking'),
                    label: watch('ncdRiskFactor.smoking.currentlySmoking'),
                  }}
                  onChange={(selectedOption: any) => {
                    setValue(
                      'ncdRiskFactor.smoking.currentlySmoking',
                      selectedOption.value
                    )
                  }}
                />
              </>
            )}
            {watch('ncdRiskFactor.currentlySmokingTobacco') === 'No' && (
              <>
                <Select
                  {...customRegister('ncdRiskFactor.smoking.pastTobaccoUse')}
                  label="In the past, did you ever smoke any tobacco products?"
                  options={convertStringsToOptionArray(['Yes', 'No'])}
                  value={{
                    value: watch('ncdRiskFactor.smoking.pastTobaccoUse'),
                    label: watch('ncdRiskFactor.smoking.pastTobaccoUse'),
                  }}
                  onChange={(selectedOption: any) => {
                    const value = selectedOption.value
                    setValue('ncdRiskFactor.smoking.pastTobaccoUse', value)
                  }}
                />
                <Select
                  {...customRegister('ncdRiskFactor.smoking.pastDailySmoking')}
                  label="In the past, did you ever smoke daily?"
                  options={convertStringsToOptionArray(['Yes', 'No'])}
                  value={{
                    value: watch('ncdRiskFactor.smoking.pastDailySmoking'),
                    label: watch('ncdRiskFactor.smoking.pastDailySmoking'),
                  }}
                  onChange={(selectedOption: any) => {
                    const value = selectedOption.value
                    setValue('ncdRiskFactor.smoking.pastDailySmoking', value)
                  }}
                />
              </>
            )}

            <Select
              {...customRegister('ncdRiskFactor.smoking.insideHome')}
              label="During the past 30 days, did someone smoke inside your home (e.g., in the sitting room, bedroom) (not yourself)?"
              options={convertStringsToOptionArray(['Yes', 'No'])}
              value={{
                value: watch('ncdRiskFactor.smoking.insideHome'),
                label: watch('ncdRiskFactor.smoking.insideHome'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('ncdRiskFactor.smoking.insideHome', value)
              }}
            />
            <Select
              {...customRegister('ncdRiskFactor.smoking.workplace')}
              label="During the past 30 days, did someone smoke in closed areas in your workplace (in the building, in a work area, or a specific office)?"
              options={convertStringsToOptionArray([
                'Yes',
                'No',
                "I don't work in a closed area",
              ])}
              value={{
                value: watch('ncdRiskFactor.smoking.workplace'),
                label: watch('ncdRiskFactor.smoking.workplace'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('ncdRiskFactor.smoking.workplace', value)
              }}
            />
            <Select
              {...customRegister('ncdRiskFactor.smoking.smokelessTobacco')}
              label="Do you currently use any smokeless tobacco products such as snuff, chewing tobacco, betel?"
              options={convertStringsToOptionArray(['Yes', 'No'])}
              value={{
                value: watch('ncdRiskFactor.smoking.smokelessTobacco'),
                label: watch('ncdRiskFactor.smoking.smokelessTobacco'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('ncdRiskFactor.smoking.smokelessTobacco', value)
              }}
            />
            <Select
              {...customRegister('ncdRiskFactor.smoking.dailySmokelessTobacco')}
              label="Do you currently use smokeless tobacco products daily?"
              options={convertStringsToOptionArray(['Yes', 'No'])}
              value={{
                value: watch('ncdRiskFactor.smoking.dailySmokelessTobacco'),
                label: watch('ncdRiskFactor.smoking.dailySmokelessTobacco'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('ncdRiskFactor.smoking.dailySmokelessTobacco', value)
              }}
            />
          </PageCard>
        </div>
      </PageCard>
    </>
  )
}
