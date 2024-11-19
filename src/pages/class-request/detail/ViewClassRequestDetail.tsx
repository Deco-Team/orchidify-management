import Header from './components/Header'
import InstructorRequestDetailInformation from '~/components/request/InstructorRequestDetailInformation'
import ClassInformation from './components/ClassInformation'
import Loading from '~/components/loading/Loading'
import { notifyError } from '~/utils/toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useClassRequestApi } from '~/hooks/api/useClassRequestApi'
import { lazy, useEffect, useState } from 'react'
import { ClassRequestDetailResponseDto } from '~/data/classRequest.dto'
import { ErrorResponseDto } from '~/data/error.dto'
import { protectedRoute } from '~/routes/routes'
import CourseInformation from './components/CourseInformation'
import CourseResources from './components/course-resources/CourseResources'
import { AvailableGardenDto } from '~/data/garden.dto'
import { useGardenApi } from '~/hooks/api/useGardenApi'
import ApprovePublishedClassRequestDialog from './components/ApprovePublishedRequestDialog'
import ApproveCancelledClassRequestDialog from './components/ApproveCancelledClassRequestDialog'
import { RequestType } from '~/global/constants'
const RejectRequestDialog = lazy(() => import('./components/RejectRequestDialog'))

export default function ViewClassRequestDetail() {
  const [classRequest, setClassRequest] = useState<ClassRequestDetailResponseDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const [openApproveDialog, setOpenApproveDialog] = useState<boolean>(false)
  const [openRejectDialog, setOpenRejectDialog] = useState<boolean>(false)
  const [availableGardens, setAvailableGardens] = useState<Array<AvailableGardenDto>>([])
  const params = useParams()
  const navigate = useNavigate()
  const classRequestId = params.id
  const { getClassRequestById } = useClassRequestApi()
  const { getAvailableGardens } = useGardenApi()

  useEffect(() => {
    if (classRequestId) {
      // eslint-disable-next-line prettier/prettier
      (async () => {
        const { data: classRequest, error: apiError } = await getClassRequestById(classRequestId)
        setClassRequest(classRequest)
        setError(apiError)
      })()
    }
  }, [classRequestId, getClassRequestById])

  const handleApproveButtonClick = async () => {
    if (classRequest) {
      if (classRequest.type === RequestType.PUBLISH_CLASS) {
        const { data: gardenListDto, error: apiError } = await getAvailableGardens(
          new Date(classRequest.metadata.startDate),
          classRequest.metadata.duration,
          classRequest.metadata.weekdays,
          classRequest.metadata.slotNumbers,
          typeof classRequest.createdBy === 'string' ? classRequest.createdBy : classRequest.createdBy._id
        )

        if (gardenListDto) {
          setAvailableGardens(gardenListDto.docs.map((garden) => garden))
          setOpenApproveDialog(true)
          return
        }

        if (apiError) {
          notifyError(apiError.message)
          return
        }
      } else {
        setOpenApproveDialog(true)
      }
    }
  }

  const reloadClassRequestData = async () => {
    if (classRequestId) {
      const { data: classRequest, error: apiError } = await getClassRequestById(classRequestId)
      setClassRequest(classRequest)
      setError(apiError)
    }
  }

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.classRequestList.path, { replace: true })
  }

  return classRequest ? (
    <>
      <Header
        classRequestStatus={classRequest.status}
        onApproveButtonClick={handleApproveButtonClick}
        onRejectButtonClick={() => setOpenRejectDialog(true)}
      />
      <InstructorRequestDetailInformation request={classRequest} />
      <ClassInformation classRequest={classRequest} />
      <CourseInformation
        type={classRequest.type}
        course={classRequest.type === RequestType.PUBLISH_CLASS ? classRequest.metadata : classRequest.class!}
        createdBy={classRequest.createdBy}
      />
      <CourseResources
        sessions={
          classRequest.type === RequestType.PUBLISH_CLASS
            ? classRequest.metadata.sessions
            : classRequest.class!.sessions
        }
      />
      {classRequest.type === RequestType.PUBLISH_CLASS ? (
        <ApprovePublishedClassRequestDialog
          requestId={classRequest._id}
          gardenOptions={availableGardens}
          open={openApproveDialog}
          onSuccess={reloadClassRequestData}
          handleClose={() => setOpenApproveDialog(false)}
        />
      ) : (
        <ApproveCancelledClassRequestDialog
          requestId={classRequest._id}
          open={openApproveDialog}
          onSuccess={reloadClassRequestData}
          handleClose={() => setOpenApproveDialog(false)}
        />
      )}
      <RejectRequestDialog
        requestId={classRequest._id}
        open={openRejectDialog}
        onSuccess={reloadClassRequestData}
        handleClose={() => setOpenRejectDialog(false)}
      />
    </>
  ) : (
    <Loading />
  )
}
