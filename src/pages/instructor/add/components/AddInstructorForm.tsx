import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CloudinaryFileUploadedInfo } from '~/components/cloudinary/cloudinary-type'
import { ControlledFileFieldUpload } from '~/components/form/ControlledFileUpload'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { APP_MESSAGE } from '~/global/app-message'
import { FileFormat, FileSize } from '~/global/constants'
import { StyledForm } from './AddInstructorForm.styled'
import { useInstructorApi } from '~/hooks/api/useInstructorApi'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'
import { notifyError, notifySuccess } from '~/utils/toastify'

type FormValues = {
  name: string
  email: string
  phone: string
  dateOfBirth: string
  idCardPhoto: CloudinaryFileUploadedInfo[]
}

const defaultFormValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  idCardPhoto: []
}

const validationSchema = z.object({
  name: z
    .string()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Tên quản lý vườn'))
    .max(50, APP_MESSAGE.FIELD_TOO_LONG('Tên quản lý vườn', 50)),
  email: z
    .string()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Email'))
    .max(50, APP_MESSAGE.FIELD_TOO_LONG('Email', 50))
    .email(APP_MESSAGE.WRONG_EMAIL_FORMAT),
  phone: z.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, APP_MESSAGE.WRONG_PHONE_FORMAT),
  dateOfBirth: z.string().min(1, APP_MESSAGE.REQUIRED_FIELD('Ngày sinh')),
  idCardPhoto: z.array(z.object({}).passthrough()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Ảnh thẻ'))
})

const AddInstructorForm = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema)
  })

  const { addInstructor } = useInstructorApi()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (formValue) => {
    const { error } = await addInstructor({ ...formValue, idCardPhoto: formValue.idCardPhoto[0].url })
    if (error) {
      notifyError(error.message)
      return
    }
    notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Thêm giảng viên'))
    navigate(protectedRoute.instructorList.path, { replace: true })
  })

  return (
    <StyledForm onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ width: '100%', marginY: '40px', padding: '24px' }}>
        <Box display='flex' alignItems='center' marginBottom='20px'>
          <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '10px' }}>
            Thông tin giảng viên
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>
        <Grid container columnSpacing='30px' rowSpacing='20px'>
          <Grid item xs={12} lg={6}>
            <ControlledOutlinedInput
              controller={{ name: 'name', control: control }}
              label='Tên giảng viên'
              fullWidth
              size='small'
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ControlledOutlinedInput
              controller={{ name: 'email', control: control }}
              label='Email'
              fullWidth
              size='small'
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ControlledOutlinedInput
              controller={{ name: 'phone', control: control }}
              label='Số điện thoại'
              fullWidth
              size='small'
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ControlledOutlinedInput
              controller={{ name: 'dateOfBirth', control: control }}
              label='Ngày sinh'
              type='date'
              fullWidth
              size='small'
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ControlledFileFieldUpload
              controller={{ name: 'idCardPhoto', control: control }}
              label='Ảnh thẻ'
              clientAllowedFormats={[FileFormat.jpeg, FileFormat.jpg, FileFormat.png]}
              minFile={1}
              maxFileSize={FileSize['5MB']}
            />
          </Grid>
        </Grid>
      </Paper>
      <Button disabled={isSubmitting} type='submit'>
        Thêm
      </Button>
    </StyledForm>
  )
}

export default AddInstructorForm
