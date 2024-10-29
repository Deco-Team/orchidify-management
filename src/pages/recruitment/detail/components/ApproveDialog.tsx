import { useState } from 'react'
import AlertDialog from '~/components/dialog/AlertDialog'
import { APP_MESSAGE } from '~/global/app-message'
import { useRecruitmentApi } from '~/hooks/api/useRecruitmentApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

interface DialogProps {
  recruitmentId: string
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const ApproveDialog = ({ recruitmentId, open, handleClose, onSuccess }: DialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const { approveInterviewApplicant } = useRecruitmentApi()

  const handleApprove = async (recruitmentId: string) => {
    setIsProcessing(true)
    const { error } = await approveInterviewApplicant(recruitmentId)
    if (error) {
      notifyError(error.message)
    } else {
      notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Duyệt hồ sơ'))
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
      handleConfirm={() => handleApprove(recruitmentId)}
      handleCancel={handleCancel}
      isProcessing={isProcessing}
      title='Xác nhận chấp nhận ứng viên'
      description={APP_MESSAGE.CONFIRM_ACTION('duyệt hồ sơ này')}
      confirmButtonText='Chấp nhận'
      confirmButtonColor='secondary'
      cancelButtonText='Hủy'
      sx={{ '& .MuiDialog-paper': { width: '500px' } }}
    />
  )
}

export default ApproveDialog
