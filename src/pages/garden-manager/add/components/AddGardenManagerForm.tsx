import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import { ControlledFileFieldUpload } from '~/components/form/ControlledFileUpload'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { APP_MESSAGE } from '~/global/app-message'
import { StyledForm } from './AddGardenManagerForm.styled'
import { FileFormat, FileSize } from '~/global/constants'

type FormValues = {
  name: string
  email: string
  idCardPhoto: File | null
}

const defaultFormValues: FormValues = {
  name: '',
  email: '',
  idCardPhoto: null
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
  idCardPhoto: z
    .instanceof(File)
    .refine(
      (file) => file.size < FileSize['5MB'] && [FileFormat.jpeg, FileFormat.jpg, FileFormat.png].includes(file.type),
      {
        message: APP_MESSAGE.INVALID_FILE_FORMAT_OR_SIZE('jpg, jpeg, png', '5MB')
      }
    )
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

  // const { data: uploadResData, error, callCloudinaryUploadApi } = useCloudinaryUploadApi()

  const onSubmit = handleSubmit(async (formValue) => {
    // await callCloudinaryUploadApi([formValue.idCardPhoto!, formValue.idCardPhoto!, formValue.idCardPhoto!])
    // console.log(uploadResData)
    // console.log(error)
    console.log(formValue)
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
            <ControlledFileFieldUpload controller={{ name: 'idCardPhoto', control: control }} label='Ảnh thẻ' />
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
