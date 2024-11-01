import { useState } from 'react'
import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { notifySuccess } from '~/utils/toastify'

interface DialogProps {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const ActivateDialog = ({ open, handleClose, onSuccess }: DialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleActivate = async () => {
    setIsProcessing(true)
    // if (error) {
    //   notifyError(error.message)
    // } else {
    notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Cập nhật lịch'))
    onSuccess()
    // }
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
      handleConfirm={() => handleActivate()}
      handleCancel={handleCancel}
      isProcessing={isProcessing}
      title='Xác nhận cập nhật lịch'
      description={APP_MESSAGE.CONFIRM_ACTION('hoạt động này')}
      confirmButtonText='Xác nhận'
      confirmButtonColor='secondary'
      cancelButtonText='Hủy'
      sx={{ '& .MuiDialog-paper': { width: '500px' } }}
    />
  )
}

export default ActivateDialog
