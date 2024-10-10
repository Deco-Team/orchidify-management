import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FormDialog from '~/components/dialog/FormDialog'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { APP_MESSAGE } from '~/global/app-message'
import { useClassRequestApi } from '~/hooks/api/useClassRequestApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

type FormValues = {
  rejectReason: string
}

const defaultFormValues: FormValues = {
  rejectReason: ''
}

const validationSchema = z.object({
  rejectReason: z
    .string()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Mô tả lý do từ chối'))
    .max(500, APP_MESSAGE.FIELD_TOO_LONG('Mô tả lý do từ chối', 500))
})

interface RejectRequestDialogProps {
  requestId: string
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const RejectRequestDialog = ({ requestId, open, handleClose, onSuccess }: RejectRequestDialogProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema)
  })
  const { rejectClassRequest } = useClassRequestApi()

  const handleReject = async (data: FormValues) => {
    const { error } = await rejectClassRequest(requestId, data)
    if (error) {
      notifyError(error.message)
      return
    }
    notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Từ chối yêu cầu'))
    onSuccess()
    handleClose()
  }

  const handleCancel = () => {
    handleClose()
  }

  return (
    <FormDialog
      open={open}
      onSubmit={handleSubmit(handleReject)}
      handleCancel={handleCancel}
      isProcessing={isSubmitting}
      title='Xác nhận từ chối yêu cầu'
      description={APP_MESSAGE.CONFIRM_ACTION('từ chối yêu cầu này')}
      confirmButtonText='Từ chối'
      confirmButtonColor='error'
      cancelButtonText='Hủy'
      formContent={
        <ControlledOutlinedInput
          controller={{ name: 'rejectReason', control: control }}
          multiline
          minRows={7}
          maxRows={7}
          label='Mô tả lý do từ chối'
          fullWidth
          sx={{ marginTop: '0.5rem' }}
        />
      }
      sx={{ '& .MuiDialog-paper': { maxWidth: '900px', width: '100%' } }}
    />
  )
}

export default RejectRequestDialog
