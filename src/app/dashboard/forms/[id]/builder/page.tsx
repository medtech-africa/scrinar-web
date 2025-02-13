import { Builder } from '@/features/form-builder/components/Builder'

const FormBuilderPage = ({ params }: { params: { id: string } }) => {
  const id = params.id

  return <Builder id={id} />
}

export default FormBuilderPage
