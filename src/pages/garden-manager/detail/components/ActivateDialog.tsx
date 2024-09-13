import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { useGardenManagerApi } from '~/hooks/api/useGardenManagerApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

interface DialogProps {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const ActivateDialog = ({ open, handleClose, onSuccess }: DialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const params = useParams()
  const gardenManagerId = params.id
  const { activateGardenManager } = useGardenManagerApi()

  const handleActivate = async (gardenManagerId: string) => {
    setIsProcessing(true)
    const { error } = await activateGardenManager(gardenManagerId)
    if (error) {
      notifyError(error.message)
      return
    }
    notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Kích hoạt'))
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
      handleConfirm={() => gardenManagerId && handleActivate(gardenManagerId)}
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
