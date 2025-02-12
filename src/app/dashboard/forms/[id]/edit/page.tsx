'use client'
import { FormBuilder } from '@/components/forms/form-builder'
import React from 'react'

const AddFormsQuestions = ({ params }: { params: { id: string } }) => {
  console.log(params.id)
  return <FormBuilder />
}

export default AddFormsQuestions
