import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { notifySuccess } from '~/utils/toastify'

interface DialogProps {
  open: boolean
  handleClose: () => void
}

const ActiveDialog = ({ open, handleClose }: DialogProps) => {
  const handleDeactive = () => {
    notifySuccess('Kích hoạt thành công')
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
