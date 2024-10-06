import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { useInstructorApi } from '~/hooks/api/useInstructorApi'
import { notifySuccess } from '~/utils/toastify'

interface DialogProps {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const DeactivateDialog = ({ open, handleClose, onSuccess }: DialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const params = useParams()
  const instructorId = params.id
  const { deactivateInstructor } = useInstructorApi()
  const handleDeactivate = async (instructorId: string) => {
    setIsProcessing(true)
    await deactivateInstructor(instructorId)
    notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Vô hiệu hóa giảng viên'))
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
      handleConfirm={() => instructorId && handleDeactivate(instructorId)}
      handleCancel={handleCancel}
      isProcessing={isProcessing}
      title='Xác nhận vô hiệu hóa'
      description={APP_MESSAGE.CONFIRM_ACTION('vô hiệu hóa tài khoản này')}
      confirmButtonText='Vô hiệu hóa'
      confirmButtonColor='error'
      cancelButtonText='Hủy'
      sx={{ '& .MuiDialog-paper': { width: '500px' } }}
    />
  )
}

export default DeactivateDialog
