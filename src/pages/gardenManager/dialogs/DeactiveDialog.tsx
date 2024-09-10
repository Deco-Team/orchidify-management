import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { notifySuccess } from '~/utils/toastify'

interface DialogProps {
  open: boolean
  handleClose: () => void
}

const DeactiveDialog = ({ open, handleClose }: DialogProps) => {
  const handleDeactive = () => {
    notifySuccess('Vô hiệu hóa thành công')
    handleClose()
  }
  const handleCancel = () => {
    handleClose()
  }
  return (
    <AlertDialog
      open={open}
      handleConfirm={handleDeactive}
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
