import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FormDialog from '~/components/dialog/FormDialog'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { APP_MESSAGE } from '~/global/app-message'
import { useRecruitmentApi } from '~/hooks/api/useRecruitmentApi'
import { notifyError, notifySuccess } from '~/utils/toastify'

dayjs.extend(isSameOrBefore)

type FormValues = {
  meetingDate: string
  meetingUrl: string
}

const defaultFormValues: FormValues = {
  meetingDate: '',
  meetingUrl: ''
}

interface ProcessDialogProps {
  recruitmentId: string
  updatedAt: string
  open: boolean
  handleClose: () => void
  onSuccess: () => void
}

const ProcessDialog = ({ recruitmentId, updatedAt, open, handleClose, onSuccess }: ProcessDialogProps) => {
  const validationSchema = useMemo(
    () =>
      z.object({
        meetingDate: z
          .string()
          .min(1, APP_MESSAGE.REQUIRED_FIELD('Ngày diễn ra'))
          .refine((value) => dayjs().add(5, 'minutes').set('seconds', 0).isSameOrBefore(dayjs(value), 'seconds'), {
            message: APP_MESSAGE.VALUE_OUT_OF_RANGE(
              dayjs().add(5, 'minutes').format('DD/MM/YYYY, HH:mm'),
              dayjs(updatedAt).add(7, 'days').format('DD/MM/YYYY, HH:mm')
            )
          })
          .refine(
            (value) => dayjs(value).isSameOrBefore(dayjs(updatedAt).add(7, 'days').set('seconds', 0), 'seconds'),
            {
              message: APP_MESSAGE.VALUE_OUT_OF_RANGE(
                dayjs().add(5, 'minutes').format('DD/MM/YYYY, HH:mm'),
                dayjs(updatedAt).add(7, 'days').format('DD/MM/YYYY, HH:mm')
              )
            }
          ),
        meetingUrl: z.string().url('Đường dẫn không hợp lệ').min(1, APP_MESSAGE.REQUIRED_FIELD('Đường dẫn'))
      }),
    [updatedAt]
  )

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
    data.meetingDate = dayjs(data.meetingDate).toISOString()
    const { error } = await approveProcessApplicant(recruitmentId, data)
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
      description={'Vui lòng nhập thời gian diễn ra và đường dẫn URL cuộc họp cho ứng viên'}
      confirmButtonText='Xử lý'
      confirmButtonColor='secondary'
      cancelButtonText='Hủy'
      formContent={
        <>
          <ControlledOutlinedInput
            controller={{ name: 'meetingDate', control: control }}
            label='Thời gian diễn ra'
            type='datetime-local'
            fullWidth
            size='small'
            inputProps={{
              min: dayjs().set('hours', 0).set('minutes', 0).format('YYYY-MM-DDTHH:mm'),
              max: dayjs(updatedAt).add(7, 'days').set('hours', 23).set('minutes', 59).format('YYYY-MM-DDTHH:mm')
            }}
          />
          <ControlledOutlinedInput
            controller={{ name: 'meetingUrl', control: control }}
            label='Đường dẫn meeting'
            fullWidth
            size='small'
            sx={{ marginTop: '0.5rem' }}
          />
        </>
      }
      sx={{ '& .MuiDialog-paper': { maxWidth: '600px', width: '100%' } }}
    />
  )
}

export default ProcessDialog
