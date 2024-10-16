import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FormDialog from '~/components/dialog/FormDialog'
import ControlledSelect from '~/components/form/ControlledSelect'
import { AvailableGardenDto } from '~/data/garden.dto'
import { APP_MESSAGE } from '~/global/app-message'
import { useClassRequestApi } from '~/hooks/api/useClassRequestApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

type FormValues = {
  gardenId: string
}

const defaultFormValues: FormValues = {
  gardenId: ''
}

const validationSchema = z.object({
  gardenId: z.string().min(1, APP_MESSAGE.REQUIRED_FIELD('Nhà vườn'))
})

interface ApproveRequestDialogProps {
  requestId: string
  gardenOptions: AvailableGardenDto[]
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const ApproveRequestDialog = ({
  requestId,
  gardenOptions,
  open,
  handleClose,
  onSuccess
}: ApproveRequestDialogProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema)
  })
  const { approveClassRequest } = useClassRequestApi()

  const handleApprove = async (data: FormValues) => {
    const { error } = await approveClassRequest(requestId, data)
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
      title='Xác nhận chấp nhận yêu cầu'
      description={APP_MESSAGE.CONFIRM_ACTION('chấp nhận yêu cầu này')}
      confirmButtonText='Đồng ý'
      confirmButtonColor='secondary'
      cancelButtonText='Hủy'
      formContent={
        <ControlledSelect
          controller={{ name: 'gardenId', control: control }}
          label='Nhà vườn'
          labelId='garden-select-label'
          placeholder='Chọn nhà vườn'
          items={gardenOptions.map((option) => ({ value: option._id, name: option.name }))}
          fullWidth
          size='small'
          MenuProps={{
            PaperProps: {
              style: { maxHeight: '200px' }
            }
          }}
          sx={{ marginTop: '0.5rem' }}
        />
      }
      sx={{ '& .MuiDialog-paper': { maxWidth: '900px', width: '100%' } }}
    />
  )
}

export default ApproveRequestDialog
