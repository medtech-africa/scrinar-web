// 'use client'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import CourseDetailsPage from './CourseDetailsPage'
import {
  fetchCourse,
  fetchModules,
} from '@/hooks/queries/trainingModules.server'

const CoursePage = async ({ params }: { params: { id: string } }) => {
  const id = params.id

  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['training-modules', id],
      queryFn: () => fetchModules(id),
    }),
    queryClient.prefetchQuery({
      queryKey: ['training-course', id],
      queryFn: () => fetchCourse(id),
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CourseDetailsPage courseId={id} />
    </HydrationBoundary>
  )
}

export default CoursePage
