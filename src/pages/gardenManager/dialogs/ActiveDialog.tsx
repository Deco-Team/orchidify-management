import { useParams } from 'react-router-dom'
import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { useActiveGardenManagerApi } from '~/hooks/api/garden-manager/useActiveGardenManagerApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

interface DialogProps {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const ActiveDialog = ({ open, handleClose, onSuccess }: DialogProps) => {
  const params = useParams()
  const gardenManagerId = params.id
  const { activeGardenManager, error } = useActiveGardenManagerApi()

  const handleDeactive = async (gardenManagerId: string) => {
    await activeGardenManager(gardenManagerId)
    if (error) {
      notifyError(error.message)
      return
    }
    notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Kích hoạt'))
    onSuccess()
    handleClose()
  }
  const handleCancel = () => {
    handleClose()
  }
  return (
    <AlertDialog
      open={open}
      handleConfirm={() => gardenManagerId && handleDeactive(gardenManagerId)}
      handleCancel={handleCancel}
      title='Xác nhận kích hoạt'
      description={APP_MESSAGE.CONFIRM_ACTION('kích hoạt lại tài khoản này')}
      confirmButtonText='Kích hoạt'
      confirmButtonColor='secondary'
      cancelButtonText='Hủy'
      sx={{ '& .MuiDialog-paper': { width: '500px' } }}
    />
  )
}

export default ActiveDialog
