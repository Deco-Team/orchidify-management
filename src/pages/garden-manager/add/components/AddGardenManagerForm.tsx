import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import { ControlledFileFieldUpload } from '~/components/form/ControlledFileUpload'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { APP_MESSAGE } from '~/global/app-message'
import { StyledForm } from './AddGardenManagerForm.styled'
import { FileFormat, FileSize } from '~/global/constants'
import { CloudinaryFileUploadedInfo } from '~/components/cloudinary/cloudinary-type'
import { useGardenManagerApi } from '~/hooks/api/useGardenManagerApi'
import { notifyError, notifySuccess } from '~/utils/toastify'
import { useNavigate } from 'react-router-dom'
import { protectedRoute } from '~/routes/routes'

type FormValues = {
  name: string
  email: string
  idCardPhoto: CloudinaryFileUploadedInfo[]
}

const defaultFormValues: FormValues = {
  name: '',
  email: '',
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
  idCardPhoto: z.array(z.object({}).passthrough()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Ảnh thẻ'))
})

const AddGardenManagerForm = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema)
  })

  const { addGardenManager } = useGardenManagerApi()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (formValue) => {
    const { error } = await addGardenManager({ ...formValue, idCardPhoto: formValue.idCardPhoto[0].url })
    if (error) {
      notifyError(error.message)
      return
    }
    notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Thêm quản lý vườn'))
    navigate(protectedRoute.gardenManagerList.path, { replace: true })
  })

  return (
    <StyledForm onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ width: '100%', marginY: '40px', padding: '24px' }}>
        <Box display='flex' alignItems='center' marginBottom='20px'>
          <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '10px' }}>
            Thông tin quản lý vườn
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>
        <Grid container columnSpacing='30px' rowSpacing='20px'>
          <Grid item xs={12} lg={6}>
            <ControlledOutlinedInput
              controller={{ name: 'name', control: control }}
              label='Tên quản lý vườn'
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

export default AddGardenManagerForm
