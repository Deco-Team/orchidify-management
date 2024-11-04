import { useState } from 'react'
import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { GardenTimesheetStatus } from '~/global/app-status'
import useGardenTimesheetApi from '~/hooks/api/useGardenTimesheetApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

interface DialogProps {
  open: boolean
  gardenId: string
  date: string
  handleClose: () => void
  onSuccess: () => void
}

const DeactivateDialog = ({ open, gardenId, date, handleClose, onSuccess }: DialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const { updateGardenTimesheet } = useGardenTimesheetApi()

  const handleDeactivate = async () => {
    setIsProcessing(true)
    const { error } = await updateGardenTimesheet({ gardenId, date, status: GardenTimesheetStatus.INACTIVE })

    if (error) {
      notifyError(error.message)
    } else {
      notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Cập nhật lịch nhà vườn'))
      onSuccess()
    }
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
      handleConfirm={() => handleDeactivate()}
      handleCancel={handleCancel}
      isProcessing={isProcessing}
      title='Xác nhận cập nhật lịch nhà vườn'
      description={APP_MESSAGE.CONFIRM_ACTION('nghỉ ngày này')}
      confirmButtonText='Xác nhận'
      confirmButtonColor='error'
      cancelButtonText='Hủy'
      sx={{ '& .MuiDialog-paper': { width: '500px' } }}
    />
  )
}

export default DeactivateDialog
