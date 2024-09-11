import { useParams } from 'react-router-dom'
import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { useDeactiveGardenManagerApi } from '~/hooks/api/garden-manager/useDeactiveGardenManagerApi'
import { notifySuccess } from '~/utils/toastify'

interface DialogProps {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const DeactiveDialog = ({ open, handleClose, onSuccess }: DialogProps) => {
  const params = useParams()
  const gardenManagerId = params.id
  const { deactiveGardenManager } = useDeactiveGardenManagerApi()
  const handleDeactive = async (gardenManagerId: string) => {
    await deactiveGardenManager(gardenManagerId)
    notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Vô hiệu hóa'))
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
      title='Xác nhận vô hiệu hóa'
      description={APP_MESSAGE.CONFIRM_ACTION('vô hiệu hóa tài khoản này')}
      confirmButtonText='Vô hiệu hóa'
      confirmButtonColor='error'
      cancelButtonText='Hủy'
      sx={{ '& .MuiDialog-paper': { width: '500px' } }}
    />
  )
}

export default DeactiveDialog
