import { RequestStatus } from '~/global/app-status'
import Header from './components/Header'
import InstructorRequestDetailInformation from '~/components/request/InstructorRequestDetailInformation'
import ClassInformation from './components/ClassInformation'
import Loading from '~/components/loading/Loading'
import { notifyError } from '~/utils/toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useClassRequestApi } from '~/hooks/api/useClassRequestApi'
import { useEffect, useState } from 'react'
import { ClassRequestDto } from '~/data/classRequest.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { protectedRoute } from '~/routes/routes'
import CourseInformation from './components/CourseInformation'
import CourseResources from './components/course-resources/CourseResources'

export default function ViewClassRequestDetail() {
  const [data, setData] = useState<ClassRequestDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const params = useParams()
  const navigate = useNavigate()
  const classRequestId = params.id || '67016a3d3124837a010aead4'
  const { getClassRequestById } = useClassRequestApi()

  useEffect(() => {
    if (classRequestId) {
      // eslint-disable-next-line prettier/prettier
      (async () => {
        const { data: classRequest, error: apiError } = await getClassRequestById(classRequestId)
        setData(classRequest)
        setError(apiError)
      })()
    }
  }, [classRequestId, getClassRequestById])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.classRequestList.path, { replace: true })
  }

  return data ? (
    <>
      <Header
        classRequestStatus={RequestStatus.PENDING}
        onApproveButtonClick={() => {}}
        onRejectButtonClick={() => {}}
      />
      <InstructorRequestDetailInformation classRequest={data} />
      <ClassInformation classRequest={data} />
      <CourseInformation classRequest={data} />
      <CourseResources lessons={data.metadata.lessons} assignments={data.metadata.assignments} />
    </>
  ) : (
    <Loading />
  )
}
