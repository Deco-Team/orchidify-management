import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import useStaffApi from '~/hooks/api/useStaffApi'
import { notifySuccess } from '~/utils/toastify'

interface DialogProps {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const DeactivateDialog = ({ open, handleClose, onSuccess }: DialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const params = useParams()
  const staffId = params.id
  const { deactivateStaff } = useStaffApi()
  const handleDeactivate = async (staffId: string) => {
    setIsProcessing(true)
    await deactivateStaff(staffId)
    notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Vô hiệu hóa nhân viên'))
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
      handleConfirm={() => staffId && handleDeactivate(staffId)}
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
