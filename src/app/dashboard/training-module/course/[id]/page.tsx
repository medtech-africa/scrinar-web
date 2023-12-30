import CourseDetailsPage from './CourseDetailsPage'
import {
  fetchCourse,
  fetchModules,
} from '@/hooks/queries/trainingModules.server'

const CoursePage = async ({ params }: { params: { id: string } }) => {
  const id = params.id

  const modules = await fetchModules(id)
  const course = await fetchCourse(id)

  return <CourseDetailsPage courseId={id} modules={modules} course={course} />
}

export default CoursePage
