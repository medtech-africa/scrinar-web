'use client'

import ContentLoader from '@/components/content-loader'
import { FormBuilder } from '@/components/forms/form-builder'
import { useSingleForm } from '@/hooks/queries/useForms'
import { redirect } from 'next/navigation'
import React from 'react'

const AddFormsQuestions = ({ params }: { params: { id: string } }) => {
  const { data, isPending: isLoading } = useSingleForm(params.id)

  if (!data && !isLoading) {
    redirect('/dashboard/forms')
  }

  return (
    <div>
      <ContentLoader loading={isLoading} />

      <FormBuilder form={data} />
    </div>
  )
}

export default AddFormsQuestions
