import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React from 'react'
import { OptionsWithOthersField } from './OptionWithOthersField'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'
import { useFormContext } from 'react-hook-form'

export const ParentSurveyHealthServicesHealthMaintenance = ({
  gender,
}: {
  gender?: string
}) => {
  const { register, setValue, watch } = useFormContext()
  const isFather = gender === 'father'

  return (
    <PageCard title="Health services health maintenance" bodyStyle="px-4">
      <div className="grid md:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid-cols-1 gap-6">
        <OptionsWithOthersField
          label="What do you think is the importance of regular health screening? (Going to health facilities for check-ups even when you are not sick)"
          options={[
            'To make sure you are healthy and catch problems early',
            'It is not necessary if you are not sick',
            'I don’t know',
            'Other (please specify)',
          ]}
          form={{
            id: 'healthMaintenance.importanceOfRegularScreening',
          }}
        />

        <Select
          {...register('healthMaintenance.healthFacility.frequencyOfVisits')}
          label="How often do you visit the health facility for health check-ups?"
          options={convertStringsToOptionArray([
            'Regularly (e.g., once a year)',
            'Occasionally (e.g., when sick)',
            'Rarely',
            'Never',
          ])}
          value={{
            value: watch('healthMaintenance.healthFacility.frequencyOfVisits'),
            label: watch('healthMaintenance.healthFacility.frequencyOfVisits'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue(
              'healthMaintenance.healthFacility.frequencyOfVisits',
              value
            )
          }}
        />

        <Select
          {...register('healthMaintenance.childHealth.frequencyOfVisits')}
          label="How often do you take your child (the one attending JSS) to visit the health facility for health check-ups?"
          options={convertStringsToOptionArray([
            'Regularly (e.g., once a year)',
            'Occasionally (e.g., when sick)',
            'Rarely',
            'Never',
          ])}
          value={{
            value: watch('healthMaintenance.childHealth.frequencyOfVisits'),
            label: watch('healthMaintenance.childHealth.frequencyOfVisits'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('healthMaintenance.childHealth.frequencyOfVisits', value)
          }}
        />

        <Select
          {...register('healthMaintenance.childHealth.interestInStatus')}
          label="How interested are you in knowing about your child’s health status?"
          options={convertStringsToOptionArray([
            'Very interested',
            'Somewhat interested',
            'Not very interested; because I can observe him/her anytime',
            'Not interested at all',
          ])}
          value={{
            value: watch('healthMaintenance.childHealth.interestInStatus'),
            label: watch('healthMaintenance.childHealth.interestInStatus'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('healthMaintenance.childHealth.interestInStatus', value)
          }}
        />

        <Select
          {...register(
            'healthMaintenance.childHealth.importanceOfKnowingProblems'
          )}
          label="How important is it for you to know whether your child has any health problems or risks?"
          options={convertStringsToOptionArray([
            'Extremely important',
            'Important',
            'Not very important',
            'Not important at all',
          ])}
          value={{
            value: watch(
              'healthMaintenance.childHealth.importanceOfKnowingProblems'
            ),
            label: watch(
              'healthMaintenance.childHealth.importanceOfKnowingProblems'
            ),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue(
              'healthMaintenance.childHealth.importanceOfKnowingProblems',
              value
            )
          }}
        />

        <Select
          {...register('healthMaintenance.childHealth.frequencyOfUpdates')}
          label="How often would you like to receive updates on your child’s health (e.g., physical checkups or health screenings)?"
          options={convertStringsToOptionArray([
            'Regularly (every 6 months)',
            'Occasionally (once a year)',
            'Rarely (only if there is a problem)',
            'Not interested in updates',
          ])}
          value={{
            value: watch('healthMaintenance.childHealth.frequencyOfUpdates'),
            label: watch('healthMaintenance.childHealth.frequencyOfUpdates'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('healthMaintenance.childHealth.frequencyOfUpdates', value)
          }}
        />

        <Select
          {...register(
            'healthMaintenance.healthPrograms.participationLikelihood'
          )}
          label="How likely are you to participate in health-related programs or workshops aimed at improving adolescents' health?"
          options={convertStringsToOptionArray([
            'Very likely',
            'Somewhat likely',
            'Unlikely',
            'Not interested at all',
          ])}
          value={{
            value: watch(
              'healthMaintenance.healthPrograms.participationLikelihood'
            ),
            label: watch(
              'healthMaintenance.healthPrograms.participationLikelihood'
            ),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue(
              'healthMaintenance.healthPrograms.participationLikelihood',
              value
            )
          }}
        />

        <Select
          {...register('healthMaintenance.childHealth.supportBelief')}
          label="Do you believe knowing about your child’s health will help you support their well-being better?"
          options={convertStringsToOptionArray([
            'Strongly agree',
            'Agree',
            'Disagree',
            'Strongly disagree',
          ])}
          value={{
            value: watch('healthMaintenance.childHealth.supportBelief'),
            label: watch('healthMaintenance.childHealth.supportBelief'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('healthMaintenance.childHealth.supportBelief', value)
          }}
        />

        <Select
          {...register('healthMaintenance.childHealthUsefulInformation')}
          label="What information about your child’s health would you find most useful?"
          options={convertStringsToOptionArray([
            'Physical health (e.g., weight, height, growth)',
            'Mental well-being (e.g., stress, mood)',
            'Lifestyle habits (e.g., diet, physical activity)',
            'Any health risks (e.g., chronic diseases, obesity)',
            'Not interested in specific health information',
            'I don’t know',
          ])}
          value={{
            value: watch('healthMaintenance.childHealthUsefulInformation'),
            label: watch('healthMaintenance.childHealthUsefulInformation'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('healthMaintenance.childHealthUsefulInformation', value)
          }}
        />

        <Select
          {...register('healthMaintenance.phcHealthUsage')}
          label="Have you used the services at the PHC for your health complaints?"
          options={convertStringsToOptionArray(['Yes', 'No'])}
          value={{
            value: watch('healthMaintenance.phcHealthUsage'),
            label: watch('healthMaintenance.phcHealthUsage'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('healthMaintenance.phcHealthUsage', value)
          }}
        />

        <OptionsWithOthersField
          label="Who or what are your sources of information about NCDs and their prevention?"
          options={[
            'From a health facility',
            'Family or friends',
            'Schools or educational institutions',
            'Social media (e.g., Facebook, Instagram, Twitter)',
            'Television or radio programs',
            'Newspapers or magazines',
            'Other (please specify)',
          ]}
          form={{
            id: 'healthMaintenance.ncdInfoSources',
          }}
        />

        {isFather && (
          <OptionsWithOthersField
            label="How do you as a father contribute to the health of your child and make them less likely to have these NCD risk factors?"
            options={[
              'By modelling healthy lifestyle choices such as exercising regularly',
              'Making sure that my child has regular health check-ups and vaccinations',
              'Teaching my child the risks of unhealthy behaviors (e.g., smoking, sugary drinks)',
              'Supporting their mother in household decisions that promote family health (e.g., setting screen time limits)',
              "It's not the father's role",
              'Not sure',
              'Other (please specify)',
            ]}
            form={{
              id: 'healthMaintenance.ncdFatherPreventiveContribution',
            }}
          />
        )}
      </div>
    </PageCard>
  )
}
