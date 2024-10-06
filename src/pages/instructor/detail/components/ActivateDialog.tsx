import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { useInstructorApi } from '~/hooks/api/useInstructorApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

interface DialogProps {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const ActivateDialog = ({ open, handleClose, onSuccess }: DialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const params = useParams()
  const instructorId = params.id
  const { activateInstructor } = useInstructorApi()

  const handleActivate = async (instructorId: string) => {
    setIsProcessing(true)
    const { error } = await activateInstructor(instructorId)
    if (error) {
      notifyError(error.message)
      return
    }
    notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Kích hoạt giảng viên'))
    onSuccess()
    handleClose()
    setIsProcessing(false)
  }
  const handleCancel = () => {
    setIsProcessing(true)
    handleClose()
    setIsProcessing(false)
  }
  return (
    <AlertDialog
      open={open}
      handleConfirm={() => instructorId && handleActivate(instructorId)}
      handleCancel={handleCancel}
      isProcessing={isProcessing}
      title='Xác nhận kích hoạt'
      description={APP_MESSAGE.CONFIRM_ACTION('kích hoạt lại tài khoản này')}
      confirmButtonText='Kích hoạt'
      confirmButtonColor='secondary'
      cancelButtonText='Hủy'
      sx={{ '& .MuiDialog-paper': { width: '500px' } }}
    />
  )
}

export default ActivateDialog
