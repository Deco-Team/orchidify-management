import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material'
import ControlledOutlinedInput from '~/components/form/ControlledOutlinedInput'
import { APP_MESSAGE } from '~/global/app-message'
import { StyledForm } from './AddGardenForm.styled'
import { CloudinaryFileUploadedInfo } from '~/components/cloudinary/cloudinary-type'
import { useNavigate } from 'react-router-dom'
import GardenManagerSelect from './GardenManagerSelect'
import { ControlledFileAreaUpload } from '~/components/form/ControlledFileUpload'
import { FileFormat, FileSize } from '~/global/constants'
import { useGardenApi } from '~/hooks/api/useGardenApi'
import { notifyError, notifySuccess } from '~/utils/toastify'
import { protectedRoute } from '~/routes/routes'

type FormValues = {
  name: string
  address: string
  gardenManagerId: string
  description: string
  images: CloudinaryFileUploadedInfo[]
}

const defaultFormValues: FormValues = {
  name: '',
  address: '',
  gardenManagerId: '',
  description: '',
  images: []
}

const validationSchema = z.object({
  name: z
    .string()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Tên quản lý vườn'))
    .max(50, APP_MESSAGE.FIELD_TOO_LONG('Tên quản lý vườn', 50)),
  address: z
    .string()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Địa chỉ'))
    .max(100, APP_MESSAGE.FIELD_TOO_LONG('Địa chỉ', 100)),
  gardenManagerId: z.string().min(1, APP_MESSAGE.REQUIRED_FIELD('Quản lý vườn')),
  description: z
    .string()
    .min(1, APP_MESSAGE.REQUIRED_FIELD('Mô tả'))
    .max(500, APP_MESSAGE.FIELD_TOO_LONG('Mô tả', 500)),
  images: z.array(z.object({}).passthrough()).nonempty(APP_MESSAGE.REQUIRED_FIELD('Hình ảnh nhà vườn'))
})

const AddGardenForm = () => {
  const { addGarden } = useGardenApi()
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = useForm<FormValues>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema)
  })

  const onSubmit = handleSubmit(async (formValue) => {
    const { error } = await addGarden({ ...formValue, images: formValue.images.map((image) => image.url) })
    if (error) {
      notifyError(error.message)
      return
    }
    notifySuccess(APP_MESSAGE.ACTION_SUCCESS('Thêm nhà vườn'))
    navigate(protectedRoute.gardenList.path, { replace: true })
  })

  return (
    <StyledForm onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ width: '100%', marginY: '40px', padding: '24px' }}>
        <Box display='flex' alignItems='center' marginBottom='20px'>
          <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 700, paddingRight: '10px' }}>
            Thông tin nhà vườn
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>
        <Grid container columnSpacing='30px' rowSpacing='20px'>
          <Grid item xs={12} lg={6}>
            <ControlledOutlinedInput
              controller={{ name: 'name', control: control }}
              label='Tên nhà vườn'
              fullWidth
              size='small'
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ControlledOutlinedInput
              controller={{ name: 'address', control: control }}
              label='Địa chỉ'
              fullWidth
              size='small'
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <GardenManagerSelect controller={{ name: 'gardenManagerId', control: control }} />
          </Grid>
          <Grid item xs={12}>
            <ControlledOutlinedInput
              controller={{ name: 'description', control: control }}
              multiline
              minRows={5}
              maxRows={5}
              label='Mô tả'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledFileAreaUpload
              controller={{ name: 'images', control: control }}
              label='Hình ảnh nhà vườn'
              clientAllowedFormats={[FileFormat.jpeg, FileFormat.jpg, FileFormat.png]}
              multiple
              minFile={1}
              maxFiles={8}
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

export default AddGardenForm
