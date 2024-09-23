import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { useGardenApi } from '~/hooks/api/useGardenApi'
import { notifySuccess } from '~/utils/toastify'

interface DialogProps {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const DeactivateDialog = ({ open, handleClose, onSuccess }: DialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const params = useParams()
  const gardenId = params.id
  const { deactivateGarden } = useGardenApi()
  const handleDeactivate = async (gardenId: string) => {
    setIsProcessing(true)
    await deactivateGarden(gardenId)
    notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Vô hiệu hóa nhà vườn'))
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
      handleConfirm={() => gardenId && handleDeactivate(gardenId)}
      handleCancel={handleCancel}
      isProcessing={isProcessing}
      title='Xác nhận vô hiệu hóa'
      description={APP_MESSAGE.CONFIRM_ACTION('vô hiệu hóa nhà vườn này')}
      confirmButtonText='Vô hiệu hóa'
      confirmButtonColor='error'
      cancelButtonText='Hủy'
      sx={{ '& .MuiDialog-paper': { width: '500px' } }}
    />
  )
}

export default DeactivateDialog