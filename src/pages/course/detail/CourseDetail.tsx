import Box from '@mui/material/Box/Box'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '~/components/loading/Loading'
import { CourseDetailResponseDto } from '~/data/course.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { useCourseApi } from '~/hooks/api/useCourseApi'
import { protectedRoute } from '~/routes/routes'
import { notifyError } from '~/utils/toastify'
import CourseDetailHeader from './components/CourseDetailHeader'
import CourseDetailInformation from './components/CourseDetailInformation'
import CourseDetailResourceAndFeedback from './components/resource-and-feedback/CourseDetailResourceAndFeedback'

export default function CourseDetail() {
  const [data, setData] = useState<CourseDetailResponseDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const params = useParams()
  const navigate = useNavigate()
  const courseId = params.id
  const { getCourseById } = useCourseApi()

  useEffect(() => {
    if (courseId) {
      // eslint-disable-next-line prettier/prettier
      (async () => {
        const { data: course, error: apiError } = await getCourseById(courseId)
        setData(course)
        setError(apiError)
      })()
    }
  }, [courseId, getCourseById])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.courseList.path, { replace: true })
  }

  return data ? (
    <>
      <Box sx={{ marginBottom: '40px' }}>
        <CourseDetailHeader />
        <CourseDetailInformation course={data} />
        <CourseDetailResourceAndFeedback courseId={data._id} lessons={data.lessons} assignments={data.assignments} />
      </Box>
    </>
  ) : (
    <Loading />
  )
}
