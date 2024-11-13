import { Navigate, useParams } from 'react-router-dom'
import ComboInformation from './components/ComboInformation'
import Header from './components/Header'
import { useCourseComboApi } from '~/hooks/api/useCourseComboApi'
import { CourseComboDetailResponseDto } from '~/data/courseCombo.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { useEffect, useState } from 'react'
import { notifyError } from '~/utils/toastify'
import Loading from '~/components/loading/Loading'
import { protectedRoute } from '~/routes/routes'
import ChildCourseTable from './components/child-course/ChildCourseTable'
import Box from '@mui/material/Box'

export default function ViewCourseComboDetail() {
  const [comboDetail, setComboRDetail] = useState<CourseComboDetailResponseDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const { getCourseComboById } = useCourseComboApi()
  const params = useParams()

  const comboId = params.id
  useEffect(() => {
    if (comboId) {
      ;(async () => {
        const { data, error: apiError } = await getCourseComboById(comboId)
        setComboRDetail(data)
        setError(apiError)
      })()
    }
  }, [comboId, getCourseComboById])

  if (error) {
    notifyError(error.message)
    return <Navigate to={protectedRoute.courseComboList.path} replace />
  }

  return comboDetail ? (
    <>
      <Header />
      <ComboInformation comboDetail={comboDetail} />
      <Box sx={{ marginTop: '1.25rem' }}>
        <ChildCourseTable childCourses={comboDetail.childCourses} />
      </Box>
    </>
  ) : (
    <Loading />
  )
}
