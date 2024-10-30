import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FormDialog from '~/components/dialog/FormDialog'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { APP_MESSAGE } from '~/global/app-message'
import { useRecruitmentApi } from '~/hooks/api/useRecruitmentApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

type FormValues = {
  meetingUrl: string
}

const defaultFormValues: FormValues = {
  meetingUrl: ''
}

const validationSchema = z.object({
  meetingUrl: z.string().url('Đường dẫn không hợp lệ').min(1, APP_MESSAGE.REQUIRED_FIELD('Đường dẫn'))
})

interface ProcessDialogProps {
  recruimentId: string
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const ProcessDialog = ({ recruimentId, open, handleClose, onSuccess }: ProcessDialogProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema)
  })
  const { approveProcessApplicant } = useRecruitmentApi()

  const handleApprove = async (data: FormValues) => {
    const { error } = await approveProcessApplicant(recruimentId, data)
    if (error) {
      notifyError(error.message)
    } else {
      notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Chấp nhận yêu cầu'))
      onSuccess()
    }
    handleClose()
  }

  const handleCancel = () => {
    handleClose()
  }

  return (
    <FormDialog
      open={open}
      onSubmit={handleSubmit(handleApprove)}
      handleCancel={handleCancel}
      isProcessing={isSubmitting}
      title='Xác nhận xử lý đơn đuyển'
      description={'Vui lòng tạo đường dẫn URL cuộc họp cho ứng viên'}
      confirmButtonText='Xử lý'
      confirmButtonColor='secondary'
      cancelButtonText='Hủy'
      formContent={
        <ControlledOutlinedInput
          controller={{ name: 'meetingUrl', control: control }}
          label='Đường dẫn meeting'
          fullWidth
          size='small'
          sx={{ marginTop: '0.5rem' }}
        />
      }
      sx={{ '& .MuiDialog-paper': { maxWidth: '600px', width: '100%' } }}
    />
  )
}

export default ProcessDialog
