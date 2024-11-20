import { ClassDetailResponseDto } from '~/data/class.dto'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import { ErrorResponseDto } from '~/data/error.dto'
import { useNavigate, useParams } from 'react-router-dom'
import { useClassApi } from '~/hooks/api/useClassApi'
import Loading from '~/components/loading/Loading'
import { notifyError } from '~/utils/toastify'
import { protectedRoute } from '~/routes/routes'
import ClassInformation from './components/ClassInformation'
import CourseInformation from './components/CourseInformation'
import SessionLearnerFeedbackList from './components/SessionLearnerFeedbackList'
import CompleteDialog from './components/CompleteDialog'
import CancelDialog from './components/CancelDialog'

export default function ViewClassDetail() {
  const [classDetail, setClassDetail] = useState<ClassDetailResponseDto | null>(null)
  const [error, setError] = useState<ErrorResponseDto | null>(null)
  const { getClassById } = useClassApi()

  const [openCompleteDialog, setOpenCompleteDialog] = useState(false)
  const [openCancelDialog, setOpenCancelDialog] = useState(false)

  const params = useParams()
  const navigate = useNavigate()

  const classId = params.id

  useEffect(() => {
    if (classId) {
      ;(async () => {
        const { data: classDetail, error: apiError } = await getClassById(classId)
        setClassDetail(classDetail)
        setError(apiError)
      })()
    }
  }, [classId, getClassById])

  if (error) {
    notifyError(error.message)
    navigate(protectedRoute.classList.path, { replace: true })
  }

  const handleReloadData = async () => {
    if (classId) {
      const { data: classDetail, error: apiError } = await getClassById(classId)
      setClassDetail(classDetail)
      setError(apiError)
    }
  }

  return classDetail ? (
    <>
      <Header
        classStatus={classDetail.status}
        startDate={classDetail.startDate}
        duration={classDetail.duration}
        weekdays={classDetail.weekdays}
        onCompleteButtonClick={() => setOpenCompleteDialog(true)}
        onCancelButtonClick={() => setOpenCancelDialog(true)}
      />
      <ClassInformation classDetail={classDetail} />
      <CourseInformation classDetail={classDetail} />
      <SessionLearnerFeedbackList
        classId={classDetail._id}
        sessions={classDetail.sessions}
        learners={classDetail.learners}
      />
      <CompleteDialog
        open={openCompleteDialog}
        handleClose={() => setOpenCompleteDialog(false)}
        onSuccess={handleReloadData}
      />
      <CancelDialog
        classId={classDetail._id}
        open={openCancelDialog}
        handleClose={() => setOpenCancelDialog(false)}
        onSuccess={handleReloadData}
      />
    </>
  ) : (
    <Loading />
  )
}
