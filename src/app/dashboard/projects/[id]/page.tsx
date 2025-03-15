'use client'

import ContentLoader from '@/components/content-loader'
import { FormBuilder } from '@/components/forms/form-builder'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import Delete from '@/components/ui/delete'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { useFormQuestions, useSingleForm } from '@/hooks/queries/useForms'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { errorMessage } from '@/utils/errorMessage'
import { useMutation } from '@tanstack/react-query'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ViewForm = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const [deleteModal, setDeleteModal] = useState(false)

  const id = params.id

  const { data, isPending: isLoading, refetch } = useSingleForm(id)

  const { data: formQuestions, isPending: formQuestionsLoading } =
    useFormQuestions(id)

  const { isPending: deleteLoading, mutate } = useMutation({
    mutationFn: () => baseAxios.delete(API.form(encodeURIComponent(id))),
  })

  const { isPending: stateLoading, mutate: stateMutate } = useMutation({
    mutationFn: (isDraft: boolean) =>
      baseAxios.patch(API.form(encodeURIComponent(id)), {
        state: isDraft ? 'published' : 'draft',
      }),
  })

  if (!data && !isLoading) {
    redirect('/dashboard/forms')
  }

  const handleDelete = async () => {
    await mutate(undefined, {
      onSuccess: () => {
        setDeleteModal(false)
        toast.success('Successfully deleted form')
        router.push('/dashboard/forms')
      },
      onError: (err) => {
        errorMessage(err)
      },
    })
  }

  const handleStateUpdate = async () => {
    const isDraft = data?.state === 'draft'
    await stateMutate(isDraft, {
      onSuccess: () => {
        refetch()
        toast.success(`Successfully ${isDraft ? '' : 'un'}published form`)
      },
      onError: (err) => {
        errorMessage(err)
      },
    })
  }

  const navigationItems = [
    { label: 'Forms', icon: IconNames.arrowRight },
    { label: data?.title ?? 'Form' },
  ]

  return (
    <div>
      <ContentLoader loading={isLoading || formQuestionsLoading} />
      <PageHeader
        title={data?.title ?? 'Form'}
        subtitle={data?.description}
        navigation={navigationItems}
      />

      <div className="flex gap-x-4 my-4">
        <Button
          value={data?.state === 'draft' ? 'Publish Form' : 'Unpublish Form'}
          variant="secondary"
          className="p-2 md:px-4 md:py-2"
          leadingIcon={<IconPicker icon="document" />}
          onClick={handleStateUpdate}
          loading={stateLoading}
        />

        <Button
          value="Delete Form"
          variant="primary"
          className="p-2 md:px-4 md:py-2"
          leadingIcon={<IconPicker icon="trash" />}
          onClick={() => setDeleteModal(true)}
          loading={deleteLoading}
        />
      </div>

      <FormBuilder form={data} questions={formQuestions?.data} />

      <Delete
        open={deleteModal}
        onClose={setDeleteModal}
        action={handleDelete}
        actionLoading={deleteLoading}
      />
    </div>
  )
}

export default ViewForm
