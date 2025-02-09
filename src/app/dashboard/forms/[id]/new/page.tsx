'use client'

import ContentLoader from '@/components/content-loader'
import { FormBuilder } from '@/components/forms/form-builder'
import { PageHeader } from '@/components/page-header'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { useSingleForm } from '@/hooks/queries/useForms'
import { redirect } from 'next/navigation'
import React from 'react'

const AddFormsQuestions = ({ params }: { params: { id: string } }) => {
  const { data, isPending: isLoading } = useSingleForm(params.id)

  if (!data && !isLoading) {
    redirect('/dashboard/forms')
  }

  const navigationItems = [
    { label: 'Forms', icon: IconNames.arrowRight },
    { label: data?.title ?? 'Form', icon: IconNames.arrowRight },
    { label: 'Add Form Questions' },
  ]

  return (
    <div>
      <ContentLoader loading={isLoading} />
      <PageHeader
        title="Add Form Questions"
        subtitle="Add new Health Data: track student health progress"
        navigation={navigationItems}
        avatar="avatar"
      />
      <FormBuilder form={data} />
    </div>
  )
}

export default AddFormsQuestions
