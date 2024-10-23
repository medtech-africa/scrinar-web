import React from 'react'
import { Select } from '../ui/select'
import { Input } from '../ui/input'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { IStudentsSurveyData } from '@/types/studentsSurvey.types'
import { PageCard } from '../ui/page-card'

const Nutrition = ({
  control,
  errors,
}: {
  control: Control<IStudentsSurveyData>
  errors: FieldErrors<IStudentsSurveyData>
}) => {
  return (
    <PageCard title="Nutrition" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        <Controller
          control={control}
          name="fruitsVegetables"
          render={({ field }) => (
            <Select
              {...field}
              label="How often do you eat fruits and vegetables?"
              options={[
                { value: 'Every day', label: 'Every day' },
                {
                  value: 'A few times a week',
                  label: 'A few times a week',
                },
                { value: 'Rarely', label: 'Rarely' },
                { value: 'Never', label: 'Never' },
              ]}
              message={errors.fruitsVegetables?.message}
              variant={errors.fruitsVegetables ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Snacks Consumption */}
        <Controller
          control={control}
          name="snacksConsumption"
          render={({ field }) => (
            <Select
              {...field}
              label="How often do you consume snacks like buns, doughnut, etc.?"
              options={[
                { value: 'Every day', label: 'Every day' },
                {
                  value: 'A few times a week',
                  label: 'A few times a week',
                },
                { value: 'Rarely', label: 'Rarely' },
                { value: 'Never', label: 'Never' },
              ]}
              message={errors.snacksConsumption?.message}
              variant={errors.snacksConsumption ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Sugary Beverages */}
        <Controller
          control={control}
          name="sugaryBeverages"
          render={({ field }) => (
            <Select
              {...field}
              label="How often do you drink sugary beverages or eat sugary snacks?"
              options={[
                { value: 'Every day', label: 'Every day' },
                {
                  value: 'A few times a week',
                  label: 'A few times a week',
                },
                { value: 'Rarely', label: 'Rarely' },
                { value: 'Never', label: 'Never' },
              ]}
              message={errors.sugaryBeverages?.message}
              variant={errors.sugaryBeverages ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Physical Activity Frequency */}
        {/* <Controller
            control={control}
            name="physicalActivityFrequency"
            render={({ field }) => (
              <Select
                {...field}
                label="How often do you engage in physical activity?"
                options={[
                  { value: 'Every day', label: 'Every day' },
                  { value: 'A few times a week', label: 'A few times a week' },
                  { value: 'Rarely', label: 'Rarely' },
                  { value: 'Never', label: 'Never' },
                ]}
                message={errors.physicalActivityFrequency?.message}
                variant={
                  errors.physicalActivityFrequency ? 'destructive' : 'default'
                }
              />
            )}
          /> */}

        {/* Duration of Physical Activity */}
        <Controller
          control={control}
          name="physicalActivityDuration"
          render={({ field }) => (
            <Select
              {...field}
              label="How long do you usually engage in physical activity?"
              options={[
                {
                  value: 'Less than 30 minutes',
                  label: 'Less than 30 minutes',
                },
                {
                  value: '30 minutes to 1 hour',
                  label: '30 minutes to 1 hour',
                },
                { value: 'More than 1 hour', label: 'More than 1 hour' },
                { value: 'Not applicable', label: 'Not applicable' },
              ]}
              message={errors.physicalActivityDuration?.message}
              variant={
                errors.physicalActivityDuration ? 'destructive' : 'default'
              }
            />
          )}
        />

        {/* Types of Physical Activity */}
        <Controller
          control={control}
          name="physicalActivityTypes"
          render={({ field }) => (
            <Select
              {...field}
              label="What types of physical activity and games do you enjoy?"
              isMulti
              options={[
                { value: 'Running', label: 'Running' },
                { value: 'Playing sports', label: 'Playing sports' },
                { value: 'Skipping', label: 'Skipping' },
                { value: 'Dancing', label: 'Dancing' },
                { value: 'Other', label: 'Other' },
              ]}
              message={errors.physicalActivityTypes?.message}
              variant={errors.physicalActivityTypes ? 'destructive' : 'default'}
            />
          )}
        />

        {/* House Chores Frequency */}
        <Controller
          control={control}
          name="houseChoresFrequency"
          render={({ field }) => (
            <Select
              {...field}
              label="How often do you participate in house chores that require physical effort?"
              options={[
                { value: 'Every day', label: 'Every day' },
                {
                  value: 'Several times a week',
                  label: 'Several times a week',
                },
                { value: 'Once a week', label: 'Once a week' },
                {
                  value: 'Less than once a week',
                  label: 'Less than once a week',
                },
                { value: 'Never', label: 'Never' },
              ]}
              message={errors.houseChoresFrequency?.message}
              variant={errors.houseChoresFrequency ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Types of House Chores */}
        <Controller
          control={control}
          name="houseChoresTypes"
          render={({ field }) => (
            <Select
              {...field}
              label="What types of house chores do you regularly perform that involve physical activity?"
              isMulti
              options={[
                { value: 'Fetching water', label: 'Fetching water' },
                { value: 'Cooking', label: 'Cooking and preparing meals' },
                { value: 'Cleaning', label: 'Cleaning the house' },
                { value: 'Gardening', label: 'Gardening or farming' },
                {
                  value: 'Carrying heavy items',
                  label: 'Carrying heavy items',
                },
                {
                  value: 'Caring for siblings',
                  label: 'Caring for younger siblings',
                },
                { value: 'Other', label: 'Other' },
              ]}
              message={errors.houseChoresTypes?.message}
              variant={errors.houseChoresTypes ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Outside Physical Activities Frequency */}
        <Controller
          control={control}
          name="outsidePhysicalActivitiesFrequency"
          render={({ field }) => (
            <Select
              {...field}
              label="How often do you perform physical activities outside of house chores?"
              options={[
                { value: 'Every day', label: 'Every day' },
                {
                  value: 'Several times a week',
                  label: 'Several times a week',
                },
                { value: 'Once a week', label: 'Once a week' },
                {
                  value: 'Less than once a week',
                  label: 'Less than once a week',
                },
                { value: 'Never', label: 'Never' },
              ]}
              message={errors.outsidePhysicalActivitiesFrequency?.message}
              variant={
                errors.outsidePhysicalActivitiesFrequency
                  ? 'destructive'
                  : 'default'
              }
            />
          )}
        />

        {/* Daily Hours of Mobile Games */}
        <Controller
          control={control}
          name="mobileGamesHours"
          render={({ field }) => (
            <Input
              {...field}
              label="Average hours spent with mobile games, computer/internet daily"
              placeholder="Hours"
              type="number"
              message={errors.mobileGamesHours?.message}
              variant={errors.mobileGamesHours ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Daily Hours of TV */}
        <Controller
          control={control}
          name="tvGamesHours"
          render={({ field }) => (
            <Input
              {...field}
              label="Average hours spent watching TV/Playing video games daily"
              placeholder="Hours"
              type="number"
              message={errors.tvGamesHours?.message}
              variant={errors.tvGamesHours ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Bedtime */}
        <Controller
          control={control}
          name="bedtime"
          render={({ field }) => (
            <Input
              {...field}
              label="When do you go to bed at night?"
              placeholder="e.g., 10:00 PM"
              message={errors.bedtime?.message}
              variant={errors.bedtime ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Wake-up Time */}
        <Controller
          control={control}
          name="wakeupTime"
          render={({ field }) => (
            <Input
              {...field}
              label="When do you wake up in the morning?"
              placeholder="e.g., 7:00 AM"
              message={errors.wakeupTime?.message}
              variant={errors.wakeupTime ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Doctor Visits Frequency */}
        <Controller
          control={control}
          name="doctorVisitsFrequency"
          render={({ field }) => (
            <Select
              {...field}
              label="How often do you visit the doctor for health check-ups?"
              options={[
                {
                  value: 'Regularly',
                  label: 'Regularly (e.g., once a year)',
                },
                {
                  value: 'Occasionally',
                  label: 'Occasionally (e.g., when sick)',
                },
                { value: 'Rarely', label: 'Rarely' },
                { value: 'Never', label: 'Never' },
              ]}
              message={errors.doctorVisitsFrequency?.message}
              variant={errors.doctorVisitsFrequency ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Coping Mechanisms */}
        <Controller
          control={control}
          name="copingMechanisms"
          render={({ field }) => (
            <Select
              {...field}
              label="When you feel worried or upset, what helps you feel better?"
              isMulti
              options={[
                {
                  value: 'Talk to someone',
                  label: 'Talk to a family member or friend',
                },
                {
                  value: 'Enjoy hobbies',
                  label: 'Do something I enjoy, like drawing or playing games',
                },
                {
                  value: 'Play sports',
                  label: 'Play sports or run around',
                },
                {
                  value: 'Listen to music',
                  label: 'Listen to my favorite music',
                },
                {
                  value: 'Spend time alone',
                  label: 'Spend some time alone',
                },
                { value: 'Other', label: 'Other' },
              ]}
              message={errors.copingMechanisms?.message}
              variant={errors.copingMechanisms ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Stress Factors */}
        <Controller
          control={control}
          name="stressFactors"
          render={({ field }) => (
            <Select
              {...field}
              label="What things make you feel stressed?"
              isMulti
              options={[
                { value: 'Schoolwork', label: 'Schoolwork or tests' },
                { value: 'Home problems', label: 'Problems at home' },
                { value: 'Friend issues', label: 'Issues with friends' },
                { value: 'Chores', label: 'Chores or helping at home' },
                {
                  value: 'Free time',
                  label: 'Not having enough free time',
                },
                { value: 'Health problems', label: 'Health problems' },
                { value: 'Other', label: 'Other' },
              ]}
              message={errors.stressFactors?.message}
              variant={errors.stressFactors ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Smoking History */}
        <Controller
          control={control}
          name="smokingHistory"
          render={({ field }) => (
            <Select
              {...field}
              label="Have you smoked in any form before?"
              options={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
              ]}
              message={errors.smokingHistory?.message}
              variant={errors.smokingHistory ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Current Smoking Status */}
        <Controller
          control={control}
          name="currentSmoking"
          render={({ field }) => (
            <Select
              {...field}
              label="Do you currently smoke?"
              options={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
              ]}
              message={errors.currentSmoking?.message}
              variant={errors.currentSmoking ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Alcohol History */}
        <Controller
          control={control}
          name="alcoholHistory"
          render={({ field }) => (
            <Select
              {...field}
              label="Have you ever taken alcohol before?"
              options={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
              ]}
              message={errors.alcoholHistory?.message}
              variant={errors.alcoholHistory ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Current Alcohol Consumption */}
        <Controller
          control={control}
          name="currentAlcohol"
          render={({ field }) => (
            <Select
              {...field}
              label="Do you currently take alcohol?"
              options={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
              ]}
              message={errors.currentAlcohol?.message}
              variant={errors.currentAlcohol ? 'destructive' : 'default'}
            />
          )}
        />
      </div>
    </PageCard>
  )
}

export default Nutrition
