'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from './elements/FormElements'
import { useFormQuestions, useSingleForm } from '@/hooks/queries/useForms'
import { useParams } from 'next/navigation'
import { convertToFormField } from '@/utils/forms'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import toast from 'react-hot-toast'
import { API } from '@/utils/api'

export const FormSubmitComponentView = ({
  questions,
  formId,
}: {
  questions: FormElementInstance[]
  formId: string
}) => {
  const formValues = useRef<{ [key: string]: string }>({})
  const formErrors = useRef<{ [key: string]: boolean }>({})
  const [renderKey, setRenderKey] = useState(new Date().getTime())

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value
  }, [])

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const dataToSubmit = Object.entries(formValues.current).map(
        ([key, value]) => ({ formField: key, submission: value })
      )
      return baseAxios.post(API.submitForm(formId), { data: dataToSubmit })
    },
  })

  const validateForm = useCallback(() => {
    for (const field of questions) {
      const actualValue = formValues.current[field.id] || ''
      const valid = FormElements[field.type].validate?.(field, actualValue)
      if (!valid) {
        formErrors.current[field.id] = true
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false
    }
    return true
  }, [questions])

  const submitForm = () => {
    formErrors.current = {}
    const validForm = validateForm()
    if (!validForm) {
      setRenderKey(new Date().getTime())
      toast.error('Please fill in all required fields')
      return
    }
    mutate(void 0, {
      onSuccess: () => {
        toast.success('Successfully submitted form')
      },
      onError: (err) => {
        console.log(err)
      },
    })
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submitForm()
        }}
        className="w-full"
      >
        <div
          key={renderKey}
          className="max-w-[620px] flex flex-col gap-4 flex-grow w-full p-8 overflow-y-auto mx-auto"
        >
          {questions.map((question) => {
            const FormElement = FormElements[question.type].formComponent

            return (
              <FormElement
                key={question.id}
                elementInstance={question}
                submitValue={submitValue}
                isInvalid={formErrors.current[question.id]}
                defaultValue={formValues.current[question.id]}
              />
            )
          })}

          <Button
            className="mt-8"
            type="submit"
            loading={isPending}
            size={'xl'}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export const FormSubmitComponent = () => {
  const id = useParams().id?.toString()
  const { data, isPending: isLoading } = useSingleForm(id)
  const [questions, setQuestions] = useState<FormElementInstance[]>([])

  const { data: formQuestions, isPending: formQuestionsLoading } =
    useFormQuestions(id)

  useEffect(() => {
    if (formQuestions) {
      const elements = formQuestions.data
        .filter((question) => question.id)
        .map((question) => {
          return {
            id: question.id ?? '',
            type: question.type as ElementsType,
            extraAttributes: convertToFormField([question])[0],
          }
        })
        .filter((element) => element !== null)
      setQuestions(elements)
    }
  }, [formQuestions])

  if (formQuestionsLoading || isLoading) return null

  if (!data) return null

  return (
    <>
      <FormSubmitComponentView questions={questions} formId={id} />
    </>
  )
}
